// ============================================================
// APP.JS - Core Application Logic for ERPEmprendedor CITE MADERA
// Kirrivan Design System — brand (purple), accent (teal), gold
// ============================================================

const App = {
  state: {
    currentModule: 'dashboard',
    darkMode: false,
    sidebarCollapsed: false,
    user: null,
    notifications: [],
    toastTimeout: null,
  },

  // ── ROLE-BASED ACCESS CONTROL ──────────────────────────────
  moduleAccess: {
    'Administrador': ['dashboard','inventario','compras','ventas','produccion','costos','finanzas','rrhh','admin'],
    'Gerente': ['dashboard','inventario','compras','ventas','produccion','costos','finanzas','rrhh'],
    'Vendedor': ['dashboard','ventas','inventario'],
    'Almacenero': ['dashboard','inventario','compras'],
    'Contador': ['dashboard','costos','finanzas','ventas'],
    'Operario': ['dashboard','produccion','inventario'],
  },

  getUserAllowedModules() {
    const rol = this.state.user ? this.state.user.rol : null;
    return this.moduleAccess[rol] || ['dashboard'];
  },

  modules: {
    dashboard: () => Dashboard.render(),
    inventario: () => Inventario.render(),
    compras: () => Compras.render(),
    ventas: () => Ventas.render(),
    produccion: () => Produccion.render(),
    costos: () => Costos.render(),
    finanzas: () => Finanzas.render(),
    rrhh: () => RRHH.render(),
    admin: () => Admin.render(),
  },

  moduleNames: {
    dashboard: 'Dashboard',
    inventario: 'Inventario',
    compras: 'Compras',
    ventas: 'Ventas',
    produccion: 'Producción',
    costos: 'Costos',
    finanzas: 'Finanzas',
    rrhh: 'RRHH',
    admin: 'Administración',
  },

  // ── INIT ──────────────────────────────────────────────────
  init() {
    // Initialize theme system first (applies CSS variables)
    ThemeManager.init();

    const savedDark = localStorage.getItem('erp_dark') === 'true';
    if (savedDark) {
      this.state.darkMode = true;
      document.documentElement.classList.add('dark');
    }

    const savedUser = sessionStorage.getItem('erp_user');
    if (savedUser) {
      this.state.user = JSON.parse(savedUser);
      this.showApp();
    } else {
      this.showLogin();
    }
  },

  // Login carousel moved to login.html

  // ── THEME PICKER ────────────────────────────────────────
  openThemePicker() {
    this.showModal(ThemeManager.renderPicker(), null, '');
  },

  // ── USER PROFILE DROPDOWN ──────────────────────────────
  toggleProfileMenu() {
    let menu = document.getElementById('profile-menu');
    if (menu) {
      menu.remove();
      return;
    }

    const user = this.state.user || {};
    const avatarSrc = localStorage.getItem('erp_avatar');
    const avatarHtml = avatarSrc
      ? `<img src="${avatarSrc}" class="w-16 h-16 rounded-full object-cover" alt="Avatar"/>`
      : `<div class="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center text-white text-xl font-bold">${(user.nombre || 'U').charAt(0)}</div>`;

    menu = document.createElement('div');
    menu.id = 'profile-menu';
    menu.className = 'absolute right-0 top-full mt-2 w-72 bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-night-700 z-50 overflow-hidden animate-fade-in';
    menu.innerHTML = `
      <div class="p-5 text-center border-b border-gray-100 dark:border-night-700">
        <div class="relative inline-block group">
          ${avatarHtml}
          <label class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            <input type="file" accept="image/*" class="hidden" onchange="App.uploadAvatar(event)"/>
          </label>
        </div>
        <p class="mt-3 text-sm font-semibold text-gray-900 dark:text-white">${user.nombre || 'Usuario'}</p>
        <p class="text-xs text-gray-400">${user.email || ''}</p>
        <p class="text-xs text-brand-600 dark:text-accent-300 mt-1">${user.rol || 'Usuario'}</p>
      </div>
      <div class="py-2">
        <button onclick="App.openProfileSettings()" class="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          Mi Perfil
        </button>
        <button onclick="App.openThemePicker(); App.toggleProfileMenu();" class="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>
          Personalizar Tema
        </button>
        <button onclick="App.toggleDark(); App.toggleProfileMenu();" class="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          Modo Oscuro
        </button>
      </div>
      <div class="border-t border-gray-100 dark:border-night-700 py-2">
        <button onclick="App.toggleProfileMenu(); App.logout();" class="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          Cerrar Sesion
        </button>
      </div>
    `;

    document.getElementById('profile-wrapper').appendChild(menu);
  },

  // ── AVATAR UPLOAD ──────────────────────────────────────
  uploadAvatar(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      this.showToast('Solo se permiten archivos de imagen', 'error');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      this.showToast('La imagen no debe superar 2MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      localStorage.setItem('erp_avatar', dataUrl);
      this.updateAvatarDisplay();
      this.showToast('Foto de perfil actualizada', 'success');
      // Refresh profile menu if open
      const menu = document.getElementById('profile-menu');
      if (menu) {
        this.toggleProfileMenu();
        this.toggleProfileMenu();
      }
    };
    reader.readAsDataURL(file);
  },

  updateAvatarDisplay() {
    const avatarSrc = localStorage.getItem('erp_avatar');
    const avatarEl = document.getElementById('user-avatar');
    if (avatarEl && avatarSrc) {
      avatarEl.innerHTML = `<img src="${avatarSrc}" class="w-full h-full rounded-full object-cover" alt=""/>`;
      avatarEl.classList.remove('bg-brand-600');
    } else if (avatarEl) {
      const user = this.state.user || {};
      avatarEl.textContent = (user.nombre || 'U').charAt(0);
      avatarEl.classList.add('bg-brand-600');
    }
  },

  // ── PROFILE SETTINGS MODAL ─────────────────────────────
  openProfileSettings() {
    this.toggleProfileMenu();
    const user = this.state.user || {};
    const avatarSrc = localStorage.getItem('erp_avatar');
    const avatarHtml = avatarSrc
      ? `<img src="${avatarSrc}" class="w-20 h-20 rounded-full object-cover" alt="Avatar"/>`
      : `<div class="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">${(user.nombre || 'U').charAt(0)}</div>`;

    const html = `
      <div class="-mx-6 -mt-6">
        <div class="px-6 py-5 border-b border-gray-100 dark:border-night-700">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Mi Perfil</h3>
          <p class="text-xs text-gray-400 mt-1">Gestiona tu informacion personal</p>
        </div>
        <div class="p-6">
          <div class="flex flex-col sm:flex-row items-center gap-5 mb-8">
            <div class="relative group">
              ${avatarHtml}
              <label class="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <input type="file" accept="image/*" class="hidden" onchange="App.uploadAvatar(event)"/>
              </label>
            </div>
            <div class="text-center sm:text-left">
              <p class="font-semibold text-gray-900 dark:text-white">${user.nombre || 'Usuario'}</p>
              <p class="text-sm text-gray-400">${user.email || ''}</p>
              <span class="inline-block mt-1 text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-300">${user.rol || 'Usuario'}</span>
            </div>
          </div>
          <div class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${UI.input('profile-name', 'text', 'Nombre completo', user.nombre || '', '', false)}
              ${UI.input('profile-email', 'email', 'Correo electronico', user.email || '', '', false)}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${UI.input('profile-role', 'text', 'Rol', user.rol || '', '', false)}
              ${UI.input('profile-id', 'text', 'ID de usuario', user.id || '', '', false)}
            </div>
          </div>
          <div class="mt-6 pt-5 border-t border-gray-100 dark:border-night-700">
            <h4 class="text-sm font-semibold text-gray-900 dark:text-white mb-4">Cambiar foto de perfil</h4>
            <div class="flex flex-col sm:flex-row items-start gap-3">
              <label class="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl bg-brand-600 hover:bg-brand-700 text-white cursor-pointer transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                Subir imagen
                <input type="file" accept="image/*" class="hidden" onchange="App.uploadAvatar(event)"/>
              </label>
              ${avatarSrc ? `<button onclick="App.removeAvatar()" class="px-4 py-2.5 text-sm font-medium rounded-xl border border-gray-200 dark:border-night-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">Eliminar foto</button>` : ''}
              <p class="text-xs text-gray-400 mt-1 sm:mt-2">JPG, PNG o GIF. Maximo 2MB.</p>
            </div>
          </div>
        </div>
      </div>
    `;
    this.showModal(html, null, '');
  },

  removeAvatar() {
    localStorage.removeItem('erp_avatar');
    this.updateAvatarDisplay();
    this.showToast('Foto de perfil eliminada', 'success');
    this.closeModal();
    this.openProfileSettings();
  },

  // ── LOGIN ─────────────────────────────────────────────────
  showLogin() {
    window.location.href = 'login.html';
  },

  tryLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errorEl = document.getElementById('login-error');
    const btnEl = document.getElementById('login-btn');

    btnEl.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Verificando...';
    btnEl.disabled = true;

    setTimeout(() => {
      if (email === 'admin@citemadera.pe' && password === 'admin123') {
        const user = {
          id: 'USR-001',
          nombre: 'Administrador',
          email: email,
          rol: 'Administrador',
          avatar: 'A',
        };
        this.state.user = user;
        sessionStorage.setItem('erp_user', JSON.stringify(user));
        errorEl.classList.add('hidden');
        this.showApp();
        this.showToast('Bienvenido al sistema ERP CITE MADERA', 'success');
      } else {
        errorEl.classList.remove('hidden');
        errorEl.textContent = 'Credenciales incorrectas. Use admin@citemadera.pe / admin123';
        btnEl.innerHTML = 'Ingresar';
        btnEl.disabled = false;
        const form = document.getElementById('login-form');
        form.classList.add('animate-shake');
        setTimeout(() => form.classList.remove('animate-shake'), 500);
      }
    }, 800);
  },

  logout() {
    this.showModal(
      '<div class="text-center py-4"><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Cerrar sesion?</h3><p class="text-gray-500 dark:text-gray-400">Se cerrara tu sesion actual.</p></div>',
      () => {
        sessionStorage.removeItem('erp_user');
        this.state.user = null;
        window.location.href = 'login.html';
      }
    );
  },

  showApp() {
    document.getElementById('app-shell').classList.remove('hidden');

    if (this.state.user) {
      const nameEl = document.getElementById('user-name');
      if (nameEl) nameEl.textContent = this.state.user.nombre;
      this.updateAvatarDisplay();
    }

    // Filter sidebar items based on role permissions
    const allowed = this.getUserAllowedModules();
    document.querySelectorAll('.sidebar-item[data-module]').forEach(el => {
      const mod = el.dataset.module;
      el.style.display = allowed.includes(mod) ? '' : 'none';
    });

    this.state.notifications = AppData.alertas.map((a, i) => ({
      id: i,
      ...a,
      leido: false,
    }));
    this.updateNotifBadge();
    this.navigate('dashboard');
  },

  // ── NAVIGATION ────────────────────────────────────────────
  navigate(module) {
    if (!this.modules[module]) return;

    // Role-based permission check
    const allowed = this.getUserAllowedModules();
    if (!allowed.includes(module)) {
      this.showToast('No tiene permisos para acceder a este módulo', 'error');
      return;
    }

    this.state.currentModule = module;

    // Close mobile sidebar on navigation
    this.closeSidebar();

    // Update sidebar active state
    document.querySelectorAll('.sidebar-item').forEach(el => {
      el.classList.remove('active', 'bg-brand-600', 'text-white');
      el.classList.add('text-night-300', 'hover:bg-night-700', 'hover:text-white');
    });

    const activeItem = document.querySelector(`[data-module="${module}"]`);
    if (activeItem) {
      activeItem.classList.add('active', 'bg-brand-600', 'text-white');
      activeItem.classList.remove('text-night-300', 'hover:bg-night-700', 'hover:text-white');
    }

    // Update bottom nav active state (mobile)
    document.querySelectorAll('.bnav-item').forEach(el => {
      const isActive = el.dataset.bnav === module;
      el.classList.toggle('text-brand-600', isActive);
      el.classList.toggle('dark:text-accent-300', isActive);
      el.classList.toggle('text-gray-400', !isActive);
      el.classList.toggle('dark:text-night-400', !isActive);
    });

    // Update breadcrumb
    const breadcrumb = document.getElementById('breadcrumb');
    if (breadcrumb) {
      breadcrumb.innerHTML = `
        <span class="text-gray-400 dark:text-night-400">ERP</span>
        <span class="mx-2 text-gray-300 dark:text-night-500">/</span>
        <span class="text-gray-700 dark:text-gray-200 font-medium">${this.moduleNames[module]}</span>
      `;
    }

    const content = document.getElementById('main-content');
    content.innerHTML = UI.skeleton();

    setTimeout(() => {
      try {
        this.modules[module]();
      } catch (e) {
        console.error('Module render error:', e);
        content.innerHTML = `<div class="p-8 text-center text-red-500"><p>Error al cargar módulo: ${e.message}</p></div>`;
      }
    }, 150);
  },

  // ── DARK MODE ─────────────────────────────────────────────
  toggleDark() {
    this.state.darkMode = !this.state.darkMode;
    if (this.state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('erp_dark', this.state.darkMode);

    const icon = document.getElementById('dark-icon');
    if (icon) {
      icon.innerHTML = this.state.darkMode
        ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>'
        : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>';
    }
  },

  // ── SIDEBAR (responsive: overlay on mobile, collapse on desktop) ──
  toggleSidebar() {
    const isMobile = window.innerWidth < 1024;
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (isMobile) {
      // Mobile: toggle slide-over
      const isOpen = sidebar.classList.contains('open');
      if (isOpen) {
        this.closeSidebar();
      } else {
        sidebar.classList.add('open');
        backdrop.classList.add('active');
      }
    } else {
      // Desktop: collapse/expand
      this.state.sidebarCollapsed = !this.state.sidebarCollapsed;
      const navLabels = document.querySelectorAll('.nav-label');
      const sidebarBrand = document.getElementById('sidebar-brand');

      const sectionLabels = document.querySelectorAll('.sidebar-section-label');
      const sidebarFooter = sidebar.querySelector('.px-3.pb-3');
      const logoFull = sidebar.querySelectorAll('.sidebar-logo-full');
      const logoMini = sidebar.querySelector('.sidebar-logo-mini');
      const sidebarItems = sidebar.querySelectorAll('.sidebar-item');

      if (this.state.sidebarCollapsed) {
        sidebar.classList.remove('lg:w-64');
        sidebar.classList.add('lg:w-16', 'sidebar-collapsed');
        logoFull.forEach(el => el.classList.add('lg:hidden'));
        if (logoMini) logoMini.classList.remove('hidden');
        navLabels.forEach(el => el.classList.add('lg:hidden'));
        sectionLabels.forEach(el => el.classList.add('lg:hidden'));
        if (sidebarBrand) { sidebarBrand.classList.add('lg:px-0', 'lg:justify-center'); sidebarBrand.classList.remove('lg:px-5'); }
        sidebarItems.forEach(el => el.classList.add('lg:justify-center', 'lg:px-0'));
        if (sidebarFooter) sidebarFooter.classList.add('lg:hidden');
      } else {
        sidebar.classList.add('lg:w-64');
        sidebar.classList.remove('lg:w-16', 'sidebar-collapsed');
        logoFull.forEach(el => el.classList.remove('lg:hidden'));
        if (logoMini) logoMini.classList.add('hidden');
        navLabels.forEach(el => el.classList.remove('lg:hidden'));
        sectionLabels.forEach(el => el.classList.remove('lg:hidden'));
        if (sidebarBrand) { sidebarBrand.classList.remove('lg:px-0', 'lg:justify-center'); sidebarBrand.classList.add('lg:px-5'); }
        sidebarItems.forEach(el => el.classList.remove('lg:justify-center', 'lg:px-0'));
        if (sidebarFooter) sidebarFooter.classList.remove('lg:hidden');
      }
    }
  },

  closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');
    if (sidebar) sidebar.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
  },

  // ── TOAST ─────────────────────────────────────────────────
  showToast(msg, type = 'success') {
    const colors = {
      success: 'bg-accent-400 text-night-900',
      error: 'bg-red-500',
      warning: 'bg-gold-400 text-night-900',
      info: 'bg-brand-500',
    };
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };

    const existing = document.getElementById('toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = `fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3 rounded-xl text-white shadow-2xl transform transition-all duration-300 translate-y-20 opacity-0 ${colors[type]}`;
    toast.innerHTML = `
      <span class="w-6 h-6 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold text-sm">${icons[type]}</span>
      <span class="text-sm font-medium">${msg}</span>
      <button onclick="this.parentElement.remove()" class="ml-2 opacity-70 hover:opacity-100 text-lg leading-none">&times;</button>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-20', 'opacity-0');
    });

    if (this.state.toastTimeout) clearTimeout(this.state.toastTimeout);
    this.state.toastTimeout = setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  },

  // ── MODAL ─────────────────────────────────────────────────
  showModal(html, onConfirm = null, title = '', wide = false) {
    const existing = document.getElementById('global-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'global-modal';
    modal.className = 'fixed inset-0 z-[999] flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" id="modal-backdrop"></div>
      <div class="relative bg-white dark:bg-night-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-night-700 ${wide ? 'w-full max-w-4xl' : 'w-full max-w-lg'} max-h-[90vh] overflow-y-auto transform transition-all duration-300 translate-y-4 scale-[.98] opacity-0" id="modal-content">
        ${title ? `<div class="px-6 py-4 border-b border-gray-100 dark:border-night-700 flex items-center justify-between"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">${title}</h3><button onclick="App.closeModal()" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-200 dark:hover:bg-night-700 transition-colors"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button></div>` : ''}
        <div class="p-6">${html}</div>
        ${onConfirm ? `
        <div class="px-6 py-4 border-t border-gray-100 dark:border-night-700 flex gap-3 justify-end">
          <button onclick="App.closeModal()" class="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-night-700 rounded-lg hover:bg-gray-200 dark:hover:bg-night-600 transition-colors">Cancelar</button>
          <button onclick="App._modalConfirm()" class="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 shadow-sm transition-all active:scale-[.98]">Confirmar</button>
        </div>` : ''}
      </div>
    `;
    document.body.appendChild(modal);

    this._onConfirm = onConfirm;

    requestAnimationFrame(() => {
      const content = document.getElementById('modal-content');
      if (content) {
        content.classList.remove('translate-y-4', 'scale-[.98]', 'opacity-0');
        content.classList.add('translate-y-0', 'scale-100', 'opacity-100');
      }
    });

    document.getElementById('modal-backdrop').onclick = () => this.closeModal();
  },

  _modalConfirm() {
    if (this._onConfirm) this._onConfirm();
    this.closeModal();
  },

  closeModal() {
    const modal = document.getElementById('global-modal');
    if (!modal) return;
    const content = document.getElementById('modal-content');
    if (content) {
      content.classList.add('translate-y-4', 'scale-[.98]', 'opacity-0');
    }
    setTimeout(() => modal.remove(), 200);
  },

  // ── NOTIFICATIONS ─────────────────────────────────────────
  updateNotifBadge() {
    const badge = document.getElementById('notif-badge');
    const unread = this.state.notifications.filter(n => !n.leido).length;
    if (badge) {
      badge.textContent = unread;
      badge.classList.toggle('hidden', unread === 0);
    }
  },

  showNotifications() {
    const notifColors = { danger: 'text-red-500', warning: 'text-gold-400', info: 'text-brand-400' };
    const html = `
      <div class="divide-y divide-gray-100 dark:divide-night-700 -mx-6 -mt-6">
        <div class="px-6 py-4 flex items-center justify-between bg-gray-50 dark:bg-night-700/50">
          <h3 class="font-semibold text-gray-900 dark:text-white">Notificaciones</h3>
          <button onclick="App.markAllRead()" class="text-xs text-accent-500 dark:text-accent-300 hover:underline">Marcar todas leídas</button>
        </div>
        ${this.state.notifications.map(n => `
          <div class="px-6 py-4 hover:bg-brand-50/50 dark:hover:bg-night-700/30 cursor-pointer ${n.leido ? 'opacity-50' : ''}">
            <p class="text-sm font-medium text-gray-800 dark:text-gray-200 ${notifColors[n.tipo] || ''}">${n.mensaje}</p>
            <p class="text-xs text-gray-400 mt-1">Módulo: ${n.modulo}</p>
          </div>
        `).join('')}
        ${this.state.notifications.length === 0 ? '<div class="px-6 py-8 text-center text-gray-400">Sin notificaciones</div>' : ''}
      </div>
    `;
    this.showModal(html, null, '');
    this.state.notifications.forEach(n => n.leido = true);
    this.updateNotifBadge();
  },

  markAllRead() {
    this.state.notifications.forEach(n => n.leido = true);
    this.updateNotifBadge();
    this.closeModal();
  },

  // ── GLOBAL SEARCH ─────────────────────────────────────────
  handleSearch(query) {
    if (!query || query.length < 2) {
      const dropdown = document.getElementById('search-dropdown');
      if (dropdown) dropdown.classList.add('hidden');
      return;
    }

    const q = query.toLowerCase();
    const results = [];

    AppData.materiales.filter(m => m.nombre.toLowerCase().includes(q) || m.codigo.toLowerCase().includes(q))
      .slice(0, 3).forEach(m => results.push({ type: 'Material', label: m.nombre, code: m.codigo, module: 'inventario' }));

    AppData.clientes.filter(c => c.nombre.toLowerCase().includes(q))
      .slice(0, 3).forEach(c => results.push({ type: 'Cliente', label: c.nombre, code: c.ruc, module: 'ventas' }));

    AppData.proveedores.filter(p => p.nombre.toLowerCase().includes(q))
      .slice(0, 2).forEach(p => results.push({ type: 'Proveedor', label: p.nombre, code: p.ruc, module: 'compras' }));

    AppData.cotizaciones.filter(c => c.id.toLowerCase().includes(q) || (c.cliente_id && c.cliente_id.toLowerCase().includes(q)))
      .slice(0, 2).forEach(c => results.push({ type: 'Cotización', label: 'Cotización ' + c.id, code: c.id + ' - ' + c.estado, module: 'ventas' }));

    AppData.ordenes_venta.filter(o => o.id.toLowerCase().includes(q) || (o.cliente_id && o.cliente_id.toLowerCase().includes(q)))
      .slice(0, 2).forEach(o => results.push({ type: 'Orden Venta', label: 'Orden de Venta ' + o.id, code: o.id + ' - ' + o.estado, module: 'ventas' }));

    AppData.facturas.filter(f => f.id.toLowerCase().includes(q) || (f.serie && (f.serie + '-' + f.numero).toLowerCase().includes(q)))
      .slice(0, 2).forEach(f => results.push({ type: 'Factura', label: 'Factura ' + f.id, code: f.id + ' - ' + f.estado, module: 'ventas' }));

    AppData.ordenes_produccion.filter(o => o.id.toLowerCase().includes(q) || (o.producto_id && o.producto_id.toLowerCase().includes(q)))
      .slice(0, 2).forEach(o => results.push({ type: 'Orden Producción', label: 'Orden de Producción ' + o.id, code: o.id + ' - ' + o.estado, module: 'produccion' }));

    const typeColors = {
      Material: 'bg-brand-100 text-brand-600',
      Cliente: 'bg-accent-100 text-accent-600',
      Proveedor: 'bg-orange-100 text-orange-700',
      'Cotización': 'bg-purple-100 text-purple-700',
      'Orden Venta': 'bg-green-100 text-green-700',
      Factura: 'bg-blue-100 text-blue-700',
      'Orden Producción': 'bg-amber-100 text-amber-700',
    };

    let dropdown = document.getElementById('search-dropdown');
    if (!dropdown) {
      dropdown = document.createElement('div');
      dropdown.id = 'search-dropdown';
      dropdown.className = 'absolute top-full left-0 right-0 mt-1 bg-white dark:bg-night-800 rounded-xl shadow-2xl border border-gray-100 dark:border-night-700 z-50 overflow-hidden';
      document.getElementById('search-wrapper').appendChild(dropdown);
    }

    if (results.length === 0) {
      dropdown.innerHTML = '<div class="px-4 py-3 text-sm text-gray-400">Sin resultados</div>';
    } else {
      dropdown.innerHTML = results.map(r => `
        <div class="px-4 py-3 hover:bg-brand-50/50 dark:hover:bg-night-700 cursor-pointer flex items-center gap-3" onclick="App.navigate('${r.module}'); document.getElementById('global-search').value=''; document.getElementById('search-dropdown').classList.add('hidden');">
          <span class="text-xs px-2 py-0.5 rounded-full ${typeColors[r.type] || 'bg-gray-100 text-gray-700'}">${r.type}</span>
          <div>
            <div class="text-sm font-medium text-gray-800 dark:text-gray-200">${r.label}</div>
            <div class="text-xs text-gray-400">${r.code}</div>
          </div>
        </div>
      `).join('');
    }

    dropdown.classList.remove('hidden');
  },

  // ── FORMATTERS ────────────────────────────────────────────
  formatCurrency(n) {
    if (n === null || n === undefined) return 'S/ 0.00';
    return 'S/ ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  },

  formatDate(d) {
    if (!d) return '-';
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  },

  formatDateShort(d) {
    if (!d) return '-';
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: 'short' });
  },

  formatNumber(n) {
    return Number(n).toLocaleString('es-PE');
  },

  // ── TABLE SEARCH ──────────────────────────────────────────
  tableSearch(inputId, tableId) {
    const input = document.getElementById(inputId);
    const table = document.getElementById(tableId);
    if (!input || !table) return;

    input.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      const rows = table.querySelectorAll('tbody tr');
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query) ? '' : 'none';
      });
    });
  },

  // ── CHARTS CLEANUP ────────────────────────────────────────
  destroyChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();
  },
};

// Close dropdowns on outside click
document.addEventListener('click', (e) => {
  const wrapper = document.getElementById('search-wrapper');
  const dropdown = document.getElementById('search-dropdown');
  if (dropdown && wrapper && !wrapper.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
  // Close profile menu on outside click
  const profileWrapper = document.getElementById('profile-wrapper');
  const profileMenu = document.getElementById('profile-menu');
  if (profileMenu && profileWrapper && !profileWrapper.contains(e.target)) {
    profileMenu.remove();
  }
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => App.init());
