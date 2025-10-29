export const datosOrdenes = [
    {
        usuarioId: 1,
        nombreCliente: 'Admin LvlUp',
        direccion: 'Av. Siempre Viva 123',
        comuna: 'Providencia',
        region: 'Región Metropolitana de Santiago',
        numeroDepartamento: '101',
        indicacion: 'Dejar en conserjería',
        carritos: [
            {
                productoId: 1, 
                cantidad: 1,
                precioUnitarioAlAgregar: 89990 
            },
            {
                productoId: 2, 
                cantidad: 2,
                precioUnitarioAlAgregar: 59990 
            }
        ]
    },
    {
        usuarioId: 2,
        nombreCliente: 'Vendedor Gamer',
        direccion: 'Calle Nueva 123', 
        comuna: 'Quilpué',
        region: 'Región de Valparaíso',
        carritos: [
            {
                productoId: 3, 
                cantidad: 1,
                precioUnitarioAlAgregar: 1899990
            }
        ]
    },
    {
        usuarioId: 3,
        indicacion: 'Dejar en la puerta.',
        carritos: [
            {
                productoId: 5,
                cantidad: 1,
                precioUnitarioAlAgregar: 39990
            },
            {
                productoId: 8, 
                cantidad: 1,
                precioUnitarioAlAgregar: 499990
            }
        ]
    }
];