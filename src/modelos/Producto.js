import Categoria from "./Categoria";

export default class Producto {
    static #nextId = 1;
    static #contadoresPorPrefijo = {};
    #productoId;
    #codigoProducto;
    #nombreProducto;
    #descripcionProducto;
    #precioProducto;
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

    static syncContadoresPrefijo(productos) {
        if (productos && productos.length > 0) {
            const contadores = {};
            for (const producto of productos) {
                const prefijo = producto.codigoProducto.substring(0, 2); 
                const numero = parseInt(producto.codigoProducto.substring(2));
                if (!contadores[prefijo] || numero > contadores[prefijo]) {
                    contadores[prefijo] = numero;
                }
            }
            for (const prefijo in contadores) {
                Producto.#contadoresPorPrefijo[prefijo] = contadores[prefijo] + 1;
            }
        }
    }

    constructor({productoId, nombreProducto, descripcionProducto, precioProducto, stockProducto, stockMinimoProducto,
        categoria, categoriaId, imagenesProducto = [], createdAt, updatedAt, codigoProducto}) {

        if (categoria) {
            if (!(categoria instanceof Categoria)) {
                throw new Error("categoria no es una instacia de la clase Categoria");
            }
            this.#categoriaId = categoria.categoriaId
            this.#productoId = Producto.#nextId++

            const prefijo = categoria.prefijo
            if (!Producto.#contadoresPorPrefijo[prefijo]) {
                Producto.#contadoresPorPrefijo[prefijo] = 1;
            }

            const numeroPrefijo = Producto.#contadoresPorPrefijo[prefijo]++;
            const numeroPrefijoFormateado = String(numeroPrefijo).padStart(3, '0');

            this.#codigoProducto = `${prefijo}${numeroPrefijoFormateado}`;

        } else {
            this.#categoriaId = categoriaId;
            this.#productoId = productoId;
            this.#codigoProducto = codigoProducto
        }

        this.#productoId = productoId || Producto.#nextId++;
        
        this.#nombreProducto = nombreProducto;
        this.#descripcionProducto = descripcionProducto;
        this.#precioProducto = precioProducto;
        this.#stockProducto = stockProducto;
        this.#stockMinimoProducto = stockMinimoProducto;
        this.#imagenesProducto = imagenesProducto
        
        this.#createdAt = createdAt ? new Date(createdAt) : new Date()
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date()
    }

    get id() {
        return this.#productoId;
    }

    get codigo() {
        return this.#codigoProducto;
    }

    get nombre() {
        return this.#nombreProducto;
    }

    get descripcion() {
        return this.#descripcionProducto;
    }

    get precio() {
        return this.#precioProducto;
    }

    get stock() {
        return this.#stockProducto;
    }

    get stockMinimo() {
        return this.#stockMinimoProducto;
    }

    get categoriaId() {
        return this.#categoriaId;
    }

    get imagenes() {
        return [...this.#imagenesProducto];
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    set categoria(nuevaCategoriaId) {
        if (typeof nuevaCategoriaId === 'number' && Number.isInteger(nuevaCategoriaId)) {
            this.#categoriaId = nuevaCategoriaId
            this.#updatedAt = new Date()
        } else {
            console.error('La nueva categoria no es una instancia de Categoria')
        }
    }

    set nombre(nuevoNombre) {
        if (typeof nuevoNombre === 'string' && nuevoNombre.trim() !== '') {
            this.#nombreProducto = nuevoNombre.trim();
            this.#updatedAt = new Date();
        } else {
            console.error("El nombre debe ser un texto no vacío.");
        }
    }

    set descripcion(nuevaDescripcion) {
        if (typeof nuevaDescripcion === 'string' && nuevaDescripcion.trim() !== '') {
            this.#descripcionProducto = nuevaDescripcion.trim();
            this.#updatedAt = new Date();
        } else {
            console.error("La descripción debe ser un texto.");
        }
    }

    set precio(nuevoPrecio) {
        if (typeof nuevoPrecio === 'number' && Number.isInteger(nuevoPrecio)) {
            this.#precioProducto = nuevoPrecio;
            this.#updatedAt = new Date();
        } else {
            console.error("El precio debe ser un número entero.");
        }
    }

    set stock(nuevoStock) {
        if (typeof nuevoStock === 'number' && Number.isInteger(nuevoStock)) {
            this.#stockProducto = nuevoStock;
            this.#updatedAt = new Date();
        } else {
            console.error("El stock debe ser un número entero.");
        }
    }

    set stockMinimo(nuevoStockMinimo) {
        if (typeof nuevoStockMinimo === 'number' && Number.isInteger(nuevoStockMinimo)) {
            this.#stockMinimoProducto = nuevoStockMinimo;
            this.#updatedAt = new Date();
        } else {
            console.error("El stock mínimo debe ser un número entero.");
        }
    }

    set imagenes(nuevasImagenes) {
        if (Array.isArray(nuevasImagenes)) {
            this.#imagenesProducto = nuevasImagenes;
            this.#updatedAt = new Date();
        } else {
            console.error("Las imágenes deben ser proporcionadas en una lista.");
        }
    }
}