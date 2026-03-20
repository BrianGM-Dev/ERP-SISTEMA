// ============================================================
// PRODUCCION.JS - Production Module
// ============================================================

const Produccion = {
  viewMode: 'kanban', // 'kanban' | 'table'

  render() {
    const content = document.getElementById('main-content');
    const ops = AppData.ordenes_produccion;
    const activas = ops.filter(o => o.estado === 'En Proceso' || o.estado === 'Planificada' || o.estado === 'QC').length;
    const completadas = ops.filter(o => o.estado === 'Completada').length;
    const avgMerma = ops.filter(o => o.merma > 0).reduce((s, o) => s + o.merma, 0) / ops.filter(o => o.merma > 0).length;

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Producción', 'Control de órdenes de producción y recursos',
          `<div class="flex flex-wrap items-center gap-2">
            <button onclick="Produccion.setView('kanban')" class="px-3 py-1.5 text-xs font-medium rounded-lg ${this.viewMode === 'kanban' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400'} transition-colors">Kanban</button>
            <button onclick="Produccion.setView('table')" class="px-3 py-1.5 text-xs font-medium rounded-lg ${this.viewMode === 'table' ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400'} transition-colors">Tabla</button>
            ${UI.button('+ Nueva OP', 'primary', 'Produccion.showNuevaOP()')}
          </div>`
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('OPs Activas', activas + ' órdenes', null, svgIcons.cog, 'brand', `${completadas} completadas`)}
          ${UI.kpiCard('Eficiencia', AppData.kpis.eficiencia_produccion + '%', '+2', svgIcons.check, 'green', 'Rendimiento operativo')}
          ${UI.kpiCard('Entregas a Tiempo', AppData.kpis.entregas_tiempo + '%', '-1', svgIcons.document, 'blue', 'Del total de entregas')}
          ${UI.kpiCard('Merma Prom.', avgMerma.toFixed(1) + '%', null, svgIcons.bell, 'yellow', 'Desperdicio promedio')}
        </div>

        <!-- Main View -->
        <div id="prod-main-view">
          ${this.viewMode === 'kanban' ? this.renderKanban() : this.renderTable()}
        </div>

        <!-- Gantt Timeline -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">Cronograma de Producción</h3>
            <p class="text-xs text-gray-400 mt-0.5">Línea de tiempo — ${new Date().toLocaleDateString('es-PE', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase())}</p>
          </div>
          <div class="p-6 overflow-x-auto">
            ${this.renderGantt()}
          </div>
        </div>
      </div>
    `;
  },

  setView(mode) {
    this.viewMode = mode;
    const mainView = document.getElementById('prod-main-view');
    if (mainView) mainView.innerHTML = mode === 'kanban' ? this.renderKanban() : this.renderTable();
    // Update buttons
    document.querySelectorAll('[onclick^="Produccion.setView"]').forEach(btn => {
      const btnMode = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
      btn.className = `px-3 py-1.5 text-xs font-medium rounded-lg ${btnMode === mode ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400'} transition-colors`;
    });
  },

  renderKanban() {
    const columns = [
      { id: 'Planificada', label: 'Planificada', color: 'bg-gray-100 dark:bg-night-700/50', headerColor: 'bg-gray-200 dark:bg-night-700 text-gray-700 dark:text-gray-300' },
      { id: 'En Proceso', label: 'En Proceso', color: 'bg-blue-50 dark:bg-blue-900/10', headerColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
      { id: 'QC', label: 'Control Calidad', color: 'bg-yellow-50 dark:bg-yellow-900/10', headerColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
      { id: 'Completada', label: 'Completada', color: 'bg-green-50 dark:bg-green-900/10', headerColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    ];

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${columns.map(col => {
          const colOps = AppData.ordenes_produccion.filter(op => op.estado === col.id);
          return `
            <div class="${col.color} rounded-2xl p-3">
              <div class="flex items-center justify-between mb-3 px-1">
                <span class="text-xs font-bold px-2 py-1 rounded-lg ${col.headerColor}">${col.label}</span>
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">${colOps.length}</span>
              </div>
              <div class="space-y-2">
                ${colOps.map(op => `
                  <div>
                    <div onclick="Produccion.verOP('${op.id}')" class="cursor-pointer">
                      ${UI.kanbanCard(op)}
                    </div>
                    ${col.id === 'Planificada' ? `<button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','En Proceso');" class="mt-1 w-full px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">Iniciar &#9654;</button>` : ''}
                    ${col.id === 'En Proceso' ? `<button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','QC');" class="mt-1 w-full px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">Enviar a QC &#9654;</button>` : ''}
                    ${col.id === 'QC' ? `<button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','Completada');" class="mt-1 w-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">Completar &#10003;</button>` : ''}
                  </div>
                `).join('')}
                ${colOps.length === 0 ? `<div class="text-center py-6 text-xs text-gray-400">Sin órdenes</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTable() {
    const estadoColor = { 'Planificada': 'gray', 'En Proceso': 'blue', 'QC': 'yellow', 'Completada': 'green' };
    const prioColor = { 'Alta': 'red', 'Media': 'yellow', 'Normal': 'gray' };

    return `
      <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700 flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-semibold text-gray-900 dark:text-white">Órdenes de Producción</h3>
          <div class="w-full sm:w-64">${UI.searchInput('op-search', 'Buscar OP...', 'Produccion.searchOP(this.value)')}</div>
        </div>
        <div class="overflow-x-auto">
          <table id="op-table" class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">N° OP</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Cant.</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Operario</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Inicio</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fin Esp.</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avance</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Prioridad</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${AppData.ordenes_produccion.map(op => {
                const prod = AppData.getProducto(op.producto_id);
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                    <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">${op.id}</td>
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${prod.nombre || op.producto_id}</p>
                      <p class="text-xs text-gray-400">OV: ${op.ov_id}</p>
                    </td>
                    <td class="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300">${op.cantidad}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${op.operario}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(op.fecha_inicio)}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(op.fecha_fin)}</td>
                    <td class="px-4 py-3 w-32">
                      <div class="flex items-center gap-2">
                        <div class="flex-1 bg-gray-100 dark:bg-night-700 rounded-full h-1.5">
                          <div class="${op.avance >= 80 ? 'bg-green-500' : op.avance >= 40 ? 'bg-blue-500' : 'bg-yellow-400'} h-1.5 rounded-full" style="width:${op.avance}%"></div>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 w-8">${op.avance}%</span>
                      </div>
                    </td>
                    <td class="px-4 py-3">${UI.badge(op.prioridad, prioColor[op.prioridad] || 'gray')}</td>
                    <td class="px-4 py-3">${UI.badge(op.estado, estadoColor[op.estado] || 'gray')}</td>
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-1">
                        ${UI.iconBtn(svgIcons.eye, `Produccion.verOP('${op.id}')`, 'Ver', 'brand')}
                        ${op.estado !== 'Completada' ? UI.iconBtn(svgIcons.edit, `Produccion.actualizarOP('${op.id}')`, 'Actualizar', 'gray') : ''}
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  renderGantt() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    const totalDays = Math.ceil((endDate - startDate) / 86400000);

    const dayMs = 86400000;
    const getLeft = (dateStr) => {
      const d = new Date(dateStr + 'T00:00:00');
      return Math.max(0, Math.ceil((d - startDate) / dayMs));
    };
    const getWidth = (startStr, endStr) => {
      const s = new Date(startStr + 'T00:00:00');
      const e = new Date(endStr + 'T00:00:00');
      return Math.max(1, Math.ceil((e - s) / dayMs));
    };

    const todayLeft = Math.ceil((today - startDate) / dayMs);

    const stateColors = {
      'Planificada': 'bg-gray-400',
      'En Proceso': 'bg-blue-500',
      'QC': 'bg-yellow-500',
      'Completada': 'bg-green-500',
    };

    // Generate date labels
    const labels = [];
    for (let d = 0; d < totalDays; d += 5) {
      const date = new Date(startDate.getTime() + d * dayMs);
      labels.push({ day: d, label: date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }) });
    }

    return `
      <div style="min-width: 500px;">
        <!-- Header dates -->
        <div class="relative h-6 mb-2 border-b border-gray-100 dark:border-night-700">
          ${labels.map(l => `
            <span class="absolute text-xs text-gray-400 transform -translate-x-1/2" style="left:${(l.day / totalDays * 100).toFixed(1)}%">${l.label}</span>
          `).join('')}
        </div>
        <!-- Today line marker -->
        <div class="relative">
          <div class="absolute top-0 bottom-0 w-0.5 bg-red-400 opacity-60 z-10" style="left:${(todayLeft / totalDays * 100).toFixed(1)}%"></div>
          <!-- OP Bars -->
          <div class="space-y-2">
            ${AppData.ordenes_produccion.map(op => {
              const left = getLeft(op.fecha_inicio);
              const width = getWidth(op.fecha_inicio, op.fecha_fin);
              const leftPct = (left / totalDays * 100).toFixed(1);
              const widthPct = Math.max(2, (width / totalDays * 100).toFixed(1));
              const prod = AppData.getProducto(op.producto_id);
              const color = stateColors[op.estado] || 'bg-gray-400';
              return `
                <div class="relative h-7 flex items-center">
                  <span class="text-xs text-gray-500 dark:text-gray-400 w-24 flex-shrink-0 truncate" title="${op.id}">${op.id}</span>
                  <div class="flex-1 relative h-5 bg-gray-50 dark:bg-night-700/30 rounded">
                    <div class="${color} h-full rounded text-white text-xs flex items-center px-2 overflow-hidden whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                         style="position:absolute; left:${leftPct}%; width:${widthPct}%;"
                         title="${prod.nombre} — ${op.estado}"
                         onclick="Produccion.verOP('${op.id}')">
                      <span class="truncate">${prod.nombre}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-gray-400 inline-block"></span>Planificada</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-blue-500 inline-block"></span>En Proceso</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-yellow-500 inline-block"></span>QC</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-green-500 inline-block"></span>Completada</span>
          <span class="flex items-center gap-1.5"><span class="w-0.5 h-4 bg-red-400 inline-block"></span>Hoy</span>
        </div>
      </div>
    `;
  },

  verOP(id) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;
    const prod = AppData.getProducto(op.producto_id);
    const estadoColor = { 'Planificada': 'gray', 'En Proceso': 'blue', 'QC': 'yellow', 'Completada': 'green' };
    const hayFaltante = op.bom.some(item => {
      const mat = AppData.getMaterial(item.material_id);
      return mat.stock < item.cantidad_req;
    });

    const html = `
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs text-gray-400">Orden de Producción</p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">${op.id}</p>
          </div>
          ${UI.badge(op.estado, estadoColor[op.estado] || 'gray')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Producto</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${prod.nombre}</p>
            <p class="text-xs text-gray-400">Cantidad: ${op.cantidad}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Responsable</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${op.operario}</p>
            <p class="text-xs text-gray-400">Prioridad: ${op.prioridad}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Fechas</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Inicio: <strong>${App.formatDate(op.fecha_inicio)}</strong></p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Fin esp.: <strong>${App.formatDate(op.fecha_fin)}</strong></p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Avance y Merma</p>
            ${UI.progressBar(op.avance, 100, op.avance >= 80 ? 'green' : 'blue')}
            <p class="text-xs text-gray-500 mt-1">Merma: <strong>${op.merma}%</strong></p>
          </div>
        </div>
        <!-- BOM -->
        <div>
          <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lista de Materiales (BOM)</p>
          <div class="space-y-1">
            ${op.bom.map(item => {
              const mat = AppData.getMaterial(item.material_id);
              const available = mat.stock >= item.cantidad_req;
              return `
                <div class="flex items-center justify-between p-2 rounded-lg ${available ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}">
                  <div class="flex items-center gap-2">
                    <span class="${available ? 'text-green-500' : 'text-red-500'}">${available ? '✓' : '✕'}</span>
                    <span class="text-sm text-gray-700 dark:text-gray-300">${mat.nombre || item.material_id}</span>
                  </div>
                  <div class="text-right flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.cantidad_req} ${mat.unidad || ''}</span>
                    <span class="text-xs text-gray-400">(stock: ${mat.stock})</span>
                    ${!available ? '<span class="text-xs font-semibold text-red-600 dark:text-red-400">Stock insuficiente</span>' : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${hayFaltante ? '<p class="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">&#9888; Hay materiales con stock insuficiente. No se puede iniciar producción.</p>' : ''}
        </div>
        ${op.estado !== 'Completada' ? `
          <div class="flex gap-2 justify-end pt-2">
            ${op.estado === 'Planificada' ? (hayFaltante
              ? `<button disabled class="px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed" title="Stock insuficiente para iniciar">Iniciar Produccion</button>`
              : `<button onclick="Produccion.cambiarEstado('${op.id}','En Proceso'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Iniciar Produccion</button>`)
            : ''}
            ${op.estado === 'En Proceso' ? `<button onclick="Produccion.cambiarEstado('${op.id}','QC'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">Pasar a QC</button>` : ''}
            ${op.estado === 'QC' ? `<button onclick="Produccion.cambiarEstado('${op.id}','Completada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Completar</button>` : ''}
          </div>
        ` : ''}
      </div>
    `;
    App.showModal(html, null, `Detalle OP — ${op.id}`, true);
  },

  cambiarEstado(id, estado) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (op) {
      op.estado = estado;
      if (estado === 'Completada') op.avance = 100;
      else if (estado === 'QC') op.avance = 95;
      App.showToast(`OP ${id} → ${estado}`, 'success');
      Produccion.render();
    }
  },

  actualizarOP(id) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;
    App.showModal(`
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${UI.input('uop-avance', 'number', 'Avance (%)', op.avance, '0-100')}
          ${UI.input('uop-merma', 'number', 'Merma (%)', op.merma, '0.0')}
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Estado</label>
          <select id="uop-estado" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Planificada','En Proceso','QC','Completada'].map(s => `<option value="${s}" ${s === op.estado ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
    `, () => {
      op.avance = parseInt(document.getElementById('uop-avance').value) || op.avance;
      op.merma = parseFloat(document.getElementById('uop-merma').value) || op.merma;
      op.estado = document.getElementById('uop-estado').value;
      App.showToast(`OP ${id} actualizada`, 'success');
      Produccion.render();
    }, `Actualizar OP — ${id}`);
  },

  showNuevaOP() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Producto *</label>
          <select id="nop-prod" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="">Seleccionar...</option>
            ${AppData.productos.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
          </select>
        </div>
        ${UI.input('nop-cant', 'number', 'Cantidad', '1', '', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Operario *</label>
          <select id="nop-op" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${AppData.empleados.filter(e => e.area === 'Producción').map(e => `<option value="${e.nombre}">${e.nombre} — ${e.cargo}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Prioridad</label>
          <select id="nop-prio" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Normal','Media','Alta'].map(p => `<option>${p}</option>`).join('')}
          </select>
        </div>
        ${UI.input('nop-inicio', 'date', 'Fecha Inicio', '', '', true)}
        ${UI.input('nop-fin', 'date', 'Fecha Fin Esperada', '', '', true)}
      </div>
    `;
    App.showModal(html, () => {
      const prodId = document.getElementById('nop-prod').value;
      if (!prodId) { App.showToast('Selecciona un producto', 'error'); return; }
      const nuevaOP = {
        id: 'OP-2026-' + String(AppData.ordenes_produccion.length + 1).padStart(3, '0'),
        producto_id: prodId,
        ov_id: null,
        cantidad: parseInt(document.getElementById('nop-cant').value) || 1,
        fecha_inicio: document.getElementById('nop-inicio').value,
        fecha_fin: document.getElementById('nop-fin').value,
        estado: 'Planificada',
        operario: document.getElementById('nop-op').value,
        prioridad: document.getElementById('nop-prio').value,
        avance: 0,
        merma: 0,
        bom: [],
      };
      AppData.ordenes_produccion.unshift(nuevaOP);
      App.showToast(`OP ${nuevaOP.id} creada`, 'success');
      Produccion.render();
    }, 'Nueva Orden de Producción');
  },

  searchOP(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#op-table tbody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },
};
