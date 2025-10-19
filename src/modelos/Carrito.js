import Producto from "./Producto";
import Usuario from "./Usuario";

export default class Carrito {
    static #nextId = 1
    #carroId;
    #usuarioId;
    #productoId;
    #precioProducto;
    #cantidad;
    #subTotal;
    #createdAt;
    #updatedAt

    static syncNextId(carritos) {
        if (carritos && carritos.length > 0) {
            const maxId = Math.max(...carritos.map(c => c.carroId));
            Carrito.#nextId = maxId + 1;
        }
    }

    constructor({carroId,usuario,usuarioId, producto,productoId, cantidad,precioProducto,createdAt,updatedAt}) {
        if(usuario && producto){
            if (!(usuario instanceof Usuario)) throw new Error('El objeto no es una instancia de Usuario');
            if (!(producto instanceof Producto)) throw new Error('El objeto no es una instancia de Producto')
            
            this.#usuarioId = usuario.usuarioId;
            this.#productoId = producto.id;
            this.#precioProducto = producto.precio; 
        } else{
            this.#usuarioId = usuarioId;
            this.#productoId = productoId;
            this.#precioProducto = precioProducto;
        }
        this.#carroId = carroId || Carrito.#nextId++;
        this.#cantidad = cantidad;
        this.#subTotal = this.#precioProducto * cantidad;
        this.#createdAt = createdAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get carroId() {
        return this.#carroId;
    }

    get usuarioId() {
        return this.#usuarioId;
    }

    get productoId() {
        return this.#productoId;
    }

    get cantidad() {
        return this.#cantidad;
    }

    get subTotal() {
        return this.#subTotal;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    get precioProducto(){
        return this.#precioProducto
    }

    set cantidad(nuevaCantidad) {
        if (typeof nuevaCantidad === 'number' && Number.isInteger(nuevaCantidad)) {
            this.#cantidad = nuevaCantidad;
            this.#subTotal = this.#precioProducto * nuevaCantidad;
            this.#updatedAt = new Date();
        } else {
            console.error("La cantidad debe ser un número entero");
        }
    }

    set usuario(nuevoUsuarioId) {
        if (typeof nuevoUsuarioId === 'number' && Number.isInteger(nuevoUsuarioId)) {
            this.#usuarioId = nuevoUsuarioId;
            this.#updatedAt = new Date();
        } else {
            console.error('El nuevo usuario no es una instancia de Usuario');
        }
    }

}