// ============================================================
// UI.JS - Reusable UI Components — Inspired by shadcn/ui, Linear, Notion
// Premium feel: subtle borders, refined typography, micro-interactions
// ============================================================

// Global SVG icon set (shared across all modules)
const svgIcons = {
  plus: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>',
  download: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>',
  currency: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  document: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>',
  cog: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  bell: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>',
  eye: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>',
  edit: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
  trash: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>',
  check: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
  users: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>',
  box: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
  chart: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>',
};

const UI = {

  // ── GREETING ──
  greeting(name, subtitle = '') {
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Buenos dias' : hour < 18 ? 'Buenas tardes' : 'Buenas noches';
    return `
      <div class="mb-2">
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">${greet}, ${name}</h1>
        ${subtitle ? `<p class="text-gray-500 dark:text-gray-400 text-sm mt-1">${subtitle}</p>` : ''}
      </div>
    `;
  },

  // ── KPI CARD (like Sales Dashboard: icon + title / big value / change) ──
  kpiCard(title, value, change, icon, color = 'brand', subtitle = '') {
    const isPositive = parseFloat(change) >= 0;
    const changeColor = isPositive
      ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
      : 'text-red-500 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
    const changeIcon = isPositive ? '↑' : '↓';
    const iconBg = {
      brand: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
      indigo: 'bg-brand-50 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
      green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
      red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
      blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
      teal: 'bg-accent-50 text-accent-600 dark:bg-accent-700/30 dark:text-accent-300',
    };

    return `
      <div class="bg-white dark:bg-night-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-night-700 hover:shadow-md transition-shadow duration-200">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 ${iconBg[color] || iconBg.brand} rounded-xl flex items-center justify-center flex-shrink-0">
            <span class="w-5 h-5 [&>svg]:w-full [&>svg]:h-full">${icon || ''}</span>
          </div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">${title}</p>
        </div>
        <p class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">${value}</p>
        <div class="mt-3 flex items-center gap-2">
          ${change !== null && change !== undefined ? `
            <span class="${changeColor} text-xs font-semibold px-2 py-0.5 rounded-full">${changeIcon} ${Math.abs(parseFloat(change))}%</span>
            <span class="text-xs text-gray-400">${subtitle || 'vs mes anterior'}</span>
          ` : (subtitle ? `<span class="text-xs text-gray-400">${subtitle}</span>` : '')}
        </div>
      </div>
    `;
  },

  // ── WIDGET CARD ──
  widgetCard(emoji, title, actionLabel = '', actionOnclick = '', content = '') {
    return `
      <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 overflow-hidden">
        <div class="px-5 py-4 flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            ${emoji ? `<span class="text-lg">${emoji}</span>` : ''}
            <h3 class="text-sm font-bold text-gray-900 dark:text-white">${title}</h3>
          </div>
          ${actionLabel ? `<button onclick="${actionOnclick}" class="text-xs font-medium text-brand-600 dark:text-accent-300 hover:underline">${actionLabel}</button>` : ''}
        </div>
        <div class="px-5 pb-5">${content}</div>
      </div>
    `;
  },

  // ── COUNTER CARD (like Maham Assignments: icon circle + big number + label + chevron) ──
  counterCard(icon, count, label, onclick = '', bgClass = 'bg-brand-50 dark:bg-brand-900/20') {
    return `
      <button onclick="${onclick}" class="flex items-center gap-4 bg-white dark:bg-night-800 rounded-2xl px-5 py-4 border border-gray-100 dark:border-night-700 hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-night-900/50 transition-all duration-300 w-full text-left group">
        <div class="w-11 h-11 ${bgClass} rounded-xl flex items-center justify-center text-lg flex-shrink-0">${icon}</div>
        <div class="flex-1 min-w-0">
          <p class="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">${count}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">${label}</p>
        </div>
        <svg class="w-5 h-5 text-gray-300 dark:text-night-500 group-hover:text-gray-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>
    `;
  },

  // ── TABLE ─────────────────────────────────────────────────
  table(columns, rows, options = {}) {
    const { id = 'data-table', searchId = '', emptyMsg = 'No hay datos disponibles', compact = false } = options;
    const cellPad = compact ? 'px-5 py-2.5' : 'px-5 py-3.5';

    return `
      <div class="rounded-xl border border-gray-100 dark:border-night-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table id="${id}" class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50/50 dark:bg-night-700/30">
                ${columns.map(col => `
                  <th class="${cellPad} text-left text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider whitespace-nowrap">${col.label}</th>
                `).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-night-700/50">
              ${rows.length === 0
                ? `<tr><td colspan="${columns.length}" class="py-16 text-center text-gray-400 dark:text-gray-500">${UI.emptyState(emptyMsg)}</td></tr>`
                : rows.map((row, idx) => `
                  <tr class="hover:bg-gray-50/50 dark:hover:bg-night-700/30 transition-colors">
                    ${columns.map(col => `<td class="${cellPad} text-gray-700 dark:text-gray-300 ${col.class || ''}">${row[col.key] !== undefined ? row[col.key] : '-'}</td>`).join('')}
                  </tr>
                `).join('')
              }
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ── BADGE ─────────────────────────────────────────────────
  badge(text, color = 'gray') {
    const colors = {
      green: 'bg-green-500/10 text-green-600 dark:bg-green-500/15 dark:text-green-400',
      red: 'bg-red-500/10 text-red-600 dark:bg-red-500/15 dark:text-red-400',
      yellow: 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/15 dark:text-yellow-400',
      blue: 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
      orange: 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400',
      indigo: 'bg-brand-500/10 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300',
      purple: 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/15 dark:text-purple-300',
      gray: 'bg-gray-500/10 text-gray-600 dark:bg-gray-500/15 dark:text-gray-300',
      teal: 'bg-accent-500/10 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300',
    };
    return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium ${colors[color] || colors.gray}">${text}</span>`;
  },

  // ── BUTTON ────────────────────────────────────────────────
  button(text, type = 'primary', onclick = '', icon = '') {
    const types = {
      primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm',
      secondary: 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 dark:bg-night-700 dark:hover:bg-night-600 dark:text-gray-200 dark:border-night-600',
      danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
      success: 'bg-accent-400 hover:bg-accent-500 text-night-900 shadow-sm',
      warning: 'bg-gold-400 hover:bg-gold-500 text-night-900 shadow-sm',
      outline: 'border border-gray-200 text-gray-700 hover:bg-gray-50 dark:border-night-600 dark:text-gray-300 dark:hover:bg-night-700',
      ghost: 'text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-night-700 dark:hover:text-gray-200',
    };
    return `
      <button onclick="${onclick}" class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-150 active:scale-[.98] ${types[type] || types.primary}">
        ${icon ? `<span class="w-4 h-4">${icon}</span>` : ''}${text}
      </button>
    `;
  },

  // ── ICON BUTTON ───────────────────────────────────────────
  iconBtn(icon, onclick, title = '', color = 'gray') {
    const colors = {
      gray: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-night-700',
      indigo: 'text-brand-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20',
      red: 'text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20',
      green: 'text-accent-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-700/20',
    };
    return `<button onclick="${onclick}" title="${title}" class="p-2 rounded-xl transition-all duration-150 ${colors[color] || colors.gray}">${icon}</button>`;
  },

  // ── EMPTY STATE ───────────────────────────────────────────
  emptyState(msg = 'No hay datos disponibles', icon = '', actionBtn = '') {
    const defaultIcon = '<svg class="w-8 h-8 text-gray-300 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-2.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>';
    return `
      <div class="flex flex-col items-center justify-center py-16 px-4">
        <div class="w-14 h-14 bg-gray-50 dark:bg-night-700 rounded-2xl flex items-center justify-center mb-4">
          ${icon || defaultIcon}
        </div>
        <p class="text-gray-400 dark:text-gray-500 text-sm text-center">${msg}</p>
        ${actionBtn ? `<div class="mt-4">${actionBtn}</div>` : ''}
      </div>
    `;
  },

  // ── SKELETON ──────────────────────────────────────────────
  skeleton() {
    return `
      <div class="p-6 space-y-6 animate-pulse">
        <div class="h-8 bg-gray-100 dark:bg-night-800 rounded-xl w-1/3 mb-2"></div>
        <div class="h-4 bg-gray-50 dark:bg-night-800 rounded-lg w-1/2 mb-6"></div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          ${[1,2,3,4].map(() => `
            <div class="bg-white dark:bg-night-800 rounded-2xl p-6 h-36 border border-gray-100 dark:border-night-700">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 bg-gray-100 dark:bg-night-700 rounded-xl"></div>
                <div class="h-3 bg-gray-100 dark:bg-night-700 rounded w-20"></div>
              </div>
              <div class="h-8 bg-gray-100 dark:bg-night-700 rounded w-2/3 mb-3"></div>
              <div class="h-3 bg-gray-50 dark:bg-night-700 rounded w-1/3"></div>
            </div>
          `).join('')}
        </div>
        <div class="bg-white dark:bg-night-800 rounded-2xl p-6 h-72 border border-gray-100 dark:border-night-700">
          <div class="h-4 bg-gray-100 dark:bg-night-700 rounded w-1/4 mb-8"></div>
          <div class="space-y-4">
            ${[1,2,3,4,5].map(() => `<div class="h-3 bg-gray-50 dark:bg-night-700 rounded"></div>`).join('')}
          </div>
        </div>
      </div>
    `;
  },

  // ── SEARCH INPUT ──────────────────────────────────────────
  searchInput(id, placeholder = 'Buscar...', onInput = '') {
    return `
      <div class="relative">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <input type="text" id="${id}" placeholder="${placeholder}" ${onInput ? `oninput="${onInput}"` : ''} class="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 dark:focus:ring-brand-900/30 dark:focus:border-brand-500 transition-all"/>
      </div>
    `;
  },

  // ── SELECT ────────────────────────────────────────────────
  select(id, options, value = '', onchange = '', label = '') {
    return `
      <div>
        ${label ? `<label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">${label}</label>` : ''}
        <select id="${id}" ${onchange ? `onchange="${onchange}"` : ''} class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all">
          ${options.map(o => typeof o === 'string'
            ? `<option value="${o}" ${o === value ? 'selected' : ''}>${o}</option>`
            : `<option value="${o.value}" ${o.value === value ? 'selected' : ''}>${o.label}</option>`
          ).join('')}
        </select>
      </div>
    `;
  },

  // ── INPUT ─────────────────────────────────────────────────
  input(id, type = 'text', label = '', value = '', placeholder = '', required = false) {
    return `
      <div>
        ${label ? `<label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">${label}${required ? '<span class="text-red-500 ml-0.5">*</span>' : ''}</label>` : ''}
        <input type="${type}" id="${id}" value="${value}" placeholder="${placeholder}" ${required ? 'required' : ''} class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all"/>
      </div>
    `;
  },

  // ── TEXTAREA ──────────────────────────────────────────────
  textarea(id, label = '', value = '', placeholder = '', rows = 3) {
    return `
      <div>
        ${label ? `<label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5">${label}</label>` : ''}
        <textarea id="${id}" rows="${rows}" placeholder="${placeholder}" class="w-full px-3.5 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-300 transition-all resize-none">${value}</textarea>
      </div>
    `;
  },

  // ── SECTION CARD (like Shoplytic clean cards) ─────────────
  card(title, content, actions = '', subtitle = '') {
    return `
      <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
        <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">${title}</h3>
            ${subtitle ? `<p class="text-xs text-gray-400 mt-0.5">${subtitle}</p>` : ''}
          </div>
          ${actions ? `<div class="flex items-center gap-2">${actions}</div>` : ''}
        </div>
        <div class="p-6">${content}</div>
      </div>
    `;
  },

  // ── TABS (like Sales Dashboard Monthly/Yearly toggle) ─────
  tabs(tabs, activeTab, onClickPrefix) {
    return `
      <div class="bg-gray-100 dark:bg-night-800 rounded-xl p-1 inline-flex gap-1">
        ${tabs.map(tab => `
          <button onclick="${onClickPrefix}('${tab.id}')" id="tab-${tab.id}" class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] ${tab.id === activeTab ? 'bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-200 dark:border-night-600' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent'}">
            ${tab.label}
          </button>
        `).join('')}
      </div>
    `;
  },

  // ── STAT ROW ──────────────────────────────────────────────
  statRow(label, value, color = 'brand') {
    const colors = {
      brand: 'bg-brand-500', indigo: 'bg-brand-500', green: 'bg-green-500',
      yellow: 'bg-gold-400', red: 'bg-red-500', blue: 'bg-brand-400', teal: 'bg-accent-400',
    };
    return `
      <div class="flex items-center justify-between py-2.5">
        <div class="flex items-center gap-2.5">
          <div class="w-2.5 h-2.5 rounded-full ${colors[color] || colors.brand}"></div>
          <span class="text-sm text-gray-600 dark:text-gray-300">${label}</span>
        </div>
        <span class="text-sm font-bold text-gray-900 dark:text-white">${value}</span>
      </div>
    `;
  },

  // ── SEMAFORO ──────────────────────────────────────────────
  semaforo(estado) {
    const map = {
      verde: { cls: 'bg-accent-400', label: 'Óptimo' },
      amarillo: { cls: 'bg-gold-400', label: 'Atención' },
      rojo: { cls: 'bg-red-500', label: 'Crítico' },
    };
    const s = map[estado] || map.verde;
    return `<span class="inline-flex items-center gap-1.5"><span class="w-3 h-3 rounded-full ${s.cls} animate-pulse"></span><span class="text-xs font-medium text-gray-600 dark:text-gray-400">${s.label}</span></span>`;
  },

  // ── PROGRESS BAR (like Maham progress bars with rounded edges) ──
  progressBar(value, max, color = 'brand', showLabel = true) {
    const pct = Math.min(100, Math.round((value / max) * 100));
    const colors = {
      brand: 'bg-brand-500', indigo: 'bg-brand-500', green: 'bg-green-500',
      yellow: 'bg-gold-400', red: 'bg-red-500', blue: 'bg-blue-500', teal: 'bg-accent-400',
    };
    return `
      <div class="flex items-center gap-3">
        <div class="flex-1 bg-gray-100 dark:bg-night-700 rounded-full h-2.5">
          <div class="${colors[color] || colors.brand} h-2.5 rounded-full transition-all duration-500" style="width:${pct}%"></div>
        </div>
        ${showLabel ? `<span class="text-xs font-bold text-gray-500 dark:text-gray-400 w-10 text-right">${pct}%</span>` : ''}
      </div>
    `;
  },

  // ── AVATAR ────────────────────────────────────────────────
  avatar(name, size = 'md', color = 'brand') {
    const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' };
    const colors = {
      brand: 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
      indigo: 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-300',
      green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
      blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
      orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    };
    const initials = name.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
    return `<div class="${sizes[size] || sizes.md} ${colors[color] || colors.brand} rounded-full flex items-center justify-center font-bold flex-shrink-0">${initials}</div>`;
  },

  // ── SECTION HEADER ────────────────────────────────────────
  sectionHeader(title, subtitle = '', actions = '') {
    return `
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white tracking-tight">${title}</h2>
          ${subtitle ? `<p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${subtitle}</p>` : ''}
        </div>
        ${actions ? `<div class="flex items-center gap-2 flex-shrink-0">${actions}</div>` : ''}
      </div>
    `;
  },

  // ── KANBAN CARD ───────────────────────────────────────────
  kanbanCard(op) {
    const stateColors = {
      'Planificada': 'border-l-gray-300', 'En Proceso': 'border-l-brand-400',
      'QC': 'border-l-gold-400', 'Completada': 'border-l-accent-400',
    };
    const prioColors = {
      'Alta': 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400',
      'Media': 'text-gold-500 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400',
      'Normal': 'text-gray-500 bg-gray-100 dark:bg-night-700 dark:text-gray-400',
    };
    const producto = AppData.getProducto(op.producto_id);
    return `
      <div class="bg-white dark:bg-night-700 rounded-xl p-4 border-l-4 ${stateColors[op.estado] || 'border-l-gray-300'} cursor-pointer hover:shadow-lg hover:shadow-gray-100/50 dark:hover:shadow-night-900/50 transition-all duration-200">
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="text-xs font-bold text-gray-400 dark:text-gray-500">${op.id}</span>
          <span class="text-xs px-2 py-0.5 rounded-lg font-medium ${prioColors[op.prioridad] || prioColors.Normal}">${op.prioridad}</span>
        </div>
        <p class="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">${producto.nombre || 'Producto'}</p>
        <p class="text-xs text-gray-400 mb-3">Cant: ${op.cantidad} | Op: ${op.operario}</p>
        ${UI.progressBar(op.avance, 100, op.avance >= 80 ? 'green' : op.avance >= 40 ? 'blue' : 'yellow')}
      </div>
    `;
  },

  // ── FORM GROUP ────────────────────────────────────────────
  formGroup(label, inputHtml, required = false) {
    return `
      <div>
        <label class="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5">${label}${required ? '<span class="text-red-500 ml-0.5">*</span>' : ''}</label>
        ${inputHtml}
      </div>
    `;
  },

  // ── RATING STARS ──────────────────────────────────────────
  stars(rating) {
    return Array.from({ length: 5 }, (_, i) =>
      `<svg class="w-4 h-4 ${i < rating ? 'text-gold-400' : 'text-gray-200 dark:text-night-600'}" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`
    ).join('');
  },
};
