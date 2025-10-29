import Categoria from "./Categoria";

export default class Producto {
    static #nextId = 1;

    #productoId;
    #codigoProducto;
    #nombreProducto;
    #descripcionProducto;
    #precioProducto;
    #precioOferta;
    #oferta
    #stockProducto;
    #stockMinimoProducto;
    #categoriaId;
    #imagenesProducto;
    #createdAt;
    #updatedAt

    static syncNextId(productos) {
        if (productos && productos.length > 0) {
            const maxId = Math.max(...productos.map(p => p.productoId));
            Producto.#nextId = maxId + 1;
        }
    }

    constructor({

        productoId,
        codigoProducto,
        nombreProducto,
        descripcionProducto,
        precioProducto,
        precioOferta,
        oferta,
        stockProducto,
        stockMinimoProducto,
        categoriaId,
        imagenesProducto,
        createdAt,
        updatedAt
    }) {

        this.#productoId = productoId || Producto.#nextId++;
        this.#codigoProducto = codigoProducto;
        this.#categoriaId = categoriaId;
        this.#nombreProducto = nombreProducto;
        this.#descripcionProducto = descripcionProducto;
        this.#precioProducto = precioProducto;
        this.#precioOferta = precioOferta;
        this.#oferta = oferta;
        this.#stockProducto = stockProducto;
        this.#stockMinimoProducto = stockMinimoProducto;
        this.#imagenesProducto = imagenesProducto;

        this.#createdAt = createdAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get categoriaId() {
        return this.#categoriaId;
    }
    get nombreProducto(){
        return this.#nombreProducto;
    }

    get productoId() {
        return this.#productoId;
    }

    get oferta() {
        return this.#oferta
    }

    get precioOferta() {
        return this.#precioOferta
    }

    get codigoProducto() {
        return this.#codigoProducto;
    }


    get descripcionProducto() {
        return this.#descripcionProducto;
    }

    get precioProducto() {
        return this.#precioProducto;
    }

    get stockProducto() {
        return this.#stockProducto;
    }

    get stockMinimoProducto() {
        return this.#stockMinimoProducto;
    }

    get imagenesProducto() {
        return this.#imagenesProducto;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    set oferta(nuevaOferta) {
        if (typeof nuevaOferta === 'boolean') {
            this.#oferta = nuevaOferta;
            if (!nuevaOferta) {
                this.#precioOferta = null; 
            }
            this.#updatedAt = new Date();
        } else {
            console.error('No se puede determinar si el producto esta en oferta.');
        }
    }

    set precioOferta(nuevoPrecioOferta) {
        if (typeof nuevoPrecioOferta === 'number') {
            this.#precioOferta = nuevoPrecioOferta;
            this.#updatedAt = new Date()
        } else {
            console.error('El precio debe ser un numero.')
        }
    }

    set categoriaId(nuevaCategoriaId) {
        if (typeof nuevaCategoriaId === 'number' && Number.isInteger(nuevaCategoriaId)) {
            this.#categoriaId = nuevaCategoriaId
            this.#updatedAt = new Date()
        } else {
            console.error('La nueva categoria no es una instancia de Categoria')
        }
    }

    set nombreProducto(nuevoNombre) {
        if (typeof nuevoNombre === 'string' && nuevoNombre.trim() !== '') {
            this.#nombreProducto = nuevoNombre.trim();
            this.#updatedAt = new Date();
        } else {
            console.error("El nombre debe ser un texto no vacío.");
        }
    }

    set descripcionProducto(nuevaDescripcion) {
        if (typeof nuevaDescripcion === 'string' && nuevaDescripcion.trim() !== '') {
            this.#descripcionProducto = nuevaDescripcion.trim();
            this.#updatedAt = new Date();
        } else {
            console.error("La descripción debe ser un texto.");
        }
    }

    set precioProducto(nuevoPrecio) {
        if (typeof nuevoPrecio === 'number' && Number.isInteger(nuevoPrecio)) {
            this.#precioProducto = nuevoPrecio;
            this.#updatedAt = new Date();
        } else {
            console.error("El precio debe ser un número entero.");
        }
    }

    set stockProducto(nuevoStock) {
        if (typeof nuevoStock === 'number' && Number.isInteger(nuevoStock)) {
            this.#stockProducto = nuevoStock;
            this.#updatedAt = new Date();
        } else {
            console.error("El stock debe ser un número entero.");
        }
    }

    set stockMinimoProducto(nuevoStockMinimo) {
        if (typeof nuevoStockMinimo === 'number' && Number.isInteger(nuevoStockMinimo)) {
            this.#stockMinimoProducto = nuevoStockMinimo;
            this.#updatedAt = new Date();
        } else {
            console.error("El stock mínimo debe ser un número entero.");
        }
    }

    set imagenesProducto(nuevasImagenes) {
            this.#imagenesProducto = nuevasImagenes;
            this.#updatedAt = new Date();
    }

    toJSON() {
        return {
            productoId: this.#productoId,
            codigoProducto: this.#codigoProducto,
            nombreProducto: this.#nombreProducto,
            descripcionProducto: this.#descripcionProducto,
            precioProducto: this.#precioProducto,
            precioOferta: this.#precioOferta,
            oferta: this.#oferta,
            stockProducto: this.#stockProducto,
            stockMinimoProducto: this.#stockMinimoProducto,
            categoriaId: this.#categoriaId,
            imagenesProducto: this.#imagenesProducto,
            createdAt: this.#createdAt.toISOString(),
            updatedAt: this.#updatedAt.toISOString()
        };
    }
}