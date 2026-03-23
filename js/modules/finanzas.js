// ============================================================
// FINANZAS.JS - Finance Module
// ============================================================

const Finanzas = {
  activeTab: 'flujo',

  render() {
    const content = document.getElementById('main-content');
    const rf = AppData.resumen_finanzas;

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Finanzas', 'Flujo de caja, cuentas por cobrar y por pagar')}

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl p-5 text-white shadow-lg shadow-brand-200 dark:shadow-none">
            <p class="text-brand-200 text-xs font-semibold uppercase tracking-wider">Saldo Disponible</p>
            <p class="text-2xl sm:text-3xl font-bold mt-2">${App.formatCurrency(rf.saldo_disponible)}</p>
            <p class="text-brand-200 text-xs mt-2">Efectivo + Bancos</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Por Cobrar</p>
            <p class="text-xl sm:text-2xl font-bold text-green-600 mt-2">${App.formatCurrency(rf.total_cobrar)}</p>
            <p class="text-xs text-gray-400 mt-1">${AppData.cuentas_cobrar.length} facturas pendientes</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Por Pagar</p>
            <p class="text-xl sm:text-2xl font-bold text-red-500 mt-2">${App.formatCurrency(rf.total_pagar)}</p>
            <p class="text-xs text-gray-400 mt-1">${AppData.cuentas_pagar.length} compromisos</p>
          </div>
          <div class="bg-white dark:bg-night-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-night-700">
            <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Saldo Neto</p>
            <p class="text-xl sm:text-2xl font-bold text-brand-600 dark:text-brand-400 mt-2">${App.formatCurrency(rf.saldo_disponible + rf.total_cobrar - rf.total_pagar)}</p>
            <p class="text-xs text-gray-400 mt-1">Proyectado incluyendo CxC y CxP</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-night-700">
            ${UI.tabs(
              [
                { id: 'flujo', label: 'Flujo de Caja' },
                { id: 'cxc', label: 'CxC — Por Cobrar' },
                { id: 'cxp', label: 'CxP — Por Pagar' },
              ],
              this.activeTab,
              'Finanzas.switchTab'
            )}
          </div>
          <div id="finanzas-tab-content" class="p-6">
            ${this.renderTab(this.activeTab)}
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    Finanzas.activeTab = tab;
    ['flujo', 'cxc', 'cxp'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) {
        btn.className = t === tab
          ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-200 dark:border-night-600'
          : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent';
      }
    });
    const tc = document.getElementById('finanzas-tab-content');
    if (tc) tc.innerHTML = Finanzas.renderTab(tab);
  },

  renderTab(tab) {
    switch (tab) {
      case 'flujo': return this.renderFlujo();
      case 'cxc': return this.renderCxC();
      case 'cxp': return this.renderCxP();
      default: return '';
    }
  },

  renderFlujo() {
    const flujo = AppData.flujo_caja;
    const totalIngresos = flujo.reduce((s, f) => s + f.ingresos, 0);
    const totalEgresos = flujo.reduce((s, f) => s + f.egresos, 0);
    const totalSaldo = totalIngresos - totalEgresos;

    return `
      <div class="space-y-6">
        <!-- Chart -->
        <div>
          <canvas id="flujoCajaChart" height="220"></canvas>
        </div>

        <!-- Summary Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl text-center">
            <p class="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Total Ingresos (6M)</p>
            <p class="text-xl font-bold text-green-700 dark:text-green-300">${App.formatCurrency(totalIngresos)}</p>
          </div>
          <div class="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl text-center">
            <p class="text-xs text-red-600 dark:text-red-400 font-semibold mb-1">Total Egresos (6M)</p>
            <p class="text-xl font-bold text-red-700 dark:text-red-300">${App.formatCurrency(totalEgresos)}</p>
          </div>
          <div class="p-4 bg-brand-50 dark:bg-brand-900/20 rounded-xl text-center">
            <p class="text-xs text-brand-600 dark:text-brand-400 font-semibold mb-1">Saldo Acumulado</p>
            <p class="text-xl font-bold text-brand-700 dark:text-brand-300">${App.formatCurrency(totalSaldo)}</p>
          </div>
        </div>

        <!-- Month Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Período</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Ingresos</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Egresos</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Flujo Neto</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Variación</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${flujo.map((f, i) => {
                const neto = f.ingresos - f.egresos;
                const prevNeto = i > 0 ? flujo[i-1].ingresos - flujo[i-1].egresos : neto;
                const cambio = ((neto - prevNeto) / prevNeto * 100).toFixed(1);
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors ${i === flujo.length - 1 ? 'bg-brand-50 dark:bg-brand-900/10' : ''}">
                    <td class="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">${f.mes}${i === flujo.length - 1 ? ' <span class="text-xs text-brand-600 dark:text-brand-400">(Actual)</span>' : ''}</td>
                    <td class="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">${App.formatCurrency(f.ingresos)}</td>
                    <td class="px-4 py-3 text-right text-red-500 font-medium">${App.formatCurrency(f.egresos)}</td>
                    <td class="px-4 py-3 text-right font-bold ${neto >= 0 ? 'text-brand-600' : 'text-red-600'}">${App.formatCurrency(neto)}</td>
                    <td class="px-4 py-3">
                      ${i === 0 ? '-' : `<span class="text-xs font-semibold ${parseFloat(cambio) >= 0 ? 'text-green-600' : 'text-red-500'}">${parseFloat(cambio) >= 0 ? '↑' : '↓'} ${Math.abs(cambio)}%</span>`}
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    // Render chart after DOM
    setTimeout(() => Finanzas.renderFlujoChart(), 50);
  },

  renderFlujoChart() {
    const isDark = document.documentElement.classList.contains('dark');
    const gridColor = isDark ? 'rgba(148,163,184,0.1)' : 'rgba(0,0,0,0.05)';
    const labelColor = isDark ? '#94a3b8' : '#6b7280';
    const flujo = AppData.flujo_caja;

    App.destroyChart('flujoCajaChart');
    const ctx = document.getElementById('flujoCajaChart');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: flujo.map(f => f.mes),
        datasets: [
          {
            label: 'Ingresos',
            data: flujo.map(f => f.ingresos),
            backgroundColor: 'rgba(34,197,94,0.7)',
            borderRadius: 6,
            order: 2,
          },
          {
            label: 'Egresos',
            data: flujo.map(f => f.egresos),
            backgroundColor: 'rgba(239,68,68,0.6)',
            borderRadius: 6,
            order: 2,
          },
          {
            label: 'Flujo Neto',
            data: flujo.map(f => f.ingresos - f.egresos),
            type: 'line',
            borderColor: ThemeManager.hex('brand', 600),
            backgroundColor: ThemeManager.rgba('brand', 600, 0.1),
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: ThemeManager.hex('brand', 600),
            pointRadius: 5,
            order: 1,
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
          x: { grid: { color: gridColor }, ticks: { color: labelColor } },
          y: {
            grid: { color: gridColor },
            ticks: { color: labelColor, callback: v => 'S/' + (v / 1000) + 'k' },
          },
        },
      },
    });
  },

  renderCxC() {
    const cxc = AppData.cuentas_cobrar;
    const hoy = new Date('2026-03-20');
    const pendientes = cxc.filter(c => c.estado !== 'Cobrada');
    const total = pendientes.reduce((s, c) => s + c.monto, 0);
    const vencidas = pendientes.filter(c => c.estado === 'Vencida');
    const totalVencido = vencidas.reduce((s, c) => s + c.monto, 0);

    // Aging buckets
    const buckets = { vigente: 0, d1_30: 0, d31_60: 0, d60plus: 0 };
    pendientes.forEach(c => {
      const venc = new Date(c.fecha_venc);
      const diffDias = Math.floor((hoy - venc) / 86400000);
      if (diffDias <= 0) buckets.vigente += c.monto;
      else if (diffDias <= 30) buckets.d1_30 += c.monto;
      else if (diffDias <= 60) buckets.d31_60 += c.monto;
      else buckets.d60plus += c.monto;
    });

    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="p-3 bg-green-50 dark:bg-green-900/10 rounded-xl text-center">
            <p class="text-xs text-green-600 font-semibold mb-1">Total por Cobrar</p>
            <p class="text-xl font-bold text-green-700 dark:text-green-300">${App.formatCurrency(total)}</p>
          </div>
          <div class="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-center">
            <p class="text-xs text-red-600 font-semibold mb-1">Vencidas</p>
            <p class="text-xl font-bold text-red-700 dark:text-red-300">${App.formatCurrency(totalVencido)}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-center">
            <p class="text-xs text-gray-500 font-semibold mb-1">Documentos</p>
            <p class="text-xl font-bold text-gray-700 dark:text-gray-300">${pendientes.length}</p>
          </div>
        </div>

        <!-- Aging Analysis -->
        <div class="bg-gray-50 dark:bg-night-700/30 rounded-xl p-4">
          <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Antigüedad de Cuentas por Cobrar</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-white dark:bg-night-800 rounded-lg p-3 text-center border-l-4 border-green-500">
              <p class="text-xs text-green-600 dark:text-green-400 font-medium mb-1">Vigente</p>
              <p class="text-lg font-bold text-green-700 dark:text-green-300">${App.formatCurrency(buckets.vigente)}</p>
              <p class="text-xs text-gray-400">No vencida</p>
            </div>
            <div class="bg-white dark:bg-night-800 rounded-lg p-3 text-center border-l-4 border-yellow-500">
              <p class="text-xs text-yellow-600 dark:text-yellow-400 font-medium mb-1">1-30 días</p>
              <p class="text-lg font-bold text-yellow-700 dark:text-yellow-300">${App.formatCurrency(buckets.d1_30)}</p>
              <p class="text-xs text-gray-400">Vencida</p>
            </div>
            <div class="bg-white dark:bg-night-800 rounded-lg p-3 text-center border-l-4 border-orange-500">
              <p class="text-xs text-orange-600 dark:text-orange-400 font-medium mb-1">31-60 días</p>
              <p class="text-lg font-bold text-orange-700 dark:text-orange-300">${App.formatCurrency(buckets.d31_60)}</p>
              <p class="text-xs text-gray-400">Vencida</p>
            </div>
            <div class="bg-white dark:bg-night-800 rounded-lg p-3 text-center border-l-4 border-red-500">
              <p class="text-xs text-red-600 dark:text-red-400 font-medium mb-1">60+ días</p>
              <p class="text-lg font-bold text-red-700 dark:text-red-300">${App.formatCurrency(buckets.d60plus)}</p>
              <p class="text-xs text-gray-400">Vencida</p>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Cliente</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Factura</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Monto</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vencimiento</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Crédito</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${cxc.map(c => {
                const cli = AppData.getCliente(c.cliente_id);
                const isVenc = c.estado === 'Vencida';
                const isCobrada = c.estado === 'Cobrada';
                const badgeColor = isCobrada ? 'blue' : (isVenc ? 'red' : 'green');
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors ${isVenc ? 'bg-red-50 dark:bg-red-900/5' : ''} ${isCobrada ? 'opacity-60' : ''}">
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${cli.nombre || '-'}</p>
                      <p class="text-xs text-gray-400">${cli.telefono || ''}</p>
                    </td>
                    <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400">${c.factura_id || 'N/A'}</td>
                    <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(c.monto)}</td>
                    <td class="px-4 py-3 ${isVenc ? 'text-red-600 font-semibold' : 'text-gray-600 dark:text-gray-400'}">${App.formatDate(c.fecha_venc)}</td>
                    <td class="px-4 py-3 text-sm text-gray-500">${c.dias_credito} días</td>
                    <td class="px-4 py-3">${UI.badge(c.estado, badgeColor)}</td>
                    <td class="px-4 py-3">
                      ${isCobrada
                        ? '<span class="text-xs text-gray-400">Cobrada</span>'
                        : (isVenc
                          ? `<div class="flex gap-1"><button onclick="Finanzas.gestionarCobranza('${c.id}')" class="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors">Gestionar</button><button onclick="Finanzas.registrarCobro('${c.id}')" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Registrar Cobro</button></div>`
                          : `<button onclick="Finanzas.registrarCobro('${c.id}')" class="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Registrar Cobro</button>`)}
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

  renderCxP() {
    const cxp = AppData.cuentas_pagar;
    const hoy = new Date('2026-03-20');
    const pendientes = cxp.filter(c => c.estado !== 'Pagada');
    const total = pendientes.reduce((s, c) => s + c.monto, 0);
    const proximas = pendientes.filter(c => {
      const d = new Date(c.fecha_venc);
      return (d - hoy) / 86400000 <= 7;
    });
    const vencidas = pendientes.filter(c => new Date(c.fecha_venc) < hoy);

    return `
      <div class="space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div class="p-3 bg-red-50 dark:bg-red-900/10 rounded-xl text-center">
            <p class="text-xs text-red-600 font-semibold mb-1">Total por Pagar</p>
            <p class="text-xl font-bold text-red-700 dark:text-red-300">${App.formatCurrency(total)}</p>
          </div>
          <div class="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl text-center">
            <p class="text-xs text-yellow-600 font-semibold mb-1">Vencen en 7 días</p>
            <p class="text-xl font-bold text-yellow-700 dark:text-yellow-300">${proximas.length} docs.</p>
          </div>
          <div class="p-3 bg-orange-50 dark:bg-orange-900/10 rounded-xl text-center">
            <p class="text-xs text-orange-600 font-semibold mb-1">Vencidas</p>
            <p class="text-xl font-bold text-orange-700 dark:text-orange-300">${vencidas.length} docs.</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-center">
            <p class="text-xs text-gray-500 font-semibold mb-1">Proveedores</p>
            <p class="text-xl font-bold text-gray-700 dark:text-gray-300">${[...new Set(pendientes.map(c => c.proveedor_id))].length}</p>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Proveedor</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Referencia (OC)</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Monto</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vencimiento</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Días</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${cxp.map(c => {
                const prov = AppData.getProveedor(c.proveedor_id);
                const isPagada = c.estado === 'Pagada';
                const diasRestantes = Math.ceil((new Date(c.fecha_venc) - hoy) / 86400000);
                const isVencida = !isPagada && diasRestantes < 0;
                const urgent = !isPagada && diasRestantes >= 0 && diasRestantes <= 7;
                const displayEstado = isPagada ? 'Pagada' : (isVencida ? 'Vencida' : c.estado);
                const badgeColor = isPagada ? 'blue' : (isVencida ? 'red' : (urgent ? 'yellow' : 'green'));
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors ${isVencida ? 'bg-red-50 dark:bg-red-900/5' : ''} ${urgent ? 'bg-yellow-50 dark:bg-yellow-900/5' : ''} ${isPagada ? 'opacity-60' : ''}">
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${prov.nombre || '-'}</p>
                      <p class="text-xs text-gray-400">${prov.contacto || ''}</p>
                    </td>
                    <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400">${c.oc_id}</td>
                    <td class="px-4 py-3 text-right font-bold text-gray-800 dark:text-gray-200">${App.formatCurrency(c.monto)}</td>
                    <td class="px-4 py-3 ${isVencida ? 'text-red-600 font-semibold' : (urgent ? 'text-orange-600 font-semibold' : 'text-gray-600 dark:text-gray-400')}">${App.formatDate(c.fecha_venc)}</td>
                    <td class="px-4 py-3">
                      ${isPagada ? '<span class="text-xs text-gray-400">-</span>' : `<span class="text-xs font-semibold ${diasRestantes < 0 ? 'text-red-600' : diasRestantes <= 7 ? 'text-orange-600' : diasRestantes <= 15 ? 'text-yellow-600' : 'text-green-600'}">${diasRestantes < 0 ? Math.abs(diasRestantes) + 'd vencida' : diasRestantes + 'd'}</span>`}
                    </td>
                    <td class="px-4 py-3">${UI.badge(displayEstado, badgeColor)}</td>
                    <td class="px-4 py-3">
                      ${isPagada
                        ? '<span class="text-xs text-gray-400">Pagada</span>'
                        : `<button onclick="Finanzas.registrarPago('${c.id}')" class="px-2 py-1 text-xs font-medium bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400 rounded-lg hover:bg-brand-200 transition-colors">Registrar Pago</button>`}
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

  registrarCobro(id) {
    const cxc = AppData.cuentas_cobrar.find(c => c.id === id);
    if (!cxc || cxc.estado === 'Cobrada') return;
    const cli = AppData.getCliente(cxc.cliente_id);
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Registrar Cobro</h3><p class="text-gray-500 mb-1">Cliente: ${cli.nombre || '-'}</p><p class="text-xl font-bold text-green-600">${App.formatCurrency(cxc.monto)}</p></div>`,
      () => {
        cxc.estado = 'Cobrada';
        cxc.monto_pagado = cxc.monto;
        const fac = AppData.facturas.find(f => f.id === cxc.factura_id);
        if (fac) fac.estado = 'Cobrada';
        AppData.resumen_finanzas.saldo_disponible += cxc.monto;
        AppData.resumen_finanzas.total_cobrar -= cxc.monto;
        // Update flujo_caja - add real income for current month
        const mesActual = AppData.flujo_caja[AppData.flujo_caja.length - 1];
        if (mesActual) {
          mesActual.ingresos += cxc.monto;
          mesActual.saldo = mesActual.ingresos - mesActual.egresos;
        }
        AppData.logActividad('cobro', 'Cobro registrado: ' + App.formatCurrency(cxc.monto) + ' — ' + (cli.nombre || ''), 'finanzas');
        App.showToast(`Cobro registrado: ${App.formatCurrency(cxc.monto)} de ${cli.nombre || 'cliente'}`, 'success');
        Finanzas.render();
      }
    );
  },

  registrarPago(id) {
    const cxp = AppData.cuentas_pagar.find(c => c.id === id);
    if (!cxp || cxp.estado === 'Pagada') return;
    const prov = AppData.getProveedor(cxp.proveedor_id);
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-brand-100 dark:bg-brand-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Registrar Pago</h3><p class="text-gray-500 mb-1">Proveedor: ${prov.nombre || '-'}</p><p class="text-xl font-bold text-brand-600">${App.formatCurrency(cxp.monto)}</p></div>`,
      () => {
        cxp.estado = 'Pagada';
        AppData.resumen_finanzas.saldo_disponible -= cxp.monto;
        AppData.resumen_finanzas.total_pagar -= cxp.monto;
        // Update flujo_caja - register payment for current month
        const mesActual = AppData.flujo_caja[AppData.flujo_caja.length - 1];
        if (mesActual) {
          mesActual.egresos += cxp.monto;
          mesActual.saldo = mesActual.ingresos - mesActual.egresos;
        }
        AppData.logActividad('pago', 'Pago registrado: ' + App.formatCurrency(cxp.monto) + ' — ' + (prov.nombre || ''), 'finanzas');
        App.showToast(`Pago registrado: ${App.formatCurrency(cxp.monto)} a ${prov.nombre || 'proveedor'}`, 'success');
        Finanzas.render();
      }
    );
  },

  gestionarCobranza(id) {
    const cxc = AppData.cuentas_cobrar.find(c => c.id === id);
    const cli = AppData.getCliente(cxc?.cliente_id);
    App.showModal(`
      <div class="space-y-4">
        <div class="p-4 bg-red-50 dark:bg-red-900/10 rounded-xl">
          <p class="font-semibold text-red-700 dark:text-red-400">Cuenta VENCIDA</p>
          <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">Cliente: ${cli.nombre}</p>
          <p class="text-xl sm:text-2xl font-bold text-red-600 mt-1">${App.formatCurrency(cxc?.monto)}</p>
        </div>
        <div class="space-y-2">
          <p class="text-sm font-semibold text-gray-700 dark:text-gray-300">Acciones de cobranza:</p>
          <button class="w-full text-left p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-night-700 transition-colors">Enviar recordatorio por email a ${cli.email}</button>
          <button class="w-full text-left p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-night-700 transition-colors">Llamar a ${cli.telefono}</button>
          <button class="w-full text-left p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-night-700 transition-colors">Generar carta de cobranza</button>
        </div>
      </div>
    `, null, 'Gestión de Cobranza');
  },
};
