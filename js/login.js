/* ============================================================
   LOGIN PAGE LOGIC — CITE MADERA ERP
   ============================================================ */
'use strict';

const BRAND = '#A84117';
const DOT_IDLE = '#C4A88C';
let idx = 0, timer = null, isTransitioning = false, isPaused = false;

/* ── Slide data ── */
const slides = [
  {
    title: 'Tu negocio MYPE bajo control',
    desc: 'Gestiona inventario, ventas, producción y finanzas desde un solo lugar.',
    card: '<div class="flex items-center gap-2 mb-2.5"><div class="flex gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="w-2 h-2 rounded-full bg-yellow-400"></span><span class="w-2 h-2 rounded-full bg-green-400"></span></div><span class="text-[9px] text-gray-500 ml-1">erp.citemadera.pe/dashboard</span></div><p class="text-[11px] font-bold text-gray-800 mb-2">Resumen del mes <span class="text-gray-500 font-normal">Mar 2026</span></p><div class="grid grid-cols-4 gap-1 mb-2.5"><div class="bg-gray-50 rounded p-1.5 text-center"><p class="text-xs font-bold text-gray-800">S/45K</p><p class="text-[7px] text-gray-500">Ventas</p><p class="text-[7px] text-green-500 font-bold">+12%</p></div><div class="bg-gray-50 rounded p-1.5 text-center"><p class="text-xs font-bold text-gray-800">87%</p><p class="text-[7px] text-gray-500">A tiempo</p><p class="text-[7px] text-green-500 font-bold">+8%</p></div><div class="bg-gray-50 rounded p-1.5 text-center"><p class="text-xs font-bold text-gray-800">5 OPs</p><p class="text-[7px] text-gray-500">Producción</p><p class="text-[7px] text-orange-500 font-bold">En proc.</p></div><div class="bg-gray-50 rounded p-1.5 text-center"><p class="text-xs font-bold text-gray-800">3</p><p class="text-[7px] text-gray-500">Stock bajo</p><p class="text-[7px] text-red-500 font-bold">Revisar</p></div></div><div class="flex items-end gap-1 h-10"><div class="flex-1 rounded" style="height:35%;background:#D4B896"></div><div class="flex-1 rounded" style="height:50%;background:#C9A97C"></div><div class="flex-1 rounded" style="height:60%;background:#BF9A68"></div><div class="flex-1 rounded" style="height:48%;background:#C9A97C"></div><div class="flex-1 rounded" style="height:75%;background:#A8793E"></div><div class="flex-1 rounded" style="height:100%;background:#8B5E2A"></div></div>',
    f0: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center"><svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Ventas</span></div><p class="text-lg font-bold text-gray-900">S/45,320</p><p class="text-[10px] text-gray-500">Marzo 2026</p><p class="text-[10px] text-green-500 font-semibold mt-0.5">+12% vs mes anterior</p>',
    f1: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Estado</span></div><p class="text-lg font-bold text-gray-900">En línea</p><p class="text-[10px] text-gray-500">9 módulos activos</p>',
    f2: '<div class="flex items-center gap-3"><div><p class="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Top ventas</p><p class="text-[11px] text-gray-700 mt-1">Sala completo <b class="text-gray-900">S/3,300</b></p><p class="text-[11px] text-gray-700">Melamina <b class="text-gray-900">S/3,800</b></p></div><div class="text-center"><p class="text-2xl font-bold text-gray-900">34%</p><p class="text-[9px] text-gray-500">Margen bruto</p></div></div>',
  },
  {
    title: 'Inventario inteligente',
    desc: 'Control de stock en tiempo real, alertas de reposición y kardex detallado.',
    card: '<div class="flex items-center gap-2 mb-2.5"><div class="flex gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="w-2 h-2 rounded-full bg-yellow-400"></span><span class="w-2 h-2 rounded-full bg-green-400"></span></div><span class="text-[9px] text-gray-500 ml-1">erp.citemadera.pe/inventario</span></div><p class="text-[11px] font-bold text-gray-800 mb-2">Stock de Materiales</p><div class="space-y-1 mb-2.5"><div class="flex items-center gap-1"><span class="text-[10px] text-gray-500 w-16 truncate">Tornillo 2"</span><div class="flex-1 bg-gray-100 rounded-full h-1.5"><div class="bg-green-400 h-1.5 rounded-full" style="width:85%"></div></div><span class="text-[10px] font-bold text-gray-700">850</span></div><div class="flex items-center gap-1"><span class="text-[10px] text-gray-500 w-16 truncate">MDF 18mm</span><div class="flex-1 bg-gray-100 rounded-full h-1.5"><div class="bg-yellow-400 h-1.5 rounded-full" style="width:35%"></div></div><span class="text-[10px] font-bold text-orange-500">12</span></div><div class="flex items-center gap-1"><span class="text-[10px] text-gray-500 w-16 truncate">Laca Brillante</span><div class="flex-1 bg-gray-100 rounded-full h-1.5"><div class="bg-red-400 h-1.5 rounded-full" style="width:15%"></div></div><span class="text-[10px] font-bold text-red-500">3</span></div><div class="flex items-center gap-1"><span class="text-[10px] text-gray-500 w-16 truncate">Bisagra 35mm</span><div class="flex-1 bg-gray-100 rounded-full h-1.5"><div class="bg-green-400 h-1.5 rounded-full" style="width:70%"></div></div><span class="text-[10px] font-bold text-gray-700">420</span></div></div><div class="grid grid-cols-3 gap-1"><div class="bg-green-50 rounded p-1 text-center"><p class="text-xs font-bold text-green-600">142</p><p class="text-[7px] text-gray-500">OK</p></div><div class="bg-yellow-50 rounded p-1 text-center"><p class="text-xs font-bold text-yellow-600">8</p><p class="text-[7px] text-gray-500">Bajo</p></div><div class="bg-red-50 rounded p-1 text-center"><p class="text-xs font-bold text-red-500">3</p><p class="text-[7px] text-gray-500">Agotado</p></div></div>',
    f0: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-yellow-50 flex items-center justify-center"><svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Stock</span></div><p class="text-lg font-bold text-gray-900">153 ítems</p><p class="text-[10px] text-gray-500">11 categorías</p>',
    f1: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center"><svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Alertas</span></div><p class="text-lg font-bold text-red-500">3 críticas</p><p class="text-[10px] text-gray-500">Requieren atención</p>',
    f2: '<div><p class="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Valorizado</p><p class="text-xl font-bold text-gray-900 mt-1">S/128,450</p><p class="text-[10px] text-gray-500">Stock total almacén</p></div>',
  },
  {
    title: 'Ventas y facturación',
    desc: 'Cotizaciones, órdenes y facturas con IGV 18% automático.',
    card: '<div class="flex items-center gap-2 mb-2.5"><div class="flex gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="w-2 h-2 rounded-full bg-yellow-400"></span><span class="w-2 h-2 rounded-full bg-green-400"></span></div><span class="text-[9px] text-gray-500 ml-1">erp.citemadera.pe/ventas</span></div><p class="text-[11px] font-bold text-gray-800 mb-2">Pipeline</p><div class="space-y-1.5 mb-2.5"><div class="flex gap-1.5"><span class="text-[8px] text-gray-400 w-10 pt-1">Cotiz.</span><div class="flex-1 bg-blue-50 border border-blue-200 rounded px-2 py-1"><p class="text-[9px] font-bold text-blue-700">COT-045</p><p class="text-[8px] text-blue-400">Cocina S/4,200</p></div></div><div class="flex gap-1.5"><span class="text-[8px] text-gray-400 w-10 pt-1">Orden</span><div class="flex-1 bg-purple-50 border border-purple-200 rounded px-2 py-1"><p class="text-[9px] font-bold text-purple-700">OV-032</p><p class="text-[8px] text-purple-400">Escritorio S/2,800</p></div></div><div class="flex gap-1.5"><span class="text-[8px] text-gray-400 w-10 pt-1">Factura</span><div class="flex-1 bg-green-50 border border-green-200 rounded px-2 py-1"><p class="text-[9px] font-bold text-green-700">FAC-028</p><p class="text-[8px] text-green-400">Sala conf. S/8,500</p></div></div></div><div class="grid grid-cols-3 gap-1"><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">12</p><p class="text-[7px] text-gray-500">Cotiz.</p></div><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">8</p><p class="text-[7px] text-gray-500">OVs</p></div><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">6</p><p class="text-[7px] text-gray-500">Fact.</p></div></div>',
    f0: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center"><svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Clientes</span></div><p class="text-lg font-bold text-gray-900">26 activos</p><p class="text-[10px] text-green-500 font-semibold">+3 este mes</p>',
    f1: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Conversión</span></div><p class="text-lg font-bold text-gray-900">68%</p><p class="text-[10px] text-green-500 font-semibold">+5% este mes</p>',
    f2: '<div><p class="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Por cobrar</p><p class="text-xl font-bold text-gray-900 mt-1">S/24,800</p><p class="text-[10px] text-gray-500">5 facturas pendientes</p></div>',
  },
  {
    title: 'Producción en tiempo real',
    desc: 'Kanban, Gantt y lista de materiales por cada orden.',
    card: '<div class="flex items-center gap-2 mb-2.5"><div class="flex gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="w-2 h-2 rounded-full bg-yellow-400"></span><span class="w-2 h-2 rounded-full bg-green-400"></span></div><span class="text-[9px] text-gray-500 ml-1">erp.citemadera.pe/produccion</span></div><p class="text-[11px] font-bold text-gray-800 mb-2">Kanban</p><div class="grid grid-cols-3 gap-1 mb-2.5"><div><p class="text-[7px] text-gray-500 mb-0.5">En proceso</p><div class="bg-blue-50 border border-blue-200 rounded p-1 mb-0.5"><p class="text-[8px] font-bold text-blue-700">OP-041</p><div class="mt-0.5 bg-blue-100 rounded-full h-1"><div class="bg-blue-500 h-1 rounded-full" style="width:60%"></div></div></div><div class="bg-blue-50 border border-blue-200 rounded p-1"><p class="text-[8px] font-bold text-blue-700">OP-042</p><div class="mt-0.5 bg-blue-100 rounded-full h-1"><div class="bg-blue-500 h-1 rounded-full" style="width:30%"></div></div></div></div><div><p class="text-[7px] text-gray-500 mb-0.5">QC</p><div class="bg-yellow-50 border border-yellow-200 rounded p-1"><p class="text-[8px] font-bold text-yellow-700">OP-039</p><div class="mt-0.5 bg-yellow-100 rounded-full h-1"><div class="bg-yellow-500 h-1 rounded-full" style="width:90%"></div></div></div></div><div><p class="text-[7px] text-gray-500 mb-0.5">Listo</p><div class="bg-green-50 border border-green-200 rounded p-1"><p class="text-[8px] font-bold text-green-700">OP-038</p><div class="mt-0.5 bg-green-100 rounded-full h-1"><div class="bg-green-500 h-1 rounded-full" style="width:100%"></div></div></div></div></div><div class="grid grid-cols-2 gap-1"><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">5</p><p class="text-[7px] text-gray-500">Activas</p></div><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-green-600">2</p><p class="text-[7px] text-gray-500">Listas</p></div></div>',
    f0: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center"><svg class="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Entregas</span></div><p class="text-lg font-bold text-gray-900">87% a tiempo</p><p class="text-[10px] text-green-500 font-semibold">+8% vs anterior</p>',
    f1: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center"><svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">OPs</span></div><p class="text-lg font-bold text-gray-900">5 activas</p><p class="text-[10px] text-gray-500">2 completadas este mes</p>',
    f2: '<div><p class="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Promedio</p><p class="text-xl font-bold text-gray-900 mt-1">4.2 días</p><p class="text-[10px] text-gray-500">Por orden de producción</p></div>',
  },
  {
    title: 'Finanzas y RRHH',
    desc: 'Flujo de caja, cuentas por cobrar/pagar, planilla y asistencia.',
    card: '<div class="flex items-center gap-2 mb-2.5"><div class="flex gap-1"><span class="w-2 h-2 rounded-full bg-red-400"></span><span class="w-2 h-2 rounded-full bg-yellow-400"></span><span class="w-2 h-2 rounded-full bg-green-400"></span></div><span class="text-[9px] text-gray-500 ml-1">erp.citemadera.pe/finanzas</span></div><p class="text-[11px] font-bold text-gray-800 mb-2">Flujo de Caja <span class="text-gray-500 font-normal">Mar 2026</span></p><div class="grid grid-cols-3 gap-1 mb-2"><div class="bg-green-50 rounded p-1 text-center"><p class="text-xs font-bold text-green-600">S/52K</p><p class="text-[7px] text-gray-500">Ingreso</p></div><div class="bg-red-50 rounded p-1 text-center"><p class="text-xs font-bold text-red-500">S/38K</p><p class="text-[7px] text-gray-500">Egreso</p></div><div class="bg-blue-50 rounded p-1 text-center"><p class="text-xs font-bold text-blue-600">S/14K</p><p class="text-[7px] text-gray-500">Neto</p></div></div><div class="flex items-end gap-1 h-8 mb-2"><div class="flex-1 rounded bg-green-300" style="height:60%"></div><div class="flex-1 rounded bg-green-400" style="height:75%"></div><div class="flex-1 rounded bg-green-300" style="height:55%"></div><div class="flex-1 rounded bg-green-500" style="height:85%"></div><div class="flex-1 rounded bg-green-400" style="height:70%"></div><div class="flex-1 rounded bg-green-600" style="height:100%"></div></div><div class="grid grid-cols-2 gap-1"><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">8</p><p class="text-[7px] text-gray-500">Empleados</p></div><div class="bg-gray-50 rounded p-1 text-center"><p class="text-xs font-bold text-gray-800">96%</p><p class="text-[7px] text-gray-500">Asistencia</p></div></div>',
    f0: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center"><svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Saldo</span></div><p class="text-lg font-bold text-gray-900">S/85,200</p><p class="text-[10px] text-green-500 font-semibold">Flujo positivo</p>',
    f1: '<div class="flex items-center gap-2 mb-1"><div class="w-7 h-7 rounded-lg bg-purple-50 flex items-center justify-center"><svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg></div><span class="text-[10px] font-bold text-gray-700 uppercase tracking-wide">RRHH</span></div><p class="text-lg font-bold text-gray-900">8 empleados</p><p class="text-[10px] text-gray-500">96% asistencia</p>',
    f2: '<div><p class="text-[9px] text-gray-500 uppercase font-bold tracking-wide">Planilla</p><p class="text-xl font-bold text-gray-900 mt-1">S/18,400</p><p class="text-[10px] text-gray-500">Mensual</p></div>',
  },
];

