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

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Recursos Humanos', 'Gestión del equipo, asistencia y planilla',
          UI.button('+ Nuevo Empleado', 'primary', 'RRHH.showNuevoEmpleado()')
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Total Empleados', emps.length + ' personas', null, svgIcons.document, 'brand', `${activos} activos`)}
          ${UI.kpiCard('Planilla Mensual', App.formatCurrency(totalPlanilla), null, svgIcons.currency, 'green', 'Neto a pagar')}
          ${UI.kpiCard('Asistencia Hoy', '89%', null, svgIcons.check, 'blue', 'Puntualidad del equipo')}
          ${UI.kpiCard('Horas Extras Mes', '90 hrs', null, svgIcons.cog, 'yellow', 'Total acumulado')}
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
    const areas = [...new Set(AppData.empleados.map(e => e.area))];
    const avatarColors = ['brand', 'green', 'blue', 'purple', 'orange', 'teal'];

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex gap-2 flex-wrap">
            <button onclick="RRHH.filterEmpleados('all')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400">Todos</button>
            ${areas.map(a => `<button onclick="RRHH.filterEmpleados('${a}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors">${a}</button>`).join('')}
          </div>
          <div class="w-full sm:w-64">${UI.searchInput('emp-search', 'Buscar empleado...', 'RRHH.searchEmpleado(this.value)')}</div>
        </div>

        <div id="emp-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          ${AppData.empleados.map((emp, idx) => `
            <div class="bg-white dark:bg-night-800 border border-gray-100 dark:border-night-700 rounded-2xl p-4 hover:shadow-md hover:border-brand-200 dark:hover:border-brand-700 transition-all" data-area="${emp.area}">
              <div class="text-center mb-3">
                <div class="mx-auto w-14 h-14 ${['bg-brand-500','bg-green-500','bg-blue-500','bg-purple-500','bg-orange-500','bg-teal-500'][idx % 6]} rounded-2xl flex items-center justify-center text-white text-xl font-bold mb-2">
                  ${emp.nombre.split(' ').slice(0,2).map(n => n[0]).join('')}
                </div>
                <h4 class="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">${emp.nombre}</h4>
                <p class="text-xs text-brand-600 dark:text-brand-400 font-medium mt-0.5">${emp.cargo}</p>
              </div>
              <div class="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-night-700 pt-3">
                <div class="flex items-center gap-1.5">
                  ${emp.area}
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="truncate">${emp.email}</span>
                </div>
                <div class="flex items-center gap-1.5">
                  ${emp.telefono}
                </div>
                <div class="flex items-center gap-1.5">
                  Desde ${emp.ingreso.split('-').slice(0,2).join('/')}
                </div>
              </div>
              <div class="mt-3 flex items-center justify-between">
                ${UI.badge(emp.estado, emp.estado === 'Activo' ? 'green' : emp.estado === 'Vacaciones' ? 'blue' : 'gray')}
                <div class="flex gap-1">
                  ${UI.iconBtn(svgIcons.eye, `RRHH.verEmpleado('${emp.id}')`, 'Ver', 'brand')}
                  ${UI.iconBtn(svgIcons.edit, `RRHH.editarEmpleado('${emp.id}')`, 'Editar', 'gray')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterEmpleados(area) {
    const cards = document.querySelectorAll('#emp-grid > div');
    cards.forEach(card => {
      card.style.display = (area === 'all' || card.dataset.area === area) ? '' : 'none';
    });
  },

  searchEmpleado(query) {
    const q = query.toLowerCase();
    const cards = document.querySelectorAll('#emp-grid > div');
    cards.forEach(card => { card.style.display = card.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  renderAsistencia() {
    const fechas = ['2026-03-16', '2026-03-17', '2026-03-18', '2026-03-19'];
    const diasLabel = ['Lun 16', 'Mar 17', 'Mié 18', 'Jue 19'];
    const emps = AppData.empleados.filter(e => AppData.asistencias.some(a => a.emp_id === e.id));

    const getAsistencia = (empId, fecha) => {
      return AppData.asistencias.find(a => a.emp_id === empId && a.fecha === fecha);
    };

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Semana: 16 — 20 de Marzo, 2026</p>
            <p class="text-xs text-gray-400">Registro de marcaciones del personal</p>
          </div>
          <div class="flex flex-wrap gap-4 text-xs text-gray-500">
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span>Presente</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>Tardanza</span>
            <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>Falta</span>
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
          <p class="text-xs text-blue-700 dark:text-blue-400">Nota: Los datos de asistencia son de la semana actual (16-19 Mar 2026). El viernes 20 está pendiente de registro.</p>
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
          ${UI.button('Exportar Planilla', 'secondary', "App.showToast('Exportando planilla...','info')")}
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
    const html = `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-brand-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            ${emp.nombre.split(' ').slice(0,2).map(n => n[0]).join('')}
          </div>
          <div>
            <h3 class="font-bold text-gray-800 dark:text-white text-lg">${emp.nombre}</h3>
            <p class="text-brand-600 dark:text-brand-400 font-medium">${emp.cargo}</p>
            ${UI.badge(emp.estado, emp.estado === 'Activo' ? 'green' : 'blue')}
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">DNI</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.dni}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Área</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.area}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Email</p><p class="font-semibold text-gray-800 dark:text-gray-200 text-xs">${emp.email}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Teléfono</p><p class="font-semibold text-gray-800 dark:text-gray-200">${emp.telefono}</p></div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl"><p class="text-xs text-gray-400">Fecha Ingreso</p><p class="font-semibold text-gray-800 dark:text-gray-200">${App.formatDate(emp.ingreso)}</p></div>
          <div class="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl"><p class="text-xs text-green-600">Sueldo Base</p><p class="font-bold text-green-700 dark:text-green-300">${App.formatCurrency(emp.sueldo)}</p></div>
        </div>
      </div>
    `;
    App.showModal(html, null, 'Ficha del Empleado');
  },

  editarEmpleado(id) {
    const emp = AppData.getEmpleado(id);
    if (!emp.id) return;
    const areas = ['Gerencia','Administración','Producción','Ventas','Contabilidad','Logística'];
    App.showModal(`
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ee-nombre', 'text', 'Nombre Completo', emp.nombre, '', true)}
        ${UI.input('ee-cargo', 'text', 'Cargo', emp.cargo, '', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Departamento / Área</label>
          <select id="ee-area" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${areas.map(a => `<option value="${a}" ${a === emp.area ? 'selected' : ''}>${a}</option>`).join('')}
          </select>
        </div>
        ${UI.input('ee-sueldo', 'number', 'Sueldo Base (S/)', emp.sueldo, '', true)}
        ${UI.input('ee-ingreso', 'date', 'Fecha de Ingreso', emp.ingreso, '')}
        ${UI.input('ee-email', 'email', 'Email', emp.email, '')}
        ${UI.input('ee-telefono', 'text', 'Teléfono', emp.telefono, '')}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Estado</label>
          <select id="ee-estado" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Activo','Vacaciones','Licencia','Inactivo'].map(s => `<option value="${s}" ${s === emp.estado ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
    `, () => {
      const idx = AppData.empleados.findIndex(e => e.id === id);
      if (idx !== -1) {
        const nombre = document.getElementById('ee-nombre').value.trim();
        if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
        AppData.empleados[idx].nombre = nombre;
        AppData.empleados[idx].cargo = document.getElementById('ee-cargo').value;
        AppData.empleados[idx].area = document.getElementById('ee-area').value;
        AppData.empleados[idx].sueldo = parseFloat(document.getElementById('ee-sueldo').value) || emp.sueldo;
        AppData.empleados[idx].ingreso = document.getElementById('ee-ingreso').value || emp.ingreso;
        AppData.empleados[idx].email = document.getElementById('ee-email').value;
        AppData.empleados[idx].telefono = document.getElementById('ee-telefono').value;
        AppData.empleados[idx].estado = document.getElementById('ee-estado').value;
        App.showToast('Empleado actualizado correctamente', 'success');
        RRHH.render();
      }
    }, `Editar: ${emp.nombre}`);
  },

  showNuevoEmpleado() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ne-nombre', 'text', 'Nombre Completo', '', '', true)}
        ${UI.input('ne-dni', 'text', 'DNI', '', '8 dígitos', true)}
        ${UI.input('ne-cargo', 'text', 'Cargo', '', '', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Área</label>
          <select id="ne-area" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Gerencia','Administración','Producción','Ventas','Contabilidad','Logística'].map(a => `<option>${a}</option>`).join('')}
          </select>
        </div>
        ${UI.input('ne-email', 'email', 'Email corporativo', '', 'nombre@citemadera.pe')}
        ${UI.input('ne-telefono', 'text', 'Teléfono', '', '9XXXXXXXX')}
        ${UI.input('ne-sueldo', 'number', 'Sueldo Base (S/)', '', '', true)}
        ${UI.input('ne-ingreso', 'date', 'Fecha de Ingreso', new Date().toISOString().split('T')[0], '')}
      </div>
    `;
    App.showModal(html, () => {
      const nombre = document.getElementById('ne-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
      const nuevo = {
        id: 'EMP-' + String(AppData.empleados.length + 1).padStart(3, '0'),
        nombre,
        dni: document.getElementById('ne-dni').value,
        cargo: document.getElementById('ne-cargo').value,
        area: document.getElementById('ne-area').value,
        sueldo: parseFloat(document.getElementById('ne-sueldo').value) || 0,
        ingreso: document.getElementById('ne-ingreso').value,
        estado: 'Activo',
        email: document.getElementById('ne-email').value,
        telefono: document.getElementById('ne-telefono').value,
      };
      AppData.empleados.push(nuevo);
      App.showToast(`Empleado "${nombre}" registrado`, 'success');
      RRHH.render();
    }, 'Nuevo Empleado');
  },
};
