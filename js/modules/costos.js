// ============================================================
// COSTOS.JS - Cost Management Module
// Tabs: Resumen | Hojas de Costo | Depreciacion | Gastos Operativos
// Formula: CP = MPD + MOD + CIF
// ============================================================

const Costos = {
  activeTab: 'resumen',

  render() {
    const content = document.getElementById('main-content');
    const tabs = [
      {id:'resumen', label:'Resumen', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>'},
      {id:'hojas', label:'Hojas de Costo', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'},
      {id:'depreciacion', label:'Depreciacion', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>'},
      {id:'gastos', label:'Gastos Operativos', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>'},
      {id:'personal', label:'Costos de Personal', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'},
      {id:'maestros', label:'Procesos y Servicios', icon:'<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7M4 7c0-2 1-3 3-3h10c2 0 3 1 3 3M4 7h16M9 12h6"/></svg>'},
    ];

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Costos de Produccion', 'CP = MPD + MOD + CIF — Estructura de costos por producto')}
        <div class="flex gap-1 bg-gray-100 dark:bg-night-800 rounded-xl p-1 overflow-x-auto">
          ${tabs.map(t => `
            <button onclick="Costos.switchTab('${t.id}')" id="ctab-${t.id}" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${t.id === this.activeTab ? 'bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}">
              ${t.icon}<span>${t.label}</span>
            </button>
          `).join('')}
        </div>
        <div id="costos-tab-content"></div>
      </div>`;
    this['render_' + this.activeTab]();
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('[id^="ctab-"]').forEach(b => {
      const isActive = b.id === 'ctab-' + tab;
      b.className = `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive ? 'bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`;
    });
    this['render_' + tab]();
  },

  // ══════════════════════════════════════════════════════════
  // TAB: RESUMEN
  // ══════════════════════════════════════════════════════════
  render_resumen() {
    const el = document.getElementById('costos-tab-content');
    const cif = AppData.getCIFMensual();
    const personalCosto = AppData.getCostoPersonalMensual();
    const totalDepItems = AppData.depreciacion.length;
    const totalGOItems = AppData.gastos_operativos.length;

    // Calculate totals across all products
    let totalMPD = 0, totalMOD = 0, totalServ = 0, totalCIF = 0, totalCP = 0;
    AppData.productos.forEach(p => {
      const c = AppData.getCostoProducto(p.id);
      if (c) { totalMPD += c.mpd; totalMOD += c.mod; totalServ += c.servicios; totalCIF += c.cif; totalCP += c.costoProduccion; }
    });

    const goAdmin = AppData.gastos_operativos.filter(g => g.grupo === 'Administracion').reduce((s, g) => s + g.monto_mensual, 0);

    el.innerHTML = `
      <div class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Costo Produccion Total', App.formatCurrency(totalCP), null, svgIcons.currency, 'brand', 'MPD + MOD + CIF por producto')}
          ${UI.kpiCard('CIF Mensual', App.formatCurrency(cif.total), null, svgIcons.cog, 'yellow', `Dep: ${App.formatCurrency(cif.depreciacion)} + GO: ${App.formatCurrency(cif.gastos_produccion)}`)}
          ${UI.kpiCard('Costo Personal', App.formatCurrency(personalCosto.total), null, svgIcons.users, 'blue', `Fijo: ${App.formatCurrency(personalCosto.fijo)} · Jornal: ${App.formatCurrency(personalCosto.jornal)}`)}
          ${UI.kpiCard('Gastos Admin.', App.formatCurrency(goAdmin), null, svgIcons.document, 'red', `${totalGOItems} conceptos registrados`)}
        </div>

        <!-- Product cost summary table -->
        <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
            <h4 class="font-bold text-gray-800 dark:text-white text-[15px]">Estructura de Costos por Producto</h4>
            <p class="text-xs text-gray-400 mt-0.5">CP = MPD + MOD + CIF</p>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="border-b border-gray-100 dark:border-night-700 bg-gray-50/50 dark:bg-night-700/30">
                <th class="px-5 py-3 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">Producto</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">MPD</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">MOD</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">Servicios</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">CIF</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-brand-500 uppercase tracking-wider">Costo Prod.</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">P. Sugerido</th>
                <th class="px-5 py-3 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">Margen</th>
                <th class="px-5 py-3 text-center text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">Detalle</th>
              </tr></thead>
              <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">
                ${AppData.productos.map(p => {
                  const c = AppData.getCostoProducto(p.id);
                  if (!c) return '';
                  const margenColor = c.margenReal >= 35 ? 'text-green-600' : c.margenReal >= 20 ? 'text-yellow-600' : 'text-red-600';
                  return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20 transition-colors">
                    <td class="px-5 py-3"><p class="font-semibold text-gray-800 dark:text-white text-sm">${p.nombre}</p><p class="text-[11px] text-gray-400">${p.id} · ${p.unidad}</p></td>
                    <td class="px-5 py-3 text-right font-mono text-sm text-gray-700 dark:text-gray-300">${App.formatCurrency(c.mpd)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm text-gray-700 dark:text-gray-300">${App.formatCurrency(c.mod)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm text-gray-700 dark:text-gray-300">${App.formatCurrency(c.servicios)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm text-gray-700 dark:text-gray-300">${App.formatCurrency(c.cif)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm font-bold text-brand-600">${App.formatCurrency(c.costoProduccion)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm text-green-600">${App.formatCurrency(c.precioVentaEsperado)}</td>
                    <td class="px-5 py-3 text-right font-mono text-sm font-bold ${margenColor}">${c.margenReal}%</td>
                    <td class="px-5 py-3 text-center">
                      <button onclick="Costos.verHojaCosto('${p.id}')" class="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all" title="Ver hoja de costo">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      </button>
                    </td>
                  </tr>`;
                }).join('')}
              </tbody>
              <tfoot><tr class="border-t-2 border-gray-200 dark:border-night-600 bg-gray-50/50 dark:bg-night-700/30 font-bold">
                <td class="px-5 py-3 text-sm text-gray-800 dark:text-white">TOTALES</td>
                <td class="px-5 py-3 text-right font-mono text-sm">${App.formatCurrency(totalMPD)}</td>
                <td class="px-5 py-3 text-right font-mono text-sm">${App.formatCurrency(totalMOD)}</td>
                <td class="px-5 py-3 text-right font-mono text-sm">${App.formatCurrency(totalServ)}</td>
                <td class="px-5 py-3 text-right font-mono text-sm">${App.formatCurrency(totalCIF)}</td>
                <td class="px-5 py-3 text-right font-mono text-sm text-brand-600">${App.formatCurrency(totalCP)}</td>
                <td class="px-5 py-3 text-right font-mono text-sm">—</td>
                <td class="px-5 py-3 text-right font-mono text-sm">—</td>
                <td class="px-5 py-3"></td>
              </tr></tfoot>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ══════════════════════════════════════════════════════════
  // TAB: HOJAS DE COSTO (receta por producto)
  // ══════════════════════════════════════════════════════════
  render_hojas() {
    const el = document.getElementById('costos-tab-content');
    const data = AppData.productos.map(p => {
      const c = AppData.getCostoProducto(p.id);
      const hoja = AppData.getHojaCosto(p.id);
      return {
        _id: p.id, nombre: p.nombre, unidad: p.unidad,
        materiales: hoja ? hoja.materiales.length : 0,
        procesos: hoja ? hoja.mano_obra.length : 0,
        mpd: c ? c.mpd : 0, mod: c ? c.mod : 0, cif: c ? c.cif : 0,
        cp: c ? c.costoProduccion : 0,
        precio: p.precio_venta_real,
        margen: c ? c.margenReal : 0,
        margen_color: c && c.margenReal >= 35 ? 'green' : c && c.margenReal >= 20 ? 'yellow' : 'red',
        _actions: [], // prevent built-in menu
      };
    });

    el.innerHTML = UI.dataTable({
      id: 'dt-hojas-costo',
      title: 'Hojas de Costo por Producto',
      subtitle: 'Estructura detallada: materiales + mano de obra + servicios + CIF',
      columns: [
        {key:'nombre', label:'Producto', sortable:true, render: function(v,r){ return '<div><p class="font-semibold text-gray-800 dark:text-white">'+v+'</p><p class="text-[11px] text-gray-400">'+r._id+' · '+r.unidad+' · '+r.materiales+' mat. · '+r.procesos+' proc.</p></div>'; }},
        {key:'mpd', label:'MPD', sortable:true, type:'currency'},
        {key:'mod', label:'MOD', sortable:true, type:'currency'},
        {key:'cif', label:'CIF', sortable:true, type:'currency'},
        {key:'cp', label:'Costo Prod.', sortable:true, render: function(v){ return '<span class="font-mono font-bold text-brand-600">'+App.formatCurrency(v)+'</span>'; }},
        {key:'precio', label:'P. Venta', sortable:true, type:'currency'},
        {key:'margen', label:'Margen', sortable:true, render: function(v,r){ return '<span class="font-mono font-bold '+(r.margen>=35?'text-green-600':r.margen>=20?'text-yellow-600':'text-red-600')+'">'+v+'%</span>'; }},
        {key:'_acciones', label:'Acciones', sortable:false, render: function(v,r){
          return '<div class="flex gap-1 justify-end">' +
            '<button onclick="Costos.verHojaCosto(\''+r._id+'\')" class="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all" title="Ver hoja de costo"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>' +
            '<button onclick="Costos.editarHojaCosto(\''+r._id+'\')" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-night-700 transition-all" title="Editar receta"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>' +
          '</div>';
        }},
      ],
      data: data,
      pageSize: 10,
      searchable: true,
      selectable: false,
      resizable: true,
      toolbar: UI.button('+ Nueva Hoja','primary','Costos.nuevaHojaCosto()'),
      gridRender: function(row) {
        var margenColor = row.margen>=35?'green':row.margen>=20?'yellow':'red';
        return '<div class="bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700 shadow-sm p-4 space-y-3 cursor-pointer hover:shadow-md transition-all" onclick="Costos.verHojaCosto(\''+row._id+'\')">' +
          '<div class="flex justify-between items-start"><div><p class="font-bold text-gray-800 dark:text-white text-sm">'+row.nombre+'</p><p class="text-[11px] text-gray-400 mt-0.5">'+row._id+' · '+row.materiales+' materiales · '+row.procesos+' procesos</p></div>'+UI.badge(row.margen+'%',margenColor)+'</div>' +
          '<div class="grid grid-cols-3 gap-2 text-center">' +
            '<div class="bg-gray-50 dark:bg-night-700/50 rounded-lg p-2"><p class="text-[10px] text-gray-400 uppercase">MPD</p><p class="text-sm font-bold">'+App.formatCurrency(row.mpd)+'</p></div>' +
            '<div class="bg-gray-50 dark:bg-night-700/50 rounded-lg p-2"><p class="text-[10px] text-gray-400 uppercase">MOD</p><p class="text-sm font-bold">'+App.formatCurrency(row.mod)+'</p></div>' +
            '<div class="bg-brand-50 dark:bg-brand-900/20 rounded-lg p-2"><p class="text-[10px] text-brand-500 uppercase">CP</p><p class="text-sm font-bold text-brand-600">'+App.formatCurrency(row.cp)+'</p></div>' +
          '</div></div>';
      },
    });

    // Make rows clickable
    setTimeout(() => {
      const dtBody = document.querySelector('#dt-hojas-costo-body');
      if (dtBody) dtBody.addEventListener('click', function(e) {
        const tr = e.target.closest('tr');
        if (!tr || e.target.closest('button') || e.target.closest('input')) return;
        const idx = Array.from(tr.parentElement.children).indexOf(tr);
        if (idx >= 0 && data[idx]) Costos.verHojaCosto(data[idx]._id);
      });
    }, 100);
  },

  // ── Detail view for a single product cost sheet ──
  verHojaCosto(productoId) {
    const prod = AppData.getProducto(productoId);
    const hoja = AppData.getHojaCosto(productoId);
    const c = AppData.getCostoProducto(productoId);
    if (!hoja || !c) { App.showToast('No hay hoja de costo para este producto','warning'); return; }

    const matRows = hoja.materiales.map(m => {
      const mat = AppData.getMaterial(m.material_id);
      const total = m.consumo * m.costo_unit;
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-white">${mat.nombre || m.material_id}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono">${m.consumo}</td>
        <td class="px-4 py-2.5 text-sm text-gray-500">${m.unidad}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono">${App.formatCurrency(m.costo_unit)}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono font-semibold">${App.formatCurrency(total)}</td>
      </tr>`;
    }).join('');

    const moRows = hoja.mano_obra.map(m => {
      const emp = AppData.getEmpleado(m.operario_id);
      const tipoBadge = m.tipo === 'Fijo' ? 'blue' : m.tipo === 'Jornal' ? 'yellow' : 'purple';
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2.5 text-sm text-gray-500 font-mono">${m.nro}</td>
        <td class="px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-white">${m.proceso}</td>
        <td class="px-4 py-2.5">${UI.badge(m.tipo, tipoBadge)}</td>
        <td class="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300">${emp.nombre || m.operario_id}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono">${m.duracion}</td>
        <td class="px-4 py-2.5 text-sm text-gray-500">${m.unidad_tiempo}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono font-semibold">${App.formatCurrency(m.costo)}</td>
      </tr>`;
    }).join('');

    const svRows = hoja.servicios.map(s => {
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-white">${s.descripcion}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono font-semibold">${App.formatCurrency(s.costo)}</td>
      </tr>`;
    }).join('');

    const margenColor = c.margenReal >= 35 ? 'text-green-600' : c.margenReal >= 20 ? 'text-yellow-600' : 'text-red-600';

    const html = `
      <div class="space-y-5">
        <!-- Product header -->
        <div class="flex items-start justify-between">
          <div>
            <p class="text-xs text-gray-400 uppercase font-mono">${prod.id}</p>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">${prod.nombre}</h3>
            <p class="text-sm text-gray-500 mt-0.5">${prod.descripcion || ''}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400">Costo de Produccion</p>
            <p class="text-2xl font-bold text-brand-600">${App.formatCurrency(c.costoProduccion)}</p>
          </div>
        </div>

        <!-- Summary cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
            <p class="text-[10px] text-blue-500 uppercase font-bold">MPD</p>
            <p class="text-lg font-bold text-blue-700 dark:text-blue-300">${App.formatCurrency(c.mpd)}</p>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
            <p class="text-[10px] text-amber-500 uppercase font-bold">MOD</p>
            <p class="text-lg font-bold text-amber-700 dark:text-amber-300">${App.formatCurrency(c.mod)}</p>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center">
            <p class="text-[10px] text-purple-500 uppercase font-bold">CIF</p>
            <p class="text-lg font-bold text-purple-700 dark:text-purple-300">${App.formatCurrency(c.cif)}</p>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
            <p class="text-[10px] text-green-500 uppercase font-bold">Margen Real</p>
            <p class="text-lg font-bold ${margenColor}">${c.margenReal}%</p>
          </div>
        </div>

        <!-- BOM Table -->
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">Lista de Materiales (BOM) <span class="text-xs font-normal text-gray-400">${hoja.materiales.length} items</span></h4>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Material</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Consumo</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Unidad</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo U.</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo Total</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${matRows}</tbody>
            <tfoot><tr class="border-t-2 border-gray-200 dark:border-night-600 bg-blue-50/50 dark:bg-blue-900/10 font-bold">
              <td colspan="4" class="px-4 py-2 text-sm text-blue-700 dark:text-blue-300">Total Materia Prima Directa (MPD)</td>
              <td class="px-4 py-2 text-right font-mono text-sm text-blue-700 dark:text-blue-300">${App.formatCurrency(c.mpd)}</td>
            </tr></tfoot></table>
          </div>
        </div>

        <!-- Labor Table -->
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">Mano de Obra <span class="text-xs font-normal text-gray-400">${hoja.mano_obra.length} procesos</span></h4>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">N</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Proceso</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Tipo</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Operario</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Duracion</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">U. Tiempo</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${moRows}</tbody>
            <tfoot><tr class="border-t-2 border-gray-200 dark:border-night-600 bg-amber-50/50 dark:bg-amber-900/10 font-bold">
              <td colspan="6" class="px-4 py-2 text-sm text-amber-700 dark:text-amber-300">Total Mano de Obra Directa (MOD)</td>
              <td class="px-4 py-2 text-right font-mono text-sm text-amber-700 dark:text-amber-300">${App.formatCurrency(c.mod)}</td>
            </tr></tfoot></table>
          </div>
        </div>

        <!-- Services Table -->
        ${hoja.servicios.length > 0 ? `<div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2">Servicios</h4>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Descripcion</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${svRows}</tbody>
            <tfoot><tr class="border-t-2 border-gray-200 dark:border-night-600 font-bold">
              <td class="px-4 py-2 text-sm">Total Servicios</td>
              <td class="px-4 py-2 text-right font-mono text-sm">${App.formatCurrency(c.servicios)}</td>
            </tr></tfoot></table>
          </div>
        </div>` : ''}

        <!-- Estructura de costos completa -->
        <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
          <div class="px-4 py-3 bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
            <h4 class="text-sm font-bold text-gray-800 dark:text-white">Estructura de Costos y Precio</h4>
          </div>
          <div class="divide-y divide-gray-100 dark:divide-night-700">
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de materiales (MPD)</span><span class="font-mono font-semibold">${App.formatCurrency(c.mpd)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de mano de obra (MOD)</span><span class="font-mono font-semibold">${App.formatCurrency(c.mod)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de servicios</span><span class="font-mono font-semibold">${App.formatCurrency(c.servicios)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700/30"><span class="text-gray-700 dark:text-gray-200 font-medium">Total Costos Directos</span><span class="font-mono font-bold text-gray-800 dark:text-white">${App.formatCurrency(c.totalCostosDirectos)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500 flex items-center gap-1">CIF — Depreciacion maquinas <span class="text-[10px] text-gray-400">(${(c.ratio*100).toFixed(1)}% asignado)</span></span><span class="font-mono font-semibold">${App.formatCurrency(c.cifDepreciacion)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">CIF — Gastos Produccion (agua, luz, alquiler)</span><span class="font-mono font-semibold">${App.formatCurrency(c.cifGastosProd)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm bg-purple-50/50 dark:bg-purple-900/10"><span class="text-purple-600 font-medium">Total CIF (Costos Indirectos)</span><span class="font-mono font-bold text-purple-600">${App.formatCurrency(c.cif)}</span></div>
            <div class="flex justify-between px-4 py-3 text-sm bg-brand-50 dark:bg-brand-900/20"><span class="text-brand-700 dark:text-brand-300 font-bold">Costo de Produccion (CP)</span><span class="font-mono font-bold text-brand-700 dark:text-brand-300 text-base">${App.formatCurrency(c.costoProduccion)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Margen esperado</span><span class="font-mono font-bold">${c.margenEsperado}%</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Valor Venta esperado (sin IGV)</span><span class="font-mono font-semibold">${App.formatCurrency(c.valorVentaEsperado)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Precio Venta esperado (con IGV 18%)</span><span class="font-mono font-bold text-green-600">${App.formatCurrency(c.precioVentaEsperado)}</span></div>
            ${c.precioVentaReal > 0 && c.precioVentaReal !== c.precioVentaEsperado ? `
            <div class="flex justify-between px-4 py-2.5 text-sm border-t-2 border-gray-200 dark:border-night-600"><span class="text-gray-500">Precio Venta real (con IGV)</span><span class="font-mono font-bold text-red-600">${App.formatCurrency(c.precioVentaReal)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Valor Venta real (sin IGV)</span><span class="font-mono font-semibold">${App.formatCurrency(c.valorVentaReal)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Margen real</span><span class="font-mono font-bold ${margenColor}">${c.margenReal}%</span></div>
            ` : `
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Valor Venta real (sin IGV)</span><span class="font-mono font-semibold">${App.formatCurrency(c.valorVentaReal)}</span></div>
            <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Margen real</span><span class="font-mono font-bold ${margenColor}">${c.margenReal}%</span></div>
            `}
            <div class="flex justify-between px-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700/30"><span class="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1">GA (Gastos Administrativos) <span class="text-[10px] text-gray-400 font-normal">${(c.ratio*100).toFixed(1)}% de G. Admin</span></span><span class="font-mono font-bold">${App.formatCurrency(c.ga)}</span></div>
          </div>
        </div>
      </div>`;

    App.showModal(html, null, `Hoja de Costo — ${prod.nombre}`, true);
  },

  // ── Nueva hoja de costo (seleccionar producto sin hoja) ──
  nuevaHojaCosto() {
    const sinHoja = AppData.productos.filter(p => !AppData.getHojaCosto(p.id));
    // Allow selecting existing product without hoja, OR creating a new product
    const existingOpts = sinHoja.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('');
    const html = `<div class="space-y-4">
      ${sinHoja.length > 0 ? `
        <div>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">Producto existente sin hoja de costo:</p>
          <select id="nhc-prod" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300">
            ${existingOpts}
          </select>
        </div>
        <div class="text-center text-xs text-gray-400">— o crear producto nuevo —</div>
      ` : '<p class="text-sm text-gray-500 mb-2">Todos los productos existentes ya tienen hoja de costo. Cree un producto nuevo:</p>'}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
        ${UI.input('nhc-nombre','text','Nombre del producto','','Ej: Mesa de Centro',false)}
        ${UI.input('nhc-margen','number','Margen esperado (%)','50','50',false)}
        ${UI.input('nhc-precio','number','Precio real (S/) — opcional','','Se calcula del margen',false)}
      </div>
    </div>`;

    App.showModal(html, () => {
      let prodId = '';
      const selectEl = document.getElementById('nhc-prod');
      const nuevoNombre = document.getElementById('nhc-nombre').value.trim();

      if (nuevoNombre) {
        // Create new product + hoja
        prodId = 'PRD-' + String(AppData.productos.length + 1).padStart(3,'0');
        AppData.productos.push({
          id: prodId, nombre: nuevoNombre, descripcion: '', categoria: 'Otro',
          unidad: 'Unidad',
          margen_esperado: parseFloat(document.getElementById('nhc-margen').value) || 50,
          precio_venta_real: parseFloat(document.getElementById('nhc-precio').value) || 0,
          costo_std: 0, imagen: '',
        });
      } else if (selectEl) {
        prodId = selectEl.value;
      }
      if (!prodId) { App.showToast('Seleccione un producto o ingrese nombre para uno nuevo','error'); return; }

      const prod = AppData.getProducto(prodId);
      AppData.hojas_costo.push({
        id: 'HC-' + String(AppData.hojas_costo.length + 1).padStart(3,'0'),
        producto_id: prodId, nombre: prod.nombre,
        materiales: [], mano_obra: [], servicios: [],
      });
      App.showToast(`Hoja de costo creada para "${prod.nombre}"`, 'success');
      // Close and open editor
      setTimeout(() => Costos.editarHojaCosto(prodId), 150);
    }, 'Nueva Hoja de Costo');
  },

  // ── Editor de hoja de costo (CRUD materiales, mano obra, servicios) ──
  editarHojaCosto(productoId) {
    const prod = AppData.getProducto(productoId);
    const hoja = AppData.getHojaCosto(productoId);
    if (!hoja) { App.showToast('No existe hoja de costo para este producto','error'); return; }

    const refreshEditor = () => {
      const c = AppData.getCostoProducto(productoId);
      const container = document.getElementById('hc-editor-content');
      if (!container) return;

      // Materials table
      const matRows = hoja.materiales.map((m, i) => {
        const mat = AppData.getMaterial(m.material_id);
        return `<tr>
          <td class="px-3 py-1.5 text-xs">${mat.nombre || m.material_id}</td>
          <td class="px-3 py-1.5"><input type="number" value="${m.consumo}" step="0.1" min="0" class="w-16 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Costos._updateMatField(${i},'consumo',this.value)" onfocus="this.select()"/></td>
          <td class="px-3 py-1.5 text-xs text-gray-400">${m.unidad}</td>
          <td class="px-3 py-1.5"><input type="number" value="${m.costo_unit}" step="0.01" min="0" class="w-20 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Costos._updateMatField(${i},'costo_unit',this.value)" onfocus="this.select()"/></td>
          <td class="px-3 py-1.5 text-xs font-mono font-semibold text-right">${App.formatCurrency(m.consumo * m.costo_unit)}</td>
          <td class="px-3 py-1.5"><button onclick="Costos._removeMatLine(${i})" class="p-1 text-red-400 hover:text-red-600 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></td>
        </tr>`;
      }).join('');

      // Labor table
      const moRows = hoja.mano_obra.map((m, i) => {
        const emp = AppData.getEmpleado(m.operario_id);
        return `<tr>
          <td class="px-3 py-1.5 text-xs font-mono">${m.nro}</td>
          <td class="px-3 py-1.5"><input type="text" value="${m.proceso}" class="w-full px-2 py-1 text-xs bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all" onchange="Costos._updateMOField(${i},'proceso',this.value)"/></td>
          <td class="px-3 py-1.5 text-xs">${UI.badge(m.tipo, m.tipo==='Fijo'?'blue':m.tipo==='Jornal'?'yellow':'purple')}</td>
          <td class="px-3 py-1.5 text-xs">${emp.nombre || m.operario_id}</td>
          <td class="px-3 py-1.5"><input type="number" value="${m.duracion}" step="0.5" min="0" class="w-14 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Costos._updateMOField(${i},'duracion',this.value)" onfocus="this.select()"/></td>
          <td class="px-3 py-1.5"><input type="number" value="${m.costo}" step="0.01" min="0" class="w-20 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Costos._updateMOField(${i},'costo',this.value)" onfocus="this.select()"/></td>
          <td class="px-3 py-1.5"><button onclick="Costos._removeMOLine(${i})" class="p-1 text-red-400 hover:text-red-600 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></td>
        </tr>`;
      }).join('');

      // Services
      const svRows = hoja.servicios.map((s, i) => {
        return `<tr>
          <td class="px-3 py-1.5"><input type="text" value="${s.descripcion}" class="w-full px-2 py-1 text-xs bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all" onchange="Costos._updateSvField(${i},'descripcion',this.value)"/></td>
          <td class="px-3 py-1.5"><input type="number" value="${s.costo}" step="0.01" class="w-24 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Costos._updateSvField(${i},'costo',this.value)" onfocus="this.select()"/></td>
          <td class="px-3 py-1.5"><button onclick="Costos._removeSvLine(${i})" class="p-1 text-red-400 hover:text-red-600"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></td>
        </tr>`;
      }).join('');

      const mpd = c ? c.mpd : 0, mod = c ? c.mod : 0;
      container.innerHTML = `
        <!-- Materiales -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">Materiales (BOM) <span class="text-xs font-normal text-gray-400">${hoja.materiales.length}</span></h4>
            <button onclick="Costos._addMatLine()" class="text-[11px] font-medium text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded-lg transition-colors">+ Material</button>
          </div>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Material</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Consumo</th>
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Unid</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">C. Unit</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Total</th>
              <th class="px-3 py-1.5 w-8"></th>
            </tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${matRows || '<tr><td colspan="6" class="py-4 text-center text-xs text-gray-400">Sin materiales. Haga clic en "+ Material"</td></tr>'}</tbody>
            <tfoot><tr class="border-t-2 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10"><td colspan="4" class="px-3 py-1.5 text-xs font-bold text-blue-600">MPD Total</td><td class="px-3 py-1.5 text-right text-xs font-mono font-bold text-blue-600">${App.formatCurrency(mpd)}</td><td></td></tr></tfoot></table>
          </div>
        </div>
        <!-- Mano de obra -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">Mano de Obra <span class="text-xs font-normal text-gray-400">${hoja.mano_obra.length}</span></h4>
            <button onclick="Costos._addMOLine()" class="text-[11px] font-medium text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded-lg transition-colors">+ Proceso</button>
          </div>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">N</th>
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Proceso</th>
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Tipo</th>
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Operario</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Horas</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Costo</th>
              <th class="px-3 py-1.5 w-8"></th>
            </tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${moRows || '<tr><td colspan="7" class="py-4 text-center text-xs text-gray-400">Sin procesos. Haga clic en "+ Proceso"</td></tr>'}</tbody>
            <tfoot><tr class="border-t-2 border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10"><td colspan="5" class="px-3 py-1.5 text-xs font-bold text-amber-600">MOD Total</td><td class="px-3 py-1.5 text-right text-xs font-mono font-bold text-amber-600">${App.formatCurrency(mod)}</td><td></td></tr></tfoot></table>
          </div>
        </div>
        <!-- Servicios -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">Servicios <span class="text-xs font-normal text-gray-400">${hoja.servicios.length}</span></h4>
            <button onclick="Costos._addSvLine()" class="text-[11px] font-medium text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded-lg transition-colors">+ Servicio</button>
          </div>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
            <table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
              <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Descripcion</th>
              <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Costo</th>
              <th class="px-3 py-1.5 w-8"></th>
            </tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${svRows || '<tr><td colspan="3" class="py-4 text-center text-xs text-gray-400">Sin servicios</td></tr>'}</tbody></table>
          </div>
        </div>`;
    };

    // Store current editing context
    this._editingHoja = hoja;
    this._editingProdId = productoId;
    this._refreshEditor = refreshEditor;

    const html = `<div id="hc-editor-content" class="space-y-5"></div>`;
    App.showModal(html, () => {
      this._editingHoja = null;
      App.showToast('Hoja de costo actualizada','success');
      if (this.activeTab === 'hojas') this.render_hojas();
    }, `Editar Receta — ${prod.nombre}`, true);

    requestAnimationFrame(refreshEditor);
  },

  // ── Inline CRUD helpers for editing hoja de costo ──
  _updateMatField(idx, field, value) {
    if (!this._editingHoja) return;
    this._editingHoja.materiales[idx][field] = parseFloat(value) || 0;
    this._refreshEditor();
  },
  _removeMatLine(idx) {
    if (!this._editingHoja) return;
    this._editingHoja.materiales.splice(idx, 1);
    this._refreshEditor();
  },
  _addMatLine() {
    if (!this._editingHoja) return;
    // Add inline form at top of materials section
    const container = document.getElementById('hc-editor-content');
    const existing = document.getElementById('hc-add-mat-form');
    if (existing) { existing.remove(); return; }
    const matOpts = AppData.materiales.map(m => `<option value="${m.id}">${m.nombre} (${m.categoria}) — ${App.formatCurrency(m.precio_unit)}/${m.unidad}</option>`).join('');
    const form = document.createElement('div');
    form.id = 'hc-add-mat-form';
    form.className = 'border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 rounded-xl p-3 mb-3';
    form.innerHTML = `
      <div class="flex items-end gap-3 flex-wrap">
        <div class="flex-1 min-w-[200px]"><label class="block text-[10px] font-medium text-gray-500 mb-1">Material</label>
        <select id="am-mat" class="w-full px-3 py-2 text-xs bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl">${matOpts}</select></div>
        <div class="w-20"><label class="block text-[10px] font-medium text-gray-500 mb-1">Consumo</label>
        <input type="number" id="am-consumo" value="1" step="0.1" min="0.1" class="w-full px-2 py-2 text-xs font-mono bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-right"/></div>
        <button onclick="Costos._confirmAddMat()" class="px-3 py-2 text-xs font-medium bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors">Agregar</button>
        <button onclick="document.getElementById('hc-add-mat-form').remove()" class="px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">Cancelar</button>
      </div>`;
    const firstSection = container.querySelector('div');
    if (firstSection) firstSection.insertBefore(form, firstSection.querySelector('.rounded-xl'));
  },
  _confirmAddMat() {
    if (!this._editingHoja) return;
    const matId = document.getElementById('am-mat').value;
    const mat = AppData.getMaterial(matId);
    const consumo = parseFloat(document.getElementById('am-consumo').value) || 1;
    this._editingHoja.materiales.push({
      material_id: matId, consumo, unidad: mat.unidad || 'Unidad', costo_unit: mat.precio_unit || 0,
    });
    document.getElementById('hc-add-mat-form')?.remove();
    this._refreshEditor();
  },

  _updateMOField(idx, field, value) {
    if (!this._editingHoja) return;
    if (field === 'proceso') this._editingHoja.mano_obra[idx][field] = value;
    else this._editingHoja.mano_obra[idx][field] = parseFloat(value) || 0;
    this._refreshEditor();
  },
  _removeMOLine(idx) {
    if (!this._editingHoja) return;
    this._editingHoja.mano_obra.splice(idx, 1);
    this._refreshEditor();
  },
  _addMOLine() {
    if (!this._editingHoja) return;
    const existing = document.getElementById('hc-add-mo-form');
    if (existing) { existing.remove(); return; }
    const empProd = AppData.empleados.filter(e => e.area === 'Producción' && e.estado === 'Activo');
    const empOpts = empProd.map(e => `<option value="${e.id}">${e.nombre} (${e.tipo_personal||'Fijo'})</option>`).join('');
    const tipoOpts = AppData.tipos_personal.map(t => `<option>${t}</option>`).join('');
    const form = document.createElement('div');
    form.id = 'hc-add-mo-form';
    form.className = 'border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-3 mb-3';
    form.innerHTML = `
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 items-end">
        <div><label class="block text-[10px] font-medium text-gray-500 mb-1">Proceso</label>
        <input type="text" id="amo-proceso" placeholder="Ej: Corte" class="w-full px-2 py-2 text-xs bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl"/></div>
        <div><label class="block text-[10px] font-medium text-gray-500 mb-1">Tipo</label>
        <select id="amo-tipo" class="w-full px-2 py-2 text-xs bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl">${tipoOpts}</select></div>
        <div><label class="block text-[10px] font-medium text-gray-500 mb-1">Operario</label>
        <select id="amo-emp" class="w-full px-2 py-2 text-xs bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl">${empOpts}</select></div>
        <div><label class="block text-[10px] font-medium text-gray-500 mb-1">Horas / Costo</label>
        <div class="flex gap-1"><input type="number" id="amo-duracion" value="1" step="0.5" class="w-14 px-2 py-2 text-xs font-mono bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-right"/>
        <input type="number" id="amo-costo" value="0" step="0.01" class="w-16 px-2 py-2 text-xs font-mono bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-right"/></div></div>
        <div class="flex gap-1">
          <button onclick="Costos._confirmAddMO()" class="px-3 py-2 text-xs font-medium bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">Agregar</button>
          <button onclick="document.getElementById('hc-add-mo-form').remove()" class="px-2 py-2 text-xs text-gray-400 hover:text-gray-600"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
      </div>`;
    // Insert before the MO table
    const sections = document.querySelectorAll('#hc-editor-content > div');
    if (sections[1]) sections[1].insertBefore(form, sections[1].querySelector('.rounded-xl'));
  },
  _confirmAddMO() {
    if (!this._editingHoja) return;
    const proceso = document.getElementById('amo-proceso').value.trim();
    if (!proceso) { App.showToast('Ingrese nombre del proceso','error'); return; }
    this._editingHoja.mano_obra.push({
      nro: this._editingHoja.mano_obra.length + 1,
      proceso,
      tipo: document.getElementById('amo-tipo').value,
      operario_id: document.getElementById('amo-emp').value,
      duracion: parseFloat(document.getElementById('amo-duracion').value) || 1,
      unidad_tiempo: 'horas',
      costo: parseFloat(document.getElementById('amo-costo').value) || 0,
    });
    document.getElementById('hc-add-mo-form')?.remove();
    this._refreshEditor();
  },

  _updateSvField(idx, field, value) {
    if (!this._editingHoja) return;
    if (field === 'descripcion') this._editingHoja.servicios[idx][field] = value;
    else this._editingHoja.servicios[idx][field] = parseFloat(value) || 0;
    this._refreshEditor();
  },
  _removeSvLine(idx) {
    if (!this._editingHoja) return;
    this._editingHoja.servicios.splice(idx, 1);
    this._refreshEditor();
  },
  _addSvLine() {
    if (!this._editingHoja) return;
    this._editingHoja.servicios.push({ descripcion: 'Nuevo servicio', costo: 0 });
    this._refreshEditor();
  },

  _editingHoja: null,
  _editingProdId: null,
  _refreshEditor: null,

  // ══════════════════════════════════════════════════════════
  // TAB: DEPRECIACION
  // ══════════════════════════════════════════════════════════
  render_depreciacion() {
    const el = document.getElementById('costos-tab-content');
    const deps = AppData.depreciacion;
    const totalMensual = deps.reduce((s, d) => s + d.dep_mensual * d.cantidad, 0);

    const data = deps.map(d => ({
      _id: d.id,
      descripcion: d.descripcion,
      valor_inicial: d.valor_inicial,
      valor_residual: d.valor_residual,
      anios: d.anios,
      cantidad: d.cantidad,
      dep_mensual: d.dep_mensual,
      _actions: [],
    }));

    el.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl px-4 py-3 inline-flex items-center gap-3">
            <p class="text-sm text-purple-600 dark:text-purple-300 font-medium">Depreciacion mensual total:</p>
            <p class="text-lg font-bold text-purple-700 dark:text-purple-200">${App.formatCurrency(totalMensual)}</p>
          </div>
        </div>
        ${UI.dataTable({
          id: 'dt-depreciacion',
          title: 'Maquinas y Herramientas',
          subtitle: deps.length + ' activos registrados',
          columns: [
            {key:'descripcion', label:'Descripcion', sortable:true},
            {key:'valor_inicial', label:'Valor Inicial', sortable:true, type:'currency'},
            {key:'valor_residual', label:'Valor Final', sortable:true, type:'currency'},
            {key:'anios', label:'Años Dep.', sortable:true, render: function(v){ return '<span class="font-mono">'+v+'</span>'; }},
            {key:'cantidad', label:'Cant.', sortable:true, render: function(v){ return '<span class="font-mono">'+v+'</span>'; }},
            {key:'dep_mensual', label:'D. Mensual', sortable:true, render: function(v){ return '<span class="font-mono font-bold text-green-600">'+App.formatCurrency(v)+'</span>'; }},
          ],
          data: data,
          pageSize: 20,
          searchable: true,
          selectable: false,
          resizable: true,
          toolbar: UI.button('+ Agregar Activo','primary','Costos.showNuevaDepreciacion()'),
        })}
      </div>`;
  },

  showNuevaDepreciacion() {
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('nd-desc','text','Descripcion','','Ej: Sierra Circular',true)}
      ${UI.input('nd-vi','number','Valor Inicial (S/)','','0.00',true)}
      ${UI.input('nd-vr','number','Valor Residual (S/)','','0.00')}
      ${UI.input('nd-anios','number','Años a Depreciar','10','',true)}
      ${UI.input('nd-cant','number','Cantidad','1','')}
    </div>`;
    App.showModal(html, () => {
      const desc = document.getElementById('nd-desc').value.trim();
      if (!desc) { App.showToast('La descripcion es requerida','error'); return; }
      const vi = parseFloat(document.getElementById('nd-vi').value) || 0;
      const vr = parseFloat(document.getElementById('nd-vr').value) || 0;
      const anios = parseInt(document.getElementById('nd-anios').value) || 10;
      const cant = parseInt(document.getElementById('nd-cant').value) || 1;
      const depMensual = anios > 0 ? Math.round((vi - vr) / anios / 12 * 100) / 100 : 0;
      AppData.depreciacion.unshift({
        id: 'DEP-' + String(AppData.depreciacion.length + 1).padStart(3,'0'),
        descripcion: desc, valor_inicial: vi, valor_residual: vr,
        anios: anios, cantidad: cant, dep_mensual: depMensual,
      });
      App.showToast(`Activo "${desc}" registrado — Dep. mensual: ${App.formatCurrency(depMensual)}`,'success');
      Costos.render_depreciacion();
    }, 'Nueva Depreciacion');
  },

  // ══════════════════════════════════════════════════════════
  // TAB: GASTOS OPERATIVOS
  // ══════════════════════════════════════════════════════════
  render_gastos() {
    const el = document.getElementById('costos-tab-content');
    const gos = AppData.gastos_operativos;
    const goProd = gos.filter(g => g.grupo === 'Produccion');
    const goAdmin = gos.filter(g => g.grupo === 'Administracion');
    const totalProd = goProd.reduce((s, g) => s + g.monto_mensual, 0);
    const totalAdmin = goAdmin.reduce((s, g) => s + g.monto_mensual, 0);

    const renderGroup = (title, items, total, icon) => `
      <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
        <div class="px-5 py-4 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-lg">${icon}</span>
            <div>
              <h4 class="font-bold text-gray-800 dark:text-white text-sm">${title}</h4>
              <p class="text-xs text-gray-400">${items.length} conceptos</p>
            </div>
          </div>
          <span class="text-lg font-bold text-gray-800 dark:text-white font-mono">${App.formatCurrency(total)}</span>
        </div>
        <table class="w-full text-sm">
          <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">
            ${items.map(g => `
              <tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20 transition-colors">
                <td class="px-5 py-3 text-sm text-gray-800 dark:text-white">${g.descripcion}</td>
                <td class="px-5 py-3 text-sm text-right font-mono font-semibold text-gray-700 dark:text-gray-300">${App.formatCurrency(g.monto_mensual)}</td>
                <td class="px-5 py-3 w-20">
                  <div class="flex items-center gap-1 justify-end">
                    <button onclick="Costos.editarGasto('${g.id}')" title="Editar gasto" class="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>
                    <button onclick="Costos.eliminarGasto('${g.id}')" title="Eliminar gasto" class="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></button>
                  </div>
                </td>
              </tr>`).join('')}
          </tbody>
        </table>
      </div>`;

    el.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl px-4 py-3 inline-flex items-center gap-3">
            <p class="text-sm text-yellow-600 dark:text-yellow-300 font-medium">Total gastos mensuales:</p>
            <p class="text-lg font-bold text-yellow-700 dark:text-yellow-200">${App.formatCurrency(totalProd + totalAdmin)}</p>
          </div>
          ${UI.button('+ Nuevo Gasto','primary','Costos.showNuevoGasto()')}
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          ${renderGroup('Produccion', goProd, totalProd, '🏭')}
          ${renderGroup('Administracion', goAdmin, totalAdmin, '🏢')}
        </div>
      </div>`;
  },

  showNuevoGasto() {
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('ng-desc','text','Descripcion','','Ej: Luz taller',true)}
      ${UI.input('ng-monto','number','Monto Mensual (S/)','','0.00',true)}
      <div>${UI.combobox ? UI.combobox('ng-grupo', [{value:'Produccion',label:'Produccion'},{value:'Administracion',label:'Administracion'}], {value:'Produccion',label:'Grupo',searchable:false}) : UI.select('ng-grupo', ['Produccion','Administracion'], 'Produccion', '', 'Grupo')}</div>
    </div>`;
    App.showModal(html, () => {
      const desc = document.getElementById('ng-desc').value.trim();
      if (!desc) { App.showToast('La descripcion es requerida','error'); return; }
      const monto = parseFloat(document.getElementById('ng-monto').value) || 0;
      const grupoEl = document.querySelector('#ng-grupo .cb-value');
      const grupo = grupoEl ? grupoEl.value : (document.getElementById('ng-grupo') ? document.getElementById('ng-grupo').value : 'Produccion');
      AppData.gastos_operativos.push({
        id: 'GO-' + String(AppData.gastos_operativos.length + 1).padStart(3,'0'),
        grupo, descripcion: desc, monto_mensual: monto,
      });
      App.showToast(`Gasto "${desc}" registrado`,'success');
      Costos.render_gastos();
    }, 'Nuevo Gasto Operativo');
  },

  editarGasto(id) {
    const g = AppData.gastos_operativos.find(x => x.id === id);
    if (!g) return;
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('eg-desc','text','Descripcion',g.descripcion,'',true)}
      ${UI.input('eg-monto','number','Monto Mensual',g.monto_mensual,'')}
    </div>`;
    App.showModal(html, () => {
      g.descripcion = document.getElementById('eg-desc').value.trim() || g.descripcion;
      g.monto_mensual = parseFloat(document.getElementById('eg-monto').value) || g.monto_mensual;
      App.showToast('Gasto actualizado','success');
      Costos.render_gastos();
    }, `Editar: ${g.descripcion}`);
  },

  eliminarGasto(id) {
    const g = AppData.gastos_operativos.find(x => x.id === id);
    if (!g) return;
    const html = `
      <div class="text-center space-y-3">
        <div class="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-300">¿Eliminar el gasto <strong>"${g.descripcion}"</strong> (${App.formatCurrency(g.monto_mensual)}/mes)?</p>
        <p class="text-xs text-red-500">Esto afectará el cálculo de CIF en todas las hojas de costo.</p>
      </div>`;
    App.showModal(html, () => {
      const idx = AppData.gastos_operativos.findIndex(x => x.id === id);
      if (idx !== -1) AppData.gastos_operativos.splice(idx, 1);
      App.showToast(`Gasto "${g.descripcion}" eliminado`, 'success');
      Costos.render_gastos();
    }, 'Confirmar eliminación');
  },

  // ══════════════════════════════════════════════════════════
  // TAB: COSTOS DE PERSONAL
  // ══════════════════════════════════════════════════════════
  render_personal() {
    const el = document.getElementById('costos-tab-content');
    const emps = AppData.empleados.filter(e => e.estado === 'Activo');
    const tipos = ['Fijo', 'Jornal', 'Destajo'];

    const renderTipoSection = (tipo, icon) => {
      const filtered = emps.filter(e => e.tipo_personal === tipo);
      if (filtered.length === 0) return '';
      let totalCosto = 0;

      const rows = filtered.map(e => {
        let costoMensual = 0, detalle = '';
        if (tipo === 'Fijo') {
          costoMensual = e.sueldo;
          detalle = `Sueldo: ${App.formatCurrency(e.sueldo)}`;
        } else if (tipo === 'Jornal') {
          const horasEfectivas = (e.horas_periodo || 0) * (e.frecuencia_mensual || 0) / 4;
          costoMensual = (e.tarifa_hora || 0) * horasEfectivas;
          detalle = `S/${e.tarifa_hora}/h × ${e.horas_periodo}h × ${e.frecuencia_mensual} dias`;
        } else {
          costoMensual = 0; // Destajo varies per project
          detalle = `S/${e.tarifa_pieza || 0}/pieza (variable)`;
        }
        totalCosto += costoMensual;

        return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
          <td class="px-4 py-3 text-sm"><p class="font-medium text-gray-800 dark:text-white">${e.nombre}</p><p class="text-[11px] text-gray-400">${e.cargo}</p></td>
          <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">${detalle}</td>
          <td class="px-4 py-3 text-sm text-right font-mono font-semibold text-gray-800 dark:text-white">${costoMensual > 0 ? App.formatCurrency(costoMensual) : 'Variable'}</td>
        </tr>`;
      }).join('');

      const tipoBadge = tipo === 'Fijo' ? 'blue' : tipo === 'Jornal' ? 'yellow' : 'purple';
      return `
        <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">${icon}</span>
              <div>
                <h4 class="font-bold text-gray-800 dark:text-white text-sm flex items-center gap-2">Personal ${tipo} ${UI.badge(filtered.length + ' personas', tipoBadge)}</h4>
              </div>
            </div>
            <span class="text-lg font-bold font-mono text-gray-800 dark:text-white">${totalCosto > 0 ? App.formatCurrency(totalCosto) : '—'}</span>
          </div>
          <table class="w-full text-sm">
            <thead><tr class="border-b border-gray-100 dark:border-night-700 bg-gray-50/50 dark:bg-night-700/30">
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Nombre / Cargo</th>
              <th class="px-4 py-2 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Detalle Pago</th>
              <th class="px-4 py-2 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo Mensual</th>
            </tr></thead>
            <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${rows}</tbody>
          </table>
        </div>`;
    };

    const costoPersonal = AppData.getCostoPersonalMensual();
    el.innerHTML = `
      <div class="space-y-4">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3 inline-flex items-center gap-3">
          <p class="text-sm text-blue-600 dark:text-blue-300 font-medium">Costo total personal mensual:</p>
          <p class="text-lg font-bold text-blue-700 dark:text-blue-200">${App.formatCurrency(costoPersonal.total)}</p>
          <span class="text-xs text-blue-400">Fijo: ${App.formatCurrency(costoPersonal.fijo)} · Jornal: ${App.formatCurrency(costoPersonal.jornal)}</span>
        </div>
        ${renderTipoSection('Fijo', '👔')}
        ${renderTipoSection('Jornal', '🔨')}
        ${renderTipoSection('Destajo', '📦')}
      </div>`;
  },

  // ══════════════════════════════════════════════════════════
  // TAB: MAESTROS (Procesos de Produccion + Servicios)
  // ══════════════════════════════════════════════════════════
  render_maestros() {
    const el = document.getElementById('costos-tab-content');
    const procs = AppData.procesos_produccion;
    const srvs = AppData.servicios_produccion;

    // ── Procesos table ──
    const procRows = procs.map(p => {
      const emp = AppData.getEmpleado(p.operario_default);
      const costoH = AppData.getCostoHora(p.operario_default);
      const costoTotal = costoH * p.horas_estandar;
      const tipoBadge = p.tipo_personal === 'Fijo' ? 'blue' : p.tipo_personal === 'Jornal' ? 'yellow' : 'purple';
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-white">${p.nombre}</td>
        <td class="px-4 py-2.5 text-sm text-gray-500">${p.area}</td>
        <td class="px-4 py-2.5">${UI.badge(p.tipo_personal, tipoBadge)}</td>
        <td class="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300">${emp.nombre || '—'}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono">${p.horas_estandar}h</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono text-gray-400">${App.formatCurrency(costoH)}/h</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono font-semibold">${App.formatCurrency(costoTotal)}</td>
        <td class="px-4 py-2.5 w-10">
          <button onclick="Costos.editarProceso('${p.id}')" class="p-1 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all" title="Editar">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </td>
      </tr>`;
    }).join('');

    // ── Servicios table ──
    const srvRows = srvs.map(s => {
      const resp = s.responsable_id ? AppData.getEmpleado(s.responsable_id) : null;
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2.5 text-sm font-medium text-gray-800 dark:text-white">${s.nombre}</td>
        <td class="px-4 py-2.5">${UI.badge(s.tipo, s.tipo === 'Interno' ? 'blue' : 'orange')}</td>
        <td class="px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300">${resp ? resp.nombre : '—'}</td>
        <td class="px-4 py-2.5 text-sm text-right font-mono font-semibold">${App.formatCurrency(s.costo_estandar)}</td>
        <td class="px-4 py-2.5 w-10">
          <button onclick="Costos.editarServicio('${s.id}')" class="p-1 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 transition-all" title="Editar">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
        </td>
      </tr>`;
    }).join('');

    // ── GA explanation ──
    const cif = AppData.getCIFMensual();
    const goAdmin = AppData.gastos_operativos.filter(g => g.grupo === 'Administracion').reduce((s, g) => s + g.monto_mensual, 0);

    el.innerHTML = `
      <div class="space-y-6">
        <!-- How costs flow to products -->
        <div class="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-5 border border-brand-200 dark:border-brand-800">
          <h4 class="text-sm font-bold text-brand-700 dark:text-brand-300 mb-2">Como se asignan los costos a cada producto</h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-brand-600 dark:text-brand-400">
            <div class="bg-white dark:bg-night-800 rounded-xl p-3">
              <p class="font-bold mb-1">CIF = Depreciacion + Gastos Prod.</p>
              <p class="text-brand-500">Dep. mensual: ${App.formatCurrency(cif.depreciacion)}</p>
              <p class="text-brand-500">Gastos prod: ${App.formatCurrency(cif.gastos_produccion)}</p>
              <p class="font-bold mt-1">Total CIF: ${App.formatCurrency(cif.total)}</p>
            </div>
            <div class="bg-white dark:bg-night-800 rounded-xl p-3">
              <p class="font-bold mb-1">Asignacion proporcional</p>
              <p>Se distribuye segun las horas de MO de cada producto. Si un producto usa 20h de 100h totales, recibe el 20% del CIF mensual.</p>
            </div>
            <div class="bg-white dark:bg-night-800 rounded-xl p-3">
              <p class="font-bold mb-1">GA (Gastos Admin.)</p>
              <p>Total: ${App.formatCurrency(goAdmin)}/mes</p>
              <p>Se asigna igual que el CIF, proporcional a horas de produccion de cada producto.</p>
            </div>
          </div>
        </div>

        <!-- Procesos de Produccion -->
        <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
            <div>
              <h4 class="font-bold text-gray-800 dark:text-white text-[15px]">Procesos de Produccion</h4>
              <p class="text-xs text-gray-400 mt-0.5">${procs.length} procesos — se usan al crear recetas de productos</p>
            </div>
            ${UI.button('+ Nuevo Proceso','primary','Costos.nuevoProceso()')}
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Proceso</th>
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Area</th>
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Tipo</th>
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Operario Def.</th>
                <th class="px-4 py-2.5 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Horas Std</th>
                <th class="px-4 py-2.5 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">C. Hora</th>
                <th class="px-4 py-2.5 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo Std</th>
                <th class="px-4 py-2.5 w-10"></th>
              </tr></thead>
              <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${procRows}</tbody>
            </table>
          </div>
        </div>

        <!-- Servicios de Produccion -->
        <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
            <div>
              <h4 class="font-bold text-gray-800 dark:text-white text-[15px]">Servicios de Produccion</h4>
              <p class="text-xs text-gray-400 mt-0.5">${srvs.length} servicios — internos y externos asignables a productos</p>
            </div>
            ${UI.button('+ Nuevo Servicio','primary','Costos.nuevoServicio()')}
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Servicio</th>
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Tipo</th>
                <th class="px-4 py-2.5 text-left text-[10px] font-mono font-semibold text-gray-400 uppercase">Responsable</th>
                <th class="px-4 py-2.5 text-right text-[10px] font-mono font-semibold text-gray-400 uppercase">Costo Std</th>
                <th class="px-4 py-2.5 w-10"></th>
              </tr></thead>
              <tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">${srvRows}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  },

  // ── CRUD: Procesos ──
  nuevoProceso() {
    const empOpts = AppData.empleados.filter(e => e.area === 'Producción' && e.estado === 'Activo')
      .map(e => ({value:e.id, label:e.nombre + ' — ' + e.cargo, desc: e.tipo_personal + ' · ' + App.formatCurrency(AppData.getCostoHora(e.id)) + '/h'}));
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('nproc-nombre','text','Nombre del Proceso','','Ej: Corte CNC',true)}
      ${UI.input('nproc-area','text','Area','Habilitado','Ej: Habilitado, Ensamble, Acabado')}
      <div>${UI.combobox('nproc-tipo', AppData.tipos_personal.map(t=>({value:t,label:t})), {value:'Fijo',label:'Tipo de Personal',searchable:false})}</div>
      <div>${UI.combobox('nproc-emp', empOpts, {label:'Operario por defecto',searchable:true,placeholder:'Buscar operario...'})}</div>
      ${UI.input('nproc-horas','number','Horas Estandar','2','',true)}
      ${UI.input('nproc-desc','text','Descripcion','','Breve descripcion del proceso')}
    </div>`;
    App.showModal(html, () => {
      const nombre = document.getElementById('nproc-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido','error'); return; }
      AppData.procesos_produccion.push({
        id: 'PROC-' + String(AppData.procesos_produccion.length + 1).padStart(3,'0'),
        nombre,
        area: document.getElementById('nproc-area').value || 'General',
        tipo_personal: document.querySelector('#nproc-tipo .cb-value')?.value || 'Fijo',
        horas_estandar: parseFloat(document.getElementById('nproc-horas').value) || 2,
        operario_default: document.querySelector('#nproc-emp .cb-value')?.value || '',
        descripcion: document.getElementById('nproc-desc').value,
      });
      App.showToast(`Proceso "${nombre}" creado`,'success');
      Costos.render_maestros();
    }, 'Nuevo Proceso de Produccion', true);
  },

  editarProceso(id) {
    const p = AppData.procesos_produccion.find(x => x.id === id);
    if (!p) return;
    const empOpts = AppData.empleados.filter(e => e.area === 'Producción' && e.estado === 'Activo')
      .map(e => ({value:e.id, label:e.nombre + ' — ' + e.cargo}));
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('eproc-nombre','text','Nombre',p.nombre,'',true)}
      ${UI.input('eproc-area','text','Area',p.area,'')}
      <div>${UI.combobox('eproc-tipo', AppData.tipos_personal.map(t=>({value:t,label:t})), {value:p.tipo_personal,label:'Tipo',searchable:false})}</div>
      <div>${UI.combobox('eproc-emp', empOpts, {value:p.operario_default,label:'Operario',searchable:true})}</div>
      ${UI.input('eproc-horas','number','Horas Estandar',p.horas_estandar,'')}
      ${UI.input('eproc-desc','text','Descripcion',p.descripcion||'','')}
    </div>`;
    App.showModal(html, () => {
      p.nombre = document.getElementById('eproc-nombre').value.trim() || p.nombre;
      p.area = document.getElementById('eproc-area').value || p.area;
      p.tipo_personal = document.querySelector('#eproc-tipo .cb-value')?.value || p.tipo_personal;
      p.operario_default = document.querySelector('#eproc-emp .cb-value')?.value || p.operario_default;
      p.horas_estandar = parseFloat(document.getElementById('eproc-horas').value) || p.horas_estandar;
      p.descripcion = document.getElementById('eproc-desc').value;
      App.showToast('Proceso actualizado','success');
      Costos.render_maestros();
    }, `Editar: ${p.nombre}`, true);
  },

  // ── CRUD: Servicios ──
  nuevoServicio() {
    const empOpts = [{value:'', label:'Servicio externo (sin responsable)'}].concat(
      AppData.empleados.filter(e => e.estado === 'Activo').map(e => ({value:e.id, label:e.nombre + ' — ' + e.cargo}))
    );
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('nsrv-nombre','text','Nombre del Servicio','','Ej: Transporte a obra',true)}
      <div>${UI.combobox('nsrv-tipo', [{value:'Interno',label:'Interno'},{value:'Externo',label:'Externo'}], {value:'Interno',label:'Tipo',searchable:false})}</div>
      <div>${UI.combobox('nsrv-resp', empOpts, {label:'Responsable',searchable:true,placeholder:'Buscar...'})}</div>
      ${UI.input('nsrv-costo','number','Costo Estandar (S/)','0','0.00',true)}
    </div>`;
    App.showModal(html, () => {
      const nombre = document.getElementById('nsrv-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido','error'); return; }
      AppData.servicios_produccion.push({
        id: 'SRV-' + String(AppData.servicios_produccion.length + 1).padStart(3,'0'),
        nombre,
        tipo: document.querySelector('#nsrv-tipo .cb-value')?.value || 'Interno',
        costo_estandar: parseFloat(document.getElementById('nsrv-costo').value) || 0,
        responsable_id: document.querySelector('#nsrv-resp .cb-value')?.value || '',
      });
      App.showToast(`Servicio "${nombre}" creado`,'success');
      Costos.render_maestros();
    }, 'Nuevo Servicio', true);
  },

  editarServicio(id) {
    const s = AppData.servicios_produccion.find(x => x.id === id);
    if (!s) return;
    const empOpts = [{value:'', label:'Servicio externo'}].concat(
      AppData.empleados.filter(e => e.estado === 'Activo').map(e => ({value:e.id, label:e.nombre}))
    );
    const html = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${UI.input('esrv-nombre','text','Nombre',s.nombre,'',true)}
      <div>${UI.combobox('esrv-tipo', [{value:'Interno',label:'Interno'},{value:'Externo',label:'Externo'}], {value:s.tipo,label:'Tipo',searchable:false})}</div>
      <div>${UI.combobox('esrv-resp', empOpts, {value:s.responsable_id||'',label:'Responsable',searchable:true})}</div>
      ${UI.input('esrv-costo','number','Costo Estandar',s.costo_estandar,'')}
    </div>`;
    App.showModal(html, () => {
      s.nombre = document.getElementById('esrv-nombre').value.trim() || s.nombre;
      s.tipo = document.querySelector('#esrv-tipo .cb-value')?.value || s.tipo;
      s.responsable_id = document.querySelector('#esrv-resp .cb-value')?.value || '';
      s.costo_estandar = parseFloat(document.getElementById('esrv-costo').value) || s.costo_estandar;
      App.showToast('Servicio actualizado','success');
      Costos.render_maestros();
    }, `Editar: ${s.nombre}`, true);
  },
};
