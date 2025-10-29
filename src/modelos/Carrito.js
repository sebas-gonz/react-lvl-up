import Producto from "./Producto";
import Usuario from "./Usuario";

export default class Carrito {
    static #nextId = 1
    #carroId;
    #usuarioId;
    #productoId;
    #precioUnitarioAlAgregar;
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

    constructor({
        usuario,
        producto,
        carroId,
        usuarioId,
        productoId,
        precioUnitarioAlAgregar,
        createdAt,
        updatedAt,
        cantidad
    }) {
        let esCreacion = false
        if (usuario && producto) {
            esCreacion = true;
            if (!(usuario instanceof Usuario)) throw new Error('El objeto no es una instancia de Usuario');
            if (!(producto instanceof Producto)) throw new Error('El objeto no es una instancia de Producto');

            this.#usuarioId = usuario.usuarioId;
            this.#productoId = producto.productoId;
            this.#precioUnitarioAlAgregar = producto.precioProducto;
        }
        else {
            this.#usuarioId = usuarioId;
            this.#productoId = productoId;
            this.#precioUnitarioAlAgregar = precioUnitarioAlAgregar;
        }
        this.#carroId = carroId || Carrito.#nextId++;
        this.#cantidad = cantidad;
        const cantNum = parseInt(this.#cantidad, 10);
        const precioNum = parseFloat(this.#precioUnitarioAlAgregar);
        console.log(`Carrito constructor (${esCreacion ? 'NUEVO' : 'CARGADO'} ID: ${this.#carroId}) - Valores para subtotal:`, {
            cantidadRaw: this.#cantidad,
            precioRaw: this.#precioUnitarioAlAgregar,
            cantNumParsed: cantNum,
            precioNumParsed: precioNum
        });


        if (!isNaN(cantNum) && !isNaN(precioNum)) {
            this.#subTotal = precioNum * cantNum;
        } else {
            console.warn(`Error al calcular subtotal para Carrito ID ${this.#carroId}. Cantidad o Precio inválidos.`);
            this.#subTotal = 0;
        }

        console.log(`Carrito constructor (ID: ${this.#carroId}) - Subtotal calculado:`, this.#subTotal);


        this.#createdAt = createdAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get precioUnitarioAlAgregar() {
        return this.#precioUnitarioAlAgregar;
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


    set cantidad(nuevaCantidad) {

        const cantNum = parseInt(nuevaCantidad, 10);
        if (!isNaN(cantNum)) {
            this.#cantidad = cantNum;
            const precioNum = parseFloat(this.#precioUnitarioAlAgregar)
            this.#subTotal = precioNum * this.#cantidad;
            this.#updatedAt = new Date();
        } else {
            console.error("La cantidad debe ser un número entero no negativo.");
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

    toJSON() {
        return {
            carroId: this.#carroId,
            usuarioId: this.#usuarioId,
            productoId: this.#productoId,
            cantidad: this.#cantidad,
            precioUnitarioAlAgregar: this.#precioUnitarioAlAgregar,
            createdAt: this.#createdAt.toISOString(),
            updatedAt: this.#updatedAt.toISOString()
        };
    }

}