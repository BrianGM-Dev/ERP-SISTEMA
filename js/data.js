// ============================================================
// DATA.JS - Mock Data for ERPEmprendedor CITE MADERA
// ============================================================

const HOY = new Date().toISOString().split('T')[0];
const _ayer = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; })();
const _antier = (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d.toISOString().split('T')[0]; })();

const AppData = {

  // ── CATEGORIAS DE MATERIALES ─────────────────────────────
  categorias: ['Materia Prima', 'Insumos', 'Accesorios', 'Embalaje'],

  // ── TIPOS DE PERSONAL ──────────────────────────────────
  tipos_personal: ['Fijo', 'Jornal', 'Destajo'],

  // ── MATERIALES / INVENTARIO ──────────────────────────────
  materiales: [
    { id: 'MAT-001', codigo: 'MAT-001', nombre: 'MDF 15mm 244x122cm', categoria: 'Materia Prima', stock: 45, min_stock: 20, unidad: 'Plancha', precio_unit: 52.00, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-1', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&q=80', barcode: '7751234000011' },
    { id: 'MAT-002', codigo: 'MAT-002', nombre: 'Melamina Blanca 18mm', categoria: 'Materia Prima', stock: 12, min_stock: 15, unidad: 'Plancha', precio_unit: 68.50, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-2', estado: 'Stock Bajo', imagen: 'https://images.unsplash.com/photo-1615529151169-7b1d8a6b2b0b?auto=format&fit=crop&w=400&q=80', barcode: '7751234000028' },
    { id: 'MAT-003', codigo: 'MAT-003', nombre: 'Melamina Nogal 18mm', categoria: 'Materia Prima', stock: 8, min_stock: 10, unidad: 'Plancha', precio_unit: 72.00, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-2', estado: 'Stock Bajo', imagen: 'https://images.unsplash.com/photo-1543005009-4c27093afab6?auto=format&fit=crop&w=400&q=80', barcode: '7751234000035' },
    { id: 'MAT-004', codigo: 'MAT-004', nombre: 'Triplay 4mm 244x122cm', categoria: 'Materia Prima', stock: 30, min_stock: 15, unidad: 'Plancha', precio_unit: 28.00, proveedor_id: 'PRV-002', ubicacion: 'Almacén A-3', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1596079890744-c1a0462d0975?auto=format&fit=crop&w=400&q=80', barcode: '7751234000042' },
    { id: 'MAT-005', codigo: 'MAT-005', nombre: 'Bisagra Soft-Close 35mm', categoria: 'Accesorios', stock: 240, min_stock: 100, unidad: 'Unidad', precio_unit: 3.50, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?auto=format&fit=crop&w=400&q=80', barcode: '7751234000059' },
    { id: 'MAT-006', codigo: 'MAT-006', nombre: 'Corredera Telescópica 45cm', categoria: 'Accesorios', stock: 60, min_stock: 50, unidad: 'Par', precio_unit: 12.00, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=400&q=80', barcode: '7751234000066' },
    { id: 'MAT-007', codigo: 'MAT-007', nombre: 'Tornillo Aglomerado 3.5x30', categoria: 'Insumos', stock: 1200, min_stock: 500, unidad: 'Ciento', precio_unit: 4.50, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-2', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1586864387789-628af9feed72?auto=format&fit=crop&w=400&q=80', barcode: '7751234000073' },
    { id: 'MAT-008', codigo: 'MAT-008', nombre: 'Clavos 2" sin cabeza', categoria: 'Insumos', stock: 80, min_stock: 100, unidad: 'Kg', precio_unit: 8.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-2', estado: 'Agotado', imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80', barcode: '7751234000080' },
    { id: 'MAT-009', codigo: 'MAT-009', nombre: 'Laca Nitrocelulósica Brillante', categoria: 'Insumos', stock: 25, min_stock: 10, unidad: 'Galón', precio_unit: 45.00, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-1', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=400&q=80', barcode: '7751234000097' },
    { id: 'MAT-010', codigo: 'MAT-010', nombre: 'Sellador de Madera', categoria: 'Insumos', stock: 15, min_stock: 8, unidad: 'Galón', precio_unit: 38.00, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-1', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80', barcode: '7751234000103' },
    { id: 'MAT-011', codigo: 'MAT-011', nombre: 'Madera Tornillo 2x4x10', categoria: 'Materia Prima', stock: 55, min_stock: 30, unidad: 'Unidad', precio_unit: 18.50, proveedor_id: 'PRV-002', ubicacion: 'Almacén A-4', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1520096893700-e2fc4a207237?auto=format&fit=crop&w=400&q=80', barcode: '7751234000110' },
    { id: 'MAT-012', codigo: 'MAT-012', nombre: 'Pegamento PVC Transparente', categoria: 'Insumos', stock: 18, min_stock: 10, unidad: 'Litro', precio_unit: 22.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', barcode: '7751234000127' },
    { id: 'MAT-013', codigo: 'MAT-013', nombre: 'Jaladera Barra Aluminio 96mm', categoria: 'Accesorios', stock: 45, min_stock: 50, unidad: 'Unidad', precio_unit: 6.50, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'Stock Bajo', imagen: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=400&q=80', barcode: '7751234000134' },
    { id: 'MAT-014', codigo: 'MAT-014', nombre: 'Canto PVC Melamina Blanco 22mm', categoria: 'Insumos', stock: 320, min_stock: 100, unidad: 'Metro', precio_unit: 0.90, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-2', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1615529151169-7b1d8a6b2b0b?auto=format&fit=crop&w=400&q=80', barcode: '7751234000141' },
    { id: 'MAT-015', codigo: 'MAT-015', nombre: 'Fibra de Vidrio 600gr/m2', categoria: 'Insumos', stock: 8, min_stock: 5, unidad: 'Metro', precio_unit: 15.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=400&q=80', barcode: '7751234000158' },
    { id: 'MAT-016', codigo: 'MAT-016', nombre: 'Caja Carton Corrugado 60x40x30', categoria: 'Embalaje', stock: 200, min_stock: 50, unidad: 'Unidad', precio_unit: 3.50, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: '', barcode: '7751234000165' },
    { id: 'MAT-017', codigo: 'MAT-017', nombre: 'Stretch Film 18" x 1500ft', categoria: 'Embalaje', stock: 15, min_stock: 5, unidad: 'Rollo', precio_unit: 18.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: '', barcode: '7751234000172' },
    { id: 'MAT-018', codigo: 'MAT-018', nombre: 'Esquineros Carton L 1m', categoria: 'Embalaje', stock: 500, min_stock: 100, unidad: 'Unidad', precio_unit: 0.80, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: '', barcode: '7751234000189' },
    { id: 'MAT-019', codigo: 'MAT-019', nombre: 'Espuma Polietileno 5mm', categoria: 'Embalaje', stock: 50, min_stock: 20, unidad: 'Metro', precio_unit: 4.50, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK', imagen: '', barcode: '7751234000196' },
  ],

  kardex: {
    'MAT-001': [
      { fecha: '2026-03-01', tipo: 'Ingreso', cantidad: 20, saldo: 25, referencia: 'OC-2026-008', usuario: 'Carlos M.' },
      { fecha: '2026-03-05', tipo: 'Egreso', cantidad: -5, saldo: 45, referencia: 'OP-2026-012', usuario: 'Luis P.' },
      { fecha: '2026-03-10', tipo: 'Egreso', cantidad: -8, saldo: 37, referencia: 'OP-2026-015', usuario: 'Luis P.' },
      { fecha: '2026-03-15', tipo: 'Ingreso', cantidad: 16, saldo: 53, referencia: 'OC-2026-010', usuario: 'Ana R.' },
      { fecha: '2026-03-18', tipo: 'Egreso', cantidad: -8, saldo: 45, referencia: 'OP-2026-018', usuario: 'Luis P.' },
    ],
    'MAT-002': [
      { fecha: '2026-03-02', tipo: 'Ingreso', cantidad: 10, saldo: 22, referencia: 'OC-2026-007', usuario: 'Carlos M.' },
      { fecha: '2026-03-08', tipo: 'Egreso', cantidad: -6, saldo: 16, referencia: 'OP-2026-013', usuario: 'Pedro S.' },
      { fecha: '2026-03-14', tipo: 'Egreso', cantidad: -4, saldo: 12, referencia: 'OP-2026-016', usuario: 'Pedro S.' },
    ],
    'MAT-003': [
      { fecha: '2026-03-03', tipo: 'Ingreso', cantidad: 15, saldo: 20, referencia: 'OC-2026-006', usuario: 'Carlos M.' },
      { fecha: '2026-03-10', tipo: 'Egreso', cantidad: -7, saldo: 13, referencia: 'OP-2026-014', usuario: 'Marco D.' },
      { fecha: '2026-03-17', tipo: 'Egreso', cantidad: -5, saldo: 8, referencia: 'OP-2026-019', usuario: 'Pedro S.' },
    ],
    'MAT-004': [
      { fecha: '2026-03-02', tipo: 'Ingreso', cantidad: 20, saldo: 35, referencia: 'OC-2026-004', usuario: 'Carlos M.' },
      { fecha: '2026-03-08', tipo: 'Egreso', cantidad: -10, saldo: 25, referencia: 'OP-2026-006', usuario: 'Carlos L.' },
      { fecha: '2026-03-15', tipo: 'Ingreso', cantidad: 5, saldo: 30, referencia: 'OC-2026-010', usuario: 'Ana R.' },
    ],
    'MAT-005': [
      { fecha: '2026-03-01', tipo: 'Egreso', cantidad: -40, saldo: 280, referencia: 'OP-2026-005', usuario: 'Luis P.' },
      { fecha: '2026-03-07', tipo: 'Egreso', cantidad: -24, saldo: 256, referencia: 'OP-2026-003', usuario: 'Marco D.' },
      { fecha: '2026-03-14', tipo: 'Ajuste', cantidad: -16, saldo: 240, referencia: 'AJ-2026-003', usuario: 'Alfredo M.' },
    ],
    'MAT-006': [
      { fecha: '2026-03-04', tipo: 'Ingreso', cantidad: 20, saldo: 70, referencia: 'OC-2026-007', usuario: 'Carlos M.' },
      { fecha: '2026-03-12', tipo: 'Egreso', cantidad: -10, saldo: 60, referencia: 'OP-2026-017', usuario: 'Luis P.' },
    ],
    'MAT-007': [
      { fecha: '2026-03-01', tipo: 'Ingreso', cantidad: 500, saldo: 1500, referencia: 'OC-2026-003', usuario: 'Alfredo M.' },
      { fecha: '2026-03-06', tipo: 'Egreso', cantidad: -150, saldo: 1350, referencia: 'OP-2026-005', usuario: 'Luis P.' },
      { fecha: '2026-03-13', tipo: 'Egreso', cantidad: -150, saldo: 1200, referencia: 'OP-2026-006', usuario: 'Carlos L.' },
    ],
    'MAT-008': [
      { fecha: '2026-03-01', tipo: 'Egreso', cantidad: -30, saldo: 110, referencia: 'OP-2026-003', usuario: 'Marco D.' },
      { fecha: '2026-03-09', tipo: 'Egreso', cantidad: -30, saldo: 80, referencia: 'OP-2026-005', usuario: 'Luis P.' },
    ],
    'MAT-009': [
      { fecha: '2026-03-03', tipo: 'Ingreso', cantidad: 10, saldo: 28, referencia: 'OC-2026-005', usuario: 'Carlos M.' },
      { fecha: '2026-03-10', tipo: 'Egreso', cantidad: -3, saldo: 25, referencia: 'OP-2026-003', usuario: 'Marco D.' },
    ],
    'MAT-010': [
      { fecha: '2026-03-05', tipo: 'Ingreso', cantidad: 8, saldo: 19, referencia: 'OC-2026-005', usuario: 'Alfredo M.' },
      { fecha: '2026-03-12', tipo: 'Egreso', cantidad: -4, saldo: 15, referencia: 'OP-2026-017', usuario: 'Pedro S.' },
    ],
    'MAT-011': [
      { fecha: '2026-03-02', tipo: 'Ingreso', cantidad: 30, saldo: 60, referencia: 'OC-2026-004', usuario: 'Carlos M.' },
      { fecha: '2026-03-08', tipo: 'Egreso', cantidad: -18, saldo: 42, referencia: 'OP-2026-003', usuario: 'Marco D.' },
      { fecha: '2026-03-16', tipo: 'Ingreso', cantidad: 13, saldo: 55, referencia: 'OC-2026-010', usuario: 'Ana R.' },
    ],
    'MAT-012': [
      { fecha: '2026-03-04', tipo: 'Ingreso', cantidad: 10, saldo: 22, referencia: 'OC-2026-003', usuario: 'Alfredo M.' },
      { fecha: '2026-03-11', tipo: 'Egreso', cantidad: -4, saldo: 18, referencia: 'OP-2026-015', usuario: 'Luis P.' },
    ],
    'MAT-013': [
      { fecha: '2026-03-01', tipo: 'Egreso', cantidad: -15, saldo: 60, referencia: 'OP-2026-005', usuario: 'Luis P.' },
      { fecha: '2026-03-09', tipo: 'Egreso', cantidad: -10, saldo: 50, referencia: 'OP-2026-014', usuario: 'Pedro S.' },
      { fecha: '2026-03-15', tipo: 'Ajuste', cantidad: -5, saldo: 45, referencia: 'AJ-2026-004', usuario: 'Alfredo M.' },
    ],
    'MAT-014': [
      { fecha: '2026-03-03', tipo: 'Ingreso', cantidad: 200, saldo: 400, referencia: 'OC-2026-005', usuario: 'Carlos M.' },
      { fecha: '2026-03-10', tipo: 'Egreso', cantidad: -50, saldo: 350, referencia: 'OP-2026-004', usuario: 'Pedro S.' },
      { fecha: '2026-03-17', tipo: 'Egreso', cantidad: -30, saldo: 320, referencia: 'OP-2026-018', usuario: 'Marco D.' },
    ],
    'MAT-015': [
      { fecha: '2026-03-06', tipo: 'Ingreso', cantidad: 5, saldo: 10, referencia: 'OC-2026-011', usuario: 'Alfredo M.' },
      { fecha: '2026-03-14', tipo: 'Egreso', cantidad: -2, saldo: 8, referencia: 'OP-2026-016', usuario: 'Luis P.' },
    ],
  },

  // ── PROVEEDORES ──────────────────────────────────────────
  proveedores: [
    { id: 'PRV-001', nombre: 'Tableros del Norte SAC', ruc: '20451234567', contacto: 'Jorge Ramírez', email: 'jramirez@tablasnorte.com', telefono: '044-281234', ciudad: 'Trujillo', rating: 5, categoria: 'Materia Prima', credito_dias: 30 },
    { id: 'PRV-002', nombre: 'Maderería Amazónica EIRL', ruc: '20512345678', contacto: 'Rosa Huanca', email: 'rhuanca@madereria.pe', telefono: '044-295678', ciudad: 'Trujillo', rating: 4, categoria: 'Madera', credito_dias: 15 },
    { id: 'PRV-003', nombre: 'Herrajes & Accesorios Peru SA', ruc: '20623456789', contacto: 'Miguel Torres', email: 'mtorres@herrajes.pe', telefono: '01-2345678', ciudad: 'Lima', rating: 5, categoria: 'Accesorios', credito_dias: 45 },
    { id: 'PRV-004', nombre: 'Distribuidora Ferretera Andina', ruc: '20734567890', contacto: 'Carmen Flores', email: 'cflores@ferretera.pe', telefono: '044-267890', ciudad: 'Trujillo', rating: 3, categoria: 'Insumos', credito_dias: 15 },
    { id: 'PRV-005', nombre: 'Pinturas y Acabados Premium', ruc: '20845678901', contacto: 'David Sánchez', email: 'dsanchez@pinturas.pe', telefono: '044-312345', ciudad: 'Trujillo', rating: 4, categoria: 'Insumos', credito_dias: 30 },
    { id: 'PRV-006', nombre: 'Maquinaria Industrial Pérez', ruc: '20956789012', contacto: 'Luis Pérez', email: 'lperez@maquinaria.pe', telefono: '01-3456789', ciudad: 'Lima', rating: 4, categoria: 'Maquinaria', credito_dias: 60 },
    { id: 'PRV-007', nombre: 'Insumos Químicos Industriales', ruc: '21067890123', contacto: 'Patricia Vega', email: 'pvega@iqindustrial.pe', telefono: '044-289012', ciudad: 'La Libertad', rating: 3, categoria: 'Químicos', credito_dias: 30 },
    { id: 'PRV-008', nombre: 'Ferretería El Maestro SCRL', ruc: '21178901234', contacto: 'Andrés Castro', email: 'acastro@ferreteria.pe', telefono: '044-301234', ciudad: 'Trujillo', rating: 4, categoria: 'Insumos', credito_dias: 0 },
  ],

  ordenes_compra: [
    { id: 'OC-2026-001', proveedor_id: 'PRV-001', fecha: '2026-01-05', fecha_entrega: '2026-01-12', estado: 'Recibida', total: 2890.00, items: [{ material_id: 'MAT-001', cantidad: 30, precio: 52.00 }, { material_id: 'MAT-002', cantidad: 20, precio: 68.50 }], aprobado_por: 'Gerente', notas: 'Entrega en almacén' },
    { id: 'OC-2026-002', proveedor_id: 'PRV-003', fecha: '2026-01-10', fecha_entrega: '2026-01-20', estado: 'Recibida', total: 1540.00, items: [{ material_id: 'MAT-005', cantidad: 200, precio: 3.50 }, { material_id: 'MAT-006', cantidad: 80, precio: 12.00 }], aprobado_por: 'Gerente', notas: '' },
    { id: 'OC-2026-003', proveedor_id: 'PRV-004', fecha: '2026-01-15', fecha_entrega: '2026-01-18', estado: 'Recibida', total: 680.00, items: [{ material_id: 'MAT-007', cantidad: 100, precio: 4.50 }, { material_id: 'MAT-012', cantidad: 20, precio: 22.00 }], aprobado_por: 'Admin', notas: 'Urgente' },
    { id: 'OC-2026-004', proveedor_id: 'PRV-002', fecha: '2026-02-01', fecha_entrega: '2026-02-08', estado: 'Recibida', total: 1295.00, items: [{ material_id: 'MAT-011', cantidad: 50, precio: 18.50 }, { material_id: 'MAT-004', cantidad: 15, precio: 28.00 }], aprobado_por: 'Gerente', notas: '' },
    { id: 'OC-2026-005', proveedor_id: 'PRV-005', fecha: '2026-02-10', fecha_entrega: '2026-02-17', estado: 'Recibida', total: 1205.00, items: [{ material_id: 'MAT-009', cantidad: 15, precio: 45.00 }, { material_id: 'MAT-010', cantidad: 12, precio: 38.00 }, { material_id: 'MAT-014', cantidad: 200, precio: 0.90 }], aprobado_por: 'Admin', notas: '' },
    { id: 'OC-2026-006', proveedor_id: 'PRV-001', fecha: '2026-02-20', fecha_entrega: '2026-02-27', estado: 'Parcial', total: 3128.00, items: [{ material_id: 'MAT-002', cantidad: 25, precio: 68.50 }, { material_id: 'MAT-003', cantidad: 20, precio: 72.00 }], aprobado_por: 'Gerente', notas: 'Recibido 60%' },
    { id: 'OC-2026-007', proveedor_id: 'PRV-003', fecha: '2026-03-01', fecha_entrega: '2026-03-10', estado: 'Aprobada', total: 825.00, items: [{ material_id: 'MAT-013', cantidad: 100, precio: 6.50 }, { material_id: 'MAT-006', cantidad: 20, precio: 12.00 }], aprobado_por: 'Gerente', notas: '' },
    { id: 'OC-2026-008', proveedor_id: 'PRV-001', fecha: '2026-03-05', fecha_entrega: '2026-03-15', estado: 'Aprobada', total: 2176.00, items: [{ material_id: 'MAT-001', cantidad: 20, precio: 52.00 }, { material_id: 'MAT-003', cantidad: 15, precio: 72.00 }], aprobado_por: 'Gerente', notas: '' },
    { id: 'OC-2026-009', proveedor_id: 'PRV-004', fecha: '2026-03-10', fecha_entrega: '2026-03-14', estado: 'Pendiente', total: 440.00, items: [{ material_id: 'MAT-008', cantidad: 20, precio: 8.00 }, { material_id: 'MAT-007', cantidad: 60, precio: 4.50 }], aprobado_por: null, notas: 'En revisión' },
    { id: 'OC-2026-010', proveedor_id: 'PRV-002', fecha: '2026-03-15', fecha_entrega: '2026-03-22', estado: 'Pendiente', total: 1850.00, items: [{ material_id: 'MAT-011', cantidad: 60, precio: 18.50 }, { material_id: 'MAT-004', cantidad: 20, precio: 28.00 }], aprobado_por: null, notas: 'Licitación Q2' },
  ],

  // ── CLIENTES ─────────────────────────────────────────────
  clientes: [
    { id: 'CLI-001', nombre: 'Constructora Nor-Perú SAC', ruc: '20111222333', contacto: 'Roberto Aguilar', email: 'raguilar@norperu.com', telefono: '044-451234', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 15000, credito_dias: 30 },
    { id: 'CLI-002', nombre: 'Hotel Costa Azul EIRL', ruc: '20222333444', contacto: 'Mariana López', email: 'mlopez@costaazul.pe', telefono: '044-462345', ciudad: 'Huanchaco', tipo: 'Empresa', credito_limite: 20000, credito_dias: 45 },
    { id: 'CLI-003', nombre: 'Inmobiliaria Los Jardines SA', ruc: '20333444555', contacto: 'Francisco Ríos', email: 'frios@losjardines.pe', telefono: '044-473456', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 30000, credito_dias: 60 },
    { id: 'CLI-004', nombre: 'Restaurante El Buen Sabor', ruc: '10444555666', contacto: 'Ana Morales', email: 'amorales@buensabor.pe', telefono: '044-484567', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 5000, credito_dias: 15 },
    { id: 'CLI-005', nombre: 'García Mendoza, Juan Carlos', ruc: '10555666777', contacto: 'Juan García', email: 'jgarcia@gmail.com', telefono: '987654321', ciudad: 'Trujillo', tipo: 'Persona', credito_limite: 3000, credito_dias: 0 },
    { id: 'CLI-006', nombre: 'Clínica San Pablo Trujillo', ruc: '20666777888', contacto: 'Dr. Carlos Vega', email: 'cvega@sanpablo.pe', telefono: '044-495678', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 25000, credito_dias: 30 },
    { id: 'CLI-007', nombre: 'Universidad Privada del Norte', ruc: '20777888999', contacto: 'Ing. Sandra Pérez', email: 'sperez@upn.edu.pe', telefono: '044-406789', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 50000, credito_dias: 60 },
    { id: 'CLI-008', nombre: 'Ferretería Torres Hnos.', ruc: '20888999000', contacto: 'Marco Torres', email: 'mtorres@ferretorres.pe', telefono: '044-417890', ciudad: 'Virú', tipo: 'Empresa', credito_limite: 8000, credito_dias: 30 },
    { id: 'CLI-009', nombre: 'Vargas Quispe, María Elena', ruc: '10999000111', contacto: 'María Vargas', email: 'mvargas@hotmail.com', telefono: '976543210', ciudad: 'La Esperanza', tipo: 'Persona', credito_limite: 2000, credito_dias: 0 },
    { id: 'CLI-010', nombre: 'Colegio San Agustín', ruc: '20000111222', contacto: 'Hno. Alberto Cruz', email: 'acruz@sanagustin.edu.pe', telefono: '044-428901', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 20000, credito_dias: 45 },
    { id: 'CLI-011', nombre: 'Supermercado La Canasta SAC', ruc: '20111222334', contacto: 'Patricia Huaman', email: 'phuaman@lacanasta.pe', telefono: '044-439012', ciudad: 'Trujillo', tipo: 'Empresa', credito_limite: 12000, credito_dias: 30 },
    { id: 'CLI-012', nombre: 'Municipalidad de Trujillo', ruc: '20601218281', contacto: 'Lic. José Reyes', email: 'jreyes@trujillo.gob.pe', telefono: '044-290000', ciudad: 'Trujillo', tipo: 'Gobierno', credito_limite: 100000, credito_dias: 90 },
  ],

  cotizaciones: [
    { id: 'COT-2026-001', cliente_id: 'CLI-001', fecha: '2026-01-08', vigencia: '2026-01-23', estado: 'Aprobada', subtotal: 12500.00, igv: 2250.00, total: 14750.00, items: [{ descripcion: 'Muebles de oficina modular', cantidad: 5, precio: 1800.00 }, { descripcion: 'Sillas ejecutivas', cantidad: 10, precio: 550.00 }], notas: 'Incluye instalación' },
    { id: 'COT-2026-002', cliente_id: 'CLI-002', fecha: '2026-01-15', vigencia: '2026-01-30', estado: 'Aprobada', subtotal: 8900.00, igv: 1602.00, total: 10502.00, items: [{ descripcion: 'Camas matrimoniales madera tornillo', cantidad: 6, precio: 850.00 }, { descripcion: 'Veladores par', cantidad: 6, precio: 280.00 }, { descripcion: 'Cómodas 5 cajones', cantidad: 4, precio: 420.00 }], notas: 'Hotel habitaciones 201-210' },
    { id: 'COT-2026-003', cliente_id: 'CLI-003', fecha: '2026-01-22', vigencia: '2026-02-06', estado: 'Enviada', subtotal: 24600.00, igv: 4428.00, total: 29028.00, items: [{ descripcion: 'Closets empotrados melamina', cantidad: 12, precio: 1200.00 }, { descripcion: 'Cocinas integrales', cantidad: 6, precio: 1900.00 }], notas: 'Proyecto residencial 12 dptos' },
    { id: 'COT-2026-004', cliente_id: 'CLI-004', fecha: '2026-02-01', vigencia: '2026-02-16', estado: 'Aprobada', subtotal: 3200.00, igv: 576.00, total: 3776.00, items: [{ descripcion: 'Mesas de madera para restaurante', cantidad: 8, precio: 320.00 }, { descripcion: 'Sillas de madera', cantidad: 40, precio: 80.00 }], notas: '' },
    { id: 'COT-2026-005', cliente_id: 'CLI-005', fecha: '2026-02-05', vigencia: '2026-02-20', estado: 'Borrador', subtotal: 1850.00, igv: 333.00, total: 2183.00, items: [{ descripcion: 'Dormitorio completo madera pino', cantidad: 1, precio: 1850.00 }], notas: 'Cliente nuevo' },
    { id: 'COT-2026-006', cliente_id: 'CLI-006', fecha: '2026-02-10', vigencia: '2026-02-25', estado: 'Rechazada', subtotal: 15800.00, igv: 2844.00, total: 18644.00, items: [{ descripcion: 'Mobiliario hospitalario madera', cantidad: 20, precio: 790.00 }], notas: 'Cliente prefirió otro proveedor' },
    { id: 'COT-2026-007', cliente_id: 'CLI-007', fecha: '2026-02-18', vigencia: '2026-03-05', estado: 'Aprobada', subtotal: 18500.00, igv: 3330.00, total: 21830.00, items: [{ descripcion: 'Mobiliario aulas melamina', cantidad: 25, precio: 420.00 }, { descripcion: 'Escritorios docentes', cantidad: 10, precio: 580.00 }, { descripcion: 'Estantes biblioteca', cantidad: 8, precio: 650.00 }], notas: 'Proyecto 2026-I semestre' },
    { id: 'COT-2026-008', cliente_id: 'CLI-009', fecha: '2026-03-01', vigencia: '2026-03-16', estado: 'Enviada', subtotal: 2400.00, igv: 432.00, total: 2832.00, items: [{ descripcion: 'Cocina integral 3m melamina blanco', cantidad: 1, precio: 2400.00 }], notas: 'Medidas coordinadas' },
    { id: 'COT-2026-009', cliente_id: 'CLI-010', fecha: '2026-03-05', vigencia: '2026-03-20', estado: 'Enviada', subtotal: 9600.00, igv: 1728.00, total: 11328.00, items: [{ descripcion: 'Pupitres escolares madera', cantidad: 60, precio: 120.00 }, { descripcion: 'Escritorios director', cantidad: 3, precio: 480.00 }], notas: 'Licitación colegio' },
    { id: 'COT-2026-010', cliente_id: 'CLI-012', fecha: '2026-03-10', vigencia: '2026-03-25', estado: 'Borrador', subtotal: 45000.00, igv: 8100.00, total: 53100.00, items: [{ descripcion: 'Mobiliario oficinas municipales', cantidad: 1, precio: 45000.00 }], notas: 'En elaboración - proceso licitación' },
  ],

  ordenes_venta: [
    { id: 'OV-2026-001', cotizacion_id: 'COT-2026-001', cliente_id: 'CLI-001', fecha: '2026-01-25', fecha_entrega: '2026-02-20', estado: 'Completada', total: 14750.00 },
    { id: 'OV-2026-002', cotizacion_id: 'COT-2026-002', cliente_id: 'CLI-002', fecha: '2026-02-01', fecha_entrega: '2026-03-01', estado: 'En Producción', total: 10502.00 },
    { id: 'OV-2026-003', cotizacion_id: 'COT-2026-004', cliente_id: 'CLI-004', fecha: '2026-02-05', fecha_entrega: '2026-02-25', estado: 'Completada', total: 3776.00 },
    { id: 'OV-2026-004', cotizacion_id: 'COT-2026-007', cliente_id: 'CLI-007', fecha: '2026-02-22', fecha_entrega: '2026-03-22', estado: 'En Producción', total: 21830.00 },
    { id: 'OV-2026-005', cotizacion_id: null, cliente_id: 'CLI-008', fecha: '2026-02-28', fecha_entrega: '2026-03-10', estado: 'Entregada', total: 4500.00 },
    { id: 'OV-2026-006', cotizacion_id: null, cliente_id: 'CLI-011', fecha: '2026-03-05', fecha_entrega: '2026-03-28', estado: 'Pendiente', total: 6800.00 },
    { id: 'OV-2026-007', cotizacion_id: null, cliente_id: 'CLI-001', fecha: '2026-03-10', fecha_entrega: '2026-04-05', estado: 'Pendiente', total: 8900.00 },
    { id: 'OV-2026-008', cotizacion_id: null, cliente_id: 'CLI-006', fecha: '2026-03-15', fecha_entrega: '2026-04-10', estado: 'En Producción', total: 12400.00 },
  ],

  facturas: [
    { id: 'FAC-2026-001', serie: 'F001', numero: '00000001', ov_id: 'OV-2026-001', cliente_id: 'CLI-001', fecha: '2026-02-20', vencimiento: '2026-03-22', subtotal: 12500.00, igv: 2250.00, total: 14750.00, estado: 'Cobrada', metodo_pago: 'Transferencia' },
    { id: 'FAC-2026-002', serie: 'F001', numero: '00000002', ov_id: 'OV-2026-003', cliente_id: 'CLI-004', fecha: '2026-02-25', vencimiento: '2026-03-12', subtotal: 3200.00, igv: 576.00, total: 3776.00, estado: 'Cobrada', metodo_pago: 'Efectivo' },
    { id: 'FAC-2026-003', serie: 'F001', numero: '00000003', ov_id: 'OV-2026-005', cliente_id: 'CLI-008', fecha: '2026-03-10', vencimiento: '2026-04-09', subtotal: 3813.56, igv: 686.44, total: 4500.00, estado: 'Pendiente', metodo_pago: 'Crédito 30d' },
    { id: 'FAC-2026-004', serie: 'F001', numero: '00000004', ov_id: null, cliente_id: 'CLI-005', fecha: '2026-03-12', vencimiento: '2026-03-12', subtotal: 1847.46, igv: 332.54, total: 2180.00, estado: 'Vencida', metodo_pago: 'Contado' },
    { id: 'FAC-2026-005', serie: 'F001', numero: '00000005', ov_id: 'OV-2026-002', cliente_id: 'CLI-002', fecha: '2026-03-15', vencimiento: '2026-04-29', subtotal: 8900.00, igv: 1602.00, total: 10502.00, estado: 'Pendiente', metodo_pago: 'Crédito 45d' },
    { id: 'FAC-2026-006', serie: 'F001', numero: '00000006', ov_id: null, cliente_id: 'CLI-009', fecha: '2026-03-18', vencimiento: '2026-03-18', subtotal: 2033.90, igv: 366.10, total: 2400.00, estado: 'Pendiente', metodo_pago: 'Contado' },
  ],

  // ── PRODUCCIÓN ──────────────────────────────────────────
  // ── CATEGORIAS DE PRODUCTOS TERMINADOS ───────────────────
  categorias_producto: ['Tablero', 'Mueble', 'Estructura', 'Cocina', 'Acabado', 'Otro'],

  productos: [
    { id: 'PRD-001', nombre: 'Mueble de Oficina Modular', descripcion: 'Set completo escritorio + credenza', categoria: 'Mueble', unidad: 'Juego', margen_esperado: 50, precio_venta_real: 1800.00, costo_std: 1080.00, imagen: '' },
    { id: 'PRD-002', nombre: 'Cama Matrimonial Tornillo', descripcion: 'Madera tornillo, terminado nogal', categoria: 'Mueble', unidad: 'Unidad', margen_esperado: 50, precio_venta_real: 850.00, costo_std: 480.00, imagen: '' },
    { id: 'PRD-003', nombre: 'Closet Empotrado Melamina', descripcion: '2.4m ancho, 5 cuerpos', categoria: 'Mueble', unidad: 'Unidad', margen_esperado: 45, precio_venta_real: 1200.00, costo_std: 720.00, imagen: '' },
    { id: 'PRD-004', nombre: 'Cocina Integral 3m', descripcion: 'Melamina blanco, encimera incluida', categoria: 'Cocina', unidad: 'Unidad', margen_esperado: 50, precio_venta_real: 2400.00, costo_std: 1440.00, imagen: '' },
    { id: 'PRD-005', nombre: 'Mesa Restaurante Madera', descripcion: 'Mesa 4 personas, tornillo', categoria: 'Mueble', unidad: 'Unidad', margen_esperado: 60, precio_venta_real: 320.00, costo_std: 168.00, imagen: '' },
    { id: 'PRD-006', nombre: 'Pupitre Escolar', descripcion: 'Madera pino, regulable', categoria: 'Estructura', unidad: 'Unidad', margen_esperado: 55, precio_venta_real: 120.00, costo_std: 62.00, imagen: '' },
  ],

  ordenes_produccion: [
    { id: 'OP-2026-001', producto_id: 'PRD-001', ov_id: 'OV-2026-001', cantidad: 5, fecha_inicio: '2026-01-26', fecha_fin: '2026-02-15', estado: 'Completada', operario: 'Luis Paredes', prioridad: 'Alta', avance: 100, merma: 2.1, bom: [{ material_id: 'MAT-001', cantidad_req: 15 }, { material_id: 'MAT-005', cantidad_req: 40 }, { material_id: 'MAT-007', cantidad_req: 5 }] },
    { id: 'OP-2026-002', producto_id: 'PRD-005', ov_id: 'OV-2026-003', cantidad: 8, fecha_inicio: '2026-02-05', fecha_fin: '2026-02-22', estado: 'Completada', operario: 'Pedro Soto', prioridad: 'Media', avance: 100, merma: 1.8, bom: [{ material_id: 'MAT-011', cantidad_req: 16 }, { material_id: 'MAT-009', cantidad_req: 2 }] },
    { id: 'OP-2026-003', producto_id: 'PRD-002', ov_id: 'OV-2026-002', cantidad: 6, fecha_inicio: '2026-02-15', fecha_fin: '2026-03-10', estado: 'En Proceso', operario: 'Marco Díaz', prioridad: 'Alta', avance: 75, merma: 3.2, bom: [{ material_id: 'MAT-011', cantidad_req: 18 }, { material_id: 'MAT-009', cantidad_req: 3 }, { material_id: 'MAT-005', cantidad_req: 24 }] },
    { id: 'OP-2026-004', producto_id: 'PRD-003', ov_id: 'OV-2026-002', cantidad: 12, fecha_inicio: '2026-02-20', fecha_fin: '2026-03-15', estado: 'En Proceso', operario: 'Pedro Soto', prioridad: 'Alta', avance: 60, merma: 2.5, bom: [{ material_id: 'MAT-002', cantidad_req: 36 }, { material_id: 'MAT-005', cantidad_req: 96 }, { material_id: 'MAT-014', cantidad_req: 144 }] },
    { id: 'OP-2026-005', producto_id: 'PRD-001', ov_id: 'OV-2026-004', cantidad: 10, fecha_inicio: '2026-03-01', fecha_fin: '2026-03-20', estado: 'En Proceso', operario: 'Luis Paredes', prioridad: 'Alta', avance: 45, merma: 1.5, bom: [{ material_id: 'MAT-001', cantidad_req: 30 }, { material_id: 'MAT-005', cantidad_req: 80 }] },
    { id: 'OP-2026-006', producto_id: 'PRD-006', ov_id: 'OV-2026-004', cantidad: 60, fecha_inicio: '2026-03-05', fecha_fin: '2026-03-22', estado: 'QC', operario: 'Carlos Lara', prioridad: 'Media', avance: 95, merma: 0.8, bom: [{ material_id: 'MAT-004', cantidad_req: 30 }, { material_id: 'MAT-007', cantidad_req: 12 }] },
    { id: 'OP-2026-007', producto_id: 'PRD-004', ov_id: 'OV-2026-008', cantidad: 3, fecha_inicio: '2026-03-16', fecha_fin: '2026-04-05', estado: 'Planificada', operario: 'Marco Díaz', prioridad: 'Media', avance: 0, merma: 0, bom: [{ material_id: 'MAT-002', cantidad_req: 9 }, { material_id: 'MAT-003', cantidad_req: 6 }, { material_id: 'MAT-005', cantidad_req: 30 }] },
    { id: 'OP-2026-008', producto_id: 'PRD-003', ov_id: 'OV-2026-006', cantidad: 8, fecha_inicio: '2026-03-20', fecha_fin: '2026-04-10', estado: 'Planificada', operario: 'Pedro Soto', prioridad: 'Normal', avance: 0, merma: 0, bom: [{ material_id: 'MAT-002', cantidad_req: 24 }, { material_id: 'MAT-014', cantidad_req: 96 }] },
  ],

  // ── COSTOS (calculados dinamicamente desde hojas_costo) ──
  // costos_productos se genera con getCostosProductos()
  // resumen_costos se genera con getResumenCostos()

  // ── PROCESOS DE PRODUCCION (tabla maestra) ─────────────
  procesos_produccion: [
    { id: 'PROC-001', nombre: 'Corte de tableros', area: 'Habilitado', tipo_personal: 'Fijo', horas_estandar: 2.0, operario_default: 'EMP-003', descripcion: 'Corte de planchas en sierra o CNC' },
    { id: 'PROC-002', nombre: 'Corte de madera solida', area: 'Habilitado', tipo_personal: 'Fijo', horas_estandar: 3.0, operario_default: 'EMP-003', descripcion: 'Corte y habilitado de piezas' },
    { id: 'PROC-003', nombre: 'Enchapado de cantos', area: 'Habilitado', tipo_personal: 'Jornal', horas_estandar: 2.5, operario_default: 'EMP-011', descripcion: 'Aplicacion de tapacantos PVC' },
    { id: 'PROC-004', nombre: 'Armado y ensamble', area: 'Ensamble', tipo_personal: 'Fijo', horas_estandar: 6.0, operario_default: 'EMP-004', descripcion: 'Union de piezas, armado de modulos' },
    { id: 'PROC-005', nombre: 'Lijado y preparacion', area: 'Acabado', tipo_personal: 'Jornal', horas_estandar: 3.0, operario_default: 'EMP-012', descripcion: 'Lijado, masillado y preparacion de superficie' },
    { id: 'PROC-006', nombre: 'Lacado y acabado', area: 'Acabado', tipo_personal: 'Destajo', horas_estandar: 1.0, operario_default: 'EMP-015', descripcion: 'Aplicacion de laca, sellador, barniz' },
    { id: 'PROC-007', nombre: 'Instalacion de herrajes', area: 'Ensamble', tipo_personal: 'Jornal', horas_estandar: 2.0, operario_default: 'EMP-013', descripcion: 'Bisagras, correderas, jaladeras' },
    { id: 'PROC-008', nombre: 'Control de calidad', area: 'QC', tipo_personal: 'Fijo', horas_estandar: 1.0, operario_default: 'EMP-006', descripcion: 'Inspeccion final y verificacion' },
    { id: 'PROC-009', nombre: 'Tapizado', area: 'Acabado', tipo_personal: 'Destajo', horas_estandar: 2.0, operario_default: 'EMP-014', descripcion: 'Tapizado de asientos y paneles' },
    { id: 'PROC-010', nombre: 'Torneado', area: 'Habilitado', tipo_personal: 'Fijo', horas_estandar: 2.5, operario_default: 'EMP-004', descripcion: 'Torneado de patas y piezas cilindricas' },
    { id: 'PROC-011', nombre: 'Embalaje', area: 'Despacho', tipo_personal: 'Jornal', horas_estandar: 0.5, operario_default: 'EMP-013', descripcion: 'Empaque y proteccion para transporte' },
    { id: 'PROC-012', nombre: 'Instalacion en sitio', area: 'Instalacion', tipo_personal: 'Fijo', horas_estandar: 4.0, operario_default: 'EMP-004', descripcion: 'Instalacion en domicilio del cliente' },
  ],

  // ── SERVICIOS DE PRODUCCION (tabla maestra) ─────────────
  servicios_produccion: [
    { id: 'SRV-001', nombre: 'Transporte interno', tipo: 'Interno', costo_estandar: 25.00, responsable_id: 'EMP-010' },
    { id: 'SRV-002', nombre: 'Transporte a obra', tipo: 'Interno', costo_estandar: 80.00, responsable_id: 'EMP-010' },
    { id: 'SRV-003', nombre: 'Servicio de secado', tipo: 'Externo', costo_estandar: 20.00, responsable_id: '' },
    { id: 'SRV-004', nombre: 'Encimera granito (externo)', tipo: 'Externo', costo_estandar: 350.00, responsable_id: '' },
    { id: 'SRV-005', nombre: 'Instalacion electrica', tipo: 'Externo', costo_estandar: 35.00, responsable_id: '' },
    { id: 'SRV-006', nombre: 'Vidrio templado a medida', tipo: 'Externo', costo_estandar: 120.00, responsable_id: '' },
    { id: 'SRV-007', nombre: 'Tapizado externo', tipo: 'Externo', costo_estandar: 80.00, responsable_id: '' },
    { id: 'SRV-008', nombre: 'Diseno y planos', tipo: 'Interno', costo_estandar: 50.00, responsable_id: 'EMP-002' },
  ],

  // ── FINANZAS ─────────────────────────────────────────────
  flujo_caja: [
    { mes: 'Oct 2025', ingresos: 32400, egresos: 24100, saldo: 8300 },
    { mes: 'Nov 2025', ingresos: 38900, egresos: 27500, saldo: 11400 },
    { mes: 'Dic 2025', ingresos: 51200, egresos: 35800, saldo: 15400 },
    { mes: 'Ene 2026', ingresos: 28700, egresos: 22100, saldo: 6600 },
    { mes: 'Feb 2026', ingresos: 41500, egresos: 29800, saldo: 11700 },
    { mes: 'Mar 2026', ingresos: 45320, egresos: 31200, saldo: 14120 },
  ],

  cuentas_cobrar: [
    { id: 'CxC-001', cliente_id: 'CLI-008', factura_id: 'FAC-2026-003', monto: 4500.00, fecha_venc: '2026-04-09', dias_credito: 30, estado: 'Vigente' },
    { id: 'CxC-002', cliente_id: 'CLI-005', factura_id: 'FAC-2026-004', monto: 2180.00, fecha_venc: '2026-03-12', dias_credito: 0, estado: 'Vencida' },
    { id: 'CxC-003', cliente_id: 'CLI-002', factura_id: 'FAC-2026-005', monto: 10502.00, fecha_venc: '2026-04-29', dias_credito: 45, estado: 'Vigente' },
    { id: 'CxC-004', cliente_id: 'CLI-009', factura_id: 'FAC-2026-006', monto: 2400.00, fecha_venc: '2026-03-18', dias_credito: 0, estado: 'Vigente' },
    { id: 'CxC-005', cliente_id: 'CLI-001', factura_id: null, monto: 8900.00, fecha_venc: '2026-04-15', dias_credito: 30, estado: 'Vigente' },
  ],

  cuentas_pagar: [
    { id: 'CxP-001', proveedor_id: 'PRV-001', oc_id: 'OC-2026-006', monto: 3128.00, fecha_venc: '2026-03-27', dias_credito: 30, estado: 'Vigente' },
    { id: 'CxP-002', proveedor_id: 'PRV-003', oc_id: 'OC-2026-007', monto: 825.00, fecha_venc: '2026-04-10', dias_credito: 30, estado: 'Vigente' },
    { id: 'CxP-003', proveedor_id: 'PRV-001', oc_id: 'OC-2026-008', monto: 2176.00, fecha_venc: '2026-04-15', dias_credito: 30, estado: 'Vigente' },
    { id: 'CxP-004', proveedor_id: 'PRV-004', oc_id: 'OC-2026-009', monto: 440.00, fecha_venc: '2026-04-14', dias_credito: 30, estado: 'Vigente' },
    { id: 'CxP-005', proveedor_id: 'PRV-002', oc_id: 'OC-2026-010', monto: 1850.00, fecha_venc: '2026-04-22', dias_credito: 30, estado: 'Vigente' },
  ],

  resumen_finanzas: {
    saldo_disponible: 18450.00,
    total_cobrar: 28482.00,
    total_pagar: 8419.00,
    proyeccion_mes: 14120.00,
  },

  // ── RRHH ────────────────────────────────────────────────
  empleados: [
    // Personal Fijo (sueldo mensual)
    { id: 'EMP-001', nombre: 'Carlos Mendoza Ríos', dni: '42345678', cargo: 'Gerente General', area: 'Gerencia', tipo_personal: 'Fijo', sueldo: 4500, ingreso: '2020-03-01', estado: 'Activo', email: 'cmendoza@citemadera.pe', telefono: '944123456' },
    { id: 'EMP-002', nombre: 'Ana Rodríguez Silva', dni: '43456789', cargo: 'Administradora', area: 'Administración', tipo_personal: 'Fijo', sueldo: 2200, ingreso: '2021-06-15', estado: 'Activo', email: 'arodriguez@citemadera.pe', telefono: '955234567' },
    { id: 'EMP-003', nombre: 'Luis Paredes Castro', dni: '44567890', cargo: 'Maestro Carpintero', area: 'Producción', tipo_personal: 'Fijo', sueldo: 2800, ingreso: '2020-08-01', estado: 'Activo', email: 'lparedes@citemadera.pe', telefono: '966345678' },
    { id: 'EMP-004', nombre: 'Pedro Soto Vega', dni: '45678901', cargo: 'Operario Senior', area: 'Producción', tipo_personal: 'Fijo', sueldo: 1800, ingreso: '2021-01-10', estado: 'Activo', email: 'psoto@citemadera.pe', telefono: '977456789' },
    { id: 'EMP-005', nombre: 'Marco Díaz Flores', dni: '46789012', cargo: 'Operario Junior', area: 'Producción', tipo_personal: 'Fijo', sueldo: 1200, ingreso: '2023-03-20', estado: 'Activo', email: 'mdiaz@citemadera.pe', telefono: '988567890' },
    { id: 'EMP-006', nombre: 'Carlos Lara Huanca', dni: '47890123', cargo: 'Control de Calidad', area: 'Producción', tipo_personal: 'Fijo', sueldo: 1600, ingreso: '2022-07-05', estado: 'Activo', email: 'clara@citemadera.pe', telefono: '999678901' },
    { id: 'EMP-007', nombre: 'Rosa Quispe Mamani', dni: '48901234', cargo: 'Vendedora', area: 'Ventas', tipo_personal: 'Fijo', sueldo: 1500, ingreso: '2022-02-14', estado: 'Activo', email: 'rquispe@citemadera.pe', telefono: '910789012' },
    { id: 'EMP-008', nombre: 'Jorge Vargas Torres', dni: '49012345', cargo: 'Vendedor', area: 'Ventas', tipo_personal: 'Fijo', sueldo: 1500, ingreso: '2023-08-01', estado: 'Activo', email: 'jvargas@citemadera.pe', telefono: '921890123' },
    { id: 'EMP-009', nombre: 'Patricia Luna Cruz', dni: '50123456', cargo: 'Contadora', area: 'Contabilidad', tipo_personal: 'Fijo', sueldo: 2500, ingreso: '2021-10-01', estado: 'Activo', email: 'pluna@citemadera.pe', telefono: '932901234' },
    { id: 'EMP-010', nombre: 'Alfredo Mora Ramos', dni: '51234567', cargo: 'Almacenero', area: 'Logística', tipo_personal: 'Fijo', sueldo: 1200, ingreso: '2023-01-15', estado: 'Vacaciones', email: 'amora@citemadera.pe', telefono: '943012345' },
    // Personal Jornal (pago por hora/dia)
    { id: 'EMP-011', nombre: 'Juan Ramos Gutierrez', dni: '52345678', cargo: 'Ayudante Carpintero', area: 'Producción', tipo_personal: 'Jornal', sueldo: 0, tarifa_hora: 8.50, horas_periodo: 48, frecuencia_mensual: 26, porcentaje_capa: 100, ingreso: '2024-02-01', estado: 'Activo', email: '', telefono: '954123456' },
    { id: 'EMP-012', nombre: 'Juan Carlos Garcia', dni: '53456789', cargo: 'Ayudante Acabados', area: 'Producción', tipo_personal: 'Jornal', sueldo: 0, tarifa_hora: 7.00, horas_periodo: 48, frecuencia_mensual: 26, porcentaje_capa: 100, ingreso: '2024-05-10', estado: 'Activo', email: '', telefono: '965234567' },
    { id: 'EMP-013', nombre: 'Roberto Carlos Braga M.', dni: '54567890', cargo: 'Ayudante General', area: 'Producción', tipo_personal: 'Jornal', sueldo: 0, tarifa_hora: 6.25, horas_periodo: 48, frecuencia_mensual: 26, porcentaje_capa: 100, ingreso: '2025-01-15', estado: 'Activo', email: '', telefono: '976345678' },
    // Personal Destajo (pago por pieza/tarea)
    { id: 'EMP-014', nombre: 'Miguel Torres Quispe', dni: '55678901', cargo: 'Tapicero', area: 'Producción', tipo_personal: 'Destajo', sueldo: 0, tarifa_pieza: 25.00, ingreso: '2023-09-01', estado: 'Activo', email: '', telefono: '987456789' },
    { id: 'EMP-015', nombre: 'Fernando Diaz Rojas', dni: '56789012', cargo: 'Lacador', area: 'Producción', tipo_personal: 'Destajo', sueldo: 0, tarifa_pieza: 30.00, ingreso: '2024-03-15', estado: 'Activo', email: '', telefono: '998567890' },
  ],

  asistencias: [
    // Semana 2026-03-16 al 2026-03-20
    { emp_id: 'EMP-001', fecha: '2026-03-16', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-001', fecha: '2026-03-17', ingreso: '08:05', salida: '17:30', horas: 9.4, estado: 'Tardanza' },
    { emp_id: 'EMP-001', fecha: '2026-03-18', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-001', fecha: '2026-03-19', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-003', fecha: '2026-03-16', ingreso: '07:55', salida: '17:00', horas: 9.1, estado: 'Presente' },
    { emp_id: 'EMP-003', fecha: '2026-03-17', ingreso: '07:50', salida: '17:00', horas: 9.2, estado: 'Presente' },
    { emp_id: 'EMP-003', fecha: '2026-03-18', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-003', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-004', fecha: '2026-03-16', ingreso: '07:55', salida: '17:00', horas: 9.1, estado: 'Presente' },
    { emp_id: 'EMP-004', fecha: '2026-03-17', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
    { emp_id: 'EMP-004', fecha: '2026-03-18', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-004', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-005', fecha: '2026-03-16', ingreso: '08:30', salida: '17:00', horas: 8.5, estado: 'Tardanza' },
    { emp_id: 'EMP-005', fecha: '2026-03-17', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-005', fecha: '2026-03-18', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-005', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    // EMP-002 Ana Rodríguez - Administradora
    { emp_id: 'EMP-002', fecha: '2026-03-16', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-002', fecha: '2026-03-17', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-002', fecha: '2026-03-18', ingreso: '08:10', salida: '17:30', horas: 9.3, estado: 'Tardanza' },
    { emp_id: 'EMP-002', fecha: '2026-03-19', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    // EMP-006 Carlos Lara - Control de Calidad
    { emp_id: 'EMP-006', fecha: '2026-03-16', ingreso: '07:50', salida: '17:00', horas: 9.2, estado: 'Presente' },
    { emp_id: 'EMP-006', fecha: '2026-03-17', ingreso: '07:55', salida: '17:00', horas: 9.1, estado: 'Presente' },
    { emp_id: 'EMP-006', fecha: '2026-03-18', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-006', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    // EMP-007 Rosa Quispe - Vendedora
    { emp_id: 'EMP-007', fecha: '2026-03-16', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-007', fecha: '2026-03-17', ingreso: '08:20', salida: '17:00', horas: 8.7, estado: 'Tardanza' },
    { emp_id: 'EMP-007', fecha: '2026-03-18', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-007', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    // EMP-008 Jorge Vargas - Vendedor
    { emp_id: 'EMP-008', fecha: '2026-03-16', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-008', fecha: '2026-03-17', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    { emp_id: 'EMP-008', fecha: '2026-03-18', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
    { emp_id: 'EMP-008', fecha: '2026-03-19', ingreso: '08:00', salida: '17:00', horas: 9.0, estado: 'Presente' },
    // EMP-009 Patricia Luna - Contadora
    { emp_id: 'EMP-009', fecha: '2026-03-16', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-009', fecha: '2026-03-17', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-009', fecha: '2026-03-18', ingreso: '08:00', salida: '17:30', horas: 9.5, estado: 'Presente' },
    { emp_id: 'EMP-009', fecha: '2026-03-19', ingreso: '08:05', salida: '17:30', horas: 9.4, estado: 'Tardanza' },
    // EMP-010 Alfredo Mora - Almacenero (Vacaciones)
    { emp_id: 'EMP-010', fecha: '2026-03-16', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
    { emp_id: 'EMP-010', fecha: '2026-03-17', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
    { emp_id: 'EMP-010', fecha: '2026-03-18', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
    { emp_id: 'EMP-010', fecha: '2026-03-19', ingreso: null, salida: null, horas: 0, estado: 'Falta' },
  ],

  planilla: [
    { emp_id: 'EMP-001', mes: 'Marzo 2026', sueldo_base: 4500, horas_extra: 450, bonos: 200, descuento_onp: 585, descuento_essalud: 405, neto: 4160 },
    { emp_id: 'EMP-002', mes: 'Marzo 2026', sueldo_base: 2200, horas_extra: 0, bonos: 100, descuento_onp: 286, descuento_essalud: 198, neto: 1816 },
    { emp_id: 'EMP-003', mes: 'Marzo 2026', sueldo_base: 2800, horas_extra: 280, bonos: 150, descuento_onp: 364, descuento_essalud: 252, neto: 2614 },
    { emp_id: 'EMP-004', mes: 'Marzo 2026', sueldo_base: 1800, horas_extra: 0, bonos: 0, descuento_onp: 234, descuento_essalud: 162, neto: 1404 },
    { emp_id: 'EMP-005', mes: 'Marzo 2026', sueldo_base: 1200, horas_extra: 0, bonos: 0, descuento_onp: 156, descuento_essalud: 108, neto: 936 },
    { emp_id: 'EMP-006', mes: 'Marzo 2026', sueldo_base: 1600, horas_extra: 160, bonos: 0, descuento_onp: 208, descuento_essalud: 144, neto: 1408 },
    { emp_id: 'EMP-007', mes: 'Marzo 2026', sueldo_base: 1500, horas_extra: 0, bonos: 300, descuento_onp: 195, descuento_essalud: 135, neto: 1470 },
    { emp_id: 'EMP-008', mes: 'Marzo 2026', sueldo_base: 1500, horas_extra: 0, bonos: 250, descuento_onp: 195, descuento_essalud: 135, neto: 1420 },
    { emp_id: 'EMP-009', mes: 'Marzo 2026', sueldo_base: 2500, horas_extra: 0, bonos: 0, descuento_onp: 325, descuento_essalud: 225, neto: 1950 },
    { emp_id: 'EMP-010', mes: 'Marzo 2026', sueldo_base: 1200, horas_extra: 0, bonos: 0, descuento_onp: 156, descuento_essalud: 108, neto: 936 },
  ],

  // ── USUARIOS / ADMIN ────────────────────────────────────
  usuarios: [
    { id: 'USR-001', nombre: 'Administrador Sistema', email: 'admin@citemadera.pe', rol: 'Administrador', area: 'Gerencia', estado: 'Activo', ultimo_acceso: HOY + ' 08:32' },
    { id: 'USR-002', nombre: 'Carlos Mendoza', email: 'cmendoza@citemadera.pe', rol: 'Gerente', area: 'Gerencia', estado: 'Activo', ultimo_acceso: HOY + ' 08:45' },
    { id: 'USR-003', nombre: 'Ana Rodríguez', email: 'arodriguez@citemadera.pe', rol: 'Administrador', area: 'Administración', estado: 'Activo', ultimo_acceso: _ayer + ' 17:20' },
    { id: 'USR-004', nombre: 'Rosa Quispe', email: 'rquispe@citemadera.pe', rol: 'Vendedor', area: 'Ventas', estado: 'Activo', ultimo_acceso: HOY + ' 09:10' },
    { id: 'USR-005', nombre: 'Patricia Luna', email: 'pluna@citemadera.pe', rol: 'Contador', area: 'Contabilidad', estado: 'Activo', ultimo_acceso: _ayer + ' 16:55' },
    { id: 'USR-006', nombre: 'Luis Paredes', email: 'lparedes@citemadera.pe', rol: 'Producción', area: 'Producción', estado: 'Activo', ultimo_acceso: HOY + ' 07:58' },
  ],

  roles: [
    { id: 'ROL-001', nombre: 'Administrador', descripcion: 'Acceso total al sistema', permisos: { dashboard: true, inventario: true, compras: true, ventas: true, produccion: true, costos: true, finanzas: true, rrhh: true, admin: true } },
    { id: 'ROL-002', nombre: 'Gerente', descripcion: 'Acceso a reportes y aprobaciones', permisos: { dashboard: true, inventario: true, compras: true, ventas: true, produccion: true, costos: true, finanzas: true, rrhh: true, admin: false } },
    { id: 'ROL-003', nombre: 'Vendedor', descripcion: 'Módulo de ventas y clientes', permisos: { dashboard: true, inventario: false, compras: false, ventas: true, produccion: false, costos: false, finanzas: false, rrhh: false, admin: false } },
    { id: 'ROL-004', nombre: 'Contador', descripcion: 'Finanzas y costos', permisos: { dashboard: true, inventario: false, compras: true, ventas: true, produccion: false, costos: true, finanzas: true, rrhh: false, admin: false } },
    { id: 'ROL-005', nombre: 'Producción', descripcion: 'Órdenes de producción e inventario', permisos: { dashboard: true, inventario: true, compras: false, ventas: false, produccion: true, costos: false, finanzas: false, rrhh: false, admin: false } },
  ],

  config_empresa: {
    nombre: 'CITE MADERA Trujillo',
    razon_social: 'Centro de Innovación Productiva y Transferencia Tecnológica MADERA SAC',
    ruc: '20601218999',
    direccion: 'Av. España 2010, Trujillo, La Libertad',
    telefono: '044-290100',
    email: 'informes@citemadera.gob.pe',
    web: 'www.citemadera.gob.pe',
    moneda: 'PEN',
    simbolo_moneda: 'S/',
    igv: 18,
    onp_pct: 13,
    essalud_pct: 9,
    logo_url: '',
  },

  // ── ACTIVIDAD RECIENTE ───────────────────────────────────
  actividad_reciente: [
    { tiempo: 'Hace 5 min', tipo: 'venta', descripcion: 'Nueva cotización COT-2026-010 creada para Municipalidad de Trujillo', icon: '<span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>', color: 'blue' },
    { tiempo: 'Hace 12 min', tipo: 'produccion', descripcion: 'OP-2026-006 pasó a estado QC - 60 pupitres listos para inspección', icon: '<span class="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>', color: 'indigo' },
    { tiempo: 'Hace 28 min', tipo: 'stock', descripcion: 'Alerta: Melamina Blanca 18mm bajó del stock mínimo (12/15)', icon: '<span class="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>', color: 'yellow' },
    { tiempo: 'Hace 1 h', tipo: 'cobro', descripcion: 'Factura FAC-2026-002 cobrada - S/ 3,776.00 de Restaurante El Buen Sabor', icon: '<span class="w-2 h-2 rounded-full bg-green-500 inline-block"></span>', color: 'green' },
    { tiempo: 'Hace 2 h', tipo: 'compra', descripcion: 'OC-2026-010 enviada para aprobación - S/ 1,850.00', icon: '<span class="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>', color: 'orange' },
    { tiempo: 'Hace 3 h', tipo: 'rrhh', descripcion: 'Pedro Soto registró falta injustificada el 17/03/2026', icon: '<span class="w-2 h-2 rounded-full bg-red-500 inline-block"></span>', color: 'red' },
    { tiempo: 'Ayer 16:30', tipo: 'produccion', descripcion: 'OP-2026-005 avance actualizado a 45% - Muebles de oficina UPN', icon: '<span class="w-2 h-2 rounded-full bg-purple-500 inline-block"></span>', color: 'indigo' },
    { tiempo: 'Ayer 14:00', tipo: 'venta', descripcion: 'COT-2026-009 enviada a Colegio San Agustín - S/ 11,328.00', icon: '<span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span>', color: 'blue' },
  ],

  alertas: [
    { tipo: 'danger', mensaje: 'Factura FAC-2026-004 vencida - S/ 2,180.00 pendiente de cobro', modulo: 'finanzas' },
    { tipo: 'warning', mensaje: 'Melamina Blanca 18mm: stock 12 uds (mínimo: 15)', modulo: 'inventario' },
    { tipo: 'warning', mensaje: 'Melamina Nogal 18mm: stock 8 uds (mínimo: 10)', modulo: 'inventario' },
    { tipo: 'warning', mensaje: 'Jaladora Barra Aluminio: stock 45 uds (mínimo: 50)', modulo: 'inventario' },
    { tipo: 'danger', mensaje: 'Clavos 2" sin cabeza: AGOTADO - requiere reposición urgente', modulo: 'inventario' },
    { tipo: 'info', mensaje: 'OC-2026-009 pendiente de aprobación desde hace 2 días', modulo: 'compras' },
  ],

  // ── AUDITORÍA ──────────────────────────────────────────────
  auditoria: [
    { tiempo: HOY + ' 08:32', usuario: 'admin@citemadera.pe', accion: 'Login exitoso', modulo: 'Sistema' },
    { tiempo: HOY + ' 08:35', usuario: 'arodriguez@citemadera.pe', accion: 'Cotización COT-2026-010 creada', modulo: 'Ventas' },
    { tiempo: HOY + ' 08:40', usuario: 'rquispe@citemadera.pe', accion: 'OP-2026-006 estado → QC', modulo: 'Producción' },
    { tiempo: _ayer + ' 17:20', usuario: 'pluna@citemadera.pe', accion: 'Factura FAC-2026-002 marcada cobrada', modulo: 'Finanzas' },
    { tiempo: _ayer + ' 16:55', usuario: 'cmendoza@citemadera.pe', accion: 'OC-2026-009 aprobada', modulo: 'Compras' },
    { tiempo: _ayer + ' 14:30', usuario: 'admin@citemadera.pe', accion: 'Usuario USR-006 editado: permisos actualizados', modulo: 'Admin' },
    { tiempo: _ayer + ' 11:15', usuario: 'lparedes@citemadera.pe', accion: 'Ajuste de inventario AJ-2026-004 - MAT-013 (-5 uds)', modulo: 'Inventario' },
    { tiempo: _ayer + ' 09:00', usuario: 'cmendoza@citemadera.pe', accion: 'Exportación reporte ventas Febrero 2026 (PDF)', modulo: 'Ventas' },
    { tiempo: _antier + ' 16:40', usuario: 'admin@citemadera.pe', accion: 'Configuración: tasa IGV verificada 18%', modulo: 'Sistema' },
    { tiempo: _antier + ' 10:20', usuario: 'pluna@citemadera.pe', accion: 'Cliente CLI-009 eliminado y restaurado', modulo: 'Ventas' },
  ],

  // ── KPIs (calculados en tiempo real) ─────────────────────
  getKPIs() {
    const facturas = this.facturas || [];
    const ventasMes = facturas.filter(f => f.estado !== 'Anulada').reduce((s, f) => s + f.total, 0);
    const ventasMesAnterior = 41500; // baseline histórico
    const cotActivas = (this.cotizaciones || []).filter(c => ['Borrador', 'Enviada', 'Aprobada'].includes(c.estado)).length;
    const totalCots = (this.cotizaciones || []).length;
    const cotAprobadas = (this.cotizaciones || []).filter(c => c.estado === 'Aprobada').length;
    const cotEfectividad = totalCots > 0 ? Math.round((cotAprobadas / totalCots) * 100) : 0;
    const opsActivas = (this.ordenes_produccion || []).filter(op => ['Planificada', 'En Proceso', 'QC'].includes(op.estado)).length;
    const opsCompletadas = (this.ordenes_produccion || []).filter(op => op.estado === 'Completada').length;
    const alertasStock = (this.materiales || []).filter(m => m.stock <= (m.min_stock || m.stock_minimo || 0)).length;

    // Costos y márgenes
    const costos = this.getCostosProductos();
    const totalCostos = costos.reduce((s, c) => s + c.costo_real, 0);
    const margenBruto = ventasMes > 0 ? Math.round(((ventasMes - totalCostos) / ventasMes) * 100) : 0;

    // Finanzas
    const rf = this.resumen_finanzas || {};
    const saldoCaja = rf.saldo_disponible || 0;
    const porCobrar = (this.cuentas_cobrar || []).filter(c => c.estado !== 'Cobrada').reduce((s, c) => s + c.monto, 0);
    const porPagar = (this.cuentas_pagar || []).filter(c => c.estado !== 'Pagada').reduce((s, c) => s + c.monto, 0);

    // Producción
    const opsTerminadas = (this.ordenes_produccion || []).filter(op => op.estado === 'Completada');
    const opsConEntrega = opsTerminadas.filter(op => op.fecha_fin);
    const entregasTiempo = opsConEntrega.length > 0 ? Math.round((opsConEntrega.filter(op => new Date(op.fecha_fin) <= new Date(op.fecha_fin)).length / opsConEntrega.length) * 100) : 87;
    const eficiencia = opsTerminadas.length > 0 ? Math.round(opsTerminadas.reduce((s, op) => s + (op.avance || 100), 0) / opsTerminadas.length) : 92;

    return {
      ventas_mes: Math.round(ventasMes * 100) / 100,
      ventas_mes_anterior: ventasMesAnterior,
      cotizaciones_activas: cotActivas,
      cotizaciones_efectividad: cotEfectividad,
      ops_activas: opsActivas,
      ops_completadas_mes: opsCompletadas,
      alertas_stock: alertasStock,
      margen_bruto: margenBruto,
      entregas_tiempo: entregasTiempo,
      eficiencia_produccion: eficiencia,
      saldo_caja: saldoCaja,
      por_cobrar: Math.round(porCobrar * 100) / 100,
      por_pagar: Math.round(porPagar * 100) / 100,
    };
  },

  // ── RESUMEN COSTOS (calculado en tiempo real) ────────────
  // ── Genera costos_productos dinamicamente desde hojas_costo ──
  getCostosProductos() {
    return this.productos.map(p => {
      const c = this.getCostoProducto(p.id);
      return {
        producto_id: p.id, nombre: p.nombre,
        costo_std: p.costo_std,
        costo_real: c ? c.costoProduccion : 0,
        materia_prima: c ? c.mpd : 0,
        mano_obra: c ? c.mod : 0,
        gastos_ind: c ? (c.cif + c.servicios) : 0,
      };
    });
  },

  getResumenCostos() {
    const facturas = this.facturas || [];
    const totalVentas = facturas.filter(f => f.estado !== 'Anulada').reduce((s, f) => s + f.total, 0);

    // Calculate from hojas_costo (real calculated data)
    let totalMPD = 0, totalMOD = 0, totalCIF = 0;
    this.productos.forEach(p => {
      const c = this.getCostoProducto(p.id);
      if (c) { totalMPD += c.mpd; totalMOD += c.mod; totalCIF += c.cif + c.servicios; }
    });
    const cpTotal = totalMPD + totalMOD + totalCIF;

    // Gastos operativos reales
    const goTotal = this.gastos_operativos.reduce((s, g) => s + g.monto_mensual, 0);
    // Personal
    const costoPersonal = this.getCostoPersonalMensual();

    const ratioGoCp = cpTotal > 0 ? Math.round((goTotal / cpTotal) * 100) : 0;
    const margenBruto = totalVentas > 0 ? Math.round(((totalVentas - cpTotal) / totalVentas) * 100) : 0;
    const empActivos = this.empleados.filter(e => e.estado === 'Activo').length;
    const costoPorEmpleado = empActivos > 0 ? Math.round(costoPersonal.total / empActivos) : 0;

    const totalReal = cpTotal || 1;
    const pctMPD = Math.round((totalMPD / totalReal) * 100);
    const pctMOD = Math.round((totalMOD / totalReal) * 100);
    const pctCIF = 100 - pctMPD - pctMOD;

    return {
      total_ventas: totalVentas,
      total_costos: cpTotal,
      go_total: goTotal,
      cp_total: cpTotal,
      costo_personal: costoPersonal.total,
      ratio_go_cp: ratioGoCp,
      margen_bruto: margenBruto,
      costo_por_empleado: costoPorEmpleado,
      semaforo_go_cp: ratioGoCp > 150 ? 'rojo' : ratioGoCp > 100 ? 'amarillo' : 'verde',
      semaforo_margen: margenBruto >= 35 ? 'verde' : margenBruto >= 25 ? 'amarillo' : 'rojo',
      semaforo_costo_emp: costoPorEmpleado <= 2500 ? 'verde' : costoPorEmpleado <= 3500 ? 'amarillo' : 'rojo',
      breakdown: { materia_prima: pctMPD, mano_obra: pctMOD, gastos_ind: pctCIF },
    };
  },

  // ── ACTIVIDAD RECIENTE HELPER ──────────────────────────
  logActividad(tipo, descripcion, modulo) {
    const iconColors = {
      venta: 'blue', produccion: 'purple', stock: 'yellow',
      cobro: 'green', compra: 'orange', rrhh: 'red', sistema: 'gray',
    };
    const color = iconColors[tipo] || 'gray';
    this.actividad_reciente.unshift({
      tiempo: 'Hace un momento',
      tipo: tipo,
      descripcion: descripcion,
      icon: '<span class="w-2 h-2 rounded-full bg-' + color + '-500 inline-block"></span>',
      color: color,
    });
    // Keep max 20 entries
    if (this.actividad_reciente.length > 20) {
      this.actividad_reciente.length = 20;
    }
  },

  // ── DEPRECIACION DE MAQUINAS Y HERRAMIENTAS ─────────────
  depreciacion: [
    { id: 'DEP-001', descripcion: 'Amoladora DWALT 230v 900W', valor_inicial: 199.00, valor_residual: 24.88, anios: 8, cantidad: 1, dep_mensual: 1.81 },
    { id: 'DEP-002', descripcion: 'Atornillador 20v DeWalt', valor_inicial: 639.00, valor_residual: 63.90, anios: 10, cantidad: 1, dep_mensual: 4.79 },
    { id: 'DEP-003', descripcion: 'Atornillador DeWalt 12v', valor_inicial: 500.00, valor_residual: 50.00, anios: 10, cantidad: 1, dep_mensual: 3.75 },
    { id: 'DEP-004', descripcion: 'Caladora BOSCH 220-230v 710W', valor_inicial: 490.00, valor_residual: 61.25, anios: 8, cantidad: 1, dep_mensual: 4.47 },
    { id: 'DEP-005', descripcion: 'Compresora PITBULL 20 LIT 1 HP', valor_inicial: 699.00, valor_residual: 87.38, anios: 8, cantidad: 1, dep_mensual: 6.37 },
    { id: 'DEP-006', descripcion: 'Esmeril', valor_inicial: 500.00, valor_residual: 25.00, anios: 20, cantidad: 1, dep_mensual: 1.98 },
    { id: 'DEP-007', descripcion: 'Sierra Circular BOSCH 2000W', valor_inicial: 699.00, valor_residual: 69.90, anios: 10, cantidad: 1, dep_mensual: 5.24 },
    { id: 'DEP-008', descripcion: 'Taladro BOSCH 220v 750W', valor_inicial: 129.00, valor_residual: 12.90, anios: 10, cantidad: 1, dep_mensual: 0.97 },
    { id: 'DEP-009', descripcion: 'Cepilladora Industrial 15"', valor_inicial: 8500.00, valor_residual: 850.00, anios: 10, cantidad: 1, dep_mensual: 63.75 },
    { id: 'DEP-010', descripcion: 'Router CNC 4x8 pies', valor_inicial: 25000.00, valor_residual: 2500.00, anios: 10, cantidad: 1, dep_mensual: 187.50 },
  ],

  // ── GASTOS OPERATIVOS ──────────────────────────────────
  gastos_operativos: [
    // Produccion
    { id: 'GO-001', grupo: 'Produccion', descripcion: 'Afilado de cuchillas y discos', monto_mensual: 38.26 },
    { id: 'GO-002', grupo: 'Produccion', descripcion: 'Agua taller', monto_mensual: 35.00 },
    { id: 'GO-003', grupo: 'Produccion', descripcion: 'Alquiler de local', monto_mensual: 1500.00 },
    { id: 'GO-004', grupo: 'Produccion', descripcion: 'Arbitrios taller', monto_mensual: 66.60 },
    { id: 'GO-005', grupo: 'Produccion', descripcion: 'EPPs trabajadores', monto_mensual: 50.00 },
    { id: 'GO-006', grupo: 'Produccion', descripcion: 'Incentivos festivos', monto_mensual: 104.16 },
    { id: 'GO-007', grupo: 'Produccion', descripcion: 'Internet taller', monto_mensual: 80.00 },
    { id: 'GO-008', grupo: 'Produccion', descripcion: 'Luz taller', monto_mensual: 150.00 },
    { id: 'GO-009', grupo: 'Produccion', descripcion: 'Mantenimiento maquinas', monto_mensual: 66.60 },
    // Administracion
    { id: 'GO-010', grupo: 'Administracion', descripcion: 'Consultorias capacitaciones', monto_mensual: 83.30 },
    { id: 'GO-011', grupo: 'Administracion', descripcion: 'Contadora', monto_mensual: 400.00 },
    { id: 'GO-012', grupo: 'Administracion', descripcion: 'Hosting de pagina web', monto_mensual: 38.30 },
    { id: 'GO-013', grupo: 'Administracion', descripcion: 'Incentivos festivos', monto_mensual: 104.16 },
    { id: 'GO-014', grupo: 'Administracion', descripcion: 'Membresia software facturacion', monto_mensual: 80.00 },
    { id: 'GO-015', grupo: 'Administracion', descripcion: 'Publicidad y marketing', monto_mensual: 1800.00 },
    { id: 'GO-016', grupo: 'Administracion', descripcion: 'Utensilios de limpieza', monto_mensual: 50.00 },
    { id: 'GO-017', grupo: 'Administracion', descripcion: 'Utiles de oficina', monto_mensual: 50.00 },
  ],

  // ── HOJAS DE COSTO POR PRODUCTO (receta/estructura) ────
  hojas_costo: [
    {
      id: 'HC-001', producto_id: 'PRD-001', nombre: 'Mueble de Oficina Modular',
      materiales: [
        { material_id: 'MAT-001', consumo: 3.0, unidad: 'Plancha', costo_unit: 52.00 },
        { material_id: 'MAT-002', consumo: 2.0, unidad: 'Plancha', costo_unit: 68.50 },
        { material_id: 'MAT-005', consumo: 8.0, unidad: 'Unidad', costo_unit: 3.50 },
        { material_id: 'MAT-006', consumo: 4.0, unidad: 'Par', costo_unit: 12.00 },
        { material_id: 'MAT-007', consumo: 1.5, unidad: 'Ciento', costo_unit: 4.50 },
        { material_id: 'MAT-013', consumo: 6.0, unidad: 'Unidad', costo_unit: 6.50 },
        { material_id: 'MAT-014', consumo: 12.0, unidad: 'Metro', costo_unit: 0.90 },
        { material_id: 'MAT-009', consumo: 0.5, unidad: 'Galon', costo_unit: 45.00 },
        { material_id: 'MAT-010', consumo: 0.3, unidad: 'Galon', costo_unit: 38.00 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Corte de tableros', tipo: 'Fijo', operario_id: 'EMP-003', duracion: 3, unidad_tiempo: 'horas', costo: 40.83 },
        { nro: 2, proceso: 'Enchapado cantos', tipo: 'Jornal', operario_id: 'EMP-011', duracion: 2, unidad_tiempo: 'horas', costo: 17.00 },
        { nro: 3, proceso: 'Armado y ensamble', tipo: 'Fijo', operario_id: 'EMP-004', duracion: 8, unidad_tiempo: 'horas', costo: 69.23 },
        { nro: 4, proceso: 'Lijado y preparacion', tipo: 'Jornal', operario_id: 'EMP-012', duracion: 4, unidad_tiempo: 'horas', costo: 28.00 },
        { nro: 5, proceso: 'Lacado y acabado', tipo: 'Destajo', operario_id: 'EMP-015', duracion: 1, unidad_tiempo: 'unidad', costo: 30.00 },
        { nro: 6, proceso: 'Instalacion herrajes', tipo: 'Jornal', operario_id: 'EMP-013', duracion: 3, unidad_tiempo: 'horas', costo: 18.75 },
        { nro: 7, proceso: 'Control de calidad', tipo: 'Fijo', operario_id: 'EMP-006', duracion: 1, unidad_tiempo: 'horas', costo: 12.31 },
      ],
      servicios: [
        { servicio_id: 'SRV-001', descripcion: 'Transporte interno', costo: 25.00, responsable_id: 'EMP-010' },
        { servicio_id: 'SRV-003', descripcion: 'Servicio de secado', costo: 15.00, responsable_id: '' },
      ],
    },
    {
      id: 'HC-002', producto_id: 'PRD-002', nombre: 'Cama Matrimonial Tornillo',
      materiales: [
        { material_id: 'MAT-011', consumo: 3.5, unidad: 'Unidad', costo_unit: 18.50 },
        { material_id: 'MAT-009', consumo: 0.5, unidad: 'Galon', costo_unit: 45.00 },
        { material_id: 'MAT-010', consumo: 0.5, unidad: 'Galon', costo_unit: 38.00 },
        { material_id: 'MAT-007', consumo: 0.8, unidad: 'Ciento', costo_unit: 4.50 },
        { material_id: 'MAT-005', consumo: 6.0, unidad: 'Unidad', costo_unit: 3.50 },
        { material_id: 'MAT-015', consumo: 0.5, unidad: 'Metro', costo_unit: 15.00 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Corte y habilitado', tipo: 'Fijo', operario_id: 'EMP-003', duracion: 4, unidad_tiempo: 'horas', costo: 54.44 },
        { nro: 2, proceso: 'Ensamble estructura', tipo: 'Fijo', operario_id: 'EMP-004', duracion: 6, unidad_tiempo: 'horas', costo: 51.92 },
        { nro: 3, proceso: 'Lijado y masillado', tipo: 'Jornal', operario_id: 'EMP-011', duracion: 3, unidad_tiempo: 'horas', costo: 25.50 },
        { nro: 4, proceso: 'Acabado final', tipo: 'Destajo', operario_id: 'EMP-015', duracion: 1, unidad_tiempo: 'unidad', costo: 30.00 },
      ],
      servicios: [
        { servicio_id: 'SRV-003', descripcion: 'Secado de madera', costo: 20.00, responsable_id: '' },
      ],
    },
    {
      id: 'HC-003', producto_id: 'PRD-003', nombre: 'Closet Empotrado Melamina',
      materiales: [
        { material_id: 'MAT-002', consumo: 4.0, unidad: 'Plancha', costo_unit: 68.50 },
        { material_id: 'MAT-003', consumo: 1.0, unidad: 'Plancha', costo_unit: 72.00 },
        { material_id: 'MAT-005', consumo: 12.0, unidad: 'Unidad', costo_unit: 3.50 },
        { material_id: 'MAT-006', consumo: 6.0, unidad: 'Par', costo_unit: 12.00 },
        { material_id: 'MAT-013', consumo: 8.0, unidad: 'Unidad', costo_unit: 6.50 },
        { material_id: 'MAT-014', consumo: 20.0, unidad: 'Metro', costo_unit: 0.90 },
        { material_id: 'MAT-007', consumo: 2.0, unidad: 'Ciento', costo_unit: 4.50 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Corte CNC', tipo: 'Fijo', operario_id: 'EMP-003', duracion: 2, unidad_tiempo: 'horas', costo: 27.22 },
        { nro: 2, proceso: 'Enchapado cantos', tipo: 'Jornal', operario_id: 'EMP-012', duracion: 4, unidad_tiempo: 'horas', costo: 28.00 },
        { nro: 3, proceso: 'Armado modulos', tipo: 'Fijo', operario_id: 'EMP-004', duracion: 8, unidad_tiempo: 'horas', costo: 69.23 },
        { nro: 4, proceso: 'Instalacion in situ', tipo: 'Fijo', operario_id: 'EMP-005', duracion: 6, unidad_tiempo: 'horas', costo: 36.92 },
        { nro: 5, proceso: 'Herrajes y acabado', tipo: 'Jornal', operario_id: 'EMP-013', duracion: 3, unidad_tiempo: 'horas', costo: 18.75 },
      ],
      servicios: [
        { servicio_id: 'SRV-002', descripcion: 'Transporte a obra', costo: 80.00, responsable_id: 'EMP-010' },
        { servicio_id: 'SRV-005', descripcion: 'Instalacion electrica (focos)', costo: 35.00, responsable_id: '' },
      ],
    },
    {
      id: 'HC-004', producto_id: 'PRD-004', nombre: 'Cocina Integral 3m',
      materiales: [
        { material_id: 'MAT-002', consumo: 6.0, unidad: 'Plancha', costo_unit: 68.50 },
        { material_id: 'MAT-004', consumo: 2.0, unidad: 'Plancha', costo_unit: 28.00 },
        { material_id: 'MAT-005', consumo: 20.0, unidad: 'Unidad', costo_unit: 3.50 },
        { material_id: 'MAT-006', consumo: 8.0, unidad: 'Par', costo_unit: 12.00 },
        { material_id: 'MAT-013', consumo: 12.0, unidad: 'Unidad', costo_unit: 6.50 },
        { material_id: 'MAT-014', consumo: 30.0, unidad: 'Metro', costo_unit: 0.90 },
        { material_id: 'MAT-007', consumo: 3.0, unidad: 'Ciento', costo_unit: 4.50 },
        { material_id: 'MAT-012', consumo: 1.0, unidad: 'Litro', costo_unit: 22.00 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Diseno y corte', tipo: 'Fijo', operario_id: 'EMP-003', duracion: 4, unidad_tiempo: 'horas', costo: 54.44 },
        { nro: 2, proceso: 'Enchapado', tipo: 'Jornal', operario_id: 'EMP-011', duracion: 5, unidad_tiempo: 'horas', costo: 42.50 },
        { nro: 3, proceso: 'Armado modulos', tipo: 'Fijo', operario_id: 'EMP-004', duracion: 12, unidad_tiempo: 'horas', costo: 103.85 },
        { nro: 4, proceso: 'Instalacion in situ', tipo: 'Fijo', operario_id: 'EMP-005', duracion: 8, unidad_tiempo: 'horas', costo: 49.23 },
        { nro: 5, proceso: 'Plomeria y conexiones', tipo: 'Jornal', operario_id: 'EMP-013', duracion: 4, unidad_tiempo: 'horas', costo: 25.00 },
        { nro: 6, proceso: 'Acabado y limpieza', tipo: 'Jornal', operario_id: 'EMP-012', duracion: 3, unidad_tiempo: 'horas', costo: 21.00 },
      ],
      servicios: [
        { servicio_id: 'SRV-002', descripcion: 'Transporte a obra', costo: 120.00, responsable_id: 'EMP-010' },
        { servicio_id: 'SRV-004', descripcion: 'Encimera granito (externo)', costo: 350.00, responsable_id: '' },
      ],
    },
    {
      id: 'HC-005', producto_id: 'PRD-005', nombre: 'Mesa Restaurante Madera',
      materiales: [
        { material_id: 'MAT-011', consumo: 2.0, unidad: 'Unidad', costo_unit: 18.50 },
        { material_id: 'MAT-009', consumo: 0.2, unidad: 'Galon', costo_unit: 45.00 },
        { material_id: 'MAT-010', consumo: 0.15, unidad: 'Galon', costo_unit: 38.00 },
        { material_id: 'MAT-007', consumo: 0.3, unidad: 'Ciento', costo_unit: 4.50 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Corte y habilitado', tipo: 'Fijo', operario_id: 'EMP-003', duracion: 1.5, unidad_tiempo: 'horas', costo: 20.42 },
        { nro: 2, proceso: 'Torneado patas', tipo: 'Fijo', operario_id: 'EMP-004', duracion: 2, unidad_tiempo: 'horas', costo: 17.31 },
        { nro: 3, proceso: 'Ensamble y lijado', tipo: 'Jornal', operario_id: 'EMP-011', duracion: 2, unidad_tiempo: 'horas', costo: 17.00 },
        { nro: 4, proceso: 'Acabado', tipo: 'Destajo', operario_id: 'EMP-015', duracion: 1, unidad_tiempo: 'unidad', costo: 15.00 },
      ],
      servicios: [],
    },
    {
      id: 'HC-006', producto_id: 'PRD-006', nombre: 'Pupitre Escolar',
      materiales: [
        { material_id: 'MAT-004', consumo: 0.5, unidad: 'Plancha', costo_unit: 28.00 },
        { material_id: 'MAT-011', consumo: 0.8, unidad: 'Unidad', costo_unit: 18.50 },
        { material_id: 'MAT-007', consumo: 0.2, unidad: 'Ciento', costo_unit: 4.50 },
        { material_id: 'MAT-009', consumo: 0.1, unidad: 'Galon', costo_unit: 45.00 },
      ],
      mano_obra: [
        { nro: 1, proceso: 'Corte', tipo: 'Jornal', operario_id: 'EMP-013', duracion: 0.5, unidad_tiempo: 'horas', costo: 3.13 },
        { nro: 2, proceso: 'Ensamble', tipo: 'Jornal', operario_id: 'EMP-011', duracion: 1, unidad_tiempo: 'horas', costo: 8.50 },
        { nro: 3, proceso: 'Acabado', tipo: 'Jornal', operario_id: 'EMP-012', duracion: 0.5, unidad_tiempo: 'horas', costo: 3.50 },
      ],
      servicios: [],
    },
  ],

  // ── SEDES ───────────────────────────────────────────────
  sedes: [
    { id: 'SEDE-001', nombre: 'Planta Principal', direccion: 'Av. Industrial 1250, Trujillo', ciudad: 'Trujillo', activo: true },
    { id: 'SEDE-002', nombre: 'Sucursal La Esperanza', direccion: 'Calle Los Pinos 340, La Esperanza', ciudad: 'La Esperanza', activo: true },
    { id: 'SEDE-003', nombre: 'Punto de Venta Centro', direccion: 'Jr. Pizarro 620, Trujillo', ciudad: 'Trujillo', activo: true },
  ],

  // ── ALMACENES ──────────────────────────────────────────
  almacenes: [
    { id: 'ALM-001', sede_id: 'SEDE-001', nombre: 'Almacen A - Tableros', tipo: 'Materia Prima', responsable: 'Carlos M.', activo: true },
    { id: 'ALM-002', sede_id: 'SEDE-001', nombre: 'Almacen B - Herrajes y Consumibles', tipo: 'Materia Prima', responsable: 'Alfredo M.', activo: true },
    { id: 'ALM-003', sede_id: 'SEDE-001', nombre: 'Almacen C - Acabados', tipo: 'Materia Prima', responsable: 'Pedro S.', activo: true },
    { id: 'ALM-004', sede_id: 'SEDE-001', nombre: 'Almacen Producto Terminado', tipo: 'Producto Terminado', responsable: 'Luis P.', activo: true },
    { id: 'ALM-005', sede_id: 'SEDE-002', nombre: 'Almacen General La Esperanza', tipo: 'General', responsable: 'Marco D.', activo: true },
    { id: 'ALM-006', sede_id: 'SEDE-003', nombre: 'Deposito Punto de Venta', tipo: 'Exhibicion', responsable: 'Ana R.', activo: true },
  ],

  // Helpers
  getProveedor(id) { return this.proveedores.find(p => p.id === id) || {}; },
  getCliente(id) { return this.clientes.find(c => c.id === id) || {}; },
  getMaterial(id) { return this.materiales.find(m => m.id === id) || {}; },
  getEmpleado(id) { return this.empleados.find(e => e.id === id) || {}; },
  getProducto(id) { return this.productos.find(p => p.id === id) || {}; },
  getSede(id) { return this.sedes.find(s => s.id === id) || {}; },
  getAlmacen(id) { return this.almacenes.find(a => a.id === id) || {}; },
  getAlmacenesBySede(sedeId) { return this.almacenes.filter(a => a.sede_id === sedeId && a.activo); },
  getUbicacionLabel(almId) {
    const alm = this.getAlmacen(almId);
    if (!alm.id) return almId || 'Sin asignar';
    const sede = this.getSede(alm.sede_id);
    return `${alm.nombre} — ${sede.nombre || ''}`;
  },
  getHojaCosto(productoId) { return this.hojas_costo.find(h => h.producto_id === productoId) || null; },
  getProceso(id) { return this.procesos_produccion.find(p => p.id === id) || {}; },
  getServicio(id) { return this.servicios_produccion.find(s => s.id === id) || {}; },

  // ── CALCULO: Costo hora de un empleado ──
  getCostoHora(empId) {
    const emp = this.getEmpleado(empId);
    if (!emp.id) return 0;
    if (emp.tipo_personal === 'Jornal') return emp.tarifa_hora || 0;
    if (emp.tipo_personal === 'Destajo') return emp.tarifa_pieza || 0;
    // Fijo: sueldo mensual / 208 horas efectivas (26 dias x 8h)
    return emp.sueldo ? Math.round(emp.sueldo / 208 * 100) / 100 : 0;
  },

  // ── CALCULO: Costo de un proceso con operario ──
  calcCostoProceso(procesoId, operarioId, horas) {
    const proc = this.getProceso(procesoId);
    const emp = this.getEmpleado(operarioId || proc.operario_default);
    const h = horas || proc.horas_estandar || 1;
    const costoHora = this.getCostoHora(emp.id);
    if (emp.tipo_personal === 'Destajo') return { horas: h, costo: costoHora, operarioId: emp.id };
    return { horas: h, costo: Math.round(costoHora * h * 100) / 100, operarioId: emp.id };
  },

  // ── CALCULO: CIF mensual total ──
  getCIFMensual() {
    const depTotal = this.depreciacion.reduce((s, d) => s + (d.dep_mensual * d.cantidad), 0);
    const goProduccion = this.gastos_operativos.filter(g => g.grupo === 'Produccion').reduce((s, g) => s + g.monto_mensual, 0);
    return { depreciacion: depTotal, gastos_produccion: goProduccion, total: depTotal + goProduccion };
  },

  // ── CALCULO: Costo completo de un producto ──
  getCostoProducto(productoId) {
    const hoja = this.getHojaCosto(productoId);
    if (!hoja) return null;
    const prod = this.getProducto(productoId);

    // ── COSTOS DIRECTOS ──
    const mpd = hoja.materiales.reduce((s, m) => s + m.consumo * m.costo_unit, 0);
    const mod = hoja.mano_obra.reduce((s, m) => s + m.costo, 0);
    const servicios = hoja.servicios.reduce((s, sv) => s + sv.costo, 0);
    const totalCostosDirectos = mpd + mod + servicios;

    // ── CIF (Costos Indirectos de Fabricacion) = Depreciacion + Gastos Produccion ──
    const cifData = this.getCIFMensual();
    const thisHoras = hoja.mano_obra.reduce((s, m) => s + (m.unidad_tiempo === 'horas' ? m.duracion : 0), 0);
    let totalHorasTodas = 0;
    this.hojas_costo.forEach(h => { h.mano_obra.forEach(m => { if (m.unidad_tiempo === 'horas') totalHorasTodas += m.duracion; }); });
    const ratio = totalHorasTodas > 0 ? thisHoras / totalHorasTodas : 0;
    const cifDepreciacion = cifData.depreciacion * ratio;
    const cifGastosProd = cifData.gastos_produccion * ratio;
    const cif = cifDepreciacion + cifGastosProd;

    // ── COSTO DE PRODUCCION ──
    const costoProduccion = totalCostosDirectos + cif;

    // ── PRICING (flujo: CP → margen → precio sugerido → precio real → margen real) ──
    const margenEsperado = prod.margen_esperado || 50;
    // Valor venta esperado = CP / (1 - margen/100)
    const valorVentaEsperado = margenEsperado < 100 ? costoProduccion / (1 - margenEsperado / 100) : costoProduccion * 2;
    // Precio venta esperado con IGV
    const precioVentaEsperado = Math.round(valorVentaEsperado * 1.18 * 100) / 100;
    // Precio real (puede ser diferente al sugerido — lo fija el usuario)
    // Si precio_venta_real > 0 = usuario lo fijo manualmente; si es 0/null = usar sugerido
    const precioVentaReal = (prod.precio_venta_real && prod.precio_venta_real > 0) ? prod.precio_venta_real : precioVentaEsperado;
    // Valor venta real sin IGV
    const valorVentaReal = precioVentaReal / 1.18;
    // Margen real = (valor venta real - CP) / valor venta real
    const margenReal = valorVentaReal > 0 ? Math.round(((valorVentaReal - costoProduccion) / valorVentaReal) * 10000) / 100 : 0;
    // GA (Gastos Administrativos asignados — proporcional a horas de produccion)
    const goAdmin = this.gastos_operativos.filter(g => g.grupo === 'Administracion').reduce((s, g) => s + g.monto_mensual, 0);
    const ga = Math.round((totalHorasTodas > 0 ? goAdmin * ratio : 0) * 100) / 100;

    return {
      // Costos
      mpd, mod, servicios, totalCostosDirectos,
      cifDepreciacion, cifGastosProd, cif,
      costoProduccion, ga,
      // Pricing
      margenEsperado, valorVentaEsperado, precioVentaEsperado,
      precioVentaReal, valorVentaReal, margenReal,
      // Meta
      horasProduccion: thisHoras, ratio,
      totalMateriales: hoja.materiales.length,
      totalProcesos: hoja.mano_obra.length,
    };
  },

  // ── CALCULO: Costo personal por tipo ──
  getCostoPersonalMensual() {
    const fijo = this.empleados.filter(e => e.tipo_personal === 'Fijo' && e.estado === 'Activo').reduce((s, e) => s + e.sueldo, 0);
    const jornal = this.empleados.filter(e => e.tipo_personal === 'Jornal' && e.estado === 'Activo').reduce((s, e) => s + (e.tarifa_hora * e.horas_periodo * e.frecuencia_mensual / 4), 0);
    return { fijo, jornal, total: fijo + jornal };
  },
};
