// ============================================================
// INVENTARIO.JS - Inventory Module
// ============================================================

const Inventario = {
  currentFilter: 'all',

  render() {
    const content = document.getElementById('main-content');
    const mats = AppData.materiales;
    const valorTotal = mats.reduce((s, m) => s + m.stock * m.precio_unit, 0);
    const stockBajo = mats.filter(m => m.estado === 'Stock Bajo' || m.estado === 'Agotado').length;
    const agotados = mats.filter(m => m.estado === 'Agotado').length;

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader(
          'Inventario',
          'Gestión de materiales y stock del taller',
          `${UI.button('+ Nuevo Material', 'primary', 'Inventario.showNuevoMaterial()')}`
        )}

        <!-- KPIs -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Total Items', mats.length + ' materiales', null, svgIcons.cog, 'brand', `${AppData.categorias.length} categorías`)}
          ${UI.kpiCard('Valor Inventario', App.formatCurrency(valorTotal), null, svgIcons.currency, 'green', 'Precio de costo')}
          ${UI.kpiCard('Stock Bajo / Agotado', stockBajo + ' items', null, svgIcons.bell, 'yellow', `${agotados} completamente agotados`)}
          ${UI.kpiCard('Rotación Promedio', '18 días', '+3', svgIcons.document, 'blue', 'Tiempo prom. de consumo')}
        </div>

        <!-- Filters + Table -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
            <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              <div class="inline-flex bg-gray-100 dark:bg-night-800 rounded-lg p-0.5 gap-0.5 flex-wrap">
                <button onclick="Inventario.filterBy('all')" id="filter-all" class="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap bg-white dark:bg-night-700 text-gray-900 dark:text-gray-100 shadow-sm transition-all">Todos</button>
                ${AppData.categorias.map(cat => `
                  <button onclick="Inventario.filterBy('${cat}')" id="filter-${cat}" class="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all">${cat}</button>
                `).join('')}
                <span class="w-px bg-gray-300 dark:bg-night-600 my-1"></span>
                <button onclick="Inventario.filterBy('bajo')" id="filter-bajo" class="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-yellow-700 dark:hover:text-yellow-400 transition-all"><span class="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block mr-1"></span>Stock Bajo</button>
                <button onclick="Inventario.filterBy('agotado')" id="filter-agotado" class="px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-red-700 dark:hover:text-red-400 transition-all"><span class="w-1.5 h-1.5 rounded-full bg-red-500 inline-block mr-1"></span>Agotado</button>
              </div>
              <div class="w-full sm:w-64">
                <div class="relative">
                  <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input type="text" id="inv-search" placeholder="Buscar material..." oninput="Inventario.doSearch(this.value)" class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 dark:focus:ring-brand-900/30 dark:focus:border-brand-500 transition-all"/>
                </div>
              </div>
            </div>
          </div>
          <div id="inv-table-container">
            ${Inventario.renderTable(mats)}
          </div>
        </div>
      </div>
    `;
  },

  renderTable(mats) {
    if (mats.length === 0) return UI.emptyState('No se encontraron materiales');

    const estadoBadge = (e) => {
      const map = {
        'OK': 'bg-green-500/10 text-green-600 dark:bg-green-500/15 dark:text-green-400',
        'Stock Bajo': 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400',
        'Agotado': 'bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400'
      };
      const label = e === 'OK' ? 'Disponible' : e;
      return `<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${map[e] || 'bg-gray-500/10 text-gray-600'}">${label}</span>`;
    };

    const stockBar = (stock, minStock) => {
      const ratio = minStock > 0 ? stock / minStock : (stock > 0 ? 2 : 0);
      const pct = Math.min(100, Math.round(ratio * 50));
      const color = stock === 0 ? 'bg-red-500' : ratio <= 1 ? 'bg-yellow-400' : 'bg-green-500';
      return `<div class="w-full bg-gray-100 dark:bg-night-700 rounded-full h-1.5 mt-1.5"><div class="${color} h-1.5 rounded-full transition-all duration-500" style="width:${pct}%"></div></div>`;
    };

    const rows = mats.map(m => {
      const isLow = m.stock <= m.min_stock && m.stock > 0;
      const isEmpty = m.stock === 0;
      return `
        <tr class="group hover:bg-gray-50/80 dark:hover:bg-night-700/30 transition-colors duration-100">
          <td class="px-4 py-3.5 w-10">
            <div class="flex items-center justify-center">
              <span class="w-4 h-4 rounded border border-gray-300 dark:border-night-600 bg-white dark:bg-night-700 block flex-shrink-0"></span>
            </div>
          </td>
          <td class="px-4 py-3.5">
            <div class="flex items-center gap-3">
              <div>
                <p class="text-sm font-semibold text-gray-900 dark:text-white leading-snug">${m.nombre}</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${m.categoria} &middot; ${m.codigo}</p>
              </div>
            </div>
          </td>
          <td class="px-4 py-3.5">
            <div class="w-28">
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold tabular-nums ${isEmpty ? 'text-red-600' : isLow ? 'text-yellow-600' : 'text-gray-800 dark:text-gray-200'}">${m.stock}</span>
                <span class="text-[11px] text-gray-400">${m.unidad}</span>
              </div>
              ${stockBar(m.stock, m.min_stock)}
            </div>
          </td>
          <td class="px-4 py-3.5">
            <span class="text-sm font-medium tabular-nums text-gray-700 dark:text-gray-300">${App.formatCurrency(m.precio_unit)}</span>
          </td>
          <td class="px-4 py-3.5">${estadoBadge(m.estado)}</td>
          <td class="px-4 py-3.5">
            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
              <button onclick="Inventario.verKardex('${m.id}')" class="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors whitespace-nowrap">Ver Kardex</button>
              <span class="text-gray-300 dark:text-night-600">|</span>
              <button onclick="Inventario.editarMaterial('${m.id}')" class="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">Editar</button>
              <span class="text-gray-300 dark:text-night-600">|</span>
              <button onclick="Inventario.ajusteStock('${m.id}')" class="text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors whitespace-nowrap">Ajuste</button>
            </div>
          </td>
        </tr>
      `;
    });

    return `
      <div class="overflow-x-auto">
        <table id="inv-table" class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 dark:border-night-700">
              <th class="px-4 py-3 w-10"></th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Material</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Precio Unit.</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${rows.join('')}
          </tbody>
        </table>
      </div>
    `;
  },

  filterBy(key) {
    this.currentFilter = key;
    // Reset all pill buttons to inactive state
    document.querySelectorAll('[id^="filter-"]').forEach(btn => {
      btn.className = 'px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all';
    });
    const activeBtn = document.getElementById('filter-' + key);
    if (activeBtn) activeBtn.className = 'px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap bg-white dark:bg-night-700 text-gray-900 dark:text-gray-100 shadow-sm transition-all';

    let filtered = AppData.materiales;
    if (key === 'bajo') {
      filtered = filtered.filter(m => m.estado === 'Stock Bajo');
    } else if (key === 'agotado') {
      filtered = filtered.filter(m => m.estado === 'Agotado');
    } else if (key !== 'all') {
      filtered = filtered.filter(m => m.categoria === key);
    }
    document.getElementById('inv-table-container').innerHTML = this.renderTable(filtered);
  },

  doSearch(query) {
    const q = query.toLowerCase();
    let filtered = AppData.materiales;
    if (this.currentFilter === 'bajo') {
      filtered = filtered.filter(m => m.estado === 'Stock Bajo');
    } else if (this.currentFilter === 'agotado') {
      filtered = filtered.filter(m => m.estado === 'Agotado');
    } else if (this.currentFilter !== 'all') {
      filtered = filtered.filter(m => m.categoria === this.currentFilter);
    }
    if (q) {
      filtered = filtered.filter(m => m.nombre.toLowerCase().includes(q) || m.codigo.toLowerCase().includes(q) || m.categoria.toLowerCase().includes(q));
    }
    document.getElementById('inv-table-container').innerHTML = this.renderTable(filtered);
  },

  verKardex(id) {
    const mat = AppData.getMaterial(id);
    const movs = AppData.kardex[id] || [];
    const html = `
      <div class="mb-4 flex items-start justify-between">
        <div>
          <p class="font-semibold text-gray-800 dark:text-white">${mat.nombre}</p>
          <p class="text-xs text-gray-400">${mat.codigo} — ${mat.categoria}</p>
        </div>
        <div class="text-right">
          <p class="text-xs text-gray-400">Stock actual</p>
          <p class="text-xl sm:text-2xl font-bold text-brand-600">${mat.stock} ${mat.unidad}</p>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead><tr class="border-b border-gray-100 dark:border-night-700">
            <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Fecha</th>
            <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Tipo</th>
            <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Cantidad</th>
            <th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Saldo</th>
            <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Referencia</th>
            <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Usuario</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
            ${movs.length === 0
              ? `<tr><td colspan="6" class="py-8 text-center text-gray-400">Sin movimientos registrados</td></tr>`
              : movs.map(m => `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20">
                  <td class="py-2 px-3 text-gray-600 dark:text-gray-400">${App.formatDate(m.fecha)}</td>
                  <td class="py-2 px-3">${UI.badge(m.tipo, m.tipo === 'Ingreso' ? 'green' : 'red')}</td>
                  <td class="py-2 px-3 text-right font-medium ${m.cantidad > 0 ? 'text-green-600' : 'text-red-500'}">${m.cantidad > 0 ? '+' : ''}${m.cantidad}</td>
                  <td class="py-2 px-3 text-right font-bold text-gray-800 dark:text-gray-200">${m.saldo}</td>
                  <td class="py-2 px-3 text-xs text-gray-500">${m.referencia}</td>
                  <td class="py-2 px-3 text-xs text-gray-500">${m.usuario}</td>
                </tr>
              `).join('')
            }
          </tbody>
        </table>
      </div>
    `;
    App.showModal(html, null, `Kardex — ${mat.nombre}`, true);
  },

  showNuevoMaterial() {
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('nm-codigo', 'text', 'Código', '', 'MAT-XXX', true)}
        ${UI.input('nm-nombre', 'text', 'Nombre del Material', '', 'Ej: MDF 15mm', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Categoría *</label>
          <select id="nm-categoria" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${AppData.categorias.map(c => `<option>${c}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Unidad *</label>
          <select id="nm-unidad" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${['Plancha','Unidad','Par','Kg','Litro','Metro','Ciento','Rollo'].map(u => `<option>${u}</option>`).join('')}
          </select>
        </div>
        ${UI.input('nm-stock', 'number', 'Stock Inicial', '0', '0')}
        ${UI.input('nm-min', 'number', 'Stock Mínimo', '', 'Ej: 10', true)}
        ${UI.input('nm-precio', 'number', 'Precio Unitario (S/)', '', '0.00', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Proveedor</label>
          <select id="nm-proveedor" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="">Seleccionar...</option>
            ${AppData.proveedores.map(p => `<option value="${p.id}">${p.nombre}</option>`).join('')}
          </select>
        </div>
        ${UI.input('nm-ubicacion', 'text', 'Ubicación', '', 'Ej: Almacén A-1')}
      </div>
    `;
    App.showModal(html, () => {
      const nombre = document.getElementById('nm-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido', 'error'); return; }
      const nuevoMat = {
        id: 'MAT-' + String(AppData.materiales.length + 1).padStart(3, '0'),
        codigo: document.getElementById('nm-codigo').value || 'MAT-NEW',
        nombre,
        categoria: document.getElementById('nm-categoria').value,
        stock: parseInt(document.getElementById('nm-stock').value) || 0,
        min_stock: parseInt(document.getElementById('nm-min').value) || 0,
        unidad: document.getElementById('nm-unidad').value,
        precio_unit: parseFloat(document.getElementById('nm-precio').value) || 0,
        proveedor_id: document.getElementById('nm-proveedor').value,
        ubicacion: document.getElementById('nm-ubicacion').value || 'Sin asignar',
        estado: 'OK',
      };
      AppData.materiales.push(nuevoMat);
      App.showToast(`Material "${nombre}" creado exitosamente`, 'success');
      Inventario.render();
    }, 'Nuevo Material');
  },

  editarMaterial(id) {
    const m = AppData.getMaterial(id);
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('em-nombre', 'text', 'Nombre', m.nombre, '', true)}
        ${UI.input('em-stock', 'number', 'Stock Actual', m.stock, '')}
        ${UI.input('em-min', 'number', 'Stock Mínimo', m.min_stock, '')}
        ${UI.input('em-precio', 'number', 'Precio Unitario', m.precio_unit, '')}
        ${UI.input('em-ubicacion', 'text', 'Ubicación', m.ubicacion, '')}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Categoría</label>
          <select id="em-categoria" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            ${AppData.categorias.map(c => `<option ${c === m.categoria ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
    App.showModal(html, () => {
      const idx = AppData.materiales.findIndex(x => x.id === id);
      if (idx !== -1) {
        AppData.materiales[idx].nombre = document.getElementById('em-nombre').value;
        AppData.materiales[idx].stock = parseInt(document.getElementById('em-stock').value) || 0;
        AppData.materiales[idx].min_stock = parseInt(document.getElementById('em-min').value) || 0;
        AppData.materiales[idx].precio_unit = parseFloat(document.getElementById('em-precio').value) || 0;
        AppData.materiales[idx].ubicacion = document.getElementById('em-ubicacion').value;
        AppData.materiales[idx].categoria = document.getElementById('em-categoria').value;
        // Recalculate status
        const s = AppData.materiales[idx];
        s.estado = s.stock === 0 ? 'Agotado' : s.stock < s.min_stock ? 'Stock Bajo' : 'OK';
        App.showToast('Material actualizado correctamente', 'success');
        Inventario.render();
      }
    }, `Editar: ${m.nombre}`);
  },

  ajusteStock(id) {
    const m = AppData.getMaterial(id);
    const html = `
      <div class="space-y-4">
        <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
          <p class="text-sm font-medium text-gray-700 dark:text-gray-200">${m.nombre}</p>
          <p class="text-xs text-gray-400">Stock actual: <strong>${m.stock} ${m.unidad}</strong></p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Tipo de Ajuste</label>
          <select id="aj-tipo" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
            <option value="ingreso">Ingreso (+)</option>
            <option value="egreso">Egreso (-)</option>
            <option value="ajuste">Ajuste (fijar cantidad exacta)</option>
          </select>
        </div>
        ${UI.input('aj-cantidad', 'number', 'Cantidad', '', '0', true)}
        ${UI.textarea('aj-motivo', 'Motivo del ajuste', '', 'Ej: Inventario físico, merma, etc.')}
      </div>
    `;
    App.showModal(html, () => {
      const tipo = document.getElementById('aj-tipo').value;
      const cantidad = parseInt(document.getElementById('aj-cantidad').value) || 0;
      const idx = AppData.materiales.findIndex(x => x.id === id);
      if (idx !== -1 && cantidad > 0) {
        const mat = AppData.materiales[idx];
        if (tipo === 'ingreso') mat.stock += cantidad;
        else if (tipo === 'egreso') mat.stock = Math.max(0, mat.stock - cantidad);
        else mat.stock = cantidad;
        mat.estado = mat.stock === 0 ? 'Agotado' : mat.stock < mat.min_stock ? 'Stock Bajo' : 'OK';
        App.showToast(`Ajuste de stock realizado: ${mat.nombre}`, 'success');
        Inventario.render();
      }
    }, 'Ajuste de Stock');
  },
};
