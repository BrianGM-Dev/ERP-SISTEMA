// ============================================================
// UI-EXTENDED.JS — Extended UI Components for CITE MADERA ERP
// New components that supplement the base ui.js design system.
// Self-contained IIFE that adds methods to the existing UI global.
// ============================================================

(function() {
  'use strict';

  // ── Utility: unique ID generator ─────────────────────────
  function _uid(prefix) {
    return prefix + '-' + Math.random().toString(36).substring(2, 8);
  }

  // ── Utility: color set lookup ────────────────────────────
  function _c(color) {
    var colors = {
      brand:   { bg:'bg-brand-500/10', text:'text-brand-700 dark:text-brand-300', solid:'bg-brand-600', icon:'text-brand-500' },
      green:   { bg:'bg-green-500/10', text:'text-green-700 dark:text-green-400', solid:'bg-green-500', icon:'text-green-500' },
      red:     { bg:'bg-red-500/10', text:'text-red-700 dark:text-red-400', solid:'bg-red-500', icon:'text-red-500' },
      yellow:  { bg:'bg-amber-500/10', text:'text-amber-700 dark:text-amber-400', solid:'bg-amber-400', icon:'text-amber-500' },
      blue:    { bg:'bg-blue-500/10', text:'text-blue-700 dark:text-blue-400', solid:'bg-blue-500', icon:'text-blue-500' },
      orange:  { bg:'bg-orange-500/10', text:'text-orange-700 dark:text-orange-400', solid:'bg-orange-500', icon:'text-orange-500' },
      teal:    { bg:'bg-accent-500/10', text:'text-accent-700 dark:text-accent-300', solid:'bg-accent-500', icon:'text-accent-500' },
      purple:  { bg:'bg-purple-500/10', text:'text-purple-700 dark:text-purple-400', solid:'bg-purple-500', icon:'text-purple-500' },
      gray:    { bg:'bg-gray-100 dark:bg-night-700', text:'text-gray-600 dark:text-gray-300', solid:'bg-gray-400', icon:'text-gray-400' },
    };
    return colors[color] || colors.gray;
  }

  // ── SVG Icons (shared) ───────────────────────────────────
  var ICO = {
    check:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>',
    x:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>',
    chevDown: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>',
    chevRight:'<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>',
    chevLeft: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>',
    info:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    warn:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>',
    error:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    success:  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>',
    search:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>',
    plus:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>',
    download: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>',
    dots:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/>',
    inbox:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>',
  };

  function _svg(name, cls) {
    cls = cls || 'w-5 h-5';
    return '<svg class="' + cls + '" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + (ICO[name] || '') + '</svg>';
  }

  // ════════════════════════════════════════════════════════
  // CSS ANIMATIONS (injected once)
  // ════════════════════════════════════════════════════════

  if (!document.getElementById('ui-ext-styles')) {
    var s = document.createElement('style');
    s.id = 'ui-ext-styles';
    s.textContent = [
      '.acc-item.open > div:last-child{max-height:500px!important}',
      '.open > [id$="-m"]{display:block!important}',
      '@keyframes drawerFadeIn{from{opacity:0}to{opacity:1}}',
      '@keyframes drawerFadeOut{from{opacity:1}to{opacity:0}}',
      '@keyframes drawerSlideRight{from{transform:translateX(100%);opacity:.8}to{transform:translateX(0);opacity:1}}',
      '@keyframes drawerSlideRightOut{from{transform:translateX(0);opacity:1}to{transform:translateX(100%);opacity:.8}}',
      '@keyframes drawerSlideLeft{from{transform:translateX(-100%);opacity:.8}to{transform:translateX(0);opacity:1}}',
      '@keyframes modalScaleIn{from{opacity:0;transform:scale(.95) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}',
      '@keyframes modalScaleOut{from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(.95) translateY(8px)}}',
      '@keyframes floatIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ════════════════════════════════════════════════════════
  // ACCORDION
  // ════════════════════════════════════════════════════════

  UI.accordion = function(items) {
    var id = _uid('acc');
    return '<div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm divide-y divide-gray-100 dark:divide-night-700" id="' + id + '">' + items.map(function(item) {
      return '<div class="acc-item">' +
        '<button onclick="this.parentElement.classList.toggle(\'open\');this.querySelector(\'.acc-ico\').classList.toggle(\'rotate-180\')" class="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 dark:hover:bg-night-700/30 transition-colors">' +
          '<span class="text-sm font-semibold text-gray-800 dark:text-gray-100">' + item.title + '</span>' +
          '<svg class="acc-ico w-4 h-4 text-gray-400 dark:text-gray-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.chevDown + '</svg>' +
        '</button>' +
        '<div class="max-h-0 overflow-hidden transition-all duration-300" style="max-height:0">' +
          '<div class="px-6 pb-4 text-sm text-gray-400 dark:text-gray-500 leading-relaxed">' + item.content + '</div>' +
        '</div>' +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // ALERT
  // ════════════════════════════════════════════════════════

  UI.alert = function(message, type, dismissible) {
    type = type || 'info';
    dismissible = dismissible !== false;
    var map = {info:'brand',success:'green',warning:'yellow',error:'red'};
    var icoMap = {info:ICO.info,success:ICO.success,warning:ICO.warn,error:ICO.error};
    var c = _c(map[type]||'brand');
    var uid = _uid('alert');
    return '<div id="' + uid + '" class="flex items-start gap-3 p-4 rounded-xl ' + c.bg + ' border border-current/10 animate-slide-up" role="alert">' +
      '<svg class="w-5 h-5 ' + c.icon + ' flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + (icoMap[type]||icoMap.info) + '</svg>' +
      '<div class="flex-1 text-sm ' + c.text + '">' + message + '</div>' +
      (dismissible ? '<button onclick="document.getElementById(\'' + uid + '\').remove()" class="p-1 rounded-lg ' + c.text + ' opacity-50 hover:opacity-100 transition-opacity">' + _svg('x','w-4 h-4') + '</button>' : '') +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // BREADCRUMB
  // ════════════════════════════════════════════════════════

  UI.breadcrumb = function(items) {
    return '<nav class="flex items-center gap-1.5" aria-label="Breadcrumb">' + items.map(function(item, i) {
      var last = i === items.length - 1;
      var sep = i > 0 ? '<svg class="w-3 h-3 text-gray-300 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.chevRight + '</svg>' : '';
      return sep + (last
        ? '<span class="text-sm font-semibold text-gray-800 dark:text-gray-100">' + item.label + '</span>'
        : '<a href="#" onclick="' + (item.onclick||'') + ';return false" class="text-sm text-gray-400 dark:text-gray-500 hover:text-brand-600 transition-colors">' + item.label + '</a>');
    }).join('') + '</nav>';
  };

  // ════════════════════════════════════════════════════════
  // LIST GROUP
  // ════════════════════════════════════════════════════════

  UI.listGroup = function(items) {
    return '<div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm divide-y divide-gray-100 dark:divide-night-700 overflow-hidden">' + items.map(function(item) {
      return '<div class="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 dark:hover:bg-night-700/30 transition-colors ' + (item.onclick?'cursor-pointer':'') + '" ' + (item.onclick?'onclick="' + item.onclick + '"':'') + '>' +
        (item.icon ? '<div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center text-brand-600 flex-shrink-0">' + item.icon + '</div>' : '') +
        '<div class="flex-1 min-w-0"><p class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">' + item.title + '</p>' + (item.desc?'<p class="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">' + item.desc + '</p>':'') + '</div>' +
        (item.value?'<span class="text-sm font-bold text-gray-900 dark:text-white font-mono flex-shrink-0">' + item.value + '</span>':'') +
        (item.badge?'<span class="flex-shrink-0">' + UI.badge(item.badge,item.badgeColor||'gray') + '</span>':'') +
        (item.onclick?_svg('chevRight','w-4 h-4 text-gray-300 flex-shrink-0'):'') +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // MODAL (improved with animations)
  // ════════════════════════════════════════════════════════

  UI.modal = function(title, content, opts) {
    opts = opts || {};
    var size = opts.size || 'md';
    var footer = opts.footer || '';
    var sizes = {sm:'max-w-sm',md:'max-w-lg',lg:'max-w-2xl',xl:'max-w-4xl'};
    var uid = _uid('modal');
    var closeCmd = "UI._closeModal('" + uid + "')";
    return '<div id="' + uid + '" class="fixed inset-0 z-[999] flex items-center justify-center p-4" onclick="if(event.target===this){' + closeCmd + '}">' +
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" style="animation:drawerFadeIn .2s ease both"></div>' +
      '<div class="bg-white dark:bg-night-800 relative rounded-2xl ' + (sizes[size]||sizes.md) + ' w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-100 dark:border-night-700" style="animation:modalScaleIn .35s cubic-bezier(.16,1,.3,1) both">' +
        '<div class="flex items-center justify-between px-7 py-5 border-b border-gray-100 dark:border-night-700">' +
          '<h3 class="text-lg font-bold text-gray-900 dark:text-white">' + title + '</h3>' +
          '<button onclick="' + closeCmd + '" class="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">' + _svg('x') + '</button>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto px-7 py-5">' + content + '</div>' +
        (footer?'<div class="flex items-center justify-end gap-3 px-7 py-4 border-t border-gray-100 dark:border-night-700">' + footer + '</div>':'') +
      '</div>' +
    '</div>';
  };

  UI._closeModal = function(uid) {
    var el = document.getElementById(uid);
    if (!el) return;
    var card = el.querySelector('[style*="modalScaleIn"]');
    var bg = el.querySelector('[style*="drawerFadeIn"]');
    if (card) card.style.animation = 'modalScaleOut .12s cubic-bezier(.4,0,1,1) both';
    if (bg) bg.style.animation = 'drawerFadeOut .1s ease both';
    setTimeout(function() { el.remove(); }, 130);
  };

  // ════════════════════════════════════════════════════════
  // DRAWER / OFFCANVAS (improved with right-slide animation)
  // ════════════════════════════════════════════════════════

  UI.drawer = function(title, content, opts) {
    opts = opts || {};
    var side = opts.side || 'right';
    var size = opts.size || 'md';
    var footer = opts.footer || '';
    var sizes = {sm:'max-w-sm',md:'max-w-md',lg:'max-w-lg'};
    var uid = _uid('drawer');
    return '<div id="' + uid + '" class="fixed inset-0 z-[999]">' +
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" style="animation:drawerFadeIn .25s ease both" onclick="UI._closeDrawer(\'' + uid + '\')"></div>' +
      '<div class="bg-white dark:bg-night-800 absolute inset-y-0 ' + (side==='left'?'left-0':'right-0') + ' ' + (sizes[size]||sizes.md) + ' w-full flex flex-col shadow-2xl ' + (side==='left'?'border-r':'border-l') + ' border-gray-100 dark:border-night-700"' +
           ' style="animation:drawerSlide' + (side==='left'?'Left':'Right') + ' .35s cubic-bezier(.16,1,.3,1) both">' +
        '<div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-night-700">' +
          '<h3 class="text-lg font-bold text-gray-900 dark:text-white">' + title + '</h3>' +
          '<button onclick="UI._closeDrawer(\'' + uid + '\')" class="p-2 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">' + _svg('x') + '</button>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto px-6 py-5">' + content + '</div>' +
        (footer?'<div class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-night-700">' + footer + '</div>':'') +
      '</div>' +
    '</div>';
  };

  UI._closeDrawer = function(uid) {
    var el = document.getElementById(uid);
    if (!el) return;
    var panel = el.querySelector('[style*="drawerSlide"]');
    var bg = el.querySelector('[style*="drawerFadeIn"]');
    if (panel) panel.style.animation = 'drawerSlideRightOut .3s cubic-bezier(.4,0,1,1) both';
    if (bg) bg.style.animation = 'drawerFadeOut .25s ease both';
    setTimeout(function() { el.remove(); }, 300);
  };

  // ════════════════════════════════════════════════════════
  // DROPDOWN
  // ════════════════════════════════════════════════════════

  UI.dropdown = function(triggerHtml, items, id) {
    var uid = id || _uid('dd');
    return '<div class="relative inline-block" id="' + uid + '">' +
      '<div onclick="event.stopPropagation();document.getElementById(\'' + uid + '\').classList.toggle(\'open\')" class="cursor-pointer">' + triggerHtml + '</div>' +
      '<div class="absolute right-0 mt-2 w-56 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 py-1.5 hidden" id="' + uid + '-m" style="display:none">' +
        items.map(function(item) {
          if (item.divider) return '<div class="my-1.5 border-t border-gray-100 dark:border-night-700"></div>';
          return '<button onclick="' + (item.onclick||'') + ';document.getElementById(\'' + uid + '\').classList.remove(\'open\');document.getElementById(\'' + uid + '-m\').style.display=\'none\'" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 text-left transition-colors">' +
            (item.icon?'<span class="w-4 h-4 text-gray-400 dark:text-gray-500">' + item.icon + '</span>':'') +
            item.label +
            (item.badge?'<span class="ml-auto">' + UI.badge(item.badge,item.badgeColor||'gray') + '</span>':'') +
          '</button>';
        }).join('') +
      '</div>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // TOOLTIP
  // ════════════════════════════════════════════════════════

  UI.tooltip = function(content, text, position) {
    position = position || 'top';
    var posCls = position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
    return '<span class="relative group inline-flex cursor-default">' + content + '<span class="absolute ' + posCls + ' left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-gray-800 dark:bg-night-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg">' + text + '</span></span>';
  };

  // ════════════════════════════════════════════════════════
  // SPINNER
  // ════════════════════════════════════════════════════════

  UI.spinner = function(size) {
    size = size || 'md';
    var sizes = {sm:'w-4 h-4',md:'w-6 h-6',lg:'w-8 h-8',xl:'w-12 h-12'};
    return '<svg class="' + (sizes[size]||sizes.md) + ' animate-spin text-brand-500" viewBox="0 0 24 24" fill="none"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/></svg>';
  };

  // ════════════════════════════════════════════════════════
  // NAVBAR (secondary navigation)
  // ════════════════════════════════════════════════════════

  UI.navbar = function(items, active) {
    active = active || '';
    return '<nav class="flex items-center gap-1 border-b border-gray-100 dark:border-night-700 pb-px overflow-x-auto">' + items.map(function(item) {
      return '<button onclick="' + (item.onclick||'') + '" class="px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all relative ' + (item.id===active ? 'text-brand-600 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-brand-500 after:rounded-full' : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300') + '">' + item.label + '</button>';
    }).join('') + '</nav>';
  };

  // ════════════════════════════════════════════════════════
  // PAGINATION
  // ════════════════════════════════════════════════════════

  UI.pagination = function(current, total, onPage) {
    onPage = onPage || '';
    var pages = [];
    for (var i=1;i<=total;i++) {
      if (i===1||i===total||(i>=current-1&&i<=current+1)) pages.push(i);
      else if (pages[pages.length-1]!=='...') pages.push('...');
    }
    return '<div class="flex items-center gap-1.5">' +
      '<button onclick="' + onPage + '(' + (current-1) + ')" ' + (current<=1?'disabled':'') + ' class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">' + _svg('chevLeft','w-4 h-4') + '</button>' +
      pages.map(function(p) {
        if (p === '...') return '<span class="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">...</span>';
        return '<button onclick="' + onPage + '(' + p + ')" class="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-medium transition-all ' + (p===current ? 'bg-brand-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700') + '">' + p + '</button>';
      }).join('') +
      '<button onclick="' + onPage + '(' + (current+1) + ')" ' + (current>=total?'disabled':'') + ' class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">' + _svg('chevRight','w-4 h-4') + '</button>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // CAROUSEL
  // ════════════════════════════════════════════════════════

  UI.carousel = function(slides) {
    var uid = _uid('car');
    var nav = function(dir) {
      return "(function(){var s=document.querySelectorAll('#" + uid + " .car-s'),c=[...s].findIndex(function(e){return !e.classList.contains('hidden')});s[c].classList.add('hidden');c=(c" + dir + "+s.length)%s.length;s[c].classList.remove('hidden')})()";
    };
    return '<div id="' + uid + '" class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">' +
      '<div class="relative">' + slides.map(function(s, i) {
        return '<div class="car-s ' + (i===0?'':'hidden') + '">' + s + '</div>';
      }).join('') + '</div>' +
      '<div class="flex items-center justify-between px-5 py-3 border-t border-gray-100 dark:border-night-700">' +
        '<button onclick="' + nav('-1') + '" class="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">' + _svg('chevLeft','w-4 h-4') + '</button>' +
        '<div class="flex gap-1.5">' + slides.map(function(_, i) {
          return '<span class="w-1.5 h-1.5 rounded-full ' + (i===0?'bg-brand-500':'bg-gray-300 dark:bg-night-600') + '"></span>';
        }).join('') + '</div>' +
        '<button onclick="' + nav('+1') + '" class="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">' + _svg('chevRight','w-4 h-4') + '</button>' +
      '</div>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // BUTTON GROUP
  // ════════════════════════════════════════════════════════

  UI.buttonGroup = function(buttons) {
    return '<div class="inline-flex rounded-xl overflow-hidden border border-gray-100 dark:border-night-700 shadow-sm">' + buttons.map(function(b, i) {
      return '<button onclick="' + (b.onclick||'') + '" class="px-4 py-2 text-sm font-medium transition-all active:scale-[.97] ' + (b.active ? 'bg-brand-600 text-white' : 'bg-white dark:bg-night-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700') + ' ' + (i > 0 ? 'border-l border-gray-100 dark:border-night-700' : '') + '">' + b.label + '</button>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // TYPOGRAPHY
  // ════════════════════════════════════════════════════════

  UI.typography = function(text, variant) {
    variant = variant || 'body';
    var v = {
      h1: 'text-4xl font-bold text-gray-900 dark:text-white',
      h2: 'text-3xl font-bold text-gray-900 dark:text-white',
      h3: 'text-2xl font-bold text-gray-900 dark:text-white',
      h4: 'text-xl font-semibold text-gray-800 dark:text-gray-100',
      body: 'text-sm text-gray-600 dark:text-gray-300 leading-relaxed',
      small: 'text-xs text-gray-400 dark:text-gray-500',
      mono: 'font-mono text-sm text-gray-600 dark:text-gray-300',
      label: 'font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500'
    };
    return '<span class="' + (v[variant]||v.body) + '">' + text + '</span>';
  };

  // ════════════════════════════════════════════════════════
  // SCROLLSPY
  // ════════════════════════════════════════════════════════

  UI.scrollspy = function(sections) {
    return '<div class="flex flex-col gap-0.5 sticky top-4">' + sections.map(function(s) {
      return '<a href="#' + s.id + '" class="px-3 py-2 text-sm text-gray-400 dark:text-gray-500 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/20 rounded-lg transition-all font-medium">' + s.label + '</a>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // DATA TABLE v2 (TanStack/shadcn inspired)
  // Features: sort, search, filter tabs, advanced faceted filters,
  //           select, bulk, column visibility, view modes (table/grid),
  //           column resize, column reorder (drag)
  // ════════════════════════════════════════════════════════

  UI.dataTable = function(config) {
    var id = config.id || 'dt-' + Math.random().toString(36).substring(2,8);
    var title = config.title || '';
    var subtitle = config.subtitle || '';
    var columns = config.columns || [];
    var data = config.data || [];
    var pageSize = config.pageSize || 10;
    var searchable = config.searchable !== false;
    var selectable = config.selectable !== false;
    var bulkActions = config.bulkActions || [];
    var toolbar = config.toolbar || '';
    var emptyMsg = config.emptyMsg || 'No se encontraron registros';
    var filterTabs = config.filterTabs || [];
    var gridRender = config.gridRender || null;   // fn(row) => card HTML
    var resizable = config.resizable !== false;
    var reorderable = config.reorderable !== false;
    var advancedFilters = config.advancedFilters || []; // [{key,label,options:[{value,label,count?}]}]

    window._dt = window._dt || {};

    // ── Load persisted preferences from localStorage ──
    var stored = null;
    try { stored = JSON.parse(localStorage.getItem('dt_prefs_'+id)); } catch(e){}

    var initCols = columns.slice();
    var initHidden = new Set(columns.filter(function(c){return c.hidden;}).map(function(c){return c.key;}));
    var initViewMode = 'table';
    var initPageSize = pageSize;
    var initDensity = 'comfortable'; // compact | comfortable | spacious
    var initColWidths = {};
    columns.forEach(function(c){ if(c.width) initColWidths[c.key] = c.width; });

    if (stored) {
      if (stored.colOrder) {
        var orderMap = {}; stored.colOrder.forEach(function(k,i){orderMap[k]=i;});
        initCols.sort(function(a,b){ return (orderMap[a.key]!=null?orderMap[a.key]:999)-(orderMap[b.key]!=null?orderMap[b.key]:999); });
      }
      if (stored.hiddenCols) initHidden = new Set(stored.hiddenCols);
      if (stored.viewMode) initViewMode = stored.viewMode;
      if (stored.pageSize) initPageSize = stored.pageSize;
      if (stored.density) initDensity = stored.density;
      if (stored.colWidths) initColWidths = stored.colWidths;
    }

    window._dt[id] = {
      data: data.slice(),
      filtered: data.slice(),
      columns: initCols,
      page: 1,
      pageSize: initPageSize,
      sortKey: null,
      sortDir: 'asc',
      search: '',
      selected: new Set(),
      hiddenCols: initHidden,
      activeFilter: null,
      viewMode: initViewMode,
      gridRender: gridRender,
      emptyMsg: emptyMsg,
      advFilters: {},
      advancedFilters: advancedFilters,
      resizable: resizable,
      colWidths: initColWidths,
      density: initDensity,
      totalDataCount: data.length,
    };

    var sid = id.replace(/-/g, '_');
    window['_dtRender_'+sid] = function(){ UI._renderDataTable(id); };
    window['_dtSort_'+sid] = function(key){ UI._sortDataTable(id,key); };
    window['_dtSearch_'+sid] = function(val){ UI._searchDataTable(id,val); };
    window['_dtPage_'+sid] = function(p){ UI._pageDataTable(id,p); };
    window['_dtSelect_'+sid] = function(idx){ UI._selectRow(id,idx); };
    window['_dtSelectAll_'+sid] = function(el){ UI._selectAll(id,el.checked); };
    window['_dtToggleCol_'+sid] = function(key){ UI._toggleCol(id,key); };
    window['_dtFilter_'+sid] = function(key,val){ UI._filterDataTable(id,key,val); };
    window['_dtView_'+sid] = function(mode){ var s=window._dt[id]; s.viewMode=mode; UI._dtPersist(id); UI._renderDataTable(id); document.querySelectorAll('#'+id+' .dt-vbtn').forEach(function(b){b.classList.toggle('bg-white',b.dataset.view===mode);b.classList.toggle('dark:bg-night-600',b.dataset.view===mode);b.classList.toggle('shadow-sm',b.dataset.view===mode);b.classList.toggle('text-gray-800',b.dataset.view===mode);b.classList.toggle('text-gray-400',b.dataset.view!==mode);}); };
    window['_dtDensity_'+sid] = function(d){ var s=window._dt[id]; s.density=d; UI._dtPersist(id); UI._renderDataTable(id); document.querySelectorAll('#'+id+' .dt-dbtn').forEach(function(b){b.classList.toggle('bg-white',b.dataset.density===d);b.classList.toggle('dark:bg-night-600',b.dataset.density===d);b.classList.toggle('shadow-sm',b.dataset.density===d);b.classList.toggle('text-gray-700',b.dataset.density===d);b.classList.toggle('text-gray-400',b.dataset.density!==d);}); };
    window['_dtExport_'+sid] = function(){ UI._exportCSV(id); };
    window['_dtPageSize_'+sid] = function(val){ var s=window._dt[id]; s.pageSize=parseInt(val)||10; s.page=1; UI._dtPersist(id); UI._renderDataTable(id); };
    window['_dtAdvFilter_'+sid] = function(key,val){
      var s=window._dt[id]; if(!s.advFilters[key]) s.advFilters[key]=new Set();
      s.advFilters[key].has(val) ? s.advFilters[key].delete(val) : s.advFilters[key].add(val);
      if(s.advFilters[key].size===0) delete s.advFilters[key];
      UI._applyAllFilters(id); UI._renderDataTable(id);
      // Update badge count
      var total=0; Object.keys(s.advFilters).forEach(function(k){total+=s.advFilters[k].size;});
      var badge=document.getElementById(id+'-afbadge');
      if(badge){badge.textContent=total;badge.style.display=total>0?'':'none';}
      // Sync checkboxes in advanced panel with current filter state
      UI._syncAdvCheckboxes(id);
    };
    window['_dtClearAdvFilters_'+sid] = function(){
      var s=window._dt[id]; s.advFilters={}; UI._applyAllFilters(id); UI._renderDataTable(id);
      var badge=document.getElementById(id+'-afbadge');if(badge){badge.textContent='0';badge.style.display='none';}
      UI._syncAdvCheckboxes(id);
    };

    setTimeout(function(){
      UI._renderDataTable(id);
      // Restore view mode button state
      if (initViewMode !== 'table') {
        document.querySelectorAll('#'+id+' .dt-vbtn').forEach(function(b){
          b.classList.toggle('bg-white',b.dataset.view===initViewMode);
          b.classList.toggle('dark:bg-night-600',b.dataset.view===initViewMode);
          b.classList.toggle('shadow-sm',b.dataset.view===initViewMode);
          b.classList.toggle('text-gray-800',b.dataset.view===initViewMode);
          b.classList.toggle('text-gray-400',b.dataset.view!==initViewMode);
        });
      }
      // Restore density button state
      document.querySelectorAll('#'+id+' .dt-dbtn').forEach(function(b){
        b.classList.toggle('bg-white',b.dataset.density===initDensity);
        b.classList.toggle('dark:bg-night-600',b.dataset.density===initDensity);
        b.classList.toggle('shadow-sm',b.dataset.density===initDensity);
        b.classList.toggle('text-gray-700',b.dataset.density===initDensity);
        b.classList.toggle('text-gray-400',b.dataset.density!==initDensity);
      });
      // ── Keyboard navigation ──
      var dtEl = document.getElementById(id);
      if (dtEl) {
        dtEl.setAttribute('tabindex','0');
        dtEl.addEventListener('keydown', function(e){
          var s = window._dt[id]; if(!s) return;
          if (e.key==='Escape') { document.querySelectorAll('[id$="-colmenu"]').forEach(function(m){m.style.display='none';}); document.getElementById(id+'-advpanel')&&document.getElementById(id+'-advpanel').classList.add('hidden'); var ctx=document.getElementById('inv-ctx-menu');if(ctx)ctx.remove(); return; }
          if (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA') return;
          var start=(s.page-1)*s.pageSize;
          var pageData=s.filtered.slice(start,start+s.pageSize);
          if (!pageData.length) return;
          if (e.key==='ArrowDown') { e.preventDefault(); var rows=dtEl.querySelectorAll('tbody tr');var focused=dtEl.querySelector('tbody tr.dt-focused');var idx=focused?Array.from(rows).indexOf(focused):- 1;if(idx<rows.length-1){if(focused)focused.classList.remove('dt-focused','bg-brand-50/30','dark:bg-brand-900/5');rows[idx+1].classList.add('dt-focused','bg-brand-50/30','dark:bg-brand-900/5');rows[idx+1].scrollIntoView({block:'nearest'});} }
          else if (e.key==='ArrowUp') { e.preventDefault(); var rows=dtEl.querySelectorAll('tbody tr');var focused=dtEl.querySelector('tbody tr.dt-focused');var idx=focused?Array.from(rows).indexOf(focused):rows.length;if(idx>0){if(focused)focused.classList.remove('dt-focused','bg-brand-50/30','dark:bg-brand-900/5');rows[idx-1].classList.add('dt-focused','bg-brand-50/30','dark:bg-brand-900/5');rows[idx-1].scrollIntoView({block:'nearest'});} }
          else if (e.key==='Enter') { var focused=dtEl.querySelector('tbody tr.dt-focused');if(focused){var ri=Array.from(dtEl.querySelectorAll('tbody tr')).indexOf(focused);if(ri>=0&&pageData[ri]&&pageData[ri]._id){var fnName=dtEl.id.includes('inventario')?'Inventario.verDetalle':'';if(fnName)try{eval(fnName+"('"+pageData[ri]._id+"')")}catch(ex){}}}}
          else if (e.key===' '&&!e.ctrlKey) { e.preventDefault(); var focused=dtEl.querySelector('tbody tr.dt-focused');if(focused){var cb=focused.querySelector('input[type=checkbox]');if(cb){cb.checked=!cb.checked;cb.dispatchEvent(new Event('change'));}}}
          else if (e.key==='e'||e.key==='E') { var focused=dtEl.querySelector('tbody tr.dt-focused');if(focused){var ri=Array.from(dtEl.querySelectorAll('tbody tr')).indexOf(focused);if(ri>=0&&pageData[ri]&&pageData[ri]._id){try{Inventario.editarMaterial(pageData[ri]._id)}catch(ex){}}}}
        });
      }
    }, 0);

    // ── Filter tabs ──
    var filterTabsHtml = filterTabs.length > 0 ?
      '<div class="flex items-center gap-1.5 px-5 py-2 border-b border-gray-100 dark:border-night-700 bg-gray-50/50 dark:bg-night-700/20 overflow-x-auto">' +
        '<button onclick="_dtFilter_'+sid+'(null,null)" class="dt-ftab px-3 py-1.5 text-xs font-medium rounded-lg transition-all bg-white dark:bg-night-600 text-gray-800 dark:text-white shadow-sm" data-filter="all">Todos</button>' +
        filterTabs.map(function(ft){
          return '<button onclick="_dtFilter_'+sid+'(\''+ft.key+'\',\''+ft.value+'\')" class="dt-ftab px-3 py-1.5 text-xs font-medium rounded-lg transition-all text-gray-500 hover:text-gray-700 hover:bg-white dark:hover:bg-night-600" data-filter="'+ft.value+'">'+ft.label+'</button>';
        }).join('') +
      '</div>' : '';

    // ── Advanced faceted filters panel ──
    var advFiltersHtml = advancedFilters.length > 0 ?
      '<div id="'+id+'-advpanel" class="hidden border-b border-gray-100 dark:border-night-700 bg-gray-50/30 dark:bg-night-700/10 px-5 py-3">' +
        '<div class="flex items-center justify-between mb-2"><span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filtros avanzados</span>' +
        '<button onclick="_dtClearAdvFilters_'+sid+'()" class="text-[10px] text-brand-600 hover:text-brand-700 font-medium">Limpiar filtros</button></div>' +
        '<div class="flex flex-wrap gap-4">' +
        advancedFilters.map(function(af){
          return '<div class="space-y-1.5"><p class="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase">'+ af.label +'</p>' +
            '<div class="flex flex-wrap gap-1">' +
            af.options.map(function(o){
              return '<label class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white dark:bg-night-700 border border-gray-200 dark:border-night-600 cursor-pointer hover:border-brand-300 transition-all select-none">' +
                '<input type="checkbox" onchange="_dtAdvFilter_'+sid+'(\''+af.key+'\',\''+o.value+'\')" class="w-3 h-3 rounded border-gray-300 text-brand-600 accent-brand-600"/>' +
                '<span class="text-gray-600 dark:text-gray-300">'+o.label+'</span>' +
                (o.count != null ? '<span class="text-[9px] text-gray-400 tabular-nums">('+o.count+')</span>' : '') +
              '</label>';
            }).join('') +
            '</div></div>';
        }).join('') +
        '</div></div>' : '';

    // ── View mode toggle ──
    var viewToggle = gridRender ?
      '<div class="inline-flex bg-gray-100 dark:bg-night-700 rounded-lg p-0.5">' +
        '<button data-view="table" onclick="_dtView_'+sid+'(\'table\')" class="dt-vbtn p-1.5 rounded-md bg-white dark:bg-night-600 shadow-sm text-gray-800 dark:text-white transition-all" title="Vista tabla">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18M3 6h18M3 18h18"/></svg>' +
        '</button>' +
        '<button data-view="grid" onclick="_dtView_'+sid+'(\'grid\')" class="dt-vbtn p-1.5 rounded-md text-gray-400 transition-all" title="Vista tarjetas">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zm10 0a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>' +
        '</button>' +
      '</div>' : '';

    // ── Advanced filter toggle button ──
    var advFilterBtn = advancedFilters.length > 0 ?
      '<button onclick="document.getElementById(\''+id+'-advpanel\').classList.toggle(\'hidden\')" class="relative p-2 rounded-lg border border-gray-200 dark:border-night-600 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all" title="Filtros avanzados">' +
        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>' +
        '<span id="'+id+'-afbadge" class="absolute -top-1 -right-1 w-4 h-4 bg-brand-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center" style="display:none">0</span>' +
      '</button>' : '';

    // ── Density toggle ──
    var densityToggle =
      '<div class="inline-flex bg-gray-100 dark:bg-night-700 rounded-lg p-0.5" title="Densidad de filas">' +
        '<button data-density="compact" onclick="_dtDensity_'+sid+'(\'compact\')" class="dt-dbtn p-1.5 rounded-md text-gray-400 transition-all" title="Compacto">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"/></svg>' +
        '</button>' +
        '<button data-density="comfortable" onclick="_dtDensity_'+sid+'(\'comfortable\')" class="dt-dbtn p-1.5 rounded-md bg-white dark:bg-night-600 shadow-sm text-gray-700 transition-all" title="Normal">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5h16M4 12h16M4 19h16"/></svg>' +
        '</button>' +
        '<button data-density="spacious" onclick="_dtDensity_'+sid+'(\'spacious\')" class="dt-dbtn p-1.5 rounded-md text-gray-400 transition-all" title="Espacioso">' +
          '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h16M4 12h16M4 20h16"/></svg>' +
        '</button>' +
      '</div>';

    // ── Export button ──
    var exportBtn =
      '<button onclick="_dtExport_'+sid+'()" class="p-2 rounded-lg border border-gray-200 dark:border-night-600 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all" title="Exportar CSV">' +
        '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>' +
      '</button>';

    // ── Column visibility (proper icon + click-outside close) ──
    var colVisBtn =
      '<div class="relative" id="'+id+'-colvis">' +
        '<button onclick="UI._toggleDropdown(\''+id+'-colmenu\',\''+id+'-colvis\')" class="p-2 rounded-lg border border-gray-200 dark:border-night-600 text-gray-400 hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-night-700 transition-all" title="Columnas visibles">' +
          '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>' +
        '</button>' +
        '<div class="absolute right-0 mt-2 w-56 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 py-2" style="display:none" id="'+id+'-colmenu">' +
          '<div class="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 dark:border-night-700 mb-1"><span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Columnas visibles</span><span class="text-[10px] text-gray-400">Arrastra para reordenar</span></div>' +
          columns.map(function(c,ci){
            return '<label class="dt-col-item flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 cursor-pointer transition-colors" draggable="true" data-col-idx="'+ci+'" data-col-key="'+c.key+'"' +
              (reorderable ? ' ondragstart="event.dataTransfer.setData(\'text/plain\',\''+ci+'\');this.style.opacity=0.4" ondragend="this.style.opacity=1" ondragover="event.preventDefault();this.classList.add(\'bg-brand-50\',\'dark:bg-brand-900/20\')" ondragleave="this.classList.remove(\'bg-brand-50\',\'dark:bg-brand-900/20\')" ondrop="event.preventDefault();this.classList.remove(\'bg-brand-50\',\'dark:bg-brand-900/20\');UI._reorderCol(\''+id+'\',parseInt(event.dataTransfer.getData(\'text/plain\')),'+ci+')"' : '') +
            '>' +
              (reorderable ? '<svg class="w-3 h-3 text-gray-300 flex-shrink-0 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>' : '') +
              '<input type="checkbox" '+(c.hidden?'':'checked')+' onchange="_dtToggleCol_'+sid+'(\''+c.key+'\')" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600"/>' +
              '<span class="flex-1">'+c.label+'</span>' +
            '</label>';
          }).join('') +
        '</div>' +
      '</div>';

    return '<div id="'+id+'" class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm overflow-hidden">' +
      // ── Toolbar ──
      '<div class="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-night-700">' +
        '<div>' +
          (title ? '<h4 class="font-bold text-gray-800 dark:text-white text-[15px] tracking-tight">'+title+'</h4>' : '') +
          '<p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5" id="'+id+'-subtitle">'+(subtitle||'')+'</p>' +
        '</div>' +
        '<div class="flex items-center gap-2 flex-wrap">' +
          (searchable ? '<div class="relative"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">'+ICO.search+'</svg><input type="text" placeholder="Buscar..." oninput="_dtSearch_'+sid+'(this.value)" class="pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-xl w-48 text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-brand-200 dark:focus:ring-brand-900/30 transition-all"/></div>' : '') +
          advFilterBtn +
          densityToggle +
          viewToggle +
          exportBtn +
          colVisBtn +
          toolbar +
        '</div>' +
      '</div>' +
      filterTabsHtml +
      advFiltersHtml +
      // ── Bulk actions ──
      '<div id="'+id+'-bulk" class="hidden px-5 py-2.5 bg-brand-50 dark:bg-brand-900/20 border-b border-gray-100 dark:border-night-700 flex items-center gap-3">' +
        '<span class="text-xs font-semibold text-brand-700 dark:text-brand-300" id="'+id+'-selcount">0 seleccionados</span>' +
        bulkActions.map(function(a){
          return '<button onclick="'+a.onclick+'" class="text-xs font-medium px-3 py-1 rounded-full '+(a.color==='danger'?'text-red-600 hover:bg-red-50':'text-brand-600 hover:bg-brand-100')+' transition-all">'+a.label+'</button>';
        }).join('') +
        '<button onclick="_dtSelectAll_'+sid+'({checked:false})" class="text-xs text-gray-500 hover:text-gray-700 ml-auto">Deseleccionar</button>' +
      '</div>' +
      // ── Active filter chips ──
      '<div id="'+id+'-chips" class="hidden px-5 py-2 border-b border-gray-100 dark:border-night-700 flex items-center gap-2 flex-wrap"></div>' +
      // ── Body + Footer ──
      '<div id="'+id+'-body" class="overflow-x-auto overflow-y-auto max-h-[65vh]"></div>' +
      '<div id="'+id+'-footer" class="px-5 py-3 flex items-center justify-between border-t border-gray-100 dark:border-night-700"></div>' +
    '</div>';
  };

  // ── Dropdown toggle with click-outside close ──
  UI._toggleDropdown = function(menuId, containerId) {
    var menu = document.getElementById(menuId);
    if (!menu) return;
    var isOpen = menu.style.display === 'block';
    // Close any other open dt dropdowns
    document.querySelectorAll('[id$="-colmenu"]').forEach(function(m) { m.style.display = 'none'; });
    if (isOpen) { menu.style.display = 'none'; return; }
    menu.style.display = 'block';
    setTimeout(function() {
      document.addEventListener('click', function handler(e) {
        var container = document.getElementById(containerId);
        if (container && !container.contains(e.target)) {
          menu.style.display = 'none';
          document.removeEventListener('click', handler);
        }
      });
    }, 0);
  };

  // ── Persist preferences to localStorage ──
  UI._dtPersist = function(id) {
    var s = window._dt[id]; if (!s) return;
    try {
      localStorage.setItem('dt_prefs_'+id, JSON.stringify({
        colOrder: s.columns.map(function(c){return c.key;}),
        hiddenCols: Array.from(s.hiddenCols),
        viewMode: s.viewMode,
        pageSize: s.pageSize,
        density: s.density,
        colWidths: s.colWidths,
      }));
    } catch(e){}
  };

  // ── Sync advanced filter checkboxes with state ──
  UI._syncAdvCheckboxes = function(id) {
    var s = window._dt[id]; if (!s) return;
    var panel = document.getElementById(id+'-advpanel');
    if (!panel) return;
    panel.querySelectorAll('input[type=checkbox]').forEach(function(cb) {
      var onchange = cb.getAttribute('onchange') || '';
      var match = onchange.match(/\('([^']+)','([^']+)'\)/);
      if (match) {
        var fKey = match[1], fVal = match[2];
        var isActive = s.advFilters[fKey] && s.advFilters[fKey].has(fVal);
        cb.checked = isActive;
      }
    });
  };

  // ── Export filtered data as CSV ──
  UI._exportCSV = function(id) {
    var s = window._dt[id]; if (!s) return;
    var visCols = s.columns.filter(function(c){return !s.hiddenCols.has(c.key) && c.key[0]!=='_';});
    var header = visCols.map(function(c){return '"'+c.label+'"';}).join(',');
    var rows = s.filtered.map(function(row){
      return visCols.map(function(c){
        var val = row[c.key] != null ? String(row[c.key]) : '';
        return '"'+val.replace(/"/g,'""')+'"';
      }).join(',');
    });
    var csv = '\uFEFF'+header+'\n'+rows.join('\n');
    var blob = new Blob([csv],{type:'text/csv;charset=utf-8;'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = (id||'datos')+'_'+new Date().toISOString().slice(0,10)+'.csv';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (typeof App!=='undefined'&&App.showToast) App.showToast('CSV exportado ('+s.filtered.length+' registros)','success');
  };

  // ── Apply all active filters (tabs + advanced) ──
  UI._applyAllFilters = function(id) {
    var s = window._dt[id]; if (!s) return;
    s.filtered = s.data.filter(function(row) {
      var matchSearch = !s.search || s.columns.some(function(c) { var v=row[c.key]; return v!=null && String(v).toLowerCase().includes(s.search); });
      var matchTab = !s.activeFilter || row[s.activeFilter.key] === s.activeFilter.value;
      var matchAdv = true;
      Object.keys(s.advFilters).forEach(function(k) {
        if (s.advFilters[k].size > 0 && !s.advFilters[k].has(row[k])) matchAdv = false;
      });
      return matchSearch && matchTab && matchAdv;
    });
    if (s.sortKey) {
      s.filtered.sort(function(a,b){var va=a[s.sortKey],vb=b[s.sortKey];if(va==null)return 1;if(vb==null)return -1;if(typeof va==='string')va=va.toLowerCase();if(typeof vb==='string')vb=vb.toLowerCase();var c=va<vb?-1:va>vb?1:0;return s.sortDir==='asc'?c:-c;});
    }
    s.page = 1; s.selected.clear();
  };

  // ── Render table OR grid ──
  UI._renderDataTable = function(id) {
    var s = window._dt[id];
    if (!s) return;
    var sid = id.replace(/-/g,'_');
    var body = document.getElementById(id+'-body');
    var footer = document.getElementById(id+'-footer');
    if (!body || !footer) return;

    var visCols = s.columns.filter(function(c){return !s.hiddenCols.has(c.key);});
    var start = (s.page-1)*s.pageSize;
    var pageData = s.filtered.slice(start,start+s.pageSize);
    var totalPages = Math.ceil(s.filtered.length / s.pageSize);

    // Density padding
    var dp = {compact:'px-3 py-1.5',comfortable:'px-4 py-3',spacious:'px-5 py-4.5'}[s.density||'comfortable'] || 'px-4 py-3';
    var hdp = {compact:'px-3 py-2',comfortable:'px-4 py-3',spacious:'px-5 py-4'}[s.density||'comfortable'] || 'px-4 py-3';

    // Check if filters are active
    var hasActiveFilters = s.search || s.activeFilter || Object.keys(s.advFilters).length > 0;
    var isFiltered = s.filtered.length < s.data.length;

    // ── Contextual empty state ──
    var emptyHtml = '<div class="flex flex-col items-center py-12"><svg class="w-10 h-10 text-gray-300 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">'+ICO.inbox+'</svg>' +
      (hasActiveFilters
        ? '<p class="text-sm text-gray-400 dark:text-gray-500">No hay resultados para los filtros aplicados</p><button onclick="_dtClearAdvFilters_'+sid+'();_dtSearch_'+sid+'(\'\');_dtFilter_'+sid+'(null,null);var inp=document.querySelector(\'#'+id+' input[type=text]\');if(inp)inp.value=\'\'" class="mt-3 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">Limpiar todos los filtros</button>'
        : '<p class="text-sm text-gray-400 dark:text-gray-500">'+s.emptyMsg+'</p>') +
      '</div>';

    // ── GRID VIEW ──
    if (s.viewMode === 'grid' && s.gridRender) {
      body.innerHTML = pageData.length === 0
        ? emptyHtml
        : '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">' + pageData.map(function(row){return s.gridRender(row);}).join('') + '</div>';
    } else {
      // ── TABLE VIEW ──
      var allSelected = pageData.length>0 && pageData.every(function(_,i){return s.selected.has(start+i);});
      body.innerHTML = '<table class="w-full text-sm" id="'+id+'-table">' +
        '<thead class="sticky top-0 z-10 bg-white dark:bg-night-800"><tr class="border-b border-gray-100 dark:border-night-700">' +
          '<th class="w-10 px-3 '+hdp+'"><input type="checkbox" '+(allSelected?'checked':'')+' onchange="_dtSelectAll_'+sid+'(this)" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600 cursor-pointer"/></th>' +
          visCols.map(function(c){
            var sorted = s.sortKey===c.key;
            var canSort = c.sortable!==false;
            var sortIcon = '';
            if (canSort) {
              if (sorted && s.sortDir==='asc') sortIcon = '<svg class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>';
              else if (sorted && s.sortDir==='desc') sortIcon = '<svg class="w-3.5 h-3.5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>';
              else sortIcon = '<svg class="w-3.5 h-3.5 text-gray-300 dark:text-gray-600 group-hover/th:text-gray-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l5 5 5-5M7 8l5-5 5 5"/></svg>';
            }
            var w = s.colWidths[c.key] || c.width || '';
            return '<th class="group/th '+hdp+' text-left whitespace-nowrap relative '+(canSort?'cursor-pointer hover:bg-gray-50/50 dark:hover:bg-night-700/30 select-none':'')+' transition-colors" '+(canSort?'onclick="_dtSort_'+sid+'(\''+c.key+'\')"':'')+(w?' style="width:'+w+'"':'')+' data-col-key="'+c.key+'">' +
              '<span class="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-wider '+(sorted?'text-brand-600':'text-gray-400 dark:text-gray-500')+'">'+c.label+sortIcon+'</span>' +
              (s.resizable ? '<div class="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-brand-400/50 transition-colors z-10" onmousedown="UI._startResize(event,\''+id+'\',\''+c.key+'\')"></div>' : '') +
            '</th>';
          }).join('') +
        '</tr></thead>' +
        '<tbody class="divide-y divide-gray-100/50 dark:divide-night-700/50">' +
          (pageData.length===0 ? '<tr><td colspan="'+(visCols.length+1)+'">'+emptyHtml+'</td></tr>' :
          pageData.map(function(row,ri){
            var globalIdx = start+ri;
            var sel = s.selected.has(globalIdx);
            return '<tr class="group hover:bg-gray-50/50 dark:hover:bg-night-700/20 transition-colors '+(sel?'bg-brand-50/50 dark:bg-brand-900/10':'')+'">' +
              '<td class="w-10 px-3 '+dp+'"><input type="checkbox" '+(sel?'checked':'')+' onchange="_dtSelect_'+sid+'('+globalIdx+')" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600 cursor-pointer"/></td>' +
              visCols.map(function(c){
                var val = row[c.key]!=null ? row[c.key] : '-';
                if (c.render) val = c.render(val,row);
                else if (c.type==='badge') val = UI.badge(val,row[c.key+'_color']||'gray');
                else if (c.type==='currency') val='<span class="font-mono font-semibold text-gray-800 dark:text-gray-100">S/ '+Number(val).toLocaleString('es-PE',{minimumFractionDigits:2})+'</span>';
                else if (c.type==='date') val='<span class="font-mono text-gray-500 text-xs">'+val+'</span>';
                else if (c.type==='avatar'){var name=val||'?';val='<div class="flex items-center gap-3">'+UI.avatar(name,'sm')+'<div><p class="text-sm font-semibold text-gray-800 dark:text-gray-100">'+name+'</p>'+(row[c.key+'_sub']?'<p class="text-xs text-gray-400 dark:text-gray-500">'+row[c.key+'_sub']+'</p>':'')+'</div></div>';}
                var w = s.colWidths[c.key] || '';
                return '<td class="'+dp+' text-gray-700 dark:text-gray-200"'+(w?' style="width:'+w+'"':'')+'>'+val+'</td>';
              }).join('') +
            '</tr>';
          }).join('')) +
        '</tbody></table>';
    }

    // ── Live counter in subtitle ──
    var subtitleEl = document.getElementById(id+'-subtitle');
    if (subtitleEl) {
      if (isFiltered) subtitleEl.innerHTML = '<span class="text-brand-600 font-medium">'+s.filtered.length+'</span> de '+s.totalDataCount+' registros'+(hasActiveFilters?' (filtrado)':'');
      // Don't override when not filtered - keep original subtitle
    }

    // ── Footer / Pagination + page size ──
    var showing = s.filtered.length===0 ? '0' : (start+1)+'-'+Math.min(start+s.pageSize,s.filtered.length);
    var pageSizeSelect = '<select onchange="_dtPageSize_'+sid+'(this.value)" class="text-xs bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg px-2 py-1 text-gray-600 dark:text-gray-300 ml-2 cursor-pointer">' +
      [5,10,20,50].map(function(n){return '<option value="'+n+'"'+(n===s.pageSize?' selected':'')+'>'+n+'</option>';}).join('') + '</select>';
    footer.innerHTML =
      '<div class="flex items-center gap-2"><span class="text-xs text-gray-400 dark:text-gray-500">Mostrando <span class="font-semibold text-gray-700 dark:text-gray-200">'+showing+'</span> de <span class="font-semibold text-gray-700 dark:text-gray-200">'+s.filtered.length+'</span></span>' +
      '<span class="text-xs text-gray-400">|</span><span class="text-xs text-gray-400">Filas:</span>'+pageSizeSelect+'</div>' +
      '<div class="flex items-center gap-1">' +
        '<button onclick="_dtPage_'+sid+'('+(s.page-1)+')" '+(s.page<=1?'disabled':'')+' class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">'+_svg('chevLeft','w-3.5 h-3.5')+'</button>' +
        Array.from({length:Math.min(totalPages,5)},function(_,i){
          var p=i+1;if(totalPages>5){if(s.page<=3)p=i+1;else if(s.page>=totalPages-2)p=totalPages-4+i;else p=s.page-2+i;}
          return '<button onclick="_dtPage_'+sid+'('+p+')" class="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all '+(p===s.page?'bg-brand-600 text-white shadow-sm':'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-night-700')+'">'+p+'</button>';
        }).join('') +
        '<button onclick="_dtPage_'+sid+'('+(s.page+1)+')" '+(s.page>=totalPages?'disabled':'')+' class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all">'+_svg('chevRight','w-3.5 h-3.5')+'</button>' +
      '</div>';

    var bulk = document.getElementById(id+'-bulk');
    if(bulk){if(s.selected.size>0){bulk.classList.remove('hidden');var cnt=document.getElementById(id+'-selcount');if(cnt)cnt.textContent=s.selected.size+' seleccionado'+(s.selected.size>1?'s':'');}else{bulk.classList.add('hidden');}}

    // ── Active filter chips ──
    var chips = document.getElementById(id+'-chips');
    if (chips) {
      var chipHtml = [];
      Object.keys(s.advFilters).forEach(function(k){
        s.advFilters[k].forEach(function(v){
          // Find label from advancedFilters config
          var facet = (s.advancedFilters||[]).find(function(af){return af.key===k;});
          var facetLabel = facet ? facet.label : k;
          var optLabel = v;
          if (facet) { var opt = facet.options.find(function(o){return o.value===v;}); if (opt) optLabel = opt.label; }
          chipHtml.push('<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">' +
            '<span class="text-brand-400 dark:text-brand-500 font-normal">'+facetLabel+':</span> '+optLabel +
            '<button onclick="_dtAdvFilter_'+sid+'(\''+k+'\',\''+v+'\')" class="ml-0.5 text-brand-400 hover:text-brand-600 transition-colors"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>' +
          '</span>');
        });
      });
      if (chipHtml.length > 0) {
        chips.classList.remove('hidden');
        chips.innerHTML = '<span class="text-[10px] text-gray-400 font-medium mr-1">Filtros activos:</span>' + chipHtml.join('') +
          '<button onclick="_dtClearAdvFilters_'+sid+'()" class="text-[10px] text-gray-400 hover:text-red-500 font-medium ml-auto transition-colors">Limpiar todo</button>';
      } else {
        chips.classList.add('hidden');
        chips.innerHTML = '';
      }
    }
  };

  // ── Column resize (mousedown handler) ──
  UI._startResize = function(e,id,colKey) {
    e.preventDefault(); e.stopPropagation();
    var s = window._dt[id]; if (!s) return;
    var th = e.target.parentElement;
    var startX = e.clientX;
    var startW = th.offsetWidth;
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;cursor:col-resize;';
    document.body.appendChild(overlay);
    function onMove(ev) {
      var newW = Math.max(60, startW + ev.clientX - startX);
      s.colWidths[colKey] = newW + 'px';
      th.style.width = newW + 'px';
      // Also update tbody cells
      var table = document.getElementById(id+'-table');
      if (table) {
        var idx = Array.from(th.parentElement.children).indexOf(th);
        table.querySelectorAll('tbody tr').forEach(function(tr){ var td=tr.children[idx]; if(td)td.style.width=newW+'px'; });
      }
    }
    function onUp() { document.removeEventListener('mousemove',onMove); document.removeEventListener('mouseup',onUp); overlay.remove(); UI._dtPersist(id); }
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  };

  // ── Column reorder (drag in colmenu) ──
  UI._reorderCol = function(id, fromIdx, toIdx) {
    var s = window._dt[id]; if (!s || fromIdx===toIdx) return;
    var col = s.columns.splice(fromIdx,1)[0];
    s.columns.splice(toIdx,0,col);
    UI._dtPersist(id);
    UI._renderDataTable(id);
    UI._rebuildColMenu(id);
  };

  // ── Rebuild column menu after reorder ──
  UI._rebuildColMenu = function(id) {
    var s = window._dt[id]; if (!s) return;
    var sid = id.replace(/-/g,'_');
    var menu = document.getElementById(id+'-colmenu');
    if (!menu) return;
    menu.innerHTML =
      '<div class="flex items-center justify-between px-3 py-1.5 border-b border-gray-100 dark:border-night-700 mb-1"><span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Columnas</span><span class="text-[10px] text-gray-400">Arrastra para reordenar</span></div>' +
      s.columns.map(function(c,ci){
        var checked = !s.hiddenCols.has(c.key);
        return '<label class="dt-col-item flex items-center gap-2.5 px-3 py-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 cursor-pointer transition-colors" draggable="true" data-col-idx="'+ci+'" data-col-key="'+c.key+'"' +
          ' ondragstart="event.dataTransfer.setData(\'text/plain\',\''+ci+'\');this.style.opacity=0.4"'+
          ' ondragend="this.style.opacity=1"'+
          ' ondragover="event.preventDefault();this.classList.add(\'bg-brand-50\')"'+
          ' ondragleave="this.classList.remove(\'bg-brand-50\')"'+
          ' ondrop="event.preventDefault();this.classList.remove(\'bg-brand-50\');UI._reorderCol(\''+id+'\',parseInt(event.dataTransfer.getData(\'text/plain\')),'+ci+')"'+
        '>' +
          '<svg class="w-3 h-3 text-gray-300 flex-shrink-0 cursor-grab" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/></svg>' +
          '<input type="checkbox" '+(checked?'checked':'')+' onchange="_dtToggleCol_'+sid+'(\''+c.key+'\')" class="w-3.5 h-3.5 rounded border-gray-300 text-brand-600 accent-brand-600"/>' +
          '<span class="flex-1">'+c.label+'</span>' +
        '</label>';
      }).join('');
    menu.style.display = 'block';
  };

  // ── Sort ──
  UI._sortDataTable = function(id,key) {
    var s = window._dt[id]; if (!s) return;
    if (s.sortKey===key) s.sortDir = s.sortDir==='asc'?'desc':'asc';
    else { s.sortKey=key; s.sortDir='asc'; }
    s.filtered.sort(function(a,b){var va=a[key],vb=b[key];if(va==null)return 1;if(vb==null)return -1;if(typeof va==='string')va=va.toLowerCase();if(typeof vb==='string')vb=vb.toLowerCase();var c=va<vb?-1:va>vb?1:0;return s.sortDir==='asc'?c:-c;});
    s.page=1; UI._renderDataTable(id);
  };

  // ── Search ──
  UI._searchDataTable = function(id,val) {
    var s = window._dt[id]; if (!s) return;
    s.search = val.toLowerCase();
    UI._applyAllFilters(id);
    UI._renderDataTable(id);
  };

  // ── Pagination ──
  UI._pageDataTable = function(id,p) {
    var s = window._dt[id]; if (!s) return;
    var maxP = Math.ceil(s.filtered.length/s.pageSize);
    s.page = Math.max(1,Math.min(p,maxP));
    UI._renderDataTable(id);
  };

  // ── Selection ──
  UI._selectRow = function(id,idx) {
    var s = window._dt[id]; if (!s) return;
    s.selected.has(idx)?s.selected.delete(idx):s.selected.add(idx);
    UI._renderDataTable(id);
  };
  UI._selectAll = function(id,checked) {
    var s = window._dt[id]; if (!s) return;
    var start=(s.page-1)*s.pageSize, end=Math.min(start+s.pageSize,s.filtered.length);
    for(var i=start;i<end;i++) checked?s.selected.add(i):s.selected.delete(i);
    if(!checked)s.selected.clear();
    UI._renderDataTable(id);
  };

  // ── Toggle column visibility ──
  UI._toggleCol = function(id,key) {
    var s = window._dt[id]; if (!s) return;
    s.hiddenCols.has(key)?s.hiddenCols.delete(key):s.hiddenCols.add(key);
    UI._dtPersist(id);
    UI._renderDataTable(id);
    var menu = document.getElementById(id+'-colmenu');
    if(menu){menu.style.display='block';menu.querySelectorAll('input[type="checkbox"]').forEach(function(cb){var m=cb.getAttribute('onchange').match(/'([^']+)'/);if(m)cb.checked=!s.hiddenCols.has(m[1]);});}
  };

  // ── Filter tabs ──
  UI._filterDataTable = function(id,key,value) {
    var s = window._dt[id]; if (!s) return;
    s.activeFilter = key ? {key:key,value:value} : null;
    UI._applyAllFilters(id);
    var tabs = document.querySelectorAll('#'+id+' .dt-ftab');
    tabs.forEach(function(t){
      var isAll=t.dataset.filter==='all';
      var isActive=(!key&&isAll)||(value&&t.dataset.filter===value);
      t.className='dt-ftab px-3 py-1.5 text-xs font-medium rounded-lg transition-all '+(isActive?'bg-white dark:bg-night-600 text-gray-800 dark:text-white shadow-sm':'text-gray-500 dark:text-gray-400 hover:text-gray-700 hover:bg-white dark:hover:bg-night-600');
    });
    UI._renderDataTable(id);
  };

  // ════════════════════════════════════════════════════════
  // COMBOBOX (searchable dropdown)
  // ════════════════════════════════════════════════════════

  UI.combobox = function(id, options, config) {
    config = config || {};
    var value = config.value || '';
    var placeholder = config.placeholder || 'Seleccionar...';
    var searchable = config.searchable !== false;
    var label = config.label || '';
    var required = config.required || false;
    var icon = config.icon || '';
    var uid = id || _uid('cb');
    var selLabel = options.find(function(o) { return (typeof o === 'string' ? o : o.value) === value; });
    var displayText = selLabel ? (typeof selLabel === 'string' ? selLabel : selLabel.label) : placeholder;

    setTimeout(function() {
      var wrap = document.getElementById(uid);
      if (!wrap) return;
      var trigger = wrap.querySelector('.cb-trigger');
      var menu = wrap.querySelector('.cb-menu');
      var search = wrap.querySelector('.cb-search');
      var hidden = wrap.querySelector('.cb-value');
      var items = wrap.querySelectorAll('.cb-item');
      var display = wrap.querySelector('.cb-display');

      var isOpen = false;
      var open = function() { menu.style.display = 'block'; isOpen = true; if (search) { search.value = ''; search.focus(); items.forEach(function(i) { i.style.display = ''; }); } requestAnimationFrame(function() { menu.style.opacity = '1'; }); };
      var close = function() { menu.style.opacity = '0'; setTimeout(function() { menu.style.display = 'none'; isOpen = false; }, 150); };
      trigger.onclick = function() { isOpen ? close() : open(); };
      document.addEventListener('click', function(e) { if (isOpen && !wrap.contains(e.target)) close(); });
      if (search) search.oninput = function() { var q = this.value.toLowerCase(); items.forEach(function(i) { i.style.display = i.textContent.toLowerCase().includes(q) ? '' : 'none'; }); };
      items.forEach(function(item) {
        item.onclick = function() {
          hidden.value = item.dataset.value;
          display.textContent = item.textContent;
          items.forEach(function(i) { i.classList.remove('bg-brand-50','text-brand-700','dark:bg-brand-900/20'); });
          item.classList.add('bg-brand-50','text-brand-700','dark:bg-brand-900/20');
          close();
          hidden.dispatchEvent(new Event('change'));
        };
      });
      wrap.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
    }, 0);

    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + (required ? '<span class="text-red-500 ml-0.5">*</span>' : '') + '</label>' : '') +
      '<div id="' + uid + '" class="relative">' +
        '<input type="hidden" class="cb-value" name="' + uid + '" value="' + value + '"/>' +
        '<button type="button" class="cb-trigger w-full flex items-center gap-2 px-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-xl text-left transition-all hover:border-gray-300 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30 focus:border-brand-300">' +
          (icon ? '<span class="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0">' + icon + '</span>' : '') +
          '<span class="cb-display flex-1 truncate ' + (value ? 'text-gray-700 dark:text-gray-200' : 'text-gray-400 dark:text-gray-500') + '">' + displayText + '</span>' +
          '<svg class="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
        '</button>' +
        '<div class="cb-menu absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 py-1 max-h-64 overflow-y-auto opacity-0 transition-opacity duration-150" style="display:none">' +
          (searchable ? '<div class="px-2 py-1.5 border-b border-gray-100 dark:border-night-700"><input type="text" class="cb-search w-full px-3 py-2 text-xs bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-lg placeholder-gray-400 focus:ring-1 focus:ring-brand-100 transition-all" placeholder="Buscar..."/></div>' : '') +
          options.map(function(o) {
            var val = typeof o === 'string' ? o : o.value;
            var lbl = typeof o === 'string' ? o : o.label;
            var desc = typeof o === 'object' ? o.desc || '' : '';
            var img = typeof o === 'object' ? o.img || '' : '';
            var avatar = typeof o === 'object' ? o.avatar || '' : '';
            var badge = typeof o === 'object' ? o.badge || '' : '';
            var badgeColor = typeof o === 'object' ? o.badgeColor || 'gray' : 'gray';
            var isActive = val === value;
            var imgHtml = img ? '<img src="' + img + '" alt="" class="w-8 h-8 rounded-xl object-cover flex-shrink-0"/>' :
                          avatar ? '<div class="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-brand-600">' + avatar.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2) + '</div>' : '';
            return '<div class="cb-item flex items-center gap-3 px-3 py-2.5 text-sm cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-night-700 ' + (isActive ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/20' : 'text-gray-600 dark:text-gray-300') + '" data-value="' + val + '">' +
              imgHtml +
              '<div class="flex-1 min-w-0"><p class="font-medium truncate">' + lbl + '</p>' + (desc ? '<p class="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 truncate">' + desc + '</p>' : '') + '</div>' +
              (badge ? '<span class="px-2 py-0.5 rounded-full text-[10px] font-semibold ' + _c(badgeColor).bg + ' ' + _c(badgeColor).text + ' flex-shrink-0">' + badge + '</span>' : '') +
              (isActive ? '<svg class="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>' : '') +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // DATEPICKER
  // ════════════════════════════════════════════════════════

  var _dpMonths = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  var _dpDays = ['Lu','Ma','Mi','Ju','Vi','Sa','Do'];
  var _dpFmt = function(d) { var dd=String(d.getDate()).padStart(2,'0'),mm=String(d.getMonth()+1).padStart(2,'0'); return dd+'/'+mm+'/'+d.getFullYear(); };
  var _dpIso = function(d) { return d.toISOString().split('T')[0]; };
  var _dpParse = function(s) { if(!s) return null; var p=s.includes('/')? s.split('/').reverse().join('-'):s; var d=new Date(p); return isNaN(d)?null:d; };
  var _dpSame = function(a,b) { return a&&b&&a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate(); };
  var _dpBetween = function(d,s,e) { return d>=s&&d<=e; };

  UI.datePicker = function(id, config) {
    config = config || {};
    var value = config.value || '';
    var label = config.label || '';
    var placeholder = config.placeholder || 'dd/mm/aaaa';
    var required = config.required || false;
    var presets = config.presets || false;
    var range = config.range || false;
    var uid = id || _uid('dp');
    var popupW = presets || range ? 'w-[420px]' : 'w-[290px]';

    setTimeout(function() {
      var wrap = document.getElementById(uid);
      if (!wrap) return;
      var input = wrap.querySelector('.dp-input');
      var popup = wrap.querySelector('.dp-popup');
      var hiddenStart = wrap.querySelector('.dp-start');
      var hiddenEnd = wrap.querySelector('.dp-end');
      var cur = _dpParse(value) || new Date();
      var selStart = _dpParse(value);
      var selEnd = range ? null : selStart;
      var picking = 'start';
      var viewMode = 'days';
      var isOpen = false;

      function renderDays() {
        var y=cur.getFullYear(), m=cur.getMonth();
        var first=(new Date(y,m,1).getDay()+6)%7;
        var dim=new Date(y,m+1,0).getDate();
        var today=new Date(); today.setHours(0,0,0,0);
        var prevDim = new Date(y,m,0).getDate();
        var grid = '';
        for(var i=first-1;i>=0;i--) grid += '<div class="w-9 h-9 flex items-center justify-center text-xs text-gray-300 dark:text-night-600">'+(prevDim-i)+'</div>';
        for(var d=1;d<=dim;d++){
          var date=new Date(y,m,d); date.setHours(0,0,0,0);
          var isToday=_dpSame(date,today);
          var isSel=_dpSame(date,selStart)||_dpSame(date,selEnd);
          var inRange=range&&selStart&&selEnd&&_dpBetween(date,selStart,selEnd);
          var isRangeEdge=isSel&&range;
          var cls='text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20';
          if(isSel) cls='bg-brand-600 text-white font-bold shadow-sm';
          else if(inRange) cls='bg-brand-100 dark:bg-brand-900/30 text-brand-800 dark:text-brand-200';
          else if(isToday) cls='ring-2 ring-brand-300 text-brand-700 font-semibold';
          var roundL = (isRangeEdge&&_dpSame(date,selStart))||(!range&&isSel) ? 'rounded-l-lg':'';
          var roundR = (isRangeEdge&&_dpSame(date,selEnd))||(!range&&isSel) ? 'rounded-r-lg':'';
          grid += '<button type="button" class="dp-day w-9 h-9 text-xs transition-all '+cls+' '+roundL+' '+roundR+'" data-date="'+_dpIso(date)+'">'+d+'</button>';
        }
        var total = first+dim;
        var rem = (7-total%7)%7;
        for(var j=1;j<=rem;j++) grid += '<div class="w-9 h-9 flex items-center justify-center text-xs text-gray-300 dark:text-night-600">'+j+'</div>';
        return grid;
      }

      function renderMonths() {
        return _dpMonths.map(function(m,i) {
          var isCur = i===cur.getMonth()&&cur.getFullYear()===new Date().getFullYear();
          return '<button type="button" class="dp-month px-2 py-3 text-sm rounded-lg transition-all '+(isCur?'bg-brand-600 text-white font-bold':'text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20')+'" data-month="'+i+'">'+m.slice(0,3)+'</button>';
        }).join('');
      }

      function renderYears() {
        var cy=cur.getFullYear(); var start=cy-6;
        return Array.from({length:12},function(_,i){
          var y=start+i; var isCur=y===new Date().getFullYear();
          return '<button type="button" class="dp-year px-2 py-3 text-sm rounded-lg transition-all '+(isCur?'bg-brand-600 text-white font-bold':'text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20')+'" data-year="'+y+'">'+y+'</button>';
        }).join('');
      }

      function render() {
        var y=cur.getFullYear(), m=cur.getMonth();
        var presetsHtml = '';
        if (presets) {
          var today = new Date(); today.setHours(0,0,0,0);
          var presetList = [
            {label:'Hoy', fn:function(){selStart=new Date(today);selEnd=range?new Date(today):null;}},
            {label:'Ayer', fn:function(){var d=new Date(today);d.setDate(d.getDate()-1);selStart=d;selEnd=range?new Date(d):null;}},
            {label:'Ultimos 7 dias', fn:function(){selEnd=new Date(today);selStart=new Date(today);selStart.setDate(selStart.getDate()-6);}},
            {label:'Ultimo mes', fn:function(){selEnd=new Date(today);selStart=new Date(today);selStart.setMonth(selStart.getMonth()-1);}},
            {label:'Ultimos 3 meses', fn:function(){selEnd=new Date(today);selStart=new Date(today);selStart.setMonth(selStart.getMonth()-3);}},
            {label:'Este anio', fn:function(){selEnd=new Date(today);selStart=new Date(y,0,1);}},
            {label:'Ultimo anio', fn:function(){selEnd=new Date(today);selStart=new Date(today);selStart.setFullYear(selStart.getFullYear()-1);}},
          ];
          presetsHtml = '<div class="w-[130px] border-r border-gray-100 dark:border-night-700 py-2 flex-shrink-0">' +
            '<p class="px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Rapido</p>' +
            presetList.map(function(p,i){return '<button type="button" class="dp-preset w-full text-left px-3 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-brand-900/20 transition-colors" data-idx="'+i+'">'+p.label+'</button>';}).join('') +
          '</div>';
          wrap._presets = presetList;
        }

        var navTitle = '';
        if(viewMode==='days') navTitle = _dpMonths[m]+' '+y;
        else if(viewMode==='months') navTitle = ''+y;
        else navTitle = (y-6)+' — '+(y+5);

        var calHtml = '<div class="flex-1 p-2">' +
          '<div class="flex items-center justify-between px-1 py-1.5 mb-1">' +
            '<button type="button" class="dp-prev p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">'+_svg('chevLeft','w-4 h-4')+'</button>' +
            '<button type="button" class="dp-title text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-brand-600 transition-colors">'+navTitle+'</button>' +
            '<button type="button" class="dp-next p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-night-700 transition-all">'+_svg('chevRight','w-4 h-4')+'</button>' +
          '</div>' +
          (viewMode==='days' ?
            '<div class="grid grid-cols-7 gap-0">'+_dpDays.map(function(d){return '<div class="text-center text-[10px] font-semibold text-gray-400 dark:text-gray-500 py-1.5">'+d+'</div>';}).join('')+'</div>' +
            '<div class="grid grid-cols-7 gap-0">'+renderDays()+'</div>'
          : viewMode==='months' ? '<div class="grid grid-cols-3 gap-1">'+renderMonths()+'</div>'
          : '<div class="grid grid-cols-3 gap-1">'+renderYears()+'</div>') +
          '<div class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-night-700">' +
            (range && selStart && selEnd ? '<span class="text-[10px] text-gray-400 dark:text-gray-500 font-mono">'+_dpFmt(selStart)+' — '+_dpFmt(selEnd)+'</span>' : '<span class="text-[10px] text-gray-400 dark:text-gray-500 font-mono">'+(selStart ? _dpFmt(selStart) : '—')+'</span>') +
            '<div class="flex gap-2">' +
              '<button type="button" class="dp-clear text-[11px] font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 transition-colors">Limpiar</button>' +
              (range ? '<button type="button" class="dp-apply text-[11px] font-semibold text-brand-600 hover:text-brand-700 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 transition-all">Aplicar</button>' : '') +
            '</div>' +
          '</div>' +
        '</div>';

        popup.innerHTML = '<div class="flex">'+presetsHtml+calHtml+'</div>';

        popup.querySelector('.dp-prev').onclick=function(e){e.stopPropagation();if(viewMode==='days')cur.setMonth(m-1);else if(viewMode==='months')cur.setFullYear(y-1);else cur.setFullYear(y-12);render();};
        popup.querySelector('.dp-next').onclick=function(e){e.stopPropagation();if(viewMode==='days')cur.setMonth(m+1);else if(viewMode==='months')cur.setFullYear(y+1);else cur.setFullYear(y+12);render();};
        popup.querySelector('.dp-title').onclick=function(e){e.stopPropagation();if(viewMode==='days')viewMode='months';else if(viewMode==='months')viewMode='years';else viewMode='days';render();};
        popup.querySelector('.dp-clear').onclick=function(e){e.stopPropagation();selStart=null;selEnd=null;picking='start';input.value='';hiddenStart.value='';if(hiddenEnd)hiddenEnd.value='';close();};
        var applyBtn=popup.querySelector('.dp-apply');
        if(applyBtn)applyBtn.onclick=function(e){e.stopPropagation();applySelection();close();};
        popup.querySelectorAll('.dp-day').forEach(function(btn){btn.onclick=function(e){e.stopPropagation();var d=new Date(btn.dataset.date);d.setHours(0,0,0,0);
          if(range){if(picking==='start'){selStart=d;selEnd=null;picking='end';}else{if(d<selStart){selEnd=selStart;selStart=d;}else{selEnd=d;}picking='start';if(!presets)applySelection();}}
          else{selStart=d;cur=new Date(d);applySelection();close();}
          render();};});
        popup.querySelectorAll('.dp-month').forEach(function(btn){btn.onclick=function(e){e.stopPropagation();cur.setMonth(parseInt(btn.dataset.month));viewMode='days';render();};});
        popup.querySelectorAll('.dp-year').forEach(function(btn){btn.onclick=function(e){e.stopPropagation();cur.setFullYear(parseInt(btn.dataset.year));viewMode='months';render();};});
        popup.querySelectorAll('.dp-preset').forEach(function(btn){btn.onclick=function(e){e.stopPropagation();var p=wrap._presets[parseInt(btn.dataset.idx)];if(p){p.fn();cur=new Date(selStart);applySelection();if(!range)close();render();}};});
      }

      function applySelection(){
        if(selStart){
          hiddenStart.value=_dpIso(selStart);
          if(range&&selEnd){input.value=_dpFmt(selStart)+' — '+_dpFmt(selEnd);if(hiddenEnd)hiddenEnd.value=_dpIso(selEnd);}
          else{input.value=_dpFmt(selStart);}
          hiddenStart.dispatchEvent(new Event('change'));
        }
      }

      function open(){popup.style.display='block';isOpen=true;viewMode='days';render();requestAnimationFrame(function(){popup.style.opacity='1';});}
      function close(){popup.style.opacity='0';setTimeout(function(){popup.style.display='none';isOpen=false;},150);}

      input.onclick=function(){isOpen?close():open();};
      document.addEventListener('click',function(e){if(isOpen&&!wrap.contains(e.target))close();});
      wrap.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
    }, 0);

    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + (required?'<span class="text-red-500 ml-0.5">*</span>':'') + '</label>' : '') +
      '<div id="' + uid + '" class="relative">' +
        '<input type="hidden" class="dp-start" name="' + uid + '" value="' + (value?(_dpParse(value)?_dpIso(_dpParse(value)):''):'') + '"/>' +
        (range ? '<input type="hidden" class="dp-end" name="' + uid + '-end" value=""/>' : '') +
        '<div class="relative">' +
          '<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>' +
          '<input type="text" class="dp-input w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 cursor-pointer focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30 transition-all" value="' + value + '" placeholder="' + placeholder + '" readonly/>' +
        '</div>' +
        '<div class="dp-popup absolute top-full left-0 mt-1.5 ' + popupW + ' bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 opacity-0 transition-opacity duration-150" style="display:none"></div>' +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // TIME PICKER
  // ════════════════════════════════════════════════════════

  UI.timePicker = function(id, config) {
    config = config || {};
    var value = config.value || '';
    var label = config.label || '';
    var required = config.required || false;
    var format24 = config.format24 !== false;
    var presets = config.presets !== false;
    var uid = id || _uid('tp');

    setTimeout(function() {
      var wrap = document.getElementById(uid);
      if (!wrap) return;
      var input = wrap.querySelector('.tp-input');
      var popup = wrap.querySelector('.tp-popup');
      var hDisp = wrap.querySelector('.tp-h');
      var mDisp = wrap.querySelector('.tp-m');
      var isOpen = false, h = 8, m = 0;

      if (value) { var p = value.match(/(\d{1,2}):(\d{2})/); if (p) { h = parseInt(p[1]); m = parseInt(p[2]); } }

      function update() {
        var hS = String(format24 ? h : (h%12||12)).padStart(2,'0');
        var mS = String(m).padStart(2,'0');
        var sfx = format24 ? '' : (h<12?' AM':' PM');
        if (hDisp) hDisp.textContent = hS;
        if (mDisp) mDisp.textContent = mS;
        input.value = hS+':'+mS+sfx;
        wrap.querySelectorAll('.tp-hb').forEach(function(b) { var a = parseInt(b.dataset.v)===h; b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); b.classList.toggle('shadow-sm',a); });
        wrap.querySelectorAll('.tp-mb').forEach(function(b) { var a = parseInt(b.dataset.v)===m; b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); b.classList.toggle('shadow-sm',a); });
        wrap.querySelectorAll('.tp-ap').forEach(function(b) { var a = (b.dataset.v==='AM'&&h<12)||(b.dataset.v==='PM'&&h>=12); b.classList.toggle('bg-brand-600',a); b.classList.toggle('text-white',a); });
      }
      function open() { popup.style.display='flex'; isOpen=true; popup.style.opacity='0'; requestAnimationFrame(function(){popup.style.opacity='1';}); update(); }
      function close() { popup.style.opacity='0'; setTimeout(function(){popup.style.display='none';isOpen=false;},150); }

      input.onclick = function() { isOpen ? close() : open(); };
      document.addEventListener('click', function(e) { if(isOpen && !wrap.contains(e.target)) close(); });
      wrap.querySelectorAll('.tp-hb').forEach(function(b) { b.onclick = function(e) { e.stopPropagation(); h=parseInt(b.dataset.v); update(); }; });
      wrap.querySelectorAll('.tp-mb').forEach(function(b) { b.onclick = function(e) { e.stopPropagation(); m=parseInt(b.dataset.v); update(); }; });
      wrap.querySelectorAll('.tp-ap').forEach(function(b) { b.onclick = function(e) { e.stopPropagation(); if(b.dataset.v==='AM'&&h>=12)h-=12; if(b.dataset.v==='PM'&&h<12)h+=12; update(); }; });
      wrap.querySelectorAll('.tp-st').forEach(function(b) { b.onclick = function(e) { e.stopPropagation(); if(b.dataset.u==='h')h=(h+parseInt(b.dataset.d)+24)%24; else m=(m+parseInt(b.dataset.d)+60)%60; update(); }; });
      wrap.querySelectorAll('.tp-pr').forEach(function(b) { b.onclick = function(e) { e.stopPropagation(); h=parseInt(b.dataset.h); m=parseInt(b.dataset.m); update(); close(); }; });
      var ok = wrap.querySelector('.tp-ok'); if(ok) ok.onclick = function(e) { e.stopPropagation(); close(); };
      update();
    }, 0);

    var H = Array.from({length:24},function(_,i){return i;});
    var M = [0,5,10,15,20,25,30,35,40,45,50,55];
    var QT = [{l:'06:00',h:6,m:0},{l:'07:00',h:7,m:0},{l:'08:00',h:8,m:0},{l:'08:30',h:8,m:30},{l:'09:00',h:9,m:0},{l:'12:00',h:12,m:0},{l:'13:00',h:13,m:0},{l:'14:00',h:14,m:0},{l:'17:00',h:17,m:0},{l:'18:00',h:18,m:0}];
    var chevU = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/></svg>';
    var chevD = '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/></svg>';

    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + (required?'<span class="text-red-500 ml-0.5">*</span>':'') + '</label>' : '') +
      '<div id="' + uid + '" class="relative">' +
        '<div class="relative">' +
          '<svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="1.5"/><path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/></svg>' +
          '<input type="text" class="tp-input w-full pl-10 pr-4 py-2.5 text-sm font-mono bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 cursor-pointer focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900/30 transition-all" value="' + value + '" placeholder="' + (format24?'HH:MM':'HH:MM AM') + '" readonly/>' +
        '</div>' +
        '<div class="tp-popup absolute top-full left-0 mt-1.5 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 opacity-0 transition-opacity duration-150" style="display:none;flex-direction:row">' +
          (presets ? '<div class="w-[80px] border-r border-gray-100 dark:border-night-700 py-2 flex-shrink-0 overflow-y-auto" style="max-height:310px">' +
            '<p class="px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">Rapido</p>' +
            QT.map(function(t){return '<button type="button" class="tp-pr w-full text-left px-2 py-1.5 text-[11px] font-mono text-gray-600 dark:text-gray-300 hover:bg-brand-50 dark:hover:bg-night-600 transition-colors" data-h="'+t.h+'" data-m="'+t.m+'">'+t.l+'</button>';}).join('') +
          '</div>' : '') +
          '<div class="p-3 flex-1" style="min-width:200px">' +
            '<div class="flex items-center justify-center gap-1 mb-3">' +
              '<div class="flex flex-col items-center gap-0.5">' +
                '<button type="button" class="tp-st p-1 text-gray-400 dark:text-gray-500 hover:text-brand-600 transition-colors" data-u="h" data-d="1">' + chevU + '</button>' +
                '<span class="tp-h text-2xl font-bold font-mono text-gray-800 dark:text-gray-100 w-10 text-center select-none">08</span>' +
                '<button type="button" class="tp-st p-1 text-gray-400 dark:text-gray-500 hover:text-brand-600 transition-colors" data-u="h" data-d="-1">' + chevD + '</button>' +
              '</div>' +
              '<span class="text-2xl font-bold text-gray-400 dark:text-gray-500 mx-0.5 select-none">:</span>' +
              '<div class="flex flex-col items-center gap-0.5">' +
                '<button type="button" class="tp-st p-1 text-gray-400 dark:text-gray-500 hover:text-brand-600 transition-colors" data-u="m" data-d="5">' + chevU + '</button>' +
                '<span class="tp-m text-2xl font-bold font-mono text-gray-800 dark:text-gray-100 w-10 text-center select-none">00</span>' +
                '<button type="button" class="tp-st p-1 text-gray-400 dark:text-gray-500 hover:text-brand-600 transition-colors" data-u="m" data-d="-5">' + chevD + '</button>' +
              '</div>' +
              (!format24 ? '<div class="flex flex-col gap-1 ml-2"><button type="button" class="tp-ap px-2.5 py-1 text-[10px] font-bold rounded-lg text-gray-500 hover:bg-brand-50 transition-all" data-v="AM">AM</button><button type="button" class="tp-ap px-2.5 py-1 text-[10px] font-bold rounded-lg text-gray-500 hover:bg-brand-50 transition-all" data-v="PM">PM</button></div>' : '') +
            '</div>' +
            '<p class="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Hora</p>' +
            '<div class="grid grid-cols-6 gap-0.5 mb-2">' +
              H.map(function(i){return '<button type="button" class="tp-hb py-1 text-[10px] rounded-lg text-gray-500 hover:bg-brand-50 transition-all text-center" data-v="'+i+'">'+String(format24?i:(i%12||12)).padStart(2,'0')+'</button>';}).join('') +
            '</div>' +
            '<p class="font-mono text-[8px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-1">Minuto</p>' +
            '<div class="grid grid-cols-6 gap-0.5 mb-3">' +
              M.map(function(i){return '<button type="button" class="tp-mb py-1 text-[10px] rounded-lg text-gray-500 hover:bg-brand-50 transition-all text-center" data-v="'+i+'">'+String(i).padStart(2,'0')+'</button>';}).join('') +
            '</div>' +
            '<button type="button" class="tp-ok w-full py-2 text-xs font-semibold rounded-full bg-brand-600 hover:bg-brand-700 text-white transition-all active:scale-[.97]">Aceptar</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // MULTI-SELECT (Tags)
  // ════════════════════════════════════════════════════════

  UI.multiSelect = function(id, options, config) {
    config = config || {};
    var value = config.value || [];
    var label = config.label || '';
    var placeholder = config.placeholder || 'Agregar...';
    var max = config.max || 10;
    var uid = id || _uid('ms');

    setTimeout(function() {
      var wrap = document.getElementById(uid);
      if (!wrap) return;
      var tagsEl = wrap.querySelector('.ms-tags');
      var input = wrap.querySelector('.ms-input');
      var menu = wrap.querySelector('.ms-menu');
      var selected = value.slice();

      function renderTags() {
        tagsEl.innerHTML = selected.map(function(v) {
          var opt = options.find(function(o) { return (typeof o === 'string' ? o : o.value) === v; });
          var lbl = opt ? (typeof opt === 'string' ? opt : opt.label) : v;
          return '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-300 text-xs font-medium">' + lbl + '<button type="button" class="ms-remove hover:text-red-500 transition-colors" data-val="' + v + '">&times;</button></span>';
        }).join('');
        tagsEl.querySelectorAll('.ms-remove').forEach(function(btn) {
          btn.onclick = function(e) { e.stopPropagation(); selected = selected.filter(function(v) { return v !== btn.dataset.val; }); renderTags(); renderMenu(); };
        });
      }

      function renderMenu() {
        var q = input.value.toLowerCase();
        var available = options.filter(function(o) { var v = typeof o === 'string' ? o : o.value; return !selected.includes(v) && (typeof o === 'string' ? o : o.label).toLowerCase().includes(q); });
        menu.innerHTML = available.length === 0 ? '<div class="px-3 py-3 text-xs text-gray-400 dark:text-gray-500 text-center">Sin opciones</div>' :
          available.map(function(o) { var v = typeof o === 'string' ? o : o.value; var l = typeof o === 'string' ? o : o.label; return '<div class="ms-opt px-3 py-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-night-700 transition-colors" data-value="' + v + '">' + l + '</div>'; }).join('');
        menu.querySelectorAll('.ms-opt').forEach(function(opt) { opt.onclick = function() { if (selected.length < max) { selected.push(opt.dataset.value); renderTags(); renderMenu(); input.value = ''; } }; });
      }

      input.onfocus = function() { menu.style.display = 'block'; renderMenu(); };
      input.oninput = function() { renderMenu(); };
      document.addEventListener('click', function(e) { if (!wrap.contains(e.target)) menu.style.display = 'none'; });
      renderTags();
    }, 0);

    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="relative">' +
        '<div class="flex flex-wrap items-center gap-1.5 px-3 py-2 bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-xl min-h-[42px] cursor-text" onclick="this.querySelector(\'.ms-input\').focus()">' +
          '<div class="ms-tags flex flex-wrap gap-1.5"></div>' +
          '<input type="text" class="ms-input flex-1 min-w-[80px] bg-transparent border-0 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-0 outline-none" placeholder="' + placeholder + '"/>' +
        '</div>' +
        '<div class="ms-menu absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 max-h-48 overflow-y-auto py-1" style="display:none"></div>' +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // SWITCH TOGGLE
  // ════════════════════════════════════════════════════════

  UI.switchToggle = function(id, config) {
    config = config || {};
    var checked = config.checked || false;
    var label = config.label || '';
    var size = config.size || 'md';
    var onChange = config.onChange || '';
    var uid = id || _uid('sw');
    var sizes = {
      sm: { track:'h-5 w-9', dot:'h-3.5 w-3.5', translate:'translate-x-4', off:'translate-x-0.5' },
      md: { track:'h-6 w-11', dot:'h-4 w-4', translate:'translate-x-5', off:'translate-x-1' },
      lg: { track:'h-7 w-14', dot:'h-5 w-5', translate:'translate-x-7', off:'translate-x-1' }
    };
    var s = sizes[size] || sizes.md;
    return '<label class="inline-flex items-center gap-3 cursor-pointer select-none">' +
      '<input type="checkbox" id="' + uid + '" class="sr-only peer" ' + (checked ? 'checked' : '') + ' ' + (onChange ? 'onchange="' + onChange + '"' : '') + '/>' +
      '<div class="relative ' + s.track + ' rounded-full transition-colors duration-200 bg-gray-200 dark:bg-night-600 peer-checked:bg-brand-600 px-0.5">' +
        '<div class="absolute top-1/2 -translate-y-1/2 ' + s.dot + ' bg-white rounded-full shadow-sm transition-transform duration-200 ' + (checked ? s.translate : s.off) + '" id="' + uid + '-dot"></div>' +
      '</div>' +
      (label ? '<span class="text-sm text-gray-700 dark:text-gray-200">' + label + '</span>' : '') +
    '</label>';
  };

  // ════════════════════════════════════════════════════════
  // RADIO GROUP
  // ════════════════════════════════════════════════════════

  UI.radioGroup = function(id, options, config) {
    config = config || {};
    var value = config.value || '';
    var label = config.label || '';
    var direction = config.direction || 'vertical';
    var onChange = config.onChange || '';
    var uid = id || _uid('rg');
    var dir = direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'flex flex-col gap-2.5';
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="' + dir + '" role="radiogroup">' +
        options.map(function(o, i) {
          var rid = uid + '-' + i;
          var checked = o.value === value;
          return '<label class="flex items-start gap-3 cursor-pointer group">' +
            '<input type="radio" name="' + uid + '" id="' + rid + '" value="' + o.value + '" ' + (checked ? 'checked' : '') + ' class="sr-only peer" ' + (onChange ? 'onchange="' + onChange + '"' : '') + '/>' +
            '<div class="mt-0.5 w-[18px] h-[18px] rounded-full border-2 border-gray-300 dark:border-night-600 peer-checked:border-brand-600 flex items-center justify-center transition-colors">' +
              '<div class="w-2.5 h-2.5 rounded-full bg-brand-600 scale-0 peer-checked:scale-100 transition-transform"></div>' +
            '</div>' +
            '<div>' +
              '<span class="text-sm font-medium text-gray-700 dark:text-gray-200">' + o.label + '</span>' +
              (o.desc ? '<p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">' + o.desc + '</p>' : '') +
            '</div>' +
          '</label>';
        }).join('') +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // CHECKBOX GROUP
  // ════════════════════════════════════════════════════════

  UI.checkboxGroup = function(id, options, config) {
    config = config || {};
    var value = config.value || [];
    var label = config.label || '';
    var columns = config.columns || 1;
    var uid = id || _uid('cg');
    var gridCls = columns > 1 ? 'grid grid-cols-' + columns + ' gap-2.5' : 'flex flex-col gap-2.5';
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="' + gridCls + '">' +
        options.map(function(o, i) {
          var cid = uid + '-' + i;
          var checked = value.includes(o.value);
          return '<label class="flex items-start gap-3 cursor-pointer group">' +
            '<input type="checkbox" id="' + cid + '" value="' + o.value + '" ' + (checked ? 'checked' : '') + ' class="sr-only peer"/>' +
            '<div class="mt-0.5 w-[18px] h-[18px] rounded-lg border-2 border-gray-300 dark:border-night-600 peer-checked:border-brand-600 peer-checked:bg-brand-600 flex items-center justify-center transition-colors">' +
              '<svg class="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' +
            '</div>' +
            '<div>' +
              '<span class="text-sm font-medium text-gray-700 dark:text-gray-200">' + o.label + '</span>' +
              (o.desc ? '<p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">' + o.desc + '</p>' : '') +
            '</div>' +
          '</label>';
        }).join('') +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // NUMBER INPUT
  // ════════════════════════════════════════════════════════

  UI.numberInput = function(id, config) {
    config = config || {};
    var value = config.value || 0;
    var min = config.min != null ? config.min : 0;
    var max = config.max != null ? config.max : 999;
    var step = config.step || 1;
    var label = config.label || '';
    var uid = id || _uid('ni');
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div class="inline-flex items-center border border-gray-100 dark:border-night-700 rounded-xl bg-white dark:bg-night-800 overflow-hidden">' +
        '<button type="button" onclick="UI._numStep(\'' + uid + '\',-' + step + ',' + min + ',' + max + ')" class="px-3 py-2.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-night-600 transition-colors font-bold text-lg leading-none select-none">&minus;</button>' +
        '<input type="number" id="' + uid + '" value="' + value + '" min="' + min + '" max="' + max + '" step="' + step + '" class="w-16 text-center text-sm font-semibold bg-transparent border-0 text-gray-700 dark:text-gray-200 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"/>' +
        '<button type="button" onclick="UI._numStep(\'' + uid + '\',' + step + ',' + min + ',' + max + ')" class="px-3 py-2.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-night-600 transition-colors font-bold text-lg leading-none select-none">+</button>' +
      '</div>';
  };

  UI._numStep = function(uid, delta, min, max) {
    var input = document.getElementById(uid);
    if (!input) return;
    var v = parseFloat(input.value) + delta;
    if (v < min) v = min;
    if (v > max) v = max;
    input.value = v;
    input.dispatchEvent(new Event('change'));
  };

  // ════════════════════════════════════════════════════════
  // CURRENCY INPUT
  // ════════════════════════════════════════════════════════

  UI.currencyInput = function(id, config) {
    config = config || {};
    var value = config.value || '';
    var label = config.label || '';
    var currency = config.currency || 'S/';
    var required = config.required || false;
    var uid = id || _uid('ci');
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + (required ? ' <span class="text-red-500">*</span>' : '') + '</label>' : '') +
      '<div class="flex items-center border border-gray-100 dark:border-night-700 rounded-xl bg-white dark:bg-night-800 overflow-hidden focus-within:ring-2 focus-within:ring-brand-100 dark:focus-within:ring-brand-900/30 focus-within:border-brand-400">' +
        '<span class="pl-3 pr-1 text-sm font-semibold text-gray-400 dark:text-gray-500 select-none">' + currency + '</span>' +
        '<input type="text" id="' + uid + '" value="' + value + '" inputmode="decimal" placeholder="0.00" class="flex-1 py-2.5 pr-3 text-sm bg-transparent border-0 text-gray-700 dark:text-gray-200 focus:ring-0 outline-none" ' + (required ? 'required' : '') + ' onkeypress="return /[\\d.]/.test(event.key)||event.key===\'Backspace\'" onblur="UI._formatCurrency(\'' + uid + '\')"/>' +
      '</div>';
  };

  UI._formatCurrency = function(uid) {
    var input = document.getElementById(uid);
    if (!input || !input.value) return;
    var num = parseFloat(input.value.replace(/,/g, ''));
    if (isNaN(num)) { input.value = ''; return; }
    input.value = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  // ════════════════════════════════════════════════════════
  // FILE UPLOAD
  // ════════════════════════════════════════════════════════

  UI.fileUpload = function(id, config) {
    config = config || {};
    var label = config.label || '';
    var accept = config.accept || 'image/*,.pdf';
    var maxSize = config.maxSize || '5MB';
    var multiple = config.multiple || false;
    var uid = id || _uid('fu');
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="border-2 border-dashed border-gray-300 dark:border-night-600 rounded-xl p-8 text-center hover:border-brand-400 hover:bg-brand-50/30 dark:hover:bg-brand-900/10 transition-all cursor-pointer" onclick="this.querySelector(\'input\').click()">' +
        '<input type="file" accept="' + accept + '" ' + (multiple ? 'multiple' : '') + ' class="hidden" onchange="UI._handleFileUpload(\'' + uid + '\',this)"/>' +
        '<svg class="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>' +
        '<p class="text-sm font-medium text-gray-700 dark:text-gray-200">Arrastra archivos o <span class="text-brand-600 font-semibold">busca en tu equipo</span></p>' +
        '<p class="text-[11px] text-gray-400 dark:text-gray-500 mt-1">' + accept.replace(/\./g,'').toUpperCase() + ' - Max ' + maxSize + '</p>' +
        '<div class="fu-preview mt-3 hidden"></div>' +
      '</div>';
  };

  UI._handleFileUpload = function(uid, input) {
    var wrap = document.getElementById(uid);
    var preview = wrap.querySelector('.fu-preview');
    if (!input.files.length) return;
    preview.classList.remove('hidden');
    preview.innerHTML = Array.from(input.files).map(function(f) {
      return '<div class="flex items-center gap-3 p-2.5 bg-gray-50 dark:bg-night-700 rounded-lg border border-gray-100 dark:border-night-700 mt-2 text-left">' +
        '<svg class="w-5 h-5 text-brand-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' +
        '<div class="flex-1 min-w-0"><p class="text-xs font-medium text-gray-700 dark:text-gray-200 truncate">' + f.name + '</p><p class="text-[10px] text-gray-400 dark:text-gray-500">' + (f.size/1024).toFixed(1) + ' KB</p></div>' +
        '<svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>' +
      '</div>';
    }).join('');
  };

  // ════════════════════════════════════════════════════════
  // SLIDER / RANGE
  // ════════════════════════════════════════════════════════

  UI.slider = function(id, config) {
    config = config || {};
    var value = config.value != null ? config.value : 50;
    var min = config.min || 0;
    var max = config.max || 100;
    var step = config.step || 1;
    var label = config.label || '';
    var showValue = config.showValue !== false;
    var uid = id || _uid('sl');
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div class="flex items-center gap-3">' +
        '<input type="range" id="' + uid + '" value="' + value + '" min="' + min + '" max="' + max + '" step="' + step + '" class="flex-1 h-2 bg-gray-200 dark:bg-night-600 rounded-full appearance-none cursor-pointer accent-brand-600 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white" ' + (showValue ? 'oninput="document.getElementById(\'' + uid + '-val\').textContent=this.value"' : '') + '/>' +
        (showValue ? '<span id="' + uid + '-val" class="font-mono text-sm font-semibold text-gray-700 dark:text-gray-200 w-12 text-right">' + value + '</span>' : '') +
      '</div>';
  };

  // ════════════════════════════════════════════════════════
  // AVATAR GROUP
  // ════════════════════════════════════════════════════════

  UI.avatarGroup = function(names, max) {
    max = max || 4;
    var show = names.slice(0, max);
    var extra = names.length - max;
    return '<div class="flex -space-x-2">' + show.map(function(n) {
      return '<div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-night-800 bg-brand-600">' + n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2) + '</div>';
    }).join('') + (extra > 0 ? '<div class="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold bg-gray-100 text-gray-500 ring-2 ring-white dark:ring-night-800 dark:bg-night-700 dark:text-gray-300">+' + extra + '</div>' : '') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // BUTTON LOADING
  // ════════════════════════════════════════════════════════

  UI.buttonLoading = function(text, loadingText, type, id) {
    loadingText = loadingText || 'Procesando...';
    type = type || 'primary';
    var uid = id || _uid('bl');
    return '<button id="' + uid + '" onclick="UI._toggleBtnLoading(\'' + uid + '\',\'' + loadingText + '\')" class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 active:scale-[.97] ' + (type === 'primary' ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm' : 'border border-gray-100 dark:border-night-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-night-700') + '">' + text + '</button>';
  };

  UI._toggleBtnLoading = function(id, loadingText) {
    var btn = document.getElementById(id);
    if (!btn || btn.disabled) return;
    var origHtml = btn.innerHTML;
    btn.disabled = true;
    btn.style.opacity = '.7';
    btn.style.cursor = 'not-allowed';
    btn.innerHTML = '<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle class="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3"/><path class="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"/></svg>' + loadingText;
    setTimeout(function() { btn.innerHTML = origHtml; btn.disabled = false; btn.style.opacity = ''; btn.style.cursor = ''; }, 2000);
  };

  // ════════════════════════════════════════════════════════
  // CONFIRM DIALOG
  // ════════════════════════════════════════════════════════

  UI.confirmDialog = function(config) {
    config = config || {};
    var title = config.title || 'Confirmar';
    var message = config.message || '';
    var type = config.type || 'danger';
    var confirmText = config.confirmText || 'Confirmar';
    var cancelText = config.cancelText || 'Cancelar';
    var onConfirm = config.onConfirm || '';
    var onCancel = config.onCancel || '';
    var uid = _uid('cd');
    var icons = {
      danger: '<div class="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg></div>',
      warning: '<div class="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-3">' + _svg('warn','w-6 h-6 text-amber-500') + '</div>',
      info: '<div class="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-3">' + _svg('info','w-6 h-6 text-blue-500') + '</div>'
    };
    var btnColor = type === 'danger' ? 'bg-red-600 hover:bg-red-700' : type === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-brand-600 hover:bg-brand-700';
    var overlay = document.createElement('div');
    overlay.id = uid;
    overlay.className = 'fixed inset-0 z-[999] flex items-center justify-center p-4';
    overlay.innerHTML =
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._closeConfirm(\'' + uid + '\',false)"></div>' +
      '<div class="bg-white dark:bg-night-800 rounded-2xl shadow-2xl p-6 w-full max-w-sm relative z-10 text-center transform scale-95 opacity-0 transition-all duration-200" id="' + uid + '-box">' +
        (icons[type] || icons.info) +
        '<h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">' + title + '</h3>' +
        '<p class="text-sm text-gray-400 dark:text-gray-500 mb-6">' + message + '</p>' +
        '<div class="flex gap-3 justify-center">' +
          '<button onclick="UI._closeConfirm(\'' + uid + '\',false)" class="px-5 py-2.5 text-sm font-semibold rounded-lg border border-gray-100 dark:border-night-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-night-600 transition-colors">' + cancelText + '</button>' +
          '<button onclick="UI._closeConfirm(\'' + uid + '\',true)" class="px-5 py-2.5 text-sm font-semibold rounded-lg ' + btnColor + ' text-white transition-colors">' + confirmText + '</button>' +
        '</div>' +
      '</div>';
    overlay._onConfirm = onConfirm;
    overlay._onCancel = onCancel;
    document.body.appendChild(overlay);
    requestAnimationFrame(function() {
      var box = document.getElementById(uid + '-box');
      if (box) { box.style.transform = 'scale(1)'; box.style.opacity = '1'; }
    });
  };

  UI._closeConfirm = function(uid, confirmed) {
    var el = document.getElementById(uid);
    if (!el) return;
    var box = document.getElementById(uid + '-box');
    if (box) { box.style.transform = 'scale(0.95)'; box.style.opacity = '0'; }
    setTimeout(function() {
      if (confirmed && el._onConfirm) { if (typeof el._onConfirm === 'function') el._onConfirm(); else eval(el._onConfirm); }
      if (!confirmed && el._onCancel) { if (typeof el._onCancel === 'function') el._onCancel(); else eval(el._onCancel); }
      el.remove();
    }, 200);
  };

  // ════════════════════════════════════════════════════════
  // COMMAND PALETTE
  // ════════════════════════════════════════════════════════

  UI.commandPalette = function() {
    if (document.getElementById('cmd-palette')) { UI._toggleCmdPalette(); return; }
    var modules = [
      {group:'Modulos', items:[
        {label:'Dashboard', icon:'inbox', action:"App.navigate('dashboard')"},
        {label:'Inventario', icon:'inbox', action:"App.navigate('inventario')"},
        {label:'Compras', icon:'inbox', action:"App.navigate('compras')"},
        {label:'Ventas', icon:'inbox', action:"App.navigate('ventas')"},
        {label:'Produccion', icon:'inbox', action:"App.navigate('produccion')"},
        {label:'Costos', icon:'inbox', action:"App.navigate('costos')"},
        {label:'Finanzas', icon:'inbox', action:"App.navigate('finanzas')"},
        {label:'RRHH', icon:'inbox', action:"App.navigate('rrhh')"},
        {label:'Admin', icon:'inbox', action:"App.navigate('admin')"}
      ]},
      {group:'Acciones', items:[
        {label:'Modo oscuro', icon:'info', action:"App.toggleDark()"},
        {label:'Cerrar sesion', icon:'x', action:"App.logout()"}
      ]}
    ];
    var overlay = document.createElement('div');
    overlay.id = 'cmd-palette';
    overlay.className = 'fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] p-4';
    overlay.innerHTML =
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._toggleCmdPalette()"></div>' +
      '<div class="bg-white dark:bg-night-800 rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform scale-95 opacity-0 transition-all duration-200" id="cmd-palette-box">' +
        '<div class="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-night-700">' +
          _svg('search','w-5 h-5 text-gray-400 dark:text-gray-500') +
          '<input type="text" id="cmd-search" class="flex-1 bg-transparent text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 outline-none" placeholder="Buscar modulo o accion..." oninput="UI._filterCmdPalette(this.value)" autofocus/>' +
          '<span class="text-[10px] font-mono px-1.5 py-0.5 bg-gray-50 dark:bg-night-700 rounded-lg border border-gray-100 dark:border-night-700 text-gray-400 dark:text-gray-500">ESC</span>' +
        '</div>' +
        '<div id="cmd-results" class="max-h-72 overflow-y-auto py-2">' +
          modules.map(function(g) {
            return '<div class="cmd-group" data-group="' + g.group + '">' +
              '<div class="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + g.group + '</div>' +
              g.items.map(function(it) {
                return '<div class="cmd-item flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-brand-50 dark:hover:bg-night-600 transition-colors" data-label="' + it.label.toLowerCase() + '" onclick="' + it.action + ';UI._toggleCmdPalette()" tabindex="-1">' +
                  _svg(it.icon,'w-4 h-4 text-gray-400 dark:text-gray-500') +
                  '<span class="text-sm text-gray-700 dark:text-gray-200">' + it.label + '</span>' +
                '</div>';
              }).join('') +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function() {
      var box = document.getElementById('cmd-palette-box');
      if (box) { box.style.transform = 'scale(1)'; box.style.opacity = '1'; }
      var input = document.getElementById('cmd-search');
      if (input) input.focus();
    });
  };

  UI._toggleCmdPalette = function() {
    var el = document.getElementById('cmd-palette');
    if (!el) return;
    var box = document.getElementById('cmd-palette-box');
    if (box) { box.style.transform = 'scale(0.95)'; box.style.opacity = '0'; }
    setTimeout(function() { el.remove(); }, 200);
  };

  UI._filterCmdPalette = function(q) {
    var items = document.querySelectorAll('#cmd-results .cmd-item');
    var groups = document.querySelectorAll('#cmd-results .cmd-group');
    q = q.toLowerCase().trim();
    items.forEach(function(it) { it.style.display = !q || it.dataset.label.includes(q) ? '' : 'none'; });
    groups.forEach(function(g) {
      var visible = g.querySelectorAll('.cmd-item:not([style*="display: none"])');
      g.style.display = visible.length ? '' : 'none';
    });
  };

  UI._cmdPaletteIdx = -1;

  // ════════════════════════════════════════════════════════
  // BOTTOM SHEET
  // ════════════════════════════════════════════════════════

  UI.bottomSheet = function(title, content, opts) {
    opts = opts || {};
    var height = opts.height || '50';
    var uid = _uid('bs');
    var overlay = document.createElement('div');
    overlay.id = uid;
    overlay.className = 'fixed inset-0 z-[999]';
    overlay.innerHTML =
      '<div class="absolute inset-0 bg-black/40 backdrop-blur-sm" onclick="UI._closeBottomSheet(\'' + uid + '\')"></div>' +
      '<div id="' + uid + '-sheet" class="absolute bottom-0 left-0 right-0 bg-white dark:bg-night-800 rounded-t-[28px] shadow-2xl transform translate-y-full transition-transform duration-300 ease-out" style="max-height:' + height + 'vh">' +
        '<div class="flex justify-center pt-3 pb-1 cursor-grab" onmousedown="UI._bsDragStart(event,\'' + uid + '\')" ontouchstart="UI._bsDragStart(event,\'' + uid + '\')">' +
          '<div class="w-10 h-1.5 rounded-full bg-gray-300 dark:bg-night-600"></div>' +
        '</div>' +
        '<div class="px-5 pb-2 flex items-center justify-between">' +
          '<h3 class="text-lg font-bold text-gray-900 dark:text-white">' + title + '</h3>' +
          '<button onclick="UI._closeBottomSheet(\'' + uid + '\')" class="p-1 rounded-full hover:bg-gray-50 dark:hover:bg-night-600 transition-colors">' + _svg('x','w-5 h-5 text-gray-400') + '</button>' +
        '</div>' +
        '<div class="px-5 pb-6 overflow-y-auto" style="max-height:calc(' + height + 'vh - 80px)">' + content + '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(function() {
      var sheet = document.getElementById(uid + '-sheet');
      if (sheet) sheet.style.transform = 'translateY(0)';
    });
  };

  UI._closeBottomSheet = function(uid) {
    var sheet = document.getElementById(uid + '-sheet');
    if (sheet) sheet.style.transform = 'translateY(100%)';
    setTimeout(function() { var el = document.getElementById(uid); if (el) el.remove(); }, 300);
  };

  UI._bsDragStart = function(e, uid) {
    var sheet = document.getElementById(uid + '-sheet');
    if (!sheet) return;
    var startY = e.touches ? e.touches[0].clientY : e.clientY;
    var startH = sheet.getBoundingClientRect().height;
    var onMove = function(ev) {
      var y = ev.touches ? ev.touches[0].clientY : ev.clientY;
      var diff = y - startY;
      if (diff > 0) sheet.style.transform = 'translateY(' + diff + 'px)';
      else sheet.style.maxHeight = (startH - diff) + 'px';
    };
    var onEnd = function(ev) {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      var y = ev.changedTouches ? ev.changedTouches[0].clientY : ev.clientY;
      if (y - startY > 100) UI._closeBottomSheet(uid);
      else { sheet.style.transform = 'translateY(0)'; sheet.style.maxHeight = '90vh'; }
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  };

  // ════════════════════════════════════════════════════════
  // STEPPER
  // ════════════════════════════════════════════════════════

  UI.stepper = function(steps, currentStep) {
    steps = steps || [];
    currentStep = currentStep || 0;
    return '<div class="flex items-center w-full">' +
      steps.map(function(s, i) {
        var done = i < currentStep;
        var active = i === currentStep;
        var dotCls = done ? 'bg-green-500 text-white' : active ? 'bg-brand-600 text-white ring-4 ring-brand-100' : 'bg-gray-200 dark:bg-night-600 text-gray-400';
        var lineCls = done ? 'bg-green-500' : 'bg-gray-200 dark:bg-night-600';
        return (i > 0 ? '<div class="flex-1 h-0.5 ' + lineCls + ' mx-2"></div>' : '') +
          '<div class="flex flex-col items-center flex-shrink-0">' +
            '<div class="w-8 h-8 rounded-full ' + dotCls + ' flex items-center justify-center text-xs font-bold transition-all">' +
              (done ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' : (i+1)) +
            '</div>' +
            '<span class="text-xs font-medium mt-1.5 ' + (active ? 'text-brand-600' : done ? 'text-green-600' : 'text-gray-400 dark:text-gray-500') + '">' + s.label + '</span>' +
            (s.desc ? '<span class="text-[10px] text-gray-400 dark:text-gray-500">' + s.desc + '</span>' : '') +
          '</div>';
      }).join('') +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // POPOVER
  // ════════════════════════════════════════════════════════

  UI.popover = function(trigger, content, opts) {
    opts = opts || {};
    var position = opts.position || 'bottom';
    var width = opts.width || 'w-64';
    var uid = _uid('po');
    var posCls = position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2';
    return '<div class="relative inline-block" id="' + uid + '">' +
      '<div onclick="UI._togglePopover(\'' + uid + '\')" class="cursor-pointer">' + trigger + '</div>' +
      '<div id="' + uid + '-content" class="absolute ' + posCls + ' left-1/2 -translate-x-1/2 ' + width + ' bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 p-4" style="display:none">' +
        '<div class="absolute ' + (position==='top' ? 'bottom-[-6px]' : 'top-[-6px]') + ' left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-white dark:bg-night-800 border border-gray-100 dark:border-night-700 ' + (position==='top' ? 'border-t-0 border-l-0' : 'border-b-0 border-r-0') + '"></div>' +
        '<div class="relative z-10">' + content + '</div>' +
      '</div>' +
    '</div>';
  };

  UI._togglePopover = function(uid) {
    var el = document.getElementById(uid + '-content');
    if (!el) return;
    var visible = el.style.display !== 'none';
    el.style.display = visible ? 'none' : '';
    if (!visible) {
      var close = function(e) {
        if (!document.getElementById(uid) || document.getElementById(uid).contains(e.target)) return;
        el.style.display = 'none';
        document.removeEventListener('click', close);
      };
      setTimeout(function() { document.addEventListener('click', close); }, 0);
    }
  };

  // ════════════════════════════════════════════════════════
  // CONTEXT MENU
  // ════════════════════════════════════════════════════════

  UI.contextMenu = function(items) {
    items = items || [];
    var uid = _uid('ctx');
    window['_ctx_' + uid] = items;
    return 'oncontextmenu="event.preventDefault();UI._showContextMenu(event,\'' + uid + '\')"';
  };

  UI._showContextMenu = function(e, uid) {
    var old = document.getElementById('ctx-menu-active');
    if (old) old.remove();
    var items = window['_ctx_' + uid];
    if (!items) return;
    var menu = document.createElement('div');
    menu.id = 'ctx-menu-active';
    menu.className = 'fixed z-[1000] bg-white dark:bg-night-800 rounded-xl shadow-2xl border border-gray-100 dark:border-night-700 py-1.5 min-w-[180px]';
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.innerHTML = items.map(function(it) {
      if (it.divider) return '<div class="my-1.5 border-t border-gray-100 dark:border-night-700"></div>';
      return '<div class="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-brand-50 dark:hover:bg-night-600 transition-colors ' + (it.danger ? 'text-red-600' : 'text-gray-700 dark:text-gray-200') + '" onclick="' + (it.action || '') + ';document.getElementById(\'ctx-menu-active\').remove()">' +
        (it.icon ? _svg(it.icon, 'w-4 h-4 ' + (it.danger ? 'text-red-400' : 'text-gray-400 dark:text-gray-500')) : '<span class="w-4"></span>') +
        '<span>' + it.label + '</span>' +
      '</div>';
    }).join('');
    document.body.appendChild(menu);
    var close = function(ev) {
      if (ev.key === 'Escape' || ev.type === 'click') {
        var m = document.getElementById('ctx-menu-active');
        if (m && (ev.type !== 'click' || !m.contains(ev.target))) m.remove();
        document.removeEventListener('click', close);
        document.removeEventListener('keydown', close);
      }
    };
    setTimeout(function() { document.addEventListener('click', close); document.addEventListener('keydown', close); }, 0);
  };

  // ════════════════════════════════════════════════════════
  // HOVER CARD
  // ════════════════════════════════════════════════════════

  UI.hoverCard = function(trigger, content) {
    var uid = _uid('hc');
    return '<span class="relative inline-block" id="' + uid + '" onmouseenter="UI._showHoverCard(\'' + uid + '\')" onmouseleave="UI._hideHoverCard(\'' + uid + '\')">' +
      trigger +
      '<div id="' + uid + '-card" class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 bg-white dark:bg-night-800 rounded-xl shadow-lg border border-gray-100 dark:border-night-700 z-50 p-4 opacity-0 pointer-events-none transition-all duration-200 transform -translate-y-1" style="display:none">' +
        content +
      '</div>' +
    '</span>';
  };

  UI._hcTimers = {};
  UI._showHoverCard = function(uid) {
    clearTimeout(UI._hcTimers[uid]);
    UI._hcTimers[uid] = setTimeout(function() {
      var card = document.getElementById(uid + '-card');
      if (!card) return;
      card.style.display = '';
      requestAnimationFrame(function() { card.style.opacity = '1'; card.style.transform = 'translate(-50%,0)'; card.classList.remove('-translate-y-1'); card.classList.add('pointer-events-auto'); });
    }, 400);
  };

  UI._hideHoverCard = function(uid) {
    clearTimeout(UI._hcTimers[uid]);
    UI._hcTimers[uid] = setTimeout(function() {
      var card = document.getElementById(uid + '-card');
      if (!card) return;
      card.style.opacity = '0';
      card.classList.add('-translate-y-1');
      card.classList.remove('pointer-events-auto');
      setTimeout(function() { card.style.display = 'none'; }, 200);
    }, 200);
  };

  // ════════════════════════════════════════════════════════
  // COPY BUTTON
  // ════════════════════════════════════════════════════════

  UI.copyButton = function(text, label) {
    label = label || 'Copiar';
    var uid = _uid('cb');
    return '<button id="' + uid + '" onclick="UI._copyToClipboard(\'' + uid + '\',\`' + text.replace(/`/g,'\\`') + '\`)" class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-100 dark:border-night-700 bg-white dark:bg-night-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-600 transition-colors">' +
      '<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>' +
      '<span>' + label + '</span>' +
    '</button>';
  };

  UI._copyToClipboard = function(uid, text) {
    navigator.clipboard.writeText(text).then(function() {
      var btn = document.getElementById(uid);
      if (!btn) return;
      var orig = btn.querySelector('span').textContent;
      btn.querySelector('span').textContent = 'Copiado';
      btn.classList.add('text-green-600');
      setTimeout(function() { btn.querySelector('span').textContent = orig; btn.classList.remove('text-green-600'); }, 2000);
    });
  };

  // ════════════════════════════════════════════════════════
  // KBD (Keyboard Shortcut Badge)
  // ════════════════════════════════════════════════════════

  UI.kbd = function(shortcut) {
    var keys = shortcut.split('+').map(function(k) { return k.trim(); });
    return keys.map(function(k) {
      return '<kbd class="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-[10px] font-mono font-semibold bg-gray-50 dark:bg-night-700 border border-gray-100 dark:border-night-700 rounded-md text-gray-500 dark:text-gray-400 shadow-[0_1px_0_1px_rgba(0,0,0,0.05)]">' + k + '</kbd>';
    }).join('<span class="text-[10px] text-gray-400 dark:text-gray-500 mx-0.5">+</span>');
  };

  // ════════════════════════════════════════════════════════
  // SEPARATOR
  // ════════════════════════════════════════════════════════

  UI.separator = function(text) {
    if (!text) return '<div class="h-px bg-gray-100 dark:bg-night-700"></div>';
    return '<div class="flex items-center gap-3"><div class="flex-1 h-px bg-gray-100 dark:bg-night-700"></div><span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + text + '</span><div class="flex-1 h-px bg-gray-100 dark:bg-night-700"></div></div>';
  };

  // ════════════════════════════════════════════════════════
  // TAG INPUT
  // ════════════════════════════════════════════════════════

  UI.tagInput = function(id, config) {
    config = config || {};
    var value = config.value || [];
    var label = config.label || '';
    var placeholder = config.placeholder || 'Escribe y Enter...';
    var uid = id || _uid('ti');
    var initTags = value.map(function(v) {
      return '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium" data-tag="' + v + '">' + v + '<button type="button" onclick="UI._removeTag(\'' + uid + '\',this.parentElement)" class="ml-0.5 hover:text-red-500 transition-colors">' + _svg('x','w-3 h-3') + '</button></span>';
    }).join('');
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="flex flex-wrap gap-1.5 items-center border border-gray-100 dark:border-night-700 rounded-xl bg-white dark:bg-night-800 px-3 py-2 focus-within:ring-2 focus-within:ring-brand-500/30 transition-all">' +
        '<div class="ti-tags flex flex-wrap gap-1.5">' + initTags + '</div>' +
        '<input type="text" class="flex-1 min-w-[100px] bg-transparent border-0 text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400 focus:ring-0 outline-none" placeholder="' + placeholder + '" onkeydown="if(event.key===\'Enter\'){event.preventDefault();UI._addTag(\'' + uid + '\',this)}"/>' +
      '</div>';
  };

  UI._addTag = function(uid, input) {
    var val = input.value.trim();
    if (!val) return;
    var wrap = document.getElementById(uid);
    var tagsEl = wrap.querySelector('.ti-tags');
    var exists = Array.from(tagsEl.querySelectorAll('[data-tag]')).some(function(t) { return t.dataset.tag === val; });
    if (exists) { input.value = ''; return; }
    tagsEl.insertAdjacentHTML('beforeend', '<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-700 dark:text-brand-300 text-xs font-medium" data-tag="' + val + '">' + val + '<button type="button" onclick="UI._removeTag(\'' + uid + '\',this.parentElement)" class="ml-0.5 hover:text-red-500 transition-colors">' + _svg('x','w-3 h-3') + '</button></span>');
    input.value = '';
  };

  UI._removeTag = function(uid, el) { el.remove(); };

  // ════════════════════════════════════════════════════════
  // TIMELINE
  // ════════════════════════════════════════════════════════

  UI.timeline = function(items) {
    return '<div class="relative pl-8 space-y-6">' + items.map(function(it, i) {
      var c = _c(it.color || 'brand');
      var isLast = i === items.length - 1;
      return '<div class="relative">' +
        (!isLast ? '<div class="absolute left-[-25px] top-6 w-px h-full bg-gray-100 dark:bg-night-700"></div>' : '') +
        '<div class="absolute left-[-29px] top-1 w-3 h-3 rounded-full ' + c.solid + ' ring-4 ring-white dark:ring-night-800"></div>' +
        '<div class="pb-1">' +
          '<div class="flex items-center gap-2 mb-1">' +
            '<span class="text-sm font-semibold text-gray-800 dark:text-gray-100">' + it.title + '</span>' +
            (it.date ? '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + it.date + '</span>' : '') +
          '</div>' +
          (it.desc ? '<p class="text-sm text-gray-400 dark:text-gray-500">' + it.desc + '</p>' : '') +
        '</div>' +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // COMMENT
  // ════════════════════════════════════════════════════════

  UI.comment = function(config) {
    config = config || {};
    var author = config.author || '';
    var avatar = config.avatar || '';
    var date = config.date || '';
    var content = config.content || '';
    var actions = config.actions !== false;
    var initials = author.split(' ').map(function(w) { return w[0]; }).join('').toUpperCase().slice(0, 2);
    return '<div class="flex gap-3 p-4">' +
      '<div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 bg-brand-600">' + (avatar || initials) + '</div>' +
      '<div class="flex-1 min-w-0">' +
        '<div class="flex items-center gap-2 mb-1">' +
          '<span class="text-sm font-semibold text-gray-800 dark:text-gray-100">' + author + '</span>' +
          '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + date + '</span>' +
        '</div>' +
        '<p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">' + content + '</p>' +
        (actions ? '<div class="flex gap-3 mt-2"><button class="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">Responder</button><button class="text-xs font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 transition-colors">Editar</button></div>' : '') +
      '</div>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // STAT MINI
  // ════════════════════════════════════════════════════════

  UI.statMini = function(label, value, trend, trendDir) {
    var arrow = trendDir === 'up' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>' : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>';
    var trendColor = trendDir === 'up' ? 'text-green-500' : 'text-red-500';
    return '<div class="flex flex-col gap-0.5">' +
      '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + label + '</span>' +
      '<div class="flex items-baseline gap-2">' +
        '<span class="text-xl font-bold text-gray-900 dark:text-white">' + value + '</span>' +
        (trend ? '<span class="inline-flex items-center gap-0.5 text-xs font-semibold ' + trendColor + '"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + arrow + '</svg>' + trend + '</span>' : '') +
      '</div>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // CALENDAR
  // ════════════════════════════════════════════════════════

  UI.calendar = function(id, config) {
    config = config || {};
    var events = config.events || [];
    var uid = id || _uid('cal');
    return '<div id="' + uid + '" class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-sm p-5" data-events=\'' + JSON.stringify(events) + '\' data-month="' + new Date().getMonth() + '" data-year="' + new Date().getFullYear() + '">' +
      '<div class="flex items-center justify-between mb-4">' +
        '<button onclick="UI._calNav(\'' + uid + '\',-1)" class="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">' + _svg('chevLeft','w-5 h-5 text-gray-500') + '</button>' +
        '<span class="cal-title text-sm font-semibold text-gray-900 dark:text-white"></span>' +
        '<button onclick="UI._calNav(\'' + uid + '\',1)" class="p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">' + _svg('chevRight','w-5 h-5 text-gray-500') + '</button>' +
      '</div>' +
      '<div class="cal-grid"></div>' +
    '</div>';
  };

  UI._calNav = function(uid, dir) {
    var el = document.getElementById(uid);
    if (!el) return;
    var m = parseInt(el.dataset.month) + dir;
    var y = parseInt(el.dataset.year);
    if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
    el.dataset.month = m; el.dataset.year = y;
    UI._calRender(uid);
  };

  UI._calRender = function(uid) {
    var el = document.getElementById(uid);
    if (!el) return;
    var m = parseInt(el.dataset.month), y = parseInt(el.dataset.year);
    var events = JSON.parse(el.dataset.events || '[]');
    var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    el.querySelector('.cal-title').textContent = months[m] + ' ' + y;
    var first = new Date(y, m, 1).getDay();
    var days = new Date(y, m + 1, 0).getDate();
    var today = new Date();
    var html = '<div class="grid grid-cols-7 gap-px text-center">';
    ['Do','Lu','Ma','Mi','Ju','Vi','Sa'].forEach(function(d) { html += '<div class="text-[10px] font-semibold text-gray-400 dark:text-gray-500 pb-2">' + d + '</div>'; });
    for (var i = 0; i < first; i++) html += '<div></div>';
    for (var d = 1; d <= days; d++) {
      var dateStr = y + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      var dayEvents = events.filter(function(e) { return e.date === dateStr; });
      var isToday = d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
      html += '<div class="relative p-1.5 text-xs rounded-xl ' + (isToday ? 'bg-brand-600 text-white font-bold' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700') + ' cursor-pointer transition-colors">' + d;
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

  // Auto-init calendars
  setTimeout(function() {
    document.querySelectorAll('[id^="cal-"]').forEach(function(el) { UI._calRender(el.id); });
  }, 100);

  // ════════════════════════════════════════════════════════
  // KANBAN BOARD
  // ════════════════════════════════════════════════════════

  UI.kanbanBoard = function(columns) {
    return '<div class="flex gap-4 overflow-x-auto pb-4">' + columns.map(function(col) {
      var c = _c(col.color || 'gray');
      return '<div class="flex-shrink-0 w-72 bg-gray-50 dark:bg-night-700 rounded-2xl border border-gray-100 dark:border-night-700 flex flex-col max-h-[70vh]">' +
        '<div class="px-4 py-3 border-b border-gray-100 dark:border-night-700 flex items-center justify-between">' +
          '<div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full ' + c.solid + '"></span><span class="text-sm font-semibold text-gray-800 dark:text-gray-100">' + col.title + '</span></div>' +
          '<span class="text-xs font-mono font-semibold text-gray-400 dark:text-gray-500">' + (col.cards||[]).length + '</span>' +
        '</div>' +
        '<div class="flex-1 overflow-y-auto p-3 space-y-2">' + (col.cards||[]).map(function(card) {
          return '<div class="bg-white dark:bg-night-800 rounded-xl border border-gray-100 dark:border-night-700 p-3 hover:shadow-lg transition-shadow cursor-pointer">' +
            '<p class="text-sm font-medium text-gray-800 dark:text-gray-100">' + (card.title||'') + '</p>' +
            (card.desc ? '<p class="text-xs text-gray-400 dark:text-gray-500 mt-1">' + card.desc + '</p>' : '') +
            (card.tags ? '<div class="flex flex-wrap gap-1 mt-2">' + card.tags.map(function(t) { return '<span class="px-2 py-0.5 text-[10px] font-semibold rounded-full ' + _c(t.color||'gray').bg + ' ' + _c(t.color||'gray').text + '">' + t.label + '</span>'; }).join('') + '</div>' : '') +
          '</div>';
        }).join('') + '</div>' +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // SPARKLINE
  // ════════════════════════════════════════════════════════

  UI.sparkline = function(data, config) {
    config = config || {};
    var width = config.width || 100;
    var height = config.height || 30;
    var color = config.color || 'brand';
    if (!data || data.length < 2) return '<svg width="' + width + '" height="' + height + '"></svg>';
    var min = Math.min.apply(null, data), max = Math.max.apply(null, data);
    var range = max - min || 1;
    var points = data.map(function(v, i) {
      var x = (i / (data.length - 1)) * width;
      var y = height - ((v - min) / range) * (height - 4) - 2;
      return x + ',' + y;
    }).join(' ');
    var colorMap = { brand: '#6366f1', green: '#22c55e', red: '#ef4444', blue: '#3b82f6', orange: '#f97316' };
    var hex = colorMap[color] || colorMap.brand;
    return '<svg width="' + width + '" height="' + height + '" class="inline-block"><polyline points="' + points + '" fill="none" stroke="' + hex + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };

  // ════════════════════════════════════════════════════════
  // NOTIFICATION
  // ════════════════════════════════════════════════════════

  UI.notification = function(config) {
    config = config || {};
    var title = config.title || '';
    var message = config.message || '';
    var time = config.time || '';
    var read = config.read || false;
    var icon = config.icon || 'info';
    var onclick = config.onclick || '';
    var c = _c(icon === 'success' ? 'green' : icon === 'warning' ? 'yellow' : icon === 'error' ? 'red' : 'brand');
    var icoMap = { info: ICO.info, success: ICO.success, warning: ICO.warn, error: ICO.error };
    return '<div class="flex gap-3 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-night-700/30 transition-colors cursor-pointer ' + (!read ? 'bg-brand-50/30 dark:bg-brand-900/10' : '') + '" ' + (onclick ? 'onclick="' + onclick + '"' : '') + '>' +
      '<div class="w-9 h-9 rounded-lg ' + c.bg + ' flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 ' + c.icon + '" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + (icoMap[icon] || icoMap.info) + '</svg></div>' +
      '<div class="flex-1 min-w-0">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">' + title + '</span>' +
          (!read ? '<span class="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0"></span>' : '') +
        '</div>' +
        '<p class="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">' + message + '</p>' +
        (time ? '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mt-1 block">' + time + '</span>' : '') +
      '</div>' +
    '</div>';
  };

  // ════════════════════════════════════════════════════════
  // COLOR PICKER
  // ════════════════════════════════════════════════════════

  UI.colorPicker = function(id, config) {
    config = config || {};
    var uid = id || _uid('cp');
    var label = config.label || '';
    var value = config.value || '';
    var palette = ['#6366f1','#8b5cf6','#ec4899','#ef4444','#f97316','#eab308','#22c55e','#14b8a6','#3b82f6','#06b6d4','#64748b','#1e293b'];
    return (label ? '<label class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5 block">' + label + '</label>' : '') +
      '<div id="' + uid + '" class="flex flex-wrap gap-2" data-value="' + value + '">' +
      palette.map(function(hex) {
        var sel = value === hex;
        return '<button type="button" onclick="UI._pickColor(\'' + uid + '\',\'' + hex + '\')" class="w-8 h-8 rounded-xl border-2 transition-all hover:scale-110 ' + (sel ? 'border-gray-800 dark:border-white ring-2 ring-brand-500/30' : 'border-transparent') + '" style="background:' + hex + '">' +
          (sel ? '<svg class="w-4 h-4 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' : '') +
        '</button>';
      }).join('') + '</div>';
  };

  UI._pickColor = function(uid, hex) {
    var wrap = document.getElementById(uid);
    if (!wrap) return;
    wrap.dataset.value = hex;
    wrap.querySelectorAll('button').forEach(function(btn) {
      var canvas = document.createElement('canvas').getContext('2d');
      canvas.fillStyle = hex;
      var normalHex = canvas.fillStyle;
      canvas.fillStyle = btn.style.backgroundColor;
      var normalBg = canvas.fillStyle;
      var isSelected = normalHex === normalBg;
      btn.className = 'w-8 h-8 rounded-xl border-2 transition-all hover:scale-110 ' + (isSelected ? 'border-gray-800 dark:border-white ring-2 ring-brand-500/30' : 'border-transparent');
      btn.innerHTML = isSelected ? '<svg class="w-4 h-4 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.check + '</svg>' : '';
    });
  };

  // ════════════════════════════════════════════════════════
  // GANTT MINI
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
        '<span class="text-xs font-medium text-gray-700 dark:text-gray-200 w-28 truncate flex-shrink-0">' + (t.label||'') + '</span>' +
        '<div class="flex-1 h-6 bg-gray-100 dark:bg-night-700 rounded-lg relative overflow-hidden">' +
          '<div class="absolute h-full rounded-lg ' + c.bg + '" style="left:' + left + '%;width:' + width + '%">' +
            '<div class="h-full ' + c.solid + ' rounded-lg opacity-80" style="width:' + prog + '%"></div>' +
          '</div>' +
        '</div>' +
        '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 w-10 text-right flex-shrink-0">' + prog + '%</span>' +
      '</div>';
    }).join('') + '</div>';
  };

  // ════════════════════════════════════════════════════════
  // QR CODE
  // ════════════════════════════════════════════════════════

  UI.qrCode = function(text, size) {
    size = size || 120;
    var grid = 21, cell = Math.floor(size / grid), svgSize = cell * grid;
    var rects = '';
    function addFinder(ox, oy) {
      for (var y = 0; y < 7; y++) for (var x = 0; x < 7; x++) {
        if (y===0||y===6||x===0||x===6||(y>=2&&y<=4&&x>=2&&x<=4))
          rects += '<rect x="'+(ox+x)*cell+'" y="'+(oy+y)*cell+'" width="'+cell+'" height="'+cell+'"/>';
      }
    }
    addFinder(0,0); addFinder(grid-7,0); addFinder(0,grid-7);
    var hash = 0;
    for (var i = 0; i < (text||'').length; i++) hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
    var seed = Math.abs(hash) || 1;
    for (var y = 0; y < grid; y++) for (var x = 0; x < grid; x++) {
      if ((x<8&&y<8)||(x>=grid-8&&y<8)||(x<8&&y>=grid-8)) continue;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      if (seed % 3 === 0) rects += '<rect x="'+x*cell+'" y="'+y*cell+'" width="'+cell+'" height="'+cell+'"/>';
    }
    return '<div class="inline-block rounded-xl overflow-hidden bg-white p-2.5 border border-gray-100 dark:border-night-700 shadow-sm">' +
      '<svg width="'+svgSize+'" height="'+svgSize+'" viewBox="0 0 '+svgSize+' '+svgSize+'" fill="#1a1a1a">'+rects+'</svg>' +
      '<p class="text-center font-mono text-[8px] text-gray-400 mt-1.5">'+text+'</p></div>';
  };

  // ════════════════════════════════════════════════════════
  // SIGNATURE PAD
  // ════════════════════════════════════════════════════════

  UI.signaturePad = function(id) {
    var uid = id || _uid('sig');
    return '<div class="inline-block">' +
      '<canvas id="' + uid + '" width="400" height="150" class="border-2 border-dashed border-gray-300 dark:border-night-600 rounded-xl cursor-crosshair bg-white" onmousedown="UI._sigStart(\'' + uid + '\',event)" onmousemove="UI._sigMove(\'' + uid + '\',event)" onmouseup="UI._sigEnd(\'' + uid + '\')" onmouseleave="UI._sigEnd(\'' + uid + '\')"></canvas>' +
      '<div class="flex items-center justify-between mt-2">' +
        '<span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Firma aqui</span>' +
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
    ctx.strokeStyle = '#1e293b'; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
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
  // NOTIFICATION CENTER
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
      return '<div class="px-4 pt-3 pb-1"><span class="font-mono text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">' + label + '</span></div>' +
        items.map(function(n) { return UI.notification(n); }).join('<div class="mx-4 h-px bg-gray-100 dark:bg-night-700"></div>');
    }
    return '<div id="' + uid + '" class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700 shadow-2xl w-96 max-h-[480px] flex flex-col overflow-hidden">' +
      '<div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-night-700">' +
        '<div class="flex items-center gap-2">' +
          '<span class="text-sm font-semibold text-gray-900 dark:text-white">Notificaciones</span>' +
          (unread > 0 ? '<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-brand-500 text-white">' + unread + '</span>' : '') +
        '</div>' +
        (unread > 0 ? '<button onclick="UI._markAllRead(\'' + uid + '\')" class="text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors">Marcar todo leido</button>' : '') +
      '</div>' +
      '<div class="flex-1 overflow-y-auto">' +
        renderGroup('Hoy', today) +
        renderGroup('Ayer', yesterday) +
        renderGroup('Anteriores', earlier) +
        (!notifications || !notifications.length ? '<div class="p-8 text-center"><svg class="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">' + ICO.inbox + '</svg><p class="text-sm text-gray-400 dark:text-gray-500">Sin notificaciones</p></div>' : '') +
      '</div>' +
    '</div>';
  };

  UI._markAllRead = function(uid) {
    var wrap = document.getElementById(uid);
    if (!wrap) return;
    wrap.querySelectorAll('[class*="bg-brand-50"]').forEach(function(el) { el.classList.remove('bg-brand-50/30'); });
    wrap.querySelectorAll('[class*="bg-brand-900"]').forEach(function(el) { el.classList.remove('dark:bg-brand-900/10'); });
    wrap.querySelectorAll('.bg-brand-500.rounded-full').forEach(function(el) { if (el.classList.contains('w-2')) el.remove(); });
    var badge = wrap.querySelector('.bg-brand-500.text-white');
    if (badge && badge.tagName === 'SPAN') badge.remove();
    var btn = wrap.querySelector('button[onclick*="markAllRead"]');
    if (btn) btn.remove();
  };

  // ════════════════════════════════════════════════════════
  // GLOBAL EVENT HANDLERS
  // ════════════════════════════════════════════════════════

  // Dropdown click-outside handler
  document.addEventListener('click', function() {
    document.querySelectorAll('[id^="dd-"].open').forEach(function(el) {
      el.classList.remove('open');
      var m = el.querySelector('[id$="-m"]');
      if (m) m.style.display = 'none';
    });
  });

  // DataTable menus close on outside click
  document.addEventListener('click', function(e) {
    document.querySelectorAll('[id$="-colmenu"]').forEach(function(menu) {
      var wrapper = menu.closest('[id$="-colvis"]');
      if (wrapper && !wrapper.contains(e.target) && menu.style.display === 'block') {
        menu.style.display = 'none';
      }
    });
    document.querySelectorAll('[id*="-actions-"]').forEach(function(el) {
      if (!el.classList.contains('hidden') && !el.contains(e.target) && !e.target.closest('button[onclick*="actions"]')) {
        el.classList.add('hidden');
      }
    });
  });

  // Switch toggle change handler
  setTimeout(function() {
    document.addEventListener('change', function(e) {
      if (e.target.type === 'checkbox' && e.target.id) {
        var dot = document.getElementById(e.target.id + '-dot');
        if (!dot) return;
        var wrap = e.target.nextElementSibling;
        if (!wrap || !wrap.classList.contains('relative')) return;
        var isChecked = e.target.checked;
        var w = wrap.classList.contains('w-9') ? 'translate-x-4' : wrap.classList.contains('w-14') ? 'translate-x-7' : 'translate-x-5';
        var off = 'translate-x-0.5';
        dot.className = dot.className.replace(/translate-x-[\w.]+/g, '');
        dot.classList.add(isChecked ? w : off);
      }
    });
  }, 0);

  // Command palette Ctrl+K listener
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); UI.commandPalette(); return; }
    var palette = document.getElementById('cmd-palette');
    if (!palette) return;
    if (e.key === 'Escape') { UI._toggleCmdPalette(); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      var items = Array.from(palette.querySelectorAll('.cmd-item:not([style*="display: none"])'));
      if (!items.length) return;
      UI._cmdPaletteIdx += e.key === 'ArrowDown' ? 1 : -1;
      if (UI._cmdPaletteIdx < 0) UI._cmdPaletteIdx = items.length - 1;
      if (UI._cmdPaletteIdx >= items.length) UI._cmdPaletteIdx = 0;
      items.forEach(function(it) { it.classList.remove('bg-brand-50','dark:bg-night-600'); });
      items[UI._cmdPaletteIdx].classList.add('bg-brand-50','dark:bg-night-600');
      items[UI._cmdPaletteIdx].scrollIntoView({block:'nearest'});
    }
    if (e.key === 'Enter') {
      var items = Array.from(palette.querySelectorAll('.cmd-item:not([style*="display: none"])'));
      var sel = UI._cmdPaletteIdx >= 0 && items[UI._cmdPaletteIdx] ? items[UI._cmdPaletteIdx] : items[0];
      if (sel) sel.click();
    }
  });

  console.log('[UI Extended] Loaded — 50+ extended components for CITE MADERA ERP');
})();
