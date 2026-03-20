// ============================================================
// COSTOS.JS - Costs Module
// ============================================================

const Costos = {
  render() {
    const content = document.getElementById('main-content');
    const rc = AppData.resumen_costos;
    const costos = AppData.costos_productos;

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Costos', 'Análisis de costos estándar vs real y márgenes')}

        <!-- KPI Semáforos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Ratio GO/CP</p>
                <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">${rc.ratio_go_cp}%</p>
                <p class="text-xs text-gray-400 mt-1">Gastos Operativos vs Costo Producción</p>
              </div>
              <div class="text-right">${UI.semaforo(rc.semaforo_go_cp)}</div>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-night-700 space-y-1">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">GO Total:</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(rc.go_total)}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">CP Total:</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(rc.cp_total)}</span>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Margen Bruto</p>
                <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">${rc.margen_bruto}%</p>
                <p class="text-xs text-gray-400 mt-1">Sobre ventas del período</p>
              </div>
              <div class="text-right">${UI.semaforo(rc.semaforo_margen)}</div>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-night-700">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs text-gray-500">Objetivo: 35%</span>
              </div>
              ${UI.progressBar(rc.margen_bruto, 50, rc.margen_bruto >= 35 ? 'green' : rc.margen_bruto >= 25 ? 'yellow' : 'red')}
            </div>
          </div>

          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <div class="flex items-start justify-between mb-3">
              <div>
                <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Costo por Empleado</p>
                <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">${App.formatCurrency(rc.costo_por_empleado)}</p>
                <p class="text-xs text-gray-400 mt-1">Costo laboral mensual promedio</p>
              </div>
              <div class="text-right">${UI.semaforo(rc.semaforo_costo_emp)}</div>
            </div>
            <div class="pt-3 border-t border-gray-100 dark:border-night-700 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Total planilla:</span>
                <span class="font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(rc.costo_por_empleado * AppData.empleados.length)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Charts Row -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Breakdown Chart -->
          <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
              <h3 class="font-semibold text-gray-900 dark:text-white">Estructura de Costos</h3>
              <p class="text-xs text-gray-400 mt-0.5">Distribución del costo total</p>
            </div>
            <div class="p-6">
              <canvas id="costBreakdownChart" height="220"></canvas>
              <div class="mt-4 space-y-2">
                ${[
                  { label: 'Materia Prima', pct: rc.breakdown.materia_prima, color: ThemeManager.hex('brand', 600) },
                  { label: 'Mano de Obra', pct: rc.breakdown.mano_obra, color: '#22c55e' },
                  { label: 'Gastos Indirectos', pct: rc.breakdown.gastos_ind, color: '#f59e0b' },
                ].map(item => `
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div class="w-2.5 h-2.5 rounded-full" style="background:${item.color}"></div>
                      <span class="text-xs text-gray-600 dark:text-gray-400">${item.label}</span>
                    </div>
                    <span class="text-xs font-bold text-gray-800 dark:text-gray-200">${item.pct}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Costo STD vs Real Chart -->
          <div class="lg:col-span-2 bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
            <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
              <h3 class="font-semibold text-gray-900 dark:text-white">Costo Estándar vs Real</h3>
              <p class="text-xs text-gray-400 mt-0.5">Comparación por producto</p>
            </div>
            <div class="p-6">
              <canvas id="costCompChart" height="200"></canvas>
            </div>
          </div>
        </div>

        <!-- Detail Table -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700 flex flex-wrap items-center justify-between gap-2">
            <h3 class="font-semibold text-gray-900 dark:text-white">Análisis de Costos por Producto</h3>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100 dark:border-night-700">
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Producto</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">C. Estándar</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">C. Real</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Desviación</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Mat. Prima</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Mano Obra</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">G. Indirectos</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Semáforo</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
                ${costos.map(c => {
                  const diff = c.costo_real - c.costo_std;
                  const diffPct = ((diff / c.costo_std) * 100).toFixed(1);
                  const semaforo = diff > c.costo_std * 0.05 ? 'rojo' : diff > 0 ? 'amarillo' : 'verde';
                  return `
                    <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                      <td class="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">${c.nombre}</td>
                      <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400">${App.formatCurrency(c.costo_std)}</td>
                      <td class="px-4 py-3 text-right font-semibold text-gray-800 dark:text-gray-200">${App.formatCurrency(c.costo_real)}</td>
                      <td class="px-4 py-3 text-right">
                        <span class="font-semibold ${diff > 0 ? 'text-red-500' : 'text-green-500'}">
                          ${diff > 0 ? '+' : ''}${App.formatCurrency(diff)} (${diffPct}%)
                        </span>
                      </td>
                      <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400">${App.formatCurrency(c.materia_prima)}</td>
                      <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400">${App.formatCurrency(c.mano_obra)}</td>
                      <td class="px-4 py-3 text-right text-gray-600 dark:text-gray-400">${App.formatCurrency(c.gastos_ind)}</td>
                      <td class="px-4 py-3">${UI.semaforo(semaforo)}</td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    Costos.renderCharts();
  },

  renderCharts() {
    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.05)';
    const labelColor = isDark ? '#94a3b8' : '#6b7280';
    const rc = AppData.resumen_costos;

    // Breakdown donut
    App.destroyChart('costBreakdownChart');
    const bCtx = document.getElementById('costBreakdownChart');
    if (bCtx) {
      new Chart(bCtx, {
        type: 'doughnut',
        data: {
          labels: ['Materia Prima', 'Mano de Obra', 'Gastos Indirectos'],
          datasets: [{
            data: [rc.breakdown.materia_prima, rc.breakdown.mano_obra, rc.breakdown.gastos_ind],
            backgroundColor: [ThemeManager.hex('brand', 600), '#22c55e', '#f59e0b'],
            borderWidth: 0,
            hoverOffset: 4,
          }],
        },
        options: {
          responsive: true,
          cutout: '68%',
          plugins: { legend: { display: false } },
        },
      });
    }

    // Costo std vs real bar chart
    App.destroyChart('costCompChart');
    const cCtx = document.getElementById('costCompChart');
    if (cCtx) {
      const costos = AppData.costos_productos;
      new Chart(cCtx, {
        type: 'bar',
        data: {
          labels: costos.map(c => c.nombre.length > 18 ? c.nombre.substring(0, 18) + '…' : c.nombre),
          datasets: [
            {
              label: 'Costo Estándar',
              data: costos.map(c => c.costo_std),
              backgroundColor: ThemeManager.rgba('brand', 600, 0.7),
              borderRadius: 6,
            },
            {
              label: 'Costo Real',
              data: costos.map(c => c.costo_real),
              backgroundColor: 'rgba(239,68,68,0.6)',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top', labels: { color: labelColor, font: { size: 11 } } },
            tooltip: { callbacks: { label: ctx => ` ${ctx.dataset.label}: ${App.formatCurrency(ctx.raw)}` } },
          },
          scales: {
            x: { grid: { color: gridColor }, ticks: { color: labelColor, font: { size: 10 } } },
            y: {
              grid: { color: gridColor },
              ticks: { color: labelColor, font: { size: 11 }, callback: v => 'S/' + (v >= 1000 ? (v / 1000).toFixed(1) + 'k' : v) },
            },
          },
        },
      });
    }
  },
};
