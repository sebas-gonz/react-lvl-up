import Usuario from "./Usuario";
import Carrito from "./Carrito";
export default class Orden {
    static #nextId;
    #ordenId;
    #usuarioId;
    #carritos;
    #total;
    #createdAt;
    #updatedAt;

    #nombreCliente;
    #direccion;
    #comuna;
    #region;
    #numeroDepartamento;
    #indicacion;

    static syncNextId(ordenes) {
        if (ordenes && ordenes.length > 0) {
            const maxId = Math.max(...ordenes.map(o => o.ordenId));
            Orden.#nextId = maxId + 1;
        } else {
            Orden.#nextId = 1;
        }
    }

    constructor({
        usuario,
        carritos,
        ordenId,
        usuarioId,
        items,
        total,
        createdAt,
        updatedAt,
        estado,
        nombreCliente,
        direccion,
        comuna,
        region,
        numeroDepartamento = '',
        indicacion = ''
    }) {
        if (usuario && carritos) {

            this.#ordenId = Orden.#nextId++;
            this.#usuarioId = usuario.usuarioId;
            this.#carritos = carritos.map(itemData => new Carrito(itemData)); 
            this.#total = this.#carritos.reduce((acumulador, item) => acumulador + item.subTotal, 0)
            this.#nombreCliente = `${usuario.nombre} ${usuario.apellido}`;
            this.#direccion = usuario.direccion;
            this.#comuna = usuario.comuna;
            this.#region = usuario.region;
            this.#createdAt = new Date();
            this.#updatedAt = new Date();
        }
        else {
            this.#ordenId = ordenId;
            this.#usuarioId = usuarioId;
            this.#total = total;
            this.#nombreCliente = nombreCliente;
            this.#direccion = direccion;
            this.#comuna = comuna;
            this.#region = region;

            this.#createdAt = createdAt ? new Date(createdAt) : new Date();
            this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
            this.#carritos = (items || []).map(itemData => new Carrito(itemData));
        }

        // --- Común ---
        this.#numeroDepartamento = numeroDepartamento;
        this.#indicacion = indicacion;
    }


    get ordenId() {
        return this.#ordenId;
    }

    get usuarioId() {
        return this.#usuarioId;
    }

    get carritos() {
        return [...this.#carritos];

    }

    get total() {
        return this.#total;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get nombreCliente() {
        return this.#nombreCliente;
    }

    get direccion() {
        return this.#direccion;
    }

    get comuna() {
        return this.#comuna;

    }

    get region() {
        return this.#region;
    }

    get numeroDepartamento() {
        return this.#numeroDepartamento;
    }

    get indicacion() {
        return this.#indicacion;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    toJSON() {
        return {
            ordenId: this.#ordenId,
            usuarioId: this.#usuarioId,
            items: this.#carritos.map(item => item.toJSON()),
            total: this.#total,
            createdAt: this.#createdAt.toISOString(),
            updatedAt: this.#updatedAt.toISOString(),
            nombreCliente: this.#nombreCliente,
            direccion: this.#direccion,
            comuna: this.#comuna,
            region: this.#region,
            numeroDepartamento: this.#numeroDepartamento,
            indicacion: this.#indicacion
        };
    }
}