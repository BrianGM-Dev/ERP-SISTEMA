// ============================================================
// CITE MADERA ERP — UI SYSTEM v1.0
// Design System completo para ERP empresarial
//
// ARQUITECTURA:
//   T (Tokens)  → Variables de diseño reutilizables
//   UI.*        → Componentes funcionales
//   UI.forms.*  → Subsistema de formularios
//   UI.erp.*    → Componentes específicos ERP
//
// CONVENCIONES:
//   - Cada componente retorna un string HTML
//   - IDs generados con _uid() para evitar colisiones
//   - Tokens centralizados en objeto T
//   - Brand-tinted borders, no grises genéricos
//   - IBM Plex Mono para labels/metadata
//   - 24px radius cards, 100px radius pill buttons
// ============================================================

(function() {
  'use strict';

  // ════════════════════════════════════════════════════════
  // 1. DESIGN TOKENS
  // ════════════════════════════════════════════════════════

  const T = {
    // Radius
    radius: {
      card:  'rounded-[24px]',
      btn:   'rounded-[100px]',
      input: 'rounded-[14px]',
      badge: 'rounded-full',
      inner: 'rounded-2xl',
      sm:    'rounded-xl',
    },
    // Shadows (warm brown tinted)
    shadow: {
      card:  'shadow-[0_2px_3px_1px_rgba(61,43,31,0.06)]',
      hover: 'shadow-[0_8px_24px_rgba(61,43,31,0.10)]',
      lg:    'shadow-[0_12px_40px_rgba(61,43,31,0.14)]',
      ring:  'ring-2 ring-brand-200',
    },
    // Borders
    border:      'border-[rgba(196,168,130,0.15)]',
    borderSolid: 'border-[#E8DFD4]',
    divider:     'border-[rgba(196,168,130,0.08)]',
    // Typography
    mono:  'font-mono text-[10px] font-semibold uppercase tracking-[.12em]',
    label: 'text-xs font-medium text-night-600 dark:text-night-400',
    muted: 'text-[#9C8B7A]',
    heading: 'font-bold tracking-tight text-night-900 dark:text-white',
    // Surfaces
    surface:    'bg-white dark:bg-night-800',
    surfaceAlt: 'bg-[#FAF8F5] dark:bg-night-700',
    surfaceMuted: 'bg-[#F6F3EF] dark:bg-night-700',
    // Colors for semantic states
    colors: {
      brand:   { bg:'bg-brand-500/10', text:'text-brand-700 dark:text-brand-300', solid:'bg-brand-600', icon:'text-brand-500' },
      green:   { bg:'bg-green-500/10', text:'text-green-700 dark:text-green-400', solid:'bg-green-500', icon:'text-green-500' },
      red:     { bg:'bg-red-500/10', text:'text-red-700 dark:text-red-400', solid:'bg-red-500', icon:'text-red-500' },
      yellow:  { bg:'bg-amber-500/10', text:'text-amber-700 dark:text-amber-400', solid:'bg-amber-400', icon:'text-amber-500' },
      blue:    { bg:'bg-blue-500/10', text:'text-blue-700 dark:text-blue-400', solid:'bg-blue-500', icon:'text-blue-500' },
      orange:  { bg:'bg-orange-500/10', text:'text-orange-700 dark:text-orange-400', solid:'bg-orange-500', icon:'text-orange-500' },
      teal:    { bg:'bg-accent-500/10', text:'text-accent-700 dark:text-accent-300', solid:'bg-accent-500', icon:'text-accent-500' },
      purple:  { bg:'bg-purple-500/10', text:'text-purple-700 dark:text-purple-400', solid:'bg-purple-500', icon:'text-purple-500' },
      gray:    { bg:'bg-night-100 dark:bg-night-700', text:'text-night-600 dark:text-night-300', solid:'bg-night-400', icon:'text-night-400' },
    },
  };

  // Utility: generate unique ID
  function _uid(prefix) { return prefix + '-' + Math.random().toString(36).substring(2, 8); }

  // Utility: get color set
  function _c(color) { return T.colors[color] || T.colors.gray; }

  // SVG Icons library (common ERP icons)
  const ICO = {
    check:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
    x:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
    chevDown:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
    chevRight:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
    chevLeft:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>',
    info:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    warn:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>',
    error:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    success: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    search:  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
    plus:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>',
    download:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
    dots:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/>',
    inbox:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>',
  };

  function _svg(name, cls = 'w-5 h-5') {
    return `<svg class="${cls}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICO[name] || ''}</svg>`;
  }

  // ════════════════════════════════════════════════════════
  // 2. BASE COMPONENTS
  // ════════════════════════════════════════════════════════

  // ── GREETING ────────────────────────────────────────────
  UI.greeting = function(name) {
    const h = new Date().getHours();
    const g = h < 12 ? 'Buenos dias' : h < 19 ? 'Buenas tardes' : 'Buenas noches';
    return `<div class="mb-8"><h1 class="text-3xl sm:text-4xl ${T.heading}">${g}, ${name}</h1><p class="text-sm ${T.muted} mt-2">Aqui tienes un resumen de tu negocio y lo que necesita tu atencion</p></div>`;
  };

  // ── KPI CARD ────────────────────────────────────────────
  UI.kpiCard = function(title, value, change, icon, color = 'brand', subtitle = '') {
    const pos = parseFloat(change) >= 0;
    return `
      <div class="${T.surface} ${T.radius.card} p-6 ${T.shadow.card} border ${T.border} hover:${T.shadow.hover} transition-all duration-300 group">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <p class="${T.mono} ${T.muted}">${title}</p>
            <p class="mt-3 text-3xl sm:text-4xl ${T.heading}">${value}</p>
            ${subtitle ? `<p class="mt-1 text-xs ${T.muted}">${subtitle}</p>` : ''}
            ${change != null ? `<div class="mt-3 flex items-center gap-1.5"><span class="${pos ? 'text-green-600' : 'text-red-500'} text-xs font-semibold">${pos ? '↑' : '↓'} ${Math.abs(parseFloat(change))}%</span><span class="text-xs text-[#B8A898]">vs mes anterior</span></div>` : ''}
          </div>
          <div class="w-12 h-12 ${T.radius.inner} bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <div class="w-6 h-6 text-brand-600 dark:text-brand-300">${icon}</div>
          </div>
        </div>
      </div>`;
  };

  // ── CARD ────────────────────────────────────────────────
  UI.card = function(title, content, actions = '', subtitle = '') {
    return `
      <div class="${T.surface} ${T.radius.card} ${T.shadow.card} border ${T.border}">
        <div class="px-7 py-5 border-b ${T.divider} flex items-center justify-between">
          <div><h3 class="font-bold text-[15px] ${T.heading}">${title}</h3>${subtitle ? `<p class="text-xs ${T.muted} mt-0.5">${subtitle}</p>` : ''}</div>
          ${actions ? `<div class="flex items-center gap-2">${actions}</div>` : ''}
        </div>
        <div class="p-7">${content}</div>
      </div>`;
  };

  // ── WIDGET CARD ─────────────────────────────────────────
  UI.widgetCard = function(emoji, title, actionLabel = '', actionOnclick = '', content = '') {
    return `
      <div class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} overflow-hidden hover:${T.shadow.hover} transition-all duration-300">
        <div class="px-6 py-4 flex items-center justify-between border-b ${T.divider}">
          <div class="flex items-center gap-2.5">${emoji ? `<span class="text-lg">${emoji}</span>` : ''}<span class="text-sm font-semibold text-night-800 dark:text-night-100">${title}</span></div>
          ${actionLabel ? `<button onclick="${actionOnclick}" class="text-[11px] font-semibold text-brand-600 hover:text-brand-700 transition-colors">${actionLabel}</button>` : ''}
        </div>
        <div class="px-6 py-4">${content}</div>
      </div>`;
  };

  // ── TABLE ───────────────────────────────────────────────
  UI.table = function(columns, rows, options = {}) {
    const { id = 'data-table', emptyMsg = 'No hay datos disponibles', compact = false } = options;
    const pad = compact ? 'px-5 py-2.5' : 'px-5 py-3.5';
    return `
      <div class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} overflow-hidden">
        <div class="overflow-x-auto">
          <table id="${id}" class="w-full text-sm">
            <thead><tr class="border-b ${T.divider}">${columns.map(c => `<th class="${pad} text-left ${T.mono} ${T.muted} whitespace-nowrap">${c.label}</th>`).join('')}</tr></thead>
            <tbody class="divide-y divide-[rgba(196,168,130,0.06)]">
              ${rows.length === 0
                ? `<tr><td colspan="${columns.length}" class="py-16 text-center">${UI.emptyState(emptyMsg)}</td></tr>`
                : rows.map(r => `<tr class="hover:bg-[rgba(168,65,23,0.02)] dark:hover:bg-night-700/30 transition-colors group">${columns.map(c => `<td class="${pad} text-night-700 dark:text-night-200 ${c.class||''}">${r[c.key] ?? '-'}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  };

  // ── BADGE ───────────────────────────────────────────────
  UI.badge = function(text, color = 'gray') {
    const c = _c(color);
    return `<span class="inline-flex items-center px-3 py-1 ${T.radius.badge} text-[11px] font-semibold tracking-wide ${c.bg} ${c.text}">${text}</span>`;
  };

  // ── BUTTON ──────────────────────────────────────────────
  UI.button = function(text, type = 'primary', onclick = '', icon = '') {
    const types = {
      primary:   `bg-brand-600 hover:bg-brand-700 text-white ${T.shadow.card}`,
      secondary: `${T.surfaceMuted} text-night-700 dark:text-night-200 border ${T.border} hover:bg-[#EDE6DC]`,
      danger:    'bg-red-500 hover:bg-red-600 text-white',
      success:   'bg-accent-500 hover:bg-accent-600 text-white',
      outline:   `border ${T.border} text-brand-600 hover:bg-brand-50 dark:text-brand-300`,
      ghost:     `text-night-500 hover:bg-[#F6F3EF] dark:text-night-300 dark:hover:bg-night-700`,
    };
    return `<button onclick="${onclick}" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold ${T.radius.btn} transition-all duration-200 active:scale-[.97] ${types[type]||types.primary}">${icon ? `<span class="w-4 h-4">${icon}</span>` : ''}${text}</button>`;
  };

  // ── ICON BUTTON ─────────────────────────────────────────
  UI.iconBtn = function(icon, onclick, title = '', color = 'gray') {
    const map = { gray:'text-[#9C8B7A] hover:text-night-700 hover:bg-[#F6F3EF]', brand:'text-brand-400 hover:text-brand-600 hover:bg-brand-50', red:'text-red-400 hover:text-red-600 hover:bg-red-50', green:'text-accent-400 hover:text-accent-600 hover:bg-accent-50', indigo:'text-brand-400 hover:text-brand-600 hover:bg-brand-50' };
    return `<button onclick="${onclick}" title="${title}" class="p-2 ${T.radius.sm} transition-all duration-150 active:scale-95 ${map[color]||map.gray}">${icon}</button>`;
  };

  // ── BUTTON GROUP ────────────────────────────────────────
  UI.buttonGroup = function(buttons) {
    return `<div class="inline-flex ${T.radius.inner} overflow-hidden border ${T.border} ${T.shadow.card}">${buttons.map((b,i) => `<button onclick="${b.onclick||''}" class="px-4 py-2 text-sm font-medium transition-all active:scale-[.97] ${b.active ? 'bg-brand-600 text-white' : `${T.surface} text-night-600 hover:bg-[#F6F3EF]`} ${i > 0 ? 'border-l '+T.divider : ''}">${b.label}</button>`).join('')}</div>`;
  };

  // ── TABS ────────────────────────────────────────────────
  UI.tabs = function(tabs, activeTab, onClickPrefix) {
    return `<div class="inline-flex ${T.surfaceMuted} p-1 ${T.radius.inner} gap-1 border ${T.border}">${tabs.map(t => `<button onclick="${onClickPrefix}('${t.id}')" id="tab-${t.id}" class="px-5 py-2 text-sm font-medium ${T.radius.inner} transition-all duration-200 whitespace-nowrap min-w-[100px] border ${t.id===activeTab ? `${T.surface} text-brand-600 dark:text-brand-300 shadow-sm ${T.borderSolid}` : `text-[#9C8B7A] hover:text-night-700 border-transparent`}">${t.label}</button>`).join('')}</div>`;
  };

  // ── SECTION HEADER ──────────────────────────────────────
  UI.sectionHeader = function(title, subtitle = '', actions = '') {
    return `<div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3"><div><h2 class="text-2xl ${T.heading}">${title}</h2>${subtitle ? `<p class="text-sm ${T.muted} mt-1">${subtitle}</p>` : ''}</div>${actions ? `<div class="flex items-center gap-2 flex-shrink-0 flex-wrap">${actions}</div>` : ''}</div>`;
  };

  // ── SEARCH INPUT ────────────────────────────────────────
  UI.searchInput = function(id, placeholder = 'Buscar...', onInput = '') {
    return `<div class="relative">${_svg('search','absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8A898]')}<input type="text" id="${id}" placeholder="${placeholder}" ${onInput ? `oninput="${onInput}"` : ''} class="w-full pl-11 pr-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-2 focus:ring-brand-200 focus:border-brand-300 transition-all"/></div>`;
  };

  // ── INPUT ───────────────────────────────────────────────
  UI.input = function(id, type='text', label='', value='', placeholder='', required=false) {
    return `<div>${label ? `<label class="${T.label} mb-1.5 block">${label}${required?'<span class="text-red-500 ml-0.5">*</span>':''}</label>`:''}<input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" ${required?'required':''} class="w-full px-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-2 focus:ring-brand-200 transition-all"/></div>`;
  };

  // ── SELECT ──────────────────────────────────────────────
  UI.select = function(id, options, value='', onchange='', label='') {
    return `<div>${label ? `<label class="${T.label} mb-1.5 block">${label}</label>`:''}<select id="${id}" ${onchange?`onchange="${onchange}"`:''} class="w-full px-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 focus:ring-2 focus:ring-brand-200 transition-all">${options.map(o => typeof o==='string' ? `<option value="${o}" ${o===value?'selected':''}>${o}</option>` : `<option value="${o.value}" ${o.value===value?'selected':''}>${o.label}</option>`).join('')}</select></div>`;
  };

  // ── TEXTAREA ────────────────────────────────────────────
  UI.textarea = function(id, label='', value='', placeholder='', rows=3) {
    return `<div>${label ? `<label class="${T.label} mb-1.5 block">${label}</label>`:''}<textarea id="${id}" rows="${rows}" placeholder="${placeholder}" class="w-full px-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-2 focus:ring-brand-200 transition-all resize-none">${value}</textarea></div>`;
  };

  // ── PROGRESS BAR ────────────────────────────────────────
  UI.progressBar = function(value, max, color='brand', showLabel=true) {
    const pct = Math.min(100, Math.round((value/max)*100));
    const c = _c(color);
    return `<div class="flex items-center gap-3"><div class="flex-1 bg-[#EDE6DC] dark:bg-night-700 ${T.radius.badge} h-2"><div class="${c.solid} h-2 ${T.radius.badge} transition-all duration-500" style="width:${pct}%"></div></div>${showLabel ? `<span class="text-xs font-semibold ${T.muted} w-10 text-right font-mono">${pct}%</span>`:''}</div>`;
  };

  // ── AVATAR ──────────────────────────────────────────────
  UI.avatar = function(name, size='md', color='brand') {
    const sizes = {sm:'w-8 h-8 text-xs',md:'w-11 h-11 text-sm',lg:'w-14 h-14 text-lg'};
    const initials = name.split(' ').slice(0,2).map(n=>n[0]).join('').toUpperCase();
    return `<div class="${sizes[size]||sizes.md} rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0" style="background:linear-gradient(135deg,#C0601E,#A84117)">${initials}</div>`;
  };

  // ── STAT ROW ────────────────────────────────────────────
  UI.statRow = function(label, value, color='brand') {
    const c = _c(color);
    return `<div class="flex items-center justify-between py-3 border-b ${T.divider} last:border-0"><div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full ${c.solid}"></div><span class="text-sm text-night-600 dark:text-night-300">${label}</span></div><span class="text-sm font-bold text-night-900 dark:text-white font-mono">${value}</span></div>`;
  };

  // ── SEMAFORO ────────────────────────────────────────────
  UI.semaforo = function(estado) {
    const m = {verde:{cls:'bg-accent-400',l:'Optimo'},amarillo:{cls:'bg-amber-400',l:'Atencion'},rojo:{cls:'bg-red-500',l:'Critico'}};
    const s = m[estado]||m.verde;
    return `<span class="inline-flex items-center gap-2"><span class="w-3 h-3 rounded-full ${s.cls} animate-pulse"></span><span class="text-xs font-medium ${T.muted}">${s.l}</span></span>`;
  };

  // ── STARS ───────────────────────────────────────────────
  UI.stars = function(r) {
    return Array.from({length:5},(_,i) => `<svg class="w-3.5 h-3.5 ${i<r?'text-amber-400':'text-[#E8DFD4] dark:text-night-600'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`).join('');
  };

  // ── EMPTY STATE ─────────────────────────────────────────
  UI.emptyState = function(msg = 'No hay datos disponibles', icon = '') {
    return `<div class="flex flex-col items-center justify-center py-16 px-4"><div class="w-16 h-16 ${T.surfaceMuted} ${T.radius.card} flex items-center justify-center mb-5">${icon || _svg('inbox','w-7 h-7 text-[#C4A882]')}</div><p class="${T.muted} text-sm text-center">${msg}</p></div>`;
  };

  // ── SKELETON ────────────────────────────────────────────
  UI.skeleton = function(type = 'card') {
    const sh = 'bg-gradient-to-r from-[#EDE6DC] via-[#F6F3EF] to-[#EDE6DC] bg-[length:200%_100%] animate-pulse';
    if (type==='table') return `<div class="${T.surface} ${T.radius.card} border ${T.border} p-5">${[1,2,3,4].map(()=>`<div class="flex gap-4 py-3 border-b ${T.divider}"><div class="${sh} h-3 w-20 rounded"></div><div class="${sh} h-3 flex-1 rounded"></div><div class="${sh} h-3 w-14 rounded"></div></div>`).join('')}</div>`;
    return `<div class="${T.surface} ${T.radius.card} border ${T.border} p-6"><div class="${sh} h-3 w-1/3 rounded-lg mb-4"></div><div class="${sh} h-8 w-1/2 rounded-lg mb-3"></div><div class="${sh} h-2 w-2/3 rounded-lg"></div></div>`;
  };

  // ── KANBAN CARD ─────────────────────────────────────────
  UI.kanbanCard = function(op) {
    const sc = {'Planificada':'border-l-[#C4A882]','En Proceso':'border-l-brand-400','QC':'border-l-amber-400','Completada':'border-l-accent-400'};
    const prod = AppData.getProducto(op.producto_id);
    return `<div class="${T.surface} ${T.radius.inner} p-4 ${T.shadow.card} border-l-4 ${sc[op.estado]||'border-l-[#C4A882]'} cursor-pointer hover:${T.shadow.hover} transition-all duration-200"><div class="flex items-start justify-between gap-2 mb-2"><span class="font-mono text-xs font-bold ${T.muted}">${op.id}</span>${UI.badge(op.prioridad, op.prioridad==='Alta'?'red':op.prioridad==='Media'?'yellow':'gray')}</div><p class="text-sm font-semibold text-night-800 dark:text-night-200 mb-1">${prod.nombre||'Producto'}</p><p class="text-xs ${T.muted} mb-3">Cant: ${op.cantidad} | Op: ${op.operario}</p>${UI.progressBar(op.avance,100,op.avance>=80?'green':op.avance>=40?'brand':'yellow')}</div>`;
  };

  // ════════════════════════════════════════════════════════
  // 3. EXTENDED COMPONENTS
  // ════════════════════════════════════════════════════════

  // ── ACCORDION ───────────────────────────────────────────
  UI.accordion = function(items) {
    const id = _uid('acc');
    return `<div class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} divide-y ${T.divider}" id="${id}">${items.map(item => `<div class="acc-item"><button onclick="this.parentElement.classList.toggle('open');this.querySelector('.acc-ico').classList.toggle('rotate-180')" class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[rgba(168,65,23,0.02)] transition-colors"><span class="text-sm font-semibold text-night-800 dark:text-night-100">${item.title}</span><svg class="acc-ico w-4 h-4 ${T.muted} transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICO.chevDown}</svg></button><div class="max-h-0 overflow-hidden transition-all duration-300" style="max-height:0"><div class="px-6 pb-4 text-sm ${T.muted} leading-relaxed">${item.content}</div></div></div>`).join('')}</div>`;
  };

  // Accordion: toggle via CSS class
  if (!document.getElementById('acc-styles')) {
    const s = document.createElement('style');
    s.id = 'acc-styles';
    s.textContent = '.acc-item.open > div:last-child{max-height:500px!important}';
    document.head.appendChild(s);
  }

  // ── ALERT ───────────────────────────────────────────────
  UI.alert = function(message, type = 'info', dismissible = true) {
    const map = {info:'brand',success:'green',warning:'yellow',error:'red'};
    const icoMap = {info:ICO.info,success:ICO.success,warning:ICO.warn,error:ICO.error};
    const c = _c(map[type]||'brand');
    const uid = _uid('alert');
    return `<div id="${uid}" class="flex items-start gap-3 p-4 ${T.radius.inner} ${c.bg} border border-current/10 animate-slide-up" role="alert"><svg class="w-5 h-5 ${c.icon} flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icoMap[type]||icoMap.info}</svg><div class="flex-1 text-sm ${c.text}">${message}</div>${dismissible ? `<button onclick="document.getElementById('${uid}').remove()" class="p-1 ${T.radius.sm} ${c.text} opacity-50 hover:opacity-100 transition-opacity">${_svg('x','w-4 h-4')}</button>`:''}</div>`;
  };

  // ── BREADCRUMB ──────────────────────────────────────────
  UI.breadcrumb = function(items) {
    return `<nav class="flex items-center gap-1.5" aria-label="Breadcrumb">${items.map((item,i) => {
      const last = i === items.length-1;
      const sep = i > 0 ? `<svg class="w-3 h-3 text-[#C4A882] mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICO.chevRight}</svg>` : '';
      return sep + (last ? `<span class="text-sm font-semibold text-night-800 dark:text-night-100">${item.label}</span>` : `<a href="#" onclick="${item.onclick||''};return false" class="text-sm ${T.muted} hover:text-brand-600 transition-colors">${item.label}</a>`);
    }).join('')}</nav>`;
  };

  // ── LIST GROUP ──────────────────────────────────────────
  UI.listGroup = function(items) {
    return `<div class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} divide-y ${T.divider} overflow-hidden">${items.map(item => `<div class="flex items-center gap-4 px-5 py-3.5 hover:bg-[rgba(168,65,23,0.02)] transition-colors ${item.onclick?'cursor-pointer':''}" ${item.onclick?`onclick="${item.onclick}"`:''}>
      ${item.icon ? `<div class="w-10 h-10 ${T.radius.sm} bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 flex-shrink-0">${item.icon}</div>` : ''}
      <div class="flex-1 min-w-0"><p class="text-sm font-semibold text-night-800 dark:text-night-100 truncate">${item.title}</p>${item.desc?`<p class="text-xs ${T.muted} truncate mt-0.5">${item.desc}</p>`:''}</div>
      ${item.value?`<span class="text-sm font-bold text-night-900 dark:text-white font-mono flex-shrink-0">${item.value}</span>`:''}
      ${item.badge?`<span class="flex-shrink-0">${UI.badge(item.badge,item.badgeColor||'gray')}</span>`:''}
      ${item.onclick?_svg('chevRight','w-4 h-4 text-[#C4A882] flex-shrink-0'):''}
    </div>`).join('')}</div>`;
  };

  // ── MODAL ───────────────────────────────────────────────
  UI.modal = function(title, content, opts = {}) {
    const {size='md',footer='',onClose=''} = opts;
    const sizes = {sm:'max-w-sm',md:'max-w-lg',lg:'max-w-2xl',xl:'max-w-4xl'};
    const uid = _uid('modal');
    const closeCmd = `UI._closeModal('${uid}')`;
    return `<div id="${uid}" class="fixed inset-0 z-[999] flex items-center justify-center p-4" onclick="if(event.target===this){${closeCmd}}">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" style="animation:drawerFadeIn .2s ease both"></div>
      <div class="${T.surface} relative ${T.radius.card} ${sizes[size]||sizes.md} w-full max-h-[90vh] flex flex-col shadow-2xl border ${T.border}" style="animation:modalScaleIn .35s cubic-bezier(.16,1,.3,1) both">
        <div class="flex items-center justify-between px-7 py-5 border-b ${T.divider}">
          <h3 class="text-lg ${T.heading}">${title}</h3>
          <button onclick="${closeCmd}" class="p-2 ${T.radius.sm} ${T.muted} hover:text-night-600 hover:bg-[#F6F3EF] transition-all">${_svg('x')}</button>
        </div>
        <div class="flex-1 overflow-y-auto px-7 py-5">${content}</div>
        ${footer?`<div class="flex items-center justify-end gap-3 px-7 py-4 border-t ${T.divider}">${footer}</div>`:''}
      </div>
    </div>`;
  };

  UI._closeModal = function(uid) {
    const el = document.getElementById(uid);
    if (!el) return;
    const card = el.querySelector('[style*="modalScaleIn"]');
    const bg = el.querySelector('[style*="drawerFadeIn"]');
    if (card) card.style.animation = 'modalScaleOut .12s cubic-bezier(.4,0,1,1) both';
    if (bg) bg.style.animation = 'drawerFadeOut .1s ease both';
    setTimeout(() => el.remove(), 130);
  };

  // ── DRAWER / OFFCANVAS ──────────────────────────────────
  UI.drawer = function(title, content, opts = {}) {
    const {side='right',size='md',footer=''} = opts;
    const sizes = {sm:'max-w-sm',md:'max-w-md',lg:'max-w-lg'};
    const uid = _uid('drawer');
    return `<div id="${uid}" class="fixed inset-0 z-[999]">
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" style="animation:drawerFadeIn .25s ease both" onclick="UI._closeDrawer('${uid}')"></div>
      <div class="${T.surface} absolute inset-y-0 ${side==='left'?'left-0':'right-0'} ${sizes[size]} w-full flex flex-col shadow-2xl ${side==='left'?'border-r':'border-l'} ${T.border}"
           style="animation:drawerSlide${side==='left'?'Left':'Right'} .35s cubic-bezier(.16,1,.3,1) both">
        <div class="flex items-center justify-between px-6 py-5 border-b ${T.divider}">
          <h3 class="text-lg ${T.heading}">${title}</h3>
          <button onclick="UI._closeDrawer('${uid}')" class="p-2 ${T.radius.sm} ${T.muted} hover:text-night-600 hover:bg-[#F6F3EF] transition-all">${_svg('x')}</button>
        </div>
        <div class="flex-1 overflow-y-auto px-6 py-5">${content}</div>
        ${footer?`<div class="flex items-center justify-end gap-3 px-6 py-4 border-t ${T.divider}">${footer}</div>`:''}
      </div>
    </div>`;
  };

  UI._closeDrawer = function(uid) {
    const el = document.getElementById(uid);
    if (!el) return;
    const panel = el.querySelector('[style*="drawerSlide"]');
    const bg = el.querySelector('[style*="drawerFadeIn"]');
    if (panel) { panel.style.animation = 'drawerSlideRightOut .3s cubic-bezier(.4,0,1,1) both'; }
    if (bg) { bg.style.animation = 'drawerFadeOut .25s ease both'; }
    setTimeout(() => el.remove(), 300);
  };

  // ── PAGINATION ──────────────────────────────────────────
  UI.pagination = function(current, total, onPage = '') {
    const pages = [];
    for (let i=1;i<=total;i++) { if (i===1||i===total||(i>=current-1&&i<=current+1)) pages.push(i); else if (pages[pages.length-1]!=='...') pages.push('...'); }
    return `<div class="flex items-center gap-1.5">
      <button onclick="${onPage}(${current-1})" ${current<=1?'disabled':''} class="w-9 h-9 ${T.radius.sm} flex items-center justify-center ${T.muted} hover:bg-[#F6F3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">${_svg('chevLeft','w-4 h-4')}</button>
      ${pages.map(p => p==='...' ? `<span class="w-9 h-9 flex items-center justify-center text-[#B8A898] text-sm">...</span>` : `<button onclick="${onPage}(${p})" class="w-9 h-9 ${T.radius.sm} flex items-center justify-center text-sm font-medium transition-all ${p===current ? 'bg-brand-600 text-white shadow-sm' : 'text-night-600 hover:bg-[#F6F3EF]'}">${p}</button>`).join('')}
      <button onclick="${onPage}(${current+1})" ${current>=total?'disabled':''} class="w-9 h-9 ${T.radius.sm} flex items-center justify-center ${T.muted} hover:bg-[#F6F3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-all">${_svg('chevRight','w-4 h-4')}</button>
    </div>`;
  };

  // ── DROPDOWN ────────────────────────────────────────────
  UI.dropdown = function(triggerHtml, items, id) {
    const uid = id || _uid('dd');
    return `<div class="relative inline-block" id="${uid}">
      <div onclick="event.stopPropagation();document.getElementById('${uid}').classList.toggle('open')" class="cursor-pointer">${triggerHtml}</div>
      <div class="absolute right-0 mt-2 w-56 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 py-1.5 hidden" id="${uid}-m" style="display:none">
        ${items.map(item => item.divider ? `<div class="my-1.5 border-t ${T.divider}"></div>` : `<button onclick="${item.onclick||''};document.getElementById('${uid}').classList.remove('open');document.getElementById('${uid}-m').style.display='none'" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-night-600 dark:text-night-300 hover:bg-[rgba(168,65,23,0.04)] text-left transition-colors">${item.icon?`<span class="w-4 h-4 ${T.muted}">${item.icon}</span>`:''}${item.label}${item.badge?`<span class="ml-auto">${UI.badge(item.badge,item.badgeColor||'gray')}</span>`:''}</button>`).join('')}
      </div>
    </div>`;
  };

  // Dropdown: click handler + Drawer/Modal animations
  if (!document.getElementById('dd-styles')) {
    const s = document.createElement('style');
    s.id = 'dd-styles';
    s.textContent = `
      .open > [id$="-m"]{display:block!important}
      @keyframes drawerFadeIn{from{opacity:0}to{opacity:1}}
      @keyframes drawerFadeOut{from{opacity:1}to{opacity:0}}
      @keyframes drawerSlideRight{from{transform:translateX(100%);opacity:.8}to{transform:translateX(0);opacity:1}}
      @keyframes drawerSlideRightOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:.8}}
      @keyframes drawerSlideLeft{from{transform:translateX(-100%);opacity:.8}to{transform:translateX(0);opacity:1}}
      @keyframes modalScaleIn{from{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @keyframes modalScaleOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.95) translateY(8px)}}
    `;
    document.head.appendChild(s);
    document.addEventListener('click', () => { document.querySelectorAll('[id^="dd-"].open').forEach(el => { el.classList.remove('open'); const m = el.querySelector('[id$="-m"]'); if (m) m.style.display = 'none'; }); });
  }

  // ── TOOLTIP ─────────────────────────────────────────────
  UI.tooltip = function(content, text, position = 'top') {
    return `<span class="relative group inline-flex cursor-default">${content}<span class="absolute ${position==='top'?'bottom-full mb-2':'top-full mt-2'} left-1/2 -translate-x-1/2 px-3 py-1.5 ${T.radius.sm} bg-night-800 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">${text}</span></span>`;
  };

  // ── SPINNER ─────────────────────────────────────────────
  UI.spinner = function(size = 'md') {
    const sizes = {sm:'w-4 h-4',md:'w-6 h-6',lg:'w-8 h-8',xl:'w-12 h-12'};
    return `<svg class="${sizes[size]||sizes.md} animate-spin text-brand-500" viewBox="0 0 24 24" fill="none"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/></svg>`;
  };

  // ── TOAST (imperative) ──────────────────────────────────
  UI.toast = function(message, type = 'info', duration = 4000) {
    const map = {info:'bg-night-800 text-white',success:'bg-green-600 text-white',warning:'bg-amber-500 text-night-900',error:'bg-red-500 text-white'};
    const uid = _uid('toast');
    const el = document.createElement('div');
    el.id = uid;
    el.className = `fixed bottom-6 right-6 z-[9999] px-5 py-3.5 ${T.radius.inner} ${map[type]||map.info} shadow-2xl text-sm font-medium flex items-center gap-3 animate-slide-up`;
    el.innerHTML = `${message}<button onclick="this.parentElement.remove()" class="opacity-60 hover:opacity-100 ml-2">${_svg('x','w-4 h-4')}</button>`;
    document.body.appendChild(el);
    if (duration) setTimeout(() => { const e = document.getElementById(uid); if (e) e.remove(); }, duration);
    return uid;
  };

  // ── CAROUSEL ────────────────────────────────────────────
  UI.carousel = function(slides) {
    const uid = _uid('car');
    const nav = (dir) => `(function(){var s=document.querySelectorAll('#${uid} .car-s'),c=[...s].findIndex(function(e){return !e.classList.contains('hidden')});s[c].classList.add('hidden');c=(c${dir}+s.length)%s.length;s[c].classList.remove('hidden')})()`;
    return `<div id="${uid}" class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} overflow-hidden"><div class="relative">${slides.map((s,i)=>`<div class="car-s ${i===0?'':'hidden'}">${s}</div>`).join('')}</div><div class="flex items-center justify-between px-5 py-3 border-t ${T.divider}"><button onclick="${nav('-1')}" class="p-1.5 ${T.radius.sm} ${T.muted} hover:text-night-600 hover:bg-[#F6F3EF] transition-all">${_svg('chevLeft','w-4 h-4')}</button><div class="flex gap-1.5">${slides.map((_,i)=>`<span class="w-1.5 h-1.5 rounded-full ${i===0?'bg-brand-500':'bg-[#D4C4B0]'}"></span>`).join('')}</div><button onclick="${nav('+1')}" class="p-1.5 ${T.radius.sm} ${T.muted} hover:text-night-600 hover:bg-[#F6F3EF] transition-all">${_svg('chevRight','w-4 h-4')}</button></div></div>`;
  };

  // ── NAVBAR (secondary) ──────────────────────────────────
  UI.navbar = function(items, active = '') {
    return `<nav class="flex items-center gap-1 border-b ${T.divider} pb-px overflow-x-auto">${items.map(item => `<button onclick="${item.onclick||''}" class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ${item.id===active ? 'text-brand-600 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-500 after:rounded-full' : `${T.muted} hover:text-night-700`}">${item.label}</button>`).join('')}</nav>`;
  };

  // ── TYPOGRAPHY ──────────────────────────────────────────
  UI.typography = function(text, variant = 'body') {
    const v = {h1:`text-4xl ${T.heading}`,h2:`text-3xl ${T.heading}`,h3:`text-2xl ${T.heading}`,h4:`text-xl font-semibold text-night-800 dark:text-night-100`,body:'text-sm text-night-600 dark:text-night-300 leading-relaxed',small:`text-xs ${T.muted}`,mono:'font-mono text-sm text-night-600',label:T.mono+' '+T.muted};
    return `<span class="${v[variant]||v.body}">${text}</span>`;
  };

  // ── SCROLLSPY ───────────────────────────────────────────
  UI.scrollspy = function(sections) {
    return `<div class="flex flex-col gap-0.5 sticky top-4">${sections.map(s => `<a href="#${s.id}" class="px-3 py-2 text-sm ${T.muted} hover:text-brand-600 hover:bg-brand-50 ${T.radius.sm} transition-all font-medium">${s.label}</a>`).join('')}</div>`;
  };

  // ════════════════════════════════════════════════════════
  // 4. ERP-SPECIFIC COMPONENTS
  // ════════════════════════════════════════════════════════

  UI.erp = UI.erp || {};

  // ── STATUS TIMELINE ─────────────────────────────────────
  UI.erp.statusTimeline = function(steps, current) {
    return `<div class="flex items-center gap-0 w-full">${steps.map((step,i) => {
      const done = i < current;
      const active = i === current;
      const line = i < steps.length-1 ? `<div class="flex-1 h-0.5 ${done ? 'bg-brand-500' : 'bg-[#EDE6DC]'} mx-1"></div>` : '';
      return `<div class="flex items-center gap-0 ${i < steps.length-1 ? 'flex-1' : ''}"><div class="flex flex-col items-center"><div class="w-8 h-8 ${T.radius.badge} flex items-center justify-center text-xs font-bold ${done ? 'bg-brand-600 text-white' : active ? `border-2 border-brand-500 text-brand-600 ${T.surface}` : `${T.surfaceMuted} ${T.muted}`}">${done ? _svg('check','w-4 h-4') : i+1}</div><span class="text-[10px] mt-1 ${active ? 'text-brand-600 font-semibold' : T.muted} whitespace-nowrap">${step}</span></div>${line}</div>`;
    }).join('')}</div>`;
  };

  // ── DOCUMENT HEADER (for invoices, OC, etc.) ────────────
  UI.erp.docHeader = function(docType, docNum, status, statusColor, date) {
    return `<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"><div class="flex items-center gap-3"><span class="${T.mono} ${T.muted}">${docType}</span><span class="text-xl font-bold text-night-900 dark:text-white font-mono">${docNum}</span>${UI.badge(status, statusColor)}</div><span class="text-sm ${T.muted} font-mono">${date}</span></div>`;
  };

  // ── METRIC CARD (compact) ───────────────────────────────
  UI.erp.metricCard = function(label, value, trend, trendColor) {
    return `<div class="${T.surface} ${T.radius.inner} p-4 border ${T.border} ${T.shadow.card}"><p class="${T.mono} ${T.muted} mb-1">${label}</p><p class="text-2xl font-bold text-night-900 dark:text-white tracking-tight font-mono">${value}</p>${trend ? `<p class="text-xs font-semibold ${trendColor==='up'?'text-green-600':'text-red-500'} mt-1">${trendColor==='up'?'↑':'↓'} ${trend}</p>` : ''}</div>`;
  };

  // ── TEAM MEMBER ─────────────────────────────────────────
  UI.erp.teamMember = function(name, role, dept, status) {
    return `<div class="${T.surface} ${T.radius.inner} p-4 border ${T.border} flex items-center gap-4 hover:${T.shadow.card} transition-all">${UI.avatar(name,'md')}<div class="flex-1 min-w-0"><p class="text-sm font-semibold text-night-800 dark:text-night-100 truncate">${name}</p><p class="text-xs ${T.muted} truncate">${role} — ${dept}</p></div>${UI.badge(status, status==='Activo'?'green':'gray')}</div>`;
  };

  // ── FLAG ────────────────────────────────────────────────
  UI.erp.flag = function(code) {
    const flags = {PE:'🇵🇪',US:'🇺🇸',BR:'🇧🇷',CO:'🇨🇴',CL:'🇨🇱',MX:'🇲🇽',AR:'🇦🇷',EC:'🇪🇨'};
    return `<span class="text-lg leading-none">${flags[code]||code}</span>`;
  };

  // ════════════════════════════════════════════════════════
  // 5. DATA TABLE — TanStack/shadcn inspired
  //    Features: sort, filter, search, select, paginate,
  //    column visibility, row actions, bulk actions
  // ════════════════════════════════════════════════════════

  UI.dataTable = function(config) {
    const {
      id = 'dt-' + Math.random().toString(36).substring(2,8),
      title = '',
      subtitle = '',
      columns = [],       // [{key, label, sortable, filterable, type:'text'|'badge'|'currency'|'date'|'avatar', render, hidden, width}]
      data = [],           // [{...row data}]
      pageSize = 10,
      searchable = true,
      selectable = true,
      actions = [],        // [{label, onclick, color}] per-row
      bulkActions = [],    // [{label, onclick, color}] for selected rows
      toolbar = '',        // extra HTML for toolbar
      onRowClick = '',     // onclick handler
      emptyMsg = 'No se encontraron registros',
      filterTabs = [],     // [{label, key, value}] quick filters
    } = config;

    // Store config globally for interactivity
    window._dt = window._dt || {};
    window._dt[id] = {
      data: [...data],
      filtered: [...data],
      columns: columns,
      page: 1,
      pageSize: pageSize,
      sortKey: null,
      sortDir: 'asc',
      search: '',
      selected: new Set(),
      hiddenCols: new Set(columns.filter(c => c.hidden).map(c => c.key)),
      activeFilter: null,
    };

    const state = window._dt[id];

    // Use a safe prefix (replace dashes with underscores for valid JS identifiers)
    const sid = id.replace(/-/g, '_');
    window['_dtRender_' + sid] = function() { UI._renderDataTable(id); };
    window['_dtSort_' + sid] = function(key) { UI._sortDataTable(id, key); };
    window['_dtSearch_' + sid] = function(val) { UI._searchDataTable(id, val); };
    window['_dtPage_' + sid] = function(p) { UI._pageDataTable(id, p); };
    window['_dtSelect_' + sid] = function(idx) { UI._selectRow(id, idx); };
    window['_dtSelectAll_' + sid] = function(el) { UI._selectAll(id, el.checked); };
    window['_dtToggleCol_' + sid] = function(key) { UI._toggleCol(id, key); };
    window['_dtFilter_' + sid] = function(key, val) { UI._filterDataTable(id, key, val); };

    // Render initial
    setTimeout(() => UI._renderDataTable(id), 0);

    const filterTabsHtml = filterTabs.length > 0 ? `
      <div class="flex items-center gap-1.5 px-5 py-2 border-b ${T.divider} bg-[#FAFAF8] dark:bg-night-700/20 overflow-x-auto">
        <button onclick="_dtFilter_${sid}(null,null)" class="dt-ftab px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-white dark:bg-night-600 text-night-800 dark:text-white shadow-sm" data-filter="all">Todos</button>
        ${filterTabs.map(ft => `<button onclick="_dtFilter_${sid}('${ft.key}','${ft.value}')" class="dt-ftab px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-500 hover:text-night-700 hover:bg-white" data-filter="${ft.value}">${ft.label}</button>`).join('')}
      </div>` : '';

    return `
      <div id="${id}" class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} overflow-hidden">
        <!-- Toolbar -->
        <div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${T.divider}">
          <div>
            ${title ? `<h4 class="font-bold text-night-800 dark:text-white text-[15px] tracking-tight">${title}</h4>` : ''}
            ${subtitle ? `<p class="text-xs ${T.muted} mt-0.5">${subtitle}</p>` : ''}
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${searchable ? `<div class="relative"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#B8A898]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg><input type="text" placeholder="Buscar..." oninput="_dtSearch_${sid}(this.value)" class="pl-9 pr-3 py-2 text-xs ${T.surfaceAlt} border ${T.border} ${T.radius.input} w-48 text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-2 focus:ring-brand-200 transition-all"/></div>` : ''}
            <!-- Column visibility -->
            <div class="relative" id="${id}-colvis">
              <button onclick="var m=document.getElementById('${id}-colmenu');m.style.display=m.style.display==='block'?'none':'block'" class="p-2 ${T.radius.sm} border ${T.border} text-[#9C8B7A] hover:text-night-600 hover:bg-[#F6F3EF] transition-all" title="Mostrar/ocultar columnas">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              <div class="absolute right-0 mt-2 w-52 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 py-2" style="display:none" id="${id}-colmenu">
                <p class="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b ${T.divider} mb-1">Columnas visibles</p>
                ${columns.map(c => `<label class="flex items-center gap-2.5 px-3 py-2 text-xs text-night-600 dark:text-night-300 hover:bg-[#F6F3EF] dark:hover:bg-night-700 cursor-pointer transition-colors"><input type="checkbox" ${c.hidden?'':'checked'} onchange="_dtToggleCol_${sid}('${c.key}')" class="w-4 h-4 rounded border-gray-300 text-brand-600 accent-brand-600"/><span>${c.label}</span></label>`).join('')}
              </div>
            </div>
            ${toolbar}
          </div>
        </div>
        ${filterTabsHtml}
        <!-- Bulk actions bar (hidden by default) -->
        <div id="${id}-bulk" class="hidden px-5 py-2.5 bg-brand-50 dark:bg-brand-900/20 border-b ${T.divider} flex items-center gap-3">
          <span class="text-xs font-semibold text-brand-700 dark:text-brand-300" id="${id}-selcount">0 seleccionados</span>
          ${bulkActions.map(a => `<button onclick="${a.onclick}" class="text-xs font-medium px-3 py-1 ${T.radius.btn} ${a.color === 'danger' ? 'text-red-600 hover:bg-red-50' : 'text-brand-600 hover:bg-brand-100'} transition-all">${a.label}</button>`).join('')}
          <button onclick="_dtSelectAll_${sid}({checked:false})" class="text-xs text-gray-500 hover:text-gray-700 ml-auto">Deseleccionar</button>
        </div>
        <!-- Table body (rendered dynamically) -->
        <div id="${id}-body" class="overflow-x-auto"></div>
        <!-- Pagination -->
        <div id="${id}-footer" class="px-5 py-3 flex items-center justify-between border-t ${T.divider}"></div>
      </div>`;
  };

  // ── DataTable: render ───────────────────────────────────
  UI._renderDataTable = function(id) {
    const s = window._dt[id];
    if (!s) return;
    const sid = id.replace(/-/g, '_');
    const body = document.getElementById(id + '-body');
    const footer = document.getElementById(id + '-footer');
    if (!body || !footer) return;

    const visCols = s.columns.filter(c => !s.hiddenCols.has(c.key));
    const start = (s.page - 1) * s.pageSize;
    const pageData = s.filtered.slice(start, start + s.pageSize);
    const totalPages = Math.ceil(s.filtered.length / s.pageSize);
    const allSelected = pageData.length > 0 && pageData.every((_, i) => s.selected.has(start + i));

    // Table
    body.innerHTML = `<table class="w-full text-sm">
      <thead><tr class="border-b ${T.divider}">
        <th class="w-10 px-3 py-3"><input type="checkbox" ${allSelected ? 'checked' : ''} onchange="_dtSelectAll_${sid}(this)" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600 cursor-pointer"/></th>
        ${visCols.map(c => {
          const sorted = s.sortKey === c.key;
          const arrow = sorted ? (s.sortDir === 'asc' ? '↑' : '↓') : '';
          return `<th class="px-4 py-3 text-left whitespace-nowrap ${c.sortable !== false ? 'cursor-pointer hover:bg-[#FAFAF8] dark:hover:bg-night-700/30 select-none' : ''} transition-colors" ${c.sortable !== false ? `onclick="_dtSort_${sid}('${c.key}')"` : ''} ${c.width ? `style="width:${c.width}"` : ''}>
            <span class="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[.1em] ${sorted ? 'text-brand-600' : T.muted}">${c.label} ${arrow ? `<span class="text-brand-500">${arrow}</span>` : ''}</span>
          </th>`;
        }).join('')}
        <th class="w-12 px-3 py-3"></th>
      </tr></thead>
      <tbody class="divide-y divide-[rgba(196,168,130,0.06)]">
        ${pageData.length === 0 ? `<tr><td colspan="${visCols.length + 2}" class="py-12 text-center"><div class="flex flex-col items-center"><svg class="w-10 h-10 text-[#D4C4B0] mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg><p class="text-sm ${T.muted}">${s.emptyMsg || 'Sin registros'}</p></div></td></tr>` :
        pageData.map((row, ri) => {
          const globalIdx = start + ri;
          const sel = s.selected.has(globalIdx);
          return `<tr class="group hover:bg-[rgba(168,65,23,0.02)] dark:hover:bg-night-700/20 transition-colors ${sel ? 'bg-brand-50/50 dark:bg-brand-900/10' : ''}">
            <td class="w-10 px-3 py-3"><input type="checkbox" ${sel ? 'checked' : ''} onchange="_dtSelect_${sid}(${globalIdx})" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600 cursor-pointer"/></td>
            ${visCols.map(c => {
              let val = row[c.key] ?? '-';
              // Type rendering
              if (c.render) val = c.render(val, row);
              else if (c.type === 'badge') val = UI.badge(val, row[c.key + '_color'] || 'gray');
              else if (c.type === 'currency') val = `<span class="font-mono font-semibold text-night-800 dark:text-night-100">S/ ${Number(val).toLocaleString('es-PE', {minimumFractionDigits:2})}</span>`;
              else if (c.type === 'date') val = `<span class="font-mono text-night-500 text-xs">${val}</span>`;
              else if (c.type === 'avatar') {
                const name = val || '?';
                val = `<div class="flex items-center gap-3">${UI.avatar(name, 'sm')}<div><p class="text-sm font-semibold text-night-800 dark:text-night-100">${name}</p>${row[c.key + '_sub'] ? `<p class="text-xs ${T.muted}">${row[c.key + '_sub']}</p>` : ''}</div></div>`;
              }
              return `<td class="px-4 py-3 text-night-700 dark:text-night-200">${val}</td>`;
            }).join('')}
            <td class="w-12 px-3 py-3 text-right">
              <button onclick="document.getElementById('${id}-actions-${globalIdx}').classList.toggle('hidden')" class="p-1 ${T.radius.sm} text-[#B8A898] hover:text-night-600 hover:bg-[#F6F3EF] opacity-0 group-hover:opacity-100 transition-all">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
              </button>
              <div id="${id}-actions-${globalIdx}" class="hidden absolute right-8 mt-1 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 py-1 w-40">
                ${(row._actions || []).concat([{label:'Ver detalle'},{label:'Editar'},{divider:true},{label:'Eliminar',color:'red'}]).map(a => a.divider ? `<div class="my-1 border-t ${T.divider}"></div>` : `<button onclick="${a.onclick||''};document.getElementById('${id}-actions-${globalIdx}').classList.add('hidden')" class="w-full text-left px-3 py-1.5 text-xs ${a.color==='red'?'text-red-600 hover:bg-red-50':'text-night-600 hover:bg-[#F6F3EF]'} transition-colors">${a.label}</button>`).join('')}
              </div>
            </td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;

    // Footer
    const showing = s.filtered.length === 0 ? '0' : `${start+1}-${Math.min(start+s.pageSize, s.filtered.length)}`;
    footer.innerHTML = `
      <span class="text-xs ${T.muted}">Mostrando <span class="font-semibold text-night-700 dark:text-night-200">${showing}</span> de <span class="font-semibold text-night-700 dark:text-night-200">${s.filtered.length}</span></span>
      <div class="flex items-center gap-1">
        <button onclick="_dtPage_${sid}(${s.page-1})" ${s.page<=1?'disabled':''} class="w-8 h-8 ${T.radius.sm} flex items-center justify-center ${T.muted} hover:bg-[#F6F3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-all"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
        ${Array.from({length: Math.min(totalPages, 5)}, (_, i) => {
          let p = i + 1;
          if (totalPages > 5) {
            if (s.page <= 3) p = i + 1;
            else if (s.page >= totalPages - 2) p = totalPages - 4 + i;
            else p = s.page - 2 + i;
          }
          return `<button onclick="_dtPage_${sid}(${p})" class="w-8 h-8 ${T.radius.sm} flex items-center justify-center text-xs font-medium transition-all ${p === s.page ? 'bg-brand-600 text-white shadow-sm' : 'text-night-500 hover:bg-[#F6F3EF]'}">${p}</button>`;
        }).join('')}
        <button onclick="_dtPage_${sid}(${s.page+1})" ${s.page>=totalPages?'disabled':''} class="w-8 h-8 ${T.radius.sm} flex items-center justify-center ${T.muted} hover:bg-[#F6F3EF] disabled:opacity-30 disabled:cursor-not-allowed transition-all"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
      </div>`;

    // Bulk bar
    const bulk = document.getElementById(id + '-bulk');
    if (bulk) {
      if (s.selected.size > 0) {
        bulk.classList.remove('hidden');
        const cnt = document.getElementById(id + '-selcount');
        if (cnt) cnt.textContent = s.selected.size + ' seleccionado' + (s.selected.size > 1 ? 's' : '');
      } else {
        bulk.classList.add('hidden');
      }
    }

    // Column vis menu: don't touch display state during render (user controls it)
  };

  UI._sortDataTable = function(id, key) {
    const s = window._dt[id]; if (!s) return;
    if (s.sortKey === key) s.sortDir = s.sortDir === 'asc' ? 'desc' : 'asc';
    else { s.sortKey = key; s.sortDir = 'asc'; }
    s.filtered.sort((a, b) => {
      let va = a[key], vb = b[key];
      if (va == null) return 1; if (vb == null) return -1;
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      const cmp = va < vb ? -1 : va > vb ? 1 : 0;
      return s.sortDir === 'asc' ? cmp : -cmp;
    });
    s.page = 1;
    UI._renderDataTable(id);
  };

  UI._searchDataTable = function(id, val) {
    const s = window._dt[id]; if (!s) return;
    s.search = val.toLowerCase();
    s.filtered = s.data.filter(row => {
      if (!s.search) return true;
      return s.columns.some(c => {
        const v = row[c.key];
        return v != null && String(v).toLowerCase().includes(s.search);
      });
    });
    if (s.activeFilter) {
      s.filtered = s.filtered.filter(r => r[s.activeFilter.key] === s.activeFilter.value);
    }
    s.page = 1; s.selected.clear();
    UI._renderDataTable(id);
  };

  UI._pageDataTable = function(id, p) {
    const s = window._dt[id]; if (!s) return;
    const maxP = Math.ceil(s.filtered.length / s.pageSize);
    s.page = Math.max(1, Math.min(p, maxP));
    UI._renderDataTable(id);
  };

  UI._selectRow = function(id, idx) {
    const s = window._dt[id]; if (!s) return;
    s.selected.has(idx) ? s.selected.delete(idx) : s.selected.add(idx);
    UI._renderDataTable(id);
  };

  UI._selectAll = function(id, checked) {
    const s = window._dt[id]; if (!s) return;
    const start = (s.page - 1) * s.pageSize;
    const end = Math.min(start + s.pageSize, s.filtered.length);
    for (let i = start; i < end; i++) checked ? s.selected.add(i) : s.selected.delete(i);
    if (!checked) s.selected.clear();
    UI._renderDataTable(id);
  };

  UI._toggleCol = function(id, key) {
    const s = window._dt[id]; if (!s) return;
    s.hiddenCols.has(key) ? s.hiddenCols.delete(key) : s.hiddenCols.add(key);
    // Keep column menu open after toggle
    const menuVisible = document.getElementById(id + '-colmenu');
    UI._renderDataTable(id);
    // Re-show the menu since render doesn't touch it, but update checkbox states
    if (menuVisible) {
      const menu = document.getElementById(id + '-colmenu');
      if (menu) {
        menu.style.display = 'block';
        menu.querySelectorAll('input[type="checkbox"]').forEach(cb => {
          const colKey = cb.getAttribute('onchange').match(/'([^']+)'/)?.[1];
          if (colKey) cb.checked = !s.hiddenCols.has(colKey);
        });
      }
    }
  };

  UI._filterDataTable = function(id, key, value) {
    const s = window._dt[id]; if (!s) return;
    s.activeFilter = key ? { key, value } : null;
    s.filtered = s.data.filter(row => {
      const matchSearch = !s.search || s.columns.some(c => { const v = row[c.key]; return v != null && String(v).toLowerCase().includes(s.search); });
      const matchFilter = !s.activeFilter || row[s.activeFilter.key] === s.activeFilter.value;
      return matchSearch && matchFilter;
    });
    if (s.sortKey) {
      s.filtered.sort((a,b) => { let va=a[s.sortKey],vb=b[s.sortKey]; if(va==null)return 1;if(vb==null)return -1;if(typeof va==='string')va=va.toLowerCase();if(typeof vb==='string')vb=vb.toLowerCase();const c=va<vb?-1:va>vb?1:0;return s.sortDir==='asc'?c:-c; });
    }
    s.page = 1; s.selected.clear();
    // Update filter tab active states
    const tabs = document.querySelectorAll('#' + id + ' .dt-ftab');
    tabs.forEach(t => {
      const isAll = t.dataset.filter === 'all';
      const isActive = (!key && isAll) || (value && t.dataset.filter === value);
      t.className = t.className.replace(/bg-white|shadow-sm|text-night-800|text-gray-500/g, '');
      t.classList.add(isActive ? 'bg-white' : 'text-gray-500');
      if (isActive) { t.classList.add('shadow-sm', 'text-night-800'); }
    });
    UI._renderDataTable(id);
  };

  // Close menus on outside click
  document.addEventListener('click', function(e) {
    // Close column visibility menus
    document.querySelectorAll('[id$="-colmenu"]').forEach(menu => {
      const wrapper = menu.closest('[id$="-colvis"]');
      if (wrapper && !wrapper.contains(e.target) && menu.style.display === 'block') {
        menu.style.display = 'none';
      }
    });
    // Close row action menus
    document.querySelectorAll('[id*="-actions-"]').forEach(el => {
      if (!el.classList.contains('hidden') && !el.contains(e.target) && !e.target.closest('button[onclick*="actions"]')) {
        el.classList.add('hidden');
      }
    });
  });

  // ════════════════════════════════════════════════════════
  // 6. CUSTOM SELECT / COMBOBOX (searchable dropdown)
  // ════════════════════════════════════════════════════════

  UI.combobox = function(id, options, config = {}) {
    const { value='', placeholder='Seleccionar...', searchable=true, label='', required=false, icon='' } = config;
    const uid = id || _uid('cb');
    const selLabel = options.find(o => (typeof o === 'string' ? o : o.value) === value);
    const displayText = selLabel ? (typeof selLabel === 'string' ? selLabel : selLabel.label) : placeholder;

    setTimeout(() => {
      const wrap = document.getElementById(uid);
      if (!wrap) return;
      const trigger = wrap.querySelector('.cb-trigger');
      const menu = wrap.querySelector('.cb-menu');
      const search = wrap.querySelector('.cb-search');
      const hidden = wrap.querySelector('.cb-value');
      const items = wrap.querySelectorAll('.cb-item');
      const display = wrap.querySelector('.cb-display');

      let isOpen = false;
      const open = () => { menu.style.display = 'block'; isOpen = true; if (search) { search.value = ''; search.focus(); items.forEach(i => i.style.display = ''); } requestAnimationFrame(() => menu.style.opacity = '1'); };
      const close = () => { menu.style.opacity = '0'; setTimeout(() => { menu.style.display = 'none'; isOpen = false; }, 150); };
      trigger.onclick = () => isOpen ? close() : open();
      document.addEventListener('click', e => { if (isOpen && !wrap.contains(e.target)) close(); });
      if (search) search.oninput = function() { const q = this.value.toLowerCase(); items.forEach(i => { i.style.display = i.textContent.toLowerCase().includes(q) ? '' : 'none'; }); };
      items.forEach(item => { item.onclick = () => { hidden.value = item.dataset.value; display.textContent = item.textContent; items.forEach(i => i.classList.remove('bg-brand-50','text-brand-700','dark:bg-brand-900/20')); item.classList.add('bg-brand-50','text-brand-700','dark:bg-brand-900/20'); close(); hidden.dispatchEvent(new Event('change')); }; });
      wrap.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }, 0);

    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}${required ? '<span class="text-red-500 ml-0.5">*</span>' : ''}</label>` : ''}
      <div id="${uid}" class="relative">
        <input type="hidden" class="cb-value" name="${uid}" value="${value}"/>
        <button type="button" class="cb-trigger w-full flex items-center gap-2 px-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-left transition-all hover:border-[#C4A882] focus:ring-2 focus:ring-brand-200 focus:border-brand-300">
          ${icon ? `<span class="w-4 h-4 ${T.muted} flex-shrink-0">${icon}</span>` : ''}
          <span class="cb-display flex-1 truncate ${value ? 'text-night-700 dark:text-night-200' : T.muted}">${displayText}</span>
          <svg class="w-4 h-4 ${T.muted} flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        </button>
        <div class="cb-menu absolute top-full left-0 right-0 mt-1.5 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 py-1 max-h-64 overflow-y-auto opacity-0 transition-opacity duration-150" style="display:none">
          ${searchable ? `<div class="px-2 py-1.5 border-b ${T.divider}"><input type="text" class="cb-search w-full px-3 py-2 text-xs ${T.surfaceAlt} border ${T.border} ${T.radius.sm} placeholder-[#B8A898] focus:ring-1 focus:ring-brand-200 transition-all" placeholder="Buscar..."/></div>` : ''}
          ${options.map(o => {
            const val = typeof o === 'string' ? o : o.value;
            const lbl = typeof o === 'string' ? o : o.label;
            const desc = typeof o === 'object' ? o.desc || '' : '';
            const img = typeof o === 'object' ? o.img || '' : '';
            const avatar = typeof o === 'object' ? o.avatar || '' : '';
            const badge = typeof o === 'object' ? o.badge || '' : '';
            const badgeColor = typeof o === 'object' ? o.badgeColor || 'gray' : 'gray';
            const isActive = val === value;
            const imgHtml = img ? `<img src="${img}" alt="" class="w-8 h-8 rounded-xl object-cover flex-shrink-0"/>` :
                            avatar ? `<div class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:linear-gradient(135deg,#C0601E,#8a3512)">${avatar.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}</div>` : '';
            return `<div class="cb-item flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-[rgba(168,65,23,0.04)] ${isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20' : 'text-night-600 dark:text-night-300'}" data-value="${val}">
              ${imgHtml}
              <div class="flex-1 min-w-0"><p class="font-medium truncate">${lbl}</p>${desc ? `<p class="text-[10px] ${T.muted} mt-0.5 truncate">${desc}</p>` : ''}</div>
              ${badge ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-${badgeColor}-500/10 text-${badgeColor}-600 flex-shrink-0">${badge}</span>` : ''}
              ${isActive ? `<svg class="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>` : ''}
            </div>`;
          }).join('')}
        </div>
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 7. DATEPICKER (Calendar with presets, month/year nav, range)
  // ════════════════════════════════════════════════════════

  const _dpMonths = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  const _dpDays = ['Lu','Ma','Mi','Ju','Vi','Sa','Do'];
  const _dpFmt = (d) => { const dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'); return `${dd}/${mm}/${d.getFullYear()}`; };
  const _dpIso = (d) => d.toISOString().split('T')[0];
  const _dpParse = (s) => { if(!s) return null; const p=s.includes('/')? s.split('/').reverse().join('-'):s; const d=new Date(p); return isNaN(d)?null:d; };
  const _dpSame = (a,b) => a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();
  const _dpBetween = (d,s,e) => d>=s&&d<=e;

  UI.datePicker = function(id, config = {}) {
    const { value='', label='', placeholder='dd/mm/aaaa', required=false, presets=false, range=false } = config;
    const uid = id || _uid('dp');
    const popupW = presets || range ? 'w-[420px]' : 'w-[290px]';

    setTimeout(() => {
      const wrap = document.getElementById(uid);
      if (!wrap) return;
      const input = wrap.querySelector('.dp-input');
      const popup = wrap.querySelector('.dp-popup');
      const hiddenStart = wrap.querySelector('.dp-start');
      const hiddenEnd = wrap.querySelector('.dp-end');
      let cur = _dpParse(value) || new Date();
      let selStart = _dpParse(value);
      let selEnd = range ? null : selStart;
      let picking = 'start'; // 'start' or 'end' for range mode
      let viewMode = 'days'; // 'days', 'months', 'years'
      let isOpen = false;

      function renderDays() {
        const y=cur.getFullYear(), m=cur.getMonth();
        const first=(new Date(y,m,1).getDay()+6)%7;
        const dim=new Date(y,m+1,0).getDate();
        const today=new Date(); today.setHours(0,0,0,0);
        const prevDim = new Date(y,m,0).getDate();

        let grid = '';
        // Previous month faded days
        for(let i=first-1;i>=0;i--) grid += `<div class="w-9 h-9 flex items-center justify-center text-xs text-gray-300 dark:text-night-600">${prevDim-i}</div>`;
        // Current month
        for(let d=1;d<=dim;d++){
          const date=new Date(y,m,d); date.setHours(0,0,0,0);
          const isToday=_dpSame(date,today);
          const isSel=_dpSame(date,selStart)||_dpSame(date,selEnd);
          const inRange=range&&selStart&&selEnd&&_dpBetween(date,selStart,selEnd);
          const isRangeEdge=isSel&&range;
          let cls='text-night-600 dark:text-night-300 hover:bg-brand-50 dark:hover:bg-brand-900/20';
          if(isSel) cls='bg-brand-600 text-white font-bold shadow-sm';
          else if(inRange) cls='bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200';
          else if(isToday) cls='ring-2 ring-brand-300 text-brand-700 font-semibold';
          const roundL = (isRangeEdge&&_dpSame(date,selStart))||(!range&&isSel) ? 'rounded-l-lg':'';
          const roundR = (isRangeEdge&&_dpSame(date,selEnd))||(!range&&isSel) ? 'rounded-r-lg':'';
          grid += `<button type="button" class="dp-day w-9 h-9 text-xs transition-all ${cls} ${roundL} ${roundR}" data-date="${_dpIso(date)}">${d}</button>`;
        }
        // Next month faded
        const total = first+dim;
        const rem = (7-total%7)%7;
        for(let i=1;i<=rem;i++) grid += `<div class="w-9 h-9 flex items-center justify-center text-xs text-gray-300 dark:text-night-600">${i}</div>`;
        return grid;
      }

      function renderMonths() {
        return _dpMonths.map((m,i) => {
          const isCur = i===cur.getMonth()&&cur.getFullYear()===new Date().getFullYear();
          return `<button type="button" class="dp-month px-2 py-3 text-sm ${T.radius.sm} transition-all ${isCur?'bg-brand-600 text-white font-bold':'text-night-600 dark:text-night-300 hover:bg-brand-50'}" data-month="${i}">${m.slice(0,3)}</button>`;
        }).join('');
      }

      function renderYears() {
        const cy=cur.getFullYear(); const start=cy-6;
        return Array.from({length:12},(_,i)=>{
          const y=start+i; const isCur=y===new Date().getFullYear();
          return `<button type="button" class="dp-year px-2 py-3 text-sm ${T.radius.sm} transition-all ${isCur?'bg-brand-600 text-white font-bold':'text-night-600 dark:text-night-300 hover:bg-brand-50'}" data-year="${y}">${y}</button>`;
        }).join('');
      }

      function render() {
        const y=cur.getFullYear(), m=cur.getMonth();
        let presetsHtml = '';
        if (presets) {
          const today = new Date(); today.setHours(0,0,0,0);
          const presetList = [
            {label:'Hoy', fn:()=>{selStart=new Date(today);selEnd=range?new Date(today):null;}},
            {label:'Ayer', fn:()=>{const d=new Date(today);d.setDate(d.getDate()-1);selStart=d;selEnd=range?new Date(d):null;}},
            {label:'Ultimos 7 dias', fn:()=>{selEnd=new Date(today);selStart=new Date(today);selStart.setDate(selStart.getDate()-6);}},
            {label:'Ultimo mes', fn:()=>{selEnd=new Date(today);selStart=new Date(today);selStart.setMonth(selStart.getMonth()-1);}},
            {label:'Ultimos 3 meses', fn:()=>{selEnd=new Date(today);selStart=new Date(today);selStart.setMonth(selStart.getMonth()-3);}},
            {label:'Este anio', fn:()=>{selEnd=new Date(today);selStart=new Date(y,0,1);}},
            {label:'Ultimo anio', fn:()=>{selEnd=new Date(today);selStart=new Date(today);selStart.setFullYear(selStart.getFullYear()-1);}},
          ];
          presetsHtml = `<div class="w-[130px] border-r ${T.divider} py-2 flex-shrink-0">
            <p class="px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider ${T.muted}">Rapido</p>
            ${presetList.map((p,i)=>`<button type="button" class="dp-preset w-full text-left px-3 py-1.5 text-xs text-night-600 dark:text-night-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors" data-idx="${i}">${p.label}</button>`).join('')}
          </div>`;
          // Store presets for click handler
          wrap._presets = presetList;
        }

        let navTitle = '';
        if(viewMode==='days') navTitle = `${_dpMonths[m]} ${y}`;
        else if(viewMode==='months') navTitle = `${y}`;
        else navTitle = `${y-6} — ${y+5}`;

        const calHtml = `<div class="flex-1 p-2">
          <!-- Nav -->
          <div class="flex items-center justify-between px-1 py-1.5 mb-1">
            <button type="button" class="dp-prev p-1.5 ${T.radius.sm} ${T.muted} hover:bg-[#F6F3EF] transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg></button>
            <button type="button" class="dp-title text-sm font-semibold text-night-800 dark:text-night-100 hover:text-brand-600 transition-colors">${navTitle}</button>
            <button type="button" class="dp-next p-1.5 ${T.radius.sm} ${T.muted} hover:bg-[#F6F3EF] transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg></button>
          </div>
          ${viewMode==='days' ? `
            <div class="grid grid-cols-7 gap-0">${_dpDays.map(d=>`<div class="text-center text-[10px] font-semibold ${T.muted} py-1.5">${d}</div>`).join('')}</div>
            <div class="grid grid-cols-7 gap-0">${renderDays()}</div>
          ` : viewMode==='months' ? `<div class="grid grid-cols-3 gap-1">${renderMonths()}</div>` : `<div class="grid grid-cols-3 gap-1">${renderYears()}</div>`}
          <!-- Footer -->
          <div class="flex items-center justify-between mt-2 pt-2 border-t ${T.divider}">
            ${range && selStart && selEnd ? `<span class="text-[10px] ${T.muted} font-mono">${_dpFmt(selStart)} — ${_dpFmt(selEnd)}</span>` : `<span class="text-[10px] ${T.muted} font-mono">${selStart ? _dpFmt(selStart) : '—'}</span>`}
            <div class="flex gap-2">
              <button type="button" class="dp-clear text-[11px] font-medium ${T.muted} hover:text-night-600 transition-colors">Limpiar</button>
              ${range ? `<button type="button" class="dp-apply text-[11px] font-semibold text-brand-600 hover:text-brand-700 px-2.5 py-1 ${T.radius.sm} bg-brand-50 hover:bg-brand-100 transition-all">Aplicar</button>` : ''}
            </div>
          </div>
        </div>`;

        popup.innerHTML = `<div class="flex">${presetsHtml}${calHtml}</div>`;

        // Bind events
        popup.querySelector('.dp-prev').onclick=(e)=>{e.stopPropagation();if(viewMode==='days')cur.setMonth(m-1);else if(viewMode==='months')cur.setFullYear(y-1);else cur.setFullYear(y-12);render();};
        popup.querySelector('.dp-next').onclick=(e)=>{e.stopPropagation();if(viewMode==='days')cur.setMonth(m+1);else if(viewMode==='months')cur.setFullYear(y+1);else cur.setFullYear(y+12);render();};
        popup.querySelector('.dp-title').onclick=(e)=>{e.stopPropagation();if(viewMode==='days')viewMode='months';else if(viewMode==='months')viewMode='years';else viewMode='days';render();};
        popup.querySelector('.dp-clear').onclick=(e)=>{e.stopPropagation();selStart=null;selEnd=null;picking='start';input.value='';hiddenStart.value='';if(hiddenEnd)hiddenEnd.value='';close();};
        const applyBtn=popup.querySelector('.dp-apply');
        if(applyBtn)applyBtn.onclick=(e)=>{e.stopPropagation();applySelection();close();};
        popup.querySelectorAll('.dp-day').forEach(btn=>{btn.onclick=(e)=>{e.stopPropagation();const d=new Date(btn.dataset.date);d.setHours(0,0,0,0);
          if(range){if(picking==='start'){selStart=d;selEnd=null;picking='end';}else{if(d<selStart){selEnd=selStart;selStart=d;}else{selEnd=d;}picking='start';if(!presets)applySelection();}}
          else{selStart=d;cur=new Date(d);applySelection();close();}
          render();};});
        popup.querySelectorAll('.dp-month').forEach(btn=>{btn.onclick=(e)=>{e.stopPropagation();cur.setMonth(parseInt(btn.dataset.month));viewMode='days';render();};});
        popup.querySelectorAll('.dp-year').forEach(btn=>{btn.onclick=(e)=>{e.stopPropagation();cur.setFullYear(parseInt(btn.dataset.year));viewMode='months';render();};});
        popup.querySelectorAll('.dp-preset').forEach(btn=>{btn.onclick=(e)=>{e.stopPropagation();const p=wrap._presets[parseInt(btn.dataset.idx)];if(p){p.fn();cur=new Date(selStart);applySelection();if(!range)close();render();}};});
      }

      function applySelection(){
        if(selStart){
          hiddenStart.value=_dpIso(selStart);
          if(range&&selEnd){input.value=_dpFmt(selStart)+' — '+_dpFmt(selEnd);if(hiddenEnd)hiddenEnd.value=_dpIso(selEnd);}
          else{input.value=_dpFmt(selStart);}
          hiddenStart.dispatchEvent(new Event('change'));
        }
      }

      function open(){popup.style.display='block';isOpen=true;viewMode='days';render();requestAnimationFrame(()=>popup.style.opacity='1');}
      function close(){popup.style.opacity='0';setTimeout(()=>{popup.style.display='none';isOpen=false;},150);}

      input.onclick=()=>isOpen?close():open();
      document.addEventListener('click',e=>{if(isOpen&&!wrap.contains(e.target))close();});
      wrap.addEventListener('keydown',e=>{if(e.key==='Escape')close();});
    }, 0);

    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}${required?'<span class="text-red-500 ml-0.5">*</span>':''}</label>` : ''}
      <div id="${uid}" class="relative">
        <input type="hidden" class="dp-start" name="${uid}" value="${value?(_dpParse(value)?_dpIso(_dpParse(value)):''):''}"/>
        ${range ? `<input type="hidden" class="dp-end" name="${uid}-end" value=""/>` : ''}
        <div class="relative">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${T.muted} pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <input type="text" class="dp-input w-full pl-10 pr-4 py-2.5 text-sm ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 placeholder-[#B8A898] cursor-pointer focus:ring-2 focus:ring-brand-200 transition-all" value="${value}" placeholder="${placeholder}" readonly/>
        </div>
        <div class="dp-popup absolute top-full left-0 mt-1.5 ${popupW} ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 opacity-0 transition-opacity duration-150" style="display:none"></div>
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 8. MULTI-SELECT (Tags)
  // ════════════════════════════════════════════════════════

  UI.multiSelect = function(id, options, config = {}) {
    const { value=[], label='', placeholder='Agregar...', max=10 } = config;
    const uid = id || _uid('ms');

    setTimeout(() => {
      const wrap = document.getElementById(uid);
      if (!wrap) return;
      const tagsEl = wrap.querySelector('.ms-tags');
      const input = wrap.querySelector('.ms-input');
      const menu = wrap.querySelector('.ms-menu');
      let selected = [...value];

      function renderTags() {
        tagsEl.innerHTML = selected.map(v => {
          const opt = options.find(o => (typeof o === 'string' ? o : o.value) === v);
          const lbl = opt ? (typeof opt === 'string' ? opt : opt.label) : v;
          return `<span class="inline-flex items-center gap-1 px-2.5 py-1 ${T.radius.badge} bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300 text-xs font-medium">${lbl}<button type="button" class="ms-remove hover:text-red-500 transition-colors" data-val="${v}">&times;</button></span>`;
        }).join('');
        tagsEl.querySelectorAll('.ms-remove').forEach(btn => { btn.onclick = (e) => { e.stopPropagation(); selected = selected.filter(v => v !== btn.dataset.val); renderTags(); renderMenu(); }; });
      }

      function renderMenu() {
        const q = input.value.toLowerCase();
        const available = options.filter(o => { const v = typeof o === 'string' ? o : o.value; return !selected.includes(v) && (typeof o === 'string' ? o : o.label).toLowerCase().includes(q); });
        menu.innerHTML = available.length === 0 ? `<div class="px-3 py-3 text-xs ${T.muted} text-center">Sin opciones</div>` :
          available.map(o => { const v = typeof o === 'string' ? o : o.value; const l = typeof o === 'string' ? o : o.label; return `<div class="ms-opt px-3 py-2 text-sm text-night-600 dark:text-night-300 cursor-pointer hover:bg-[rgba(168,65,23,0.04)] transition-colors" data-value="${v}">${l}</div>`; }).join('');
        menu.querySelectorAll('.ms-opt').forEach(opt => { opt.onclick = () => { if (selected.length < max) { selected.push(opt.dataset.value); renderTags(); renderMenu(); input.value = ''; } }; });
      }

      input.onfocus = () => { menu.style.display = 'block'; renderMenu(); };
      input.oninput = () => renderMenu();
      document.addEventListener('click', e => { if (!wrap.contains(e.target)) menu.style.display = 'none'; });
      renderTags();
    }, 0);

    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}</label>` : ''}
      <div id="${uid}" class="relative">
        <div class="flex flex-wrap items-center gap-1.5 px-3 py-2 ${T.surfaceAlt} border ${T.border} ${T.radius.input} min-h-[42px] cursor-text" onclick="this.querySelector('.ms-input').focus()">
          <div class="ms-tags flex flex-wrap gap-1.5"></div>
          <input type="text" class="ms-input flex-1 min-w-[80px] bg-transparent border-0 text-sm text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-0 outline-none" placeholder="${placeholder}"/>
        </div>
        <div class="ms-menu absolute top-full left-0 right-0 mt-1.5 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 max-h-48 overflow-y-auto py-1" style="display:none"></div>
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 9. BUTTON LOADING STATE
  // ════════════════════════════════════════════════════════

  UI.buttonLoading = function(text, loadingText = 'Procesando...', type = 'primary', id = '') {
    const uid = id || _uid('bl');
    return `<button id="${uid}" onclick="UI._toggleBtnLoading('${uid}','${loadingText}')" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold ${T.radius.btn} transition-all duration-200 active:scale-[.97] ${type === 'primary' ? 'bg-brand-600 hover:bg-brand-700 text-white ' + T.shadow.card : 'border ' + T.border + ' text-night-700 hover:bg-[#F6F3EF]'}">${text}</button>`;
  };

  UI._toggleBtnLoading = function(id, loadingText) {
    const btn = document.getElementById(id);
    if (!btn || btn.disabled) return;
    const origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.style.opacity = '.7';
    btn.style.cursor = 'not-allowed';
    btn.innerHTML = `<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/></svg>${loadingText}`;
    setTimeout(() => { btn.innerHTML = origHtml; btn.disabled = false; btn.style.opacity = ''; btn.style.cursor = ''; }, 2000);
  };

  // ════════════════════════════════════════════════════════
  // 10. FILE UPLOAD
  // ════════════════════════════════════════════════════════

  UI.fileUpload = function(id, config = {}) {
    const { label='', accept='image/*,.pdf', maxSize='5MB', multiple=false } = config;
    const uid = id || _uid('fu');
    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}</label>` : ''}
      <div id="${uid}" class="border-2 border-dashed border-[#D4C4B0] ${T.radius.inner} p-8 text-center hover:border-brand-400 hover:bg-brand-50/30 transition-all cursor-pointer" onclick="this.querySelector('input').click()">
        <input type="file" accept="${accept}" ${multiple ? 'multiple' : ''} class="hidden" onchange="UI._handleFileUpload('${uid}',this)"/>
        <svg class="w-10 h-10 mx-auto ${T.muted} mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
        <p class="text-sm font-medium text-night-700 dark:text-night-200">Arrastra archivos o <span class="text-brand-600 font-semibold">busca en tu equipo</span></p>
        <p class="text-[11px] ${T.muted} mt-1">${accept.replace(/\./g,'').toUpperCase()} - Max ${maxSize}</p>
        <div class="fu-preview mt-3 hidden"></div>
      </div>`;
  };

  UI._handleFileUpload = function(uid, input) {
    const wrap = document.getElementById(uid);
    const preview = wrap.querySelector('.fu-preview');
    if (!input.files.length) return;
    preview.classList.remove('hidden');
    preview.innerHTML = Array.from(input.files).map(f => `
      <div class="flex items-center gap-3 p-2.5 ${T.surfaceAlt} ${T.radius.sm} border ${T.border} mt-2 text-left">
        <svg class="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
        <div class="flex-1 min-w-0"><p class="text-xs font-medium text-night-700 dark:text-night-200 truncate">${f.name}</p><p class="text-[10px] ${T.muted}">${(f.size/1024).toFixed(1)} KB</p></div>
        <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
      </div>
    `).join('');
  };

  // ════════════════════════════════════════════════════════
  // 11. AVATAR GROUP
  // ════════════════════════════════════════════════════════

  UI.avatarGroup = function(names, max = 4) {
    const show = names.slice(0, max);
    const extra = names.length - max;
    return `<div class="flex -space-x-2">${show.map(n => `<div class="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-night-800" style="background:linear-gradient(135deg,#C0601E,#8a3512)">${n.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)}</div>`).join('')}${extra > 0 ? `<div class="w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold bg-[#F6F3EF] text-night-500 ring-2 ring-white dark:ring-night-800 dark:bg-night-700 dark:text-night-300">+${extra}</div>` : ''}</div>`;
  };

  // ════════════════════════════════════════════════════════
  // 12. SLIDER / RANGE
  // ════════════════════════════════════════════════════════

  UI.slider = function(id, config = {}) {
    const { value=50, min=0, max=100, step=1, label='', showValue=true } = config;
    const uid = id || _uid('sl');
    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}</label>` : ''}
      <div class="flex items-center gap-3">
        <input type="range" id="${uid}" value="${value}" min="${min}" max="${max}" step="${step}" class="flex-1 h-2 bg-[#E8DFD4] rounded-full appearance-none cursor-pointer accent-brand-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white" ${showValue ? `oninput="document.getElementById('${uid}-val').textContent=this.value"` : ''}/>
        ${showValue ? `<span id="${uid}-val" class="font-mono text-sm font-semibold text-night-700 dark:text-night-200 w-12 text-right">${value}</span>` : ''}
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 13. TIME PICKER (modern grid + steppers + presets)
  // ════════════════════════════════════════════════════════

  UI.timePicker = function(id, config = {}) {
    const { value='', label='', required=false, format24=true, presets=true } = config;
    const uid = id || _uid('tp');

    setTimeout(() => {
      const wrap = document.getElementById(uid);
      if (!wrap) return;
      const input = wrap.querySelector('.tp-input');
      const popup = wrap.querySelector('.tp-popup');
      const hDisp = wrap.querySelector('.tp-h');
      const mDisp = wrap.querySelector('.tp-m');
      let isOpen = false, h = 8, m = 0;

      if (value) { const p = value.match(/(\d{1,2}):(\d{2})/); if (p) { h = parseInt(p[1]); m = parseInt(p[2]); } }

      function update() {
        const hS = String(format24 ? h : (h%12||12)).padStart(2,'0');
        const mS = String(m).padStart(2,'0');
        const sfx = format24 ? '' : (h<12?' AM':' PM');
        if (hDisp) hDisp.textContent = hS;
        if (mDisp) mDisp.textContent = mS;
        input.value = hS+':'+mS+sfx;
        wrap.querySelectorAll('.tp-hb').forEach(b => { const a = parseInt(b.dataset.v)===h; b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); b.classList.toggle('shadow-sm',a); });
        wrap.querySelectorAll('.tp-mb').forEach(b => { const a = parseInt(b.dataset.v)===m; b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); b.classList.toggle('shadow-sm',a); });
        wrap.querySelectorAll('.tp-ap').forEach(b => { const a = (b.dataset.v==='AM'&&h<12)||(b.dataset.v==='PM'&&h>=12); b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); });
      }
      function open() { popup.style.display='flex'; isOpen=true; popup.style.opacity='0'; requestAnimationFrame(()=>popup.style.opacity='1'); update(); }
      function close() { popup.style.opacity='0'; setTimeout(()=>{popup.style.display='none';isOpen=false;},150); }

      input.onclick = () => isOpen ? close() : open();
      document.addEventListener('click', e => { if(isOpen && !wrap.contains(e.target)) close(); });
      wrap.querySelectorAll('.tp-hb').forEach(b => { b.onclick = e => { e.stopPropagation(); h=parseInt(b.dataset.v); update(); }; });
      wrap.querySelectorAll('.tp-mb').forEach(b => { b.onclick = e => { e.stopPropagation(); m=parseInt(b.dataset.v); update(); }; });
      wrap.querySelectorAll('.tp-ap').forEach(b => { b.onclick = e => { e.stopPropagation(); if(b.dataset.v==='AM'&&h>=12)h-=12; if(b.dataset.v==='PM'&&h<12)h+=12; update(); }; });
      wrap.querySelectorAll('.tp-st').forEach(b => { b.onclick = e => { e.stopPropagation(); if(b.dataset.u==='h')h=(h+parseInt(b.dataset.d)+24)%24; else m=(m+parseInt(b.dataset.d)+60)%60; update(); }; });
      wrap.querySelectorAll('.tp-pr').forEach(b => { b.onclick = e => { e.stopPropagation(); h=parseInt(b.dataset.h); m=parseInt(b.dataset.m); update(); close(); }; });
      const ok = wrap.querySelector('.tp-ok'); if(ok) ok.onclick = e => { e.stopPropagation(); close(); };
      update();
    }, 0);

    const H = Array.from({length:24},(_,i)=>i);
    const M = [0,5,10,15,20,25,30,35,40,45,50,55];
    const QT = [{l:'06:00',h:6,m:0},{l:'07:00',h:7,m:0},{l:'08:00',h:8,m:0},{l:'08:30',h:8,m:30},{l:'09:00',h:9,m:0},{l:'12:00',h:12,m:0},{l:'13:00',h:13,m:0},{l:'14:00',h:14,m:0},{l:'17:00',h:17,m:0},{l:'18:00',h:18,m:0}];
    const chevU = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>';
    const chevD = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>';

    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}${required?'<span class="text-red-500 ml-0.5">*</span>':''}</label>` : ''}
      <div id="${uid}" class="relative">
        <div class="relative">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 ${T.muted} pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/></svg>
          <input type="text" class="tp-input w-full pl-10 pr-4 py-2.5 text-sm font-mono ${T.surfaceAlt} border ${T.border} ${T.radius.input} text-night-700 dark:text-night-200 placeholder-[#B8A898] cursor-pointer focus:ring-2 focus:ring-brand-200 transition-all" value="${value}" placeholder="${format24?'HH:MM':'HH:MM AM'}" readonly/>
        </div>
        <div class="tp-popup absolute top-full left-0 mt-1.5 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 opacity-0 transition-opacity duration-150" style="display:none;flex-direction:row">
          ${presets ? `<div class="w-[80px] border-r ${T.divider} py-2 flex-shrink-0 overflow-y-auto" style="max-height:310px">
            <p class="px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider ${T.muted}">Rapido</p>
            ${QT.map(t=>`<button type="button" class="tp-pr w-full text-left px-2 py-1.5 text-[11px] font-mono text-night-600 dark:text-night-300 hover:bg-brand-50 dark:hover:bg-night-600 transition-colors" data-h="${t.h}" data-m="${t.m}">${t.l}</button>`).join('')}
          </div>` : ''}
          <div class="p-3 flex-1" style="min-width:200px">
            <div class="flex items-center justify-center gap-1 mb-3">
              <div class="flex flex-col items-center gap-0.5">
                <button type="button" class="tp-st p-1 ${T.muted} hover:text-brand-600 transition-colors" data-u="h" data-d="1">${chevU}</button>
                <span class="tp-h text-2xl font-bold font-mono text-night-800 dark:text-night-100 w-10 text-center select-none">08</span>
                <button type="button" class="tp-st p-1 ${T.muted} hover:text-brand-600 transition-colors" data-u="h" data-d="-1">${chevD}</button>
              </div>
              <span class="text-2xl font-bold ${T.muted} mx-0.5 select-none">:</span>
              <div class="flex flex-col items-center gap-0.5">
                <button type="button" class="tp-st p-1 ${T.muted} hover:text-brand-600 transition-colors" data-u="m" data-d="5">${chevU}</button>
                <span class="tp-m text-2xl font-bold font-mono text-night-800 dark:text-night-100 w-10 text-center select-none">00</span>
                <button type="button" class="tp-st p-1 ${T.muted} hover:text-brand-600 transition-colors" data-u="m" data-d="-5">${chevD}</button>
              </div>
              ${!format24 ? `<div class="flex flex-col gap-1 ml-2"><button type="button" class="tp-ap px-2.5 py-1 text-[10px] font-bold ${T.radius.sm} text-night-500 hover:bg-brand-50 transition-all" data-v="AM">AM</button><button type="button" class="tp-ap px-2.5 py-1 text-[10px] font-bold ${T.radius.sm} text-night-500 hover:bg-brand-50 transition-all" data-v="PM">PM</button></div>` : ''}
            </div>
            <p class="font-mono text-[8px] font-bold uppercase tracking-wider ${T.muted} mb-1">Hora</p>
            <div class="grid grid-cols-6 gap-0.5 mb-2">
              ${H.map(i=>`<button type="button" class="tp-hb py-1 text-[10px] ${T.radius.sm} text-night-500 hover:bg-brand-50 transition-all text-center" data-v="${i}">${String(format24?i:(i%12||12)).padStart(2,'0')}</button>`).join('')}
            </div>
            <p class="font-mono text-[8px] font-bold uppercase tracking-wider ${T.muted} mb-1">Minuto</p>
            <div class="grid grid-cols-6 gap-0.5 mb-3">
              ${M.map(i=>`<button type="button" class="tp-mb py-1 text-[10px] ${T.radius.sm} text-night-500 hover:bg-brand-50 transition-all text-center" data-v="${i}">${String(i).padStart(2,'0')}</button>`).join('')}
            </div>
            <button type="button" class="tp-ok w-full py-2 text-xs font-semibold ${T.radius.btn} bg-brand-600 hover:bg-brand-700 text-white transition-all active:scale-[.97]">Aceptar</button>
          </div>
        </div>
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 14. SWITCH TOGGLE
  // ════════════════════════════════════════════════════════

  UI.switchToggle = function(id, config = {}) {
    const { checked=false, label='', size='md', onChange='' } = config;
    const uid = id || _uid('sw');
    const sizes = {
      sm: { track:'h-5 w-9', dot:'h-3.5 w-3.5', translate:'translate-x-4', off:'translate-x-0.5', py:'py-[3px]' },
      md: { track:'h-6 w-11', dot:'h-4 w-4', translate:'translate-x-5', off:'translate-x-1', py:'py-1' },
      lg: { track:'h-7 w-14', dot:'h-5 w-5', translate:'translate-x-7', off:'translate-x-1', py:'py-1' }
    };
    const s = sizes[size] || sizes.md;
    return `
      <label class="inline-flex items-center gap-3 cursor-pointer select-none">
        <input type="checkbox" id="${uid}" class="sr-only peer" ${checked ? 'checked' : ''} ${onChange ? `onchange="${onChange}"` : ''}/>
        <div class="relative ${s.track} rounded-full transition-colors duration-200 bg-gray-200 dark:bg-night-600 peer-checked:bg-brand-600 ${s.py} px-0.5">
          <div class="absolute top-1/2 -translate-y-1/2 ${s.dot} bg-white rounded-full shadow-sm transition-transform duration-200 ${checked ? s.translate : s.off}" id="${uid}-dot"></div>
        </div>
        ${label ? `<span class="text-sm text-night-700 dark:text-night-200">${label}</span>` : ''}
      </label>`;
  };
  setTimeout(function() {
    document.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox' && e.target.id) {
        const dot = document.getElementById(e.target.id + '-dot');
        if (!dot) return;
        const wrap = e.target.nextElementSibling;
        if (!wrap || !wrap.classList.contains('relative')) return;
        const isChecked = e.target.checked;
        const w = wrap.classList.contains('w-9') ? 'translate-x-4' : wrap.classList.contains('w-14') ? 'translate-x-7' : 'translate-x-5';
        const off = 'translate-x-0.5';
        dot.className = dot.className.replace(/translate-x-[\w.]+/g, '');
        dot.classList.add(isChecked ? w : off);
      }
    });
  }, 0);

  // ════════════════════════════════════════════════════════
  // 15. RADIO GROUP
  // ════════════════════════════════════════════════════════

  UI.radioGroup = function(id, options = [], config = {}) {
    const { value='', label='', direction='vertical', onChange='' } = config;
    const uid = id || _uid('rg');
    const dir = direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2.5';
    return `
      ${label ? `<label class="${T.label} mb-2 block">${label}</label>` : ''}
      <div id="${uid}" class="${dir}" role="radiogroup">
        ${options.map((o,i) => {
          const rid = uid + '-' + i;
          const checked = o.value === value;
          return `<label class="flex items-start gap-3 cursor-pointer group">
            <input type="radio" name="${uid}" id="${rid}" value="${o.value}" ${checked ? 'checked' : ''} class="sr-only peer" ${onChange ? `onchange="${onChange}"` : ''}/>
            <div class="mt-0.5 w-[18px] h-[18px] rounded-full border-2 border-[#D4C4B0] peer-checked:border-brand-600 flex items-center justify-center transition-colors">
              <div class="w-2.5 h-2.5 rounded-full bg-brand-600 scale-0 peer-checked:scale-100 transition-transform"></div>
            </div>
            <div>
              <span class="text-sm font-medium text-night-700 dark:text-night-200">${o.label}</span>
              ${o.desc ? `<p class="text-xs ${T.muted} mt-0.5">${o.desc}</p>` : ''}
            </div>
          </label>`;
        }).join('')}
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 16. CHECKBOX GROUP
  // ════════════════════════════════════════════════════════

  UI.checkboxGroup = function(id, options = [], config = {}) {
    const { value=[], label='', columns=1 } = config;
    const uid = id || _uid('cg');
    const gridCls = columns > 1 ? `grid grid-cols-${columns} gap-2.5` : 'flex flex-col gap-2.5';
    return `
      ${label ? `<label class="${T.label} mb-2 block">${label}</label>` : ''}
      <div id="${uid}" class="${gridCls}">
        ${options.map((o,i) => {
          const cid = uid + '-' + i;
          const checked = value.includes(o.value);
          return `<label class="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" id="${cid}" value="${o.value}" ${checked ? 'checked' : ''} class="sr-only peer"/>
            <div class="mt-0.5 w-[18px] h-[18px] ${T.radius.sm} border-2 border-[#D4C4B0] peer-checked:border-brand-600 peer-checked:bg-brand-600 flex items-center justify-center transition-colors">
              <svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICO.check}</svg>
            </div>
            <div>
              <span class="text-sm font-medium text-night-700 dark:text-night-200">${o.label}</span>
              ${o.desc ? `<p class="text-xs ${T.muted} mt-0.5">${o.desc}</p>` : ''}
            </div>
          </label>`;
        }).join('')}
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 17. NUMBER INPUT
  // ════════════════════════════════════════════════════════

  UI.numberInput = function(id, config = {}) {
    const { value=0, min=0, max=999, step=1, label='' } = config;
    const uid = id || _uid('ni');
    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}</label>` : ''}
      <div class="inline-flex items-center border ${T.border} ${T.radius.input} ${T.surface} overflow-hidden">
        <button type="button" onclick="UI._numStep('${uid}',-${step},${min},${max})" class="px-3 py-2.5 text-night-500 hover:bg-[#F6F3EF] dark:hover:bg-night-600 transition-colors font-bold text-lg leading-none select-none">−</button>
        <input type="number" id="${uid}" value="${value}" min="${min}" max="${max}" step="${step}" class="w-16 text-center text-sm font-semibold bg-transparent border-0 text-night-700 dark:text-night-200 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>
        <button type="button" onclick="UI._numStep('${uid}',${step},${min},${max})" class="px-3 py-2.5 text-night-500 hover:bg-[#F6F3EF] dark:hover:bg-night-600 transition-colors font-bold text-lg leading-none select-none">+</button>
      </div>`;
  };

  UI._numStep = function(uid, delta, min, max) {
    const input = document.getElementById(uid);
    if (!input) return;
    let v = parseFloat(input.value) + delta;
    if (v < min) v = min;
    if (v > max) v = max;
    input.value = v;
    input.dispatchEvent(new Event('change'));
  };

  // ════════════════════════════════════════════════════════
  // 18. CURRENCY INPUT
  // ════════════════════════════════════════════════════════

  UI.currencyInput = function(id, config = {}) {
    const { value='', label='', currency='S/', required=false } = config;
    const uid = id || _uid('ci');
    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}${required ? ' <span class="text-red-500">*</span>' : ''}</label>` : ''}
      <div class="flex items-center border ${T.border} ${T.radius.input} ${T.surface} overflow-hidden focus-within:ring-2 focus-within:ring-brand-200 focus-within:border-brand-400">
        <span class="pl-3 pr-1 text-sm font-semibold ${T.muted} select-none">${currency}</span>
        <input type="text" id="${uid}" value="${value}" inputmode="decimal" placeholder="0.00" class="flex-1 py-2.5 pr-3 text-sm bg-transparent border-0 text-night-700 dark:text-night-200 focus:ring-0 outline-none" ${required ? 'required' : ''} onkeypress="return /[\\d.]/.test(event.key)||event.key==='Backspace'" onblur="UI._formatCurrency('${uid}')"/>
      </div>`;
  };

  UI._formatCurrency = function(uid) {
    const input = document.getElementById(uid);
    if (!input || !input.value) return;
    const num = parseFloat(input.value.replace(/,/g, ''));
    if (isNaN(num)) { input.value = ''; return; }
    input.value = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // ════════════════════════════════════════════════════════
  // 19. CONFIRM DIALOG
  // ════════════════════════════════════════════════════════

  UI.confirmDialog = function(config = {}) {
    const { title='Confirmar', message='', type='danger', confirmText='Confirmar', cancelText='Cancelar', onConfirm='', onCancel='' } = config;
    const uid = _uid('cd');
    const icons = {
      danger: `<div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div>`,
      warning: `<div class="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">${_svg('warn','w-6 h-6 text-amber-500')}</div>`,
      info: `<div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">${_svg('info','w-6 h-6 text-blue-500')}</div>`
    };
    const btnColor = type === 'danger' ? 'bg-red-600 hover:bg-red-700' : type === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-brand-600 hover:bg-brand-700';
    const overlay = document.createElement('div');
    overlay.id = uid;
    overlay.className = 'fixed inset-0 z-[999] flex items-center justify-center p-4';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._closeConfirm('${uid}',false)"></div>
      <div class="${T.surface} ${T.radius.card} ${T.shadow.lg} p-6 w-full max-w-sm relative z-10 text-center transform scale-95 opacity-0 transition-all duration-200" id="${uid}-box">
        ${icons[type] || icons.info}
        <h3 class="text-lg ${T.heading} mb-2">${title}</h3>
        <p class="text-sm ${T.muted} mb-6">${message}</p>
        <div class="flex gap-3 justify-center">
          <button onclick="UI._closeConfirm('${uid}',false)" class="px-5 py-2.5 text-sm font-semibold ${T.radius.btn} border ${T.border} text-night-700 dark:text-night-200 hover:bg-[#F6F3EF] dark:hover:bg-night-600 transition-colors">${cancelText}</button>
          <button onclick="UI._closeConfirm('${uid}',true)" class="px-5 py-2.5 text-sm font-semibold ${T.radius.btn} ${btnColor} text-white transition-colors">${confirmText}</button>
        </div>
      </div>`;
    overlay._onConfirm = onConfirm;
    overlay._onCancel = onCancel;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      const box = document.getElementById(uid+'-box');
      if (box) { box.style.transform = 'scale(1)'; box.style.opacity = '1'; }
    });
  };

  UI._closeConfirm = function(uid, confirmed) {
    const el = document.getElementById(uid);
    if (!el) return;
    const box = document.getElementById(uid+'-box');
    if (box) { box.style.transform = 'scale(0.95)'; box.style.opacity = '0'; }
    setTimeout(() => {
      if (confirmed && el._onConfirm) { if (typeof el._onConfirm === 'function') el._onConfirm(); else eval(el._onConfirm); }
      if (!confirmed && el._onCancel) { if (typeof el._onCancel === 'function') el._onCancel(); else eval(el._onCancel); }
      el.remove();
    }, 200);
  };

  // ════════════════════════════════════════════════════════
  // 20. COMMAND PALETTE
  // ════════════════════════════════════════════════════════

  UI.commandPalette = function() {
    const uid = _uid('cp');
    if (document.getElementById('cmd-palette')) { UI._toggleCmdPalette(); return; }
    const modules = [
      {group:'Módulos', items:[
        {label:'Dashboard', icon:'inbox', action:"App.navigate('dashboard')"},
        {label:'Inventario', icon:'inbox', action:"App.navigate('inventario')"},
        {label:'Compras', icon:'inbox', action:"App.navigate('compras')"},
        {label:'Ventas', icon:'inbox', action:"App.navigate('ventas')"},
        {label:'Producción', icon:'inbox', action:"App.navigate('produccion')"},
        {label:'Costos', icon:'inbox', action:"App.navigate('costos')"},
        {label:'Finanzas', icon:'inbox', action:"App.navigate('finanzas')"},
        {label:'RRHH', icon:'inbox', action:"App.navigate('rrhh')"},
        {label:'Admin', icon:'inbox', action:"App.navigate('admin')"}
      ]},
      {group:'Acciones', items:[
        {label:'Modo oscuro', icon:'info', action:"App.toggleDark()"},
        {label:'Cerrar sesión', icon:'x', action:"App.logout()"}
      ]}
    ];
    const overlay = document.createElement('div');
    overlay.id = 'cmd-palette';
    overlay.className = 'fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] p-4';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._toggleCmdPalette()"></div>
      <div class="${T.surface} ${T.radius.card} ${T.shadow.lg} w-full max-w-lg relative z-10 overflow-hidden transform scale-95 opacity-0 transition-all duration-200" id="cmd-palette-box">
        <div class="flex items-center gap-3 px-4 py-3 border-b ${T.divider}">
          ${_svg('search','w-5 h-5 '+T.muted)}
          <input type="text" id="cmd-search" class="flex-1 bg-transparent text-sm text-night-700 dark:text-night-200 placeholder-[#B8A898] outline-none" placeholder="Buscar módulo o acción..." oninput="UI._filterCmdPalette(this.value)" autofocus/>
          <span class="text-[10px] font-mono px-1.5 py-0.5 ${T.surfaceAlt} ${T.radius.sm} border ${T.border} ${T.muted}">ESC</span>
        </div>
        <div id="cmd-results" class="max-h-72 overflow-y-auto py-2">
          ${modules.map(g => `
            <div class="cmd-group" data-group="${g.group}">
              <div class="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider ${T.muted}">${g.group}</div>
              ${g.items.map((it,i) => `<div class="cmd-item flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-brand-50 dark:hover:bg-night-600 transition-colors" data-label="${it.label.toLowerCase()}" onclick="${it.action};UI._toggleCmdPalette()" tabindex="-1">
                ${_svg(it.icon,'w-4 h-4 '+T.muted)}
                <span class="text-sm text-night-700 dark:text-night-200">${it.label}</span>
              </div>`).join('')}
            </div>
          `).join('')}
        </div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      const box = document.getElementById('cmd-palette-box');
      if (box) { box.style.transform = 'scale(1)'; box.style.opacity = '1'; }
      const input = document.getElementById('cmd-search');
      if (input) input.focus();
    });
  };

  UI._toggleCmdPalette = function() {
    const el = document.getElementById('cmd-palette');
    if (!el) return;
    const box = document.getElementById('cmd-palette-box');
    if (box) { box.style.transform = 'scale(0.95)'; box.style.opacity = '0'; }
    setTimeout(() => el.remove(), 200);
  };

  UI._filterCmdPalette = function(q) {
    const items = document.querySelectorAll('#cmd-results .cmd-item');
    const groups = document.querySelectorAll('#cmd-results .cmd-group');
    q = q.toLowerCase().trim();
    items.forEach(it => { it.style.display = !q || it.dataset.label.includes(q) ? '' : 'none'; });
    groups.forEach(g => {
      const visible = g.querySelectorAll('.cmd-item:not([style*="display: none"])');
      g.style.display = visible.length ? '' : 'none';
    });
  };

  UI._cmdPaletteIdx = -1;
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); UI.commandPalette(); return; }
    const palette = document.getElementById('cmd-palette');
    if (!palette) return;
    if (e.key === 'Escape') { UI._toggleCmdPalette(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = Array.from(palette.querySelectorAll('.cmd-item:not([style*="display: none"])'));
      if (!items.length) return;
      UI._cmdPaletteIdx += e.key === 'ArrowDown' ? 1 : -1;
      if (UI._cmdPaletteIdx < 0) UI._cmdPaletteIdx = items.length - 1;
      if (UI._cmdPaletteIdx >= items.length) UI._cmdPaletteIdx = 0;
      items.forEach(it => it.classList.remove('bg-brand-50','dark:bg-night-600'));
      items[UI._cmdPaletteIdx].classList.add('bg-brand-50','dark:bg-night-600');
      items[UI._cmdPaletteIdx].scrollIntoView({block:'nearest'});
    }
    if (e.key === 'Enter') {
      const items = Array.from(palette.querySelectorAll('.cmd-item:not([style*="display: none"])'));
      const sel = UI._cmdPaletteIdx >= 0 && items[UI._cmdPaletteIdx] ? items[UI._cmdPaletteIdx] : items[0];
      if (sel) sel.click();
    }
  });

  // ════════════════════════════════════════════════════════
  // 21. BOTTOM SHEET
  // ════════════════════════════════════════════════════════

  UI.bottomSheet = function(title, content, opts = {}) {
    const { height='50' } = opts;
    const uid = _uid('bs');
    const overlay = document.createElement('div');
    overlay.id = uid;
    overlay.className = 'fixed inset-0 z-[999]';
    overlay.innerHTML = `
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._closeBottomSheet('${uid}')"></div>
      <div id="${uid}-sheet" class="absolute bottom-0 left-0 right-0 ${T.surface} rounded-t-[28px] ${T.shadow.lg} transform translate-y-full transition-transform duration-300 ease-out" style="max-height:${height}vh">
        <div class="flex justify-center pt-3 pb-1 cursor-grab" onmousedown="UI._bsDragStart(event,'${uid}')" ontouchstart="UI._bsDragStart(event,'${uid}')">
          <div class="w-10 h-1.5 rounded-full bg-[#D4C4B0]"></div>
        </div>
        <div class="px-5 pb-2 flex items-center justify-between">
          <h3 class="text-lg ${T.heading}">${title}</h3>
          <button onclick="UI._closeBottomSheet('${uid}')" class="p-1 rounded-full hover:bg-[#F6F3EF] dark:hover:bg-night-600 transition-colors">${_svg('x','w-5 h-5 text-night-400')}</button>
        </div>
        <div class="px-5 pb-6 overflow-y-auto" style="max-height:calc(${height}vh - 80px)">${content}</div>
      </div>`;
    document.body.appendChild(overlay);
    requestAnimationFrame(() => {
      const sheet = document.getElementById(uid+'-sheet');
      if (sheet) sheet.style.transform = 'translateY(0)';
    });
  };

  UI._closeBottomSheet = function(uid) {
    const sheet = document.getElementById(uid+'-sheet');
    if (sheet) sheet.style.transform = 'translateY(100%)';
    setTimeout(() => { const el = document.getElementById(uid); if (el) el.remove(); }, 300);
  };

  UI._bsDragStart = function(e, uid) {
    const sheet = document.getElementById(uid+'-sheet');
    if (!sheet) return;
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    const startH = sheet.getBoundingClientRect().height;
    const onMove = function(ev) {
      const y = ev.touches ? ev.touches[0].clientY : ev.clientY;
      const diff = y - startY;
      if (diff > 0) sheet.style.transform = 'translateY('+diff+'px)';
      else sheet.style.maxHeight = (startH - diff) + 'px';
    };
    const onEnd = function(ev) {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      const y = ev.changedTouches ? ev.changedTouches[0].clientY : ev.clientY;
      if (y - startY > 100) UI._closeBottomSheet(uid);
      else { sheet.style.transform = 'translateY(0)'; sheet.style.maxHeight = '90vh'; }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // ════════════════════════════════════════════════════════
  // 22. STEPPER
  // ════════════════════════════════════════════════════════

  UI.stepper = function(steps = [], currentStep = 0) {
    return `
      <div class="flex items-center w-full">
        ${steps.map((s, i) => {
          const done = i < currentStep;
          const active = i === currentStep;
          const dotCls = done ? 'bg-green-500 text-white' : active ? 'bg-brand-600 text-white ring-4 ring-brand-100' : 'bg-[#E8DFD4] text-night-400 dark:bg-night-600';
          const lineCls = done ? 'bg-green-500' : 'bg-[#E8DFD4] dark:bg-night-600';
          return `
            ${i > 0 ? `<div class="flex-1 h-0.5 ${lineCls} mx-2"></div>` : ''}
            <div class="flex flex-col items-center flex-shrink-0">
              <div class="w-8 h-8 rounded-full ${dotCls} flex items-center justify-center text-xs font-bold transition-all">
                ${done ? `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">${ICO.check}</svg>` : (i+1)}
              </div>
              <span class="text-xs font-medium mt-1.5 ${active ? 'text-brand-600' : done ? 'text-green-600' : T.muted}">${s.label}</span>
              ${s.desc ? `<span class="text-[10px] ${T.muted}">${s.desc}</span>` : ''}
            </div>`;
        }).join('')}
      </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 23. POPOVER
  // ════════════════════════════════════════════════════════

  UI.popover = function(trigger, content, opts = {}) {
    const { position='bottom', width='w-64' } = opts;
    const uid = _uid('po');
    const posCls = position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
    return `
      <div class="relative inline-block" id="${uid}">
        <div onclick="UI._togglePopover('${uid}')" class="cursor-pointer">${trigger}</div>
        <div id="${uid}-content" class="absolute ${posCls} left-1/2 -translate-x-1/2 ${width} ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 p-4" style="display:none">
          <div class="absolute ${position==='top' ? 'bottom-[-6px]' : 'top-[-6px]'} left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${T.surface} border ${T.border} ${position==='top' ? 'border-t-0 border-l-0' : 'border-b-0 border-r-0'}"></div>
          <div class="relative z-10">${content}</div>
        </div>
      </div>`;
  };

  UI._togglePopover = function(uid) {
    const el = document.getElementById(uid + '-content');
    if (!el) return;
    const visible = el.style.display !== 'none';
    el.style.display = visible ? 'none' : '';
    if (!visible) {
      const close = function(e) {
        if (!document.getElementById(uid) || document.getElementById(uid).contains(e.target)) return;
        el.style.display = 'none';
        document.removeEventListener('click', close);
      };
      setTimeout(() => document.addEventListener('click', close), 0);
    }
  };

  // ════════════════════════════════════════════════════════
  // 24. CONTEXT MENU
  // ════════════════════════════════════════════════════════

  UI.contextMenu = function(items = []) {
    const uid = _uid('ctx');
    window['_ctx_' + uid] = items;
    return `oncontextmenu="event.preventDefault();UI._showContextMenu(event,'${uid}')"`;
  };

  UI._showContextMenu = function(e, uid) {
    const old = document.getElementById('ctx-menu-active');
    if (old) old.remove();
    const items = window['_ctx_' + uid];
    if (!items) return;
    const menu = document.createElement('div');
    menu.id = 'ctx-menu-active';
    menu.className = `fixed z-[1000] ${T.surface} ${T.radius.inner} ${T.shadow.lg} border ${T.border} py-1.5 min-w-[180px]`;
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.innerHTML = items.map(it => {
      if (it.divider) return `<div class="my-1.5 border-t ${T.divider}"></div>`;
      return `<div class="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-brand-50 dark:hover:bg-night-600 transition-colors ${it.danger ? 'text-red-600' : 'text-night-700 dark:text-night-200'}" onclick="${it.action || ''};document.getElementById('ctx-menu-active').remove()">
        ${it.icon ? _svg(it.icon, 'w-4 h-4 ' + (it.danger ? 'text-red-400' : T.muted)) : '<span class="w-4"></span>'}
        <span>${it.label}</span>
      </div>`;
    }).join('');
    document.body.appendChild(menu);
    const close = function(ev) {
      if (ev.key === 'Escape' || ev.type === 'click') {
        const m = document.getElementById('ctx-menu-active');
        if (m && (ev.type !== 'click' || !m.contains(ev.target))) m.remove();
        document.removeEventListener('click', close);
        document.removeEventListener('keydown', close);
      }
    };
    setTimeout(() => { document.addEventListener('click', close); document.addEventListener('keydown', close); }, 0);
  };

  // ════════════════════════════════════════════════════════
  // 25. HOVER CARD
  // ════════════════════════════════════════════════════════

  UI.hoverCard = function(trigger, content) {
    const uid = _uid('hc');
    return `
      <span class="relative inline-block" id="${uid}" onmouseenter="UI._showHoverCard('${uid}')" onmouseleave="UI._hideHoverCard('${uid}')">
        ${trigger}
        <div id="${uid}-card" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 ${T.surface} ${T.radius.inner} ${T.shadow.hover} border ${T.border} z-50 p-4 opacity-0 pointer-events-none transition-all duration-200 transform -translate-y-1" style="display:none">
          ${content}
        </div>
      </span>`;
  };

  UI._hcTimers = {};
  UI._showHoverCard = function(uid) {
    clearTimeout(UI._hcTimers[uid]);
    UI._hcTimers[uid] = setTimeout(() => {
      const card = document.getElementById(uid+'-card');
      if (!card) return;
      card.style.display = '';
      requestAnimationFrame(() => { card.style.opacity = '1'; card.style.transform = 'translate(-50%,0)'; card.classList.remove('-translate-y-1'); card.classList.add('pointer-events-auto'); });
    }, 400);
  };

  UI._hideHoverCard = function(uid) {
    clearTimeout(UI._hcTimers[uid]);
    UI._hcTimers[uid] = setTimeout(() => {
      const card = document.getElementById(uid+'-card');
      if (!card) return;
      card.style.opacity = '0';
      card.classList.add('-translate-y-1');
      card.classList.remove('pointer-events-auto');
      setTimeout(() => { card.style.display = 'none'; }, 200);
    }, 200);
  };

  // ════════════════════════════════════════════════════════
  // 26. COPY BUTTON
  // ════════════════════════════════════════════════════════

  UI.copyButton = function(text, label = 'Copiar') {
    const uid = _uid('cb');
    return `<button id="${uid}" onclick="UI._copyToClipboard('${uid}',\`${text.replace(/`/g,'\\`')}\`)" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold ${T.radius.btn} border ${T.border} ${T.surface} text-night-600 dark:text-night-300 hover:bg-[#F6F3EF] dark:hover:bg-night-600 transition-colors">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
      <span>${label}</span>
    </button>`;
  };

  UI._copyToClipboard = function(uid, text) {
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById(uid);
      if (!btn) return;
      const orig = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Copiado';
      btn.classList.add('text-green-600');
      setTimeout(() => { btn.querySelector('span').textContent = orig; btn.classList.remove('text-green-600'); }, 2000);
    });
  };

  // ════════════════════════════════════════════════════════
  // 27. KBD (Keyboard Shortcut Badge)
  // ════════════════════════════════════════════════════════

  UI.kbd = function(shortcut) {
    const keys = shortcut.split('+').map(k => k.trim());
    return keys.map(k => `<kbd class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-[10px] font-mono font-semibold ${T.surfaceAlt} border ${T.border} rounded-md text-night-500 dark:text-night-400 shadow-[0_1px_0_1px_rgba(0,0,0,0.05)]">${k}</kbd>`).join(`<span class="text-[10px] ${T.muted} mx-0.5">+</span>`);
  };

  // ════════════════════════════════════════════════════════
  // 28. SEPARATOR
  // ════════════════════════════════════════════════════════

  UI.separator = function(text) {
    if (!text) return `<div class="h-px bg-[rgba(196,168,130,0.15)]"></div>`;
    return `<div class="flex items-center gap-3"><div class="flex-1 h-px bg-[rgba(196,168,130,0.15)]"></div><span class="${T.mono} ${T.muted}">${text}</span><div class="flex-1 h-px bg-[rgba(196,168,130,0.15)]"></div></div>`;
  };

  // ════════════════════════════════════════════════════════
  // 29. TAG INPUT
  // ════════════════════════════════════════════════════════

  UI.tagInput = function(id, config = {}) {
    const { value = [], label = '', placeholder = 'Escribe y Enter...' } = config;
    const uid = id || _uid('ti');
    const initTags = value.map(v => `<span class="inline-flex items-center gap-1 px-2.5 py-1 ${T.radius.badge} bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium" data-tag="${v}">${v}<button type="button" onclick="UI._removeTag('${uid}',this.parentElement)" class="ml-0.5 hover:text-red-500 transition-colors">${_svg('x','w-3 h-3')}</button></span>`).join('');
    return `
      ${label ? `<label class="${T.label} mb-1.5 block">${label}</label>` : ''}
      <div id="${uid}" class="flex flex-wrap gap-1.5 items-center border ${T.border} ${T.radius.input} ${T.surface} px-3 py-2 focus-within:ring-2 focus-within:ring-brand-500/30 transition-all">
        <div class="ti-tags flex flex-wrap gap-1.5">${initTags}</div>
        <input type="text" class="flex-1 min-w-[100px] bg-transparent border-0 text-sm text-night-700 dark:text-night-200 placeholder-[#B8A898] focus:ring-0 outline-none" placeholder="${placeholder}" onkeydown="if(event.key==='Enter'){event.preventDefault();UI._addTag('${uid}',this)}"/>
      </div>`;
  };

  UI._addTag = function(uid, input) {
    const val = input.value.trim();
    if (!val) return;
    const wrap = document.getElementById(uid);
    const tagsEl = wrap.querySelector('.ti-tags');
    const exists = Array.from(tagsEl.querySelectorAll('[data-tag]')).some(t => t.dataset.tag === val);
    if (exists) { input.value = ''; return; }
    tagsEl.insertAdjacentHTML('beforeend', `<span class="inline-flex items-center gap-1 px-2.5 py-1 ${T.radius.badge} bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium" data-tag="${val}">${val}<button type="button" onclick="UI._removeTag('${uid}',this.parentElement)" class="ml-0.5 hover:text-red-500 transition-colors">${_svg('x','w-3 h-3')}</button></span>`);
    input.value = '';
  };

  UI._removeTag = function(uid, el) { el.remove(); };

  // ════════════════════════════════════════════════════════
  // 30. TIMELINE
  // ════════════════════════════════════════════════════════

  UI.timeline = function(items) {
    return `<div class="relative pl-8 space-y-6">${items.map((it, i) => {
      const c = _c(it.color || 'brand');
      const isLast = i === items.length - 1;
      return `<div class="relative">
        ${!isLast ? `<div class="absolute left-[-25px] top-6 w-px h-full bg-[rgba(196,168,130,0.15)]"></div>` : ''}
        <div class="absolute left-[-29px] top-1 w-3 h-3 rounded-full ${c.solid} ring-4 ring-white dark:ring-night-800"></div>
        <div class="pb-1">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-sm font-semibold text-night-800 dark:text-night-100">${it.title}</span>
            ${it.date ? `<span class="${T.mono} ${T.muted}">${it.date}</span>` : ''}
          </div>
          ${it.desc ? `<p class="text-sm ${T.muted}">${it.desc}</p>` : ''}
        </div>
      </div>`;
    }).join('')}</div>`;
  };

  // ════════════════════════════════════════════════════════
  // 31. COMMENT
  // ════════════════════════════════════════════════════════

  UI.comment = function(config = {}) {
    const { author = '', avatar = '', date = '', content = '', actions = true } = config;
    const initials = author.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    return `<div class="flex gap-3 p-4">
      <div class="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style="background:linear-gradient(135deg,#C0601E,#8a3512)">${avatar || initials}</div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-semibold text-night-800 dark:text-night-100">${author}</span>
          <span class="${T.mono} ${T.muted}">${date}</span>
        </div>
        <p class="text-sm text-night-600 dark:text-night-300 leading-relaxed">${content}</p>
        ${actions ? `<div class="flex gap-3 mt-2"><button class="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">Responder</button><button class="text-xs font-medium ${T.muted} hover:text-night-600 transition-colors">Editar</button></div>` : ''}
      </div>
    </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 32. STAT MINI
  // ════════════════════════════════════════════════════════

  UI.statMini = function(label, value, trend, trendDir) {
    const arrow = trendDir === 'up' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>';
    const trendColor = trendDir === 'up' ? 'text-green-500' : 'text-red-500';
    return `<div class="flex flex-col gap-0.5">
      <span class="${T.mono} ${T.muted}">${label}</span>
      <div class="flex items-baseline gap-2">
        <span class="text-xl font-bold ${T.heading}">${value}</span>
        ${trend ? `<span class="inline-flex items-center gap-0.5 text-xs font-semibold ${trendColor}"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${arrow}</svg>${trend}</span>` : ''}
      </div>
    </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 33. CALENDAR
  // ════════════════════════════════════════════════════════

  UI.calendar = function(id, config = {}) {
    const { events = [] } = config;
    const uid = id || _uid('cal');
    return `<div id="${uid}" class="${T.surface} ${T.radius.card} border ${T.border} ${T.shadow.card} p-5" data-events='${JSON.stringify(events)}' data-month="${new Date().getMonth()}" data-year="${new Date().getFullYear()}">
      <div class="flex items-center justify-between mb-4">
        <button onclick="UI._calNav('${uid}',-1)" class="p-1.5 ${T.radius.sm} hover:bg-[#F6F3EF] dark:hover:bg-night-700 transition-colors">${_svg('chevLeft','w-5 h-5 text-night-500')}</button>
        <span class="cal-title text-sm font-semibold ${T.heading}"></span>
        <button onclick="UI._calNav('${uid}',1)" class="p-1.5 ${T.radius.sm} hover:bg-[#F6F3EF] dark:hover:bg-night-700 transition-colors">${_svg('chevRight','w-5 h-5 text-night-500')}</button>
      </div>
      <div class="cal-grid"></div>
    </div>`;
  };

  UI._calNav = function(uid, dir) {
    const el = document.getElementById(uid);
    if (!el) return;
    let m = parseInt(el.dataset.month) + dir;
    let y = parseInt(el.dataset.year);
    if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
    el.dataset.month = m; el.dataset.year = y;
    UI._calRender(uid);
  };

  UI._calRender = function(uid) {
    const el = document.getElementById(uid);
    if (!el) return;
    const m = parseInt(el.dataset.month), y = parseInt(el.dataset.year);
    const events = JSON.parse(el.dataset.events || '[]');
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    el.querySelector('.cal-title').textContent = months[m] + ' ' + y;
    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const today = new Date();
    let html = '<div class="grid grid-cols-7 gap-px text-center">';
    ['Do','Lu','Ma','Mi','Ju','Vi','Sa'].forEach(function(d) { html += '<div class="text-[10px] font-semibold text-[#9C8B7A] pb-2">' + d + '</div>'; });
    for (let i = 0; i < first; i++) html += '<div></div>';
    for (let d = 1; d <= days; d++) {
      const dateStr = y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      const dayEvents = events.filter(function(e) { return e.date === dateStr; });
      const isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
      html += '<div class="relative p-1.5 text-xs rounded-xl ' + (isToday ? 'bg-brand-600 text-white font-bold' : 'text-night-600 dark:text-night-300 hover:bg-[#F6F3EF] dark:hover:bg-night-700') + ' cursor-pointer transition-colors">' + d;
      if (dayEvents.length) {
        html += '<div class="flex justify-center gap-0.5 mt-0.5">';
        dayEvents.forEach(function(e) { html += '<span class="w-1 h-1 rounded-full ' + _c(e.color||'brand').solid + '"></span>'; });
        html += '</div>';
      }
      html += '</div>';
    }
    html += '</div>';
    el.querySelector('.cal-grid').innerHTML = html;
  };

  // Auto-init calendars after DOM updates
  setTimeout(function() {
    document.querySelectorAll('[id^="cal-"]').forEach(function(el) { UI._calRender(el.id); });
  }, 100);

  // ════════════════════════════════════════════════════════
  // 34. KANBAN BOARD
  // ════════════════════════════════════════════════════════

  UI.kanbanBoard = function(columns) {
    return `<div class="flex gap-4 overflow-x-auto pb-4">${columns.map(function(col) {
      const c = _c(col.color || 'gray');
      return '<div class="flex-shrink-0 w-72 ' + T.surfaceAlt + ' ' + T.radius.card + ' border ' + T.border + ' flex flex-col max-h-[70vh]">' +
        '<div class="px-4 py-3 border-b ' + T.divider + ' flex items-center justify-between">' +
          '<div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full ' + c.solid + '"></span><span class="text-sm font-semibold text-night-800 dark:text-night-100">' + col.title + '</span></div>' +
          '<span class="text-xs font-mono font-semibold ' + T.muted + '">' + (col.cards||[]).length + '</span>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto p-3 space-y-2">' + (col.cards||[]).map(function(card) {
          return '<div class="' + T.surface + ' ' + T.radius.inner + ' border ' + T.border + ' p-3 hover:' + T.shadow.hover + ' transition-shadow cursor-pointer">' +
            '<p class="text-sm font-medium text-night-800 dark:text-night-100">' + (card.title||'') + '</p>' +
            (card.desc ? '<p class="text-xs ' + T.muted + ' mt-1">' + card.desc + '</p>' : '') +
            (card.tags ? '<div class="flex flex-wrap gap-1 mt-2">' + card.tags.map(function(t) { return '<span class="px-2 py-0.5 text-[10px] font-semibold ' + T.radius.badge + ' ' + _c(t.color||'gray').bg + ' ' + _c(t.color||'gray').text + '">' + t.label + '</span>'; }).join('') + '</div>' : '') +
          '</div>';
        }).join('') + '</div>' +
      '</div>';
    }).join('')}</div>`;
  };

  // ════════════════════════════════════════════════════════
  // 35. SPARKLINE
  // ════════════════════════════════════════════════════════

  UI.sparkline = function(data, config = {}) {
    const { width = 100, height = 30, color = 'brand' } = config;
    if (!data || data.length < 2) return '<svg width="' + width + '" height="' + height + '"></svg>';
    const min = Math.min.apply(null, data), max = Math.max.apply(null, data);
    const range = max - min || 1;
    const points = data.map(function(v, i) {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 4) - 2;
      return x + ',' + y;
    }).join(' ');
    const colorMap = { brand: '#A84117', green: '#22c55e', red: '#ef4444', blue: '#3b82f6', orange: '#f97316' };
    const hex = colorMap[color] || colorMap.brand;
    return '<svg width="' + width + '" height="' + height + '" class="inline-block"><polyline points="' + points + '" fill="none" stroke="' + hex + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };

  // ════════════════════════════════════════════════════════
  // 36. NOTIFICATION
  // ════════════════════════════════════════════════════════

  UI.notification = function(config = {}) {
    const { title = '', message = '', time = '', read = false, icon = 'info', onclick = '' } = config;
    const c = _c(icon === 'success' ? 'green' : icon === 'warning' ? 'yellow' : icon === 'error' ? 'red' : 'brand');
    const icoMap = { info: ICO.info, success: ICO.success, warning: ICO.warn, error: ICO.error };
    return `<div class="flex gap-3 p-3.5 ${T.radius.inner} hover:bg-[rgba(168,65,23,0.02)] transition-colors cursor-pointer ${!read ? 'bg-brand-50/30 dark:bg-brand-900/10' : ''}" ${onclick ? `onclick="${onclick}"` : ''}>
      <div class="w-9 h-9 ${T.radius.sm} ${c.bg} flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 ${c.icon}" fill="none" stroke="currentColor" viewBox="0 0 24 24">${icoMap[icon] || icoMap.info}</svg></div>
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2">
          <span class="text-sm font-semibold text-night-800 dark:text-night-100 truncate">${title}</span>
          ${!read ? '<span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>' : ''}
        </div>
        <p class="text-xs ${T.muted} mt-0.5 line-clamp-2">${message}</p>
        ${time ? `<span class="${T.mono} ${T.muted} mt-1 block">${time}</span>` : ''}
      </div>
    </div>`;
  };

  // ════════════════════════════════════════════════════════
  // 37. COLOR PICKER
  // ════════════════════════════════════════════════════════

  UI.colorPicker = function(id, config = {}) {
    const uid = id || _uid('cp');
    const { label = '', value = '' } = config;
    const palette = ['#A84117','#C0601E','#D4A855','#B8832A','#2A7250','#22c55e','#3b82f6','#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316'];
    return (label ? '<label class="' + T.label + ' mb-1.5 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="flex flex-wrap gap-2" data-value="' + value + '">' +
      palette.map(function(hex) {
        var sel = value === hex;
        return '<button type="button" onclick="UI._pickColor(\'' + uid + '\',\'' + hex + '\')" class="w-8 h-8 rounded-xl border-2 transition-all hover:scale-110 ' + (sel ? 'border-night-800 dark:border-white ring-2 ring-brand-500/30' : 'border-transparent') + '" style="background:' + hex + '">' +
          (sel ? '<svg class="w-4 h-4 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' : '') +
        '</button>';
      }).join('') + '</div>';
  };

  UI._pickColor = function(uid, hex) {
    var wrap = document.getElementById(uid);
    if (!wrap) return;
    wrap.dataset.value = hex;
    wrap.querySelectorAll('button').forEach(function(btn) {
      var bgStyle = btn.style.backgroundColor;
      // Normalize hex comparison
      var canvas = document.createElement('canvas').getContext('2d');
      canvas.fillStyle = hex;
      var normalHex = canvas.fillStyle;
      canvas.fillStyle = bgStyle;
      var normalBg = canvas.fillStyle;
      var isSelected = normalHex === normalBg;
      btn.className = 'w-8 h-8 rounded-xl border-2 transition-all hover:scale-110 ' + (isSelected ? 'border-night-800 dark:border-white ring-2 ring-brand-500/30' : 'border-transparent');
      btn.innerHTML = isSelected ? '<svg class="w-4 h-4 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' : '';
    });
  };

  // ════════════════════════════════════════════════════════
  // 38. RESIZABLE PANEL
  // ════════════════════════════════════════════════════════

  UI.resizablePanel = function(leftContent, rightContent, config = {}) {
    const { initialSplit = 50 } = config;
    const uid = _uid('rp');
    return '<div id="' + uid + '" class="flex ' + T.surface + ' ' + T.radius.card + ' border ' + T.border + ' ' + T.shadow.card + ' overflow-hidden" style="height:400px">' +
      '<div class="rp-left overflow-auto p-4" style="width:' + initialSplit + '%">' + (leftContent || '') + '</div>' +
      '<div class="w-1.5 bg-[rgba(196,168,130,0.15)] hover:bg-brand-400 cursor-col-resize flex-shrink-0 transition-colors" onmousedown="UI._startResize(\'' + uid + '\',event)"></div>' +
      '<div class="rp-right flex-1 overflow-auto p-4">' + (rightContent || '') + '</div>' +
    '</div>';
  };

  UI._startResize = function(uid, e) {
    e.preventDefault();
    var wrap = document.getElementById(uid);
    if (!wrap) return;
    var left = wrap.querySelector('.rp-left');
    var startX = e.clientX;
    var startW = left.offsetWidth;
    var totalW = wrap.offsetWidth;
    function onMove(ev) {
      var diff = ev.clientX - startX;
      var pct = Math.max(20, Math.min(80, ((startW + diff) / totalW) * 100));
      left.style.width = pct + '%';
    }
    function onUp() { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  // ════════════════════════════════════════════════════════
  // 39. GANTT MINI
  // ════════════════════════════════════════════════════════

  UI.ganttMini = function(tasks) {
    if (!tasks || !tasks.length) return '';
    var allStarts = tasks.map(function(t) { return t.start; });
    var allEnds = tasks.map(function(t) { return t.end; });
    var minStart = Math.min.apply(null, allStarts);
    var maxEnd = Math.max.apply(null, allEnds);
    var range = maxEnd - minStart || 1;
    return '<div class="space-y-2">' + tasks.map(function(t) {
      var c = _c(t.color || 'brand');
      var left = ((t.start - minStart) / range) * 100;
      var width = Math.max(2, ((t.end - t.start) / range) * 100);
      var prog = t.progress || 0;
      return '<div class="flex items-center gap-3">' +
        '<span class="text-xs font-medium text-night-700 dark:text-night-200 w-28 truncate flex-shrink-0">' + (t.label||'') + '</span>' +
        '<div class="flex-1 h-6 bg-[#F6F3EF] dark:bg-night-700 ' + T.radius.sm + ' relative overflow-hidden">' +
          '<div class="absolute h-full ' + T.radius.sm + ' ' + c.bg + '" style="left:' + left + '%;width:' + width + '%">' +
            '<div class="h-full ' + c.solid + ' ' + T.radius.sm + ' opacity-80" style="width:' + prog + '%"></div>' +
          '</div>' +
        '</div>' +
        '<span class="' + T.mono + ' ' + T.muted + ' w-10 text-right flex-shrink-0">' + prog + '%</span>' +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // 40. QR CODE
  // ════════════════════════════════════════════════════════

  UI.qrCode = function(text, size) {
    size = size || 120;
    var uid = _uid('qr');
    // Returns a canvas that draws a deterministic QR-like pattern from the input text
    return '<canvas id="' + uid + '" width="' + size + '" height="' + size + '" class="' + T.radius.inner + '" style="image-rendering:pixelated"></canvas>' +
    '<script>(function(){var c=document.getElementById("' + uid + '");if(!c)return;var ctx=c.getContext("2d");var t="' + encodeURIComponent(text||'') + '";t=decodeURIComponent(t);var s=' + size + ';var g=Math.max(4,Math.floor(s/25));var cols=Math.floor(s/g);ctx.fillStyle="#ffffff";ctx.fillRect(0,0,s,s);ctx.fillStyle="#1A1208";function h(v){var r=0;for(var i=0;i<v.length;i++)r=(r*31+v.charCodeAt(i))&0x7fffffff;return r}var seed=h(t);function p(r,cl){for(var i=0;i<7;i++)for(var j=0;j<7;j++){if(i===0||i===6||j===0||j===6||(i>=2&&i<=4&&j>=2&&j<=4))ctx.fillRect((cl+j)*g,(r+i)*g,g,g)}}p(0,0);p(0,cols-7);p(cols-7,0);for(var r=0;r<cols;r++)for(var cl=0;cl<cols;cl++){if((r<8&&cl<8)||(r<8&&cl>=cols-8)||(r>=cols-8&&cl<8))continue;seed=(seed*16807+1)&0x7fffffff;if(seed%3===0)ctx.fillRect(cl*g,r*g,g,g)}})()</scr' + 'ipt>';
  };

  // ════════════════════════════════════════════════════════
  // 41. SIGNATURE PAD
  // ════════════════════════════════════════════════════════

  UI.signaturePad = function(id) {
    var uid = id || _uid('sig');
    return '<div class="inline-block">' +
      '<canvas id="' + uid + '" width="400" height="150" class="border-2 border-dashed border-[#D4C4B0] ' + T.radius.inner + ' cursor-crosshair bg-white" onmousedown="UI._sigStart(\'' + uid + '\',event)" onmousemove="UI._sigMove(\'' + uid + '\',event)" onmouseup="UI._sigEnd(\'' + uid + '\')" onmouseleave="UI._sigEnd(\'' + uid + '\')"></canvas>' +
      '<div class="flex items-center justify-between mt-2">' +
        '<span class="' + T.mono + ' ' + T.muted + '">Firma aqui</span>' +
        '<button type="button" onclick="UI._sigClear(\'' + uid + '\')" class="text-xs font-medium text-red-500 hover:text-red-600 transition-colors">Limpiar</button>' +
      '</div>' +
    '</div>';
  };

  UI._sigState = {};
  UI._sigStart = function(uid, e) {
    var c = document.getElementById(uid);
    if (!c) return;
    var ctx = c.getContext('2d');
    var rect = c.getBoundingClientRect();
    UI._sigState[uid] = { drawing: true, ctx: ctx };
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = '#1A1208'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  };
  UI._sigMove = function(uid, e) {
    var st = UI._sigState[uid];
    if (!st || !st.drawing) return;
    var c = document.getElementById(uid);
    var rect = c.getBoundingClientRect();
    st.ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    st.ctx.stroke();
  };
  UI._sigEnd = function(uid) {
    var st = UI._sigState[uid];
    if (st) st.drawing = false;
  };
  UI._sigClear = function(uid) {
    var c = document.getElementById(uid);
    if (!c) return;
    c.getContext('2d').clearRect(0, 0, c.width, c.height);
  };
  UI.signatureToBase64 = function(uid) {
    var c = document.getElementById(uid);
    return c ? c.toDataURL('image/png') : '';
  };

  // ════════════════════════════════════════════════════════
  // 42. NOTIFICATION CENTER
  // ════════════════════════════════════════════════════════

  UI.notificationCenter = function(notifications) {
    var uid = _uid('nc');
    var unread = (notifications || []).filter(function(n) { return !n.read; }).length;
    var today = [], yesterday = [], earlier = [];
    (notifications || []).forEach(function(n) {
      if (n.group === 'today' || (!n.group && n.time && n.time.indexOf('h') >= 0)) today.push(n);
      else if (n.group === 'yesterday' || (!n.group && n.time && n.time.indexOf('ayer') >= 0)) yesterday.push(n);
      else earlier.push(n);
    });
    function renderGroup(label, items) {
      if (!items.length) return '';
      return '<div class="px-4 pt-3 pb-1"><span class="' + T.mono + ' ' + T.muted + '">' + label + '</span></div>' +
        items.map(function(n) { return UI.notification(n); }).join('<div class="mx-4 h-px bg-[rgba(196,168,130,0.08)]"></div>');
    }
    return '<div id="' + uid + '" class="' + T.surface + ' ' + T.radius.card + ' border ' + T.border + ' ' + T.shadow.lg + ' w-96 max-h-[480px] flex flex-col overflow-hidden">' +
      '<div class="flex items-center justify-between px-5 py-4 border-b ' + T.divider + '">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-sm font-semibold ' + T.heading + '">Notificaciones</span>' +
          (unread > 0 ? '<span class="px-2 py-0.5 text-[10px] font-bold ' + T.radius.badge + ' bg-brand-500 text-white">' + unread + '</span>' : '') +
        '</div>' +
        (unread > 0 ? '<button onclick="UI._markAllRead(\'' + uid + '\')" class="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">Marcar todo leido</button>' : '') +
      '</div>' +
      '<div class="flex-1 overflow-y-auto">' +
        renderGroup('Hoy', today) +
        renderGroup('Ayer', yesterday) +
        renderGroup('Anteriores', earlier) +
        (!notifications || !notifications.length ? '<div class="p-8 text-center"><svg class="w-10 h-10 mx-auto ' + T.muted + ' mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.inbox + '</svg><p class="text-sm ' + T.muted + '">Sin notificaciones</p></div>' : '') +
      '</div>' +
    '</div>';
  };

  UI._markAllRead = function(uid) {
    var wrap = document.getElementById(uid);
    if (!wrap) return;
    // Remove unread backgrounds
    wrap.querySelectorAll('[class*="bg-brand-50"]').forEach(function(el) {
      el.classList.remove('bg-brand-50/30');
    });
    wrap.querySelectorAll('[class*="bg-brand-900"]').forEach(function(el) {
      el.classList.remove('dark:bg-brand-900/10');
    });
    // Remove unread dots
    wrap.querySelectorAll('.bg-brand-500.rounded-full').forEach(function(el) {
      if (el.classList.contains('w-2')) el.remove();
    });
    // Remove unread count badge
    var badge = wrap.querySelector('.bg-brand-500.text-white');
    if (badge && badge.tagName === 'SPAN') badge.remove();
    // Remove mark-all button
    var btn = wrap.querySelector('button[onclick*="markAllRead"]');
    if (btn) btn.remove();
  };

  console.log('[UI System] v2.1 — 55+ componentes, DataTable, DatePicker, Combobox, MultiSelect');
})();

