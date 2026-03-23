// ============================================================
// INVENTARIO.JS - Inventory Module (v2)
// Design: UI.combobox, wide modals, 3-dot action menu,
//         sedes/almacenes master, inline create proveedor
// ============================================================

const Inventario = {
  currentFilter: 'all',

  // ── SVG Barcode renderer ──
  _renderBarcodeSVG(code, width = 180, height = 50) {
    if (!code) return '';
    let bars = '', x = 10;
    code.split('').forEach((ch, i) => {
      const c = ch.charCodeAt(0);
      const w1 = (c % 3) + 1, w2 = ((c + i) % 2) + 1;
      bars += `<rect x="${x}" y="4" width="${w1}" height="${height - 12}" fill="currentColor"/>`;
      x += w1 + w2;
      const w3 = ((c * 3 + i) % 3) + 1;
      bars += `<rect x="${x}" y="4" width="${w3}" height="${height - 12}" fill="currentColor"/>`;
      x += w3 + 1;
    });
    const tw = Math.max(x + 10, width);
    return `<svg viewBox="0 0 ${tw} ${height}" width="${width}" height="${height}" class="text-gray-800 dark:text-gray-200">${bars}<text x="${tw/2}" y="${height-1}" text-anchor="middle" font-size="10" font-family="monospace" fill="currentColor">${code}</text></svg>`;
  },

  // ── Pending image ──
  _pendingImage: '',

  // ── Image uploader (drag & drop + click) ──
  _imageUploader(existingImg = '', previewId = 'img-preview') {
    return `
      <div class="sm:col-span-3">
        <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Imagen del Material</label>
        <div id="img-dropzone" class="relative border-2 border-dashed border-gray-200 dark:border-night-600 rounded-xl p-4 text-center cursor-pointer hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all"
          onclick="document.getElementById('img-file-input').click()">
          <input type="file" id="img-file-input" accept="image/*" class="hidden" onchange="Inventario._handleImageUpload(this,'${previewId}')"/>
          <div id="${previewId}" class="flex flex-col items-center gap-2">
            ${existingImg
              ? `<img src="${existingImg}" class="w-20 h-20 rounded-xl object-cover bg-gray-100 dark:bg-night-700"/>
                 <p class="text-xs text-gray-500 dark:text-gray-400">Imagen actual — clic o arrastra para cambiar</p>`
              : `<div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-night-700 flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <p class="text-sm font-medium text-gray-600 dark:text-gray-300">Clic para seleccionar imagen</p>
                <p class="text-xs text-gray-400">o arrastra un archivo aqui &middot; JPG, PNG, WebP (max 5 MB)</p>`}
          </div>
          ${existingImg ? `<button type="button" onclick="event.stopPropagation();Inventario._removeImage('${previewId}')" class="absolute top-2 right-2 p-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" title="Quitar imagen"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>` : ''}
        </div>
      </div>`;
  },

  _handleImageUpload(input, previewId) {
    const file = input.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { App.showToast('Solo se permiten archivos de imagen','error'); return; }
    if (file.size > 5*1024*1024) { App.showToast('La imagen no debe superar 5 MB','error'); return; }
    const reader = new FileReader();
    reader.onload = e => {
      Inventario._pendingImage = e.target.result;
      const preview = document.getElementById(previewId);
      if (preview) preview.innerHTML = `<img src="${e.target.result}" class="w-20 h-20 rounded-xl object-cover bg-gray-100 dark:bg-night-700"/><p class="text-xs text-green-600 dark:text-green-400 font-medium">${file.name} (${(file.size/1024).toFixed(0)} KB)</p><p class="text-xs text-gray-400">Clic o arrastra para cambiar</p>`;
      const dz = document.getElementById('img-dropzone');
      if (dz && !dz.querySelector('.img-remove-btn')) dz.insertAdjacentHTML('beforeend',`<button type="button" class="img-remove-btn absolute top-2 right-2 p-1 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors" onclick="event.stopPropagation();Inventario._removeImage('${previewId}')" title="Quitar"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>`);
    };
    reader.readAsDataURL(file);
  },

  _removeImage(previewId) {
    Inventario._pendingImage = '__removed__';
    const preview = document.getElementById(previewId);
    if (preview) preview.innerHTML = `<div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-night-700 flex items-center justify-center"><svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div><p class="text-sm font-medium text-gray-600 dark:text-gray-300">Clic para seleccionar imagen</p>`;
    const dz = document.getElementById('img-dropzone');
    if (dz) { const rm = dz.querySelector('.img-remove-btn'); if (rm) rm.remove(); }
    const fi = document.getElementById('img-file-input'); if (fi) fi.value = '';
  },

  _initDropzone() {
    const dz = document.getElementById('img-dropzone');
    if (!dz) return;
    ['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.add('border-brand-400','bg-brand-50/40'); }));
    ['dragleave','drop'].forEach(ev => dz.addEventListener(ev, e => { e.preventDefault(); dz.classList.remove('border-brand-400','bg-brand-50/40'); }));
    dz.addEventListener('drop', e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) { const inp = document.getElementById('img-file-input'); const dt = new DataTransfer(); dt.items.add(f); inp.files = dt.files; inp.dispatchEvent(new Event('change')); }});
  },

  // ── Thumbnail helper ──
  _materialThumb(m, size = 'sm') {
    const s = {sm:'w-10 h-10',md:'w-16 h-16',lg:'w-32 h-32'}[size]||'w-10 h-10';
    if (m.imagen) return `<img src="${m.imagen}" alt="${m.nombre}" class="${s} rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-night-700" onerror="this.outerHTML=Inventario._thumbPlaceholder('${s}','${m.nombre[0]}')"/>`;
    return this._thumbPlaceholder(s, m.nombre[0]);
  },
  _thumbPlaceholder(s, letter) {
    return `<div class="${s} rounded-lg bg-gray-100 dark:bg-night-700 flex items-center justify-center flex-shrink-0"><span class="text-gray-400 dark:text-gray-500 font-bold text-sm">${letter}</span></div>`;
  },

  // ══════════════════════════════════════════════════════════
  // RENDER — uses UI.dataTable (Design System)
  // ══════════════════════════════════════════════════════════
  render() {
    const content = document.getElementById('main-content');
    const mats = AppData.materiales;
    const valorTotal = mats.reduce((s,m) => s + m.stock * m.precio_unit, 0);
    const stockBajo = mats.filter(m => m.estado==='Stock Bajo'||m.estado==='Agotado').length;
    const agotados = mats.filter(m => m.estado==='Agotado').length;

    // Build dataTable-compatible rows
    const tableData = mats.map(m => {
      const isLow = m.stock <= m.min_stock && m.stock > 0;
      const isEmpty = m.stock === 0;
      return {
        _id: m.id,
        material: m.nombre,
        material_sub: m.categoria + ' · ' + m.codigo,
        _thumb: m.imagen,
        _thumbLetter: m.nombre[0],
        stock: m.stock,
        _stockDisplay: m.stock,
        _unidad: m.unidad,
        _minStock: m.min_stock,
        _isEmpty: isEmpty,
        _isLow: isLow,
        precio: m.precio_unit,
        estado: m.estado === 'OK' ? 'Disponible' : m.estado,
        estado_color: m.estado === 'OK' ? 'green' : m.estado === 'Stock Bajo' ? 'yellow' : 'red',
        barcode: m.barcode || '',
        categoria: m.categoria,
        _actions: [],
      };
    });

    // Custom render functions
    const renderMaterial = function(val, row) {
      const thumb = row._thumb
        ? '<img src="'+row._thumb+'" class="w-9 h-9 rounded-lg object-cover flex-shrink-0 bg-gray-100 dark:bg-night-700" onerror="this.outerHTML=\'<div class=\\\'w-9 h-9 rounded-lg bg-gray-100 dark:bg-night-700 flex items-center justify-center flex-shrink-0\\\'><span class=\\\'text-gray-400 font-bold text-xs\\\'>' + row._thumbLetter + '</span></div>\'"/>'
        : '<div class="w-9 h-9 rounded-lg bg-gray-100 dark:bg-night-700 flex items-center justify-center flex-shrink-0"><span class="text-gray-400 dark:text-gray-500 font-bold text-xs">' + row._thumbLetter + '</span></div>';
      return '<div class="flex items-center gap-3"><button onclick="Inventario.verDetalle(\''+row._id+'\')" class="flex-shrink-0 hover:opacity-80 transition-opacity">' + thumb + '</button><div class="min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate">' + val + '</p><p class="text-[11px] text-gray-400 mt-0.5">' + row.material_sub + '</p></div></div>';
    };

    const renderStock = function(val, row) {
      const ratio = row._minStock > 0 ? val / row._minStock : (val > 0 ? 2 : 0);
      const pct = Math.min(100, Math.round(ratio * 50));
      const barColor = val === 0 ? 'bg-red-500' : ratio <= 1 ? 'bg-yellow-400' : 'bg-green-500';
      const txtColor = row._isEmpty ? 'text-red-600' : row._isLow ? 'text-yellow-600' : 'text-gray-800 dark:text-gray-200';
      return '<div class="w-24"><div class="flex items-center gap-1.5"><span class="text-sm font-bold tabular-nums ' + txtColor + '">' + val + '</span><span class="text-[11px] text-gray-400">' + row._unidad + '</span></div><div class="w-full bg-gray-100 dark:bg-night-700 rounded-full h-1.5 mt-1"><div class="' + barColor + ' h-1.5 rounded-full transition-all" style="width:' + pct + '%"></div></div></div>';
    };

    const renderBarcode = function(val) {
      if (!val) return '<span class="text-gray-300">—</span>';
      return '<code class="text-[10px] font-mono text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-night-700 px-1.5 py-0.5 rounded">' + val + '</code>';
    };

    const renderAcciones = function(val, row) {
      return '<div class="flex items-center justify-end gap-0.5">' +
        '<div class="relative group/tip"><button onclick="Inventario.editarMaterial(\''+row._id+'\')" class="p-1.5 rounded-lg text-gray-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg></button><span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium bg-gray-900 text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity">Editar material</span></div>' +
        '<div class="relative group/tip"><button onclick="Inventario.ajusteStock(\''+row._id+'\')" class="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg></button><span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium bg-gray-900 text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity">Ajustar stock</span></div>' +
        '<div class="relative group/tip"><button onclick="Inventario._toggleRowMenu(event,\''+row._id+'\')" class="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-night-700 transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1.5" fill="currentColor"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="12" cy="19" r="1.5" fill="currentColor"/></svg></button><span class="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-1 text-[10px] font-medium bg-gray-900 text-white rounded-lg whitespace-nowrap opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity">Mas opciones</span></div>' +
      '</div>';
    };

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Inventario','Gestion de materiales y stock del taller',
          `${UI.button('+ Nuevo Material','primary','Inventario.showNuevoMaterial()')}`
        )}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${UI.kpiCard('Total Items', mats.length+' materiales', null, svgIcons.cog, 'brand', AppData.categorias.length+' categorias')}
          ${UI.kpiCard('Valor Inventario', App.formatCurrency(valorTotal), null, svgIcons.currency, 'green', 'Precio de costo')}
          ${UI.kpiCard('Stock Bajo / Agotado', stockBajo+' items', null, svgIcons.bell, 'yellow', agotados+' completamente agotados')}
          ${UI.kpiCard('Rotacion Promedio', '18 dias', '+3', svgIcons.document, 'blue', 'Tiempo prom. de consumo')}
        </div>
        ${UI.dataTable({
          id: 'dt-inventario',
          title: 'Materiales en Stock',
          subtitle: mats.length + ' materiales registrados · Valor total: ' + App.formatCurrency(valorTotal),
          columns: [
            {key:'material', label:'Material', sortable:true, render: renderMaterial, width:'280px'},
            {key:'stock', label:'Stock', sortable:true, render: renderStock, width:'130px'},
            {key:'precio', label:'Precio Unit.', sortable:true, type:'currency'},
            {key:'estado', label:'Estado', sortable:true, type:'badge'},
            {key:'barcode', label:'Cod. Barras', sortable:false, render: renderBarcode},
            {key:'_acciones', label:'Acciones', sortable:false, render: renderAcciones, width:'120px'},
          ],
          data: tableData,
          pageSize: 10,
          searchable: true,
          selectable: true,
          resizable: true,
          reorderable: true,
          filterTabs: [],
          advancedFilters: [
            {key:'categoria', label:'Categoria', options: AppData.categorias.map(c => ({value:c, label:c, count: mats.filter(m=>m.categoria===c).length}))},
            {key:'estado', label:'Estado', options: [
              {value:'Disponible', label:'Disponible', count: mats.filter(m=>m.estado==='OK').length},
              {value:'Stock Bajo', label:'Stock Bajo', count: mats.filter(m=>m.estado==='Stock Bajo').length},
              {value:'Agotado', label:'Agotado', count: mats.filter(m=>m.estado==='Agotado').length},
            ]},
            {key:'_unidad', label:'Unidad', options: [...new Set(mats.map(m=>m.unidad))].map(u => ({value:u, label:u, count: mats.filter(m=>m.unidad===u).length}))},
          ],
          bulkActions: [
            {label:'Ajuste masivo', onclick:"App.showToast('Funcion en desarrollo','info')", color:'brand'},
            {label:'Exportar', onclick:"App.showToast('Exportando...','info')"},
            {label:'Eliminar', onclick:"App.showToast('Seleccione materiales sin stock','warning')", color:'danger'},
          ],
          toolbar: UI.button('+ Nuevo Material','primary','Inventario.showNuevoMaterial()'),
          emptyMsg: 'No se encontraron materiales',
          gridRender: function(row) {
            var thumb = row._thumb
              ? '<img src="'+row._thumb+'" class="w-full h-36 object-cover rounded-t-xl bg-gray-100 dark:bg-night-700" onerror="this.style.display=\'none\'"/>'
              : '<div class="w-full h-36 rounded-t-xl bg-gray-100 dark:bg-night-700 flex items-center justify-center"><svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>';
            var estadoColors = {'Disponible':'green','Stock Bajo':'yellow','Agotado':'red'};
            return '<div class="bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer" onclick="Inventario.verDetalle(\''+row._id+'\')">' +
              thumb +
              '<div class="p-4 space-y-2">' +
                '<div class="flex items-start justify-between gap-2">' +
                  '<div class="min-w-0"><p class="text-sm font-semibold text-gray-900 dark:text-white truncate">'+row.material+'</p><p class="text-[11px] text-gray-400 mt-0.5">'+row.material_sub+'</p></div>' +
                  UI.badge(row.estado, estadoColors[row.estado]||'gray') +
                '</div>' +
                '<div class="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-night-700">' +
                  '<div><span class="text-xs text-gray-400">Stock</span><p class="text-sm font-bold '+(row._isEmpty?'text-red-600':row._isLow?'text-yellow-600':'text-gray-800 dark:text-gray-200')+'">'+row.stock+' <span class="font-normal text-gray-400">'+row._unidad+'</span></p></div>' +
                  '<div class="text-right"><span class="text-xs text-gray-400">Precio</span><p class="text-sm font-bold text-gray-800 dark:text-gray-200">'+App.formatCurrency(row.precio)+'</p></div>' +
                '</div>' +
                '<div class="flex gap-1 pt-1">' +
                  '<button onclick="event.stopPropagation();Inventario.editarMaterial(\''+row._id+'\')" class="flex-1 py-1.5 text-[11px] font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-lg hover:bg-brand-100 transition-colors">Editar</button>' +
                  '<button onclick="event.stopPropagation();Inventario.ajusteStock(\''+row._id+'\')" class="flex-1 py-1.5 text-[11px] font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 transition-colors">Ajuste</button>' +
                '</div>' +
              '</div>' +
            '</div>';
          },
        })}
      </div>`;
  },

  // ── Row context menu (fixed portal — never pushes layout) ──
  _toggleRowMenu(e, matId) {
    e.stopPropagation();
    Inventario._closeMenus();
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const menuW = 192, menuH = 220;
    const viewH = window.innerHeight;
    const openUp = (rect.bottom + menuH + 8) > viewH;
    const top = openUp ? (rect.top - menuH - 4) : (rect.bottom + 4);
    const left = Math.max(8, rect.right - menuW);

    const menu = document.createElement('div');
    menu.id = 'inv-ctx-menu';
    menu.className = 'fixed z-[999] w-48 bg-white dark:bg-night-800 rounded-xl shadow-xl border border-gray-100 dark:border-night-700 py-1';
    menu.style.cssText = `top:${top}px;left:${left}px;animation:fadeIn .12s ease`;
    menu.innerHTML = `
      <button onclick="Inventario._closeMenus();Inventario.verDetalle('${matId}')" class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors text-left">
        <svg class="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
        Ver detalle
      </button>
      <button onclick="Inventario._closeMenus();Inventario.verKardex('${matId}')" class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors text-left">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        Ver Kardex
      </button>
      <button onclick="Inventario._closeMenus();Inventario.editarMaterial('${matId}')" class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors text-left">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
        Editar
      </button>
      <button onclick="Inventario._closeMenus();Inventario.ajusteStock('${matId}')" class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors text-left">
        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        Ajuste de stock
      </button>
      <div class="my-1 border-t border-gray-100 dark:border-night-700"></div>
      <button onclick="Inventario._closeMenus();Inventario.eliminarMaterial('${matId}')" class="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
        Eliminar
      </button>`;
    document.body.appendChild(menu);
    setTimeout(() => document.addEventListener('click', Inventario._closeMenus, {once:true}), 0);
  },
  _closeMenus() {
    const m = document.getElementById('inv-ctx-menu');
    if (m) m.remove();
  },

  // ══════════════════════════════════════════════════════════
  // DETAIL MODAL
  // ══════════════════════════════════════════════════════════
  verDetalle(id) {
    const m = AppData.getMaterial(id);
    if (!m) return;
    const prov = m.proveedor_id ? AppData.proveedores.find(p => p.id === m.proveedor_id) : null;
    const estadoMap = {'OK':'green','Stock Bajo':'yellow','Agotado':'red'};
    const estadoLabel = m.estado === 'OK' ? 'Disponible' : m.estado;
    const ubLabel = AppData.getUbicacionLabel ? AppData.getUbicacionLabel(m.ubicacion) : (m.ubicacion || 'Sin asignar');

    const html = `
      <div class="space-y-6">
        <div class="flex flex-col sm:flex-row gap-5">
          <div class="flex-shrink-0">
            ${m.imagen
              ? `<img src="${m.imagen}" alt="${m.nombre}" class="w-36 h-36 rounded-2xl object-cover bg-gray-100 dark:bg-night-700 border border-gray-100 dark:border-night-700" onerror="this.style.display='none'"/>`
              : `<div class="w-36 h-36 rounded-2xl bg-gray-100 dark:bg-night-700 flex items-center justify-center border border-gray-100 dark:border-night-700"><svg class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>`}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-3">
              <div><h3 class="text-xl font-bold text-gray-900 dark:text-white">${m.nombre}</h3><p class="text-sm text-gray-400 mt-1">${m.codigo} &middot; ${m.categoria}</p></div>
              ${UI.badge(estadoLabel, estadoMap[m.estado]||'gray')}
            </div>
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="bg-gray-50 dark:bg-night-700/50 rounded-xl p-3"><p class="text-[11px] text-gray-400 uppercase font-medium">Stock</p><p class="text-lg font-bold text-gray-900 dark:text-white">${m.stock} <span class="text-sm font-normal text-gray-400">${m.unidad}</span></p></div>
              <div class="bg-gray-50 dark:bg-night-700/50 rounded-xl p-3"><p class="text-[11px] text-gray-400 uppercase font-medium">Precio Unit.</p><p class="text-lg font-bold text-gray-900 dark:text-white">${App.formatCurrency(m.precio_unit)}</p></div>
              <div class="bg-gray-50 dark:bg-night-700/50 rounded-xl p-3"><p class="text-[11px] text-gray-400 uppercase font-medium">Stock Minimo</p><p class="text-lg font-bold text-gray-900 dark:text-white">${m.min_stock} <span class="text-sm font-normal text-gray-400">${m.unidad}</span></p></div>
              <div class="bg-gray-50 dark:bg-night-700/50 rounded-xl p-3"><p class="text-[11px] text-gray-400 uppercase font-medium">Valor Total</p><p class="text-lg font-bold text-gray-900 dark:text-white">${App.formatCurrency(m.stock * m.precio_unit)}</p></div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <div><p class="text-[11px] text-gray-400 uppercase font-medium">Ubicacion</p><p class="text-sm font-medium text-gray-700 dark:text-gray-200">${ubLabel}</p></div>
          </div>
          <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <svg class="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
            <div><p class="text-[11px] text-gray-400 uppercase font-medium">Proveedor</p><p class="text-sm font-medium text-gray-700 dark:text-gray-200">${prov ? prov.nombre : 'No asignado'}</p></div>
          </div>
        </div>
        ${m.barcode ? `<div class="border border-gray-100 dark:border-night-700 rounded-xl p-4"><p class="text-[11px] text-gray-400 uppercase font-medium mb-3">Codigo de Barras</p><div class="flex items-center justify-center bg-white dark:bg-night-900 rounded-lg p-4">${Inventario._renderBarcodeSVG(m.barcode,220,60)}</div></div>` : ''}
        <div class="flex flex-wrap gap-2 pt-2">
          ${UI.button('Ver Kardex','secondary',`App.closeModal();setTimeout(function(){Inventario.verKardex('${m.id}')},150)`)}
          ${UI.button('Editar','secondary',`App.closeModal();setTimeout(function(){Inventario.editarMaterial('${m.id}')},150)`)}
          ${UI.button('Ajuste Stock','primary',`App.closeModal();setTimeout(function(){Inventario.ajusteStock('${m.id}')},150)`)}
        </div>
      </div>`;
    App.showModal(html, null, m.nombre, true);
  },

  // ══════════════════════════════════════════════════════════
  // KARDEX
  // ══════════════════════════════════════════════════════════
  verKardex(id) {
    const mat = AppData.getMaterial(id);
    const movs = AppData.kardex[id] || [];
    const html = `
      <div class="mb-4 flex items-start justify-between">
        <div class="flex items-center gap-3">${Inventario._materialThumb(mat,'md')}<div><p class="font-semibold text-gray-800 dark:text-white">${mat.nombre}</p><p class="text-xs text-gray-400">${mat.codigo} — ${mat.categoria}</p></div></div>
        <div class="text-right"><p class="text-xs text-gray-400">Stock actual</p><p class="text-xl font-bold text-brand-600">${mat.stock} ${mat.unidad}</p></div>
      </div>
      <div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="border-b border-gray-100 dark:border-night-700">
        <th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Fecha</th><th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Tipo</th><th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Cantidad</th><th class="py-2 px-3 text-right text-xs text-gray-500 uppercase">Saldo</th><th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Referencia</th><th class="py-2 px-3 text-left text-xs text-gray-500 uppercase">Usuario</th>
      </tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
        ${movs.length === 0
          ? '<tr><td colspan="6" class="py-8 text-center text-gray-400">Sin movimientos registrados</td></tr>'
          : movs.map(m => `<tr class="hover:bg-gray-50 dark:hover:bg-night-700/20"><td class="py-2 px-3 text-gray-600 dark:text-gray-400">${App.formatDate(m.fecha)}</td><td class="py-2 px-3">${UI.badge(m.tipo, m.tipo==='Ingreso'?'green':m.tipo==='Ajuste'?'blue':'red')}</td><td class="py-2 px-3 text-right font-medium ${m.cantidad>0?'text-green-600':'text-red-500'}">${m.cantidad>0?'+':''}${m.cantidad}</td><td class="py-2 px-3 text-right font-bold text-gray-800 dark:text-gray-200">${m.saldo}</td><td class="py-2 px-3 text-xs text-gray-500">${m.referencia}</td><td class="py-2 px-3 text-xs text-gray-500">${m.usuario}</td></tr>`).join('')}
      </tbody></table></div>`;
    App.showModal(html, null, `Kardex — ${mat.nombre}`, true);
  },

  // ══════════════════════════════════════════════════════════
  // HELPERS: Combobox options builders
  // ══════════════════════════════════════════════════════════
  _proveedorOptions() {
    return [
      {value: '', label: 'Sin proveedor', desc: 'No asignar proveedor'},
      ...AppData.proveedores.map(p => ({value: p.id, label: p.nombre, desc: `${p.ciudad} &middot; ${p.categoria}`, badge: p.rating >= 4 ? p.rating+'★' : '', badgeColor: p.rating >= 4 ? 'green' : 'gray'})),
      {value: '__new__', label: '+ Crear nuevo proveedor', desc: 'Registrar un proveedor nuevo'}
    ];
  },

  _ubicacionOptions() {
    const opts = [{value: '', label: 'Sin asignar', desc: 'No asignar ubicacion'}];
    AppData.sedes.filter(s => s.activo).forEach(sede => {
      AppData.getAlmacenesBySede(sede.id).forEach(alm => {
        opts.push({value: alm.id, label: alm.nombre, desc: `${sede.nombre} &middot; ${alm.tipo}`});
      });
    });
    opts.push({value: '__new_alm__', label: '+ Crear nuevo almacen', desc: 'Agregar sede o almacen'});
    return opts;
  },

  // ══════════════════════════════════════════════════════════
  // NUEVO MATERIAL (wide modal, combobox)
  // ══════════════════════════════════════════════════════════
  showNuevoMaterial() {
    this._pendingImage = '';
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${UI.input('nm-codigo','text','Codigo','','MAT-XXX',true)}
        ${UI.input('nm-nombre','text','Nombre del Material','','Ej: MDF 15mm',true)}
        <div>${UI.combobox('nm-categoria', AppData.categorias.map(c=>({value:c,label:c})), {label:'Categoria',required:true,placeholder:'Seleccionar...',searchable:false})}</div>
        <div>${UI.combobox('nm-unidad', ['Plancha','Unidad','Par','Kg','Litro','Metro','Ciento','Rollo'].map(u=>({value:u,label:u})), {label:'Unidad',required:true,placeholder:'Seleccionar...',searchable:false})}</div>
        ${UI.input('nm-stock','number','Stock Inicial','0','0')}
        ${UI.input('nm-min','number','Stock Minimo','','Ej: 10',true)}
        ${UI.input('nm-precio','number','Precio Unitario (S/)','','0.00',true)}
        ${UI.input('nm-barcode','text','Codigo de Barras','','Ej: 7751234000011')}
        <div>${UI.combobox('nm-proveedor', Inventario._proveedorOptions(), {label:'Proveedor',placeholder:'Buscar proveedor...',searchable:true})}</div>
        <div>${UI.combobox('nm-ubicacion', Inventario._ubicacionOptions(), {label:'Ubicacion / Almacen',placeholder:'Buscar almacen...',searchable:true})}</div>
        <div id="nm-inline-form" class="sm:col-span-3 hidden"></div>
        ${Inventario._imageUploader('','nm-img-preview')}
      </div>`;
    App.showModal(html, () => {
      const nombre = document.getElementById('nm-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido','error'); return; }
      const provVal = document.querySelector('#nm-proveedor .cb-value')?.value || '';
      const ubVal = document.querySelector('#nm-ubicacion .cb-value')?.value || '';
      const nuevoMat = {
        id: 'MAT-' + String(AppData.materiales.length + 1).padStart(3,'0'),
        codigo: document.getElementById('nm-codigo').value || 'MAT-NEW',
        nombre,
        categoria: document.querySelector('#nm-categoria .cb-value')?.value || AppData.categorias[0],
        stock: parseInt(document.getElementById('nm-stock').value) || 0,
        min_stock: parseInt(document.getElementById('nm-min').value) || 0,
        unidad: document.querySelector('#nm-unidad .cb-value')?.value || 'Unidad',
        precio_unit: parseFloat(document.getElementById('nm-precio').value) || 0,
        proveedor_id: provVal === '__new__' ? '' : provVal,
        ubicacion: ubVal === '__new_alm__' ? '' : ubVal,
        estado: 'OK',
        imagen: Inventario._pendingImage && Inventario._pendingImage !== '__removed__' ? Inventario._pendingImage : '',
        barcode: document.getElementById('nm-barcode').value.trim() || '',
      };
      nuevoMat.estado = nuevoMat.stock === 0 ? 'Agotado' : nuevoMat.stock < nuevoMat.min_stock ? 'Stock Bajo' : 'OK';
      AppData.materiales.unshift(nuevoMat);
      Inventario._pendingImage = '';
      App.showToast(`Material "${nombre}" creado exitosamente`,'success');
      Inventario.render();
    }, 'Nuevo Material', true);

    requestAnimationFrame(() => {
      Inventario._initDropzone();
      Inventario._watchComboboxCreators('nm-proveedor','nm-ubicacion','nm-inline-form');
    });
  },

  // ══════════════════════════════════════════════════════════
  // EDITAR MATERIAL (wide modal, combobox)
  // ══════════════════════════════════════════════════════════
  editarMaterial(id) {
    const m = AppData.getMaterial(id);
    this._pendingImage = '';
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        ${UI.input('em-nombre','text','Nombre',m.nombre,'',true)}
        ${UI.input('em-stock','number','Stock Actual',m.stock,'')}
        ${UI.input('em-min','number','Stock Minimo',m.min_stock,'')}
        ${UI.input('em-precio','number','Precio Unitario',m.precio_unit,'')}
        ${UI.input('em-barcode','text','Codigo de Barras',m.barcode||'','Ej: 7751234000011')}
        <div>${UI.combobox('em-categoria', AppData.categorias.map(c=>({value:c,label:c})), {value:m.categoria,label:'Categoria',searchable:false})}</div>
        <div>${UI.combobox('em-unidad', ['Plancha','Unidad','Par','Kg','Litro','Metro','Ciento','Rollo'].map(u=>({value:u,label:u})), {value:m.unidad,label:'Unidad',searchable:false})}</div>
        <div>${UI.combobox('em-proveedor', Inventario._proveedorOptions(), {value:m.proveedor_id||'',label:'Proveedor',placeholder:'Buscar proveedor...',searchable:true})}</div>
        <div>${UI.combobox('em-ubicacion', Inventario._ubicacionOptions(), {value:m.ubicacion||'',label:'Ubicacion / Almacen',placeholder:'Buscar almacen...',searchable:true})}</div>
        <div id="em-inline-form" class="sm:col-span-3 hidden"></div>
        ${Inventario._imageUploader(m.imagen||'','em-img-preview')}
      </div>`;
    App.showModal(html, () => {
      const idx = AppData.materiales.findIndex(x => x.id === id);
      if (idx === -1) return;
      const mat = AppData.materiales[idx];
      mat.nombre = document.getElementById('em-nombre').value;
      mat.stock = parseInt(document.getElementById('em-stock').value) || 0;
      mat.min_stock = parseInt(document.getElementById('em-min').value) || 0;
      mat.precio_unit = parseFloat(document.getElementById('em-precio').value) || 0;
      mat.barcode = document.getElementById('em-barcode').value.trim();
      mat.categoria = document.querySelector('#em-categoria .cb-value')?.value || mat.categoria;
      mat.unidad = document.querySelector('#em-unidad .cb-value')?.value || mat.unidad;
      const provVal = document.querySelector('#em-proveedor .cb-value')?.value || '';
      mat.proveedor_id = provVal === '__new__' ? mat.proveedor_id : provVal;
      const ubVal = document.querySelector('#em-ubicacion .cb-value')?.value || '';
      mat.ubicacion = ubVal === '__new_alm__' ? mat.ubicacion : ubVal;
      if (Inventario._pendingImage === '__removed__') mat.imagen = '';
      else if (Inventario._pendingImage) mat.imagen = Inventario._pendingImage;
      mat.estado = mat.stock === 0 ? 'Agotado' : mat.stock < mat.min_stock ? 'Stock Bajo' : 'OK';
      Inventario._pendingImage = '';
      App.showToast('Material actualizado correctamente','success');
      Inventario.render();
    }, `Editar: ${m.nombre}`, true);

    requestAnimationFrame(() => {
      Inventario._initDropzone();
      Inventario._watchComboboxCreators('em-proveedor','em-ubicacion','em-inline-form');
    });
  },

  // ══════════════════════════════════════════════════════════
  // WATCH for "__new__" / "__new_alm__" selections
  // ══════════════════════════════════════════════════════════
  _watchComboboxCreators(provId, ubId, inlineId) {
    // Watch proveedor combobox
    const provHidden = document.querySelector(`#${provId} .cb-value`);
    if (provHidden) provHidden.addEventListener('change', function() {
      if (this.value === '__new__') Inventario._showInlineProvForm(inlineId, provId);
    });
    // Watch ubicacion combobox
    const ubHidden = document.querySelector(`#${ubId} .cb-value`);
    if (ubHidden) ubHidden.addEventListener('change', function() {
      if (this.value === '__new_alm__') Inventario._showInlineAlmForm(inlineId, ubId);
    });
  },

  // ── Inline Proveedor Form ──
  _showInlineProvForm(containerId, comboId) {
    const container = document.getElementById(containerId);
    container.classList.remove('hidden');
    container.innerHTML = `
      <div class="border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-brand-700 dark:text-brand-300">Nuevo Proveedor</h4>
          <button onclick="Inventario._closeInlineForm('${containerId}','${comboId}','')" class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          ${UI.input('ilp-nombre','text','Razon Social','','Nombre de la empresa',true)}
          ${UI.input('ilp-ruc','text','RUC','','20XXXXXXXXX')}
          ${UI.input('ilp-contacto','text','Contacto','','Nombre representante')}
          ${UI.input('ilp-email','email','Email','','correo@empresa.pe')}
          ${UI.input('ilp-telefono','text','Telefono','','044-XXXXXX')}
          ${UI.input('ilp-ciudad','text','Ciudad','','Trujillo')}
        </div>
        <div class="flex justify-end gap-2 pt-1">
          ${UI.button('Cancelar','ghost',`Inventario._closeInlineForm('${containerId}','${comboId}','')`)}
          ${UI.button('Crear Proveedor','primary',`Inventario._saveInlineProveedor('${containerId}','${comboId}')`)}
        </div>
      </div>`;
  },

  _saveInlineProveedor(containerId, comboId) {
    const nombre = document.getElementById('ilp-nombre').value.trim();
    if (!nombre) { App.showToast('La razon social es requerida','error'); return; }
    const nuevo = {
      id: 'PRV-' + String(AppData.proveedores.length + 1).padStart(3,'0'),
      nombre,
      ruc: document.getElementById('ilp-ruc').value,
      contacto: document.getElementById('ilp-contacto').value,
      email: document.getElementById('ilp-email').value,
      telefono: document.getElementById('ilp-telefono').value,
      ciudad: document.getElementById('ilp-ciudad').value,
      rating: 3,
      categoria: '',
      credito_dias: 30,
    };
    AppData.proveedores.push(nuevo);
    App.showToast(`Proveedor "${nombre}" creado`,'success');
    // Update combobox value
    const hidden = document.querySelector(`#${comboId} .cb-value`);
    const display = document.querySelector(`#${comboId} .cb-display`);
    if (hidden) hidden.value = nuevo.id;
    if (display) { display.textContent = nombre; display.classList.remove('text-gray-400','dark:text-gray-500'); display.classList.add('text-gray-700','dark:text-gray-200'); }
    document.getElementById(containerId).classList.add('hidden');
  },

  // ── Inline Almacen Form ──
  _showInlineAlmForm(containerId, comboId) {
    const container = document.getElementById(containerId);
    container.classList.remove('hidden');
    const sedeOpts = AppData.sedes.filter(s=>s.activo).map(s => `<option value="${s.id}">${s.nombre}</option>`).join('');
    container.innerHTML = `
      <div class="border border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-900/10 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-brand-700 dark:text-brand-300">Nueva Ubicacion</h4>
          <button onclick="Inventario._closeInlineForm('${containerId}','${comboId}','')" class="text-gray-400 hover:text-gray-600 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>
        <div class="flex items-center gap-2 mb-2">
          <button id="ila-tab-alm" onclick="Inventario._switchAlmTab('alm')" class="px-3 py-1 text-xs font-medium rounded-lg bg-brand-600 text-white">Almacen</button>
          <button id="ila-tab-sede" onclick="Inventario._switchAlmTab('sede')" class="px-3 py-1 text-xs font-medium rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-night-700">Sede</button>
        </div>
        <div id="ila-form-alm">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Sede *</label>
              <select id="ila-sede" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
                ${sedeOpts}
              </select>
            </div>
            ${UI.input('ila-nombre','text','Nombre Almacen','','Ej: Almacen D',true)}
            <div>
              <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">Tipo</label>
              <select id="ila-tipo" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
                <option>Materia Prima</option><option>Producto Terminado</option><option>General</option><option>Exhibicion</option>
              </select>
            </div>
            ${UI.input('ila-responsable','text','Responsable','','Nombre del encargado')}
          </div>
        </div>
        <div id="ila-form-sede" class="hidden">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${UI.input('ils-nombre','text','Nombre Sede','','Ej: Sucursal Norte',true)}
            ${UI.input('ils-direccion','text','Direccion','','Av. Industrial 1250')}
            ${UI.input('ils-ciudad','text','Ciudad','','Trujillo')}
          </div>
        </div>
        <div class="flex justify-end gap-2 pt-1">
          ${UI.button('Cancelar','ghost',`Inventario._closeInlineForm('${containerId}','${comboId}','')`)}
          ${UI.button('Crear','primary',`Inventario._saveInlineAlmacen('${containerId}','${comboId}')`)}
        </div>
      </div>`;
  },

  _switchAlmTab(tab) {
    document.getElementById('ila-form-alm').classList.toggle('hidden', tab !== 'alm');
    document.getElementById('ila-form-sede').classList.toggle('hidden', tab !== 'sede');
    document.getElementById('ila-tab-alm').className = tab === 'alm' ? 'px-3 py-1 text-xs font-medium rounded-lg bg-brand-600 text-white' : 'px-3 py-1 text-xs font-medium rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-night-700';
    document.getElementById('ila-tab-sede').className = tab === 'sede' ? 'px-3 py-1 text-xs font-medium rounded-lg bg-brand-600 text-white' : 'px-3 py-1 text-xs font-medium rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-night-700';
  },

  _saveInlineAlmacen(containerId, comboId) {
    // Check which tab is active
    const sedeFormVisible = !document.getElementById('ila-form-sede').classList.contains('hidden');
    if (sedeFormVisible) {
      // Create sede first
      const nombre = document.getElementById('ils-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre de la sede es requerido','error'); return; }
      const nuevaSede = {
        id: 'SEDE-' + String(AppData.sedes.length + 1).padStart(3,'0'),
        nombre,
        direccion: document.getElementById('ils-direccion').value,
        ciudad: document.getElementById('ils-ciudad').value,
        activo: true,
      };
      AppData.sedes.push(nuevaSede);
      App.showToast(`Sede "${nombre}" creada. Ahora cree un almacen en esa sede.`,'success');
      // Refresh the form to show new sede in dropdown
      Inventario._showInlineAlmForm(containerId, comboId);
      return;
    }
    // Create almacen
    const nombre = document.getElementById('ila-nombre').value.trim();
    if (!nombre) { App.showToast('El nombre del almacen es requerido','error'); return; }
    const nuevoAlm = {
      id: 'ALM-' + String(AppData.almacenes.length + 1).padStart(3,'0'),
      sede_id: document.getElementById('ila-sede').value,
      nombre,
      tipo: document.getElementById('ila-tipo').value,
      responsable: document.getElementById('ila-responsable').value,
      activo: true,
    };
    AppData.almacenes.push(nuevoAlm);
    const sede = AppData.getSede(nuevoAlm.sede_id);
    App.showToast(`Almacen "${nombre}" creado en ${sede.nombre}`,'success');
    const hidden = document.querySelector(`#${comboId} .cb-value`);
    const display = document.querySelector(`#${comboId} .cb-display`);
    if (hidden) hidden.value = nuevoAlm.id;
    if (display) { display.textContent = `${nombre} — ${sede.nombre}`; display.classList.remove('text-gray-400','dark:text-gray-500'); display.classList.add('text-gray-700','dark:text-gray-200'); }
    document.getElementById(containerId).classList.add('hidden');
  },

  _closeInlineForm(containerId, comboId, resetVal) {
    document.getElementById(containerId).classList.add('hidden');
    const hidden = document.querySelector(`#${comboId} .cb-value`);
    if (hidden && (hidden.value === '__new__' || hidden.value === '__new_alm__')) {
      hidden.value = resetVal;
      const display = document.querySelector(`#${comboId} .cb-display`);
      if (display) { display.textContent = 'Seleccionar...'; display.classList.add('text-gray-400','dark:text-gray-500'); display.classList.remove('text-gray-700','dark:text-gray-200'); }
    }
  },

  // ══════════════════════════════════════════════════════════
  // AJUSTE STOCK
  // ══════════════════════════════════════════════════════════
  ajusteStock(id) {
    const m = AppData.getMaterial(id);
    const html = `
      <div class="space-y-4">
        <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl flex items-center gap-3">
          ${Inventario._materialThumb(m)}
          <div><p class="text-sm font-medium text-gray-700 dark:text-gray-200">${m.nombre}</p><p class="text-xs text-gray-400">Stock actual: <strong>${m.stock} ${m.unidad}</strong></p></div>
        </div>
        <div>${UI.combobox('aj-tipo', [{value:'ingreso',label:'Ingreso (+)'},{value:'egreso',label:'Egreso (-)'},{value:'ajuste',label:'Ajuste (fijar cantidad)'}], {value:'ingreso',label:'Tipo de Ajuste',searchable:false})}</div>
        ${UI.input('aj-cantidad','number','Cantidad','','0',true)}
        ${UI.textarea('aj-motivo','Motivo del ajuste','','Ej: Inventario fisico, merma, etc.')}
      </div>`;
    App.showModal(html, () => {
      const tipo = document.querySelector('#aj-tipo .cb-value')?.value || 'ingreso';
      const cantidad = parseInt(document.getElementById('aj-cantidad').value) || 0;
      const motivo = document.getElementById('aj-motivo') ? document.getElementById('aj-motivo').value.trim() : '';
      const idx = AppData.materiales.findIndex(x => x.id === id);
      if (idx !== -1 && cantidad > 0) {
        const mat = AppData.materiales[idx];
        const oldStock = mat.stock;
        if (tipo === 'ingreso') mat.stock += cantidad;
        else if (tipo === 'egreso') mat.stock = Math.max(0, mat.stock - cantidad);
        else mat.stock = cantidad;
        const nuevoStock = mat.stock;
        mat.estado = mat.stock === 0 ? 'Agotado' : mat.stock < mat.min_stock ? 'Stock Bajo' : 'OK';
        if (!AppData.kardex[mat.id]) AppData.kardex[mat.id] = [];
        AppData.kardex[mat.id].unshift({
          fecha: new Date().toISOString().split('T')[0],
          tipo: nuevoStock > oldStock ? 'Ingreso' : nuevoStock < oldStock ? 'Egreso' : 'Ajuste',
          referencia: 'AJ-' + Date.now().toString(36).toUpperCase(),
          detalle: motivo || 'Ajuste de stock',
          cantidad: nuevoStock > oldStock ? Math.abs(nuevoStock - oldStock) : -Math.abs(nuevoStock - oldStock),
          saldo: nuevoStock,
          usuario: App.state.user ? App.state.user.nombre : 'Admin'
        });
        App.showToast(`Ajuste de stock realizado: ${mat.nombre}`,'success');
        Inventario.render();
      }
    }, 'Ajuste de Stock');
  },

  // ══════════════════════════════════════════════════════════
  // ELIMINAR
  // ══════════════════════════════════════════════════════════
  eliminarMaterial(id) {
    const mat = AppData.getMaterial(id);
    if (!mat) return;
    if (mat.stock > 0) { App.showToast('Material tiene stock, no se puede eliminar','error'); return; }
    const html = `
      <div class="text-center py-4">
        <div class="mx-auto w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-3"><svg class="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Eliminar material</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">Esta seguro de eliminar <strong>${mat.nombre}</strong> (${mat.codigo})? Esta accion no se puede deshacer.</p>
      </div>`;
    App.showModal(html, () => {
      const idx = AppData.materiales.findIndex(x => x.id === id);
      if (idx !== -1) {
        AppData.materiales.splice(idx, 1);
        App.showToast(`Material "${mat.nombre}" eliminado`,'success');
        Inventario.render();
      }
    }, 'Confirmar eliminacion');
  },
};
