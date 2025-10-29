import audifonos from '../assets/imagenes/categorias/accesorios/auriculares/hyperx/hyperx_1.jpg'
import contol from '../assets/imagenes/categorias/accesorios/control/xbox/control_xbox_1.webp'
import computador from '../assets/imagenes/categorias/computadores/asus/rog/asus_strix_1.png'
import ps5 from '../assets/imagenes/categorias/consolas/ps5/ps5_1.webp'
import catan from '../assets/imagenes/categorias/juegos_mesa/catan/catan_1.jpg'
import carcassonne from '../assets/imagenes/categorias/juegos_mesa/carcassonne/carcassonne_1.jpg'
import razer from '../assets/imagenes/categorias/mousepads/razer/goliathus/razer_goliathus_1.webp'
import silla from '../assets/imagenes/categorias/sillas/secretlab/secretlab_1.webp'
import imgComputadores from '../assets/imagenes/categorias/computadores/computadores-logo.avif'

export const datosCategorias = [
    {
        nombreCategoria: "Accesorios",
        descripcion: "Todo lo que necesitas para complementar tu setup: headsets, teclados, micrófonos y más.",
        imagenCategoria: "https://cl-media.hptiendaenlinea.com/wysiwyg/Teclados_Gaming_HP.png"
    },
    {
        nombreCategoria: "Computadores",
        descripcion: "PCs de escritorio y notebooks listos para jugar al máximo nivel.",
        imagenCategoria: imgComputadores
    },
    {
        nombreCategoria: "Consolas",
        descripcion: "Las últimas consolas de Sony, Microsoft y Nintendo.",
        imagenCategoria: "https://tecinfobcn.com/wp-content/uploads/2023/03/reparar-consolas.png"

    },
    {
        nombreCategoria: "Juegos de Mesa",
        descripcion: "Estrategia, cartas y rol para compartir con amigos.",
        imagenCategoria: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…pPDJFaG4TGFdjxMmSeVjfB0Y6WvslKod7TJkySMp9CB//2Q=="

    },
    {
        nombreCategoria: "Mousepads",
        descripcion: "Superficies optimizadas para precisión y velocidad.",
        imagenCategoria: "https://m.media-amazon.com/images/I/81AMLnk3kKL._AC_SL1500_.jpg"
    },
    {
        nombreCategoria: "Sillas",
        descripcion: "Sillas ergonómicas diseñadas para largas sesiones de juego.",
        imagenCategoria: "https://todoclick.cl/4622497-large_default/silla_gamer_razer_tarok_essentials_120rz00001.jpg"
    }
];

export const datosProductos = [
    {
        nombreProducto: "Audífonos HyperX Cloud II",
        descripcionProducto: "Audífonos gamer con sonido surround 7.1, micrófono desmontable y comodidad premium.",
        precioProducto: 89990,
        precioOferta: 74990, 
        oferta: true, 
        stockProducto: 25,
        stockMinimoProducto: 5,
        categoriaId: 1, 
        imagenesProducto: audifonos
    },
    {
        nombreProducto: "Control Xbox Series X|S - Carbon Black",
        descripcionProducto: "Control inalámbrico oficial de Xbox con agarre texturizado y botón para compartir.",
        precioProducto: 59990,
        oferta: false,
        stockProducto: 40,
        stockMinimoProducto: 10,
        categoriaId: 1, 
        imagenesProducto: contol
    },

    {
        nombreProducto: "Notebook ASUS ROG Strix G16",
        descripcionProducto: "Potencia extrema con Intel Core i9 y NVIDIA RTX 4070 para juegos de élite.",
        precioProducto: 1899990,
        oferta: false,
        stockProducto: 10,
        stockMinimoProducto: 2,
        categoriaId: 2, 
        imagenesProducto: computador
    },

    {
        nombreProducto: "Consola PlayStation 5",
        descripcionProducto: "La nueva generación de juegos con tiempos de carga ultra rápidos y gráficos impresionantes.",
        precioProducto: 649990,
        oferta: false,
        stockProducto: 15,
        stockMinimoProducto: 5,
        categoriaId: 3, 
        imagenesProducto: ps5
    },

    {
        nombreProducto: "Catan (Juego Base)",
        descripcionProducto: "El clásico juego de mesa de estrategia, comercio y construcción de civilizaciones.",
        precioProducto: 39990,
        oferta: false,
        stockProducto: 50,
        stockMinimoProducto: 10,
        categoriaId: 4,
        imagenesProducto: catan
    },
    {
        nombreProducto: "Carcassonne (Juego Base)",
        descripcionProducto: "Coloca losetas para construir un paisaje medieval y reclama territorios.",
        precioProducto: 29990,
        oferta: true,
        precioOferta: 24990, 
        stockProducto: 30,
        stockMinimoProducto: 10,
        categoriaId: 4, 
        imagenesProducto: carcassonne
    },

    {
        nombreProducto: "Razer Goliathus Chroma",
        descripcionProducto: "Mousepad de tela suave con iluminación RGB Chroma personalizable.",
        precioProducto: 49990,
        oferta: false,
        stockProducto: 20,
        stockMinimoProducto: 5,
        categoriaId: 5, 
        imagenesProducto: razer
    },
    {
        nombreProducto: "Silla Gamer Secretlab TITAN Evo",
        descripcionProducto: "Diseño ergonómico de clase mundial para comodidad y soporte incomparables.",
        precioProducto: 499990,
        oferta: false,
        stockProducto: 8,
        stockMinimoProducto: 2,
        categoriaId: 6, 
        imagenesProducto: silla
    }
];


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

export const datosUsuarios = [
    {
        nombre: "admin",
        apellido: "ScrumMaster",
        correo: "admin@gmail.com",
        contraseña: "admin123",
        run: "11111111-1",
        fechaNacimiento: "1990-01-01",
        region: "Región Metropolitana de Santiago",
        comuna: "Providencia",
        direccion: "Av. Siempre Viva 123",
        tipoUsuario: 1 
    },
    {
        nombre: "Pedro",
        apellido: "Desarrollador",
        correo: "vendedor@gmail.com",
        contraseña: "vendedor123",
        run: "22222222-2",
        fechaNacimiento: "1995-05-10",
        region: "Región de Valparaíso",
        comuna: "Viña del Mar",
        direccion: "Calle Falsa 456",
        tipoUsuario: 2 
    },
    {
        nombre: "Joseph",
        apellido: "MT",
        correo: "cliente1@gmail.com",
        contraseña: "cliente123",
        run: "33333333-3",
        fechaNacimiento: "2000-10-20",
        region: "Región de Ñuble",
        comuna: "Chillán",
        direccion: "El Roble 789",
        tipoUsuario: 3 
    },
    {
        nombre: "Ana",
        apellido: "García",
        correo: "ana.garcia@gmail.com",
        contraseña: "ana123",
        run: "44444444-4",
        fechaNacimiento: "2002-03-15",
        region: "Región del Biobío",
        comuna: "Concepción",
        direccion: "O'Higgins 111",
        tipoUsuario: 3 
    },
    {
        nombre: "Carlos",
        apellido: "Soto",
        correo: "carlos.soto@gmail.com",
        contraseña: "carlos123",
        run: "55555555-5",
        fechaNacimiento: "1988-11-30",
        region: "Región Metropolitana de Santiago",
        comuna: "Santiago",
        direccion: "Moneda 222",
        tipoUsuario: 3 
    }
];