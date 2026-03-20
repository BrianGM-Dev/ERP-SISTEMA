// ============================================================
// COMPRAS.JS - Purchases Module
// ============================================================

const Compras = {
  activeTab: 'oc',

  render() {
    const content = document.getElementById('main-content');
    const ocs = AppData.ordenes_compra;
    const pendientes = ocs.filter(o => o.estado === 'Pendiente').length;
    const totalMes = ocs.filter(o => o.fecha >= '2026-03-01').reduce((s, o) => s + o.total, 0);

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Compras', 'Gestión de proveedores y órdenes de compra',
          UI.button('+ Nueva OC', 'primary', 'Compras.showNuevaOC()')
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Proveedores Activos', AppData.proveedores.length + ' proveedores', null, svgIcons.document, 'brand')}
          ${UI.kpiCard('OCs Pendientes', pendientes + ' órdenes', null, svgIcons.bell, 'yellow', 'Requieren aprobación')}
          ${UI.kpiCard('Compras del Mes', App.formatCurrency(totalMes), null, svgIcons.currency, 'green')}
          ${UI.kpiCard('Por Pagar', App.formatCurrency(AppData.resumen_finanzas.total_pagar), null, svgIcons.currency, 'red', 'CxP vigentes')}
        </div>

        <!-- Tabs -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-night-700">
            ${UI.tabs(
              [{ id: 'oc', label: 'Órdenes de Compra' }, { id: 'proveedores', label: 'Proveedores' }],
              this.activeTab,
              'Compras.switchTab'
            )}
          </div>
          <div id="compras-tab-content" class="p-6">
            ${this.activeTab === 'oc' ? this.renderOC() : this.renderProveedores()}
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    Compras.activeTab = tab;
    ['oc', 'proveedores'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) {
        btn.className = t === tab
          ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-200 dark:border-night-600'
          : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent';
      }
    });
    const tabContent = document.getElementById('compras-tab-content');
    if (tabContent) {
      tabContent.innerHTML = tab === 'oc' ? Compras.renderOC() : Compras.renderProveedores();
    }
  },

  renderOC() {
    const estadoBadge = (e) => {
      const map = { 'Pendiente': 'yellow', 'Aprobada': 'blue', 'Recibida': 'green', 'Parcial': 'orange' };
      return UI.badge(e, map[e] || 'gray');
    };

    return `
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4">
        <div class="w-full sm:w-72">${UI.searchInput('oc-search', 'Buscar OC o proveedor...', 'Compras.searchOC(this.value)')}</div>
        <div class="flex gap-2 flex-wrap">
          ${['Todos', 'Pendiente', 'Aprobada', 'Recibida', 'Parcial'].map(s => `
            <button onclick="Compras.filterOC('${s}')" class="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-night-700 text-gray-600 dark:text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">${s}</button>
          `).join('')}
        </div>
      </div>
      <div class="overflow-x-auto" id="oc-table-wrapper">
        <table id="oc-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">N° OC</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Proveedor</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Fecha</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">F. Entrega</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Items</th>
              <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Estado</th>
              <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${AppData.ordenes_compra.map(oc => {
              const prov = AppData.getProveedor(oc.proveedor_id);
              return `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                  <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">${oc.id}</td>
                  <td class="px-4 py-3">
                    <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${prov.nombre || '-'}</p>
                    <p class="text-xs text-gray-400">${prov.ciudad || ''}</p>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(oc.fecha)}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(oc.fecha_entrega)}</td>
                  <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${oc.items.length} item(s)</td>
                  <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(oc.total)}</td>
                  <td class="px-4 py-3">${estadoBadge(oc.estado)}</td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-1">
                      ${UI.iconBtn(svgIcons.eye, `Compras.verOC('${oc.id}')`, 'Ver detalle', 'brand')}
                      ${oc.estado === 'Pendiente' ? UI.iconBtn(svgIcons.check, `Compras.aprobarOC('${oc.id}')`, 'Aprobar', 'green') : ''}
                      ${oc.estado === 'Aprobada' ? UI.iconBtn('<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8l1.6 11.2A2 2 0 008.6 21h6.8a2 2 0 001.996-1.8L19 8M10 12v5M14 12v5"/></svg>', `Compras.recepcionarOC('${oc.id}')`, 'Recepcionar', 'blue') : ''}
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

  renderProveedores() {
    return `
      <div class="mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div class="w-full sm:w-72">${UI.searchInput('prov-search', 'Buscar proveedor...', 'Compras.searchProv(this.value)')}</div>
        ${UI.button('+ Nuevo Proveedor', 'secondary', 'Compras.showNuevoProveedor()')}
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" id="prov-grid">
        ${AppData.proveedores.map(p => `
          <div class="border border-gray-100 dark:border-night-700 rounded-xl p-4 hover:border-brand-200 dark:hover:border-brand-700 hover:shadow-md transition-all">
            <div class="flex items-start justify-between mb-3">
              <div class="w-10 h-10 bg-brand-100 dark:bg-brand-900/30 rounded-xl flex items-center justify-center text-brand-600 dark:text-brand-400 font-bold text-lg">
                ${p.nombre.charAt(0)}
              </div>
              <div class="flex">${UI.stars(p.rating)}</div>
            </div>
            <h4 class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1 leading-tight">${p.nombre}</h4>
            <p class="text-xs text-gray-400 mb-2">RUC: ${p.ruc}</p>
            <div class="space-y-1 text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center gap-1.5">${p.contacto}</div>
              <div class="flex items-center gap-1.5">${p.email}</div>
              <div class="flex items-center gap-1.5">${p.ciudad}</div>
            </div>
            <div class="mt-3 flex items-center justify-between">
              ${UI.badge(p.categoria, 'brand')}
              <span class="text-xs text-gray-400">Crédito: ${p.credito_dias}d</span>
            </div>
            <div class="mt-3 flex gap-2">
              ${UI.button('Ver OCs', 'ghost', `Compras.verOCsPorProveedor('${p.id}')`)}
              ${UI.button('Editar', 'outline', `Compras.editarProveedor('${p.id}')`)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  },

  searchOC(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#oc-table tbody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  filterOC(estado) {
    const rows = document.querySelectorAll('#oc-table tbody tr');
    rows.forEach(r => {
      r.style.display = (estado === 'Todos' || r.textContent.includes(estado)) ? '' : 'none';
    });
  },

  searchProv(query) {
    const q = query.toLowerCase();
    const cards = document.querySelectorAll('#prov-grid > div');
    cards.forEach(c => { c.style.display = c.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  verOC(id) {
    const oc = AppData.ordenes_compra.find(o => o.id === id);
    if (!oc) return;
    const prov = AppData.getProveedor(oc.proveedor_id);
    const estadoColors = { 'Pendiente': 'yellow', 'Aprobada': 'blue', 'Recibida': 'green', 'Parcial': 'orange' };

    const html = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400">Orden de Compra</p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">${oc.id}</p>
          </div>
          ${UI.badge(oc.estado, estadoColors[oc.estado] || 'gray')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Proveedor</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${prov.nombre}</p>
            <p class="text-xs text-gray-500">${prov.contacto} — ${prov.telefono}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Fechas</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Emisión: <strong>${App.formatDate(oc.fecha)}</strong></p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Entrega: <strong>${App.formatDate(oc.fecha_entrega)}</strong></p>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-gray-100 dark:border-night-700">
              <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Material</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Cant.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">P. Unit.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Subtotal</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${oc.items.map(item => {
                const mat = AppData.getMaterial(item.material_id);
                return `
                  <tr>
                    <td class="py-2 px-3 text-gray-700 dark:text-gray-300">${mat.nombre || item.material_id}</td>
                    <td class="py-2 px-3 text-right text-gray-600">${item.cantidad}</td>
                    <td class="py-2 px-3 text-right text-gray-600">${App.formatCurrency(item.precio)}</td>
                    <td class="py-2 px-3 text-right font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(item.cantidad * item.precio)}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
            <tfoot>
              <tr class="border-t-2 border-gray-200 dark:border-night-600">
                <td colspan="3" class="py-3 px-3 text-right font-bold text-gray-700 dark:text-gray-300">TOTAL</td>
                <td class="py-3 px-3 text-right font-bold text-brand-600 text-lg">${App.formatCurrency(oc.total)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        ${oc.notas ? `<div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl text-xs text-blue-700 dark:text-blue-400">Nota: ${oc.notas}</div>` : ''}
      </div>
    `;
    App.showModal(html, null, `Detalle OC — ${oc.id}`, true);
  },

  aprobarOC(id) {
    const oc = AppData.ordenes_compra.find(o => o.id === id);
    if (!oc) return;
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">¿Aprobar OC?</h3><p class="text-gray-500">Orden ${id} — ${App.formatCurrency(oc.total)}</p></div>`,
      () => {
        oc.estado = 'Aprobada';
        oc.aprobado_por = App.state.user.nombre;
        oc.fecha_aprobacion = new Date().toISOString().split('T')[0];
        App.showToast(`OC ${id} aprobada correctamente`, 'success');
        Compras.render();
      }
    );
  },

  recepcionarOC(id) {
    const oc = AppData.ordenes_compra.find(o => o.id === id);
    if (!oc) return;
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">¿Marcar como Recibida?</h3><p class="text-gray-500">Se actualizará el stock de los materiales</p></div>`,
      () => {
        // Validate OC has items before receiving
        if (!oc.items || oc.items.length === 0) {
          App.showToast('No se puede recepcionar: la OC no tiene ítems', 'error');
          return;
        }
        // Validate all items have valid quantities
        const invalidItems = oc.items.filter(item => !item.cantidad || item.cantidad <= 0);
        if (invalidItems.length > 0) {
          App.showToast('No se puede recepcionar: hay ítems con cantidad inválida', 'error');
          return;
        }
        // Validate all materials exist in the system
        const missingMaterials = oc.items.filter(item => {
          return AppData.materiales.findIndex(m => m.id === item.material_id) === -1;
        });
        if (missingMaterials.length > 0) {
          App.showToast('No se puede recepcionar: hay materiales no registrados en el sistema', 'error');
          return;
        }
        oc.estado = 'Recibida';
        oc.fecha_recepcion = new Date().toISOString().split('T')[0];
        // Update stock for each item
        oc.items.forEach(item => {
          const idx = AppData.materiales.findIndex(m => m.id === item.material_id);
          if (idx !== -1) {
            AppData.materiales[idx].stock += item.cantidad;
            const s = AppData.materiales[idx];
            s.estado = s.stock === 0 ? 'Agotado' : s.stock < s.min_stock ? 'Stock Bajo' : 'OK';
          }
        });
        App.showToast(`OC ${id} recepcionada y stock actualizado`, 'success');
        Compras.render();
      }
    );
  },

  showNuevaOC() {
    const html = `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Proveedor *</label>
            <select id="noc-prov" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
              <option value="">Seleccionar proveedor...</option>
              ${AppData.proveedores.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
            </select>
          </div>
          ${UI.input('noc-entrega', 'date', 'Fecha de Entrega Esperada', '', '', true)}
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Materiales *</label>
            <button onclick="Compras.addLineaOC()" class="text-xs text-brand-600 dark:text-brand-400 hover:underline">+ Agregar línea</button>
          </div>
          <div id="noc-items" class="space-y-2">
            ${this.lineaOCHTML(0)}
          </div>
        </div>
        <div class="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-night-700">
          <span class="text-sm text-gray-500 dark:text-gray-400">Total estimado:</span>
          <span id="noc-total" class="text-lg font-bold text-brand-600">S/ 0.00</span>
        </div>
        ${UI.textarea('noc-notas', 'Notas / Condiciones', '', 'Condiciones de entrega, forma de pago...')}
      </div>
    `;
    App.showModal(html, () => {
      const provId = document.getElementById('noc-prov').value;
      if (!provId) { App.showToast('Selecciona un proveedor', 'error'); return; }
      const nuevaOC = {
        id: 'OC-2026-' + String(AppData.ordenes_compra.length + 1).padStart(3, '0'),
        proveedor_id: provId,
        fecha: new Date().toISOString().split('T')[0],
        fecha_entrega: document.getElementById('noc-entrega').value,
        estado: 'Pendiente',
        total: parseFloat(document.getElementById('noc-total').textContent.replace('S/ ', '').replace(',', '')) || 0,
        items: (() => {
          const items = [];
          document.querySelectorAll('[id^="noc-line-"]').forEach(line => {
            const matSelect = line.querySelector('.noc-mat');
            const material_id = matSelect ? matSelect.value : '';
            const cantidad = parseFloat(line.querySelector('.noc-qty')?.value) || 0;
            const precio = parseFloat(line.querySelector('.noc-precio')?.value) || 0;
            if (material_id && cantidad > 0) {
              items.push({ material_id, cantidad, precio });
            }
          });
          return items;
        })(),
        aprobado_por: null,
        notas: document.getElementById('noc-notas').value,
      };
      AppData.ordenes_compra.unshift(nuevaOC);
      App.showToast(`OC ${nuevaOC.id} creada exitosamente`, 'success');
      Compras.render();
    }, 'Nueva Orden de Compra', true);
  },

  lineaOCHTML(idx) {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end" id="noc-line-${idx}">
        <div class="sm:col-span-6">
          <select class="noc-mat w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" onchange="Compras.calcTotal()">
            <option value="">Seleccionar material...</option>
            ${AppData.materiales.map(m => `<option value="${m.id}" data-precio="${m.precio_unit}">${m.nombre}</option>`).join('')}
          </select>
        </div>
        <div class="sm:col-span-2">
          <input type="number" class="noc-qty w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Cant." min="1" oninput="Compras.calcTotal()"/>
        </div>
        <div class="sm:col-span-2">
          <input type="number" class="noc-precio w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400" placeholder="Precio" step="0.01" oninput="Compras.calcTotal()"/>
        </div>
        <div class="sm:col-span-1 text-center">
          <span class="noc-sub text-xs font-semibold text-gray-500">S/0</span>
        </div>
        <div class="sm:col-span-1 text-center">
          <button onclick="this.closest('[id^=noc-line-]').remove(); Compras.calcTotal();" class="text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
        </div>
      </div>
    `;
  },

  addLineaOC() {
    const container = document.getElementById('noc-items');
    if (!container) return;
    const idx = container.children.length;
    const div = document.createElement('div');
    div.innerHTML = this.lineaOCHTML(idx);
    container.appendChild(div.firstElementChild);
  },

  calcTotal() {
    let total = 0;
    document.querySelectorAll('[id^="noc-line-"]').forEach(line => {
      const qty = parseFloat(line.querySelector('.noc-qty')?.value) || 0;
      const precio = parseFloat(line.querySelector('.noc-precio')?.value) || 0;
      const sub = qty * precio;
      total += sub;
      const subEl = line.querySelector('.noc-sub');
      if (subEl) subEl.textContent = 'S/' + sub.toFixed(2);
    });
    const totalEl = document.getElementById('noc-total');
    if (totalEl) totalEl.textContent = App.formatCurrency(total);
  },

  showNuevoProveedor() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('np-nombre', 'text', 'Razón Social', '', '', true)}
        ${UI.input('np-ruc', 'text', 'RUC', '', '20XXXXXXXXX', true)}
        ${UI.input('np-contacto', 'text', 'Contacto', '', 'Nombre del representante')}
        ${UI.input('np-email', 'email', 'Email', '', 'contacto@empresa.pe')}
        ${UI.input('np-telefono', 'text', 'Teléfono', '', '044-XXXXXX')}
        ${UI.input('np-ciudad', 'text', 'Ciudad', '', 'Trujillo')}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Categoría</label>
          <select id="np-categoria" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Tableros','Madera','Herrajes','Consumibles','Acabados','Maquinaria'].map(c => `<option>${c}</option>`).join('')}
          </select>
        </div>
        ${UI.input('np-credito', 'number', 'Días de Crédito', '30', '0')}
      </div>
    `;
    App.showModal(html, () => {
      const nombre = document.getElementById('np-nombre').value.trim();
      if (!nombre) { App.showToast('La razón social es requerida', 'error'); return; }
      const nuevo = {
        id: 'PRV-' + String(AppData.proveedores.length + 1).padStart(3, '0'),
        nombre,
        ruc: document.getElementById('np-ruc').value,
        contacto: document.getElementById('np-contacto').value,
        email: document.getElementById('np-email').value,
        telefono: document.getElementById('np-telefono').value,
        ciudad: document.getElementById('np-ciudad').value,
        rating: 3,
        categoria: document.getElementById('np-categoria').value,
        credito_dias: parseInt(document.getElementById('np-credito').value) || 0,
      };
      AppData.proveedores.push(nuevo);
      App.showToast(`Proveedor "${nombre}" creado`, 'success');
      Compras.render();
    }, 'Nuevo Proveedor');
  },

  verOCsPorProveedor(provId) {
    const prov = AppData.getProveedor(provId);
    const ocs = AppData.ordenes_compra.filter(o => o.proveedor_id === provId);
    const html = `
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Proveedor: <strong class="text-gray-800 dark:text-gray-200">${prov.nombre}</strong> — ${ocs.length} órdenes</p>
      <div class="space-y-2">
        ${ocs.map(oc => `
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <div>
              <p class="text-sm font-semibold text-brand-600 dark:text-brand-400">${oc.id}</p>
              <p class="text-xs text-gray-400">${App.formatDate(oc.fecha)}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(oc.total)}</p>
              ${UI.badge(oc.estado, { 'Pendiente': 'yellow', 'Aprobada': 'blue', 'Recibida': 'green', 'Parcial': 'orange' }[oc.estado] || 'gray')}
            </div>
          </div>
        `).join('')}
        ${ocs.length === 0 ? '<p class="text-center text-gray-400 py-4">Sin órdenes registradas</p>' : ''}
      </div>
    `;
    App.showModal(html, null, `OCs de ${prov.nombre}`);
  },

  editarProveedor(id) {
    const p = AppData.proveedores.find(x => x.id === id);
    if (!p) return;
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ep-nombre', 'text', 'Razón Social', p.nombre, '', true)}
        ${UI.input('ep-contacto', 'text', 'Contacto', p.contacto, '')}
        ${UI.input('ep-email', 'email', 'Email', p.email, '')}
        ${UI.input('ep-telefono', 'text', 'Teléfono', p.telefono, '')}
        ${UI.input('ep-ciudad', 'text', 'Ciudad', p.ciudad, '')}
        ${UI.input('ep-credito', 'number', 'Días de Crédito', p.credito_dias, '')}
      </div>
    `;
    App.showModal(html, () => {
      p.nombre = document.getElementById('ep-nombre').value;
      p.contacto = document.getElementById('ep-contacto').value;
      p.email = document.getElementById('ep-email').value;
      p.telefono = document.getElementById('ep-telefono').value;
      p.ciudad = document.getElementById('ep-ciudad').value;
      p.credito_dias = parseInt(document.getElementById('ep-credito').value) || 0;
      App.showToast('Proveedor actualizado', 'success');
      Compras.render();
    }, `Editar: ${p.nombre}`);
  },
};
