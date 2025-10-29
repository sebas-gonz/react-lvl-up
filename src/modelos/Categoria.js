export default class Categoria {
    static #nextId = 1
    #categoriaId;
    #nombreCategoria;
    #prefijo;
    #imagenCategoria;
    #descripcion;
    #createdAt;
    #updatedAt;

    static syncNextId(categorias) {
        if (categorias && categorias.length > 0) {
            const maxId = Math.max(...categorias.map(c => c.categoriaId));
            Categoria.#nextId = maxId + 1;
        }
    }

    constructor({ categoriaId, nombreCategoria, prefijo, imagenCategoria,descripcion, createdAt, updatedAt }) {
        this.#categoriaId = categoriaId || Categoria.#nextId++
        this.#nombreCategoria = nombreCategoria;
        if (prefijo) {
            this.#prefijo = prefijo
        } else {
            let prefix = ''
            let listaNombre = nombreCategoria.split(' ')
            if (listaNombre.length > 1) {
                for (let i = 0; i < listaNombre.length; i++) {
                    let palabra = listaNombre[i].split('')
                    prefix = prefix + palabra[0]
                }
                this.#prefijo = prefix
            } else {
                let palabra = listaNombre[0].split('')
                prefix = prefix + palabra[0] + palabra[Math.floor(palabra.length / 2)] + palabra[palabra.length - 1]
                
            }
            this.#prefijo = prefix.toUpperCase()
        }
        this.#descripcion = descripcion;
        this.#imagenCategoria = imagenCategoria;
        this.#createdAt = createdAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get descripcion(){
        return this.#descripcion
    }

    get imagenCategoria() {
        return this.#imagenCategoria;
    }

    get categoriaId() {
        return this.#categoriaId;
    }

    get nombreCategoria() {
        return this.#nombreCategoria;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    get prefijo() {
        return this.#prefijo;
    }

    set descripcion(nuevaDescripcion){
        if(typeof nuevaDescripcion === 'string' && nuevaDescripcion.trim() !== ''){
            this.#descripcion = nuevaDescripcion;
            this.#updatedAt = new Date()
        } else{
            console.error('La descripcion debe ser un texto no vacio.')
        }
    }

    set nombreCategoria(nuevoNombreCategoria) {
        if (typeof nuevoNombreCategoria === 'string' && nuevoNombreCategoria.trim() !== '') {
            this.#nombreCategoria = nuevoNombreCategoria.trim();
            this.#updatedAt = new Date(); //
        } else {
            console.error('El nombre de la categoría debe ser un texto no vacío.');
        }
    }

    set prefijo(nuevoPrefijo) {
        if (typeof nuevoPrefijo === 'string' && nuevoPrefijo.trim() !== '') {
            this.#prefijo = nuevoPrefijo.trim().toUpperCase();
            this.#updatedAt = new Date();
        } else {
            console.error('El prefijo no puede estar vacío.');
        }
    }

    set updatedAt(nuevoUpdatedAt) {
        if (nuevoUpdatedAt instanceof Date) {
            this.#updatedAt = nuevoUpdatedAt;
        } else {
            console.error('El valor proporcionado para la fecha de actualización no es un objeto Date válido.');
        }
    }
    set imagenCategoria(nuevaImagen) {
        if (typeof nuevaImagen === 'string' && nuevaImagen.trim() !== '') {
            this.#imagenCategoria = nuevaImagen.trim();
            this.#updatedAt = new Date()
        } else {
            console.error('La imagen no puede ser una url vacia')
        }
    }

    toJSON() {
        return {
            categoriaId: this.#categoriaId,
            nombreCategoria: this.#nombreCategoria,
            prefijo: this.#prefijo,
            imagenCategoria: this.#imagenCategoria,
            descripcion: this.#descripcion, 
            createdAt: this.#createdAt.toISOString(),
            updatedAt: this.#updatedAt.toISOString()
        };
    }
}