/* ── Helpers ── */
const $ = id => document.getElementById(id);

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ── Carousel ── */
function goSlide(i, userTriggered) {
  if (isTransitioning) return;
  isTransitioning = true;
  idx = i;
  const s = slides[i];

  // Fade out
  const fadeEls = document.querySelectorAll('.slide-fade');
  fadeEls.forEach(el => el.classList.add('slide-fade-out'));

  setTimeout(() => {
    // Swap content
    $('carousel-title').textContent = s.title;
    $('carousel-desc').textContent = s.desc;
    $('login-dashboard-card').innerHTML = s.card;
    $('login-float-0').innerHTML = s.f0;
    $('login-float-1').innerHTML = s.f1;
    $('login-float-2').innerHTML = s.f2;

    // Fade in
    fadeEls.forEach(el => {
      el.classList.remove('slide-fade-out');
      el.classList.add('slide-fade-in');
    });
    setTimeout(() => {
      fadeEls.forEach(el => el.classList.remove('slide-fade-in'));
      isTransitioning = false;
    }, 400);
  }, 300);

  // Update dots
  document.querySelectorAll('.cdot').forEach((d, j) => {
    d.style.background = j === i ? BRAND : DOT_IDLE;
    d.style.width = j === i ? '28px' : '12px';
    d.setAttribute('aria-selected', j === i ? 'true' : 'false');
  });

  if (userTriggered) resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  if (!isPaused) {
    timer = setInterval(() => goSlide((idx + 1) % slides.length), 5000);
  }
}

