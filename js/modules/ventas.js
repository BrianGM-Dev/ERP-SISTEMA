// ============================================================
// VENTAS.JS - Sales Module
// ============================================================

const Ventas = {
  activeTab: 'cotizaciones',

  render() {
    const content = document.getElementById('main-content');
    const cotAprobadas = AppData.cotizaciones.filter(c => c.estado === 'Aprobada').length;
    const totalMes = AppData.facturas.reduce((s, f) => s + f.total, 0);
    const ovsActivas = AppData.ordenes_venta.filter(o => o.estado !== 'Completada' && o.estado !== 'Entregada').length;

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Ventas', 'Gestión de clientes, cotizaciones y facturación',
          UI.button('+ Nueva Cotización', 'primary', 'Ventas.showNuevaCotizacion()')
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Clientes Registrados', AppData.clientes.length + ' clientes', null, svgIcons.document, 'brand')}
          ${UI.kpiCard('Cotizaciones Aprobadas', cotAprobadas + ' este mes', null, svgIcons.check, 'green', `Efectividad ${AppData.kpis.cotizaciones_efectividad}%`)}
          ${UI.kpiCard('OVs Activas', ovsActivas + ' órdenes', null, svgIcons.cog, 'blue', 'En producción/pendiente')}
          ${UI.kpiCard('Facturación del Mes', App.formatCurrency(totalMes), '+9', svgIcons.currency, 'purple')}
        </div>

        <!-- Tabs -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-night-700">
            ${UI.tabs(
              [
                { id: 'cotizaciones', label: 'Cotizaciones' },
                { id: 'ordenes', label: 'Órdenes de Venta' },
                { id: 'facturas', label: 'Facturas' },
                { id: 'clientes', label: 'Clientes' },
              ],
              this.activeTab,
              'Ventas.switchTab'
            )}
          </div>
          <div id="ventas-tab-content" class="p-6">
            ${this.renderTab(this.activeTab)}
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    Ventas.activeTab = tab;
    ['cotizaciones', 'ordenes', 'facturas', 'clientes'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) {
        btn.className = t === tab
          ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-200 dark:border-night-600'
          : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent';
      }
    });
    const content = document.getElementById('ventas-tab-content');
    if (content) content.innerHTML = Ventas.renderTab(tab);
  },

  renderTab(tab) {
    switch (tab) {
      case 'cotizaciones': return this.renderCotizaciones();
      case 'ordenes': return this.renderOrdenes();
      case 'facturas': return this.renderFacturas();
      case 'clientes': return this.renderClientes();
      default: return '';
    }
  },

  renderCotizaciones() {
    const estadoColor = { 'Borrador': 'gray', 'Enviada': 'blue', 'Aprobada': 'green', 'Rechazada': 'red', 'Expirada': 'orange' };
    return `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div class="w-full sm:w-72">${UI.searchInput('cot-search', 'Buscar cotización...', 'Ventas.searchTable(this.value,"cot-table")')}</div>
        ${UI.button('+ Nueva Cotización', 'primary', 'Ventas.showNuevaCotizacion()')}
      </div>
      <div class="overflow-x-auto">
        <table id="cot-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">N°</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vigencia</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Subtotal</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">IGV 18%</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${AppData.cotizaciones.map(c => {
              const cli = AppData.getCliente(c.cliente_id);
              return `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">${c.id}</td>
                  <td class="px-4 py-3">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${cli.nombre || '-'}</p>
                    <p class="text-xs text-gray-400">${cli.tipo || ''}</p>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(c.fecha)}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(c.vigencia)}</td>
                  <td class="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">${App.formatCurrency(c.subtotal)}</td>
                  <td class="px-4 py-3 text-right text-sm text-gray-500">${App.formatCurrency(c.igv)}</td>
                  <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(c.total)}</td>
                  <td class="px-4 py-3">${UI.badge(c.estado, estadoColor[c.estado] || 'gray')}</td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap items-center gap-1">
                      ${UI.iconBtn(svgIcons.eye, `Ventas.verCotizacion('${c.id}')`, 'Ver detalle', 'brand')}
                      ${c.estado === 'Aprobada' ? `<button onclick="Ventas.convertirAOV('${c.id}')" title="Convertir a OV" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">→ OV</button>` : ''}
                      ${c.estado === 'Borrador' ? UI.iconBtn(svgIcons.edit, `Ventas.editarCotizacion('${c.id}')`, 'Editar', 'gray') : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderOrdenes() {
    const estadoColor = { 'Pendiente': 'yellow', 'En Producción': 'blue', 'Completada': 'green', 'Entregada': 'teal', 'Cancelada': 'red' };
    return `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div class="w-full sm:w-72">${UI.searchInput('ov-search', 'Buscar orden...', 'Ventas.searchTable(this.value,"ov-table")')}</div>
      </div>
      <div class="overflow-x-auto">
        <table id="ov-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">N° OV</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cotización</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">F. Entrega</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${AppData.ordenes_venta.map(ov => {
              const cli = AppData.getCliente(ov.cliente_id);
              return `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">${ov.id}</td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">${cli.nombre || '-'}</td>
                  <td class="px-4 py-3 text-xs text-gray-400">${ov.cotizacion_id || 'Directa'}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(ov.fecha)}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(ov.fecha_entrega)}</td>
                  <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(ov.total)}</td>
                  <td class="px-4 py-3">${UI.badge(ov.estado, estadoColor[ov.estado] || 'gray')}</td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap items-center gap-1">
                      ${UI.iconBtn(svgIcons.eye, `Ventas.verOV('${ov.id}')`, 'Ver', 'brand')}
                      ${(ov.estado === 'Completada' || ov.estado === 'Entregada') ? `<button onclick="Ventas.facturarOV('${ov.id}')" class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg hover:bg-purple-200 transition-colors">→ Factura</button>` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderFacturas() {
    const estadoColor = { 'Pendiente': 'yellow', 'Cobrada': 'green', 'Vencida': 'red', 'Anulada': 'gray' };
    const totalSubtotal = AppData.facturas.reduce((s, f) => s + f.subtotal, 0);
    const totalIgv = AppData.facturas.reduce((s, f) => s + f.igv, 0);
    const totalTotal = AppData.facturas.reduce((s, f) => s + f.total, 0);

    return `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-center">
          <p class="text-xs text-gray-400 mb-1">Subtotal (sin IGV)</p>
          <p class="font-bold text-gray-800 dark:text-white">${App.formatCurrency(totalSubtotal)}</p>
        </div>
        <div class="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl text-center">
          <p class="text-xs text-yellow-600 dark:text-yellow-400 mb-1">IGV 18%</p>
          <p class="font-bold text-yellow-700 dark:text-yellow-300">${App.formatCurrency(totalIgv)}</p>
        </div>
        <div class="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl text-center">
          <p class="text-xs text-brand-600 dark:text-brand-400 mb-1">Total Facturado</p>
          <p class="font-bold text-brand-700 dark:text-brand-300">${App.formatCurrency(totalTotal)}</p>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table id="fac-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Factura</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vencimiento</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Subtotal</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">IGV</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Total</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${AppData.facturas.map(f => {
              const cli = AppData.getCliente(f.cliente_id);
              const isVencida = f.estado === 'Vencida';
              return `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors ${isVencida ? 'bg-red-50 dark:bg-red-900/5' : ''}">
                  <td class="px-4 py-3">
                    <p class="font-mono text-xs font-semibold text-brand-600 dark:text-brand-400">${f.serie}-${f.numero}</p>
                    <p class="text-xs text-gray-400">${f.id}</p>
                  </td>
                  <td class="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">${cli.nombre || '-'}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(f.fecha)}</td>
                  <td class="px-4 py-3 text-sm ${isVencida ? 'text-red-600 font-semibold' : 'text-gray-600 dark:text-gray-400'}">${App.formatDate(f.vencimiento)}</td>
                  <td class="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">${App.formatCurrency(f.subtotal)}</td>
                  <td class="px-4 py-3 text-right text-sm text-gray-500">${App.formatCurrency(f.igv)}</td>
                  <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(f.total)}</td>
                  <td class="px-4 py-3">${UI.badge(f.estado, estadoColor[f.estado] || 'gray')}</td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap items-center gap-1">
                      ${UI.iconBtn(svgIcons.eye, `Ventas.verFactura('${f.id}')`, 'Ver', 'brand')}
                      ${f.estado === 'Pendiente' ? `<button onclick="Ventas.marcarCobrada('${f.id}')" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">Cobrar</button>` : ''}
                    </div>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  renderClientes() {
    return `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div class="w-full sm:w-72">${UI.searchInput('cli-search', 'Buscar cliente...', 'Ventas.searchClientes(this.value)')}</div>
        ${UI.button('+ Nuevo Cliente', 'secondary', 'Ventas.showNuevoCliente()')}
      </div>
      <div class="overflow-x-auto">
        <table id="cli-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">RUC/DNI</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contacto</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Ciudad</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tipo</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Línea Crédito</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${AppData.clientes.map(c => `
              <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    ${UI.avatar(c.nombre, 'sm', ['brand','green','blue','purple','orange'][AppData.clientes.indexOf(c) % 5])}
                    <div>
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${c.nombre}</p>
                      <p class="text-xs text-gray-400">${c.email}</p>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 font-mono text-xs text-gray-500">${c.ruc}</td>
                <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${c.contacto}<br><span class="text-xs text-gray-400">${c.telefono}</span></td>
                <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${c.ciudad}</td>
                <td class="px-4 py-3">${UI.badge(c.tipo, c.tipo === 'Gobierno' ? 'orange' : c.tipo === 'Empresa' ? 'blue' : 'gray')}</td>
                <td class="px-4 py-3 text-right text-sm text-gray-700 dark:text-gray-300">${App.formatCurrency(c.credito_limite)}<br><span class="text-xs text-gray-400">${c.credito_dias}d</span></td>
                <td class="px-4 py-3">
                  <div class="flex flex-wrap gap-1">
                    ${UI.iconBtn(svgIcons.eye, `Ventas.verHistorialCliente('${c.id}')`, 'Historial', 'brand')}
                    ${UI.iconBtn(svgIcons.edit, `Ventas.editarCliente('${c.id}')`, 'Editar', 'gray')}
                  </div>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  searchTable(query, tableId) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll(`#${tableId} tbody tr`);
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  searchClientes(q) { this.searchTable(q, 'cli-table'); },

  showNuevaCotizacion() {
    const html = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cliente *</label>
            <select id="nc-cli" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
              <option value="">Seleccionar cliente...</option>
              ${AppData.clientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('')}
            </select>
          </div>
          ${UI.input('nc-vigencia', 'date', 'Vigencia hasta', '', '', true)}
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Partidas *</label>
            <button onclick="Ventas.addLineaCot()" class="text-xs text-brand-600 dark:text-brand-400 hover:underline">+ Agregar línea</button>
          </div>
          <div class="space-y-2" id="nc-items">
            ${this.lineaCotHTML(0)}
          </div>
        </div>
        <div class="flex items-center gap-3 pt-2">
          <input type="checkbox" id="nc-igv" checked class="w-4 h-4 rounded text-brand-600">
          <label for="nc-igv" class="text-sm text-gray-600 dark:text-gray-300">Incluir IGV 18%</label>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-night-700/50 rounded-xl space-y-2" id="nc-resumen">
          <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal:</span><span id="nc-sub">S/ 0.00</span></div>
          <div class="flex justify-between text-sm"><span class="text-gray-500">IGV 18%:</span><span id="nc-igv-val">S/ 0.00</span></div>
          <div class="flex justify-between font-bold"><span class="text-gray-700 dark:text-gray-200">Total:</span><span id="nc-total" class="text-brand-600 text-lg">S/ 0.00</span></div>
        </div>
        ${UI.textarea('nc-notas', 'Notas para el cliente', '', 'Condiciones, plazo de entrega...')}
      </div>
    `;
    App.showModal(html, () => {
      const cliId = document.getElementById('nc-cli').value;
      if (!cliId) { App.showToast('Selecciona un cliente', 'error'); return; }
      const igvCb = document.getElementById('nc-igv');
      const subtotal = parseFloat(document.getElementById('nc-sub').textContent.replace('S/ ', '').replace(',', '')) || 0;
      const igv = igvCb.checked ? subtotal * (AppData.config_empresa.igv / 100) : 0;
      const total = subtotal + igv;
      const items = [];
      document.querySelectorAll('.nco-line').forEach(line => {
        const descripcion = line.querySelector('.nco-desc')?.value?.trim() || '';
        const cantidad = parseFloat(line.querySelector('.nco-qty')?.value) || 0;
        const precio_unitario = parseFloat(line.querySelector('.nco-precio')?.value) || 0;
        if (descripcion && cantidad > 0 && precio_unitario > 0) {
          items.push({ descripcion, cantidad, precio: precio_unitario, subtotal: cantidad * precio_unitario });
        }
      });
      const nuevaCot = {
        id: 'COT-2026-' + String(AppData.cotizaciones.length + 1).padStart(3, '0'),
        cliente_id: cliId,
        fecha: new Date().toISOString().split('T')[0],
        vigencia: document.getElementById('nc-vigencia').value,
        estado: 'Borrador',
        subtotal,
        igv,
        total,
        items,
        notas: document.getElementById('nc-notas').value,
      };
      AppData.cotizaciones.unshift(nuevaCot);
      App.showToast(`Cotización ${nuevaCot.id} creada`, 'success');
      Ventas.render();
    }, 'Nueva Cotización', true);

    // Attach IGV toggle
    setTimeout(() => {
      const cb = document.getElementById('nc-igv');
      if (cb) cb.addEventListener('change', () => Ventas.calcCot());
    }, 100);
  },

  lineaCotHTML(idx) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end nco-line">
        <div class="sm:col-span-6">
          <input type="text" class="nco-desc w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Descripción del producto/servicio" oninput="Ventas.calcCot()"/>
        </div>
        <div class="sm:col-span-2">
          <input type="number" class="nco-qty w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Cant." min="1" value="1" oninput="Ventas.calcCot()"/>
        </div>
        <div class="sm:col-span-2">
          <input type="number" class="nco-precio w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="P.Unit." step="0.01" oninput="Ventas.calcCot()"/>
        </div>
        <div class="sm:col-span-1 text-center">
          <span class="nco-sub text-xs font-semibold text-gray-500">S/0</span>
        </div>
        <div class="sm:col-span-1 text-center">
          <button onclick="this.closest('.nco-line').remove(); Ventas.calcCot();" class="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
        </div>
      </div>
    `;
  },

  addLineaCot() {
    const container = document.getElementById('nc-items');
    if (!container) return;
    const div = document.createElement('div');
    div.innerHTML = this.lineaCotHTML(container.children.length);
    container.appendChild(div.firstElementChild);
  },

  calcCot() {
    let subtotal = 0;
    document.querySelectorAll('.nco-line').forEach(line => {
      const qty = parseFloat(line.querySelector('.nco-qty')?.value) || 0;
      const precio = parseFloat(line.querySelector('.nco-precio')?.value) || 0;
      const sub = qty * precio;
      subtotal += sub;
      const subEl = line.querySelector('.nco-sub');
      if (subEl) subEl.textContent = 'S/' + sub.toFixed(2);
    });
    const igvCb = document.getElementById('nc-igv');
    const igv = igvCb && igvCb.checked ? subtotal * (AppData.config_empresa.igv / 100) : 0;
    const total = subtotal + igv;
    const subEl = document.getElementById('nc-sub');
    const igvEl = document.getElementById('nc-igv-val');
    const totalEl = document.getElementById('nc-total');
    if (subEl) subEl.textContent = App.formatCurrency(subtotal);
    if (igvEl) igvEl.textContent = App.formatCurrency(igv);
    if (totalEl) totalEl.textContent = App.formatCurrency(total);
  },

  verCotizacion(id) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (!c) return;
    const cli = AppData.getCliente(c.cliente_id);
    const estadoColor = { 'Borrador': 'gray', 'Enviada': 'blue', 'Aprobada': 'green', 'Rechazada': 'red', 'Expirada': 'orange' };
    const html = `
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs text-gray-400">Cotización</p>
            <p class="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">${c.id}</p>
          </div>
          ${UI.badge(c.estado, estadoColor[c.estado] || 'gray')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Cliente</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${cli.nombre}</p>
            <p class="text-xs text-gray-500">RUC: ${cli.ruc}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Fechas</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Emisión: <strong>${App.formatDate(c.fecha)}</strong></p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Vigencia: <strong>${App.formatDate(c.vigencia)}</strong></p>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-gray-100 dark:border-night-700">
              <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Descripción</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Cant.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">P. Unit.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Subtotal</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${c.items.map(item => `
                <tr>
                  <td class="py-2 px-3 text-gray-700 dark:text-gray-300">${item.descripcion}</td>
                  <td class="py-2 px-3 text-right">${item.cantidad}</td>
                  <td class="py-2 px-3 text-right">${App.formatCurrency(item.precio)}</td>
                  <td class="py-2 px-3 text-right font-semibold">${App.formatCurrency(item.cantidad * item.precio)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="space-y-1 text-sm border-t border-gray-100 dark:border-night-700 pt-3">
          <div class="flex justify-between"><span class="text-gray-500">Subtotal:</span><span>${App.formatCurrency(c.subtotal)}</span></div>
          <div class="flex justify-between"><span class="text-gray-500">IGV 18%:</span><span>${App.formatCurrency(c.igv)}</span></div>
          <div class="flex justify-between font-bold text-base"><span class="text-gray-700 dark:text-gray-200">TOTAL:</span><span class="text-brand-600">${App.formatCurrency(c.total)}</span></div>
        </div>
        ${c.notas ? `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs text-blue-700 dark:text-blue-400">Nota: ${c.notas}</div>` : ''}
        ${c.estado === 'Borrador' ? `
          <div class="flex flex-wrap gap-2 justify-end pt-2">
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Enviada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Marcar Enviada</button>
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Aprobada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Aprobar</button>
          </div>
        ` : c.estado === 'Enviada' ? `
          <div class="flex flex-wrap gap-2 justify-end pt-2">
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Aprobada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Aprobar</button>
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Rechazada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Rechazar</button>
          </div>
        ` : ''}
      </div>
    `;
    App.showModal(html, null, `Cotización ${c.id}`, true);
  },

  cambiarEstadoCot(id, estado) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (c) {
      c.estado = estado;
      App.showToast(`Cotización ${id} marcada como ${estado}`, 'success');
      Ventas.render();
    }
  },

  convertirAOV(cotId) {
    const cot = AppData.cotizaciones.find(c => c.id === cotId);
    if (!cot) return;
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Crear Orden de Venta?</h3><p class="text-gray-500">Desde cotización ${cotId} — ${App.formatCurrency(cot.total)}</p></div>`,
      () => {
        const nuevaOV = {
          id: 'OV-2026-' + String(AppData.ordenes_venta.length + 1).padStart(3, '0'),
          cotizacion_id: cotId,
          cliente_id: cot.cliente_id,
          fecha: new Date().toISOString().split('T')[0],
          fecha_entrega: '',
          estado: 'Pendiente',
          subtotal: cot.subtotal,
          igv: cot.igv,
          total: cot.total,
          items: cot.items.map(item => ({ ...item })),
        };
        AppData.ordenes_venta.unshift(nuevaOV);
        App.showToast(`OV ${nuevaOV.id} creada exitosamente`, 'success');
        Ventas.activeTab = 'ordenes';
        Ventas.render();
      }
    );
  },

  facturarOV(ovId) {
    const ov = AppData.ordenes_venta.find(o => o.id === ovId);
    if (!ov) return;
    const existing = AppData.facturas.find(f => f.ov_id === ovId);
    if (existing) { App.showToast('Esta OV ya tiene una factura: ' + existing.id, 'warning'); return; }

    const subtotal = ov.total / (1 + AppData.config_empresa.igv / 100);
    const igv = ov.total - subtotal;
    const nuevaFac = {
      id: 'FAC-2026-' + String(AppData.facturas.length + 1).padStart(3, '0'),
      serie: 'F001',
      numero: String(AppData.facturas.length + 1).padStart(8, '0'),
      ov_id: ovId,
      cliente_id: ov.cliente_id,
      fecha: new Date().toISOString().split('T')[0],
      vencimiento: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      subtotal: Math.round(subtotal * 100) / 100,
      igv: Math.round(igv * 100) / 100,
      total: ov.total,
      estado: 'Pendiente',
      metodo_pago: 'Pendiente',
    };
    AppData.facturas.unshift(nuevaFac);
    App.showToast(`Factura ${nuevaFac.id} emitida`, 'success');
    Ventas.activeTab = 'facturas';
    Ventas.render();
  },

  verFactura(id) {
    const f = AppData.facturas.find(x => x.id === id);
    if (!f) return;
    const cli = AppData.getCliente(f.cliente_id);
    const conf = AppData.config_empresa;
    const estadoColor = { 'Pendiente': 'yellow', 'Cobrada': 'green', 'Vencida': 'red' };
    const html = `
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row justify-between items-start border-b border-gray-100 dark:border-night-700 pb-4 gap-3">
          <div>
            <p class="text-lg font-bold text-gray-800 dark:text-white">${conf.nombre}</p>
            <p class="text-xs text-gray-400">RUC: ${conf.ruc}</p>
          </div>
          <div class="sm:text-right">
            <p class="text-xs text-gray-400">FACTURA ELECTRÓNICA</p>
            <p class="text-xl font-bold text-brand-600">${f.serie}-${f.numero}</p>
            ${UI.badge(f.estado, estadoColor[f.estado] || 'gray')}
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-xs text-gray-400">Señor(es):</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${cli.nombre}</p>
            <p class="text-xs text-gray-400">RUC: ${cli.ruc}</p>
          </div>
          <div class="sm:text-right">
            <p class="text-xs text-gray-400">Fecha emisión: <strong>${App.formatDate(f.fecha)}</strong></p>
            <p class="text-xs text-gray-400">Vencimiento: <strong>${App.formatDate(f.vencimiento)}</strong></p>
            <p class="text-xs text-gray-400">Pago: ${f.metodo_pago}</p>
          </div>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-night-700/50 rounded-xl space-y-3">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-300">Valor de Venta (OP. GRAVADA)</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">${App.formatCurrency(f.subtotal)}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600 dark:text-gray-300">I.G.V. 18%</span>
            <span class="font-medium text-gray-800 dark:text-gray-200">${App.formatCurrency(f.igv)}</span>
          </div>
          <div class="flex justify-between font-bold text-base border-t border-gray-200 dark:border-night-600 pt-2">
            <span class="text-gray-800 dark:text-white">IMPORTE TOTAL</span>
            <span class="text-brand-600 text-xl">${App.formatCurrency(f.total)}</span>
          </div>
        </div>
      </div>
    `;
    App.showModal(html, null, 'Detalle de Factura');
  },

  marcarCobrada(id) {
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Registrar cobro?</h3><p class="text-gray-500">Factura ${id}</p></div>`,
      () => {
        const f = AppData.facturas.find(x => x.id === id);
        if (f) { f.estado = 'Cobrada'; App.showToast('Cobro registrado: ' + id, 'success'); Ventas.render(); }
      }
    );
  },

  verOV(id) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (!ov) return;
    const cli = AppData.getCliente(ov.cliente_id);
    const estadoColor = { 'Pendiente': 'yellow', 'En Producción': 'blue', 'Completada': 'green', 'Entregada': 'teal' };
    const html = `
      <div class="space-y-3">
        <div class="flex justify-between"><span class="text-xs text-gray-400">OV</span>${UI.badge(ov.estado, estadoColor[ov.estado] || 'gray')}</div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">${ov.id}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400">Cliente</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${cli.nombre}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400">Entrega</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${App.formatDate(ov.fecha_entrega) || 'Sin definir'}</p>
          </div>
        </div>
        <div class="flex justify-between font-bold text-base pt-2 border-t border-gray-100 dark:border-night-700">
          <span class="text-gray-700 dark:text-gray-300">Total OV:</span>
          <span class="text-brand-600 text-xl">${App.formatCurrency(ov.total)}</span>
        </div>
        ${(ov.estado === 'En Producción' || ov.estado === 'Pendiente') ? `
          <div class="flex flex-wrap justify-end gap-2 pt-1">
            <button onclick="Ventas.cambiarEstadoOV('${ov.id}','Completada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Completar</button>
            <button onclick="Ventas.cambiarEstadoOV('${ov.id}','Entregada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors">Entregar</button>
          </div>
        ` : ''}
      </div>
    `;
    App.showModal(html, null, `OV ${ov.id}`);
  },

  cambiarEstadoOV(id, estado) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (ov) { ov.estado = estado; App.showToast(`OV ${id}: ${estado}`, 'success'); Ventas.render(); }
  },

  showNuevoCliente() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ncl-nombre', 'text', 'Nombre / Razón Social', '', '', true)}
        ${UI.input('ncl-ruc', 'text', 'RUC / DNI', '', '20XXXXXXXXX', true)}
        ${UI.input('ncl-contacto', 'text', 'Contacto', '', 'Nombre representante')}
        ${UI.input('ncl-email', 'email', 'Email', '', 'email@empresa.pe')}
        ${UI.input('ncl-telefono', 'text', 'Teléfono', '', '044-XXXXXX')}
        ${UI.input('ncl-ciudad', 'text', 'Ciudad', 'Trujillo', '')}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo</label>
          <select id="ncl-tipo" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Empresa','Persona','Gobierno'].map(t => `<option>${t}</option>`).join('')}
          </select>
        </div>
        ${UI.input('ncl-credito', 'number', 'Límite de Crédito (S/)', '0', '')}
      </div>
    `;
    App.showModal(html, () => {
      const nombre = document.getElementById('ncl-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
      const nuevo = {
        id: 'CLI-' + String(AppData.clientes.length + 1).padStart(3, '0'),
        nombre,
        ruc: document.getElementById('ncl-ruc').value,
        contacto: document.getElementById('ncl-contacto').value,
        email: document.getElementById('ncl-email').value,
        telefono: document.getElementById('ncl-telefono').value,
        ciudad: document.getElementById('ncl-ciudad').value,
        tipo: document.getElementById('ncl-tipo').value,
        credito_limite: parseFloat(document.getElementById('ncl-credito').value) || 0,
        credito_dias: 30,
      };
      AppData.clientes.push(nuevo);
      App.showToast(`Cliente "${nombre}" registrado`, 'success');
      Ventas.render();
    }, 'Nuevo Cliente');
  },

  editarCliente(id) {
    const c = AppData.getCliente(id);
    if (!c.id) return;
    App.showModal(`
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ecl-nombre', 'text', 'Nombre', c.nombre, '', true)}
        ${UI.input('ecl-email', 'email', 'Email', c.email, '')}
        ${UI.input('ecl-telefono', 'text', 'Teléfono', c.telefono, '')}
        ${UI.input('ecl-ciudad', 'text', 'Ciudad', c.ciudad, '')}
        ${UI.input('ecl-credito', 'number', 'Límite Crédito', c.credito_limite, '')}
        ${UI.input('ecl-dias', 'number', 'Días Crédito', c.credito_dias, '')}
      </div>
    `, () => {
      const idx = AppData.clientes.findIndex(x => x.id === id);
      if (idx !== -1) {
        AppData.clientes[idx].nombre = document.getElementById('ecl-nombre').value;
        AppData.clientes[idx].email = document.getElementById('ecl-email').value;
        AppData.clientes[idx].telefono = document.getElementById('ecl-telefono').value;
        AppData.clientes[idx].ciudad = document.getElementById('ecl-ciudad').value;
        AppData.clientes[idx].credito_limite = parseFloat(document.getElementById('ecl-credito').value) || 0;
        AppData.clientes[idx].credito_dias = parseInt(document.getElementById('ecl-dias').value) || 0;
        App.showToast('Cliente actualizado', 'success');
        Ventas.render();
      }
    }, `Editar: ${c.nombre}`);
  },

  verHistorialCliente(id) {
    const c = AppData.getCliente(id);
    const cots = AppData.cotizaciones.filter(x => x.cliente_id === id).length;
    const ovs = AppData.ordenes_venta.filter(x => x.cliente_id === id).length;
    const facs = AppData.facturas.filter(x => x.cliente_id === id);
    const totalFac = facs.reduce((s, f) => s + f.total, 0);
    const html = `
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          ${UI.avatar(c.nombre, 'lg', 'brand')}
          <div>
            <p class="font-bold text-gray-800 dark:text-white">${c.nombre}</p>
            <p class="text-xs text-gray-400">RUC: ${c.ruc}</p>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-center">
            <p class="text-xl font-bold text-blue-600">${cots}</p>
            <p class="text-xs text-gray-400">Cotizaciones</p>
          </div>
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-xl text-center">
            <p class="text-xl font-bold text-green-600">${ovs}</p>
            <p class="text-xs text-gray-400">Órdenes</p>
          </div>
          <div class="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-xl text-center">
            <p class="text-xl font-bold text-brand-600">${App.formatCurrency(totalFac)}</p>
            <p class="text-xs text-gray-400">Total Facturado</p>
          </div>
        </div>
        <div class="space-y-2">
          ${facs.map(f => `
            <div class="flex flex-wrap justify-between items-center p-2 bg-gray-50 dark:bg-night-700/50 rounded-lg text-sm gap-2">
              <span class="font-mono text-xs text-brand-600">${f.serie}-${f.numero}</span>
              <span class="text-gray-500">${App.formatDate(f.fecha)}</span>
              <span class="font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(f.total)}</span>
              ${UI.badge(f.estado, { 'Cobrada': 'green', 'Pendiente': 'yellow', 'Vencida': 'red' }[f.estado] || 'gray')}
            </div>
          `).join('')}
        </div>
      </div>
    `;
    App.showModal(html, null, `Historial: ${c.nombre}`);
  },

  editarCotizacion(id) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (!c) return;
    App.showModal(`
      <div class="space-y-4">
        <p class="text-sm text-gray-500">Cotización: <strong>${id}</strong></p>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Estado</label>
          <select id="ec-estado" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Borrador','Enviada','Aprobada','Rechazada','Expirada'].map(s => `<option value="${s}" ${s === c.estado ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
        ${UI.textarea('ec-notas', 'Notas', c.notas, '')}
      </div>
    `, () => {
      c.estado = document.getElementById('ec-estado').value;
      c.notas = document.getElementById('ec-notas').value;
      App.showToast('Cotización actualizada', 'success');
      Ventas.render();
    }, `Editar ${id}`);
  },
};
