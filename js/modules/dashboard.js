// ============================================================
// DASHBOARD.JS - Dashboard Module — Inspired by Maham/Shoplytic/Sales Dashboard
// Clean widgets, greeting, counter cards, progress indicators
// ============================================================

const Dashboard = {
  render() {
    const content = document.getElementById('main-content');
    const kpis = AppData.getKPIs();
    const pctVentas = (((kpis.ventas_mes - kpis.ventas_mes_anterior) / kpis.ventas_mes_anterior) * 100).toFixed(1);
    const userName = App.state.user ? App.state.user.nombre : 'Usuario';

    content.innerHTML = `
      <div class="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">

        <!-- Greeting + Actions (like Maham "Good Morning, Amirbaghian") -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          ${UI.greeting(userName, 'Aquí tienes un resumen de tu negocio y lo que necesita tu atención.')}
          <div class="flex items-center gap-2 flex-shrink-0">
            ${UI.button('+ Nueva Cotización', 'primary', "App.navigate('ventas')")}
            ${UI.button('Exportar', 'outline', 'Dashboard.exportCSV()', svgIcons.download)}
          </div>
        </div>

        <!-- KPI Cards Row (like Sales Dashboard: icon + title / big value / badge change) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          ${UI.kpiCard('Ventas del Mes', App.formatCurrency(kpis.ventas_mes), pctVentas, svgIcons.currency, 'brand', 'Facturación acumulada')}
          ${UI.kpiCard('Cotizaciones', kpis.cotizaciones_activas + ' activas', '+2', svgIcons.document, 'blue', 'Efectividad ' + kpis.cotizaciones_efectividad + '%')}
          ${UI.kpiCard('Producción', kpis.ops_activas + ' en proceso', null, svgIcons.cog, 'purple', kpis.ops_completadas_mes + ' completadas este mes')}
          ${UI.kpiCard('Alertas Stock', kpis.alertas_stock + ' items', null, svgIcons.bell, 'yellow', 'Requieren atención')}
        </div>

        <!-- Widget Cards Row (like Maham "Progress status" / "Upcoming class") -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          ${UI.widgetCard('', 'Saldo en Caja', 'Ver finanzas', "App.navigate('finanzas')", `
            <div class="flex items-end justify-between mb-3">
              <p class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">${App.formatCurrency(kpis.saldo_caja)}</p>
            </div>
            <p class="text-xs text-gray-400 mb-3">Disponible hoy</p>
            ${UI.progressBar(kpis.saldo_caja, 200000, 'brand', false)}
          `)}
          ${UI.widgetCard('', 'Margen Bruto', 'Ver costos', "App.navigate('costos')", `
            <div class="flex items-end justify-between mb-3">
              <p class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">${kpis.margen_bruto}%</p>
              <span class="text-xs text-gray-400">Objetivo: 35%</span>
            </div>
            ${UI.progressBar(kpis.margen_bruto, 50, kpis.margen_bruto >= 30 ? 'green' : 'yellow', false)}
          `)}
          ${UI.widgetCard('', 'Órdenes de Producción', 'Ver producción', "App.navigate('produccion')", `
            <div class="flex items-end justify-between mb-3">
              <p class="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white">${kpis.ops_activas}</p>
              <span class="text-xs text-gray-400">${kpis.ops_completadas_mes} completadas</span>
            </div>
            ${UI.progressBar(kpis.ops_completadas_mes, kpis.ops_activas + kpis.ops_completadas_mes, 'teal', false)}
          `)}
        </div>

        <!-- Counter Cards (like Maham "4 Assignments" / "3 New Events") -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          ${UI.counterCard('', kpis.cotizaciones_activas, 'Cotizaciones Activas', "App.navigate('ventas')", 'bg-brand-50 dark:bg-brand-900/20')}
          ${UI.counterCard('', '5', 'OC Pendientes', "App.navigate('compras')", 'bg-orange-50 dark:bg-orange-900/20')}
          ${UI.counterCard('', App.formatCurrency(kpis.por_cobrar), 'Por Cobrar', "App.navigate('finanzas')", 'bg-green-50 dark:bg-green-900/20')}
          ${UI.counterCard('', kpis.alertas_stock.toString(), 'Alertas de Stock', "App.navigate('inventario')", 'bg-red-50 dark:bg-red-900/20')}
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Revenue Chart (clean card style like reference dashboards) -->
          <div class="lg:col-span-2 bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
            <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">Evolución de Ingresos</h3>
                <p class="text-xs text-gray-400 mt-1">Últimos 6 meses</p>
              </div>
              <div class="flex items-center gap-5 text-xs text-gray-500">
                <span class="flex items-center gap-2"><span class="w-3 h-1.5 rounded-full bg-brand-500 inline-block"></span>Ingresos</span>
                <span class="flex items-center gap-2"><span class="w-3 h-1.5 rounded-full bg-red-400 inline-block"></span>Egresos</span>
              </div>
            </div>
            <div class="p-6">
              <canvas id="revenueChart" height="200"></canvas>
            </div>
          </div>

          <!-- Donut Chart (clean minimal like Sales Overview) -->
          <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
            <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700">
              <h3 class="font-semibold text-gray-900 dark:text-white">Ventas por Línea</h3>
              <p class="text-xs text-gray-400 mt-1">Distribución — ${new Date().toLocaleDateString('es-PE', {month:'long', year:'numeric'})}</p>
            </div>
            <div class="p-6">
              <canvas id="salesDonut" height="200"></canvas>
              <div class="mt-5 space-y-2.5">
                ${[
                  { label: 'Mobiliario Oficina', pct: 38, color: ThemeManager.hex('brand', 600) },
                  { label: 'Dormitorios', pct: 25, color: '#22c55e' },
                  { label: 'Cocinas', pct: 20, color: '#f59e0b' },
                  { label: 'Otros', pct: 17, color: '#94a3b8' },
                ].map(item => `
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2.5">
                      <div class="w-3 h-3 rounded-md" style="background:${item.color}"></div>
                      <span class="text-sm text-gray-600 dark:text-gray-400">${item.label}</span>
                    </div>
                    <span class="text-sm font-bold text-gray-700 dark:text-gray-300">${item.pct}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Activity + Alerts side by side -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Activity Feed (like Rentabel "Latest Order" cards) -->
          <div class="lg:col-span-2 bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
            <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
              <h3 class="font-semibold text-gray-900 dark:text-white">Actividad Reciente</h3>
              <span class="text-xs font-medium text-gray-400">Hoy y ayer</span>
            </div>
            <div class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${AppData.actividad_reciente.map(act => {
                const typeColors = {
                  venta: 'bg-blue-50 dark:bg-blue-900/20',
                  produccion: 'bg-brand-50 dark:bg-brand-900/20',
                  stock: 'bg-yellow-50 dark:bg-yellow-900/20',
                  cobro: 'bg-green-50 dark:bg-green-900/20',
                  compra: 'bg-orange-50 dark:bg-orange-900/20',
                  rrhh: 'bg-red-50 dark:bg-red-900/20',
                };
                return `
                  <div class="px-6 py-4 flex items-center gap-4 hover:bg-gray-50/50 dark:hover:bg-night-700/20 transition-colors">
                    <div class="w-10 h-10 ${typeColors[act.tipo] || 'bg-gray-50'} rounded-xl flex items-center justify-center text-lg flex-shrink-0">${act.icon}</div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm text-gray-700 dark:text-gray-300 leading-snug">${act.descripcion}</p>
                      <p class="text-xs text-gray-400 mt-0.5">${act.tiempo}</p>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Alerts + Quick Actions -->
          <div class="space-y-5">
            <!-- Alerts -->
            <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
              <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
                <h3 class="font-semibold text-gray-900 dark:text-white">Alertas</h3>
                <span class="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg font-bold">${AppData.alertas.length}</span>
              </div>
              <div class="p-4 space-y-2.5 max-h-64 overflow-y-auto">
                ${AppData.alertas.map(a => {
                  const aColors = { danger: 'border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-900/10', warning: 'border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-900/10', info: 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/10' };
                  const icons = { danger: '<span class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>', warning: '<span class="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>', info: '<span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>' };
                  return `
                    <div class="p-3 rounded-xl border ${aColors[a.tipo] || aColors.info} cursor-pointer hover:opacity-80 transition-opacity" onclick="App.navigate('${a.modulo}')">
                      <p class="text-xs text-gray-700 dark:text-gray-300 leading-relaxed flex items-center gap-1.5">${icons[a.tipo]} ${a.mensaje}</p>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Quick Actions (like clean action buttons) -->
            <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 p-5">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h3>
              <div class="space-y-2.5">
                ${[
                  { label: 'Nueva Cotización', mod: 'ventas', bg: 'bg-brand-50 dark:bg-brand-900/20', text: 'text-brand-700 dark:text-brand-300' },
                  { label: 'Nueva OC', mod: 'compras', bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400' },
                  { label: 'Nueva OP', mod: 'produccion', bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400' },
                  { label: 'Ver Finanzas', mod: 'finanzas', bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400' },
                ].map(a => `
                  <button onclick="App.navigate('${a.mod}')" class="w-full flex items-center gap-3 p-3.5 rounded-xl ${a.bg} hover:opacity-80 transition-all group">
                    <span class="text-sm font-medium ${a.text}">${a.label}</span>
                    <svg class="w-4 h-4 ml-auto text-gray-300 dark:text-night-500 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Summary Cards Row (like Shoplytic clean info blocks) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 p-5">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Saldo Caja</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${App.formatCurrency(kpis.saldo_caja)}</p>
            <p class="text-xs text-gray-400 mt-1">Disponible hoy</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 p-5">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Por Cobrar</p>
            <p class="text-xl font-bold text-green-600 dark:text-green-400">${App.formatCurrency(kpis.por_cobrar)}</p>
            <p class="text-xs text-gray-400 mt-1">5 facturas pendientes</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 p-5">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Por Pagar</p>
            <p class="text-xl font-bold text-red-500 dark:text-red-400">${App.formatCurrency(kpis.por_pagar)}</p>
            <p class="text-xs text-gray-400 mt-1">5 OCs pendientes</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 p-5">
            <p class="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Margen Bruto</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">${kpis.margen_bruto}%</p>
            <p class="text-xs text-gray-400 mt-1">Objetivo: 35%</p>
          </div>
        </div>
      </div>
    `;

    Dashboard.renderCharts();
  },

  renderCharts() {
    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(148,163,184,0.08)' : 'rgba(0,0,0,0.04)';
    const labelColor = isDark ? '#94a3b8' : '#9ca3af';

    // Revenue chart
    App.destroyChart('revenueChart');
    const revCtx = document.getElementById('revenueChart');
    if (revCtx) {
      new Chart(revCtx, {
        type: 'line',
        data: {
          labels: AppData.flujo_caja.map(d => d.mes),
          datasets: [
            {
              label: 'Ingresos',
              data: AppData.flujo_caja.map(d => d.ingresos),
              borderColor: ThemeManager.hex('brand', 600),
              backgroundColor: ThemeManager.rgba('brand', 600, 0.06),
              borderWidth: 2.5,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: ThemeManager.hex('brand', 600),
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBorderWidth: 3,
              pointHoverBorderColor: '#fff',
            },
            {
              label: 'Egresos',
              data: AppData.flujo_caja.map(d => d.egresos),
              borderColor: '#f87171',
              backgroundColor: 'rgba(248,113,113,0.04)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: '#f87171',
              pointRadius: 0,
              pointHoverRadius: 6,
              pointHoverBorderWidth: 3,
              pointHoverBorderColor: '#fff',
            },
          ],
        },
        options: {
          responsive: true,
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? ThemeManager.hex('night', 900) : '#fff',
              titleColor: isDark ? '#fff' : '#111827',
              bodyColor: isDark ? '#d1d5db' : '#6b7280',
              borderColor: isDark ? ThemeManager.hex('night', 600) : '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 12,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: S/ ${ctx.raw.toLocaleString()}`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: labelColor, font: { size: 12, family: 'Strawford, Sora, Inter, sans-serif' } },
            },
            y: {
              grid: { color: gridColor, drawBorder: false },
              ticks: {
                color: labelColor,
                font: { size: 11, family: 'Strawford, Sora, Inter, sans-serif' },
                callback: v => 'S/' + (v / 1000) + 'k',
              },
              border: { display: false },
            },
          },
        },
      });
    }

    // Sales donut
    App.destroyChart('salesDonut');
    const donutCtx = document.getElementById('salesDonut');
    if (donutCtx) {
      new Chart(donutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Mobiliario Oficina', 'Dormitorios', 'Cocinas', 'Otros'],
          datasets: [{
            data: [38, 25, 20, 17],
            backgroundColor: [ThemeManager.hex('brand', 600), '#22c55e', '#f59e0b', '#d1d5db'],
            borderWidth: 0,
            hoverOffset: 6,
            spacing: 3,
          }],
        },
        options: {
          responsive: true,
          cutout: '75%',
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: isDark ? ThemeManager.hex('night', 900) : '#fff',
              titleColor: isDark ? '#fff' : '#111827',
              bodyColor: isDark ? '#d1d5db' : '#6b7280',
              borderColor: isDark ? ThemeManager.hex('night', 600) : '#e5e7eb',
              borderWidth: 1,
              padding: 12,
              cornerRadius: 12,
              callbacks: {
                label: ctx => ` ${ctx.label}: ${ctx.raw}%`,
              },
            },
          },
        },
      });
    }
  },

  exportCSV() {
    const kpis = AppData.getKPIs();
    const kpiData = [
      { label: 'Ventas del Mes', value: kpis.ventas_mes },
      { label: 'Cotizaciones Activas', value: kpis.cotizaciones_activas },
      { label: 'OPs en Proceso', value: kpis.ops_activas },
      { label: 'Alertas Stock', value: kpis.alertas_stock },
      { label: 'Saldo Caja', value: kpis.saldo_caja },
      { label: 'Margen Bruto (%)', value: kpis.margen_bruto },
      { label: 'Por Cobrar', value: kpis.por_cobrar },
      { label: 'Por Pagar', value: kpis.por_pagar },
    ];
    const csv = 'Indicador,Valor\n' + kpiData.map(k => k.label + ',' + k.value).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'dashboard-resumen.csv';
    a.click();
    App.showToast('CSV exportado correctamente', 'success');
  },
};

// SVG Icons — now defined globally in ui.js
