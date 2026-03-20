// ============================================================
// THEMES.JS — Dynamic Color Theme System for ERPEmprendedor
// Stores color presets as space-separated RGB for CSS variables
// ============================================================

const ThemeManager = {

  current: 'terracota',

  // ── THEME DEFINITIONS ──────────────────────────────────────
  // Each color is "R G B" string for use with rgb(var(--x) / <alpha>)
  themes: {

    purpura: {
      name: 'Púrpura',
      desc: 'Elegante y profesional',
      preview: ['#272666', '#7ed7cc'],
      brand: {
        50:'240 238 248', 100:'221 216 240', 200:'197 189 230',
        300:'146 137 198', 400:'113 104 176', 500:'61 58 138',
        600:'39 38 102',   700:'30 29 82',    800:'22 20 64',
        900:'15 14 46',
      },
      accent: {
        50:'230 249 246', 100:'204 243 237', 200:'153 231 219',
        300:'126 215 204', 400:'94 196 184',  500:'62 168 156',
        600:'46 138 128',  700:'31 107 99',
      },
      night: {
        50:'232 231 240',  100:'197 195 219', 200:'159 156 196',
        300:'107 102 160', 400:'74 69 128',   500:'48 44 107',
        600:'39 36 102',   700:'30 27 82',    800:'21 19 63',
        900:'12 11 46',    950:'7 6 31',
      },
    },

    oceano: {
      name: 'Océano',
      desc: 'Profesional y confiable',
      preview: ['#1e40af', '#22d3ee'],
      brand: {
        50:'239 246 255', 100:'219 234 254', 200:'191 219 254',
        300:'147 197 253', 400:'96 165 250',  500:'59 130 246',
        600:'30 64 175',   700:'29 58 140',   800:'23 47 115',
        900:'17 34 85',
      },
      accent: {
        50:'236 254 255', 100:'207 250 254', 200:'165 243 252',
        300:'34 211 238',  400:'6 182 212',   500:'8 145 178',
        600:'14 116 144',  700:'21 94 117',
      },
      night: {
        50:'236 240 250',  100:'213 221 240', 200:'176 191 224',
        300:'127 150 196', 400:'85 113 168',  500:'53 82 140',
        600:'37 66 120',   700:'28 50 98',    800:'22 39 78',
        900:'15 28 58',    950:'9 18 40',
      },
    },

    esmeralda: {
      name: 'Esmeralda',
      desc: 'Natural y equilibrado',
      preview: ['#166534', '#a3e635'],
      brand: {
        50:'236 253 245', 100:'209 250 229', 200:'167 243 208',
        300:'110 231 183', 400:'52 211 153',  500:'16 185 129',
        600:'22 101 52',   700:'21 87 46',    800:'17 70 38',
        900:'12 52 29',
      },
      accent: {
        50:'247 254 231', 100:'236 252 203', 200:'217 249 157',
        300:'163 230 53',  400:'132 204 22',  500:'101 163 13',
        600:'77 124 15',   700:'63 98 18',
      },
      night: {
        50:'234 246 240',  100:'208 234 220', 200:'164 214 188',
        300:'109 184 150', 400:'66 150 112',  500:'34 120 80',
        600:'22 101 66',   700:'16 80 52',    800:'12 62 40',
        900:'8 46 30',     950:'4 30 18',
      },
    },

    coral: {
      name: 'Coral',
      desc: 'Cálido y energético',
      preview: ['#9f1239', '#fbbf24'],
      brand: {
        50:'255 241 242', 100:'255 228 230', 200:'254 205 211',
        300:'253 164 175', 400:'251 113 133', 500:'244 63 94',
        600:'159 18 57',   700:'136 19 55',   800:'110 18 48',
        900:'80 15 38',
      },
      accent: {
        50:'255 251 235', 100:'254 243 199', 200:'253 230 138',
        300:'251 191 36',  400:'245 158 11',  500:'217 119 6',
        600:'180 83 9',    700:'146 64 14',
      },
      night: {
        50:'248 237 240',  100:'238 218 224', 200:'220 189 200',
        300:'192 150 168', 400:'160 112 135',  500:'130 78 105',
        600:'112 58 86',   700:'90 40 66',    800:'70 28 50',
        900:'52 19 36',    950:'35 11 24',
      },
    },

    grafito: {
      name: 'Grafito',
      desc: 'Minimalista y moderno',
      preview: ['#334155', '#38bdf8'],
      brand: {
        50:'248 250 252', 100:'241 245 249', 200:'226 232 240',
        300:'203 213 225', 400:'148 163 184', 500:'100 116 139',
        600:'51 65 85',    700:'45 55 72',    800:'30 41 59',
        900:'15 23 42',
      },
      accent: {
        50:'240 249 255', 100:'224 242 254', 200:'186 230 253',
        300:'56 189 248',  400:'14 165 233',  500:'2 132 199',
        600:'3 105 161',   700:'7 89 133',
      },
      night: {
        50:'241 243 248',  100:'225 229 238', 200:'199 208 222',
        300:'162 175 196', 400:'119 136 162', 500:'81 101 132',
        600:'63 80 110',   700:'49 63 88',    800:'38 49 70',
        900:'28 36 52',    950:'18 24 38',
      },
    },

    terracota: {
      name: 'Terracota',
      desc: 'Cálido y natural',
      preview: ['#A84117', '#2D8B75'],
      brand: {
        50:'254 243 237', 100:'253 228 213', 200:'250 198 172',
        300:'245 160 120', 400:'220 110 55',  500:'190 78 30',
        600:'168 65 23',   700:'138 52 17',   800:'110 42 14',
        900:'80 30 10',
      },
      accent: {
        50:'235 249 245', 100:'210 242 232', 200:'170 228 210',
        300:'110 200 175', 400:'70 175 150',  500:'45 139 117',
        600:'35 112 95',   700:'28 88 75',
      },
      night: {
        50:'245 240 237',  100:'232 222 215', 200:'210 195 182',
        300:'178 158 142', 400:'145 122 105', 500:'115 92 75',
        600:'95 72 55',    700:'75 55 40',    800:'55 40 28',
        900:'38 28 18',    950:'25 18 12',
      },
    },

    ambar: {
      name: 'Ámbar',
      desc: 'Cálido y terroso',
      preview: ['#92400e', '#2dd4bf'],
      brand: {
        50:'255 251 235', 100:'254 243 199', 200:'253 230 138',
        300:'252 211 77',  400:'251 191 36',  500:'200 140 14',
        600:'146 64 14',   700:'120 53 15',   800:'97 44 17',
        900:'72 34 14',
      },
      accent: {
        50:'240 253 250', 100:'204 251 241', 200:'153 246 228',
        300:'45 212 191',  400:'20 184 166',  500:'13 148 136',
        600:'15 118 110',  700:'17 94 89',
      },
      night: {
        50:'248 244 237',  100:'238 228 210', 200:'220 204 176',
        300:'192 170 132', 400:'160 136 96',  500:'130 106 66',
        600:'112 86 48',   700:'90 68 35',    800:'70 52 25',
        900:'52 38 17',    950:'35 25 10',
      },
    },
  },

  // ── INIT ───────────────────────────────────────────────────
  init() {
    const saved = localStorage.getItem('erp_theme');
    this.apply(saved || 'terracota', false);
  },

  // ── APPLY THEME ────────────────────────────────────────────
  apply(themeId, save = true) {
    const theme = this.themes[themeId];
    if (!theme) return;

    this.current = themeId;
    const root = document.documentElement.style;

    // Set brand CSS variables
    Object.entries(theme.brand).forEach(([shade, rgb]) => {
      root.setProperty(`--brand-${shade}`, rgb);
    });

    // Set accent CSS variables
    Object.entries(theme.accent).forEach(([shade, rgb]) => {
      root.setProperty(`--accent-${shade}`, rgb);
    });

    // Set night CSS variables
    Object.entries(theme.night).forEach(([shade, rgb]) => {
      root.setProperty(`--night-${shade}`, rgb);
    });

    if (save) {
      localStorage.setItem('erp_theme', themeId);
    }

    // Update picker active state if panel is open
    document.querySelectorAll('.theme-option').forEach(el => {
      const isActive = el.dataset.theme === themeId;
      el.classList.toggle('ring-2', isActive);
      el.classList.toggle('ring-accent-400', isActive);
      const check = el.querySelector('.theme-check');
      if (check) check.classList.toggle('hidden', !isActive);
    });
  },

  // ── GET HEX COLOR (for Chart.js etc.) ─────────────────────
  hex(type, shade) {
    const theme = this.themes[this.current];
    const rgb = (theme[type] || {})[shade];
    if (!rgb) return '#A84117';
    const [r, g, b] = rgb.split(' ').map(Number);
    return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('');
  },

  rgba(type, shade, alpha) {
    const theme = this.themes[this.current];
    const rgb = (theme[type] || {})[shade];
    if (!rgb) return 'rgba(168,65,23,' + alpha + ')';
    return 'rgba(' + rgb.split(' ').join(',') + ',' + alpha + ')';
  },

  // ── RENDER THEME PICKER PANEL ──────────────────────────────
  renderPicker() {
    const themesHtml = Object.entries(this.themes).map(([id, t]) => `
      <button
        class="theme-option group relative flex items-center gap-4 w-full p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-md ${id === this.current
          ? 'border-accent-400 bg-accent-50 dark:bg-night-800 ring-2 ring-accent-400'
          : 'border-gray-100 dark:border-night-700 hover:border-gray-200 dark:hover:border-night-600 bg-white dark:bg-night-800'}"
        data-theme="${id}"
        onclick="ThemeManager.apply('${id}'); App.showToast('Tema ${t.name} aplicado', 'success');"
      >
        <div class="flex gap-1.5 flex-shrink-0">
          <div class="w-8 h-8 rounded-full shadow-inner" style="background:${t.preview[0]}"></div>
          <div class="w-8 h-8 rounded-full shadow-inner" style="background:${t.preview[1]}"></div>
        </div>
        <div class="text-left flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-800 dark:text-white">${t.name}</p>
          <p class="text-xs text-gray-400 dark:text-gray-500">${t.desc}</p>
        </div>
        <span class="theme-check ${id === this.current ? '' : 'hidden'} flex-shrink-0">
          <svg class="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>
        </span>
      </button>
    `).join('');

    return `
      <div class="-mx-6 -mt-6">
        <div class="px-6 py-4 border-b border-gray-100 dark:border-night-700 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-900/20 flex items-center justify-center">
            <svg class="w-5 h-5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white">Tema del Sistema</h3>
            <p class="text-xs text-gray-400">Personaliza los colores de la interfaz</p>
          </div>
        </div>
        <div class="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          ${themesHtml}
        </div>
        <div class="px-6 py-4 border-t border-gray-100 dark:border-night-700">
          <p class="text-xs text-gray-400 dark:text-gray-500 text-center">El tema se guarda automáticamente</p>
        </div>
      </div>
    `;
  },
};
