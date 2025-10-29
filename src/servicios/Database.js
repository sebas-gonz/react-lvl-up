import Usuario from '../modelos/Usuario.js';
import Categoria from '../modelos/Categoria.js';
import Producto from '../modelos/Producto.js';
import Carrito from '../modelos/Carrito.js';
import Orden from '../modelos/Orden.js';


const userKey = 'usuarioActual'
const db_key = 'lvl-up'

class Database {
    static #instancia;
    #usuarios = [];
    #categorias = [];
    #productos = [];
    #carritos = [];
    #ordenes = [];
    #contadoresPorPrefijo = {};

    constructor() {
        if (Database.#instancia) {
            return Database.#instancia;
        }
        Database.#instancia = this;
        this.#cargarDB();
    }


    #guardarDB() {
        const datos = {
            usuarios: this.#usuarios,
            categorias: this.#categorias,
            productos: this.#productos,
            carritos: this.#carritos,
            ordenes: this.#ordenes,
            constadoresPorPrefijo: this.#contadoresPorPrefijo
        };
        try {
          
            localStorage.setItem(db_key, JSON.stringify(datos));
        } catch (error) {
            console.error("Error al guardar la base de datos:", error);
        }
    }

    #cargarDB() {
        try {

            const datosString = localStorage.getItem(db_key);

            if (datosString) {
                const datos = JSON.parse(datosString)
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

                this.#contadoresPorPrefijo = datos.contadoresPorPrefijo || {};

                Categoria.syncNextId(this.#categorias);
                Usuario.syncNextId(this.#usuarios);
                Producto.syncNextId(this.#productos);
                Carrito.syncNextId(this.#carritos);
                Orden.syncNextId(this.#ordenes);

                console.log("¡Base de datos cargada y sincronizada!");

            } else {
                
                console.log("No se encontraron datos guardados. Inicializando base de datos...");
                this.#iniciarDatos();
            }

        } catch (error) {
            console.error("Error al cargar la base de datos.", error)
            this.#iniciarDatos
        }

    }

    #iniciarDatos() {
        console.log('Base de datos iniciada por primera vez.');
    }

    login(correo, contraseña) {
        const usuario = this.#usuarios.find(u => u.correo === correo);

        if (usuario && usuario.contraseña === contraseña) {
            localStorage.setItem(userKey, usuario.usuarioId);
            return usuario;
        } else {
            throw new Error('Correo o contraseña incorrectos.');
        }
    }

    logout() {
        try {

            localStorage.removeItem(userKey)
        } catch (error) {
            console.error("Error al iniciar sesión: ", error)
        }
    }

    getUsuarioIniciado() {
        try {
            const usuarioId = localStorage.getItem(userKey)
            if (!usuarioId) {
                return null;
            }

            return this.obtenerUsuarioPorId(parseInt(usuarioId, 10));

        } catch (error) {
            console.error("Erro al obtener al usuario iniciado: ", error)
            return null
        }
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

    agregarCategoria(datosCategoria) {
        const nombreExistente = this.#categorias.find(cat => cat.nombreCategoria.toLowerCase() === datosCategoria.nombreCategoria.toLowerCase());
        if (nombreExistente) {
            throw new Error(`La categoría "${datosCategoria.nombreCategoria}" ya existe.`);
        }
        const nuevaCategoria = new Categoria(datosCategoria);
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

    obtenerUsuarios() {
        return [...this.#usuarios]
    }

    agregarProducto(datosProducto) {
        const categoria = this.obtenerCategoriaPorId(datosProducto.categoriaId);
        if (!categoria) {
            throw new Error(`La categoría con id ${datosProducto.categoriaId} no existe.`);
        }
        const prefijo = categoria.prefijo; 
        if (!this.#contadoresPorPrefijo[prefijo]) {
            this.#contadoresPorPrefijo[prefijo] = 1;
        }

        const numeroSecuencial = this.#contadoresPorPrefijo[prefijo]++;
        const numeroFormateado = String(numeroSecuencial).padStart(3, '0');
        const codigoProducto = `${prefijo}${numeroFormateado}`;

        const nuevoProducto = new Producto({
            ...datosProducto,
            codigoProducto: codigoProducto,
            categoriaId: datosProducto.categoriaId
        });

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

    // ...
    registrarUsuario(datosUsuario) {

        const correoExistente = this.#usuarios.find(u => u.correo === datosUsuario.correo);
        if (correoExistente) {
            throw new Error(`El correo ${datosUsuario.correo} ya está registrado.`);
        }

        const nuevoUsuario = new Usuario(datosUsuario);
        this.#usuarios.push(nuevoUsuario);
        this.#guardarDB();
        try {
            localStorage.setItem(userKey, nuevoUsuario.usuarioId)
        } catch (error) {
            console.error("Error al iniciar sesion del usuario registrado. ", error)
        }

        this.#guardarDB()

        return nuevoUsuario;
    }

    obtenerUsuarioPorId(id) {

        const numericId = typeof id === 'string' ? parseInt(id, 10) : id; 
        return this.#usuarios.find(u => u.usuarioId === numericId);
    }

    obtenerProductosPorCategoria(categoriaId) {
        return this.#productos.filter(p => p.categoriaId === categoriaId)
    }

    crearOrden(datosOrden) {
        const nuevaOrden = new Orden(datosOrden);
        this.#ordenes.push(nuevaOrden);
        this.#guardarDB();
        return nuevaOrden;
    }

    obtenerOrdenesPorUsuario(usuarioId) {
        return this.#ordenes.filter(o => o.usuarioId === usuarioId);
    }


}

const db = new Database();
export default db;