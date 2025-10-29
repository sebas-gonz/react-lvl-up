import audifonos from '../assets/imagenes/categorias/accesorios/auriculares/hyperx/hyperx_1.jpg'
import contol from '../assets/imagenes/categorias/accesorios/control/xbox/control_xbox_1.webp'
import computador from '../assets/imagenes/categorias/computadores/asus/rog/asus_strix_1.png'
import ps5 from '../assets/imagenes/categorias/consolas/ps5/ps5_1.webp'
import catan from '../assets/imagenes/categorias/juegos_mesa/catan/catan_1.jpg'
import carcassonne from '../assets/imagenes/categorias/juegos_mesa/carcassonne/carcassonne_1.jpg'
import razer from '../assets/imagenes/categorias/mousepads/razer/goliathus/razer_goliathus_1.webp'
import silla from '../assets/imagenes/categorias/sillas/secretlab/secretlab_1.webp'
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