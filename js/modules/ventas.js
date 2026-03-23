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
          ${UI.kpiCard('Cotizaciones Aprobadas', cotAprobadas + ' este mes', null, svgIcons.check, 'green', `Efectividad ${AppData.getKPIs().cotizaciones_efectividad}%`)}
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
    const estadoColor = { 'Borrador': 'gray', 'Enviada': 'blue', 'Aprobada': 'green', 'Rechazada': 'red', 'Expirada': 'orange', 'Anulada': 'red' };
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
                      <button onclick="Ventas.imprimirCotizacion('${c.id}')" title="Imprimir / Guardar PDF" class="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg></button>
                      ${c.estado === 'Borrador' ? `<button onclick="Ventas.cambiarEstadoCot('${c.id}','Enviada')" title="Enviar al cliente" class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition-colors">Enviar</button>` : ''}
                      ${c.estado === 'Enviada' ? `<button onclick="Ventas.cambiarEstadoCot('${c.id}','Aprobada')" title="Aprobar cotización" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">Aprobar</button>` : ''}
                      ${c.estado === 'Aprobada' ? `<button onclick="Ventas.convertirAOV('${c.id}')" title="Convertir a OV" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">→ OV</button>` : ''}
                      ${c.estado === 'Borrador' ? UI.iconBtn(svgIcons.edit, `Ventas.editarCotizacion('${c.id}')`, 'Editar', 'gray') : ''}
                      ${(c.estado === 'Borrador' || c.estado === 'Enviada') ? UI.iconBtn(svgIcons.trash, `Ventas.anularCotizacion('${c.id}')`, 'Anular', 'red') : ''}
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
                      ${UI.iconBtn(svgIcons.eye, `Ventas.verOV('${ov.id}')`, 'Ver detalle', 'brand')}
                      <button onclick="Ventas.imprimirOV('${ov.id}')" title="Imprimir / Guardar PDF" class="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg></button>
                      ${ov.estado === 'Pendiente' ? `<button onclick="Ventas.cambiarEstadoOV('${ov.id}','En Producción')" title="Iniciar producción" class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition-colors">En Producción</button>` : ''}
                      ${ov.estado === 'En Producción' ? `<button onclick="Ventas.cambiarEstadoOV('${ov.id}','Completada')" title="Marcar completada" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 transition-colors">Completar</button>` : ''}
                      ${ov.estado === 'Completada' ? `<button onclick="Ventas.cambiarEstadoOV('${ov.id}','Entregada')" title="Marcar entregada" class="px-2 py-1 text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400 rounded-lg hover:bg-teal-200 transition-colors">Entregada</button>` : ''}
                      ${(ov.estado === 'Completada' || ov.estado === 'Entregada') ? `<button onclick="Ventas.facturarOV('${ov.id}')" class="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-lg hover:bg-purple-200 transition-colors">→ Factura</button>` : ''}
                      ${ov.estado === 'Pendiente' ? UI.iconBtn(svgIcons.trash, `Ventas.anularOV('${ov.id}')`, 'Anular', 'red') : ''}
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
                      ${UI.iconBtn(svgIcons.eye, `Ventas.verFactura('${f.id}')`, 'Ver detalle', 'brand')}
                      <button onclick="Ventas.imprimirFactura('${f.id}')" title="Imprimir / Guardar PDF" class="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg></button>
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
            <select id="nc-cli" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
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
        const prodSel = line.querySelector('.nco-prod');
        const producto_id = prodSel ? prodSel.value : '';
        const descripcion = line.querySelector('.nco-desc')?.value?.trim() || '';
        const cantidad = parseFloat(line.querySelector('.nco-qty')?.value) || 0;
        const precio_unitario = parseFloat(line.querySelector('.nco-precio')?.value) || 0;
        if (descripcion && cantidad > 0 && precio_unitario > 0) {
          items.push({ producto_id, descripcion, cantidad, precio: precio_unitario, subtotal: cantidad * precio_unitario });
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
      AppData.logActividad('venta', 'Nueva cotización ' + nuevaCot.id + ' creada — ' + App.formatCurrency(nuevaCot.total), 'ventas');
      App.showToast(`Cotización ${nuevaCot.id} creada`, 'success');
      Ventas.render();
    }, 'Nueva Cotización', true);

    // Attach IGV toggle
    setTimeout(() => {
      const cb = document.getElementById('nc-igv');
      if (cb) cb.addEventListener('change', () => Ventas.calcCot());
    }, 100);
  },

  lineaCotHTML(idx, desc, qty, precio, prodId) {
    desc = desc || ''; qty = qty || 1; precio = precio || ''; prodId = prodId || '';
    const prodOpts = AppData.productos.map(p => {
      const c = AppData.getCostoProducto(p.id);
      const pv = c ? c.precioVentaEsperado : (p.precio_venta_real || 0);
      return '<option value="' + p.id + '" data-precio="' + pv.toFixed(2) + '" data-nombre="' + p.nombre + '" ' + (p.id === prodId ? 'selected' : '') + '>' + p.nombre + ' — ' + App.formatCurrency(pv) + '</option>';
    }).join('');
    return `
      <div class="nco-line rounded-xl border border-gray-100 dark:border-night-700 p-3 space-y-2 bg-white dark:bg-night-800">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
          <div class="sm:col-span-5">
            <label class="text-[10px] font-medium text-gray-400 uppercase mb-0.5 block">Producto del catálogo</label>
            <select class="nco-prod w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" onchange="Ventas.onSelectProd(this)">
              <option value="">— Seleccionar o escribir manual —</option>
              ${prodOpts}
            </select>
          </div>
          <div class="sm:col-span-4">
            <label class="text-[10px] font-medium text-gray-400 uppercase mb-0.5 block">Descripción</label>
            <input type="text" class="nco-desc w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" placeholder="Descripción libre o del producto" value="${desc}" oninput="Ventas.calcCot()"/>
          </div>
          <div class="sm:col-span-1">
            <label class="text-[10px] font-medium text-gray-400 uppercase mb-0.5 block">Cant.</label>
            <input type="number" class="nco-qty w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-center" min="1" value="${qty}" oninput="Ventas.calcCot()"/>
          </div>
          <div class="sm:col-span-1">
            <label class="text-[10px] font-medium text-gray-400 uppercase mb-0.5 block">P.Unit.</label>
            <input type="number" class="nco-precio w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-right font-mono" step="0.01" value="${precio}" oninput="Ventas.calcCot()"/>
          </div>
          <div class="sm:col-span-1 flex items-end justify-center gap-1 pb-1">
            <span class="nco-sub text-xs font-semibold text-brand-600">S/0</span>
            <button onclick="this.closest('.nco-line').remove(); Ventas.calcCot();" class="ml-1 text-red-400 hover:text-red-600 text-lg leading-none" title="Eliminar línea">&times;</button>
          </div>
        </div>
      </div>
    `;
  },

  onSelectProd(sel) {
    const line = sel.closest('.nco-line');
    if (!line) return;
    const opt = sel.options[sel.selectedIndex];
    if (!opt || !opt.value) return;
    const descInput = line.querySelector('.nco-desc');
    const precioInput = line.querySelector('.nco-precio');
    if (descInput) descInput.value = opt.dataset.nombre || '';
    if (precioInput) precioInput.value = opt.dataset.precio || '';
    Ventas.calcCot();
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
    const estadoColor = { 'Borrador': 'gray', 'Enviada': 'blue', 'Aprobada': 'green', 'Rechazada': 'red', 'Expirada': 'orange', 'Anulada': 'red' };
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
        <div class="flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-gray-100 dark:border-night-700">
          <button onclick="Ventas.imprimirCotizacion('${c.id}')" class="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 dark:bg-night-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5" title="Imprimir / Guardar PDF">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Imprimir PDF
          </button>
          <div class="flex flex-wrap gap-2">
        ${c.estado === 'Borrador' ? `
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Enviada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Marcar Enviada</button>
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Aprobada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Aprobar</button>
        ` : c.estado === 'Enviada' ? `
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Aprobada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Aprobar</button>
            <button onclick="Ventas.cambiarEstadoCot('${c.id}','Rechazada'); App.closeModal();" class="px-4 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Rechazar</button>
        ` : ''}
          </div>
        </div>
      </div>
    `;
    App.showModal(html, null, `Cotización ${c.id}`, true);
  },

  cambiarEstadoCot(id, estado) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (c) {
      c.estado = estado;
      AppData.logActividad('venta', 'Cotización ' + id + ' marcada como ' + estado, 'ventas');
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
        AppData.logActividad('venta', 'OV ' + nuevaOV.id + ' creada desde cotización ' + cotId + ' — ' + App.formatCurrency(nuevaOV.total), 'ventas');
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

    // Auto-create CxC (cuenta por cobrar) in Finanzas
    const existingCxC = AppData.cuentas_cobrar.find(c => c.factura_id === nuevaFac.id);
    if (!existingCxC) {
      AppData.cuentas_cobrar.unshift({
        id: 'CXC-' + String(AppData.cuentas_cobrar.length + 1).padStart(3, '0'),
        cliente_id: ov.cliente_id,
        factura_id: nuevaFac.id,
        monto: nuevaFac.total,
        fecha_venc: nuevaFac.vencimiento,
        dias_credito: 30,
        estado: 'Pendiente',
      });
      // Update resumen_finanzas
      AppData.resumen_finanzas.total_cobrar += nuevaFac.total;
    }

    // Update flujo_caja for current month
    const mesActual = AppData.flujo_caja[AppData.flujo_caja.length - 1];
    if (mesActual) {
      mesActual.ingresos += nuevaFac.total;
      mesActual.saldo = mesActual.ingresos - mesActual.egresos;
    }

    AppData.logActividad('venta', 'Factura ' + nuevaFac.id + ' emitida — ' + App.formatCurrency(nuevaFac.total) + ' (CxC creada)', 'ventas');
    App.showToast(`Factura ${nuevaFac.id} emitida — Cuenta por cobrar generada`, 'success');
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
        <div class="flex justify-between items-center pt-2">
          <button onclick="Ventas.imprimirFactura('${f.id}')" class="px-3 py-2 text-sm font-medium bg-gray-100 text-gray-700 dark:bg-night-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            Imprimir PDF
          </button>
          ${f.estado === 'Pendiente' ? `<button onclick="App.closeModal(); Ventas.marcarCobrada('${f.id}')" class="px-4 py-2 text-sm font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Registrar Cobro</button>` : ''}
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
        if (f) { f.estado = 'Cobrada'; AppData.logActividad('cobro', 'Factura ' + id + ' cobrada — ' + App.formatCurrency(f.total), 'ventas'); App.showToast('Cobro registrado: ' + id, 'success'); Ventas.render(); }
      }
    );
  },

  verOV(id) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (!ov) return;
    const cli = AppData.getCliente(ov.cliente_id);
    const estadoColor = { 'Pendiente': 'yellow', 'En Producción': 'blue', 'Completada': 'green', 'Entregada': 'teal', 'Cancelada': 'red' };
    const cot = ov.cotizacion_id ? AppData.cotizaciones.find(x => x.id === ov.cotizacion_id) : null;
    const items = ov.items || (cot ? cot.items : []);
    const html = `
      <div class="space-y-3">
        <div class="flex justify-between"><span class="text-xs text-gray-400">OV</span>${UI.badge(ov.estado, estadoColor[ov.estado] || 'gray')}</div>
        <h3 class="text-xl font-bold text-gray-800 dark:text-white">${ov.id}</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400">Cliente</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${cli.nombre}</p>
            <p class="text-xs text-gray-500">RUC: ${cli.ruc}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400">Fechas</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Emisión: <strong>${App.formatDate(ov.fecha)}</strong></p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Entrega: <strong>${App.formatDate(ov.fecha_entrega) || 'Sin definir'}</strong></p>
          </div>
        </div>
        ${ov.cotizacion_id ? `<p class="text-xs text-gray-400">Cotización origen: <span class="font-mono text-brand-600 dark:text-brand-400">${ov.cotizacion_id}</span></p>` : ''}
        ${items.length > 0 ? `
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead><tr class="border-b border-gray-100 dark:border-night-700">
              <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Descripción</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Cant.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">P. Unit.</th>
              <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Subtotal</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${items.map(item => `
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
        ` : ''}
        <div class="flex justify-between font-bold text-base pt-2 border-t border-gray-100 dark:border-night-700">
          <span class="text-gray-700 dark:text-gray-300">Total OV:</span>
          <span class="text-brand-600 text-xl">${App.formatCurrency(ov.total)}</span>
        </div>
        <div class="flex justify-between items-center pt-1">
          <button onclick="Ventas.imprimirOV('${ov.id}')" class="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-night-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
            PDF
          </button>
          <div class="flex flex-wrap gap-2">
        ${ov.estado === 'Pendiente' ? `
            <button onclick="Ventas.cambiarEstadoOV('${ov.id}','En Producción'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">En Producción</button>
            <button onclick="Ventas.anularOV('${ov.id}'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Anular</button>
          </div>
        ` : ov.estado === 'En Producción' ? `
          <div class="flex flex-wrap justify-end gap-2 pt-1">
            <button onclick="Ventas.cambiarEstadoOV('${ov.id}','Completada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Completar</button>
          </div>
        ` : ov.estado === 'Completada' ? `
          <div class="flex flex-wrap justify-end gap-2 pt-1">
            <button onclick="Ventas.cambiarEstadoOV('${ov.id}','Entregada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors">Marcar Entregada</button>
            <button onclick="Ventas.facturarOV('${ov.id}'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">Facturar</button>
          </div>
        ` : ov.estado === 'Entregada' ? `
            <button onclick="Ventas.facturarOV('${ov.id}'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">Facturar</button>
        ` : ''}
          </div>
        </div>
      </div>
    `;
    App.showModal(html, null, `OV ${ov.id}`);
  },

  cambiarEstadoOV(id, estado) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (ov) { ov.estado = estado; AppData.logActividad('venta', 'OV ' + id + ' cambió a estado: ' + estado, 'ventas'); App.showToast(`OV ${id}: ${estado}`, 'success'); Ventas.render(); }
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
          <select id="ncl-tipo" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
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
    }, 'Nuevo Cliente', true);
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
    if (c.estado !== 'Borrador') {
      App.showToast('Solo se pueden editar cotizaciones en Borrador', 'warning');
      return;
    }
    const html = `
      <div class="space-y-4">
        <p class="text-sm text-gray-500">Cotización: <strong>${id}</strong> ${UI.badge('Borrador', 'gray')}</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Cliente *</label>
            <select id="ec-cli" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
              ${AppData.clientes.map(cl => `<option value="${cl.id}" ${cl.id === c.cliente_id ? 'selected' : ''}>${cl.nombre}</option>`).join('')}
            </select>
          </div>
          ${UI.input('ec-vigencia', 'date', 'Vigencia hasta', c.vigencia, '', true)}
        </div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-gray-600 dark:text-gray-400">Partidas *</label>
            <button onclick="Ventas.addLineaEdit()" class="text-xs text-brand-600 dark:text-brand-400 hover:underline">+ Agregar línea</button>
          </div>
          <div class="space-y-2" id="ec-items">
            ${c.items.map((item, idx) => {
              const prodOpts2 = AppData.productos.map(p => {
                const cc = AppData.getCostoProducto(p.id);
                const pv = cc ? cc.precioVentaEsperado : (p.precio_venta_real || 0);
                return '<option value="' + p.id + '" data-precio="' + pv.toFixed(2) + '" data-nombre="' + p.nombre + '" ' + (item.producto_id === p.id ? 'selected' : '') + '>' + p.nombre + ' — S/' + pv.toFixed(2) + '</option>';
              }).join('');
              return `
              <div class="eco-line rounded-xl border border-gray-100 dark:border-night-700 p-3 space-y-2 bg-white dark:bg-night-800">
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
                  <div class="sm:col-span-5">
                    <select class="eco-prod w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" onchange="Ventas.onSelectProdEdit(this)">
                      <option value="">— Manual —</option>
                      ${prodOpts2}
                    </select>
                  </div>
                  <div class="sm:col-span-4">
                    <input type="text" class="eco-desc w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" value="${item.descripcion}" oninput="Ventas.calcEditCot()"/>
                  </div>
                  <div class="sm:col-span-1">
                    <input type="number" class="eco-qty w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-center" min="1" value="${item.cantidad}" oninput="Ventas.calcEditCot()"/>
                  </div>
                  <div class="sm:col-span-1">
                    <input type="number" class="eco-precio w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-right font-mono" step="0.01" value="${item.precio}" oninput="Ventas.calcEditCot()"/>
                  </div>
                  <div class="sm:col-span-1 flex items-end justify-center gap-1 pb-1">
                    <span class="eco-sub text-xs font-semibold text-brand-600">S/${(item.cantidad * item.precio).toFixed(2)}</span>
                    <button onclick="this.closest('.eco-line').remove(); Ventas.calcEditCot();" class="ml-1 text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
                  </div>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>
        <div class="flex items-center gap-3 pt-2">
          <input type="checkbox" id="ec-igv" ${c.igv > 0 ? 'checked' : ''} class="w-4 h-4 rounded text-brand-600">
          <label for="ec-igv" class="text-sm text-gray-600 dark:text-gray-300">Incluir IGV 18%</label>
        </div>
        <div class="p-4 bg-gray-50 dark:bg-night-700/50 rounded-xl space-y-2" id="ec-resumen">
          <div class="flex justify-between text-sm"><span class="text-gray-500">Subtotal:</span><span id="ec-sub">${App.formatCurrency(c.subtotal)}</span></div>
          <div class="flex justify-between text-sm"><span class="text-gray-500">IGV 18%:</span><span id="ec-igv-val">${App.formatCurrency(c.igv)}</span></div>
          <div class="flex justify-between font-bold"><span class="text-gray-700 dark:text-gray-200">Total:</span><span id="ec-total" class="text-brand-600 text-lg">${App.formatCurrency(c.total)}</span></div>
        </div>
        ${UI.textarea('ec-notas', 'Notas para el cliente', c.notas || '', 'Condiciones, plazo de entrega...')}
      </div>
    `;
    App.showModal(html, () => {
      const cliId = document.getElementById('ec-cli').value;
      if (!cliId) { App.showToast('Selecciona un cliente', 'error'); return; }
      const igvCb = document.getElementById('ec-igv');
      const items = [];
      let subtotal = 0;
      document.querySelectorAll('.eco-line').forEach(line => {
        const prodSel = line.querySelector('.eco-prod');
        const producto_id = prodSel ? prodSel.value : '';
        const descripcion = line.querySelector('.eco-desc')?.value?.trim() || '';
        const cantidad = parseFloat(line.querySelector('.eco-qty')?.value) || 0;
        const precio = parseFloat(line.querySelector('.eco-precio')?.value) || 0;
        if (descripcion && cantidad > 0 && precio > 0) {
          items.push({ producto_id, descripcion, cantidad, precio, subtotal: cantidad * precio });
          subtotal += cantidad * precio;
        }
      });
      if (items.length === 0) { App.showToast('Agrega al menos una partida válida', 'error'); return; }
      const igv = igvCb && igvCb.checked ? subtotal * (AppData.config_empresa.igv / 100) : 0;
      c.cliente_id = cliId;
      c.vigencia = document.getElementById('ec-vigencia').value;
      c.items = items;
      c.subtotal = Math.round(subtotal * 100) / 100;
      c.igv = Math.round(igv * 100) / 100;
      c.total = Math.round((subtotal + igv) * 100) / 100;
      c.notas = document.getElementById('ec-notas').value;
      App.showToast('Cotización actualizada', 'success');
      Ventas.render();
    }, `Editar ${id}`, true);

    setTimeout(() => {
      const cb = document.getElementById('ec-igv');
      if (cb) cb.addEventListener('change', () => Ventas.calcEditCot());
    }, 100);
  },

  onSelectProdEdit(sel) {
    const line = sel.closest('.eco-line');
    if (!line) return;
    const opt = sel.options[sel.selectedIndex];
    if (!opt || !opt.value) return;
    const descInput = line.querySelector('.eco-desc');
    const precioInput = line.querySelector('.eco-precio');
    if (descInput) descInput.value = opt.dataset.nombre || '';
    if (precioInput) precioInput.value = opt.dataset.precio || '';
    Ventas.calcEditCot();
  },

  addLineaEdit() {
    const container = document.getElementById('ec-items');
    if (!container) return;
    const prodOpts = AppData.productos.map(p => {
      const c = AppData.getCostoProducto(p.id);
      const pv = c ? c.precioVentaEsperado : (p.precio_venta_real || 0);
      return '<option value="' + p.id + '" data-precio="' + pv.toFixed(2) + '" data-nombre="' + p.nombre + '">' + p.nombre + ' — S/' + pv.toFixed(2) + '</option>';
    }).join('');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="eco-line rounded-xl border border-gray-100 dark:border-night-700 p-3 space-y-2 bg-white dark:bg-night-800">
        <div class="grid grid-cols-1 sm:grid-cols-12 gap-2 items-end">
          <div class="sm:col-span-5">
            <select class="eco-prod w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" onchange="Ventas.onSelectProdEdit(this)">
              <option value="">— Manual —</option>
              ${prodOpts}
            </select>
          </div>
          <div class="sm:col-span-4">
            <input type="text" class="eco-desc w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all" placeholder="Descripción" oninput="Ventas.calcEditCot()"/>
          </div>
          <div class="sm:col-span-1">
            <input type="number" class="eco-qty w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-center" min="1" value="1" oninput="Ventas.calcEditCot()"/>
          </div>
          <div class="sm:col-span-1">
            <input type="number" class="eco-precio w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all text-right font-mono" step="0.01" oninput="Ventas.calcEditCot()"/>
          </div>
          <div class="sm:col-span-1 flex items-end justify-center gap-1 pb-1">
            <span class="eco-sub text-xs font-semibold text-brand-600">S/0</span>
            <button onclick="this.closest('.eco-line').remove(); Ventas.calcEditCot();" class="ml-1 text-red-400 hover:text-red-600 text-lg leading-none">&times;</button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(div.firstElementChild);
  },

  calcEditCot() {
    let subtotal = 0;
    document.querySelectorAll('.eco-line').forEach(line => {
      const qty = parseFloat(line.querySelector('.eco-qty')?.value) || 0;
      const precio = parseFloat(line.querySelector('.eco-precio')?.value) || 0;
      const sub = qty * precio;
      subtotal += sub;
      const subEl = line.querySelector('.eco-sub');
      if (subEl) subEl.textContent = 'S/' + sub.toFixed(2);
    });
    const igvCb = document.getElementById('ec-igv');
    const igv = igvCb && igvCb.checked ? subtotal * (AppData.config_empresa.igv / 100) : 0;
    const total = subtotal + igv;
    const subEl = document.getElementById('ec-sub');
    const igvEl = document.getElementById('ec-igv-val');
    const totalEl = document.getElementById('ec-total');
    if (subEl) subEl.textContent = App.formatCurrency(subtotal);
    if (igvEl) igvEl.textContent = App.formatCurrency(igv);
    if (totalEl) totalEl.textContent = App.formatCurrency(total);
  },

  anularCotizacion(id) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (!c) return;
    if (c.estado !== 'Borrador' && c.estado !== 'Enviada') {
      App.showToast('Solo se pueden anular cotizaciones en Borrador o Enviada', 'warning');
      return;
    }
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Anular cotización?</h3><p class="text-gray-500">${id} — esta acción no se puede deshacer</p></div>`,
      () => {
        c.estado = 'Anulada';
        App.showToast(`Cotización ${id} anulada`, 'success');
        Ventas.render();
      }
    );
  },

  anularOV(id) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (!ov) return;
    if (ov.estado !== 'Pendiente') {
      App.showToast('Solo se pueden anular OVs en estado Pendiente', 'warning');
      return;
    }
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Anular orden de venta?</h3><p class="text-gray-500">${id} — esta acción no se puede deshacer</p></div>`,
      () => {
        ov.estado = 'Cancelada';
        App.showToast(`OV ${id} anulada`, 'success');
        Ventas.render();
      }
    );
  },

  // ══════════════════════════════════════════════════════════
  // PDF GENERATION (window.print via iframe)
  // ══════════════════════════════════════════════════════════
  _printDoc(htmlContent, title) {
    const w = window.open('', '_blank', 'width=800,height=600');
    w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', sans-serif; color: #1a1a1a; padding: 40px; font-size: 11px; line-height: 1.5; }
        .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; padding-bottom: 15px; border-bottom: 3px solid #6366f1; }
        .company-name { font-size: 18px; font-weight: 700; color: #1a1a1a; }
        .company-info { font-size: 10px; color: #666; margin-top: 4px; }
        .doc-title { font-size: 16px; font-weight: 700; color: #6366f1; text-align: right; }
        .doc-number { font-size: 12px; color: #666; text-align: right; margin-top: 2px; }
        .doc-status { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: 600; text-transform: uppercase; }
        .status-green { background: #dcfce7; color: #16a34a; }
        .status-blue { background: #dbeafe; color: #2563eb; }
        .status-yellow { background: #fef9c3; color: #ca8a04; }
        .status-red { background: #fee2e2; color: #dc2626; }
        .status-gray { background: #f3f4f6; color: #6b7280; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
        .info-label { font-size: 9px; color: #94a3b8; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px; margin-bottom: 4px; }
        .info-value { font-size: 12px; font-weight: 600; color: #1e293b; }
        .info-sub { font-size: 10px; color: #64748b; margin-top: 2px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        thead th { background: #f1f5f9; font-size: 9px; text-transform: uppercase; color: #64748b; font-weight: 600; padding: 8px 12px; text-align: left; border-bottom: 2px solid #e2e8f0; }
        thead th.r { text-align: right; }
        tbody td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-size: 11px; }
        tbody td.r { text-align: right; font-family: 'Courier New', monospace; }
        tbody td.b { font-weight: 600; }
        .totals { margin-left: auto; width: 280px; }
        .totals .row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 11px; }
        .totals .row.total { border-top: 2px solid #1a1a1a; padding-top: 8px; font-size: 14px; font-weight: 700; color: #6366f1; }
        .notes { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 10px; font-size: 10px; color: #1e40af; margin-top: 15px; }
        .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; }
        .signature { margin-top: 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; }
        .sig-line { border-top: 1px solid #1a1a1a; padding-top: 6px; text-align: center; font-size: 10px; color: #666; }
        @media print { body { padding: 20px; } @page { margin: 15mm; size: A4; } }
      </style>
    </head><body>${htmlContent}
      <script>window.onload=function(){window.print();}<\/script>
    </body></html>`);
    w.document.close();
  },

  _getStatusClass(estado) {
    const map = { 'Aprobada': 'green', 'Cobrada': 'green', 'Completada': 'green', 'Entregada': 'green',
      'Enviada': 'blue', 'En Proceso': 'blue', 'Pendiente': 'yellow', 'Borrador': 'gray',
      'Rechazada': 'red', 'Anulada': 'red', 'Cancelada': 'red', 'Vencida': 'red' };
    return 'status-' + (map[estado] || 'gray');
  },

  imprimirCotizacion(id) {
    const c = AppData.cotizaciones.find(x => x.id === id);
    if (!c) return;
    const cli = AppData.getCliente(c.cliente_id);
    const emp = AppData.config_empresa;
    const itemsHtml = c.items.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.descripcion}</td>
        <td class="r">${item.cantidad}</td>
        <td class="r">S/ ${item.precio.toFixed(2)}</td>
        <td class="r b">S/ ${(item.cantidad * item.precio).toFixed(2)}</td>
      </tr>`).join('');

    this._printDoc(`
      <div class="header">
        <div>
          <div class="company-name">${emp.nombre}</div>
          <div class="company-info">RUC: ${emp.ruc}<br>${emp.direccion || 'Trujillo, La Libertad'}</div>
        </div>
        <div>
          <div class="doc-title">COTIZACION</div>
          <div class="doc-number">${c.id}</div>
          <div style="text-align:right;margin-top:6px;"><span class="doc-status ${this._getStatusClass(c.estado)}">${c.estado}</span></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-box">
          <div class="info-label">Cliente</div>
          <div class="info-value">${cli.nombre}</div>
          <div class="info-sub">RUC: ${cli.ruc}${cli.direccion ? '<br>' + cli.direccion : ''}</div>
        </div>
        <div class="info-box">
          <div class="info-label">Fechas</div>
          <div class="info-value">Emision: ${App.formatDate(c.fecha)}</div>
          <div class="info-sub">Vigencia: ${App.formatDate(c.vigencia)}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>#</th><th>Descripcion</th><th class="r">Cant.</th><th class="r">P. Unit.</th><th class="r">Subtotal</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div class="totals">
        <div class="row"><span>Subtotal</span><span>S/ ${c.subtotal.toFixed(2)}</span></div>
        <div class="row"><span>IGV 18%</span><span>S/ ${c.igv.toFixed(2)}</span></div>
        <div class="row total"><span>TOTAL</span><span>S/ ${c.total.toFixed(2)}</span></div>
      </div>
      ${c.notas ? '<div class="notes"><strong>Notas:</strong> ' + c.notas + '</div>' : ''}
      <div class="signature">
        <div class="sig-line">Firma del Vendedor</div>
        <div class="sig-line">Firma del Cliente</div>
      </div>
      <div class="footer">
        <span>${emp.nombre} — Generado el ${new Date().toLocaleDateString('es-PE')}</span>
        <span>Cotizacion ${c.id}</span>
      </div>
    `, 'Cotizacion ' + c.id);
  },

  imprimirOV(id) {
    const ov = AppData.ordenes_venta.find(o => o.id === id);
    if (!ov) return;
    const cli = AppData.getCliente(ov.cliente_id);
    const emp = AppData.config_empresa;
    const cot = ov.cotizacion_id ? AppData.cotizaciones.find(c => c.id === ov.cotizacion_id) : null;
    const items = ov.items || (cot ? cot.items : []);
    const itemsHtml = items.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.descripcion}</td>
        <td class="r">${item.cantidad}</td>
        <td class="r">S/ ${item.precio.toFixed(2)}</td>
        <td class="r b">S/ ${(item.cantidad * item.precio).toFixed(2)}</td>
      </tr>`).join('');
    const subtotal = ov.total / 1.18;
    const igv = ov.total - subtotal;

    this._printDoc(`
      <div class="header">
        <div>
          <div class="company-name">${emp.nombre}</div>
          <div class="company-info">RUC: ${emp.ruc}<br>${emp.direccion || 'Trujillo, La Libertad'}</div>
        </div>
        <div>
          <div class="doc-title">ORDEN DE VENTA</div>
          <div class="doc-number">${ov.id}</div>
          <div style="text-align:right;margin-top:6px;"><span class="doc-status ${this._getStatusClass(ov.estado)}">${ov.estado}</span></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-box">
          <div class="info-label">Cliente</div>
          <div class="info-value">${cli.nombre}</div>
          <div class="info-sub">RUC: ${cli.ruc}${cli.direccion ? '<br>' + cli.direccion : ''}</div>
        </div>
        <div class="info-box">
          <div class="info-label">Detalles</div>
          <div class="info-value">Fecha: ${App.formatDate(ov.fecha)}</div>
          <div class="info-sub">${ov.cotizacion_id ? 'Cotizacion: ' + ov.cotizacion_id : 'Venta directa'}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>#</th><th>Descripcion</th><th class="r">Cant.</th><th class="r">P. Unit.</th><th class="r">Subtotal</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div class="totals">
        <div class="row"><span>Valor de Venta</span><span>S/ ${subtotal.toFixed(2)}</span></div>
        <div class="row"><span>IGV 18%</span><span>S/ ${igv.toFixed(2)}</span></div>
        <div class="row total"><span>TOTAL</span><span>S/ ${ov.total.toFixed(2)}</span></div>
      </div>
      <div class="signature">
        <div class="sig-line">Autorizado por</div>
        <div class="sig-line">Recibido por</div>
      </div>
      <div class="footer">
        <span>${emp.nombre} — Generado el ${new Date().toLocaleDateString('es-PE')}</span>
        <span>OV ${ov.id}</span>
      </div>
    `, 'Orden de Venta ' + ov.id);
  },

  imprimirFactura(id) {
    const f = AppData.facturas.find(x => x.id === id);
    if (!f) return;
    const cli = AppData.getCliente(f.cliente_id);
    const emp = AppData.config_empresa;
    const ov = AppData.ordenes_venta.find(o => o.id === f.ov_id);
    const cot = ov && ov.cotizacion_id ? AppData.cotizaciones.find(c => c.id === ov.cotizacion_id) : null;
    const items = (ov && ov.items) || (cot ? cot.items : []);
    const itemsHtml = items.length > 0 ? items.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.descripcion}</td>
        <td class="r">${item.cantidad}</td>
        <td class="r">S/ ${item.precio.toFixed(2)}</td>
        <td class="r b">S/ ${(item.cantidad * item.precio).toFixed(2)}</td>
      </tr>`).join('') : `<tr><td colspan="5" style="text-align:center;color:#999;">Detalle general</td></tr>`;

    this._printDoc(`
      <div class="header">
        <div>
          <div class="company-name">${emp.nombre}</div>
          <div class="company-info">RUC: ${emp.ruc}<br>${emp.direccion || 'Trujillo, La Libertad'}</div>
        </div>
        <div>
          <div class="doc-title">FACTURA ELECTRONICA</div>
          <div class="doc-number">${f.serie}-${f.numero}</div>
          <div style="text-align:right;margin-top:6px;"><span class="doc-status ${this._getStatusClass(f.estado)}">${f.estado}</span></div>
        </div>
      </div>
      <div class="info-grid">
        <div class="info-box">
          <div class="info-label">Senor(es)</div>
          <div class="info-value">${cli.nombre}</div>
          <div class="info-sub">RUC: ${cli.ruc}${cli.direccion ? '<br>' + cli.direccion : ''}</div>
        </div>
        <div class="info-box">
          <div class="info-label">Detalles del documento</div>
          <div class="info-value">Fecha: ${App.formatDate(f.fecha)}</div>
          <div class="info-sub">Vencimiento: ${App.formatDate(f.vencimiento)}<br>M. Pago: ${f.metodo_pago}<br>Ref: ${f.ov_id || ''}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>#</th><th>Descripcion</th><th class="r">Cant.</th><th class="r">V. Unit.</th><th class="r">V. Total</th></tr></thead>
        <tbody>${itemsHtml}</tbody>
      </table>
      <div class="totals">
        <div class="row"><span>OP. GRAVADA</span><span>S/ ${f.subtotal.toFixed(2)}</span></div>
        <div class="row"><span>I.G.V. 18%</span><span>S/ ${f.igv.toFixed(2)}</span></div>
        <div class="row total"><span>IMPORTE TOTAL</span><span>S/ ${f.total.toFixed(2)}</span></div>
      </div>
      <div class="footer">
        <span>${emp.nombre} — Generado el ${new Date().toLocaleDateString('es-PE')}</span>
        <span>Factura ${f.serie}-${f.numero}</span>
      </div>
    `, 'Factura ' + f.serie + '-' + f.numero);
  },
};
