// ============================================================
// DESIGN SYSTEM SHOWCASE v2.0
// Catalogo completo: 35+ secciones con navegacion lateral
// ============================================================

const DesignSystem = {
  render() {
    const mc = document.getElementById('main-content');
    const has = fn => typeof UI[fn] === 'function';
    const hasErp = fn => UI.erp && typeof UI.erp[fn] === 'function';

    const W = inner => `<div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm p-6 lg:p-8">${inner}</div>`;
    const N = (n,t) => `<h3 class="text-base font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2.5"><span class="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 dark:bg-night-700 px-2.5 py-1 rounded-lg w-8 text-center">${n}</span>${t}</h3>`;
    const L = (t) => `<p class="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-3 mt-6 first:mt-0">${t}</p>`;

    // Disable main-content scroll, DS manages its own layout
    mc.style.overflow = 'hidden';
    mc.style.padding = '0';
    mc.innerHTML = `
    <div class="flex flex-col h-full">
      <div class="px-5 lg:px-7 pt-5 lg:pt-7 pb-3 flex-shrink-0">
        ${UI.sectionHeader('Design System','Catalogo completo de componentes UI — CITE MADERA ERP')}
      </div>
      <div class="flex gap-6 flex-1 min-h-0 px-5 lg:px-7">

        <!-- Side nav (sticky, scrolls independently) -->
        <nav class="hidden lg:block w-52 flex-shrink-0 overflow-y-auto pb-8">
          <div class="sticky top-4 space-y-0.5 max-h-[calc(100vh-120px)] overflow-y-auto pr-2 text-[13px]">
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-1 pb-2">Foundations</p>
            <a href="#ds-01" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Typography</a>
            <a href="#ds-02" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Colors</a>
            <a href="#ds-04" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Badges & Labels</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">Inputs & Forms</p>
            <a href="#ds-03" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Buttons</a>
            <a href="#ds-25" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Form Inputs</a>
            <a href="#ds-35" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Combobox</a>
            <a href="#ds-36" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">DatePicker</a>
            <a href="#ds-37" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Multi-Select</a>
            <a href="#ds-40" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">TimePicker</a>
            <a href="#ds-41" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Switch & Toggle</a>
            <a href="#ds-42" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Radio & Checkbox</a>
            <a href="#ds-43" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Number Input</a>
            <a href="#ds-44" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Currency Input</a>
            <a href="#ds-38" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">File Upload</a>
            <a href="#ds-39" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Slider</a>
            <a href="#ds-45" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Tag Input</a>
            <a href="#ds-46" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Color Picker</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">Data Display</p>
            <a href="#ds-06" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Cards & KPIs</a>
            <a href="#ds-07" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Table</a>
            <a href="#ds-13" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">List Group</a>
            <a href="#ds-28" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Tablas ERP (DataTable)</a>
            <a href="#ds-34" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">TanStack Features</a>
            <a href="#ds-29" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Timeline</a>
            <a href="#ds-47" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Sparkline</a>
            <a href="#ds-48" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Calendar</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">Navigation</p>
            <a href="#ds-08" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Tabs & Navbar</a>
            <a href="#ds-19" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Breadcrumb</a>
            <a href="#ds-14" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Pagination</a>
            <a href="#ds-49" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Stepper</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">Feedback</p>
            <a href="#ds-05" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Alerts</a>
            <a href="#ds-10" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Modal</a>
            <a href="#ds-11" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Drawer</a>
            <a href="#ds-12" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Dropdown</a>
            <a href="#ds-17" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Tooltip & Popover</a>
            <a href="#ds-50" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Toast</a>
            <a href="#ds-51" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Confirm Dialog</a>
            <a href="#ds-52" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Hover Card</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">Overlay & Layout</p>
            <a href="#ds-09" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Accordion</a>
            <a href="#ds-18" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Carousel</a>
            <a href="#ds-16" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Spinner & Skeleton</a>
            <a href="#ds-53" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Copy & Kbd</a>
            <a href="#ds-54" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Separator</a>
            <a href="#ds-55" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Bottom Sheet</a>
            <a href="#ds-56" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Command Palette (Cmd+K)</a>
            <a href="#ds-57" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Notification Center</a>
            <p class="font-mono text-[8px] font-bold uppercase tracking-widest text-gray-300 px-3 pt-4 pb-2">ERP Specific</p>
            <a href="#ds-29" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Status Timeline</a>
            <a href="#ds-30" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Doc Header</a>
            <a href="#ds-31" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Metric Cards</a>
            <a href="#ds-58" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Kanban Board</a>
            <a href="#ds-59" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Gantt Mini</a>
            <a href="#ds-22" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Team & Avatar</a>
            <a href="#ds-60" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Comments</a>
            <a href="#ds-61" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">QR Code</a>
            <a href="#ds-62" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Signature Pad</a>
            <a href="#ds-33" class="ds-nav block px-3 py-1.5 text-gray-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all">Charts</a>
          </div>
        </nav>

        <!-- Content (scrollable) -->
        <div class="flex-1 min-w-0 space-y-10 overflow-y-auto scroll-smooth pb-12" id="ds-content">

          <!-- ══════════ UI COMPONENTS ══════════ -->

          <!-- 01 Typography -->
          <section id="ds-01">${N('01','Tipografia')}${W(`
            <p class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Heading 1 — Sora 4xl Bold</p>
            <p class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Heading 2 — Sora 3xl Bold</p>
            <p class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">Heading 3 — Sora 2xl Bold</p>
            <p class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Heading 4 — xl Semibold</p>
            <p class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Heading 5 — lg Semibold</p>
            <hr class="border-gray-100 dark:border-night-700 my-4"/>
            <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">Body — 14px. El sistema ERP permite gestionar inventario, ventas, produccion y finanzas de manera eficiente.</p>
            <p class="text-xs text-gray-400 mb-2">Small — 12px muted. Texto secundario para metadatos.</p>
            <p class="font-mono text-sm text-gray-600 dark:text-gray-300 mb-2">Mono — IBM Plex Mono 14px para datos numericos</p>
            <p class="font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-gray-400">Label — Mono 10px uppercase tracking .12em</p>
          `)}</section>

          <!-- 02 Colors -->
          <section id="ds-02">${N('02','Colores')}${W(`
            ${L('Brand (Terracota)')}<div class="flex gap-2 mb-4 flex-wrap">${[50,100,200,300,400,500,600,700,800,900].map(s=>`<div class="text-center"><div class="w-12 h-12 rounded-xl bg-brand-${s} shadow-sm"></div><p class="text-[9px] font-mono text-gray-400 mt-1">${s}</p></div>`).join('')}</div>
            ${L('Accent (Sage)')}<div class="flex gap-2 mb-4 flex-wrap">${[50,100,200,300,400,500,600,700].map(s=>`<div class="text-center"><div class="w-12 h-12 rounded-xl bg-accent-${s} shadow-sm"></div><p class="text-[9px] font-mono text-gray-400 mt-1">${s}</p></div>`).join('')}</div>
            ${L('Night (Warm Brown)')}<div class="flex gap-2 flex-wrap">${[50,100,200,300,400,500,600,700,800,900].map(s=>`<div class="text-center"><div class="w-12 h-12 rounded-xl bg-night-${s} shadow-sm border border-gray-100 dark:border-night-600"></div><p class="text-[9px] font-mono text-gray-400 mt-1">${s}</p></div>`).join('')}</div>
            ${L('Semanticos')}<div class="flex gap-2 flex-wrap"><div class="text-center"><div class="w-12 h-12 rounded-xl bg-green-500 shadow-sm"></div><p class="text-[9px] text-gray-400 mt-1">Success</p></div><div class="text-center"><div class="w-12 h-12 rounded-xl bg-red-500 shadow-sm"></div><p class="text-[9px] text-gray-400 mt-1">Error</p></div><div class="text-center"><div class="w-12 h-12 rounded-xl bg-amber-400 shadow-sm"></div><p class="text-[9px] text-gray-400 mt-1">Warning</p></div><div class="text-center"><div class="w-12 h-12 rounded-xl bg-blue-500 shadow-sm"></div><p class="text-[9px] text-gray-400 mt-1">Info</p></div></div>
          `)}</section>

          <!-- 03 Buttons -->
          <section id="ds-03">${N('03','Botones')}${W(`
            ${L('Variantes')}<div class="flex flex-wrap items-center gap-3 mb-2">${UI.button('Primary','primary')} ${UI.button('Secondary','secondary')} ${UI.button('Outline','outline')} ${UI.button('Ghost','ghost')} ${UI.button('Danger','danger')} ${UI.button('Success','success')}</div>
            ${L('Con icono')}<div class="flex flex-wrap gap-3 mb-2">${UI.button('Nuevo','primary','','<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>')} ${UI.button('Exportar','outline','','<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>')}</div>
            ${has('buttonGroup') ? L('Button Group') + UI.buttonGroup([{label:'Diario',active:true},{label:'Semanal'},{label:'Mensual'},{label:'Anual'}]) : ''}
          `)}</section>

          <!-- 04 Badges -->
          <section id="ds-04">${N('04','Badges')}${W(`<div class="flex flex-wrap items-center gap-3">${['Activo|green','Pendiente|yellow','Cancelado|red','En proceso|blue','Completado|teal','Borrador|gray','Urgente|orange','Premium|brand','Revision|purple'].map(b=>{const[t,c]=b.split('|');return UI.badge(t,c)}).join(' ')}</div>`)}</section>

          <!-- 05 Alerts -->
          <section id="ds-05">${N('05','Alertas')}<div class="space-y-3">
            ${has('alert') ? UI.alert('Informacion: El sistema opera con normalidad.','info') + UI.alert('Exito: Orden OC-2026-015 aprobada correctamente.','success') + UI.alert('Atencion: 3 materiales con stock critico.','warning') + UI.alert('Error: Conexion al servidor interrumpida.','error') : '<div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-sm">Alerta de ejemplo (cargar ui2-overrides para version completa)</div>'}
          </div></section>

          <!-- 06 Cards -->
          <section id="ds-06">${N('06','Cards y KPIs')}
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              ${UI.kpiCard('Ventas Mes','S/ 45,320',12.5,'<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"/></svg>','brand','Marzo 2025')}
              ${UI.kpiCard('Cotizaciones','4 activas',2,'<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>')}
              ${UI.kpiCard('Produccion','5 OPs',null,'<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0"/></svg>','brand','2 completadas')}
              ${UI.kpiCard('Stock Bajo','4 items',-8,'<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>')}
            </div>
            ${UI.card('Card con header','<p class="text-sm text-gray-600 dark:text-gray-300">Card con titulo, subtitulo, contenido y acciones.</p>',UI.button('Ver mas','outline'),'Subtitulo descriptivo')}
          </section>

          <!-- 07 Table -->
          <section id="ds-07">${N('07','Tabla')}${UI.table(
            [{label:'Material',key:'n'},{label:'Stock',key:'s'},{label:'Precio',key:'p'},{label:'Estado',key:'st'}],
            [{n:'<b class="text-gray-800 dark:text-gray-100">MDF 18mm</b><br><span class="text-xs text-gray-400">Tableros</span>',s:'<span class="font-mono">12</span>',p:'<span class="font-mono">S/ 85.00</span>',st:UI.badge('Stock Bajo','yellow')},{n:'<b class="text-gray-800 dark:text-gray-100">Tornillo 2"</b><br><span class="text-xs text-gray-400">Ferreteria</span>',s:'<span class="font-mono">850</span>',p:'<span class="font-mono">S/ 0.12</span>',st:UI.badge('Disponible','green')},{n:'<b class="text-gray-800 dark:text-gray-100">Laca Brillante</b><br><span class="text-xs text-gray-400">Acabados</span>',s:'<span class="font-mono">3</span>',p:'<span class="font-mono">S/ 45.00</span>',st:UI.badge('Agotado','red')}]
          )}</section>

          <!-- 08 Tabs -->
          <section id="ds-08">${N('08','Tabs')}${W(UI.tabs([{id:'t1',label:'Cotizaciones'},{id:'t2',label:'Ordenes'},{id:'t3',label:'Facturas'},{id:'t4',label:'Clientes'}],'t1','void') + (has('navbar') ? '<div class="mt-6">'+UI.navbar([{id:'a',label:'General'},{id:'b',label:'Permisos'},{id:'c',label:'Auditoria'},{id:'d',label:'Config'}],'a')+'</div>' : ''))}</section>

          <!-- 09 Accordion -->
          <section id="ds-09">${N('09','Accordion')}${has('accordion') ? UI.accordion([{title:'Como se calcula el IGV?',content:'Se aplica 18% automaticamente sobre el subtotal de cada documento fiscal.'},{title:'Puedo modificar una OC aprobada?',content:'No. Debe anularse y crear una nueva para mantener la trazabilidad.'},{title:'Roles con acceso a costos?',content:'Administrador, Gerente y Contador. Configurable en Administracion > Roles.'}]) : W('<p class="text-sm text-gray-400">Componente disponible con ui2-overrides.js</p>')}</section>

          <!-- 10 Modal -->
          <section id="ds-10">${N('10','Modal')}${W(`<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Ventana modal con backdrop blur. Soporta tamanios sm/md/lg/xl y footer con acciones.</p><div class="flex gap-3">${UI.button('Modal pequeno','primary','DS._openModal("sm")')} ${UI.button('Modal mediano','secondary','DS._openModal("md")')} ${UI.button('Modal grande','outline','DS._openModal("lg")')}</div>`)}</section>

          <!-- 11 Drawer -->
          <section id="ds-11">${N('11','Drawer / Offcanvas')}${W(`<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Panel lateral deslizable desde la derecha. Ideal para edicion rapida de registros.</p><div class="flex gap-3">${UI.button('Abrir Drawer','primary','DS._openDrawer()')}</div>`)}</section>

          <!-- 12 Dropdown -->
          <section id="ds-12">${N('12','Dropdown')}${has('dropdown') ? W(`<div class="flex gap-4">${UI.dropdown(UI.button('Acciones','secondary'),[{label:'Editar'},{label:'Duplicar'},{label:'Exportar'},{divider:true},{label:'Eliminar',badge:'Peligro',badgeColor:'red'}])}</div>`) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 13 List Group -->
          <section id="ds-13">${N('13','List Group')}${has('listGroup') ? UI.listGroup([{icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>',title:'OC-2026-015',desc:'Maderera del Norte',value:'S/ 3,450',badge:'Aprobada',badgeColor:'green'},{icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',title:'COT-2026-045',desc:'Muebleria San Martin',value:'S/ 8,500',badge:'Enviada',badgeColor:'blue'},{icon:'<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1"/></svg>',title:'FAC-001-028',desc:'Vence en 5 dias',value:'S/ 12,400',badge:'Vencida',badgeColor:'red'}]) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 14 Pagination -->
          <section id="ds-14">${N('14','Paginacion')}${has('pagination') ? W('<div class="flex justify-center">'+UI.pagination(3,12,'void')+'</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 15 Progress -->
          <section id="ds-15">${N('15','Progress y Semaforo')}${W(`<div class="space-y-4 mb-6">${UI.progressBar(85,100,'brand')} ${UI.progressBar(60,100,'green')} ${UI.progressBar(25,100,'yellow')} ${UI.progressBar(8,100,'red')}</div><div class="flex items-center gap-8">${UI.semaforo('verde')} ${UI.semaforo('amarillo')} ${UI.semaforo('rojo')}</div>`)}</section>

          <!-- 16 Spinners -->
          <section id="ds-16">${N('16','Spinners y Skeleton')}${W(`${L('Spinners')}<div class="flex items-center gap-6 mb-4">${has('spinner') ? UI.spinner('sm')+UI.spinner('md')+UI.spinner('lg')+UI.spinner('xl') : '<div class="animate-spin w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full"></div>'}</div>${L('Skeleton Loaders')}<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">${UI.skeleton('card')} ${UI.skeleton('table')}</div>`)}</section>

          <!-- 17 Tooltips -->
          <section id="ds-17">${N('17','Tooltips')}${has('tooltip') ? W('<div class="flex items-center gap-4">'+UI.tooltip(UI.button('Hover aqui','secondary'),'Tooltip informativo')+' '+UI.tooltip('<span class="text-sm text-brand-600 font-semibold cursor-help underline decoration-dotted">IGV 18%</span>','Impuesto General a las Ventas')+'</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 18 Carousel -->
          <section id="ds-18">${N('18','Carousel')}${has('carousel') ? UI.carousel(['<div class="p-8 text-center"><p class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Inventario</p><p class="text-sm text-gray-500">Control de stock en tiempo real</p></div>','<div class="p-8 text-center"><p class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ventas</p><p class="text-sm text-gray-500">Cotizaciones, ordenes y facturas</p></div>','<div class="p-8 text-center"><p class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Produccion</p><p class="text-sm text-gray-500">Kanban, Gantt y BOM</p></div>']) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 19 Breadcrumb -->
          <section id="ds-19">${N('19','Breadcrumb')}${has('breadcrumb') ? W(UI.breadcrumb([{label:'ERP'},{label:'Ventas'},{label:'Cotizaciones'},{label:'COT-2026-045'}])) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- ══════════ EXTENDED UI ══════════ -->

          <!-- 20 Avatar -->
          <section id="ds-20">${N('20','Avatar')}${W(`
            ${L('Tamanos')}<div class="flex items-end gap-4 mb-4">${UI.avatar('Ana Torres','sm')} ${UI.avatar('Carlos Rodriguez','md')} ${UI.avatar('Maria Lopez','lg')}</div>
            ${L('Grupo de avatares')}<div class="flex -space-x-3">${['JP','ML','CD','AT','LR'].map(n=>'<div class="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-xs border-2 border-white dark:border-night-800" style="background:linear-gradient(135deg,#C0601E,#A84117)">'+n+'</div>').join('')}<div class="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-bold bg-gray-100 dark:bg-night-700 text-gray-500 border-2 border-white dark:border-night-800">+3</div></div>
            ${L('Rating')}<div class="flex items-center gap-6"><div class="flex gap-0.5">${UI.stars(5)}</div><div class="flex gap-0.5">${UI.stars(3)}</div><div class="flex gap-0.5">${UI.stars(1)}</div></div>
          `)}</section>

          <!-- 21 Card Actions -->
          <section id="ds-21">${N('21','Card Actions')}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${(function(){
                const rows1 = '<div class="space-y-2">'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Proveedor</span><span class="font-semibold text-gray-800 dark:text-gray-100">Maderera del Norte</span></div>'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Total</span><span class="font-mono font-bold text-gray-800 dark:text-gray-100">S/ 3,450.00</span></div>'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Estado</span>' + UI.badge("Pendiente","yellow") + '</div></div>'
                  + '<div class="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-night-700">' + UI.button("Aprobar","success") + UI.button("Rechazar","danger") + UI.button("Editar","ghost") + '</div>';
                const rows2 = '<div class="space-y-2">'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Cliente</span><span class="font-semibold text-gray-800 dark:text-gray-100">Muebleria San Martin</span></div>'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Monto</span><span class="font-mono font-bold text-gray-800 dark:text-gray-100">S/ 8,500.00</span></div>'
                  + '<div class="flex justify-between text-sm"><span class="text-gray-500">Vigencia</span><span class="text-gray-600">15 dias</span></div></div>'
                  + '<div class="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-night-700">' + UI.button("Convertir a OV","primary") + UI.button("PDF","outline") + '</div>';
                return UI.card("Orden de Compra", rows1, "", "OC-2026-015") + UI.card("Cotizacion", rows2, "", "COT-2026-045");
              })()}
            </div>
          </section>

          <!-- 22 Team -->
          <section id="ds-22">${N('22','Team Components')}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${hasErp('teamMember') ? [UI.erp.teamMember('Carlos Rodriguez','Maestro Carpintero','Produccion','Activo'),UI.erp.teamMember('Maria Lopez','Contadora','Administracion','Activo'),UI.erp.teamMember('Juan Perez','Vendedor','Ventas','Activo'),UI.erp.teamMember('Ana Torres','Almacenera','Logistica','Inactivo')].join('') : `<div class="bg-white dark:bg-night-800 rounded-2xl p-4 border border-gray-100 dark:border-night-700 flex items-center gap-4">${UI.avatar('Carlos R','md')}<div><p class="text-sm font-semibold text-gray-800 dark:text-gray-100">Carlos Rodriguez</p><p class="text-xs text-gray-400">Maestro Carpintero — Produccion</p></div>${UI.badge('Activo','green')}</div><div class="bg-white dark:bg-night-800 rounded-2xl p-4 border border-gray-100 dark:border-night-700 flex items-center gap-4">${UI.avatar('Maria L','md')}<div><p class="text-sm font-semibold text-gray-800 dark:text-gray-100">Maria Lopez</p><p class="text-xs text-gray-400">Contadora — Administracion</p></div>${UI.badge('Activo','green')}</div>`}
            </div>
          </section>

          <!-- 23 Flags -->
          <section id="ds-23">${N('23','Flags')}${W(`<div class="flex items-center gap-4 flex-wrap">${['PE|Peru','US|Estados Unidos','BR|Brasil','CO|Colombia','CL|Chile','MX|Mexico','AR|Argentina','EC|Ecuador'].map(f=>{const[c,n]=f.split('|');const flag=hasErp('flag')?UI.erp.flag(c):'<span class="text-lg">'+{PE:'&#127477;&#127466;',US:'&#127482;&#127480;',BR:'&#127463;&#127479;',CO:'&#127464;&#127476;',CL:'&#127464;&#127473;',MX:'&#127474;&#127485;',AR:'&#127462;&#127479;',EC:'&#127466;&#127464;'}[c]+'</span>';return '<div class="flex items-center gap-2 bg-gray-50 dark:bg-night-700 px-3 py-2 rounded-xl">'+flag+'<span class="text-sm text-gray-700 dark:text-gray-200">'+n+'</span></div>'}).join('')}</div>`)}</section>

          <!-- 24 Sidebar preview -->
          <section id="ds-24">${N('24','Sidebar')}${W(`<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Vista previa del sidebar del sistema. Muestra la estructura de navegacion con secciones agrupadas, iconos SVG, estados activos y tooltip en modo colapsado.</p><div class="flex gap-4"><div class="w-16 bg-night-900 rounded-2xl p-2 flex flex-col items-center gap-2 py-4"><div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:linear-gradient(135deg,#C0601E,#8a3512)"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></div><div class="w-px h-2 bg-night-700 my-1"></div>${['M4 5a1 1 0 011-1h4a1 1 0 011 1v4','M20 7l-8-4-8 4m16 0l-8 4','M16 11V7a4 4 0 00-8 0v4','M9 19v-6a2 2 0 00-2-2H5','M12 8c-1.657 0-3 .895-3 2'].map((d,i)=>'<div class="w-9 h-9 rounded-xl flex items-center justify-center '+(i===0?'bg-brand-600/20':'hover:bg-white/5')+' cursor-pointer transition-all"><svg class="w-4 h-4 '+(i===0?'text-brand-300':'text-night-400')+'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="'+d+'"/></svg></div>').join('')}</div><div class="w-56 bg-night-900 rounded-2xl p-4 flex flex-col gap-1"><div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background:linear-gradient(135deg,#C0601E,#8a3512)"><svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg></div><div><p class="text-[13px] font-bold text-white">CITE madera</p><p class="text-[8px] font-mono uppercase tracking-widest text-night-500">ERP v1.0</p></div></div>${['Dashboard|active','Inventario','Compras','Ventas'].map(n=>{const[label,state]=n.split('|');return '<div class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm '+(state==='active'?'bg-brand-600/15 text-brand-300':'text-night-400 hover:text-night-200')+' cursor-pointer transition-all"><div class="w-4 h-4 rounded bg-night-600"></div>'+label+'</div>'}).join('')}</div></div>`)}</section>

          <!-- ══════════ FORMS & TABLES ══════════ -->

          <!-- 25 Form Inputs -->
          <section id="ds-25">${N('25','Form Inputs')}${W(`
            ${L('Text, Email, Number, Date')}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">${UI.input('fi1','text','Nombre completo','Juan Perez','',true)} ${UI.input('fi2','email','Correo electronico','','correo@empresa.pe')} ${UI.input('fi3','number','Cantidad','50','Unidades')} ${UI.input('fi4','date','Fecha ingreso','2025-01-15')}</div>
            ${L('Select')}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">${UI.select('fi5',[{value:'',label:'Seleccionar...'},{value:'tableros',label:'Tableros'},{value:'ferreteria',label:'Ferreteria'},{value:'acabados',label:'Acabados'}],'','','Categoria')} ${UI.select('fi6',[{value:'admin',label:'Administrador'},{value:'gerente',label:'Gerente'},{value:'vendedor',label:'Vendedor'},{value:'almacenero',label:'Almacenero'}],'admin','','Rol')}</div>
            ${L('Textarea')}${UI.textarea ? UI.textarea('fi7','Notas / Observaciones','','Escriba aqui las notas...',3) : '<textarea class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl" rows="3" placeholder="Notas..."></textarea>'}
            ${L('Search')}<div class="max-w-md">${UI.searchInput('fi8','Buscar materiales, clientes, documentos...')}</div>
            ${L('Checkbox, Radio, Switch')}
            <div class="flex flex-wrap items-center gap-6 mt-2">
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400/40 accent-brand-600"/><span class="text-sm text-gray-700 dark:text-gray-300">Checkbox activo</span></label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-400/40 accent-brand-600"/><span class="text-sm text-gray-700 dark:text-gray-300">Checkbox</span></label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ds-radio" checked class="w-4 h-4 border-gray-300 text-brand-600 accent-brand-600"/><span class="text-sm text-gray-700 dark:text-gray-300">Radio A</span></label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="ds-radio" class="w-4 h-4 border-gray-300 text-brand-600 accent-brand-600"/><span class="text-sm text-gray-700 dark:text-gray-300">Radio B</span></label>
              <label class="flex items-center gap-2.5 cursor-pointer"><div class="w-9 h-5 bg-brand-500 rounded-full relative transition-colors"><span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform translate-x-4"></span></div><span class="text-sm text-gray-700 dark:text-gray-300">Switch on</span></label>
              <label class="flex items-center gap-2.5 cursor-pointer"><div class="w-9 h-5 bg-gray-200 dark:bg-night-600 rounded-full relative"><span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></span></div><span class="text-sm text-gray-700 dark:text-gray-300">Switch off</span></label>
            </div>
          `)}</section>

          <!-- 26 Validaciones -->
          <section id="ds-26">${N('26','Validaciones')}${W(`
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div><label class="text-xs font-medium text-gray-600 mb-1.5 block">Normal</label><input type="text" value="Juan Perez" class="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-200 transition-all"/></div>
              <div><label class="text-xs font-medium text-green-600 mb-1.5 block">Valido</label><input type="text" value="admin@citemadera.pe" class="w-full px-4 py-2.5 text-sm bg-green-50 border-2 border-green-300 rounded-xl text-green-700"/><p class="text-[11px] text-green-600 mt-1">Correo verificado</p></div>
              <div><label class="text-xs font-medium text-red-600 mb-1.5 block">Error</label><input type="text" value="" placeholder="Requerido" class="w-full px-4 py-2.5 text-sm bg-red-50 border-2 border-red-300 rounded-xl placeholder-red-300"/><p class="text-[11px] text-red-500 mt-1">Este campo es obligatorio</p></div>
            </div>
          `)}</section>

          <!-- 27 Estados -->
          <section id="ds-27">${N('27','Estados (Loading, Error, Success, Empty)')}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${W('<p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Loading</p><div class="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-night-700"><div class="animate-spin w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full"></div><span class="text-sm text-gray-500">Cargando datos...</span></div>')}
              ${W('<p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Success</p><div class="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200"><svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm text-green-700">Operacion completada</span></div>')}
              ${W('<p class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Error</p><div class="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><span class="text-sm text-red-700">Error al procesar</span></div>')}
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm"><p class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-6 pt-6 mb-0">Empty</p>${UI.emptyState('No hay registros')}</div>
            </div>
          </section>

          <!-- 28 Tablas ERP (DataTable avanzada) -->
          <section id="ds-28">${N('28','Tablas ERP — DataTable (TanStack/shadcn style)')}
            <div class="space-y-8">

              <!-- Tabla 1: Ordenes de Compra (con filter tabs) -->
              ${has('dataTable') ? UI.dataTable({
                id: 'dt-compras',
                title: 'Ordenes de Compra',
                subtitle: 'Gestiona las ordenes de compra a proveedores',
                toolbar: UI.button('Nueva OC','primary','','<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>'),
                filterTabs: [
                  {label:'Pendientes',key:'estado',value:'Pendiente'},
                  {label:'Aprobadas',key:'estado',value:'Aprobada'},
                  {label:'Recibidas',key:'estado',value:'Recibida'},
                ],
                bulkActions: [
                  {label:'Aprobar seleccion',onclick:'',color:'brand'},
                  {label:'Exportar',onclick:''},
                  {label:'Eliminar',onclick:'',color:'danger'},
                ],
                columns: [
                  {key:'id', label:'N OC', sortable:true, width:'120px'},
                  {key:'proveedor', label:'Proveedor', sortable:true, type:'avatar'},
                  {key:'fecha', label:'Fecha', sortable:true, type:'date'},
                  {key:'total', label:'Total', sortable:true, type:'currency'},
                  {key:'estado', label:'Estado', sortable:true, type:'badge'},
                ],
                data: [
                  {id:'OC-2026-015',proveedor:'Maderera del Norte',proveedor_sub:'RUC: 20456789012',fecha:'18/03/2025',total:3450,estado:'Pendiente',estado_color:'yellow'},
                  {id:'OC-2026-014',proveedor:'Ferreteria Central',proveedor_sub:'RUC: 20123456789',fecha:'15/03/2025',total:1280,estado:'Aprobada',estado_color:'green'},
                  {id:'OC-2026-013',proveedor:'Acabados Peru SAC',proveedor_sub:'RUC: 20987654321',fecha:'12/03/2025',total:890,estado:'Recibida',estado_color:'teal'},
                  {id:'OC-2026-012',proveedor:'Tornilleria Nacional',proveedor_sub:'RUC: 20345678901',fecha:'10/03/2025',total:560,estado:'Recibida',estado_color:'teal'},
                  {id:'OC-2026-011',proveedor:'Maderera del Norte',proveedor_sub:'RUC: 20456789012',fecha:'08/03/2025',total:4200,estado:'Aprobada',estado_color:'green'},
                  {id:'OC-2026-010',proveedor:'Lacas y Barnices',proveedor_sub:'RUC: 20567890123',fecha:'05/03/2025',total:1750,estado:'Pendiente',estado_color:'yellow'},
                  {id:'OC-2026-009',proveedor:'Bisagras Peru',proveedor_sub:'RUC: 20678901234',fecha:'03/03/2025',total:320,estado:'Recibida',estado_color:'teal'},
                  {id:'OC-2026-008',proveedor:'Vidrieria Industrial',proveedor_sub:'RUC: 20789012345',fecha:'01/03/2025',total:980,estado:'Aprobada',estado_color:'green'},
                ],
                pageSize: 5,
              }) : W('<p class="text-sm text-gray-400">DataTable disponible con ui2-overrides.js</p>')}

              <!-- Tabla 2: Inventario (compact, sin filter tabs) -->
              ${has('dataTable') ? UI.dataTable({
                id: 'dt-stock',
                title: 'Stock de Materiales',
                subtitle: '15 materiales registrados',
                columns: [
                  {key:'codigo', label:'SKU', sortable:true, width:'100px', render: (v) => '<span class="font-mono text-xs text-night-500">'+v+'</span>'},
                  {key:'nombre', label:'Material', sortable:true, type:'avatar'},
                  {key:'categoria', label:'Categoria', sortable:true},
                  {key:'stock', label:'Stock', sortable:true, render: (v, row) => {
                    const pct = Math.min(100, Math.round((v / Math.max(row.min || 50, 1)) * 100));
                    const color = pct > 60 ? 'bg-green-400' : pct > 25 ? 'bg-amber-400' : 'bg-red-400';
                    return '<div class="flex items-center gap-2"><span class="font-mono font-semibold text-night-800 dark:text-night-100 w-10 text-right">'+v+'</span><div class="w-16 bg-gray-100 dark:bg-night-600 rounded-full h-1.5"><div class="'+color+' h-1.5 rounded-full" style="width:'+pct+'%"></div></div></div>';
                  }},
                  {key:'precio', label:'Precio Unit', sortable:true, type:'currency'},
                  {key:'estado', label:'Estado', sortable:true, type:'badge'},
                ],
                data: [
                  {codigo:'MAT-001',nombre:'MDF 18mm',nombre_sub:'Tableros',categoria:'Tableros',stock:12,min:30,precio:85,estado:'Stock Bajo',estado_color:'yellow'},
                  {codigo:'MAT-002',nombre:'Tornillo 2"',nombre_sub:'Ciento',categoria:'Ferreteria',stock:850,min:200,precio:0.12,estado:'Disponible',estado_color:'green'},
                  {codigo:'MAT-003',nombre:'Laca Brillante',nombre_sub:'Galon',categoria:'Acabados',stock:3,min:10,precio:45,estado:'Agotado',estado_color:'red'},
                  {codigo:'MAT-004',nombre:'Bisagra 35mm',nombre_sub:'Unidad',categoria:'Ferreteria',stock:420,min:100,precio:3.50,estado:'Disponible',estado_color:'green'},
                  {codigo:'MAT-005',nombre:'Cola PVA',nombre_sub:'Kg',categoria:'Adhesivos',stock:25,min:10,precio:12,estado:'Disponible',estado_color:'green'},
                  {codigo:'MAT-006',nombre:'Triplay 4mm',nombre_sub:'Plancha',categoria:'Tableros',stock:8,min:15,precio:35,estado:'Stock Bajo',estado_color:'yellow'},
                  {codigo:'MAT-007',nombre:'Cerradura Tubular',nombre_sub:'Unidad',categoria:'Ferreteria',stock:45,min:20,precio:18.50,estado:'Disponible',estado_color:'green'},
                  {codigo:'MAT-008',nombre:'Thinner Acrilico',nombre_sub:'Galon',categoria:'Acabados',stock:0,min:5,precio:28,estado:'Agotado',estado_color:'red'},
                ],
                pageSize: 5,
              }) : ''}

              <!-- Tabla 3: Empleados (sin sort en algunas cols) -->
              ${has('dataTable') ? UI.dataTable({
                id: 'dt-rrhh',
                title: 'Equipo de Trabajo',
                subtitle: 'Planilla y asistencia del personal',
                filterTabs: [
                  {label:'Produccion',key:'departamento',value:'Produccion'},
                  {label:'Ventas',key:'departamento',value:'Ventas'},
                  {label:'Admin',key:'departamento',value:'Administracion'},
                ],
                columns: [
                  {key:'nombre', label:'Empleado', sortable:true, type:'avatar'},
                  {key:'cargo', label:'Cargo', sortable:true},
                  {key:'departamento', label:'Area', sortable:true},
                  {key:'salario', label:'Salario', sortable:true, type:'currency'},
                  {key:'asistencia', label:'Asistencia', sortable:false, render: (v) => {
                    const color = v >= 95 ? 'text-green-600' : v >= 80 ? 'text-amber-600' : 'text-red-600';
                    return '<span class="font-mono font-semibold '+color+'">'+v+'%</span>';
                  }},
                  {key:'estado', label:'Estado', type:'badge'},
                ],
                data: [
                  {nombre:'Carlos Rodriguez',nombre_sub:'EMP-001',cargo:'Maestro Carpintero',departamento:'Produccion',salario:2800,asistencia:98,estado:'Activo',estado_color:'green'},
                  {nombre:'Maria Lopez',nombre_sub:'EMP-002',cargo:'Contadora',departamento:'Administracion',salario:3500,asistencia:100,estado:'Activo',estado_color:'green'},
                  {nombre:'Juan Perez',nombre_sub:'EMP-003',cargo:'Vendedor Senior',departamento:'Ventas',salario:2200,asistencia:95,estado:'Activo',estado_color:'green'},
                  {nombre:'Ana Torres',nombre_sub:'EMP-004',cargo:'Almacenera',departamento:'Produccion',salario:1800,asistencia:92,estado:'Activo',estado_color:'green'},
                  {nombre:'Luis Paredes',nombre_sub:'EMP-005',cargo:'Operario',departamento:'Produccion',salario:1600,asistencia:85,estado:'Activo',estado_color:'green'},
                  {nombre:'Rosa Diaz',nombre_sub:'EMP-006',cargo:'Asistente Admin',departamento:'Administracion',salario:1500,asistencia:78,estado:'Inactivo',estado_color:'gray'},
                ],
                pageSize: 4,
              }) : ''}

            </div>
          </section>

          <!-- ══════════ ERP SPECIFIC ══════════ -->

          <!-- 29 Timeline -->
          <section id="ds-29">${N('29','Status Timeline (ERP)')}${hasErp('statusTimeline') ? W('<p class="text-sm text-gray-600 dark:text-gray-300 mb-6">Flujo de estados para documentos:</p>'+UI.erp.statusTimeline(['Borrador','Enviada','Aprobada','En Produccion','Entregada'],2)+'<div class="mt-8">'+UI.erp.statusTimeline(['Pendiente','Aprobada','Recibida'],1)+'</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 30 Doc Header -->
          <section id="ds-30">${N('30','Document Header (ERP)')}${hasErp('docHeader') ? W(UI.erp.docHeader('COTIZACION','COT-2026-045','Enviada','blue','20 Mar 2025')+'<hr class="border-gray-100 dark:border-night-700 my-4"/>'+UI.erp.docHeader('FACTURA','F001-000028','Pagada','green','15 Mar 2025')+'<hr class="border-gray-100 dark:border-night-700 my-4"/>'+UI.erp.docHeader('ORDEN COMPRA','OC-2026-015','Pendiente','yellow','18 Mar 2025')) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 31 Metrics -->
          <section id="ds-31">${N('31','Metric Cards (ERP)')}${hasErp('metricCard') ? '<div class="grid grid-cols-2 lg:grid-cols-4 gap-4">'+UI.erp.metricCard('Saldo Caja','S/ 85,200','+12% mes','up')+UI.erp.metricCard('Por Cobrar','S/ 24,800','3 vencidas','down')+UI.erp.metricCard('Margen','34%','+2pp','up')+UI.erp.metricCard('Asistencia','96%','8 empleados','up')+'</div>' : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 32 DataTable Features Demo -->
          <section id="ds-32">${N('32','DataTable Features — Demo Interactiva')}
            <div class="mb-6">
              ${W(`
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div class="text-center p-3 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200/30">
                    <svg class="w-6 h-6 mx-auto text-brand-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
                    <p class="text-[11px] font-semibold text-brand-700 dark:text-brand-300">Ordenar</p>
                    <p class="text-[9px] text-brand-500 mt-0.5">Click en header</p>
                  </div>
                  <div class="text-center p-3 rounded-xl bg-accent-50 dark:bg-accent-900/20 border border-accent-200/30">
                    <svg class="w-6 h-6 mx-auto text-accent-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <p class="text-[11px] font-semibold text-accent-700 dark:text-accent-300">Buscar</p>
                    <p class="text-[9px] text-accent-500 mt-0.5">Input superior</p>
                  </div>
                  <div class="text-center p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200/30">
                    <svg class="w-6 h-6 mx-auto text-amber-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                    <p class="text-[11px] font-semibold text-amber-700 dark:text-amber-300">Filtrar</p>
                    <p class="text-[9px] text-amber-500 mt-0.5">Tabs rapidos</p>
                  </div>
                  <div class="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200/30">
                    <svg class="w-6 h-6 mx-auto text-blue-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <p class="text-[11px] font-semibold text-blue-700 dark:text-blue-300">Seleccionar</p>
                    <p class="text-[9px] text-blue-500 mt-0.5">Checkboxes</p>
                  </div>
                  <div class="text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200/30">
                    <svg class="w-6 h-6 mx-auto text-purple-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35"/><circle cx="12" cy="12" r="3"/></svg>
                    <p class="text-[11px] font-semibold text-purple-700 dark:text-purple-300">Columnas</p>
                    <p class="text-[9px] text-purple-500 mt-0.5">Mostrar/ocultar</p>
                  </div>
                  <div class="text-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200/30">
                    <svg class="w-6 h-6 mx-auto text-green-500 mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
                    <p class="text-[11px] font-semibold text-green-700 dark:text-green-300">Acciones</p>
                    <p class="text-[9px] text-green-500 mt-0.5">Menu por fila</p>
                  </div>
                </div>
              `)}
            </div>
            ${has('dataTable') ? UI.dataTable({
              id: 'dt-demo',
              title: 'Facturas Emitidas',
              subtitle: 'Prueba todas las funciones: ordena, busca, filtra, selecciona filas, oculta columnas',
              toolbar: UI.button('Nueva Factura','primary','','<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>') + ' ' + UI.button('Exportar CSV','outline','','<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>'),
              filterTabs: [
                {label:'Pendientes',key:'estado',value:'Pendiente'},
                {label:'Pagadas',key:'estado',value:'Pagada'},
                {label:'Vencidas',key:'estado',value:'Vencida'},
                {label:'Anuladas',key:'estado',value:'Anulada'},
              ],
              bulkActions: [
                {label:'Marcar como cobradas',onclick:'UI.toast("Cobro registrado para las facturas seleccionadas","success")'},
                {label:'Enviar recordatorio',onclick:'UI.toast("Recordatorios enviados","info")'},
                {label:'Exportar seleccion',onclick:'UI.toast("Exportando...","info")'},
                {label:'Anular',onclick:'',color:'danger'},
              ],
              columns: [
                {key:'numero', label:'N Factura', sortable:true, width:'140px', render: (v) => '<span class="font-mono font-bold text-night-800 dark:text-night-100">'+v+'</span>'},
                {key:'cliente', label:'Cliente', sortable:true, type:'avatar'},
                {key:'fecha', label:'Emision', sortable:true, type:'date'},
                {key:'vencimiento', label:'Vencimiento', sortable:true, type:'date'},
                {key:'subtotal', label:'Subtotal', sortable:true, type:'currency', hidden:true},
                {key:'igv', label:'IGV', sortable:true, type:'currency', hidden:true},
                {key:'total', label:'Total', sortable:true, type:'currency'},
                {key:'pagado', label:'Pagado', sortable:true, type:'currency'},
                {key:'saldo', label:'Saldo', sortable:true, render: (v) => {
                  if (v <= 0) return '<span class="font-mono text-green-600 font-semibold">S/ 0.00</span>';
                  return '<span class="font-mono text-red-600 font-semibold">S/ ' + Number(v).toLocaleString('es-PE',{minimumFractionDigits:2}) + '</span>';
                }},
                {key:'estado', label:'Estado', sortable:true, type:'badge'},
                {key:'metodo', label:'Metodo Pago', sortable:true, hidden:true},
              ],
              data: [
                {numero:'F001-000028',cliente:'Muebleria San Martin',cliente_sub:'RUC: 20112233445',fecha:'15/03/2025',vencimiento:'14/04/2025',subtotal:10169.49,igv:1830.51,total:12000,pagado:12000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Transferencia'},
                {numero:'F001-000027',cliente:'Constructora Horizonte',cliente_sub:'RUC: 20556677889',fecha:'12/03/2025',vencimiento:'11/04/2025',subtotal:7203.39,igv:1296.61,total:8500,pagado:0,saldo:8500,estado:'Pendiente',estado_color:'yellow',metodo:'-'},
                {numero:'F001-000026',cliente:'Hotel Costa del Sol',cliente_sub:'RUC: 20998877665',fecha:'08/03/2025',vencimiento:'07/04/2025',subtotal:20338.98,igv:3661.02,total:24000,pagado:12000,saldo:12000,estado:'Pendiente',estado_color:'yellow',metodo:'Parcial'},
                {numero:'F001-000025',cliente:'Municipalidad Trujillo',cliente_sub:'RUC: 20145678903',fecha:'05/03/2025',vencimiento:'04/04/2025',subtotal:4237.29,igv:762.71,total:5000,pagado:5000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Cheque'},
                {numero:'F001-000024',cliente:'Restaurant El Mochica',cliente_sub:'RUC: 20334455667',fecha:'01/03/2025',vencimiento:'31/03/2025',subtotal:2542.37,igv:457.63,total:3000,pagado:0,saldo:3000,estado:'Vencida',estado_color:'red',metodo:'-'},
                {numero:'F001-000023',cliente:'Colegio San Agustin',cliente_sub:'RUC: 20778899001',fecha:'25/02/2025',vencimiento:'27/03/2025',subtotal:12711.86,igv:2288.14,total:15000,pagado:15000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Deposito'},
                {numero:'F001-000022',cliente:'Clinica La Esperanza',cliente_sub:'RUC: 20667788990',fecha:'20/02/2025',vencimiento:'22/03/2025',subtotal:5932.20,igv:1067.80,total:7000,pagado:0,saldo:7000,estado:'Vencida',estado_color:'red',metodo:'-'},
                {numero:'F001-000021',cliente:'Tienda Decor Home',cliente_sub:'RUC: 20223344556',fecha:'15/02/2025',vencimiento:'17/03/2025',subtotal:1694.92,igv:305.08,total:2000,pagado:2000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Efectivo'},
                {numero:'F001-000020',cliente:'Muebleria San Martin',cliente_sub:'RUC: 20112233445',fecha:'10/02/2025',vencimiento:'12/03/2025',subtotal:3389.83,igv:610.17,total:4000,pagado:4000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Transferencia'},
                {numero:'F001-000019',cliente:'Inmobiliaria Costas',cliente_sub:'RUC: 20889900112',fecha:'05/02/2025',vencimiento:'07/03/2025',subtotal:16949.15,igv:3050.85,total:20000,pagado:10000,saldo:10000,estado:'Vencida',estado_color:'red',metodo:'Parcial'},
                {numero:'F001-000018',cliente:'Constructora Horizonte',cliente_sub:'RUC: 20556677889',fecha:'01/02/2025',vencimiento:'03/03/2025',subtotal:4661.02,igv:838.98,total:5500,pagado:0,saldo:5500,estado:'Anulada',estado_color:'gray',metodo:'-'},
                {numero:'F001-000017',cliente:'Hotel Costa del Sol',cliente_sub:'RUC: 20998877665',fecha:'28/01/2025',vencimiento:'27/02/2025',subtotal:8474.58,igv:1525.42,total:10000,pagado:10000,saldo:0,estado:'Pagada',estado_color:'green',metodo:'Transferencia'},
              ],
              pageSize: 6,
            }) : W('<p class="text-sm text-gray-400">DataTable disponible con ui2-overrides.js</p>')}
            <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Ordenar columnas</p><p class="text-xs text-gray-500 leading-relaxed">Haz clic en cualquier encabezado de columna. El primer clic ordena ascendente (↑), el segundo descendente (↓). La columna activa se resalta en color brand.</p>')}
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Buscar globalmente</p><p class="text-xs text-gray-500 leading-relaxed">Escribe en el input "Buscar..." para filtrar en todas las columnas simultaneamente. Los resultados se actualizan en tiempo real.</p>')}
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Filtros rapidos (tabs)</p><p class="text-xs text-gray-500 leading-relaxed">Usa los tabs debajo del toolbar (Pendientes, Pagadas, Vencidas, Anuladas) para filtrar por estado. Se combina con la busqueda.</p>')}
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Seleccionar filas</p><p class="text-xs text-gray-500 leading-relaxed">Marca checkboxes individuales o el del header para seleccionar todo. Aparece una barra de acciones masivas: cobrar, enviar recordatorio, exportar, anular.</p>')}
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Columnas visibles</p><p class="text-xs text-gray-500 leading-relaxed">Haz clic en el icono de engranaje para mostrar/ocultar columnas. Por defecto Subtotal, IGV y Metodo estan ocultas. Activalas para ver mas datos.</p>')}
              ${W('<p class="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">Acciones por fila</p><p class="text-xs text-gray-500 leading-relaxed">Hover sobre cualquier fila para ver el boton de 3 puntos. Haz clic para abrir el menu contextual: Ver detalle, Editar, Eliminar.</p>')}
            </div>
          </section>

          <!-- 33 Charts -->
          <section id="ds-33">${N('33','Charts (Dashboard ERP)')}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              ${W('<p class="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-4">Ventas Mensuales (Line)</p><canvas id="ds-chart-line" height="180"></canvas>')}
              ${W('<p class="font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-4">Distribucion por Categoria (Donut)</p><canvas id="ds-chart-donut" height="180"></canvas>')}
            </div>
          </section>

          <!-- ══════════ NEW v2.1 COMPONENTS ══════════ -->

          <!-- 35 Combobox -->
          <section id="ds-35">${N('35','Combobox / Autocomplete')}
            ${has('combobox') ? W(`
              <p class="text-sm text-gray-500 mb-6">Select personalizado con busqueda, imagenes, avatares, badges y descripcion. Reemplaza el select nativo del browser.</p>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Con descripcion + busqueda</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>${UI.combobox('cb-prov', [
                  {value:'prov1', label:'Maderera del Norte', desc:'RUC: 20456789012 — Trujillo'},
                  {value:'prov2', label:'Ferreteria Central', desc:'RUC: 20123456789 — Lima'},
                  {value:'prov3', label:'Acabados Peru SAC', desc:'RUC: 20987654321 — Arequipa'},
                  {value:'prov4', label:'Tornilleria Nacional', desc:'RUC: 20345678901 — Chiclayo'},
                  {value:'prov5', label:'Bisagras Peru', desc:'RUC: 20678901234 — Lima'},
                ], {label:'Proveedor', placeholder:'Buscar proveedor...', value:'prov1', searchable:true})}</div>
                <div>${UI.combobox('cb-cat', [
                  {value:'tableros', label:'Tableros'},
                  {value:'ferreteria', label:'Ferreteria'},
                  {value:'acabados', label:'Acabados'},
                  {value:'adhesivos', label:'Adhesivos'},
                  {value:'herrajes', label:'Herrajes'},
                ], {label:'Categoria', placeholder:'Seleccionar...', searchable:false})}</div>
              </div>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Con avatares</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>${UI.combobox('cb-emp', [
                  {value:'emp1', avatar:'Carlos Rodriguez', label:'Carlos Rodriguez', desc:'Maestro Carpintero — Produccion'},
                  {value:'emp2', avatar:'Maria Lopez', label:'Maria Lopez', desc:'Contadora — Administracion'},
                  {value:'emp3', avatar:'Juan Perez', label:'Juan Perez', desc:'Vendedor Senior — Ventas'},
                  {value:'emp4', avatar:'Ana Torres', label:'Ana Torres', desc:'Almacenera — Produccion'},
                  {value:'emp5', avatar:'Luis Paredes', label:'Luis Paredes', desc:'Operario — Produccion'},
                ], {label:'Asignar operario', placeholder:'Buscar empleado...', searchable:true})}</div>
                <div>${UI.combobox('cb-client', [
                  {value:'cl1', avatar:'Muebleria SM', label:'Muebleria San Martin', desc:'Lima — Credito 30 dias', badge:'VIP', badgeColor:'brand'},
                  {value:'cl2', avatar:'Hotel Libertad', label:'Hotel Libertad', desc:'Trujillo — Credito 60 dias', badge:'Premium', badgeColor:'green'},
                  {value:'cl3', avatar:'Rest Sabores', label:'Restaurant Sabores', desc:'Lima — Contado'},
                  {value:'cl4', avatar:'Ofic Central', label:'Oficinas Central SAC', desc:'Trujillo — Credito 30 dias'},
                ], {label:'Cliente', placeholder:'Buscar cliente...', searchable:true})}</div>
              </div>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Con imagenes (productos)</p>
              <div class="max-w-sm">
                ${UI.combobox('cb-prod', [
                  {value:'p1', img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=80&h=80&fit=crop', label:'Sofa 3 Cuerpos', desc:'SKU: PROD-001 — S/ 2,800'},
                  {value:'p2', img:'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&h=80&fit=crop', label:'Mesa de Centro', desc:'SKU: PROD-002 — S/ 1,200'},
                  {value:'p3', img:'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=80&h=80&fit=crop', label:'Escritorio Ejecutivo', desc:'SKU: PROD-003 — S/ 3,500'},
                  {value:'p4', img:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=80&h=80&fit=crop', label:'Estante Modular', desc:'SKU: PROD-004 — S/ 950'},
                ], {label:'Producto', placeholder:'Buscar producto...', searchable:true})}
              </div>
              <p class="text-[11px] text-gray-400 mt-3">Soporta: busqueda, avatares (iniciales), imagenes (url), badges de estado, descripcion multilínea, checkmark en seleccionado.</p>
            `) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 36 DatePicker -->
          <section id="ds-36">${N('36','DatePicker (Calendario avanzado)')}
            ${has('datePicker') ? W(`
              <p class="text-sm text-gray-500 mb-6">Selector de fecha con calendario, navegacion mes/anio/decada, presets rapidos y modo rango.</p>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Basico (fecha simple)</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>${UI.datePicker('dp-simple1', {label:'Fecha de emision', value:'20/03/2025', required:true})}</div>
                <div>${UI.datePicker('dp-simple2', {label:'Fecha de vencimiento', placeholder:'Seleccionar fecha...'})}</div>
              </div>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Con presets rapidos (ultima semana, mes, anio)</p>
              <div class="max-w-md mb-8">
                ${UI.datePicker('dp-presets', {label:'Periodo de reporte', placeholder:'Seleccionar periodo...', presets:true})}
              </div>

              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Date Range (rango de fechas)</p>
              <div class="max-w-md">
                ${UI.datePicker('dp-range', {label:'Rango de fechas', placeholder:'Inicio — Fin', presets:true, range:true})}
              </div>
              <p class="text-[11px] text-gray-400 mt-3">Click en el titulo del mes para ver meses, click en el anio para ver decada. En modo rango: click primero = inicio, segundo = fin. Los presets aplican rangos automaticos (ult. 7 dias, mes, anio).</p>
            `) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 37 Multi-Select -->
          <section id="ds-37">${N('37','Multi-Select (Tags)')}
            ${has('multiSelect') ? W(`
              <p class="text-sm text-gray-500 mb-4">Seleccion multiple con tags removibles y busqueda. Ideal para categorias, etiquetas, asignaciones.</p>
              <div class="max-w-md">
                ${UI.multiSelect('ms-cats', [
                  {value:'madera', label:'Madera'},
                  {value:'melamina', label:'Melamina'},
                  {value:'mdf', label:'MDF'},
                  {value:'triplay', label:'Triplay'},
                  {value:'pino', label:'Pino'},
                  {value:'cedro', label:'Cedro'},
                  {value:'tornillo', label:'Tornillo'},
                  {value:'roble', label:'Roble'},
                ], {label:'Tipos de madera', value:['madera','mdf'], placeholder:'Agregar tipo...'})}
              </div>
              <p class="text-[11px] text-gray-400 mt-3">Click en X para remover tags. Escribe para filtrar opciones disponibles. Limite maximo configurable.</p>
            `) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 38 File Upload -->
          <section id="ds-38">${N('38','File Upload')}
            ${has('fileUpload') ? W(`
              <p class="text-sm text-gray-500 mb-4">Zona de carga con drag & drop, preview de archivos y validacion de tipo/tamanio.</p>
              <div class="max-w-lg">
                ${UI.fileUpload('fu-docs', {label:'Documentos adjuntos', accept:'image/*,.pdf,.xlsx', maxSize:'10MB', multiple:true})}
              </div>
            `) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 39 Slider + Avatar Group + Button Loading -->
          <section id="ds-39">${N('39','Slider, Avatar Group y Button Loading')}
            ${W(`
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-4">Slider / Range</p>
                  ${has('slider') ? UI.slider('sl1', {label:'Precio maximo (S/)', value:3500, min:0, max:10000, step:100}) : '<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>'}
                  <div class="mt-4">${has('slider') ? UI.slider('sl2', {label:'Descuento (%)', value:15, min:0, max:50, step:5}) : ''}</div>
                </div>
                <div>
                  <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-4">Avatar Group</p>
                  ${has('avatarGroup') ? `
                    <div class="space-y-4">
                      <div><p class="text-xs text-gray-400 mb-2">Equipo de produccion</p>${UI.avatarGroup(['Carlos Rodriguez','Ana Torres','Luis Paredes','Pedro Ramos','Sofia Chen'])}</div>
                      <div><p class="text-xs text-gray-400 mb-2">Proyecto sala conferencia</p>${UI.avatarGroup(['Juan Perez','Maria Lopez','Carlos Rodriguez','Ana Torres','Luis Paredes','Pedro Ramos','Sofia Chen','Rosa Diaz'], 5)}</div>
                    </div>
                  ` : '<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>'}
                </div>
              </div>
              <div class="mt-8">
                <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-4">Button Loading States</p>
                <div class="flex flex-wrap gap-3">
                  ${has('buttonLoading') ? UI.buttonLoading('Guardar cambios', 'Guardando...', 'primary', 'bl1') : UI.button('Guardar','primary')}
                  ${has('buttonLoading') ? UI.buttonLoading('Exportar PDF', 'Exportando...', 'outline', 'bl2') : ''}
                </div>
                <p class="text-[11px] text-gray-400 mt-2">Click en el boton para ver el estado loading (spinner + texto). Se restaura automaticamente despues de 2 segundos.</p>
              </div>
            `)}</section>

          <!-- 34 TanStack Advanced Features -->
          <section id="ds-34">${N('34','DataTable Advanced — TanStack Features')}
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Funcionalidades avanzadas inspiradas en TanStack Table: expansion de filas, edicion inline, pinning de columnas, agrupamiento y resize.</p>

            <!-- Row Expansion -->
            <div class="mb-8">
              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Row Expansion (Detalle expandible)</p>
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
                <table class="w-full text-sm">
                  <thead><tr class="border-b border-gray-100 dark:border-night-700">
                    <th class="w-10 px-3 py-3"></th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Orden</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Cliente</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Total</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Estado</th>
                  </tr></thead>
                  <tbody>
                    <tr class="border-b border-gray-50 dark:border-night-700/50 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-night-700/20" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.chevron').classList.toggle('rotate-90')">
                      <td class="px-3 py-3"><svg class="chevron w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></td>
                      <td class="px-4 py-3 font-mono font-semibold text-night-800 dark:text-night-100">OV-2026-032</td>
                      <td class="px-4 py-3"><div class="flex items-center gap-2">${UI.avatar('Muebleria SM','sm')}<span class="text-night-700 dark:text-night-200">Muebleria San Martin</span></div></td>
                      <td class="px-4 py-3 font-mono font-semibold text-night-800 dark:text-night-100">S/ 8,500.00</td>
                      <td class="px-4 py-3">${UI.badge('En Produccion','blue')}</td>
                    </tr>
                    <tr class="hidden">
                      <td colspan="5" class="px-6 py-5 bg-gray-50/50 dark:bg-night-700/20">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div><p class="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-1">Vendedor</p><p class="text-sm text-night-700 dark:text-night-200">Juan Perez</p></div>
                          <div><p class="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-1">Fecha</p><p class="text-sm font-mono text-night-700 dark:text-night-200">18/03/2025</p></div>
                          <div><p class="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-1">Entrega estimada</p><p class="text-sm font-mono text-night-700 dark:text-night-200">28/03/2025</p></div>
                        </div>
                        <p class="font-mono text-[9px] uppercase tracking-wider text-gray-400 mb-2">Productos</p>
                        <table class="w-full text-xs">
                          <thead><tr class="border-b border-gray-200 dark:border-night-600"><th class="text-left py-1.5 text-gray-400 font-medium">Item</th><th class="text-right py-1.5 text-gray-400 font-medium">Cant</th><th class="text-right py-1.5 text-gray-400 font-medium">P.Unit</th><th class="text-right py-1.5 text-gray-400 font-medium">Subtotal</th></tr></thead>
                          <tbody>
                            <tr class="border-b border-gray-100 dark:border-night-700/30"><td class="py-1.5 text-night-700 dark:text-night-200">Mesa de conferencia roble</td><td class="text-right font-mono">2</td><td class="text-right font-mono">S/ 2,800</td><td class="text-right font-mono font-semibold">S/ 5,600</td></tr>
                            <tr class="border-b border-gray-100 dark:border-night-700/30"><td class="py-1.5 text-night-700 dark:text-night-200">Silla ergonomica</td><td class="text-right font-mono">8</td><td class="text-right font-mono">S/ 350</td><td class="text-right font-mono font-semibold">S/ 2,800</td></tr>
                            <tr><td class="py-1.5 text-night-700 dark:text-night-200">Instalacion</td><td class="text-right font-mono">1</td><td class="text-right font-mono">S/ 100</td><td class="text-right font-mono font-semibold">S/ 100</td></tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                    <tr class="border-b border-gray-50 dark:border-night-700/50 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-night-700/20" onclick="this.nextElementSibling.classList.toggle('hidden');this.querySelector('.chevron').classList.toggle('rotate-90')">
                      <td class="px-3 py-3"><svg class="chevron w-4 h-4 text-gray-400 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></td>
                      <td class="px-4 py-3 font-mono font-semibold text-night-800 dark:text-night-100">OV-2026-031</td>
                      <td class="px-4 py-3"><div class="flex items-center gap-2">${UI.avatar('Hotel Libertad','sm')}<span class="text-night-700 dark:text-night-200">Hotel Libertad</span></div></td>
                      <td class="px-4 py-3 font-mono font-semibold text-night-800 dark:text-night-100">S/ 12,300.00</td>
                      <td class="px-4 py-3">${UI.badge('Completada','green')}</td>
                    </tr>
                    <tr class="hidden"><td colspan="5" class="px-6 py-4 bg-gray-50/50 dark:bg-night-700/20 text-xs text-gray-500">4 productos | Entregado: 15/03/2025 | Factura: FAC-001-000029</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="text-[11px] text-gray-400 mt-2">Click en la fila o el chevron para expandir el detalle con sub-tabla de productos.</p>
            </div>

            <!-- Inline Editing -->
            <div class="mb-8">
              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Inline Editing (Edicion en celda)</p>
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
                <table class="w-full text-sm" id="ds-inline-table">
                  <thead><tr class="border-b border-gray-100 dark:border-night-700">
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Material</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stock Actual</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stock Minimo</th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Precio Unit</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
                      <td class="px-4 py-2.5 font-semibold text-night-800 dark:text-night-100">MDF 18mm</td>
                      <td class="px-4 py-1"><input type="number" value="12" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="30" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="85.00" step="0.01" class="w-24 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                    </tr>
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
                      <td class="px-4 py-2.5 font-semibold text-night-800 dark:text-night-100">Tornillo 2"</td>
                      <td class="px-4 py-1"><input type="number" value="850" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="200" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="0.12" step="0.01" class="w-24 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                    </tr>
                    <tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/20">
                      <td class="px-4 py-2.5 font-semibold text-night-800 dark:text-night-100">Laca Brillante</td>
                      <td class="px-4 py-1"><input type="number" value="3" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-red-600 font-bold" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="10" class="w-20 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                      <td class="px-4 py-1"><input type="number" value="45.00" step="0.01" class="w-24 px-2.5 py-1.5 text-sm font-mono bg-transparent border border-transparent hover:border-gray-200 focus:border-brand-400 focus:bg-white dark:focus:bg-night-700 rounded-lg transition-all text-night-800 dark:text-night-100" onfocus="this.select()"/></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="text-[11px] text-gray-400 mt-2">Haz clic en cualquier celda numerica para editarla directamente. Los bordes aparecen al hover y se resaltan al focus.</p>
            </div>

            <!-- Column Pinning -->
            <div class="mb-8">
              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Column Pinning + Horizontal Scroll</p>
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                  <table class="text-sm" style="min-width:900px">
                    <thead><tr class="border-b border-gray-100 dark:border-night-700">
                      <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 sticky left-0 bg-white dark:bg-night-800 z-10 shadow-[2px_0_8px_rgba(0,0,0,0.04)]" style="min-width:180px">Material (Pinned)</th>
                      <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:100px">SKU</th>
                      <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:120px">Categoria</th>
                      <th class="px-4 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:80px">Stock</th>
                      <th class="px-4 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:80px">Min</th>
                      <th class="px-4 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:100px">Precio</th>
                      <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:120px">Proveedor</th>
                      <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:100px">Ubicacion</th>
                      <th class="px-4 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400" style="min-width:100px">Estado</th>
                    </tr></thead>
                    <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
                      <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100 sticky left-0 bg-white dark:bg-night-800 shadow-[2px_0_8px_rgba(0,0,0,0.04)]">MDF 18mm</td><td class="px-4 py-3 font-mono text-xs text-gray-500">MAT-001</td><td class="px-4 py-3 text-night-600">Tableros</td><td class="px-4 py-3 text-right font-mono">12</td><td class="px-4 py-3 text-right font-mono text-gray-400">30</td><td class="px-4 py-3 text-right font-mono font-semibold">S/ 85.00</td><td class="px-4 py-3 text-night-600">Maderera del Norte</td><td class="px-4 py-3 text-gray-500">Almacen A1</td><td class="px-4 py-3 text-center">${UI.badge('Bajo','yellow')}</td></tr>
                      <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100 sticky left-0 bg-white dark:bg-night-800 shadow-[2px_0_8px_rgba(0,0,0,0.04)]">Tornillo 2"</td><td class="px-4 py-3 font-mono text-xs text-gray-500">MAT-002</td><td class="px-4 py-3 text-night-600">Ferreteria</td><td class="px-4 py-3 text-right font-mono">850</td><td class="px-4 py-3 text-right font-mono text-gray-400">200</td><td class="px-4 py-3 text-right font-mono font-semibold">S/ 0.12</td><td class="px-4 py-3 text-night-600">Tornilleria Nacional</td><td class="px-4 py-3 text-gray-500">Almacen B2</td><td class="px-4 py-3 text-center">${UI.badge('OK','green')}</td></tr>
                      <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100 sticky left-0 bg-white dark:bg-night-800 shadow-[2px_0_8px_rgba(0,0,0,0.04)]">Laca Brillante</td><td class="px-4 py-3 font-mono text-xs text-gray-500">MAT-003</td><td class="px-4 py-3 text-night-600">Acabados</td><td class="px-4 py-3 text-right font-mono text-red-600 font-bold">3</td><td class="px-4 py-3 text-right font-mono text-gray-400">10</td><td class="px-4 py-3 text-right font-mono font-semibold">S/ 45.00</td><td class="px-4 py-3 text-night-600">Lacas y Barnices</td><td class="px-4 py-3 text-gray-500">Almacen C1</td><td class="px-4 py-3 text-center">${UI.badge('Agotado','red')}</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <p class="text-[11px] text-gray-400 mt-2">La columna "Material" esta pinned (sticky left) con sombra. Haz scroll horizontal para ver mas columnas mientras el nombre queda fijo.</p>
            </div>

            <!-- Row Grouping -->
            <div class="mb-8">
              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Row Grouping (Agrupamiento por categoria)</p>
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
                <table class="w-full text-sm">
                  <thead><tr class="border-b border-gray-100 dark:border-night-700">
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Material</th>
                    <th class="px-4 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Stock</th>
                    <th class="px-4 py-3 text-right font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Precio</th>
                    <th class="px-4 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Estado</th>
                  </tr></thead>
                  <tbody>
                    <tr class="bg-gray-50/80 dark:bg-night-700/30 cursor-pointer" onclick="this.parentElement.querySelectorAll('.g-tableros').forEach(r=>r.classList.toggle('hidden'))">
                      <td colspan="4" class="px-4 py-2.5"><div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg><span class="font-semibold text-night-800 dark:text-night-100">Tableros</span><span class="text-xs text-gray-400 font-mono ml-2">(3 items)</span><span class="ml-auto text-xs font-mono text-gray-400">Valorizado: S/ 2,050</span></div></td>
                    </tr>
                    <tr class="g-tableros border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">MDF 18mm</td><td class="px-4 py-2 text-right font-mono">12</td><td class="px-4 py-2 text-right font-mono">S/ 85</td><td class="px-4 py-2 text-center">${UI.badge('Bajo','yellow')}</td></tr>
                    <tr class="g-tableros border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Triplay 4mm</td><td class="px-4 py-2 text-right font-mono">8</td><td class="px-4 py-2 text-right font-mono">S/ 35</td><td class="px-4 py-2 text-center">${UI.badge('Bajo','yellow')}</td></tr>
                    <tr class="g-tableros border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Melamine Blanco</td><td class="px-4 py-2 text-right font-mono">20</td><td class="px-4 py-2 text-right font-mono">S/ 95</td><td class="px-4 py-2 text-center">${UI.badge('OK','green')}</td></tr>

                    <tr class="bg-gray-50/80 dark:bg-night-700/30 cursor-pointer" onclick="this.parentElement.querySelectorAll('.g-ferreteria').forEach(r=>r.classList.toggle('hidden'))">
                      <td colspan="4" class="px-4 py-2.5"><div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg><span class="font-semibold text-night-800 dark:text-night-100">Ferreteria</span><span class="text-xs text-gray-400 font-mono ml-2">(2 items)</span><span class="ml-auto text-xs font-mono text-gray-400">Valorizado: S/ 1,577</span></div></td>
                    </tr>
                    <tr class="g-ferreteria border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Tornillo 2"</td><td class="px-4 py-2 text-right font-mono">850</td><td class="px-4 py-2 text-right font-mono">S/ 0.12</td><td class="px-4 py-2 text-center">${UI.badge('OK','green')}</td></tr>
                    <tr class="g-ferreteria border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Bisagra 35mm</td><td class="px-4 py-2 text-right font-mono">420</td><td class="px-4 py-2 text-right font-mono">S/ 3.50</td><td class="px-4 py-2 text-center">${UI.badge('OK','green')}</td></tr>

                    <tr class="bg-gray-50/80 dark:bg-night-700/30 cursor-pointer" onclick="this.parentElement.querySelectorAll('.g-acabados').forEach(r=>r.classList.toggle('hidden'))">
                      <td colspan="4" class="px-4 py-2.5"><div class="flex items-center gap-2"><svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg><span class="font-semibold text-night-800 dark:text-night-100">Acabados</span><span class="text-xs text-gray-400 font-mono ml-2">(2 items)</span><span class="ml-auto text-xs font-mono text-red-500">2 alertas stock</span></div></td>
                    </tr>
                    <tr class="g-acabados border-b border-gray-50 dark:border-night-700/30"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Laca Brillante</td><td class="px-4 py-2 text-right font-mono text-red-600 font-bold">3</td><td class="px-4 py-2 text-right font-mono">S/ 45</td><td class="px-4 py-2 text-center">${UI.badge('Agotado','red')}</td></tr>
                    <tr class="g-acabados"><td class="px-4 py-2 pl-10 text-night-700 dark:text-night-200">Thinner Acrilico</td><td class="px-4 py-2 text-right font-mono text-red-600 font-bold">0</td><td class="px-4 py-2 text-right font-mono">S/ 28</td><td class="px-4 py-2 text-center">${UI.badge('Agotado','red')}</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="text-[11px] text-gray-400 mt-2">Click en el header de grupo para colapsar/expandir. Muestra conteo de items y valorizado por grupo.</p>
            </div>

            <!-- Column Resize -->
            <div>
              <p class="font-mono text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-3">Column Resize (Arrastrar para redimensionar)</p>
              <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">
                <table class="w-full text-sm" id="ds-resize-table">
                  <thead><tr class="border-b border-gray-100 dark:border-night-700">
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 relative select-none" style="width:200px">Proveedor<div class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand-400 transition-colors" onmousedown="dsResizeCol(event,this)"></div></th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 relative select-none" style="width:120px">RUC<div class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand-400 transition-colors" onmousedown="dsResizeCol(event,this)"></div></th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 relative select-none" style="width:100px">Rating<div class="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-brand-400 transition-colors" onmousedown="dsResizeCol(event,this)"></div></th>
                    <th class="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400">Contacto</th>
                  </tr></thead>
                  <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
                    <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100">Maderera del Norte</td><td class="px-4 py-3 font-mono text-xs text-gray-500">20456789012</td><td class="px-4 py-3"><div class="flex">${UI.stars(5)}</div></td><td class="px-4 py-3 text-night-600">contacto@maderera.pe</td></tr>
                    <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100">Ferreteria Central</td><td class="px-4 py-3 font-mono text-xs text-gray-500">20123456789</td><td class="px-4 py-3"><div class="flex">${UI.stars(4)}</div></td><td class="px-4 py-3 text-night-600">ventas@ferrcentral.pe</td></tr>
                    <tr class="hover:bg-gray-50/50"><td class="px-4 py-3 font-semibold text-night-800 dark:text-night-100">Acabados Peru SAC</td><td class="px-4 py-3 font-mono text-xs text-gray-500">20987654321</td><td class="px-4 py-3"><div class="flex">${UI.stars(3)}</div></td><td class="px-4 py-3 text-night-600">info@acabadosperu.pe</td></tr>
                  </tbody>
                </table>
              </div>
              <p class="text-[11px] text-gray-400 mt-2">Arrastra el borde derecho de cada header de columna para cambiar su ancho. La linea se resalta en brand al hover.</p>
            </div>
          </section>

          <!-- ══════════ NEW COMPONENTS v2.2 ══════════ -->

          <!-- 40 TimePicker -->
          <section id="ds-40">${N('40','TimePicker')}${has('timePicker') ? W(UI.timePicker('tp1', {label:'Hora de inicio', value:'09:30', required:true})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 41 Switch & Toggle -->
          <section id="ds-41">${N('41','Switch & Toggle')}${has('switchToggle') ? W(UI.switchToggle('sw1', {label:'Modo oscuro', checked:true}) + UI.switchToggle('sw2', {label:'Notificaciones', checked:false}) + UI.switchToggle('sw3', {label:'Auto-guardar', checked:true})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 42 Radio & Checkbox -->
          <section id="ds-42">${N('42','Radio & Checkbox')}${has('radioGroup') ? W(UI.radioGroup('rg1', [{value:'efectivo',label:'Efectivo'},{value:'transferencia',label:'Transferencia'},{value:'cheque',label:'Cheque'}], {label:'Metodo de pago', value:'efectivo'})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 43 Number Input -->
          <section id="ds-43">${N('43','Number Input')}${has('numberInput') ? W(UI.numberInput('ni1', {label:'Cantidad', value:10, min:1, max:100, step:1})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 44 Currency Input -->
          <section id="ds-44">${N('44','Currency Input')}${has('currencyInput') ? W(UI.currencyInput('ci1', {label:'Monto total', value:1500.00, currency:'PEN', prefix:'S/'})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 45 Tag Input -->
          <section id="ds-45">${N('45','Tag Input')}${has('tagInput') ? W(UI.tagInput('ti1', {label:'Etiquetas', tags:['madera','mueble','rustico'], placeholder:'Agregar etiqueta...'})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 46 Color Picker -->
          <section id="ds-46">${N('46','Color Picker')}${has('colorPicker') ? W(UI.colorPicker('cp1', {label:'Color de categoria', value:'#C0601E'})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 47 Sparkline -->
          <section id="ds-47">${N('47','Sparkline')}${has('sparkline') ? W('<div class="flex items-end gap-6 flex-wrap"><div class="text-center"><p class="text-xs text-gray-400 mb-1">Ventas</p>' + UI.sparkline([28,32,35,30,38,45]) + '</div><div class="text-center"><p class="text-xs text-gray-400 mb-1">Stock</p>' + UI.sparkline([100,95,88,82,78,75],{color:'red'}) + '</div><div class="text-center"><p class="text-xs text-gray-400 mb-1">Produccion</p>' + UI.sparkline([5,8,6,9,7,10],{color:'green'}) + '</div><div class="text-center"><p class="text-xs text-gray-400 mb-1">Gastos</p>' + UI.sparkline([20,22,19,25,23,21],{color:'yellow'}) + '</div></div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 48 Calendar -->
          <section id="ds-48">${N('48','Calendar')}${has('calendar') ? W(UI.calendar('cal1', {month:2, year:2026})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 49 Stepper -->
          <section id="ds-49">${N('49','Stepper')}${has('stepper') ? W(UI.stepper([{label:'Datos basicos'},{label:'Productos'},{label:'Revision'},{label:'Confirmacion'}], 1)) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 50 Toast -->
          <section id="ds-50">${N('50','Toast')}${W('<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Notificaciones temporales en esquina. Usa App.showToast() o UI.toast().</p><div class="flex flex-wrap gap-3">' + UI.button('Info','secondary','App.showToast("Informacion de ejemplo","info")') + ' ' + UI.button('Exito','success','App.showToast("Operacion exitosa","success")') + ' ' + UI.button('Warning','outline','App.showToast("Atencion requerida","warning")') + ' ' + UI.button('Error','danger','App.showToast("Ha ocurrido un error","error")') + '</div>')}</section>

          <!-- 51 Confirm Dialog -->
          <section id="ds-51">${N('51','Confirm Dialog')}${has('confirmDialog') ? W('<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Dialogo de confirmacion antes de acciones destructivas.</p>' + UI.button('Eliminar registro','danger','UI.confirmDialog({title:"Eliminar material",message:"Esta seguro de eliminar MDF 18mm? Esta accion no se puede deshacer.",onConfirm:function(){App.showToast("Registro eliminado","success")}})')) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 52 Hover Card -->
          <section id="ds-52">${N('52','Hover Card')}${has('hoverCard') ? W('<div class="flex items-center gap-6">' + UI.hoverCard('<span class="text-brand-600 font-semibold cursor-pointer underline decoration-dotted">OC-2026-015</span>', '<div><p class="font-bold">Orden de Compra</p><p class="text-xs text-gray-500">Maderera del Norte — S/ 3,450</p><p class="text-xs text-gray-400 mt-1">Pendiente de aprobacion</p></div>') + '</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 53 Copy & Kbd -->
          <section id="ds-53">${N('53','Copy & Kbd')}${has('copyButton') ? W('<div class="flex items-center gap-4 mb-4">' + UI.copyButton('admin@citemadera.pe') + '</div><p class="text-sm text-gray-600 dark:text-gray-300 mt-4 mb-2">Atajos de teclado:</p><div class="flex gap-2">' + (has('kbd') ? UI.kbd('Ctrl') + ' + ' + UI.kbd('K') + ' <span class="text-sm text-gray-500 ml-2">Buscar</span>' : '<kbd class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-600 dark:text-gray-300">Ctrl</kbd> + <kbd class="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-600 dark:text-gray-300">K</kbd> <span class="text-sm text-gray-500 ml-2">Buscar</span>') + '</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 54 Separator -->
          <section id="ds-54">${N('54','Separator')}${has('separator') ? W(UI.separator() + '<p class="text-sm text-gray-500 my-3">Contenido entre separadores</p>' + UI.separator('O continuar con') + '<p class="text-sm text-gray-500 my-3">Mas contenido aqui</p>' + UI.separator()) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 55 Bottom Sheet -->
          <section id="ds-55">${N('55','Bottom Sheet')}${has('bottomSheet') ? W('<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Panel deslizable desde abajo, ideal para mobile.</p>' + UI.button('Abrir Bottom Sheet','primary','DS._openBottomSheet()')) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 56 Command Palette -->
          <section id="ds-56">${N('56','Command Palette (Cmd+K)')}${has('commandPalette') ? W('<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">Paleta de comandos con busqueda rapida. Presiona Ctrl+K o haz clic abajo.</p>' + UI.button('Abrir Cmd+K','primary','UI.commandPalette()')) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 57 Notification Center -->
          <section id="ds-57">${N('57','Notification Center')}${has('notificationCenter') ? W(UI.notificationCenter([{title:'OC Aprobada',desc:'OC-2026-015 fue aprobada por el gerente',time:'Hace 5 min',type:'success'},{title:'Stock Bajo',desc:'MDF 18mm bajo el minimo (12 unidades)',time:'Hace 1 hora',type:'warning'},{title:'Nueva cotizacion',desc:'COT-2026-046 recibida de Hotel Libertad',time:'Hace 3 horas',type:'info'}])) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 58 Kanban Board -->
          <section id="ds-58">${N('58','Kanban Board')}${has('kanbanBoard') ? W(UI.kanbanBoard([{title:'Pendiente',color:'yellow',cards:['Mesa conferencia|OV-032','Estante modular|OV-033']},{title:'En Proceso',color:'blue',cards:['Escritorio ejecutivo|OV-030']},{title:'Completado',color:'green',cards:['Silla ergonomica|OV-028','Librero pared|OV-029']}])) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 59 Gantt Mini -->
          <section id="ds-59">${N('59','Gantt Mini')}${has('ganttMini') ? W(UI.ganttMini([{label:'Corte',start:0,end:3,color:'brand'},{label:'Armado',start:3,end:7,color:'blue'},{label:'Acabado',start:7,end:10,color:'green'},{label:'Entrega',start:10,end:11,color:'teal'}])) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 60 Comments -->
          <section id="ds-60">${N('60','Comments')}${has('comment') ? W(UI.comment({author:'Carlos Rodriguez',avatar:'CR',content:'Material recibido en buen estado. Cantidad coincide con la OC.',date:'Hace 2 horas'}) + UI.comment({author:'Maria Lopez',avatar:'ML',content:'Factura registrada en el sistema contable.',date:'Hace 1 hora'})) : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 61 QR Code -->
          <section id="ds-61">${N('61','QR Code')}${has('qrCode') ? W('<div class="flex gap-6">' + UI.qrCode('FAC-001-000028',120) + UI.qrCode('OC-2026-015',80) + '</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

          <!-- 62 Signature Pad -->
          <section id="ds-62">${N('62','Signature Pad')}${has('signaturePad') ? W('<div class="max-w-sm">' + UI.signaturePad('sig-demo') + '</div>') : W('<p class="text-sm text-gray-400">Disponible con ui2-overrides.js</p>')}</section>

        </div>
      </div>
    </div>`;

    // Column resize handler
    window.dsResizeCol = function(e, handle) {
      e.preventDefault();
      const th = handle.parentElement;
      const startX = e.clientX;
      const startW = th.offsetWidth;
      handle.style.background = 'rgb(var(--brand-400))';
      const onMove = (ev) => { th.style.width = Math.max(60, startW + ev.clientX - startX) + 'px'; };
      const onUp = () => { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); handle.style.background = ''; };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    };

    // Render charts
    this._renderCharts();

    // Scrollspy
    // Scrollspy: observe sections inside #ds-content
    if (window.innerWidth >= 1024) {
      const scrollRoot = document.getElementById('ds-content');
      if (scrollRoot) {
        const obs = new IntersectionObserver(es => {
          es.forEach(e => { if (e.isIntersecting) {
            document.querySelectorAll('.ds-nav').forEach(a => a.classList.remove('text-brand-600','bg-brand-50','font-semibold'));
            const a = document.querySelector('.ds-nav[href="#'+e.target.id+'"]');
            if (a) { a.classList.add('text-brand-600','bg-brand-50','font-semibold'); a.scrollIntoView({block:'nearest'}); }
          }});
        }, { root: scrollRoot, rootMargin: '-10% 0px -80% 0px' });
        scrollRoot.querySelectorAll('section[id^="ds-"]').forEach(s => obs.observe(s));
        // Fix nav links to scroll inside ds-content, not the page
        document.querySelectorAll('.ds-nav').forEach(a => {
          a.addEventListener('click', e => {
            e.preventDefault();
            const target = scrollRoot.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({behavior:'smooth',block:'start'});
          });
        });
      }
    }
  },

  // ── Interactive demos (called via onclick) ────────────
  _openModal(size) {
    if (!UI.modal) { App.showToast('Modal no disponible en esta version','warning'); return; }
    const content = '<div class="space-y-4">' + UI.input('dm1','text','Nombre del material','MDF 18mm','',true) + UI.input('dm2','number','Stock actual','12','Unidades') + UI.select('dm3',[{value:'tableros',label:'Tableros'},{value:'ferreteria',label:'Ferreteria'},{value:'acabados',label:'Acabados'}],'tableros','','Categoria') + '</div>';
    const html = UI.modal('Editar Material', content, {
      size: size,
      footer: UI.button('Cancelar','ghost',"(function(){var m=document.querySelector('[id^=modal-]');if(m)UI._closeModal(m.id)})()") + ' ' + UI.button('Guardar cambios','primary',"(function(){var m=document.querySelector('[id^=modal-]');if(m)UI._closeModal(m.id)})()")
    });
    document.body.insertAdjacentHTML('beforeend', html);
  },

  _openDrawer() {
    if (!UI.drawer) { App.showToast('Drawer no disponible en esta version','warning'); return; }
    const html = UI.drawer('Detalle de Producto',
      '<div class="space-y-4">' + '<div class="flex items-center gap-4 mb-4">' + UI.avatar('Mesa Centro','lg') + '<div><p class="font-bold text-gray-800 dark:text-white">Mesa de Centro Rustica</p><p class="text-xs text-gray-400">SKU: PROD-MC-001</p></div></div>' + UI.input('dd1','text','Nombre','Mesa de Centro Rustica') + UI.input('dd2','number','Precio (S/)','1,200') + UI.select('dd3',[{value:'activo',label:'Activo'},{value:'descontinuado',label:'Descontinuado'}],'activo','','Estado') + (UI.textarea ? UI.textarea('dd4','Descripcion','Mesa de centro fabricada en madera tornillo con acabado natural.','',3) : UI.input('dd4','text','Descripcion','Mesa de centro rustica')) + '</div>',
      { footer: UI.button('Cerrar','ghost',"UI._closeDrawer(document.querySelector('[id^=drawer-]').id)") + ' ' + UI.button('Guardar','primary',"UI._closeDrawer(document.querySelector('[id^=drawer-]').id)") }
    );
    document.body.insertAdjacentHTML('beforeend', html);
  },

  _openBottomSheet() {
    if (!UI.bottomSheet) { App.showToast('Bottom Sheet no disponible en esta version','warning'); return; }
    UI.bottomSheet('Filtros', '<p class="text-sm text-gray-600 dark:text-gray-300">Contenido del bottom sheet con filtros y opciones.</p>');
  },

  // ── Charts ────────────────────────────────────────────
  _renderCharts() {
    const brandHex = typeof ThemeManager !== 'undefined' ? ThemeManager.hex('brand',600) : '#A84117';

    // Line chart
    setTimeout(() => {
      const ctx1 = document.getElementById('ds-chart-line');
      if (!ctx1) return;
      new Chart(ctx1, {
        type: 'line',
        data: {
          labels: ['Oct','Nov','Dic','Ene','Feb','Mar'],
          datasets: [{
            label: 'Ventas (S/)',
            data: [28000,32000,35000,30000,38000,45320],
            borderColor: brandHex,
            backgroundColor: brandHex + '15',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: brandHex,
            pointRadius: 4,
            pointHoverRadius: 6,
          }]
        },
        options: { responsive:true, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true,ticks:{callback:v=>'S/'+v.toLocaleString()}},x:{grid:{display:false}}} }
      });
    }, 100);

    // Donut chart
    setTimeout(() => {
      const ctx2 = document.getElementById('ds-chart-donut');
      if (!ctx2) return;
      new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Muebles Hogar','Oficina','Cocina','Otros'],
          datasets: [{
            data: [38,28,22,12],
            backgroundColor: [brandHex,'#6B8F71','#D4A855','#B8A898'],
            borderWidth: 0,
          }]
        },
        options: { responsive:true, cutout:'65%', plugins:{legend:{position:'bottom',labels:{padding:16,font:{size:12}}}} }
      });
    }, 200);
  }
};

// Global alias for onclick handlers
window.DS = DesignSystem;
