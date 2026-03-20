// ============================================================
// DATA.JS - Mock Data for ERPEmprendedor CITE MADERA
// ============================================================

const HOY = new Date().toISOString().split('T')[0];
const _ayer = (() => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().split('T')[0]; })();
const _antier = (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d.toISOString().split('T')[0]; })();

const AppData = {

  // ── CATEGORIAS ──────────────────────────────────────────
  categorias: ['Tableros', 'Herrajes', 'Acabados', 'Consumibles', 'Madera Sólida'],

  // ── MATERIALES / INVENTARIO ──────────────────────────────
  materiales: [
    { id: 'MAT-001', codigo: 'MAT-001', nombre: 'MDF 15mm 244x122cm', categoria: 'Tableros', stock: 45, min_stock: 20, unidad: 'Plancha', precio_unit: 52.00, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-1', estado: 'OK' },
    { id: 'MAT-002', codigo: 'MAT-002', nombre: 'Melamina Blanca 18mm', categoria: 'Tableros', stock: 12, min_stock: 15, unidad: 'Plancha', precio_unit: 68.50, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-2', estado: 'Stock Bajo' },
    { id: 'MAT-003', codigo: 'MAT-003', nombre: 'Melamina Nogal 18mm', categoria: 'Tableros', stock: 8, min_stock: 10, unidad: 'Plancha', precio_unit: 72.00, proveedor_id: 'PRV-001', ubicacion: 'Almacén A-2', estado: 'Stock Bajo' },
    { id: 'MAT-004', codigo: 'MAT-004', nombre: 'Triplay 4mm 244x122cm', categoria: 'Tableros', stock: 30, min_stock: 15, unidad: 'Plancha', precio_unit: 28.00, proveedor_id: 'PRV-002', ubicacion: 'Almacén A-3', estado: 'OK' },
    { id: 'MAT-005', codigo: 'MAT-005', nombre: 'Bisagra Soft-Close 35mm', categoria: 'Herrajes', stock: 240, min_stock: 100, unidad: 'Unidad', precio_unit: 3.50, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'OK' },
    { id: 'MAT-006', codigo: 'MAT-006', nombre: 'Corredera Telescópica 45cm', categoria: 'Herrajes', stock: 60, min_stock: 50, unidad: 'Par', precio_unit: 12.00, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'OK' },
    { id: 'MAT-007', codigo: 'MAT-007', nombre: 'Tornillo Aglomerado 3.5x30', categoria: 'Consumibles', stock: 1200, min_stock: 500, unidad: 'Ciento', precio_unit: 4.50, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-2', estado: 'OK' },
    { id: 'MAT-008', codigo: 'MAT-008', nombre: 'Clavos 2" sin cabeza', categoria: 'Consumibles', stock: 80, min_stock: 100, unidad: 'Kg', precio_unit: 8.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-2', estado: 'Agotado' },
    { id: 'MAT-009', codigo: 'MAT-009', nombre: 'Laca Nitrocelulósica Brillante', categoria: 'Acabados', stock: 25, min_stock: 10, unidad: 'Galón', precio_unit: 45.00, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-1', estado: 'OK' },
    { id: 'MAT-010', codigo: 'MAT-010', nombre: 'Sellador de Madera', categoria: 'Acabados', stock: 15, min_stock: 8, unidad: 'Galón', precio_unit: 38.00, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-1', estado: 'OK' },
    { id: 'MAT-011', codigo: 'MAT-011', nombre: 'Madera Tornillo 2x4x10', categoria: 'Madera Sólida', stock: 55, min_stock: 30, unidad: 'Unidad', precio_unit: 18.50, proveedor_id: 'PRV-002', ubicacion: 'Almacén A-4', estado: 'OK' },
    { id: 'MAT-012', codigo: 'MAT-012', nombre: 'Pegamento PVC Transparente', categoria: 'Consumibles', stock: 18, min_stock: 10, unidad: 'Litro', precio_unit: 22.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK' },
    { id: 'MAT-013', codigo: 'MAT-013', nombre: 'Jaladera Barra Aluminio 96mm', categoria: 'Herrajes', stock: 45, min_stock: 50, unidad: 'Unidad', precio_unit: 6.50, proveedor_id: 'PRV-003', ubicacion: 'Almacén B-1', estado: 'Stock Bajo' },
    { id: 'MAT-014', codigo: 'MAT-014', nombre: 'Canto PVC Melamina Blanco 22mm', categoria: 'Acabados', stock: 320, min_stock: 100, unidad: 'Metro', precio_unit: 0.90, proveedor_id: 'PRV-005', ubicacion: 'Almacén C-2', estado: 'OK' },
    { id: 'MAT-015', codigo: 'MAT-015', nombre: 'Fibra de Vidrio 600gr/m2', categoria: 'Consumibles', stock: 8, min_stock: 5, unidad: 'Metro', precio_unit: 15.00, proveedor_id: 'PRV-004', ubicacion: 'Almacén B-3', estado: 'OK' },
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
    { id: 'PRV-001', nombre: 'Tableros del Norte SAC', ruc: '20451234567', contacto: 'Jorge Ramírez', email: 'jramirez@tablasnorte.com', telefono: '044-281234', ciudad: 'Trujillo', rating: 5, categoria: 'Tableros', credito_dias: 30 },
    { id: 'PRV-002', nombre: 'Maderería Amazónica EIRL', ruc: '20512345678', contacto: 'Rosa Huanca', email: 'rhuanca@madereria.pe', telefono: '044-295678', ciudad: 'Trujillo', rating: 4, categoria: 'Madera', credito_dias: 15 },
    { id: 'PRV-003', nombre: 'Herrajes & Accesorios Peru SA', ruc: '20623456789', contacto: 'Miguel Torres', email: 'mtorres@herrajes.pe', telefono: '01-2345678', ciudad: 'Lima', rating: 5, categoria: 'Herrajes', credito_dias: 45 },
    { id: 'PRV-004', nombre: 'Distribuidora Ferretera Andina', ruc: '20734567890', contacto: 'Carmen Flores', email: 'cflores@ferretera.pe', telefono: '044-267890', ciudad: 'Trujillo', rating: 3, categoria: 'Consumibles', credito_dias: 15 },
    { id: 'PRV-005', nombre: 'Pinturas y Acabados Premium', ruc: '20845678901', contacto: 'David Sánchez', email: 'dsanchez@pinturas.pe', telefono: '044-312345', ciudad: 'Trujillo', rating: 4, categoria: 'Acabados', credito_dias: 30 },
    { id: 'PRV-006', nombre: 'Maquinaria Industrial Pérez', ruc: '20956789012', contacto: 'Luis Pérez', email: 'lperez@maquinaria.pe', telefono: '01-3456789', ciudad: 'Lima', rating: 4, categoria: 'Maquinaria', credito_dias: 60 },
    { id: 'PRV-007', nombre: 'Insumos Químicos Industriales', ruc: '21067890123', contacto: 'Patricia Vega', email: 'pvega@iqindustrial.pe', telefono: '044-289012', ciudad: 'La Libertad', rating: 3, categoria: 'Químicos', credito_dias: 30 },
    { id: 'PRV-008', nombre: 'Ferretería El Maestro SCRL', ruc: '21178901234', contacto: 'Andrés Castro', email: 'acastro@ferreteria.pe', telefono: '044-301234', ciudad: 'Trujillo', rating: 4, categoria: 'Consumibles', credito_dias: 0 },
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
  productos: [
    { id: 'PRD-001', nombre: 'Mueble de Oficina Modular', descripcion: 'Set completo escritorio + credenza', unidad: 'Juego', precio_venta: 1800.00, costo_std: 1080.00 },
    { id: 'PRD-002', nombre: 'Cama Matrimonial Tornillo', descripcion: 'Madera tornillo, terminado nogal', unidad: 'Unidad', precio_venta: 850.00, costo_std: 480.00 },
    { id: 'PRD-003', nombre: 'Closet Empotrado Melamina', descripcion: '2.4m ancho, 5 cuerpos', unidad: 'Unidad', precio_venta: 1200.00, costo_std: 720.00 },
    { id: 'PRD-004', nombre: 'Cocina Integral 3m', descripcion: 'Melamina blanco, encimera incluida', unidad: 'Unidad', precio_venta: 2400.00, costo_std: 1440.00 },
    { id: 'PRD-005', nombre: 'Mesa Restaurante Madera', descripcion: 'Mesa 4 personas, tornillo', unidad: 'Unidad', precio_venta: 320.00, costo_std: 168.00 },
    { id: 'PRD-006', nombre: 'Pupitre Escolar', descripcion: 'Madera pino, regulable', unidad: 'Unidad', precio_venta: 120.00, costo_std: 62.00 },
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

  // ── COSTOS ──────────────────────────────────────────────
  costos_productos: [
    { producto_id: 'PRD-001', nombre: 'Mueble de Oficina Modular', costo_std: 1080.00, costo_real: 1124.50, materia_prima: 620.00, mano_obra: 380.00, gastos_ind: 124.50 },
    { producto_id: 'PRD-002', nombre: 'Cama Matrimonial Tornillo', costo_std: 480.00, costo_real: 502.00, materia_prima: 280.00, mano_obra: 160.00, gastos_ind: 62.00 },
    { producto_id: 'PRD-003', nombre: 'Closet Empotrado Melamina', costo_std: 720.00, costo_real: 695.00, materia_prima: 420.00, mano_obra: 210.00, gastos_ind: 65.00 },
    { producto_id: 'PRD-004', nombre: 'Cocina Integral 3m', costo_std: 1440.00, costo_real: 1510.00, materia_prima: 850.00, mano_obra: 480.00, gastos_ind: 180.00 },
    { producto_id: 'PRD-005', nombre: 'Mesa Restaurante', costo_std: 168.00, costo_real: 171.00, materia_prima: 95.00, mano_obra: 56.00, gastos_ind: 20.00 },
    { producto_id: 'PRD-006', nombre: 'Pupitre Escolar', costo_std: 62.00, costo_real: 58.50, materia_prima: 32.00, mano_obra: 18.50, gastos_ind: 8.00 },
  ],

  resumen_costos: {
    go_total: 28500,
    cp_total: 19800,
    ratio_go_cp: 144,
    margen_bruto: 34,
    costo_por_empleado: 2280,
    semaforo_go_cp: 'amarillo',
    semaforo_margen: 'verde',
    semaforo_costo_emp: 'verde',
    breakdown: { materia_prima: 45, mano_obra: 35, gastos_ind: 20 },
  },

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
    { id: 'EMP-001', nombre: 'Carlos Mendoza Ríos', dni: '42345678', cargo: 'Gerente General', area: 'Gerencia', sueldo: 4500, ingreso: '2020-03-01', estado: 'Activo', email: 'cmendoza@citemadera.pe', telefono: '944123456' },
    { id: 'EMP-002', nombre: 'Ana Rodríguez Silva', dni: '43456789', cargo: 'Administradora', area: 'Administración', sueldo: 2200, ingreso: '2021-06-15', estado: 'Activo', email: 'arodriguez@citemadera.pe', telefono: '955234567' },
    { id: 'EMP-003', nombre: 'Luis Paredes Castro', dni: '44567890', cargo: 'Maestro Carpintero', area: 'Producción', sueldo: 2800, ingreso: '2020-08-01', estado: 'Activo', email: 'lparedes@citemadera.pe', telefono: '966345678' },
    { id: 'EMP-004', nombre: 'Pedro Soto Vega', dni: '45678901', cargo: 'Operario Senior', area: 'Producción', sueldo: 1800, ingreso: '2021-01-10', estado: 'Activo', email: 'psoto@citemadera.pe', telefono: '977456789' },
    { id: 'EMP-005', nombre: 'Marco Díaz Flores', dni: '46789012', cargo: 'Operario Junior', area: 'Producción', sueldo: 1200, ingreso: '2023-03-20', estado: 'Activo', email: 'mdiaz@citemadera.pe', telefono: '988567890' },
    { id: 'EMP-006', nombre: 'Carlos Lara Huanca', dni: '47890123', cargo: 'Control de Calidad', area: 'Producción', sueldo: 1600, ingreso: '2022-07-05', estado: 'Activo', email: 'clara@citemadera.pe', telefono: '999678901' },
    { id: 'EMP-007', nombre: 'Rosa Quispe Mamani', dni: '48901234', cargo: 'Vendedora', area: 'Ventas', sueldo: 1500, ingreso: '2022-02-14', estado: 'Activo', email: 'rquispe@citemadera.pe', telefono: '910789012' },
    { id: 'EMP-008', nombre: 'Jorge Vargas Torres', dni: '49012345', cargo: 'Vendedor', area: 'Ventas', sueldo: 1500, ingreso: '2023-08-01', estado: 'Activo', email: 'jvargas@citemadera.pe', telefono: '921890123' },
    { id: 'EMP-009', nombre: 'Patricia Luna Cruz', dni: '50123456', cargo: 'Contadora', area: 'Contabilidad', sueldo: 2500, ingreso: '2021-10-01', estado: 'Activo', email: 'pluna@citemadera.pe', telefono: '932901234' },
    { id: 'EMP-010', nombre: 'Alfredo Mora Ramos', dni: '51234567', cargo: 'Almacenero', area: 'Logística', sueldo: 1200, ingreso: '2023-01-15', estado: 'Vacaciones', email: 'amora@citemadera.pe', telefono: '943012345' },
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

  // ── KPIs ─────────────────────────────────────────────────
  kpis: {
    ventas_mes: 45320,
    ventas_mes_anterior: 41500,
    cotizaciones_activas: 4,
    cotizaciones_efectividad: 68,
    ops_activas: 5,
    ops_completadas_mes: 2,
    alertas_stock: 4,
    margen_bruto: 34,
    entregas_tiempo: 87,
    eficiencia_produccion: 92,
    saldo_caja: 18450,
    por_cobrar: 28482,
    por_pagar: 8419,
  },

  // Helpers
  getProveedor(id) { return this.proveedores.find(p => p.id === id) || {}; },
  getCliente(id) { return this.clientes.find(c => c.id === id) || {}; },
  getMaterial(id) { return this.materiales.find(m => m.id === id) || {}; },
  getEmpleado(id) { return this.empleados.find(e => e.id === id) || {}; },
  getProducto(id) { return this.productos.find(p => p.id === id) || {}; },
};
