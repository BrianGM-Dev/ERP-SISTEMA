// ============================================================
// RRHH.JS - HR Module
// ============================================================

const ONP_PCT = AppData.config_empresa?.onp_pct || 13;
const ESSALUD_PCT = AppData.config_empresa?.essalud_pct || 9;

const RRHH = {
  activeTab: 'empleados',

  render() {
    const content = document.getElementById('main-content');
    const emps = AppData.empleados;
    const activos = emps.filter(e => e.estado === 'Activo').length;
    const totalPlanilla = AppData.planilla.reduce((s, p) => s + p.neto, 0);
    // Dynamic attendance % for today
    const hoyStr = new Date().toISOString().split('T')[0];
    const asistHoy = AppData.asistencias.filter(a => a.fecha === hoyStr);
    const presentesHoy = asistHoy.filter(a => a.estado === 'Presente' || a.estado === 'Tardanza').length;
    const asistenciaPct = activos > 0 ? Math.round((presentesHoy / activos) * 100) : 0;
    // Dynamic overtime hours for current month
    const mesActual = new Date().getMonth();
    const anioActual = new Date().getFullYear();
    const horasExtraMes = AppData.asistencias.filter(a => {
      const f = new Date(a.fecha);
      return f.getMonth() === mesActual && f.getFullYear() === anioActual && a.horas > 8;
    }).reduce((s, a) => s + (a.horas - 8), 0);

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Recursos Humanos', 'Gestión del equipo, asistencia y planilla',
          UI.button('+ Nuevo Empleado', 'primary', 'RRHH.showNuevoEmpleado()')
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Total Empleados', emps.length + ' personas', null, svgIcons.document, 'brand', `${activos} activos`)}
          ${UI.kpiCard('Planilla Mensual', App.formatCurrency(totalPlanilla), null, svgIcons.currency, 'green', 'Neto a pagar')}
          ${UI.kpiCard('Asistencia Hoy', asistenciaPct + '%', null, svgIcons.check, 'blue', presentesHoy + ' de ' + activos + ' presentes')}
          ${UI.kpiCard('Horas Extras Mes', horasExtraMes.toFixed(1) + ' hrs', null, svgIcons.cog, 'yellow', 'Total acumulado')}
        </div>

        <!-- Tabs -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-night-700">
            ${UI.tabs(
              [
                { id: 'empleados', label: 'Empleados' },
                { id: 'asistencia', label: 'Asistencia' },
                { id: 'planilla', label: 'Planilla' },
              ],
              this.activeTab,
              'RRHH.switchTab'
            )}
          </div>
          <div id="rrhh-tab-content" class="p-6">
            ${this.renderTab(this.activeTab)}
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    RRHH.activeTab = tab;
    ['empleados', 'asistencia', 'planilla'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) {
        btn.className = t === tab
          ? 'flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm'
          : 'flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200';
      }
    });
    const tc = document.getElementById('rrhh-tab-content');
    if (tc) tc.innerHTML = RRHH.renderTab(tab);
  },

  renderTab(tab) {
    switch (tab) {
      case 'empleados': return this.renderEmpleados();
      case 'asistencia': return this.renderAsistencia();
      case 'planilla': return this.renderPlanilla();
      default: return '';
    }
  },

  renderEmpleados() {
    const emps = AppData.empleados;
    const areas = [...new Set(emps.map(e => e.area))];
    const tipos = [...new Set(emps.map(e => e.tipo_personal || 'Fijo'))];

    const tableData = emps.map(e => {
      const costoH = AppData.getCostoHora(e.id);
      let pagoInfo = '';
      if (e.tipo_personal === 'Jornal') pagoInfo = App.formatCurrency(e.tarifa_hora) + '/h';
      else if (e.tipo_personal === 'Destajo') pagoInfo = App.formatCurrency(e.tarifa_pieza) + '/pza';
      else pagoInfo = App.formatCurrency(e.sueldo) + '/mes';
      return {
        _id: e.id,
        nombre: e.nombre,
        nombre_sub: e.cargo,
        _initials: e.nombre.split(' ').slice(0,2).map(n => n[0]).join(''),
        area: e.area,
        tipo: e.tipo_personal || 'Fijo',
        tipo_color: e.tipo_personal === 'Jornal' ? 'yellow' : e.tipo_personal === 'Destajo' ? 'purple' : 'blue',
        estado: e.estado,
        estado_color: e.estado === 'Activo' ? 'green' : e.estado === 'Vacaciones' ? 'blue' : e.estado === 'Cesado' ? 'red' : 'gray',
        pago: pagoInfo,
        costoHora: costoH,
        ingreso: e.ingreso,
        email: e.email || '',
        telefono: e.telefono || '',
        _actions: [],
      };
    });

    const renderNombre = function(v, r) {
      return '<div class="flex items-center gap-3">' +
        '<div class="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">' + r._initials + '</div>' +
        '<div class="min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate">' + v + '</p>' +
        '<p class="text-[11px] text-gray-400">' + r.nombre_sub + '</p></div></div>';
    };

    const renderAcciones = function(v, r) {
      return '<div class="flex items-center gap-0.5">' +
        '<button onclick="RRHH.verEmpleado(\'' + r._id + '\')" class="p-1.5 rounded-lg text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all" title="Ver ficha"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg></button>' +
        '<button onclick="RRHH.editarEmpleado(\'' + r._id + '\')" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-night-700 transition-all" title="Editar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button>' +
      '</div>';
    };

    return UI.dataTable({
      id: 'dt-empleados',
      title: 'Equipo de Trabajo',
      subtitle: emps.length + ' empleados · ' + emps.filter(e => e.estado === 'Activo').length + ' activos',
      columns: [
        {key:'nombre', label:'Empleado', sortable:true, render: renderNombre, width:'220px'},
        {key:'area', label:'Area', sortable:true},
        {key:'tipo', label:'Tipo', sortable:true, type:'badge'},
        {key:'pago', label:'Remuneracion', sortable:false, render: function(v){ return '<span class="font-mono text-sm font-semibold">' + v + '</span>'; }},
        {key:'costoHora', label:'C. Hora', sortable:true, render: function(v){ return '<span class="font-mono text-sm text-brand-600">' + App.formatCurrency(v) + '/h</span>'; }},
        {key:'estado', label:'Estado', sortable:true, type:'badge'},
        {key:'ingreso', label:'Ingreso', sortable:true, type:'date'},
        {key:'_acciones', label:'Acciones', sortable:false, render: renderAcciones, width:'80px'},
      ],
      data: tableData,
      pageSize: 10,
      searchable: true,
      selectable: false,
      resizable: true,
      advancedFilters: [
        {key:'area', label:'Area', options: areas.map(a => ({value:a, label:a, count: emps.filter(e=>e.area===a).length}))},
        {key:'tipo', label:'Tipo Personal', options: tipos.map(t => ({value:t, label:t, count: emps.filter(e=>(e.tipo_personal||'Fijo')===t).length}))},
        {key:'estado', label:'Estado', options: ['Activo','Vacaciones','Cesado','Inactivo'].map(s => ({value:s, label:s, count: emps.filter(e=>e.estado===s).length})).filter(o=>o.count>0)},
      ],
      toolbar: UI.button('+ Nuevo Empleado','primary','RRHH.showNuevoEmpleado()'),
      gridRender: function(row) {
        return '<div class="bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700 shadow-sm p-4 hover:shadow-md transition-all">' +
          '<div class="text-center mb-3"><div class="mx-auto w-12 h-12 rounded-xl bg-brand-500 flex items-center justify-center text-white font-bold mb-2">' + row._initials + '</div>' +
          '<h4 class="text-sm font-bold text-gray-800 dark:text-white">' + row.nombre + '</h4>' +
          '<p class="text-[11px] text-brand-600">' + row.nombre_sub + '</p></div>' +
          '<div class="space-y-1.5 text-xs text-gray-500 border-t border-gray-100 dark:border-night-700 pt-3">' +
          '<div class="flex justify-between"><span>' + row.area + '</span>' + UI.badge(row.tipo, row.tipo_color) + '</div>' +
          '<div class="flex justify-between"><span>Pago</span><strong>' + row.pago + '</strong></div>' +
          '<div class="flex justify-between"><span>C/Hora</span><strong class="text-brand-600">' + App.formatCurrency(row.costoHora) + '</strong></div></div>' +
          '<div class="mt-3 flex items-center justify-between">' + UI.badge(row.estado, row.estado_color) +
          '<div class="flex gap-1">' +
          '<button onclick="RRHH.editarEmpleado(\'' + row._id + '\')" class="text-[11px] font-medium text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">Editar</button>' +
          '</div></div></div>';
      },
    });
  },

  filterEmpleados(q) {
    q = (q || '').toLowerCase();
    const cards = document.querySelectorAll('#emp-grid > div');
    cards.forEach(card => { card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  renderAsistencia() {
    // Dynamic current week (Mon-Fri)
    const hoy = new Date();
    const dayOfWeek = hoy.getDay(); // 0=Sun, 1=Mon...
    const diffToMon = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const lunes = new Date(hoy);
    lunes.setDate(hoy.getDate() + diffToMon);
    const diasNombre = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const fechas = [];
    const diasLabel = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(lunes);
      d.setDate(lunes.getDate() + i);
      fechas.push(d.toISOString().split('T')[0]);
      diasLabel.push(diasNombre[i] + ' ' + d.getDate());
    }
    const mesNombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const semanaLabel = lunes.getDate() + ' — ' + new Date(lunes.getTime() + 4*86400000).getDate() + ' de ' + mesNombres[lunes.getMonth()] + ', ' + lunes.getFullYear();
    const emps = AppData.empleados.filter(e => e.estado === 'Activo' || AppData.asistencias.some(a => a.emp_id === e.id));

    const getAsistencia = (empId, fecha) => {
      return AppData.asistencias.find(a => a.emp_id === empId && a.fecha === fecha);
    };

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Semana: ${semanaLabel}</p>
            <p class="text-xs text-gray-400">Registro de marcaciones del personal</p>
          </div>
          ${UI.button('+ Registrar Asistencia', 'primary', 'RRHH.agregarAsistencia()')}
          <div class="flex flex-wrap gap-4 text-xs text-gray-500">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>Presente</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>Tardanza</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>Falta</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>Permiso</span>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Empleado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Área</th>
                ${fechas.map((_, i) => `<th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">${diasLabel[i]}</th>`).join('')}
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Total Hrs</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${emps.map(emp => {
                let totalHrs = 0;
                const cells = fechas.map(fecha => {
                  const ast = getAsistencia(emp.id, fecha);
                  if (!ast) return `<td class="px-4 py-3 text-center"><span class="w-6 h-6 rounded-full bg-gray-200 dark:bg-night-600 flex items-center justify-center mx-auto text-gray-400 text-xs">—</span></td>`;
                  totalHrs += ast.horas || 0;
                  const stateMap = {
                    'Presente': { cls: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: '✓' },
                    'Tardanza': { cls: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', icon: 'T' },
                    'Falta': { cls: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: '✕' },
                    'Permiso': { cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: 'P' },
                  };
                  const s = stateMap[ast.estado] || stateMap.Presente;
                  return `
                    <td class="px-4 py-3 text-center">
                      <span class="inline-flex flex-col items-center gap-0.5">
                        <span class="px-1.5 py-0.5 rounded-lg text-xs font-semibold ${s.cls}">${s.icon}</span>
                        ${ast.ingreso ? `<span class="text-xs text-gray-400">${ast.ingreso}</span>` : ''}
                      </span>
                    </td>
                  `;
                }).join('');
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${emp.nombre}</p>
                      <p class="text-xs text-gray-400">${emp.cargo}</p>
                    </td>
                    <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${emp.area}</td>
                    ${cells}
                    <td class="px-4 py-3 text-center font-bold text-brand-600 dark:text-brand-400">${totalHrs.toFixed(1)}h</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
        <div class="mt-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
          <p class="text-xs text-blue-700 dark:text-blue-400">Nota: Se muestran los datos de asistencia de la semana actual (${semanaLabel}). Use el botón "Registrar Asistencia" para agregar nuevos registros.</p>
        </div>
      </div>
    `;
  },

  renderPlanilla() {
    const plan = AppData.planilla;
    const totalBase = plan.reduce((s, p) => s + p.sueldo_base, 0);
    const totalExtras = plan.reduce((s, p) => s + p.horas_extra, 0);
    const totalBonos = plan.reduce((s, p) => s + p.bonos, 0);
    const totalDesc = plan.reduce((s, p) => s + p.descuento_onp + p.descuento_essalud, 0);
    const totalNeto = plan.reduce((s, p) => s + p.neto, 0);

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-2">
          <h3 class="font-semibold text-gray-800 dark:text-white">Planilla — Marzo 2026</h3>
          <div class="flex gap-2">
            ${UI.button('Recalcular Planilla', 'primary', 'RRHH.calcularPlanilla()')}
            ${UI.button('Exportar Planilla', 'secondary', "App.showToast('Exportando planilla...','info')")}
          </div>
        </div>

        <!-- Resumen -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div class="p-3 bg-brand-50 dark:bg-brand-900/10 rounded-xl text-center">
            <p class="text-xs text-brand-600 dark:text-brand-400 mb-1">Sueldo Base Total</p>
            <p class="text-lg font-bold text-brand-700 dark:text-brand-300">${App.formatCurrency(totalBase)}</p>
          </div>
          <div class="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl text-center">
            <p class="text-xs text-green-600 dark:text-green-400 mb-1">Extras + Bonos</p>
            <p class="text-lg font-bold text-green-700 dark:text-green-300">${App.formatCurrency(totalExtras + totalBonos)}</p>
          </div>
          <div class="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-center">
            <p class="text-xs text-red-600 dark:text-red-400 mb-1">Total Descuentos</p>
            <p class="text-lg font-bold text-red-700 dark:text-red-300">${App.formatCurrency(totalDesc)}</p>
          </div>
          <div class="p-3 bg-teal-50 dark:bg-teal-900/10 rounded-xl text-center">
            <p class="text-xs text-teal-600 dark:text-teal-400 mb-1">Neto a Pagar</p>
            <p class="text-lg font-bold text-teal-700 dark:text-teal-300">${App.formatCurrency(totalNeto)}</p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Empleado</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Sueldo Base</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">H. Extra</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Bonos</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">ONP (${ONP_PCT}%)</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">EsSalud (${ESSALUD_PCT}%)</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase font-bold">Neto</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${plan.map(p => {
                const emp = AppData.getEmpleado(p.emp_id);
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${emp.nombre || p.emp_id}</p>
                      <p class="text-xs text-gray-400">${emp.cargo || ''}</p>
                    </td>
                    <td class="px-4 py-3 text-right text-gray-700 dark:text-gray-300">${App.formatCurrency(p.sueldo_base)}</td>
                    <td class="px-4 py-3 text-right text-green-600 dark:text-green-400">${p.horas_extra > 0 ? App.formatCurrency(p.horas_extra) : '-'}</td>
                    <td class="px-4 py-3 text-right text-blue-600 dark:text-blue-400">${p.bonos > 0 ? App.formatCurrency(p.bonos) : '-'}</td>
                    <td class="px-4 py-3 text-right text-red-500">-${App.formatCurrency(p.descuento_onp)}</td>
                    <td class="px-4 py-3 text-right text-red-500">-${App.formatCurrency(p.descuento_essalud)}</td>
                    <td class="px-4 py-3 text-right font-bold text-brand-600 dark:text-brand-400">${App.formatCurrency(p.neto)}</td>
                    <td class="px-4 py-3">
                      <button onclick="RRHH.boleta('${p.emp_id}')" class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400 rounded-lg hover:bg-gray-200 transition-colors">Ver Boleta</button>
                    </td>
                  </tr>
                `;
              }).join('')}
              <tr class="border-t-2 border-gray-200 dark:border-night-600 bg-gray-50 dark:bg-night-700/30">
                <td class="px-4 py-3 font-bold text-gray-700 dark:text-gray-300">TOTALES</td>
                <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(totalBase)}</td>
                <td class="px-4 py-3 text-right font-bold text-green-600">${App.formatCurrency(totalExtras)}</td>
                <td class="px-4 py-3 text-right font-bold text-blue-600">${App.formatCurrency(totalBonos)}</td>
                <td class="px-4 py-3 text-right font-bold text-red-500">-${App.formatCurrency(plan.reduce((s, p) => s + p.descuento_onp, 0))}</td>
                <td class="px-4 py-3 text-right font-bold text-red-500">-${App.formatCurrency(plan.reduce((s, p) => s + p.descuento_essalud, 0))}</td>
                <td class="px-4 py-3 text-right font-bold text-brand-700 dark:text-brand-300 text-base">${App.formatCurrency(totalNeto)}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  boleta(empId) {
    const p = AppData.planilla.find(x => x.emp_id === empId);
    const emp = AppData.getEmpleado(empId);
    if (!p || !emp) return;
    const totalBruto = p.sueldo_base + p.horas_extra + p.bonos;
    const totalDescuentos = p.descuento_onp + p.descuento_essalud;
    const otrosDescuentos = totalBruto - totalDescuentos - p.neto;
    const html = `
      <div class="space-y-4">
        <div class="text-center border-b border-gray-100 dark:border-night-700 pb-4">
          <p class="font-bold text-gray-800 dark:text-white">${AppData.config_empresa.nombre}</p>
          <p class="text-xs text-gray-400">RUC: ${AppData.config_empresa.ruc}</p>
          <p class="text-sm font-semibold text-brand-600 mt-2">BOLETA DE PAGO — ${p.mes}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          <div class="p-2 bg-gray-50 dark:bg-night-700/50 rounded">
            <p class="text-xs text-gray-400">Trabajador</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${emp.nombre}</p>
          </div>
          <div class="p-2 bg-gray-50 dark:bg-night-700/50 rounded">
            <p class="text-xs text-gray-400">DNI / Cargo</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${emp.dni} — ${emp.cargo}</p>
          </div>
          <div class="p-2 bg-gray-50 dark:bg-night-700/50 rounded">
            <p class="text-xs text-gray-400">Área</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${emp.area}</p>
          </div>
          <div class="p-2 bg-gray-50 dark:bg-night-700/50 rounded">
            <p class="text-xs text-gray-400">Fecha Ingreso</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${App.formatDate(emp.ingreso)}</p>
          </div>
        </div>

        <!-- Ingresos -->
        <div class="space-y-2 text-sm">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Ingresos</p>
          <div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">Sueldo Básico</span><span class="font-medium">${App.formatCurrency(p.sueldo_base)}</span></div>
          <div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">Horas Extras</span><span class="font-medium text-green-600">${p.horas_extra > 0 ? '+' + App.formatCurrency(p.horas_extra) : App.formatCurrency(0)}</span></div>
          <div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">Bonificaciones</span><span class="font-medium text-green-600">${p.bonos > 0 ? '+' + App.formatCurrency(p.bonos) : App.formatCurrency(0)}</span></div>
          <div class="flex justify-between py-1.5 bg-green-50 dark:bg-green-900/10 px-2 rounded-lg font-semibold"><span class="text-gray-700 dark:text-gray-200">Total Bruto</span><span class="text-green-700 dark:text-green-300">${App.formatCurrency(totalBruto)}</span></div>
        </div>

        <!-- Descuentos -->
        <div class="space-y-2 text-sm">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Descuentos</p>
          <div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">ONP (${ONP_PCT}%)</span><span class="font-medium text-red-500">-${App.formatCurrency(p.descuento_onp)}</span></div>
          <div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">EsSalud (${ESSALUD_PCT}%)</span><span class="font-medium text-red-500">-${App.formatCurrency(p.descuento_essalud)}</span></div>
          ${otrosDescuentos > 0.01 ? `<div class="flex justify-between py-1 border-b border-gray-50 dark:border-night-700"><span class="text-gray-600 dark:text-gray-300">Otros descuentos</span><span class="font-medium text-red-500">-${App.formatCurrency(otrosDescuentos)}</span></div>` : ''}
          <div class="flex justify-between py-1.5 bg-red-50 dark:bg-red-900/10 px-2 rounded-lg font-semibold"><span class="text-gray-700 dark:text-gray-200">Total Descuentos</span><span class="text-red-600 dark:text-red-400">-${App.formatCurrency(totalDescuentos + (otrosDescuentos > 0.01 ? otrosDescuentos : 0))}</span></div>
        </div>

        <!-- Neto -->
        <div class="flex justify-between py-2 bg-brand-50 dark:bg-brand-900/20 px-2 rounded-xl font-bold"><span class="text-gray-800 dark:text-white">NETO A PAGAR</span><span class="text-brand-600 text-lg">${App.formatCurrency(p.neto)}</span></div>
      </div>
    `;
    App.showModal(html, null, `Boleta — ${emp.nombre}`);
  },

  verEmpleado(id) {
    const emp = AppData.getEmpleado(id);
    if (!emp.id) return;
    const planilla = AppData.planilla.find(p => p.emp_id === id);
    const tipo = emp.tipo_personal || 'Fijo';
    const costoH = AppData.getCostoHora(emp.id);
    let pagoDetalle = '';
    if (tipo === 'Fijo') pagoDetalle = `<div class="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl"><p class="text-xs text-green-600">Sueldo Mensual</p><p class="font-bold text-green-700 dark:text-green-300">${App.formatCurrency(emp.sueldo)}</p></div>`;
    else if (tipo === 'Jornal') pagoDetalle = `<div class="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl"><p class="text-xs text-yellow-600">Tarifa por Hora</p><p class="font-bold text-yellow-700">${App.formatCurrency(emp.tarifa_hora)}/h</p></div><div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Jornada</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.horas_periodo}h × ${emp.frecuencia_mensual} dias</p></div>`;
    else if (tipo === 'Destajo') pagoDetalle = `<div class="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl"><p class="text-xs text-purple-600">Tarifa por Pieza</p><p class="font-bold text-purple-700">${App.formatCurrency(emp.tarifa_pieza)}/pza</p></div>`;

    const html = `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            ${emp.nombre.split(' ').slice(0,2).map(n => n[0]).join('')}
          </div>
          <div>
            <h3 class="font-bold text-gray-800 dark:text-white text-lg">${emp.nombre}</h3>
            <p class="text-brand-600 dark:text-brand-400 font-medium">${emp.cargo}</p>
            <div class="flex gap-2 mt-1">${UI.badge(emp.estado, emp.estado === 'Activo' ? 'green' : emp.estado === 'Vacaciones' ? 'blue' : 'red')} ${UI.badge(tipo, tipo === 'Jornal' ? 'yellow' : tipo === 'Destajo' ? 'purple' : 'blue')}</div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">DNI</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.dni}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Area</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.area}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Fecha Ingreso</p><p class="font-semibold text-gray-800 dark:text-gray-200">${App.formatDate(emp.ingreso)}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Email</p><p class="font-semibold text-gray-800 dark:text-gray-200 text-xs truncate">${emp.email || '—'}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Telefono</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.telefono || '—'}</p></div>
          <div class="p-3 bg-brand-50 dark:bg-brand-900/10 rounded-xl"><p class="text-xs text-brand-600">Costo por Hora</p><p class="font-bold text-brand-700 dark:text-brand-300">${App.formatCurrency(costoH)}/h</p></div>
          ${pagoDetalle}
        </div>
        <div class="flex justify-end gap-2 pt-2">
          ${UI.button('Editar','primary',`App.closeModal();setTimeout(function(){RRHH.editarEmpleado('${emp.id}')},150)`)}
        </div>
      </div>
    `;
    App.showModal(html, null, 'Ficha del Empleado', true);
  },

  editarEmpleado(id) {
    const emp = AppData.getEmpleado(id);
    if (!emp.id) return;
    const tipo = emp.tipo_personal || 'Fijo';
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${UI.input('ee-nombre', 'text', 'Nombre Completo', emp.nombre, '', true)}
        ${UI.input('ee-dni', 'text', 'DNI', emp.dni || '', '8 digitos')}
        ${UI.input('ee-cargo', 'text', 'Cargo', emp.cargo, '', true)}
        <div>${UI.combobox('ee-area', ['Gerencia','Administracion','Produccion','Ventas','Contabilidad','Logistica'].map(a=>({value:a,label:a})), {value:emp.area,label:'Area',searchable:false})}</div>
        <div>${UI.combobox('ee-tipo', AppData.tipos_personal.map(t=>({value:t,label:t})), {value:tipo,label:'Tipo de Personal',searchable:false})}</div>
        <div>${UI.combobox('ee-estado', ['Activo','Vacaciones','Licencia','Inactivo','Cesado'].map(s=>({value:s,label:s})), {value:emp.estado,label:'Estado',searchable:false})}</div>
        ${UI.input('ee-email', 'email', 'Email', emp.email || '', '')}
        ${UI.input('ee-telefono', 'text', 'Telefono', emp.telefono || '', '')}
        ${UI.input('ee-ingreso', 'date', 'Fecha de Ingreso', emp.ingreso, '')}
        <!-- Campos segun tipo -->
        <div class="sm:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div id="ee-f-fijo" ${tipo!=='Fijo'?'class="hidden"':''}>
            ${UI.input('ee-sueldo', 'number', 'Sueldo Mensual (S/)', emp.sueldo || '', '')}
          </div>
          <div id="ee-f-jornal" ${tipo!=='Jornal'?'class="hidden sm:col-span-3"':'class="sm:col-span-3"'}>
            <div class="grid grid-cols-3 gap-3">
              ${UI.input('ee-tarifa-hora', 'number', 'Tarifa/Hora (S/)', emp.tarifa_hora || '', '')}
              ${UI.input('ee-horas', 'number', 'Horas/Periodo', emp.horas_periodo || 48, '')}
              ${UI.input('ee-frecuencia', 'number', 'Dias/Mes', emp.frecuencia_mensual || 26, '')}
            </div>
          </div>
          <div id="ee-f-destajo" ${tipo!=='Destajo'?'class="hidden"':''}>
            ${UI.input('ee-tarifa-pieza', 'number', 'Tarifa/Pieza (S/)', emp.tarifa_pieza || '', '')}
          </div>
        </div>
      </div>`;
    App.showModal(html, () => {
      const idx = AppData.empleados.findIndex(e => e.id === id);
      if (idx === -1) return;
      const nombre = document.getElementById('ee-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
      const nuevoTipo = document.querySelector('#ee-tipo .cb-value')?.value || tipo;
      AppData.empleados[idx].nombre = nombre;
      AppData.empleados[idx].dni = document.getElementById('ee-dni').value;
      AppData.empleados[idx].cargo = document.getElementById('ee-cargo').value;
      AppData.empleados[idx].area = document.querySelector('#ee-area .cb-value')?.value || emp.area;
      AppData.empleados[idx].tipo_personal = nuevoTipo;
      AppData.empleados[idx].estado = document.querySelector('#ee-estado .cb-value')?.value || emp.estado;
      AppData.empleados[idx].email = document.getElementById('ee-email').value;
      AppData.empleados[idx].telefono = document.getElementById('ee-telefono').value;
      AppData.empleados[idx].ingreso = document.getElementById('ee-ingreso').value || emp.ingreso;
      if (nuevoTipo === 'Fijo') {
        AppData.empleados[idx].sueldo = parseFloat(document.getElementById('ee-sueldo').value) || emp.sueldo || 0;
      } else if (nuevoTipo === 'Jornal') {
        AppData.empleados[idx].tarifa_hora = parseFloat(document.getElementById('ee-tarifa-hora').value) || emp.tarifa_hora || 0;
        AppData.empleados[idx].horas_periodo = parseInt(document.getElementById('ee-horas').value) || 48;
        AppData.empleados[idx].frecuencia_mensual = parseInt(document.getElementById('ee-frecuencia').value) || 26;
        AppData.empleados[idx].sueldo = 0;
      } else if (nuevoTipo === 'Destajo') {
        AppData.empleados[idx].tarifa_pieza = parseFloat(document.getElementById('ee-tarifa-pieza').value) || emp.tarifa_pieza || 0;
        AppData.empleados[idx].sueldo = 0;
      }
      App.showToast('Empleado actualizado', 'success');
      RRHH.render();
    }, `Editar: ${emp.nombre}`, true);
    // Watch tipo change to toggle fields
    setTimeout(() => {
      const tipoHidden = document.querySelector('#ee-tipo .cb-value');
      if (tipoHidden) tipoHidden.addEventListener('change', function() {
        const t = this.value;
        document.getElementById('ee-f-fijo').classList.toggle('hidden', t !== 'Fijo');
        document.getElementById('ee-f-jornal').classList.toggle('hidden', t !== 'Jornal');
        document.getElementById('ee-f-destajo').classList.toggle('hidden', t !== 'Destajo');
      });
    }, 50);
  },

  showNuevoEmpleado() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ne-nombre', 'text', 'Nombre Completo', '', '', true)}
        ${UI.input('ne-dni', 'text', 'DNI', '', '8 digitos', true)}
        ${UI.input('ne-cargo', 'text', 'Cargo', '', '', true)}
        <div>${UI.combobox('ne-area', ['Gerencia','Administracion','Produccion','Ventas','Contabilidad','Logistica'].map(a=>({value:a,label:a})), {label:'Area',searchable:false,placeholder:'Seleccionar...'})}</div>
        <div>${UI.combobox('ne-tipo', AppData.tipos_personal.map(t=>({value:t,label:t})), {value:'Fijo',label:'Tipo de Personal *',searchable:false})}</div>
        ${UI.input('ne-email', 'email', 'Email corporativo', '', 'nombre@citemadera.pe')}
        ${UI.input('ne-telefono', 'text', 'Telefono', '', '9XXXXXXXX')}
        <!-- Campos Fijo -->
        <div id="ne-fields-fijo">
          ${UI.input('ne-sueldo', 'number', 'Sueldo Mensual (S/)', '', '', true)}
        </div>
        <!-- Campos Jornal -->
        <div id="ne-fields-jornal" class="hidden sm:col-span-2">
          <div class="grid grid-cols-3 gap-3">
            ${UI.input('ne-tarifa-hora', 'number', 'Tarifa x Hora (S/)', '', '0.00')}
            ${UI.input('ne-horas', 'number', 'Horas/Periodo', '48', '')}
            ${UI.input('ne-frecuencia', 'number', 'Dias/Mes', '26', '')}
          </div>
        </div>
        <!-- Campos Destajo -->
        <div id="ne-fields-destajo" class="hidden">
          ${UI.input('ne-tarifa-pieza', 'number', 'Tarifa x Pieza (S/)', '', '0.00')}
        </div>
        ${UI.input('ne-ingreso', 'date', 'Fecha de Ingreso', new Date().toISOString().split('T')[0], '')}
      </div>
    `;
    App.showModal(html, () => {
      const nombre = document.getElementById('ne-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
      const tipo = document.querySelector('#ne-tipo .cb-value')?.value || 'Fijo';
      const nuevo = {
        id: 'EMP-' + String(AppData.empleados.length + 1).padStart(3, '0'),
        nombre,
        dni: document.getElementById('ne-dni').value,
        cargo: document.getElementById('ne-cargo').value,
        area: document.querySelector('#ne-area .cb-value')?.value || 'Produccion',
        tipo_personal: tipo,
        sueldo: tipo === 'Fijo' ? (parseFloat(document.getElementById('ne-sueldo').value) || 0) : 0,
        tarifa_hora: tipo === 'Jornal' ? (parseFloat(document.getElementById('ne-tarifa-hora').value) || 0) : undefined,
        horas_periodo: tipo === 'Jornal' ? (parseInt(document.getElementById('ne-horas').value) || 48) : undefined,
        frecuencia_mensual: tipo === 'Jornal' ? (parseInt(document.getElementById('ne-frecuencia').value) || 26) : undefined,
        porcentaje_capa: tipo === 'Jornal' ? 100 : undefined,
        tarifa_pieza: tipo === 'Destajo' ? (parseFloat(document.getElementById('ne-tarifa-pieza').value) || 0) : undefined,
        ingreso: document.getElementById('ne-ingreso').value,
        estado: 'Activo',
        email: document.getElementById('ne-email').value,
        telefono: document.getElementById('ne-telefono').value,
      };
      AppData.empleados.unshift(nuevo);
      App.showToast(`Empleado "${nombre}" registrado como ${tipo}`, 'success');
      RRHH.render();
    }, 'Nuevo Empleado', true);
    // Watch combobox tipo change to toggle fields
    setTimeout(() => {
      const tipoHidden = document.querySelector('#ne-tipo .cb-value');
      if (tipoHidden) tipoHidden.addEventListener('change', function() {
        RRHH._toggleTipoFields(this.value);
      });
    }, 50);
  },

  _toggleTipoFields(tipo) {
    const f = document.getElementById('ne-fields-fijo');
    const j = document.getElementById('ne-fields-jornal');
    const d = document.getElementById('ne-fields-destajo');
    if (f) f.classList.toggle('hidden', tipo !== 'Fijo');
    if (j) j.classList.toggle('hidden', tipo !== 'Jornal');
    if (d) d.classList.toggle('hidden', tipo !== 'Destajo');
  },

  // ── AGREGAR ASISTENCIA ─────────────────────────────────
  agregarAsistencia() {
    const activos = AppData.empleados.filter(e => e.estado === 'Activo');
    const hoyStr = new Date().toISOString().split('T')[0];
    const optionsHtml = activos.map(e => `<option value="${e.id}">${e.nombre} — ${e.cargo}</option>`).join('');
    const html = `
      <div class="space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Empleado</label>
          <select id="aa-emp" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
            ${optionsHtml}
          </select>
        </div>
        ${UI.input('aa-fecha', 'date', 'Fecha', hoyStr, '', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Estado</label>
          <div class="flex flex-wrap gap-3 mt-1" id="aa-estado-group">
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="aa-estado" value="Presente" checked onchange="RRHH._toggleHoras()"><span class="text-sm text-gray-700 dark:text-gray-300">Presente</span></label>
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="aa-estado" value="Tardanza" onchange="RRHH._toggleHoras()"><span class="text-sm text-gray-700 dark:text-gray-300">Tardanza</span></label>
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="aa-estado" value="Falta" onchange="RRHH._toggleHoras()"><span class="text-sm text-gray-700 dark:text-gray-300">Falta</span></label>
            <label class="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="aa-estado" value="Permiso" onchange="RRHH._toggleHoras()"><span class="text-sm text-gray-700 dark:text-gray-300">Permiso</span></label>
          </div>
        </div>
        <div id="aa-horas-section" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${UI.input('aa-entrada', 'time', 'Hora Entrada', '08:00', '', false)}
          ${UI.input('aa-salida', 'time', 'Hora Salida', '17:00', '', false)}
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Horas Trabajadas</label>
            <input type="text" id="aa-horas" readonly class="w-full px-3 py-2 text-sm bg-gray-100 dark:bg-night-600 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200" value="9.0">
          </div>
        </div>
      </div>
    `;
    App.showModal(html, () => {
      const empId = document.getElementById('aa-emp').value;
      const fecha = document.getElementById('aa-fecha').value;
      const estado = document.querySelector('input[name="aa-estado"]:checked').value;
      if (!empId || !fecha) { App.showToast('Empleado y fecha son requeridos', 'error'); return; }
      // Check for duplicate
      const dup = AppData.asistencias.find(a => a.emp_id === empId && a.fecha === fecha);
      if (dup) { App.showToast('Ya existe un registro de asistencia para este empleado en esa fecha', 'error'); return; }
      const esPresente = estado === 'Presente' || estado === 'Tardanza';
      const ingreso = esPresente ? document.getElementById('aa-entrada').value : null;
      const salida = esPresente ? document.getElementById('aa-salida').value : null;
      const horas = esPresente ? parseFloat(document.getElementById('aa-horas').value) || 0 : 0;
      AppData.asistencias.push({ emp_id: empId, fecha, ingreso, salida, horas, estado });
      App.showToast('Asistencia registrada correctamente', 'success');
      RRHH.activeTab = 'asistencia';
      RRHH.render();
    }, 'Registrar Asistencia', true);

    // Auto-calculate hours when time inputs change
    setTimeout(() => {
      const entradaEl = document.getElementById('aa-entrada');
      const salidaEl = document.getElementById('aa-salida');
      if (entradaEl && salidaEl) {
        const calc = () => {
          const e = entradaEl.value;
          const s = salidaEl.value;
          if (e && s) {
            const [eh, em] = e.split(':').map(Number);
            const [sh, sm] = s.split(':').map(Number);
            const diff = (sh * 60 + sm - eh * 60 - em) / 60;
            const horasEl = document.getElementById('aa-horas');
            if (horasEl) horasEl.value = diff > 0 ? diff.toFixed(1) : '0.0';
          }
        };
        entradaEl.addEventListener('change', calc);
        salidaEl.addEventListener('change', calc);
      }
    }, 100);
  },

  _toggleHoras() {
    const estado = document.querySelector('input[name="aa-estado"]:checked').value;
    const section = document.getElementById('aa-horas-section');
    if (section) {
      section.style.display = (estado === 'Presente' || estado === 'Tardanza') ? '' : 'none';
    }
  },

  // ── CALCULAR PLANILLA ──────────────────────────────────
  calcularPlanilla() {
    const now = new Date();
    const mesActual = now.getMonth();
    const anioActual = now.getFullYear();
    const mesNombres = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const mesLabel = mesNombres[mesActual] + ' ' + anioActual;
    const onpPct = AppData.config_empresa.onp_pct || 13;
    const essaludPct = AppData.config_empresa.essalud_pct || 9;

    const nuevaPlanilla = [];
    AppData.empleados.filter(e => e.estado === 'Activo').forEach(emp => {
      const salarioBase = emp.sueldo || 0;

      // Calculate overtime: hours > 8 per day in current month
      const asistenciasMes = AppData.asistencias.filter(a => {
        if (a.emp_id !== emp.id) return false;
        const f = new Date(a.fecha);
        return f.getMonth() === mesActual && f.getFullYear() === anioActual;
      });
      let horasExtra = 0;
      asistenciasMes.forEach(a => {
        if (a.horas && a.horas > 8) {
          horasExtra += a.horas - 8;
        }
      });
      const horasExtraMonto = horasExtra * (salarioBase / 240) * 1.25;

      // Look for existing bonos or default to 0
      const planillaExistente = AppData.planilla.find(p => p.emp_id === emp.id);
      const bonificaciones = planillaExistente ? planillaExistente.bonos : 0;

      const bruto = salarioBase + horasExtraMonto + bonificaciones;
      const onp = bruto * (onpPct / 100);
      const essalud = bruto * (essaludPct / 100);
      const neto = bruto - onp - essalud;

      nuevaPlanilla.push({
        emp_id: emp.id,
        mes: mesLabel,
        sueldo_base: Math.round(salarioBase * 100) / 100,
        horas_extra: Math.round(horasExtraMonto * 100) / 100,
        bonos: Math.round(bonificaciones * 100) / 100,
        descuento_onp: Math.round(onp * 100) / 100,
        descuento_essalud: Math.round(essalud * 100) / 100,
        neto: Math.round(neto * 100) / 100,
      });
    });

    AppData.planilla = nuevaPlanilla;
    App.showToast('Planilla recalculada', 'success');
    RRHH.activeTab = 'planilla';
    RRHH.render();
  },

  // ── ELIMINAR (CESAR) EMPLEADO ──────────────────────────
  eliminarEmpleado(id) {
    const emp = AppData.getEmpleado(id);
    if (!emp.id) return;
    App.showModal(
      `<div class="text-center space-y-3">
        <div class="mx-auto w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
          <svg class="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-300">Esta accion cambiara el estado de <strong>${emp.nombre}</strong> a <strong>Cesado</strong>.</p>
        <p class="text-xs text-gray-400">El empleado no sera eliminado permanentemente, pero dejara de aparecer como activo.</p>
      </div>`,
      () => {
        const idx = AppData.empleados.findIndex(e => e.id === id);
        if (idx !== -1) {
          AppData.empleados[idx].estado = 'Cesado';
          App.showToast(`${emp.nombre} ha sido cesado`, 'success');
          RRHH.render();
        }
      },
      'Confirmar Cese de Empleado'
    );
  },
};
