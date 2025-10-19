export default class Categoria{
    static #nextId = 1
    #categoriaId;
    #nombreCategoria;
    #prefijo;
    #imagenCategoria;
    #createdAt;
    #updatedAt;

    static syncNextId(categorias) {
        if (categorias && categorias.length > 0) {
            const maxId = Math.max(...categorias.map(c => c.categoriaId));
            Categoria.#nextId = maxId + 1;
        }
    }

    constructor({categoriaId, nombreCategoria,prefijo,imagenCategoria,createdAt,updatedAt}){
        this.#categoriaId = categoriaId || Categoria.#nextId++
        this.#nombreCategoria = nombreCategoria;
        this.#prefijo = prefijo;
        this.#imagenCategoria = imagenCategoria
        this.#createdAt = createdAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get imagenCategoria(){
        return this.#imagenCategoria;
    }

    get categoriaId(){
        return this.#categoriaId;
    }

    get nombreCategoria(){
        return this.#nombreCategoria;
    }

    get createdAt(){
        return this.#createdAt;
    }

    get updatedAt(){
        return this.#updatedAt;
    }

    get prefijo(){
        return this.#prefijo;
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
    set imagenCategoria(nuevaImagen){
        if( typeof nuevaImagen === 'string' && nuevaImagen.trim() !== ''){
            this.#imagenCategoria = nuevaImagen.trim();
            this.#updatedAt = new Date()
        } else {
            console.error('La imagen no puede ser una url vacia')
        }
    }
}