/* ── View transitions ── */
let viewLock = false;
function showView(v) {
  if (viewLock) return;
  viewLock = true;
  const login = $('view-login');
  const recover = $('view-recover');

  if (v === 'recover') {
    login.style.transition = 'opacity .2s ease, transform .2s ease';
    login.style.opacity = '0';
    login.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      login.classList.add('hidden');
      login.style.transition = '';
      login.style.transform = '';
      recover.classList.remove('hidden');
      recover.className = recover.className.replace(/anim-slide-\w+/g, '').trim();
      void recover.offsetWidth;
      recover.classList.add('anim-slide-left');
      $('recover-success').classList.add('hidden');
      $('recover-error').classList.add('hidden');
      viewLock = false;
    }, 200);
  } else {
    recover.style.transition = 'opacity .2s ease, transform .2s ease';
    recover.style.opacity = '0';
    recover.style.transform = 'translateX(20px)';
    setTimeout(() => {
      recover.classList.add('hidden');
      recover.style.transition = '';
      recover.style.opacity = '';
      recover.style.transform = '';
      login.classList.remove('hidden');
      login.style.opacity = '';
      login.className = login.className.replace(/anim-slide-\w+/g, '').trim();
      void login.offsetWidth;
      login.classList.add('anim-slide-right');
      viewLock = false;
    }, 200);
  }
}

