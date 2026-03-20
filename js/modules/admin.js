// ============================================================
// ADMIN.JS - Administration Module
// ============================================================

const Admin = {
  activeTab: 'usuarios',

  render() {
    const content = document.getElementById('main-content');

    content.innerHTML = `
      <div class="p-6 space-y-6">
        ${UI.sectionHeader('Administración', 'Gestión de usuarios, roles y configuración del sistema')}

        <!-- Tabs -->
        <div class="bg-white dark:bg-night-800 rounded-2xl shadow-sm border border-gray-100 dark:border-night-700">
          <div class="px-6 pt-5 pb-4 border-b border-gray-100 dark:border-night-700">
            ${UI.tabs(
              [
                { id: 'usuarios', label: 'Usuarios' },
                { id: 'roles', label: 'Roles y Permisos' },
                { id: 'config', label: 'Configuración' },
              ],
              this.activeTab,
              'Admin.switchTab'
            )}
          </div>
          <div id="admin-tab-content" class="p-6">
            ${this.renderTab(this.activeTab)}
          </div>
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    Admin.activeTab = tab;
    ['usuarios', 'roles', 'config'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) {
        btn.className = t === tab
          ? 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] bg-white dark:bg-night-700 text-brand-600 dark:text-brand-400 shadow-sm border border-brand-200 dark:border-night-600'
          : 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap min-w-[120px] text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 border border-transparent';
      }
    });
    const tc = document.getElementById('admin-tab-content');
    if (tc) tc.innerHTML = Admin.renderTab(tab);
  },

  renderTab(tab) {
    switch (tab) {
      case 'usuarios': return this.renderUsuarios();
      case 'roles': return this.renderRoles();
      case 'config': return this.renderConfig();
      default: return '';
    }
  },

  activeRoleFilter: 'Todos',

  _rolBadgeColor(rol) {
    return rol === 'Administrador' ? 'red' : rol === 'Gerente' ? 'purple' : rol === 'Vendedor' ? 'green' : rol === 'Contador' ? 'blue' : 'gray';
  },

  _timeAgo(dateStr) {
    if (!dateStr || dateStr === 'Nunca') return 'Nunca';
    const now = new Date();
    const d = new Date(dateStr.replace(' ', 'T'));
    if (isNaN(d.getTime())) return dateStr;
    const diffMs = now - d;
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return 'hace un momento';
    if (mins < 60) return 'hace ' + mins + ' min';
    const hours = Math.floor(mins / 60);
    if (hours < 24) return 'hace ' + hours + 'h';
    const days = Math.floor(hours / 24);
    if (days === 1) return 'hace 1 dia';
    if (days < 30) return 'hace ' + days + ' dias';
    return dateStr;
  },

  _getFilteredUsuarios() {
    if (this.activeRoleFilter === 'Todos') return AppData.usuarios;
    return AppData.usuarios.filter(u => u.rol === this.activeRoleFilter);
  },

  filterByRole(rol) {
    Admin.activeRoleFilter = rol;
    const tc = document.getElementById('admin-tab-content');
    if (tc) tc.innerHTML = Admin.renderUsuarios();
  },

  renderUsuarios() {
    const roles = ['Todos', 'Administrador', 'Gerente', 'Vendedor', 'Contador', 'Producción'];
    const filtered = this._getFilteredUsuarios();

    return `
      <div class="space-y-5">
        <!-- Header -->
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Usuarios</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Gestiona los usuarios y niveles de acceso</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="App.showToast('Exportando usuarios...','info')" class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-night-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-night-800 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">
              <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${svgIcons.download}</span>
              Exportar
            </button>
            <button onclick="Admin.showNuevoUsuario()" class="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors">
              <span class="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">${svgIcons.plus}</span>
              Nuevo Usuario
            </button>
          </div>
        </div>

        <!-- Role Filter Pills -->
        <div class="inline-flex bg-gray-100 dark:bg-night-800 rounded-lg p-0.5 gap-0.5">
          ${roles.map(r => {
            const isActive = r === this.activeRoleFilter;
            const cls = isActive
              ? 'px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-night-700 text-gray-900 dark:text-white shadow-sm'
              : 'px-3 py-1.5 text-xs font-medium rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer transition-colors';
            return '<button class="' + cls + '" onclick="Admin.filterByRole(\'' + r + '\')">' + r + '</button>';
          }).join('')}
        </div>

        <!-- Table -->
        <div class="overflow-x-auto rounded-xl border border-gray-100 dark:border-night-700">
          <table id="usr-table" class="w-full text-sm">
            <thead>
              <tr class="bg-gray-50/80 dark:bg-night-700/40 border-b border-gray-100 dark:border-night-700">
                <th class="w-10 px-4 py-3 text-left">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-night-600 text-brand-600 focus:ring-brand-500 cursor-pointer" disabled />
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Usuario</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Rol</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Estado</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ultimo acceso</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-night-700/50 bg-white dark:bg-night-800">
              ${filtered.map(u => `
                <tr class="hover:bg-gray-50/60 dark:hover:bg-night-700/20 transition-colors group">
                  <td class="px-4 py-3">
                    <input type="checkbox" class="w-4 h-4 rounded border-gray-300 dark:border-night-600 text-brand-600 focus:ring-brand-500 cursor-pointer" />
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center text-sm font-semibold flex-shrink-0">
                        ${u.nombre.charAt(0).toUpperCase()}
                      </div>
                      <div class="min-w-0">
                        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">${u.nombre}</p>
                        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">${u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    ${UI.badge(u.rol, Admin._rolBadgeColor(u.rol))}
                  </td>
                  <td class="px-4 py-3">
                    <span class="inline-flex items-center gap-1.5 text-xs font-medium ${u.estado === 'Activo' ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}">
                      <span class="w-1.5 h-1.5 rounded-full ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-400'}"></span>
                      ${u.estado}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">${Admin._timeAgo(u.ultimo_acceso)}</td>
                  <td class="px-4 py-3 text-right">
                    <button onclick="Admin.openDrawer('${u.id}')" class="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors opacity-0 group-hover:opacity-100">
                      Editar
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <p class="text-xs text-gray-400 dark:text-gray-500">${filtered.length} usuario${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}</p>
      </div>
    `;
  },

  renderRoles() {
    const modulos = ['dashboard', 'inventario', 'compras', 'ventas', 'produccion', 'costos', 'finanzas', 'rrhh', 'admin'];
    const moduloLabels = {
      dashboard: 'Dashboard', inventario: 'Inventario', compras: 'Compras', ventas: 'Ventas',
      produccion: 'Producción', costos: 'Costos', finanzas: 'Finanzas', rrhh: 'RRHH', admin: 'Administración',
    };

    return `
      <div class="space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">Matriz de permisos por rol y módulo</p>
          ${UI.button('+ Nuevo Rol', 'secondary', "App.showToast('Funcionalidad en desarrollo','info')")}
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-100 dark:border-night-700">
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase w-28 sm:w-40">Módulo</th>
                ${AppData.roles.map(r => `
                  <th class="px-4 py-3 text-center text-xs font-semibold uppercase">
                    <div class="flex flex-col items-center gap-1">
                      ${UI.badge(r.nombre, r.nombre === 'Administrador' ? 'red' : r.nombre === 'Gerente' ? 'purple' : r.nombre === 'Vendedor' ? 'green' : r.nombre === 'Contador' ? 'blue' : 'gray')}
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-night-700/50">
              ${modulos.map(mod => `
                <tr class="hover:bg-gray-50 dark:hover:bg-night-700/20 transition-colors">
                  <td class="px-4 py-3 font-medium text-gray-700 dark:text-gray-300">${moduloLabels[mod]}</td>
                  ${AppData.roles.map(r => `
                    <td class="px-4 py-3 text-center">
                      ${r.permisos[mod]
                        ? `<span class="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto"><svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg></span>`
                        : `<span class="w-6 h-6 bg-gray-100 dark:bg-night-700 rounded-full flex items-center justify-center mx-auto"><svg class="w-3 h-3 text-gray-300 dark:text-night-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></span>`
                      }
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Role Descriptions -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6">
          ${AppData.roles.map(r => `
            <div class="p-4 bg-gray-50 dark:bg-night-700/30 rounded-xl border border-gray-100 dark:border-night-700">
              <div class="flex items-center justify-between mb-2">
                ${UI.badge(r.nombre, r.nombre === 'Administrador' ? 'red' : r.nombre === 'Gerente' ? 'purple' : r.nombre === 'Vendedor' ? 'green' : r.nombre === 'Contador' ? 'blue' : 'gray')}
                <span class="text-xs text-gray-400">${r.id}</span>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">${r.descripcion}</p>
              <p class="text-xs text-gray-400 mt-2">${Object.values(r.permisos).filter(Boolean).length}/9 módulos</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderConfig() {
    const conf = AppData.config_empresa;
    return `
      <div class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Company Info -->
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-800 dark:text-white">Datos de la Empresa</h3>
            <div class="space-y-3">
              ${UI.input('cfg-nombre', 'text', 'Nombre Empresa', conf.nombre, '')}
              ${UI.input('cfg-razon', 'text', 'Razón Social', conf.razon_social, '')}
              ${UI.input('cfg-ruc', 'text', 'RUC', conf.ruc, '')}
              ${UI.input('cfg-dir', 'text', 'Dirección', conf.direccion, '')}
              ${UI.input('cfg-tel', 'text', 'Teléfono', conf.telefono, '')}
              ${UI.input('cfg-email', 'email', 'Email', conf.email, '')}
              ${UI.input('cfg-web', 'text', 'Sitio Web', conf.web, '')}
            </div>
          </div>

          <!-- System Config -->
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-800 dark:text-white">Configuración del Sistema</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Moneda</label>
                <select id="cfg-moneda" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400">
                  <option value="PEN" ${conf.moneda === 'PEN' ? 'selected' : ''}>PEN — Sol Peruano (S/)</option>
                  <option value="USD" ${conf.moneda === 'USD' ? 'selected' : ''}>USD — Dólar Americano ($)</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">IGV (%)</label>
                <input type="number" id="cfg-igv" value="${conf.igv}" min="0" max="100" class="w-full px-3 py-2 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400"/>
              </div>

              <!-- System Status -->
              <div class="mt-6 space-y-3">
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Estado del Sistema</h4>
                ${[
                  { label: 'Base de datos', status: 'Operativo', color: 'green' },
                  { label: 'Módulo de Facturación', status: 'Operativo', color: 'green' },
                  { label: 'Integración SUNAT', status: 'Pendiente', color: 'yellow' },
                  { label: 'Backup automático', status: 'Operativo', color: 'green' },
                  { label: 'Actualización del sistema', status: 'v2.1.0', color: 'blue' },
                ].map(s => `
                  <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-night-700/50 rounded-xl">
                    <span class="text-sm text-gray-700 dark:text-gray-300">${s.label}</span>
                    ${UI.badge(s.status, s.color)}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-3 pt-4 border-t border-gray-100 dark:border-night-700">
          ${UI.button('Guardar Configuración', 'primary', 'Admin.guardarConfig()')}
          ${UI.button('Restaurar Valores', 'secondary', "App.showToast('Configuración restaurada','info')")}
          ${UI.button('Exportar Datos', 'outline', "App.showToast('Exportando datos del sistema...','info')")}
          ${UI.button('Crear Respaldo', 'outline', "App.showToast('Creando respaldo del sistema...','success')")}
        </div>

        <!-- Audit Log -->
        <div class="bg-white dark:bg-night-800 rounded-2xl border border-gray-100 dark:border-night-700">
          <div class="px-5 py-4 border-b border-gray-100 dark:border-night-700">
            <h3 class="font-semibold text-gray-800 dark:text-white">Log de Auditoría Reciente</h3>
          </div>
          <div class="p-5 space-y-2">
            ${(AppData.auditoria || []).map(log => `
              <div class="flex items-start gap-3 py-2 border-b border-gray-50 dark:border-night-700/50 last:border-0">
                <div class="w-2 h-2 bg-brand-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <div class="flex-1">
                  <div class="flex items-center gap-2 flex-wrap">
                    <span class="text-xs font-mono text-gray-400">${log.tiempo}</span>
                    <span class="text-xs font-semibold text-brand-600 dark:text-brand-400">${log.usuario}</span>
                    ${UI.badge(log.modulo, 'gray')}
                  </div>
                  <p class="text-sm text-gray-700 dark:text-gray-300 mt-0.5">${log.accion}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  searchUsuarios(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('#usr-table tbody tr');
    rows.forEach(r => { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  },

  guardarConfig() {
    const conf = AppData.config_empresa;
    const nombreEl = document.getElementById('cfg-nombre');
    if (nombreEl) conf.nombre = nombreEl.value;
    const razonEl = document.getElementById('cfg-razon');
    if (razonEl) conf.razon_social = razonEl.value;
    const igvEl = document.getElementById('cfg-igv');
    if (igvEl) conf.igv = parseFloat(igvEl.value) || 18;
    App.showToast('Configuración guardada correctamente', 'success');
  },

  showNuevoUsuario() {
    // Remove any existing drawer
    Admin.closeDrawer();

    const backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0';
    backdrop.onclick = function() { Admin.closeDrawer(); };

    const panel = document.createElement('div');
    panel.id = 'drawer-panel';
    panel.className = 'fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-night-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col';
    panel.innerHTML = `
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-night-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Nuevo usuario</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Crear una nueva cuenta de acceso</p>
        </div>
        <button onclick="Admin.closeDrawer()" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-night-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <!-- Avatar placeholder -->
        <div class="flex flex-col items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-gray-100 dark:bg-night-700 text-gray-400 dark:text-gray-500 flex items-center justify-center">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <button onclick="App.showToast('Funcionalidad en desarrollo','info')" class="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Subir foto</button>
        </div>

        <!-- Form fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Nombre completo *</label>
            <input type="text" id="dw-nombre" value="" placeholder="Nombre del usuario" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email *</label>
            <input type="email" id="dw-email" value="" placeholder="usuario@citemadera.pe" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Rol *</label>
            <select id="dw-rol" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow">
              ${AppData.roles.map(function(r) { return '<option value="' + r.nombre + '">' + r.nombre + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Area</label>
            <select id="dw-area" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow">
              ${['Gerencia','Administración','Ventas','Producción','Contabilidad','Logística'].map(function(a) { return '<option>' + a + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Estado</label>
            <div class="flex items-center gap-3 mt-1">
              <button id="dw-toggle" onclick="Admin._toggleEstado()" class="relative w-11 h-6 rounded-full transition-colors duration-200 bg-green-500">
                <span id="dw-toggle-dot" class="absolute top-0.5 left-[22px] w-5 h-5 bg-white rounded-full shadow transition-all duration-200"></span>
              </button>
              <span id="dw-estado-label" class="text-sm font-medium text-green-700 dark:text-green-400">Activo</span>
              <input type="hidden" id="dw-estado" value="Activo" />
            </div>
          </div>
        </div>

        <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-xs text-yellow-700 dark:text-yellow-400">
          <span class="w-1.5 h-1.5 rounded-full bg-yellow-500 inline-block"></span> El usuario recibira un correo con las credenciales de acceso.
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-100 dark:border-night-700 flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-night-800">
        <button onclick="Admin.closeDrawer()" class="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-night-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-night-800 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">Cancelar</button>
        <button onclick="Admin.saveNewUser()" class="px-4 py-2.5 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors">Guardar</button>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    requestAnimationFrame(function() {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
    });
  },

  saveNewUser() {
    var nombre = document.getElementById('dw-nombre');
    if (!nombre || !nombre.value.trim()) {
      App.showToast('El nombre es requerido', 'error');
      return;
    }
    var nuevo = {
      id: 'USR-' + String(AppData.usuarios.length + 1).padStart(3, '0'),
      nombre: nombre.value.trim(),
      email: document.getElementById('dw-email').value,
      rol: document.getElementById('dw-rol').value,
      area: document.getElementById('dw-area').value,
      estado: document.getElementById('dw-estado').value,
      ultimo_acceso: 'Nunca',
    };
    AppData.usuarios.push(nuevo);
    Admin.closeDrawer();
    App.showToast('Usuario "' + nuevo.nombre + '" creado', 'success');
    Admin.render();
  },

  openDrawer(id) {
    const u = AppData.usuarios.find(x => x.id === id);
    if (!u) return;
    const initial = u.nombre.charAt(0).toUpperCase();

    // Remove any existing drawer
    Admin.closeDrawer();

    const backdrop = document.createElement('div');
    backdrop.id = 'drawer-backdrop';
    backdrop.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 opacity-0';
    backdrop.onclick = function() { Admin.closeDrawer(); };

    const panel = document.createElement('div');
    panel.id = 'drawer-panel';
    panel.className = 'fixed inset-y-0 right-0 w-full max-w-md bg-white dark:bg-night-800 shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col';
    panel.innerHTML = `
      <!-- Header -->
      <div class="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-night-700">
        <div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Editar usuario</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">${u.id}</p>
        </div>
        <button onclick="Admin.closeDrawer()" class="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-night-700 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        <!-- Avatar -->
        <div class="flex flex-col items-center gap-3">
          <div class="w-20 h-20 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 flex items-center justify-center text-2xl font-bold">${initial}</div>
          <button onclick="App.showToast('Funcionalidad en desarrollo','info')" class="text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">Subir foto</button>
        </div>

        <!-- Form fields -->
        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Nombre completo</label>
            <input type="text" id="dw-nombre" value="${u.nombre}" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Email</label>
            <input type="email" id="dw-email" value="${u.email}" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Rol</label>
            <select id="dw-rol" class="w-full px-3 py-2.5 text-sm bg-gray-50 dark:bg-night-700 border border-gray-200 dark:border-night-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-shadow">
              ${AppData.roles.map(function(r) { return '<option value="' + r.nombre + '"' + (r.nombre === u.rol ? ' selected' : '') + '>' + r.nombre + '</option>'; }).join('')}
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">Estado</label>
            <div class="flex items-center gap-3 mt-1">
              <button id="dw-toggle" onclick="Admin._toggleEstado()" class="relative w-11 h-6 rounded-full transition-colors duration-200 ${u.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-300 dark:bg-night-600'}">
                <span id="dw-toggle-dot" class="absolute top-0.5 ${u.estado === 'Activo' ? 'left-[22px]' : 'left-0.5'} w-5 h-5 bg-white rounded-full shadow transition-all duration-200"></span>
              </button>
              <span id="dw-estado-label" class="text-sm font-medium ${u.estado === 'Activo' ? 'text-green-700 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}">${u.estado}</span>
              <input type="hidden" id="dw-estado" value="${u.estado}" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-gray-100 dark:border-night-700 flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-night-800">
        <button onclick="Admin.closeDrawer()" class="px-4 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-night-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-night-800 hover:bg-gray-50 dark:hover:bg-night-700 transition-colors">Cancelar</button>
        <button onclick="Admin.saveDrawer('${u.id}')" class="px-4 py-2.5 text-sm font-medium rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors">Guardar</button>
      </div>
    `;

    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    // Animate in after a frame
    requestAnimationFrame(function() {
      backdrop.classList.remove('opacity-0');
      backdrop.classList.add('opacity-100');
      panel.classList.remove('translate-x-full');
      panel.classList.add('translate-x-0');
    });
  },

  _toggleEstado() {
    const hiddenInput = document.getElementById('dw-estado');
    const toggle = document.getElementById('dw-toggle');
    const dot = document.getElementById('dw-toggle-dot');
    const label = document.getElementById('dw-estado-label');
    if (!hiddenInput) return;
    const isActive = hiddenInput.value === 'Activo';
    const newState = isActive ? 'Inactivo' : 'Activo';
    hiddenInput.value = newState;
    if (newState === 'Activo') {
      toggle.className = toggle.className.replace('bg-gray-300 dark:bg-night-600', 'bg-green-500');
      if (!toggle.className.includes('bg-green-500')) toggle.className += ' bg-green-500';
      dot.style.left = '22px';
      label.textContent = 'Activo';
      label.className = 'text-sm font-medium text-green-700 dark:text-green-400';
    } else {
      toggle.className = toggle.className.replace('bg-green-500', 'bg-gray-300 dark:bg-night-600');
      dot.style.left = '2px';
      label.textContent = 'Inactivo';
      label.className = 'text-sm font-medium text-gray-500 dark:text-gray-400';
    }
  },

  closeDrawer() {
    const backdrop = document.getElementById('drawer-backdrop');
    const panel = document.getElementById('drawer-panel');
    if (panel) {
      panel.classList.remove('translate-x-0');
      panel.classList.add('translate-x-full');
    }
    if (backdrop) {
      backdrop.classList.remove('opacity-100');
      backdrop.classList.add('opacity-0');
    }
    setTimeout(function() {
      if (backdrop) backdrop.remove();
      if (panel) panel.remove();
    }, 300);
  },

  saveDrawer(id) {
    const u = AppData.usuarios.find(function(x) { return x.id === id; });
    if (!u) return;
    var nombre = document.getElementById('dw-nombre');
    var email = document.getElementById('dw-email');
    var rol = document.getElementById('dw-rol');
    var estado = document.getElementById('dw-estado');
    if (nombre) u.nombre = nombre.value;
    if (email) u.email = email.value;
    if (rol) u.rol = rol.value;
    if (estado) u.estado = estado.value;
    Admin.closeDrawer();
    App.showToast('Usuario actualizado', 'success');
    Admin.render();
  },

  editarUsuario(id) {
    Admin.openDrawer(id);
  },

  desactivarUsuario(id) {
    const u = AppData.usuarios.find(x => x.id === id);
    if (!u) return;
    App.showModal(
      `<div class="text-center py-4"><div class="w-12 h-12 mx-auto mb-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center"><svg class="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"/></svg></div><h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-2">Desactivar usuario?</h3><p class="text-gray-500">${u.nombre} perderá acceso al sistema</p></div>`,
      () => {
        u.estado = 'Inactivo';
        App.showToast(`Usuario ${u.nombre} desactivado`, 'warning');
        Admin.render();
      }
    );
  },
};
