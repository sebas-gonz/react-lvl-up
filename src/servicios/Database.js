import Usuario from '../models/Usuario.js';
import Categoria from '../models/Categoria.js';
import Producto from '../models/Producto.js';
import Carrito from '../models/Carrito.js';
import Orden from '../models/Orden.js';
import LocalStorage from './LocalStorage.js';

class Database {
    static #instancia;
    #localStorage;
    #usuarios = [];
    #categorias = [];
    #productos = [];
    #carritos = [];
    #ordenes = [];

    constructor() {
        if (Database.#instancia) {
            return Database.#instancia;
        }
        Database.#instancia = this;
        this.#localStorage = new LocalStorage();
        this.#cargarDB();
    }


    #guardarDB() {
        const datos = {
            usuarios: this.#usuarios,
            categorias: this.#categorias,
            productos: this.#productos,
            carritos: this.#carritos,
            ordenes: this.#ordenes
        };
        this.#localStorage.guardar('lvl-up', datos)
    }

    #cargarDB() {
        const datos = this.#localStorage.cargar('lvl-up');

        if (datos) {
            console.log("Cargando base de datos desde localStorage...");
            this.#categorias = (datos.categorias ?? []).map(catData => new Categoria(catData));

            this.#usuarios = (datos.usuarios ?? []).map(userData => new Usuario(userData));

            this.#productos = (datos.productos ?? []).map(prodData => {
                const categoria = this.#categorias.find(c => c.categoriaId === prodData.categoriaId);
                if (!categoria) {
                    console.warn(`No se encontró la categoría con ID ${prodData.categoriaId} para el producto ${prodData.nombreProducto}`);
                    return null; 
                }
                return new Producto({ ...prodData, categoria });
            }).filter(p => p !== null); 

            this.#carritos = (datos.carritos ?? []).map(cartData => new Carrito(cartData));

            this.#ordenes = (datos.ordenes ?? []).map(orderData => new Orden(orderData));



            Categoria.syncNextId(this.#categorias);
            Usuario.syncNextId(this.#usuarios);
            Producto.syncNextId(this.#productos);
            Producto.syncContadoresPrefijo(this.#productos); 
            Carrito.syncNextId(this.#carritos);
            Orden.syncNextId(this.#ordenes);

            console.log("¡Base de datos cargada y sincronizada!");

        } else {
            // Si no hay nada guardado, poblamos con datos iniciales
            console.log("No se encontraron datos guardados. Inicializando base de datos...");
            this.#iniciarDatos();
        }
    }

    #iniciarDatos() {
        console.log('Base de datos iniciada por primera vez.');
        // Aquí llamas a tus métodos públicos para crear los datos por primera vez
        // Por ejemplo:
        // const catRopa = this.agregarCategoria({ nombreCategoria: 'Ropa', prefijo: 'PP' });
        // this.agregarProducto({ ...datos del producto..., categoriaId: catRopa.categoriaId });
        
        // El método #saveState() se llamará dentro de cada uno de esos métodos,
        // por lo que los datos iniciales se guardarán automáticamente en localStorage.
    }



    agregarCarrito(usuario, producto, cantidad) {
        const nuevoCarrito = new Carrito(usuario, producto, cantidad);
        this.#carritos.push(nuevoCarrito);
        this.#guardarDB();
        return nuevoCarrito;
    }

    obtenerCarritos() {
        return [...this.#carritos];
    }

    obtenerCarritoPorId(id) {
        return this.#carritos.find(carr => carr.carritoId === id);
    }

    agregarCategoria(nombre, prefijo, imagen) {
        const nuevaCategoria = new Categoria(nombre, prefijo, imagen);
        this.#categorias.push(nuevaCategoria);
        this.#guardarDB();
        return nuevaCategoria;
    }

    obtenerCategoriaPorId(id) {
        return this.#categorias.find(cat => cat.categoriaId === id);
    }

    obtenerCategorias() {
        return [...this.#categorias];
    }

    agregarProducto(datosProducto) {
        const categoria = this.obtenerCategoriaPorId(datosProducto.categoriaId);
        if (!categoria) {
            throw new Error(`La categoría con id ${datosProducto.categoriaId} no existe.`);
        }
        const nuevoProducto = new Producto({ ...datosProducto, categoria });
        this.#productos.push(nuevoProducto);
        this.#guardarDB();
        return nuevoProducto;
    }

    obtenerProductoPorId(id) {
        return this.#productos.find(p => p.id === id);
    }

    obtenerProductos() {
        return [...this.#productos];
    }

    registrarUsuario(datosUsuario) {
        const nuevoUsuario = new Usuario(datosUsuario);
        this.#usuarios.push(nuevoUsuario);
        return nuevoUsuario;
    }

    obtenerUsuarioPorId(id) {
        return this.#usuarios.find(u => u.usuarioId === id);
    }

    crearOrden(datosOrden) {
        const nuevaOrden = new Orden(datosOrden);
        this.#ordenes.push(nuevaOrden);
        this.#guardarDB();
        // Aquí podrías, por ejemplo, vaciar el carrito del usuario
        return nuevaOrden;
    }

    obtenerOrdenesPorUsuario(usuarioId) {
        return this.#ordenes.filter(o => o.usuarioId === usuarioId);
    }


}

const db = new Database();
export default db;