/* ── Password toggle ── */
function togglePwd() {
  const p = $('login-password');
  const show = p.type === 'password';
  p.type = show ? 'text' : 'password';
  $('eye-icon').innerHTML = show
    ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>'
    : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>';
}

/* ── Recover password ── */
function sendRecover() {
  const email = $('recover-email').value.trim();
  const errEl = $('recover-error');
  const succEl = $('recover-success');
  const btn = $('recover-btn');

  if (!email || !isValidEmail(email)) {
    errEl.classList.remove('hidden');
    succEl.classList.add('hidden');
    return;
  }
  errEl.classList.add('hidden');
  btn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    succEl.classList.remove('hidden');
    btn.innerHTML = 'Enviar instrucciones';
    btn.disabled = false;
  }, 1000);
}

/* ── Login ── */
function tryLogin() {
  const email = $('login-email').value.trim();
  const pw = $('login-password').value;
  const btn = $('login-btn');
  const err = $('login-error');
  const remember = $('remember-check').checked;

  if (!email || !isValidEmail(email)) {
    err.classList.remove('hidden');
    $('login-error-msg').textContent = 'Ingrese un correo electrónico válido';
    return;
  }
  if (!pw) {
    err.classList.remove('hidden');
    $('login-error-msg').textContent = 'Ingrese su contraseña';
    return;
  }

  btn.innerHTML = '<svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/></svg>Verificando...';
  btn.disabled = true;

  setTimeout(() => {
    if (email === 'admin@citemadera.pe' && pw === 'admin123') {
      const userData = {id:'USR-001',nombre:'Administrador',email:email,rol:'Administrador',avatar:'A'};
      sessionStorage.setItem('erp_user', JSON.stringify(userData));
      if (remember) localStorage.setItem('erp_remember', email);
      else localStorage.removeItem('erp_remember');
      window.location.href = 'index.html';
    } else {
      err.classList.remove('hidden');
      $('login-error-msg').textContent = 'Credenciales incorrectas. Verifique su usuario y contraseña.';
      btn.innerHTML = 'Acceder';
      btn.disabled = false;
      $('login-form').classList.add('shake');
      setTimeout(() => $('login-form').classList.remove('shake'), 500);
    }
  }, 800);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  // Redirect if already logged in
  if (sessionStorage.getItem('erp_user')) { window.location.href = 'index.html'; return; }

  // Restore remembered email
  const saved = localStorage.getItem('erp_remember');
  if (saved) {
    $('login-email').value = saved;
    $('remember-check').checked = true;
  }

  // Start carousel
  goSlide(0);
  timer = setInterval(() => goSlide((idx + 1) % slides.length), 5000);

  // Pause on hover
  const panel = $('left-panel');
  if (panel) {
    panel.addEventListener('mouseenter', () => { isPaused = true; clearInterval(timer); });
    panel.addEventListener('mouseleave', () => { isPaused = false; resetTimer(); });
  }

  // Keyboard nav for dots
  document.querySelectorAll('.cdot').forEach((dot, i) => {
    dot.addEventListener('keydown', e => {
      const len = slides.length;
      if (e.key === 'ArrowRight') { e.preventDefault(); const ni = (i+1)%len; goSlide(ni, true); document.querySelectorAll('.cdot')[ni].focus(); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); const ni = (i-1+len)%len; goSlide(ni, true); document.querySelectorAll('.cdot')[ni].focus(); }
    });
  });

  // Auto-hide login error on typing
  ['login-email', 'login-password'].forEach(id => {
    const el = $(id);
    if (el) el.addEventListener('input', () => $('login-error').classList.add('hidden'));
  });
});
