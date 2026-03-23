// ============================================================
// PRODUCCION.JS - Production Module
// ============================================================

const Produccion = {
  viewMode: 'kanban',
  activeTab: 'catalogo',

  render() {
    const content = document.getElementById('main-content');
    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Produccion', 'Catalogo de productos, ordenes de produccion y control de recursos')}
        <div class="flex gap-1 bg-gray-100 dark:bg-night-800 rounded-xl p-1 overflow-x-auto">
          <button onclick="Produccion.switchTab('catalogo')" id="ptab-catalogo" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${this.activeTab==='catalogo'?'bg-white dark:bg-night-700 text-brand-600 shadow-sm':'text-gray-500 hover:text-gray-700'}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
            Catalogo de Productos
          </button>
          <button onclick="Produccion.switchTab('ordenes')" id="ptab-ordenes" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${this.activeTab==='ordenes'?'bg-white dark:bg-night-700 text-brand-600 shadow-sm':'text-gray-500 hover:text-gray-700'}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Ordenes de Produccion
          </button>
        </div>
        <div id="prod-tab-content"></div>
      </div>`;
    this['renderTab_' + this.activeTab]();
  },

  switchTab(tab) {
    this.activeTab = tab;
    document.querySelectorAll('[id^="ptab-"]').forEach(b => {
      const isActive = b.id === 'ptab-' + tab;
      b.className = `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive ? 'bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700'}`;
    });
    this['renderTab_' + tab]();
  },

  // ══════════════════════════════════════════════════════════
  // TAB: CATALOGO DE PRODUCTOS
  // ══════════════════════════════════════════════════════════
  renderTab_catalogo() {
    const el = document.getElementById('prod-tab-content');
    const prods = AppData.productos;

    el.innerHTML = `
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-sm text-gray-500 dark:text-gray-400">${prods.length} productos registrados</p>
          ${UI.button('+ Nuevo Producto','primary','Produccion.nuevoProducto()')}
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          ${prods.map(p => {
            const hoja = AppData.getHojaCosto(p.id);
            const c = AppData.getCostoProducto(p.id);
            const tieneReceta = !!hoja && hoja.materiales.length > 0;
            const margenColor = c && c.margenReal >= 35 ? 'text-green-600' : c && c.margenReal >= 20 ? 'text-yellow-600' : 'text-red-600';
            return `
            <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm hover:shadow-md transition-all overflow-hidden group">
              <!-- Image -->
              <div class="h-36 bg-gray-100 dark:bg-night-700 flex items-center justify-center relative">
                ${p.imagen ? `<img src="${p.imagen}" class="w-full h-full object-cover" onerror="this.style.display='none'"/>` : `<svg class="w-12 h-12 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`}
                <div class="absolute top-2 left-2">${UI.badge(p.categoria || 'Otro', 'blue')}</div>
                ${tieneReceta ? `<div class="absolute top-2 right-2">${UI.badge(hoja.materiales.length + ' mat.', 'green')}</div>` : `<div class="absolute top-2 right-2">${UI.badge('Sin receta', 'red')}</div>`}
              </div>
              <!-- Info -->
              <div class="p-4 space-y-3">
                <div>
                  <h4 class="text-sm font-bold text-gray-900 dark:text-white leading-tight">${p.nombre}</h4>
                  <p class="text-[11px] text-gray-400 mt-0.5">${p.id} · ${p.descripcion || ''}</p>
                </div>
                ${c ? `<div class="space-y-1 text-xs">
                  <div class="flex justify-between"><span class="text-gray-400">CP:</span><strong class="text-brand-600">${App.formatCurrency(c.costoProduccion)}</strong></div>
                  <div class="flex justify-between"><span class="text-gray-400">P. Sugerido:</span><strong>${App.formatCurrency(c.precioVentaEsperado)}</strong></div>
                  ${c.precioVentaReal > 0 ? `<div class="flex justify-between"><span class="text-gray-400">P. Real:</span><strong>${App.formatCurrency(c.precioVentaReal)}</strong></div>` : ''}
                  <div class="flex justify-between"><span class="text-gray-400">Margen:</span><strong class="${margenColor}">${c.margenReal}%</strong></div>
                </div>` : `<p class="text-xs text-gray-400 italic">Sin receta — configure materiales y procesos</p>`}
                <!-- Actions -->
                <div class="flex gap-1.5 pt-1 border-t border-gray-100 dark:border-night-700">
                  ${tieneReceta
                    ? `<button onclick="Produccion.verReceta('${p.id}')" class="flex-1 py-1.5 text-[11px] font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 rounded-lg hover:bg-brand-100 transition-colors text-center">Ver Receta</button>
                       <button onclick="Produccion.editarReceta('${p.id}')" class="flex-1 py-1.5 text-[11px] font-medium text-gray-600 bg-gray-50 dark:bg-night-700 rounded-lg hover:bg-gray-100 transition-colors text-center">Editar Receta</button>`
                    : `<button onclick="Produccion.editarReceta('${p.id}')" class="flex-1 py-1.5 text-[11px] font-medium text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 transition-colors text-center">+ Crear Receta</button>`}
                  <button onclick="Produccion.editarProducto('${p.id}')" class="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-night-700 rounded-lg transition-all" title="Editar producto">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </button>
                </div>
              </div>
            </div>`;
          }).join('')}

          <!-- Add new product card -->
          <button onclick="Produccion.nuevoProducto()" class="bg-gray-50 dark:bg-night-800 rounded-2xl border-2 border-dashed border-gray-200 dark:border-night-600 hover:border-brand-400 dark:hover:border-brand-500 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all flex flex-col items-center justify-center min-h-[280px] group/add">
            <div class="w-12 h-12 rounded-xl bg-gray-100 dark:bg-night-700 group-hover/add:bg-brand-100 dark:group-hover/add:bg-brand-900/30 flex items-center justify-center mb-3 transition-colors">
              <svg class="w-6 h-6 text-gray-400 group-hover/add:text-brand-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
            </div>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover/add:text-brand-600 transition-colors">Nuevo Producto</p>
            <p class="text-[11px] text-gray-400 mt-1">Crear producto y su receta</p>
          </button>
        </div>
      </div>`;
  },

  nuevoProducto() {
    const html = `
      <div class="space-y-5">
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 flex items-center justify-center text-xs font-bold">1</span>
            Datos del Producto
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            ${UI.input('np-nombre','text','Nombre','','Ej: Mesa de Centro Roble',true)}
            ${UI.input('np-desc','text','Descripcion','','Breve descripcion')}
            <div>${UI.combobox('np-cat', AppData.categorias_producto.map(c=>({value:c,label:c})), {label:'Categoria',required:true,searchable:false,placeholder:'Seleccionar...'})}</div>
            <div>${UI.combobox('np-unidad', ['Unidad','Juego','Metro','m2','Par'].map(u=>({value:u,label:u})), {label:'Unidad',searchable:false,value:'Unidad'})}</div>
            ${UI.input('np-margen','number','Margen Esperado (%)','50','50')}
            ${UI.input('np-precio-real','number','Precio Venta Real (S/) — opcional','','Se calcula automaticamente')}
          </div>
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-xs font-bold">2</span>
            Lista de Materiales (BOM)
            <span class="text-xs font-normal text-gray-400">— puede agregar despues</span>
          </h4>
          <div id="np-mat-list" class="space-y-1.5"></div>
          <div id="np-mat-add" class="mt-2"></div>
          <button onclick="Produccion._showAddMat('np')" class="mt-2 text-[11px] font-medium text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-xl transition-colors">+ Agregar Material</button>
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center text-xs font-bold">3</span>
            Procesos de Mano de Obra
            <span class="text-xs font-normal text-gray-400">— seleccione proceso, el costo se calcula automaticamente</span>
          </h4>
          <div id="np-mo-list" class="space-y-1.5"></div>
          <div id="np-mo-add" class="mt-2"></div>
          <button onclick="Produccion._showAddProc('np')" class="mt-2 text-[11px] font-medium text-amber-600 hover:text-amber-700 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-xl transition-colors">+ Agregar Proceso</button>
        </div>
        <div>
          <h4 class="text-sm font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-6 h-6 rounded-full bg-gray-100 dark:bg-night-700 text-gray-600 flex items-center justify-center text-xs font-bold">4</span>
            Servicios
            <span class="text-xs font-normal text-gray-400">— transporte, secado, instalacion, etc.</span>
          </h4>
          <div id="np-srv-list" class="space-y-1.5"></div>
          <div id="np-srv-add" class="mt-2"></div>
          <button onclick="Produccion._showAddSrvNP()" class="mt-2 text-[11px] font-medium text-gray-600 hover:text-gray-700 bg-gray-50 dark:bg-night-700 px-3 py-1.5 rounded-xl transition-colors">+ Agregar Servicio</button>
        </div>
      </div>`;
    Produccion._tmpMat = [];
    Produccion._tmpMO = [];
    Produccion._tmpSrv = [];

    App.showModal(html, () => {
      const nombre = document.getElementById('np-nombre').value.trim();
      if (!nombre) { App.showToast('El nombre es requerido','error'); return; }
      const prodId = 'PRD-' + String(AppData.productos.length + 1).padStart(3,'0');
      const cat = document.querySelector('#np-cat .cb-value')?.value || 'Otro';
      const unidad = document.querySelector('#np-unidad .cb-value')?.value || 'Unidad';
      const margen = parseFloat(document.getElementById('np-margen').value) || 50;
      const precioReal = parseFloat(document.getElementById('np-precio-real').value) || 0;
      AppData.productos.push({
        id: prodId, nombre, descripcion: document.getElementById('np-desc').value,
        categoria: cat, unidad,
        margen_esperado: margen,
        precio_venta_real: precioReal, // 0 = se usara el precio sugerido
        costo_std: 0, imagen: '',
      });
      AppData.hojas_costo.push({
        id: 'HC-' + String(AppData.hojas_costo.length + 1).padStart(3,'0'),
        producto_id: prodId, nombre,
        materiales: Produccion._tmpMat.slice(),
        mano_obra: Produccion._tmpMO.slice(),
        servicios: Produccion._tmpSrv.slice(),
      });
      const nMat = Produccion._tmpMat.length, nMO = Produccion._tmpMO.length, nSrv = Produccion._tmpSrv.length;
      Produccion._tmpMat = []; Produccion._tmpMO = []; Produccion._tmpSrv = [];
      App.showToast(`Producto "${nombre}" creado con ${nMat} materiales y ${nMO} procesos`,'success');
      Produccion.renderTab_catalogo();
    }, 'Nuevo Producto', true);
  },

  _tmpMat: [],
  _tmpMO: [],
  _tmpSrv: [],

  _showAddSrvNP() {
    const addDiv = document.getElementById('np-srv-add');
    if (!addDiv) return;
    if (addDiv.children.length > 0) { addDiv.innerHTML = ''; return; }
    const srvOptions = AppData.servicios_produccion.map(s => {
      const resp = s.responsable_id ? AppData.getEmpleado(s.responsable_id) : null;
      return {value:s.id, label:s.nombre, desc: s.tipo + (resp ? ' · ' + resp.nombre : ' · Externo') + ' · ' + App.formatCurrency(s.costo_estandar)};
    });
    addDiv.innerHTML = `<div class="p-3 bg-gray-50 dark:bg-night-700/30 rounded-xl space-y-2 mb-2">
      <div>${UI.combobox('np-add-srv', srvOptions, {placeholder:'Buscar servicio...',searchable:true,label:'Servicio'})}</div>
      <div class="flex gap-2 justify-end">
        <button onclick="document.getElementById('np-srv-add').innerHTML=''" class="text-xs text-gray-500 px-3 py-1.5">Cancelar</button>
        <button onclick="Produccion._confirmAddSrvNP()" class="text-xs font-medium bg-gray-700 text-white px-4 py-1.5 rounded-xl hover:bg-gray-800">Agregar</button>
      </div>
    </div>`;
  },
  _confirmAddSrvNP() {
    const srvId = document.querySelector('#np-add-srv .cb-value')?.value;
    if (!srvId) { App.showToast('Seleccione un servicio','error'); return; }
    const srv = AppData.getServicio(srvId);
    const entry = { servicio_id: srvId, descripcion: srv.nombre, costo: srv.costo_estandar, responsable_id: srv.responsable_id || '' };
    this._tmpSrv.push(entry);
    const list = document.getElementById('np-srv-list');
    const resp = entry.responsable_id ? AppData.getEmpleado(entry.responsable_id) : null;
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between p-2.5 bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700';
    row.innerHTML = `<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-lg bg-gray-50 dark:bg-night-700 flex items-center justify-center flex-shrink-0"><span class="text-gray-500 text-xs font-bold">S</span></div><div><p class="text-sm font-medium text-gray-800 dark:text-white">${srv.nombre}</p><p class="text-[10px] text-gray-400">${srv.tipo} · ${resp ? resp.nombre : 'Externo'} · <strong>${App.formatCurrency(srv.costo_estandar)}</strong></p></div></div><button onclick="this.parentElement.remove()" class="p-1 text-gray-300 hover:text-red-500"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>`;
    list.appendChild(row);
    document.getElementById('np-srv-add').innerHTML = '';
  },

  // ── Shared: Add material row ──
  _showAddMat(prefix) {
    const addDiv = document.getElementById(prefix + '-mat-add');
    if (addDiv.children.length > 0) { addDiv.innerHTML = ''; return; }
    const matOptions = AppData.materiales.map(m => ({value:m.id, label:m.nombre, desc: m.categoria + ' · ' + App.formatCurrency(m.precio_unit) + '/' + m.unidad}));
    addDiv.innerHTML = `<div class="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl space-y-2">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <div class="sm:col-span-2">${UI.combobox(prefix+'-add-mat', matOptions, {placeholder:'Buscar material...',searchable:true,label:'Material'})}</div>
        <div>${UI.input(prefix+'-add-cons','number','Consumo','1','0.0')}</div>
      </div>
      <div class="flex gap-2 justify-end">
        <button onclick="document.getElementById('${prefix}-mat-add').innerHTML=''" class="text-xs text-gray-500 px-3 py-1.5">Cancelar</button>
        <button onclick="Produccion._confirmAddMat('${prefix}')" class="text-xs font-medium bg-brand-600 text-white px-4 py-1.5 rounded-xl hover:bg-brand-700">Agregar</button>
      </div>
    </div>`;
  },

  _confirmAddMat(prefix) {
    const matId = document.querySelector('#' + prefix + '-add-mat .cb-value')?.value;
    if (!matId) { App.showToast('Seleccione un material','error'); return; }
    const mat = AppData.getMaterial(matId);
    const consumo = parseFloat(document.getElementById(prefix + '-add-cons').value) || 1;
    const entry = { material_id: matId, consumo, unidad: mat.unidad || 'Unidad', costo_unit: mat.precio_unit || 0 };

    if (prefix === 'np') { this._tmpMat.push(entry); }
    else if (this._editingHoja) { this._editingHoja.materiales.push(entry); }

    // Show confirmed row
    const list = document.getElementById(prefix + '-mat-list');
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between p-2.5 bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700';
    row.innerHTML = `<div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center flex-shrink-0"><span class="text-blue-600 text-xs font-bold">${mat.nombre[0]}</span></div>
        <div class="min-w-0"><p class="text-sm font-medium text-gray-800 dark:text-white truncate">${mat.nombre}</p>
        <p class="text-[10px] text-gray-400">${consumo} ${mat.unidad} × ${App.formatCurrency(mat.precio_unit)} = <strong class="text-gray-700 dark:text-gray-200">${App.formatCurrency(consumo * mat.precio_unit)}</strong></p></div>
      </div>
      <button onclick="this.parentElement.remove()" class="p-1 text-gray-300 hover:text-red-500 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>`;
    list.appendChild(row);
    document.getElementById(prefix + '-mat-add').innerHTML = '';
    if (this._refreshReceta) this._refreshReceta();
  },

  // ── Shared: Add process row (auto-calc from master) ──
  _showAddProc(prefix) {
    const addDiv = document.getElementById(prefix + '-mo-add');
    if (addDiv.children.length > 0) { addDiv.innerHTML = ''; return; }
    const procOptions = AppData.procesos_produccion.map(p => {
      const emp = AppData.getEmpleado(p.operario_default);
      return {value: p.id, label: p.nombre, desc: p.area + ' · ' + emp.nombre + ' · ' + p.horas_estandar + 'h'};
    });
    addDiv.innerHTML = `<div class="p-3 bg-amber-50 dark:bg-amber-900/10 rounded-xl space-y-2">
      <div>${UI.combobox(prefix+'-add-proc', procOptions, {placeholder:'Buscar proceso...',searchable:true,label:'Proceso de produccion'})}</div>
      <div id="${prefix}-proc-preview" class="text-xs text-gray-500"></div>
      <div class="flex gap-2 justify-end">
        <button onclick="document.getElementById('${prefix}-mo-add').innerHTML=''" class="text-xs text-gray-500 px-3 py-1.5">Cancelar</button>
        <button onclick="Produccion._confirmAddProc('${prefix}')" class="text-xs font-medium bg-amber-500 text-white px-4 py-1.5 rounded-xl hover:bg-amber-600">Agregar</button>
      </div>
    </div>`;
    // Watch for process selection to show preview
    setTimeout(() => {
      const hidden = document.querySelector('#' + prefix + '-add-proc .cb-value');
      if (hidden) hidden.addEventListener('change', () => {
        const procId = hidden.value;
        const calc = AppData.calcCostoProceso(procId);
        const proc = AppData.getProceso(procId);
        const emp = AppData.getEmpleado(calc.operarioId);
        const preview = document.getElementById(prefix + '-proc-preview');
        if (preview) preview.innerHTML = `<div class="p-2 bg-white dark:bg-night-800 rounded-lg border border-amber-200 dark:border-amber-800 mt-1">
          <div class="flex items-center justify-between"><span class="font-medium text-gray-700 dark:text-gray-200">${proc.nombre}</span>${UI.badge(proc.tipo_personal, proc.tipo_personal==='Fijo'?'blue':proc.tipo_personal==='Jornal'?'yellow':'purple')}</div>
          <div class="flex gap-4 mt-1 text-[11px] text-gray-500">
            <span>Operario: <strong>${emp.nombre}</strong></span>
            <span>Horas: <strong>${calc.horas}h</strong></span>
            <span>Costo/h: <strong>${App.formatCurrency(AppData.getCostoHora(emp.id))}</strong></span>
            <span>Total: <strong class="text-amber-600">${App.formatCurrency(calc.costo)}</strong></span>
          </div>
        </div>`;
      });
    }, 50);
  },

  _confirmAddProc(prefix) {
    const procId = document.querySelector('#' + prefix + '-add-proc .cb-value')?.value;
    if (!procId) { App.showToast('Seleccione un proceso','error'); return; }
    const proc = AppData.getProceso(procId);
    const calc = AppData.calcCostoProceso(procId);
    const emp = AppData.getEmpleado(calc.operarioId);
    const nro = (prefix === 'np' ? this._tmpMO.length : (this._editingHoja ? this._editingHoja.mano_obra.length : 0)) + 1;
    const entry = {
      nro, proceso: proc.nombre, tipo: proc.tipo_personal,
      operario_id: calc.operarioId, duracion: calc.horas,
      unidad_tiempo: 'horas', costo: calc.costo, proceso_id: procId,
    };

    if (prefix === 'np') { this._tmpMO.push(entry); }
    else if (this._editingHoja) { this._editingHoja.mano_obra.push(entry); }

    const list = document.getElementById(prefix + '-mo-list');
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between p-2.5 bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700';
    row.innerHTML = `<div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center flex-shrink-0"><span class="text-amber-600 text-xs font-bold">${nro}</span></div>
        <div class="min-w-0"><p class="text-sm font-medium text-gray-800 dark:text-white truncate">${proc.nombre}</p>
        <p class="text-[10px] text-gray-400">${emp.nombre} · ${UI.badge(proc.tipo_personal, proc.tipo_personal==='Fijo'?'blue':proc.tipo_personal==='Jornal'?'yellow':'purple')} · ${calc.horas}h · <strong class="text-amber-600">${App.formatCurrency(calc.costo)}</strong></p></div>
      </div>
      <button onclick="this.parentElement.remove()" class="p-1 text-gray-300 hover:text-red-500 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>`;
    list.appendChild(row);
    document.getElementById(prefix + '-mo-add').innerHTML = '';
    if (this._refreshReceta) this._refreshReceta();
  },

  // ── Shared: Add servicio row (from master) ──
  _showAddSrv(prefix) {
    const addDiv = document.getElementById(prefix + '-srv-add');
    if (!addDiv) return;
    if (addDiv.children.length > 0) { addDiv.innerHTML = ''; return; }
    const srvOptions = AppData.servicios_produccion.map(s => {
      const resp = s.responsable_id ? AppData.getEmpleado(s.responsable_id) : null;
      return {value:s.id, label:s.nombre, desc: s.tipo + (resp ? ' · ' + resp.nombre : ' · Externo') + ' · ' + App.formatCurrency(s.costo_estandar)};
    });
    addDiv.innerHTML = `<div class="p-3 bg-gray-50 dark:bg-night-700/30 rounded-xl space-y-2 mb-2">
      <div>${UI.combobox(prefix+'-add-srv', srvOptions, {placeholder:'Buscar servicio...',searchable:true,label:'Servicio'})}</div>
      <div class="flex gap-2 justify-end">
        <button onclick="document.getElementById('${prefix}-srv-add').innerHTML=''" class="text-xs text-gray-500 px-3 py-1.5">Cancelar</button>
        <button onclick="Produccion._confirmAddSrv('${prefix}')" class="text-xs font-medium bg-gray-700 text-white px-4 py-1.5 rounded-xl hover:bg-gray-800">Agregar</button>
      </div>
    </div>`;
  },
  _confirmAddSrv(prefix) {
    const srvId = document.querySelector('#' + prefix + '-add-srv .cb-value')?.value;
    if (!srvId) { App.showToast('Seleccione un servicio','error'); return; }
    const srv = AppData.getServicio(srvId);
    const entry = { servicio_id: srvId, descripcion: srv.nombre, costo: srv.costo_estandar, responsable_id: srv.responsable_id || '' };
    if (this._editingHoja) { this._editingHoja.servicios.push(entry); }
    document.getElementById(prefix + '-srv-add').innerHTML = '';
    if (this._refreshReceta) this._refreshReceta();
  },
  _removeSrv(idx) {
    if (!this._editingHoja) return;
    this._editingHoja.servicios.splice(idx, 1);
    if (this._refreshReceta) this._refreshReceta();
  },

  editarProducto(prodId) {
    const p = AppData.getProducto(prodId);
    if (!p.id) return;
    const c = AppData.getCostoProducto(prodId);
    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        ${UI.input('ep-nombre','text','Nombre',p.nombre,'',true)}
        ${UI.input('ep-desc','text','Descripcion',p.descripcion||'','')}
        <div>${UI.combobox('ep-cat', AppData.categorias_producto.map(cat=>({value:cat,label:cat})), {value:p.categoria,label:'Categoria',searchable:false})}</div>
        <div>${UI.combobox('ep-unidad', ['Unidad','Juego','Metro','m2','Par'].map(u=>({value:u,label:u})), {value:p.unidad,label:'Unidad',searchable:false})}</div>
        ${UI.input('ep-margen','number','Margen Esperado (%)',p.margen_esperado||50,'')}
        ${UI.input('ep-precio-real','number','Precio Venta Real (S/)',p.precio_venta_real||'','Dejar vacio para usar el sugerido')}
      </div>
      ${c ? `<div class="mt-4 p-3 bg-gray-50 dark:bg-night-700/30 rounded-xl text-xs space-y-1">
        <div class="flex justify-between"><span class="text-gray-400">Costo Produccion (CP)</span><strong>${App.formatCurrency(c.costoProduccion)}</strong></div>
        <div class="flex justify-between"><span class="text-gray-400">Valor Venta Esperado (${p.margen_esperado||50}%)</span><strong>${App.formatCurrency(c.valorVentaEsperado)}</strong></div>
        <div class="flex justify-between"><span class="text-gray-400">Precio Sugerido (c/IGV)</span><strong class="text-brand-600">${App.formatCurrency(c.precioVentaEsperado)}</strong></div>
      </div>` : ''}`;
    App.showModal(html, () => {
      const idx = AppData.productos.findIndex(x => x.id === prodId);
      if (idx === -1) return;
      AppData.productos[idx].nombre = document.getElementById('ep-nombre').value.trim() || p.nombre;
      AppData.productos[idx].descripcion = document.getElementById('ep-desc').value;
      AppData.productos[idx].categoria = document.querySelector('#ep-cat .cb-value')?.value || p.categoria;
      AppData.productos[idx].unidad = document.querySelector('#ep-unidad .cb-value')?.value || p.unidad;
      AppData.productos[idx].margen_esperado = parseFloat(document.getElementById('ep-margen').value) || 50;
      AppData.productos[idx].precio_venta_real = parseFloat(document.getElementById('ep-precio-real').value) || 0;
      App.showToast('Producto actualizado','success');
      Produccion.renderTab_catalogo();
    }, `Editar: ${p.nombre}`, true);
  },

  // ══════════════════════════════════════════════════════════
  // VER RECETA (modal de solo lectura)
  // ══════════════════════════════════════════════════════════
  verReceta(productoId) {
    const prod = AppData.getProducto(productoId);
    const hoja = AppData.getHojaCosto(productoId);
    const c = AppData.getCostoProducto(productoId);
    if (!hoja) { App.showToast('Este producto no tiene receta','warning'); return; }

    const matRows = hoja.materiales.map(m => {
      const mat = AppData.getMaterial(m.material_id);
      const costoTotal = m.consumo * m.costo_unit;
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2 text-sm text-gray-800 dark:text-white">${mat.nombre||m.material_id}</td>
        <td class="px-4 py-2 text-sm text-right font-mono">${m.consumo}</td>
        <td class="px-4 py-2 text-sm text-gray-500">${m.unidad}</td>
        <td class="px-4 py-2 text-sm text-right font-mono">${App.formatCurrency(m.costo_unit)}</td>
        <td class="px-4 py-2 text-sm text-right font-mono font-semibold">${App.formatCurrency(costoTotal)}</td>
      </tr>`;
    }).join('');
    const moRows = hoja.mano_obra.map(m => {
      const emp = AppData.getEmpleado(m.operario_id);
      const costoHora = AppData.getCostoHora(m.operario_id);
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2 text-sm font-mono text-gray-500">${m.nro}</td>
        <td class="px-4 py-2 text-sm text-gray-800 dark:text-white">${m.proceso}</td>
        <td class="px-4 py-2">${UI.badge(m.tipo,m.tipo==='Fijo'?'blue':m.tipo==='Jornal'?'yellow':'purple')}</td>
        <td class="px-4 py-2 text-sm text-gray-600">${emp.nombre||m.operario_id}</td>
        <td class="px-4 py-2 text-sm text-right font-mono text-gray-400">${App.formatCurrency(costoHora)}/h</td>
        <td class="px-4 py-2 text-sm text-right font-mono">${m.duracion}h</td>
        <td class="px-4 py-2 text-sm text-right font-mono font-semibold">${App.formatCurrency(m.costo)}</td>
      </tr>`;
    }).join('');
    const svRows = hoja.servicios.map(s => {
      const resp = s.responsable_id ? AppData.getEmpleado(s.responsable_id) : null;
      return `<tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
        <td class="px-4 py-2 text-sm text-gray-800 dark:text-white">${s.descripcion}</td>
        <td class="px-4 py-2 text-sm text-gray-500">${s.servicio_id ? UI.badge(AppData.getServicio(s.servicio_id).tipo||'','gray') : ''}</td>
        <td class="px-4 py-2 text-sm text-gray-500">${resp ? resp.nombre : 'Externo'}</td>
        <td class="px-4 py-2 text-sm text-right font-mono font-semibold">${App.formatCurrency(s.costo)}</td>
      </tr>`;
    }).join('');
    const margenColor = c && c.margenReal >= 35 ? 'text-green-600' : c && c.margenReal >= 20 ? 'text-yellow-600' : 'text-red-600';

    const html = `<div class="space-y-5">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center"><p class="text-[10px] text-blue-500 uppercase font-bold">MPD</p><p class="text-lg font-bold text-blue-700 dark:text-blue-300">${c?App.formatCurrency(c.mpd):'—'}</p></div>
        <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center"><p class="text-[10px] text-amber-500 uppercase font-bold">MOD</p><p class="text-lg font-bold text-amber-700 dark:text-amber-300">${c?App.formatCurrency(c.mod):'—'}</p></div>
        <div class="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 text-center"><p class="text-[10px] text-purple-500 uppercase font-bold">CIF</p><p class="text-lg font-bold text-purple-700 dark:text-purple-300">${c?App.formatCurrency(c.cif):'—'}</p></div>
        <div class="bg-brand-50 dark:bg-brand-900/20 rounded-xl p-3 text-center"><p class="text-[10px] text-brand-500 uppercase font-bold">Costo Prod.</p><p class="text-lg font-bold text-brand-600">${c?App.formatCurrency(c.costoProduccion):'—'}</p></div>
      </div>
      ${hoja.materiales.length > 0 ? `<div><h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2">Materiales (BOM) · ${hoja.materiales.length}</h4><div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Material</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">Consumo</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Unid</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">C. Unit</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">Total</th></tr></thead><tbody class="divide-y divide-gray-100/50">${matRows}</tbody><tfoot><tr class="border-t-2 border-blue-200 bg-blue-50/50"><td colspan="4" class="px-4 py-2 text-xs font-bold text-blue-600">Total MPD</td><td class="px-4 py-2 text-right font-mono text-xs font-bold text-blue-600">${c?App.formatCurrency(c.mpd):'—'}</td></tr></tfoot></table></div></div>` : ''}
      ${hoja.mano_obra.length > 0 ? `<div><h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2">Mano de Obra · ${hoja.mano_obra.length} procesos · ${c?c.horasProduccion:0}h</h4><div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">N</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Proceso</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Tipo</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Operario</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">C. Hora</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">Tiempo</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">Costo</th></tr></thead><tbody class="divide-y divide-gray-100/50">${moRows}</tbody><tfoot><tr class="border-t-2 border-amber-200 bg-amber-50/50"><td colspan="6" class="px-4 py-2 text-xs font-bold text-amber-600">Total MOD</td><td class="px-4 py-2 text-right font-mono text-xs font-bold text-amber-600">${c?App.formatCurrency(c.mod):'—'}</td></tr></tfoot></table></div></div>` : ''}
      ${hoja.servicios.length > 0 ? `<div><h4 class="text-sm font-bold text-gray-800 dark:text-white mb-2">Servicios · ${hoja.servicios.length}</h4><div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full text-sm"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Servicio</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Tipo</th><th class="px-4 py-2 text-left text-[10px] font-mono text-gray-400 uppercase">Responsable</th><th class="px-4 py-2 text-right text-[10px] font-mono text-gray-400 uppercase">Costo</th></tr></thead><tbody class="divide-y divide-gray-100/50">${svRows}</tbody><tfoot><tr class="border-t-2 border-gray-200 bg-gray-50/50"><td colspan="3" class="px-4 py-2 text-xs font-bold text-gray-600">Total Servicios</td><td class="px-4 py-2 text-right font-mono text-xs font-bold text-gray-600">${c?App.formatCurrency(c.servicios):'—'}</td></tr></tfoot></table></div></div>` : ''}
      <!-- Estructura de costos completa (como ERP profesional) -->
      ${c ? `<div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
        <div class="px-4 py-3 bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700">
          <h4 class="text-sm font-bold text-gray-800 dark:text-white">Estructura de Costos y Precio</h4>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-night-700">
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de materiales</span><span class="font-mono font-semibold">${App.formatCurrency(c.mpd)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de mano de obra</span><span class="font-mono font-semibold">${App.formatCurrency(c.mod)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Costo de servicios</span><span class="font-mono font-semibold">${App.formatCurrency(c.servicios)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700/30"><span class="text-gray-700 dark:text-gray-200 font-medium">Total Costos Directos</span><span class="font-mono font-bold text-gray-800 dark:text-white">${App.formatCurrency(c.totalCostosDirectos)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500 flex items-center gap-1">CIF — Depreciacion maquinas <span class="text-[10px] text-gray-400">(${(c.ratio*100).toFixed(1)}% asignado)</span></span><span class="font-mono font-semibold">${App.formatCurrency(c.cifDepreciacion)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">CIF — Gastos Produccion (agua, luz, alquiler, etc.)</span><span class="font-mono font-semibold">${App.formatCurrency(c.cifGastosProd)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm bg-purple-50/50 dark:bg-purple-900/10"><span class="text-purple-600 font-medium">Total CIF (Costos Indirectos)</span><span class="font-mono font-bold text-purple-600">${App.formatCurrency(c.cif)}</span></div>
          <div class="flex justify-between px-4 py-3 text-sm bg-brand-50 dark:bg-brand-900/20"><span class="text-brand-700 dark:text-brand-300 font-bold">Costo de Produccion (CP)</span><span class="font-mono font-bold text-brand-700 dark:text-brand-300 text-base">${App.formatCurrency(c.costoProduccion)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Margen esperado</span><span class="font-mono font-bold">${c.margenEsperado}%</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Valor Venta esperado</span><span class="font-mono font-semibold">${App.formatCurrency(c.valorVentaEsperado)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Precio Venta esperado (incl IGV)</span><span class="font-mono font-bold text-green-600">${App.formatCurrency(c.precioVentaEsperado)}</span></div>
          ${c.precioVentaReal > 0 ? `
          <div class="flex justify-between px-4 py-2.5 text-sm border-t-2 border-gray-200 dark:border-night-600"><span class="text-gray-500">Precio Venta real (incl IGV)</span><span class="font-mono font-bold text-red-600">${App.formatCurrency(c.precioVentaReal)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Valor Venta real</span><span class="font-mono font-semibold">${App.formatCurrency(c.valorVentaReal)}</span></div>
          <div class="flex justify-between px-4 py-2.5 text-sm"><span class="text-gray-500">Margen real</span><span class="font-mono font-bold ${margenColor}">${c.margenReal}%</span></div>
          ` : ''}
          <div class="flex justify-between px-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700/30"><span class="text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1">GA (Gastos Administrativos) <span class="text-[10px] text-gray-400 font-normal">${(c.ratio*100).toFixed(1)}% de Costos > G. Operativos > Admin</span></span><span class="font-mono font-bold">${App.formatCurrency(c.ga)}</span></div>
        </div>
      </div>` : ''}
      <div class="flex justify-end gap-2">
        ${UI.button('Editar Receta','primary',`App.closeModal();setTimeout(function(){Produccion.editarReceta('${productoId}')},150)`)}
      </div>
    </div>`;
    App.showModal(html, null, `Receta — ${prod.nombre}`, true);
  },

  // ══════════════════════════════════════════════════════════
  // EDITAR RECETA (inline editing)
  // ══════════════════════════════════════════════════════════
  _editingHoja: null,
  _editingProdId: null,
  _refreshReceta: null,

  editarReceta(productoId) {
    const prod = AppData.getProducto(productoId);
    // Create hoja if doesn't exist
    if (!AppData.getHojaCosto(productoId)) {
      AppData.hojas_costo.push({
        id: 'HC-' + String(AppData.hojas_costo.length + 1).padStart(3,'0'),
        producto_id: productoId, nombre: prod.nombre,
        materiales: [], mano_obra: [], servicios: [],
      });
    }
    const hoja = AppData.getHojaCosto(productoId);
    this._editingHoja = hoja;
    this._editingProdId = productoId;

    const refreshEditor = () => {
      const c = AppData.getCostoProducto(productoId);
      const container = document.getElementById('receta-editor');
      if (!container) return;

      const matRows = hoja.materiales.map((m,i) => {
        const mat = AppData.getMaterial(m.material_id);
        return `<tr><td class="px-3 py-1.5 text-xs">${mat.nombre||m.material_id}</td><td class="px-3 py-1.5"><input type="number" value="${m.consumo}" step="0.1" min="0" class="w-16 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Produccion._editMat(${i},'consumo',this.value)" onfocus="this.select()"/></td><td class="px-3 py-1.5 text-xs text-gray-400">${m.unidad}</td><td class="px-3 py-1.5"><input type="number" value="${m.costo_unit}" step="0.01" class="w-20 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Produccion._editMat(${i},'costo_unit',this.value)" onfocus="this.select()"/></td><td class="px-3 py-1.5 text-xs font-mono font-semibold text-right">${App.formatCurrency(m.consumo*m.costo_unit)}</td><td class="px-3 py-1.5"><button onclick="Produccion._removeMat(${i})" class="text-red-400 hover:text-red-600 text-xs">✕</button></td></tr>`;
      }).join('');
      const moRows = hoja.mano_obra.map((m,i) => {
        const emp = AppData.getEmpleado(m.operario_id);
        return `<tr><td class="px-3 py-1.5 text-xs font-mono">${m.nro}</td><td class="px-3 py-1.5"><input type="text" value="${m.proceso}" class="w-full px-2 py-1 text-xs bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all" onchange="Produccion._editMO(${i},'proceso',this.value)"/></td><td class="px-3 py-1.5 text-xs">${UI.badge(m.tipo,m.tipo==='Fijo'?'blue':m.tipo==='Jornal'?'yellow':'purple')}</td><td class="px-3 py-1.5 text-xs">${emp.nombre||m.operario_id}</td><td class="px-3 py-1.5"><input type="number" value="${m.duracion}" step="0.5" class="w-14 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Produccion._editMO(${i},'duracion',this.value)" onfocus="this.select()"/></td><td class="px-3 py-1.5"><input type="number" value="${m.costo}" step="0.01" class="w-20 px-2 py-1 text-xs font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-xl transition-all text-right" onchange="Produccion._editMO(${i},'costo',this.value)" onfocus="this.select()"/></td><td class="px-3 py-1.5"><button onclick="Produccion._removeMO(${i})" class="text-red-400 hover:text-red-600 text-xs">✕</button></td></tr>`;
      }).join('');
      const mpd = c ? c.mpd : 0, mod = c ? c.mod : 0;

      container.innerHTML = `
        <div class="space-y-5">
          <div><div class="flex items-center justify-between mb-2"><h4 class="text-sm font-bold text-gray-800 dark:text-white">Materiales (BOM) · ${hoja.materiales.length}</h4><button onclick="Produccion._showAddMat('re')" class="text-[11px] font-medium text-brand-600 bg-brand-50 dark:bg-brand-900/20 px-2.5 py-1 rounded-xl hover:bg-brand-100">+ Material</button></div>
          <div id="re-mat-add"></div>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Material</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Consumo</th><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Unid</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">C. Unit</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Total</th><th class="px-3 py-1.5 w-8"></th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${matRows||'<tr><td colspan="6" class="py-4 text-center text-xs text-gray-400">Sin materiales</td></tr>'}</tbody><tfoot><tr class="border-t-2 border-blue-200 bg-blue-50/50"><td colspan="4" class="px-3 py-1.5 text-xs font-bold text-blue-600">MPD</td><td class="px-3 py-1.5 text-right text-xs font-mono font-bold text-blue-600">${App.formatCurrency(mpd)}</td><td></td></tr></tfoot></table></div></div>
          <div><div class="flex items-center justify-between mb-2"><h4 class="text-sm font-bold text-gray-800 dark:text-white">Mano de Obra · ${hoja.mano_obra.length}</h4><button onclick="Produccion._showAddProc('re')" class="text-[11px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded-xl hover:bg-amber-100">+ Proceso</button></div>
          <div id="re-mo-add"></div>
          <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">N</th><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Proceso</th><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Tipo</th><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Operario</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Horas</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Costo</th><th class="px-3 py-1.5 w-8"></th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${moRows||'<tr><td colspan="7" class="py-4 text-center text-xs text-gray-400">Sin procesos</td></tr>'}</tbody><tfoot><tr class="border-t-2 border-amber-200 bg-amber-50/50"><td colspan="5" class="px-3 py-1.5 text-xs font-bold text-amber-600">MOD</td><td class="px-3 py-1.5 text-right text-xs font-mono font-bold text-amber-600">${App.formatCurrency(mod)}</td><td></td></tr></tfoot></table></div></div>
          <div><div class="flex items-center justify-between mb-2"><h4 class="text-sm font-bold text-gray-800 dark:text-white">Servicios · ${hoja.servicios.length}</h4><button onclick="Produccion._showAddSrv('re')" class="text-[11px] font-medium text-gray-600 bg-gray-50 dark:bg-night-700 px-2.5 py-1 rounded-xl hover:bg-gray-100">+ Servicio</button></div>
          <div id="re-srv-add"></div>
          ${hoja.servicios.length > 0 ? `<div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden"><table class="w-full"><thead><tr class="bg-gray-50/50 dark:bg-night-700/30 border-b border-gray-100 dark:border-night-700"><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Servicio</th><th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Tipo</th><th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Costo</th><th class="px-3 py-1.5 w-8"></th></tr></thead><tbody class="divide-y divide-gray-50 dark:divide-night-700/50">${hoja.servicios.map((s,i) => '<tr><td class="px-3 py-1.5 text-xs">' + s.descripcion + '</td><td class="px-3 py-1.5 text-xs text-gray-400">' + (s.servicio_id ? (AppData.getServicio(s.servicio_id).tipo||'') : '') + '</td><td class="px-3 py-1.5 text-xs font-mono font-semibold text-right">' + App.formatCurrency(s.costo) + '</td><td class="px-3 py-1.5"><button onclick="Produccion._removeSrv(' + i + ')" class="text-red-400 hover:text-red-600 text-xs">✕</button></td></tr>').join('')}</tbody></table></div>` : '<p class="text-xs text-gray-400 text-center py-3">Sin servicios asignados</p>'}</div>
        </div>`;
    };
    this._refreshReceta = refreshEditor;
    const html = `<div id="receta-editor"></div>`;
    App.showModal(html, () => {
      this._editingHoja = null;
      App.showToast('Receta actualizada','success');
      Produccion.renderTab_catalogo();
    }, `Editar Receta — ${prod.nombre}`, true);
    requestAnimationFrame(refreshEditor);
  },

  _editMat(i,field,val) { if(!this._editingHoja)return; this._editingHoja.materiales[i][field]=parseFloat(val)||0; this._refreshReceta(); },
  _removeMat(i) { if(!this._editingHoja)return; this._editingHoja.materiales.splice(i,1); this._refreshReceta(); },
  _editMO(i,field,val) { if(!this._editingHoja)return; if(field==='proceso')this._editingHoja.mano_obra[i][field]=val; else this._editingHoja.mano_obra[i][field]=parseFloat(val)||0; this._refreshReceta(); },
  _removeMO(i) { if(!this._editingHoja)return; this._editingHoja.mano_obra.splice(i,1); this._refreshReceta(); },

  // Old _addMatEdit/_addMOEdit removed — now uses shared _showAddMat('re')/_showAddProc('re')

  // ══════════════════════════════════════════════════════════
  // TAB: ORDENES DE PRODUCCION
  // ══════════════════════════════════════════════════════════
  renderTab_ordenes() {
    const el = document.getElementById('prod-tab-content');
    const ops = AppData.ordenes_produccion;
    const activas = ops.filter(o => o.estado === 'En Proceso' || o.estado === 'Planificada' || o.estado === 'QC').length;
    const completadas = ops.filter(o => o.estado === 'Completada').length;
    const mermaArr = ops.filter(o => o.merma > 0);
    const avgMerma = mermaArr.length > 0 ? mermaArr.reduce((s, o) => s + o.merma, 0) / mermaArr.length : 0;

    el.innerHTML = `
      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
            ${UI.kpiCard('OPs Activas', activas, null, svgIcons.cog, 'brand', completadas+' completadas')}
            ${UI.kpiCard('Eficiencia', AppData.getKPIs().eficiencia_produccion+'%', '+2', svgIcons.check, 'green', 'Rendimiento')}
            ${UI.kpiCard('Entregas', AppData.getKPIs().entregas_tiempo+'%', '-1', svgIcons.document, 'blue', 'A tiempo')}
            ${UI.kpiCard('Merma', avgMerma.toFixed(1)+'%', null, svgIcons.bell, 'yellow', 'Promedio')}
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="Produccion.setView('kanban')" class="px-3 py-1.5 text-xs font-medium rounded-lg ${this.viewMode==='kanban'?'bg-brand-100 text-brand-700 dark:bg-brand-900/30':'bg-gray-100 text-gray-600 dark:bg-night-700'} transition-colors">Kanban</button>
          <button onclick="Produccion.setView('table')" class="px-3 py-1.5 text-xs font-medium rounded-lg ${this.viewMode==='table'?'bg-brand-100 text-brand-700 dark:bg-brand-900/30':'bg-gray-100 text-gray-600 dark:bg-night-700'} transition-colors">Tabla</button>
          <div class="flex-1"></div>
          ${UI.button('+ Nueva OP','primary','Produccion.showNuevaOP()')}
        </div>
        <div id="prod-main-view">${this.viewMode === 'kanban' ? this.renderKanban() : this.renderTable()}</div>
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">Cronograma de Produccion</h3>
            <p class="text-xs text-gray-400 mt-0.5">Linea de tiempo</p>
          </div>
          <div class="p-6 overflow-x-auto">${this.renderGantt()}</div>
        </div>
      </div>`;
  },

  setView(mode) {
    this.viewMode = mode;
    const mainView = document.getElementById('prod-main-view');
    if (mainView) mainView.innerHTML = mode === 'kanban' ? this.renderKanban() : this.renderTable();
    document.querySelectorAll('[onclick^="Produccion.setView"]').forEach(btn => {
      const btnMode = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
      btn.className = `px-3 py-1.5 text-xs font-medium rounded-lg ${btnMode === mode ? 'bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400' : 'bg-gray-100 text-gray-600 dark:bg-night-700 dark:text-gray-400'} transition-colors`;
    });
  },

  renderKanban() {
    const columns = [
      { id: 'Planificada', label: 'Planificada', color: 'bg-gray-100 dark:bg-night-700/50', headerColor: 'bg-gray-200 dark:bg-night-700 text-gray-700 dark:text-gray-300' },
      { id: 'En Proceso', label: 'En Proceso', color: 'bg-blue-50 dark:bg-blue-900/10', headerColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
      { id: 'QC', label: 'Control Calidad', color: 'bg-yellow-50 dark:bg-yellow-900/10', headerColor: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
      { id: 'Completada', label: 'Completada', color: 'bg-green-50 dark:bg-green-900/10', headerColor: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' },
    ];

    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        ${columns.map(col => {
          const colOps = AppData.ordenes_produccion.filter(op => op.estado === col.id);
          return `
            <div class="${col.color} rounded-2xl p-3">
              <div class="flex items-center justify-between mb-3 px-1">
                <span class="text-xs font-bold px-2 py-1 rounded-lg ${col.headerColor}">${col.label}</span>
                <span class="text-xs font-semibold text-gray-500 dark:text-gray-400">${colOps.length}</span>
              </div>
              <div class="space-y-2">
                ${colOps.map(op => `
                  <div>
                    <div onclick="Produccion.verOP('${op.id}')" class="cursor-pointer">
                      ${UI.kanbanCard(op)}
                    </div>
                    ${col.id === 'Planificada' ? `<div class="flex gap-1 mt-1"><button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','En Proceso');" class="flex-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">Iniciar &#9654;</button><button onclick="event.stopPropagation(); Produccion.cancelarOP('${op.id}');" class="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors" title="Cancelar">&#10005;</button></div>` : ''}
                    ${col.id === 'En Proceso' ? `<div class="flex gap-1 mt-1"><button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','QC');" class="flex-1 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">Enviar a QC &#9654;</button><button onclick="event.stopPropagation(); Produccion.cancelarOP('${op.id}');" class="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors" title="Cancelar">&#10005;</button></div>` : ''}
                    ${col.id === 'QC' ? `<button onclick="event.stopPropagation(); Produccion.cambiarEstado('${op.id}','Completada');" class="mt-1 w-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">Completar &#10003;</button>` : ''}
                  </div>
                `).join('')}
                ${colOps.length === 0 ? `<div class="text-center py-6 text-xs text-gray-400">Sin órdenes</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  renderTable() {
    const estadoColor = { 'Planificada': 'gray', 'En Proceso': 'blue', 'QC': 'yellow', 'Completada': 'green', 'Cancelada': 'red' };
    const prioColor = { 'Alta': 'red', 'Media': 'yellow', 'Normal': 'gray' };

    return `
      <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700 flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-semibold text-gray-900 dark:text-white">Órdenes de Producción</h3>
          <div class="w-full sm:w-64">${UI.searchInput('op-search', 'Buscar OP...', 'Produccion.searchOP(this.value)')}</div>
        </div>
        <div class="overflow-x-auto">
          <table id="op-table" class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">N° OP</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Producto</th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Cant.</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Operario</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Inicio</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Fin Esp.</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Avance</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Prioridad</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Estado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${AppData.ordenes_produccion.map(op => {
                const prod = AppData.getProducto(op.producto_id);
                return `
                  <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                    <td class="px-4 py-3 font-mono text-xs text-brand-600 dark:text-brand-400 font-semibold">${op.id}</td>
                    <td class="px-4 py-3">
                      <p class="text-sm font-medium text-gray-800 dark:text-gray-200">${prod.nombre || op.producto_id}</p>
                      <p class="text-xs text-gray-400">OV: ${op.ov_id}</p>
                    </td>
                    <td class="px-4 py-3 text-center font-bold text-gray-700 dark:text-gray-300">${op.cantidad}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${op.operario}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(op.fecha_inicio)}</td>
                    <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">${App.formatDate(op.fecha_fin)}</td>
                    <td class="px-4 py-3 w-32">
                      <div class="flex items-center gap-2">
                        <div class="flex-1 bg-gray-100 dark:bg-night-700 rounded-full h-1.5">
                          <div class="${op.avance >= 80 ? 'bg-green-500' : op.avance >= 40 ? 'bg-blue-500' : 'bg-yellow-400'} h-1.5 rounded-full" style="width:${op.avance}%"></div>
                        </div>
                        <span class="text-xs font-semibold text-gray-500 w-8">${op.avance}%</span>
                      </div>
                    </td>
                    <td class="px-4 py-3">${UI.badge(op.prioridad, prioColor[op.prioridad] || 'gray')}</td>
                    <td class="px-4 py-3">${UI.badge(op.estado, estadoColor[op.estado] || 'gray')}</td>
                    <td class="px-4 py-3">
                      <div class="flex items-center gap-1">
                        ${UI.iconBtn(svgIcons.eye, `Produccion.verOP('${op.id}')`, 'Ver', 'brand')}
                        ${op.estado !== 'Completada' && op.estado !== 'Cancelada' ? UI.iconBtn(svgIcons.edit, `Produccion.actualizarOP('${op.id}')`, 'Actualizar', 'gray') : ''}
                        ${op.estado === 'Planificada' || op.estado === 'En Proceso' ? UI.iconBtn(svgIcons.bell, `Produccion.cancelarOP('${op.id}')`, 'Cancelar', 'red') : ''}
                      </div>
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

  renderGantt() {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    const totalDays = Math.ceil((endDate - startDate) / 86400000);

    const dayMs = 86400000;
    const getLeft = (dateStr) => {
      const d = new Date(dateStr + 'T00:00:00');
      return Math.max(0, Math.ceil((d - startDate) / dayMs));
    };
    const getWidth = (startStr, endStr) => {
      const s = new Date(startStr + 'T00:00:00');
      const e = new Date(endStr + 'T00:00:00');
      return Math.max(1, Math.ceil((e - s) / dayMs));
    };

    const todayLeft = Math.ceil((today - startDate) / dayMs);

    const stateColors = {
      'Planificada': 'bg-gray-400',
      'En Proceso': 'bg-blue-500',
      'QC': 'bg-yellow-500',
      'Completada': 'bg-green-500',
      'Cancelada': 'bg-red-400',
    };

    // Generate date labels
    const labels = [];
    for (let d = 0; d < totalDays; d += 5) {
      const date = new Date(startDate.getTime() + d * dayMs);
      labels.push({ day: d, label: date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' }) });
    }

    return `
      <div style="min-width: 500px;">
        <!-- Header dates -->
        <div class="relative h-6 mb-2 border-b border-gray-100 dark:border-night-700">
          ${labels.map(l => `
            <span class="absolute text-xs text-gray-400 transform -translate-x-1/2" style="left:${(l.day / totalDays * 100).toFixed(1)}%">${l.label}</span>
          `).join('')}
        </div>
        <!-- Today line marker -->
        <div class="relative">
          <div class="absolute top-0 bottom-0 w-0.5 bg-red-400 opacity-60 z-10" style="left:${(todayLeft / totalDays * 100).toFixed(1)}%"></div>
          <!-- OP Bars -->
          <div class="space-y-2">
            ${AppData.ordenes_produccion.map(op => {
              const left = getLeft(op.fecha_inicio);
              const width = getWidth(op.fecha_inicio, op.fecha_fin);
              const leftPct = (left / totalDays * 100).toFixed(1);
              const widthPct = Math.max(2, (width / totalDays * 100).toFixed(1));
              const prod = AppData.getProducto(op.producto_id);
              const color = stateColors[op.estado] || 'bg-gray-400';
              return `
                <div class="relative h-7 flex items-center">
                  <span class="text-xs text-gray-500 dark:text-gray-400 w-24 flex-shrink-0 truncate" title="${op.id}">${op.id}</span>
                  <div class="flex-1 relative h-5 bg-gray-50 dark:bg-night-700/30 rounded">
                    <div class="${color} h-full rounded text-white text-xs flex items-center px-2 overflow-hidden whitespace-nowrap cursor-pointer hover:opacity-80 transition-opacity"
                         style="position:absolute; left:${leftPct}%; width:${widthPct}%;"
                         title="${prod.nombre} — ${op.estado}"
                         onclick="Produccion.verOP('${op.id}')">
                      <span class="truncate">${prod.nombre}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-400">
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-gray-400 inline-block"></span>Planificada</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-blue-500 inline-block"></span>En Proceso</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-yellow-500 inline-block"></span>QC</span>
          <span class="flex items-center gap-1.5"><span class="w-3 h-2 rounded bg-green-500 inline-block"></span>Completada</span>
          <span class="flex items-center gap-1.5"><span class="w-0.5 h-4 bg-red-400 inline-block"></span>Hoy</span>
        </div>
      </div>
    `;
  },

  verOP(id) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;
    const prod = AppData.getProducto(op.producto_id);
    const estadoColor = { 'Planificada': 'gray', 'En Proceso': 'blue', 'QC': 'yellow', 'Completada': 'green', 'Cancelada': 'red' };
    const hayFaltante = op.bom.some(item => {
      const mat = AppData.getMaterial(item.material_id);
      return mat.stock < item.cantidad_req;
    });

    const html = `
      <div class="space-y-4">
        <div class="flex justify-between items-start">
          <div>
            <p class="text-xs text-gray-400">Orden de Producción</p>
            <p class="text-xl font-bold text-gray-800 dark:text-white">${op.id}</p>
          </div>
          ${UI.badge(op.estado, estadoColor[op.estado] || 'gray')}
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Producto</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${prod.nombre}</p>
            <p class="text-xs text-gray-400">Cantidad: ${op.cantidad}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Responsable</p>
            <p class="font-semibold text-gray-800 dark:text-gray-200">${op.operario}</p>
            <p class="text-xs text-gray-400">Prioridad: ${op.prioridad}</p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Fechas</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Inicio: <strong>${App.formatDate(op.fecha_inicio)}</strong></p>
            <p class="text-sm text-gray-700 dark:text-gray-300">Fin esp.: <strong>${App.formatDate(op.fecha_fin)}</strong></p>
          </div>
          <div class="p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
            <p class="text-xs text-gray-400 mb-1">Avance y Merma</p>
            ${UI.progressBar(op.avance, 100, op.avance >= 80 ? 'green' : 'blue')}
            <p class="text-xs text-gray-500 mt-1">Merma: <strong>${op.merma}%</strong>${op.costo_merma ? ` (S/ ${op.costo_merma.toFixed(2)})` : ''}</p>
          </div>
        </div>
        <!-- BOM -->
        <div>
          <p class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Lista de Materiales (BOM)</p>
          <div class="space-y-1">
            ${op.bom.map(item => {
              const mat = AppData.getMaterial(item.material_id);
              const available = mat.stock >= item.cantidad_req;
              return `
                <div class="flex items-center justify-between p-2 rounded-lg ${available ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'}">
                  <div class="flex items-center gap-2">
                    <span class="${available ? 'text-green-500' : 'text-red-500'}">${available ? '✓' : '✕'}</span>
                    <span class="text-sm text-gray-700 dark:text-gray-300">${mat.nombre || item.material_id}</span>
                  </div>
                  <div class="text-right flex items-center gap-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">${item.cantidad_req} ${mat.unidad || ''}</span>
                    <span class="text-xs text-gray-400">(stock: ${mat.stock})</span>
                    ${!available ? '<span class="text-xs font-semibold text-red-600 dark:text-red-400">Stock insuficiente</span>' : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
          ${hayFaltante ? '<p class="mt-2 text-xs font-semibold text-red-600 dark:text-red-400">&#9888; Hay materiales con stock insuficiente. No se puede iniciar producción.</p>' : ''}
        </div>
        ${op.estado !== 'Completada' && op.estado !== 'Cancelada' ? `
          <div class="flex gap-2 justify-end pt-2">
            ${op.estado === 'Planificada' ? (hayFaltante
              ? `<button disabled class="px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-400 rounded-lg cursor-not-allowed" title="Stock insuficiente para iniciar">Iniciar Produccion</button>`
              : `<button onclick="Produccion.cambiarEstado('${op.id}','En Proceso'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">Iniciar Produccion</button>`)
            : ''}
            ${op.estado === 'En Proceso' ? `<button onclick="Produccion.cambiarEstado('${op.id}','QC'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">Pasar a QC</button>` : ''}
            ${op.estado === 'QC' ? `<button onclick="Produccion.cambiarEstado('${op.id}','Completada'); App.closeModal();" class="px-3 py-1.5 text-xs font-medium bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">Completar</button>` : ''}
            ${op.estado === 'Planificada' || op.estado === 'En Proceso' ? `<button onclick="App.closeModal(); Produccion.cancelarOP('${op.id}');" class="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">Cancelar OP</button>` : ''}
          </div>
        ` : ''}
        ${op.estado === 'Cancelada' ? '<p class="text-center text-sm font-semibold text-red-600 dark:text-red-400 pt-2">Esta orden ha sido cancelada</p>' : ''}

        <!-- Cost link -->
        <div class="border-t border-gray-100 dark:border-night-700 pt-3 flex items-center justify-between">
          <div class="text-xs text-gray-400">
            ${(() => { const c = AppData.getCostoProducto(op.producto_id); return c ? `CP unitario: <strong class="text-brand-600">${App.formatCurrency(c.costoProduccion)}</strong> · CP total (${op.cantidad} uds): <strong class="text-brand-600">${App.formatCurrency(c.costoProduccion * op.cantidad)}</strong>` : 'Sin hoja de costo'; })()}
          </div>
          <button onclick="App.closeModal(); setTimeout(function(){ if(typeof Costos!=='undefined') Costos.verHojaCosto('${op.producto_id}'); }, 150)" class="text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 dark:bg-brand-900/20 px-3 py-1.5 rounded-lg transition-colors">Ver Hoja de Costo</button>
        </div>
      </div>
    `;
    App.showModal(html, null, `Detalle OP — ${op.id}`, true);
  },

  cambiarEstado(id, estado) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;

    // Stock deduction when transitioning Planificada → En Proceso
    if (op.estado === 'Planificada' && estado === 'En Proceso') {
      // Check all BOM materials have sufficient stock
      const faltantes = [];
      op.bom.forEach(item => {
        const mat = AppData.getMaterial(item.material_id);
        if (mat.stock < item.cantidad_req) {
          faltantes.push(`${mat.nombre || item.material_id}: necesita ${item.cantidad_req}, stock ${mat.stock}`);
        }
      });
      if (faltantes.length > 0) {
        App.showToast('Stock insuficiente: ' + faltantes.join('; '), 'error');
        return;
      }
      // Deduct stock and log to kardex
      const hoy = new Date().toISOString().split('T')[0];
      op.bom.forEach(item => {
        const mat = AppData.getMaterial(item.material_id);
        mat.stock -= item.cantidad_req;
        // Update material estado based on new stock
        if (mat.stock <= 0) mat.estado = 'Agotado';
        else if (mat.stock < mat.min_stock) mat.estado = 'Stock Bajo';
        else mat.estado = 'OK';
        // Log to kardex
        if (!AppData.kardex[item.material_id]) AppData.kardex[item.material_id] = [];
        AppData.kardex[item.material_id].push({
          fecha: hoy,
          tipo: 'Egreso',
          cantidad: -item.cantidad_req,
          saldo: mat.stock,
          referencia: op.id,
          usuario: op.operario
        });
      });
    }

    op.estado = estado;
    if (estado === 'Completada') {
      op.avance = 100;
      // Register production cost in Finanzas flujo_caja
      const costoInfo = AppData.getCostoProducto(op.producto_id);
      if (costoInfo) {
        const costoTotal = costoInfo.costoProduccion * op.cantidad;
        const mesActual = AppData.flujo_caja[AppData.flujo_caja.length - 1];
        if (mesActual) {
          mesActual.egresos += costoTotal;
          mesActual.saldo = mesActual.ingresos - mesActual.egresos;
        }
        AppData.logActividad('produccion', `OP ${id} completada — Costo produccion: ${App.formatCurrency(costoTotal)} (${op.cantidad} uds)`, 'produccion');
      }
    } else if (estado === 'QC') op.avance = 95;
    App.showToast(`OP ${id} → ${estado}`, 'success');
    Produccion.render();
  },

  actualizarOP(id) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;
    const hoja = AppData.getHojaCosto(op.producto_id);
    const procesos = hoja ? hoja.mano_obra : [];

    // Initialize process tracking if not exists
    if (!op.procesos_avance) {
      op.procesos_avance = procesos.map((p, i) => ({
        nro: p.nro || (i + 1),
        proceso: p.proceso,
        operario: p.operario_id,
        completado: false,
        fecha_completado: null,
        observacion: ''
      }));
    }

    const completados = op.procesos_avance.filter(p => p.completado).length;
    const totalProc = op.procesos_avance.length;

    const procesosHtml = totalProc > 0 ? op.procesos_avance.map((p, i) => {
      const emp = AppData.getEmpleado(p.operario);
      const empNombre = emp ? emp.nombre : (p.operario || 'Sin asignar');
      return `
        <div class="flex items-center gap-3 p-3 rounded-xl border ${p.completado ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/10' : 'border-gray-200 bg-white dark:border-night-600 dark:bg-night-700/50'} transition-all">
          <button onclick="Produccion._toggleProceso('${id}',${i})" class="w-7 h-7 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${p.completado ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-night-500 hover:border-brand-400'}">
            ${p.completado ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : ''}
          </button>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium ${p.completado ? 'text-green-700 dark:text-green-300 line-through' : 'text-gray-800 dark:text-white'}">${p.nro}. ${p.proceso}</p>
            <p class="text-[11px] text-gray-400">${empNombre}${p.fecha_completado ? ' — ' + App.formatDate(p.fecha_completado) : ''}</p>
          </div>
          <div class="shrink-0">
            <input type="text" placeholder="Obs." value="${p.observacion || ''}" onchange="Produccion._obsProcess('${id}',${i},this.value)" class="w-24 px-2 py-1 text-[11px] bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all" />
          </div>
        </div>`;
    }).join('') : '<p class="text-sm text-gray-400 text-center py-4">Este producto no tiene procesos definidos en su receta. Agregue procesos en la receta para hacer seguimiento por proceso.</p>';

    const html = `
      <div class="space-y-4">
        <!-- Progress summary -->
        <div class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-night-700/30 rounded-xl">
          <div class="flex-1">
            <div class="flex items-center justify-between mb-1">
              <span class="text-xs font-medium text-gray-600 dark:text-gray-300">Avance por procesos</span>
              <span class="text-sm font-bold ${completados === totalProc && totalProc > 0 ? 'text-green-600' : 'text-brand-600'}">${totalProc > 0 ? Math.round(completados / totalProc * 100) : op.avance}%</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-night-600 rounded-full h-2">
              <div class="${completados === totalProc && totalProc > 0 ? 'bg-green-500' : 'bg-brand-500'} h-2 rounded-full transition-all" style="width:${totalProc > 0 ? (completados / totalProc * 100) : op.avance}%"></div>
            </div>
            <p class="text-[11px] text-gray-400 mt-1">${completados} de ${totalProc} procesos completados</p>
          </div>
        </div>

        <!-- Process checklist -->
        <div>
          <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Procesos de fabricacion</p>
          <p class="text-[11px] text-gray-400 mb-3">Marque cada proceso cuando el operario lo complete. El avance se calcula automaticamente.</p>
          <div class="space-y-2 max-h-[350px] overflow-y-auto pr-1">
            ${procesosHtml}
          </div>
        </div>

        <!-- Merma -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-night-700">
          ${UI.input('uop-merma', 'number', 'Merma (%)', op.merma, '0.0')}
          ${totalProc === 0 ? UI.input('uop-avance-manual', 'number', 'Avance manual (%)', op.avance, '0-100') : ''}
        </div>
      </div>`;

    App.showModal(html, () => {
      const nuevaMerma = parseFloat(document.getElementById('uop-merma').value);
      op.merma = isNaN(nuevaMerma) ? op.merma : nuevaMerma;
      const costoInfo = AppData.getCostoProducto(op.producto_id);
      const costoTotal = costoInfo ? costoInfo.costoProduccion * op.cantidad : 0;
      op.costo_merma = op.merma * costoTotal / 100;

      if (totalProc > 0) {
        const complets = op.procesos_avance.filter(p => p.completado).length;
        op.avance = Math.round(complets / totalProc * 100);
      } else {
        const manualEl = document.getElementById('uop-avance-manual');
        if (manualEl) op.avance = parseInt(manualEl.value) || op.avance;
      }

      App.showToast(`OP ${id} actualizada — Avance: ${op.avance}% · Merma: ${op.merma}%`, 'success');
      Produccion.render();
    }, `Control de Avance — ${id}`);
  },

  _toggleProceso(opId, idx) {
    const op = AppData.ordenes_produccion.find(o => o.id === opId);
    if (!op || !op.procesos_avance) return;
    const proc = op.procesos_avance[idx];
    proc.completado = !proc.completado;
    proc.fecha_completado = proc.completado ? new Date().toISOString().split('T')[0] : null;

    // Update avance in real time
    const completados = op.procesos_avance.filter(p => p.completado).length;
    const total = op.procesos_avance.length;
    op.avance = Math.round(completados / total * 100);

    // Re-render the modal
    Produccion.actualizarOP(opId);
  },

  _obsProcess(opId, idx, val) {
    const op = AppData.ordenes_produccion.find(o => o.id === opId);
    if (!op || !op.procesos_avance) return;
    op.procesos_avance[idx].observacion = val;
  },

  cancelarOP(id) {
    const op = AppData.ordenes_produccion.find(o => o.id === id);
    if (!op) return;
    if (op.estado !== 'Planificada' && op.estado !== 'En Proceso') {
      App.showToast('Solo se pueden cancelar OPs en estado Planificada o En Proceso', 'error');
      return;
    }
    App.showModal(
      `<p class="text-sm text-gray-700 dark:text-gray-300">¿Está seguro de cancelar la OP <strong>${op.id}</strong>?</p>
       ${op.estado === 'En Proceso' ? '<p class="text-xs text-blue-600 dark:text-blue-400 mt-2">Los materiales consumidos serán devueltos al inventario.</p>' : ''}`,
      () => {
        // If En Proceso, return consumed materials to stock (reverse BOM deductions)
        if (op.estado === 'En Proceso') {
          const hoy = new Date().toISOString().split('T')[0];
          op.bom.forEach(item => {
            const mat = AppData.getMaterial(item.material_id);
            mat.stock += item.cantidad_req;
            // Update material estado
            if (mat.stock <= 0) mat.estado = 'Agotado';
            else if (mat.stock < mat.min_stock) mat.estado = 'Stock Bajo';
            else mat.estado = 'OK';
            // Log return to kardex
            if (!AppData.kardex[item.material_id]) AppData.kardex[item.material_id] = [];
            AppData.kardex[item.material_id].push({
              fecha: hoy,
              tipo: 'Ingreso',
              cantidad: item.cantidad_req,
              saldo: mat.stock,
              referencia: op.id + ' (Cancelación)',
              usuario: 'Sistema'
            });
          });
        }
        op.estado = 'Cancelada';
        op.avance = 0;
        App.showToast(`OP ${id} cancelada`, 'success');
        App.closeModal();
        Produccion.render();
      },
      `Cancelar OP — ${id}`
    );
  },

  showNuevaOP() {
    const prodOpts = AppData.productos.map(p => {
      const hoja = AppData.getHojaCosto(p.id);
      return `<option value="${p.id}">${p.nombre}${hoja ? ' ('+hoja.materiales.length+' mat.)' : ''}</option>`;
    }).join('');
    const opOpts = AppData.empleados.filter(e => e.area === 'Producción' && e.estado === 'Activo')
      .map(e => `<option value="${e.nombre}">${e.nombre} — ${e.cargo} (${e.tipo_personal || 'Fijo'})</option>`).join('');

    const html = `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Producto *</label>
          <select id="nop-prod" onchange="Produccion._previewBOM()" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
            <option value="">Seleccionar...</option>
            ${prodOpts}
          </select>
        </div>
        ${UI.input('nop-cant', 'number', 'Cantidad', '1', '', true)}
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Operario *</label>
          <select id="nop-op" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
            ${opOpts}
          </select>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Prioridad</label>
          <select id="nop-prio" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
            ${['Normal','Media','Alta'].map(p => `<option>${p}</option>`).join('')}
          </select>
        </div>
        ${UI.input('nop-inicio', 'date', 'Fecha Inicio', '', '', true)}
        ${UI.input('nop-fin', 'date', 'Fecha Fin Esperada', '', '', true)}
        <!-- BOM Preview -->
        <div class="sm:col-span-2" id="nop-bom-preview">
          <div class="p-4 bg-gray-50 dark:bg-night-700/50 rounded-xl text-center text-sm text-gray-400">
            <svg class="w-8 h-8 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Seleccione un producto para ver su BOM (lista de materiales)
          </div>
        </div>
      </div>
    `;
    App.showModal(html, () => {
      const prodId = document.getElementById('nop-prod').value;
      const cantidad = parseInt(document.getElementById('nop-cant').value);
      const operario = document.getElementById('nop-op').value;
      const fechaInicio = document.getElementById('nop-inicio').value;
      const fechaFin = document.getElementById('nop-fin').value;
      const prioridad = document.getElementById('nop-prio').value;

      const errores = [];
      if (!prodId) errores.push('Producto');
      if (!cantidad || cantidad < 1) errores.push('Cantidad (min. 1)');
      if (!operario) errores.push('Operario');
      if (!fechaInicio) errores.push('Fecha Inicio');
      if (!fechaFin) errores.push('Fecha Fin Esperada');
      if (fechaInicio && fechaFin && fechaFin < fechaInicio) errores.push('Fecha Fin debe ser posterior');

      if (errores.length > 0) { App.showToast('Campos requeridos: ' + errores.join(', '), 'error'); return; }

      // Generate BOM from hoja de costo (preferred) or from existing OPs
      let bomTemplate = [];
      const hoja = AppData.getHojaCosto(prodId);
      if (hoja) {
        bomTemplate = hoja.materiales.map(m => ({
          material_id: m.material_id,
          cantidad_req: Math.ceil(m.consumo * cantidad)
        }));
      } else {
        const opRef = AppData.ordenes_produccion.find(o => o.producto_id === prodId && o.bom.length > 0);
        if (opRef) {
          bomTemplate = opRef.bom.map(item => ({
            material_id: item.material_id,
            cantidad_req: Math.ceil(item.cantidad_req * cantidad / opRef.cantidad)
          }));
        }
      }

      const nuevaOP = {
        id: 'OP-2026-' + String(AppData.ordenes_produccion.length + 1).padStart(3, '0'),
        producto_id: prodId, ov_id: null, cantidad, fecha_inicio: fechaInicio,
        fecha_fin: fechaFin, estado: 'Planificada', operario, prioridad,
        avance: 0, merma: 0, costo_merma: 0, bom: bomTemplate,
      };
      AppData.ordenes_produccion.unshift(nuevaOP);
      App.showToast(`OP ${nuevaOP.id} creada con ${bomTemplate.length} materiales en BOM`, 'success');
      Produccion.render();
    }, 'Nueva Orden de Produccion', true);

    // Update BOM preview when quantity changes
    const cantInput = document.getElementById('nop-cant');
    if (cantInput) cantInput.addEventListener('input', () => Produccion._previewBOM());
  },

  _previewBOM() {
    const container = document.getElementById('nop-bom-preview');
    if (!container) return;
    const prodId = document.getElementById('nop-prod').value;
    const cantidad = parseInt(document.getElementById('nop-cant')?.value) || 1;
    if (!prodId) {
      container.innerHTML = '<div class="p-4 bg-gray-50 dark:bg-night-700/50 rounded-xl text-center text-sm text-gray-400">Seleccione un producto para ver su BOM</div>';
      return;
    }
    const hoja = AppData.getHojaCosto(prodId);
    const c = AppData.getCostoProducto(prodId);
    if (!hoja) {
      container.innerHTML = '<div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-sm text-yellow-700 dark:text-yellow-300 flex items-center gap-2"><svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg>Este producto no tiene hoja de costo. El BOM se generara de OPs anteriores o quedara vacio.</div>';
      return;
    }

    const matRows = hoja.materiales.map(m => {
      const mat = AppData.getMaterial(m.material_id);
      const req = Math.ceil(m.consumo * cantidad);
      const ok = mat.stock >= req;
      return `<tr class="${ok ? '' : 'bg-red-50/50 dark:bg-red-900/5'}">
        <td class="px-3 py-1.5 text-xs text-gray-800 dark:text-white">${mat.nombre || m.material_id}</td>
        <td class="px-3 py-1.5 text-xs text-right font-mono">${m.consumo}</td>
        <td class="px-3 py-1.5 text-xs text-right font-mono font-semibold">${req}</td>
        <td class="px-3 py-1.5 text-xs text-gray-500">${m.unidad}</td>
        <td class="px-3 py-1.5 text-xs text-right font-mono ${ok ? 'text-green-600' : 'text-red-600 font-semibold'}">${mat.stock}${!ok ? ' ⚠' : ''}</td>
        <td class="px-3 py-1.5 text-xs text-right font-mono">${App.formatCurrency(m.consumo * m.costo_unit * cantidad)}</td>
      </tr>`;
    }).join('');

    container.innerHTML = `
      <div class="border border-gray-200 dark:border-night-600 rounded-xl overflow-hidden">
        <div class="px-4 py-2.5 bg-gray-50 dark:bg-night-700/50 border-b border-gray-200 dark:border-night-600 flex items-center justify-between">
          <span class="text-xs font-bold text-gray-600 dark:text-gray-300">BOM — Lista de Materiales (${hoja.materiales.length} items)</span>
          ${c ? '<span class="text-xs font-mono text-brand-600">CP unitario: '+App.formatCurrency(c.costoProduccion)+' · Total: '+App.formatCurrency(c.costoProduccion * cantidad)+'</span>' : ''}
        </div>
        <table class="w-full">
          <thead><tr class="border-b border-gray-100 dark:border-night-700">
            <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Material</th>
            <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">x1 ud</th>
            <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">x${cantidad}</th>
            <th class="px-3 py-1.5 text-left text-[9px] font-mono text-gray-400 uppercase">Unid</th>
            <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Stock</th>
            <th class="px-3 py-1.5 text-right text-[9px] font-mono text-gray-400 uppercase">Costo</th>
          </tr></thead>
          <tbody class="divide-y divide-gray-50 dark:divide-night-700/50 text-xs">${matRows}</tbody>
        </table>
      </div>`;
  },

  searchOP(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#op-table tbody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },
};
