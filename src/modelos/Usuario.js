export default class Usuario {

    static #nextId = 1;
    #usuarioId
    #nombre;
    #apellido;
    #correo;
    #fechaNacimiento;
    #region;
    #comuna;
    #direccion;
    #run;
    #contraseña;
    #createdAt;
    #updatedAt;
    #tipoUsuario;

    static syncNextId(usuarios) {
        if (usuarios && usuarios.length > 0) {
            const maxId = Math.max(...usuarios.map(u => u.usuarioId));
            Usuario.#nextId = maxId + 1;
        }
    }


    constructor({ usuarioId, nombre, apellido, correo, fechaNacimiento, region, comuna, direccion, run,
        createdAt, contraseña, updatedAt, tipoUsuario
    }) {
        this.#usuarioId = usuarioId || Usuario.#nextId++
        if (this.#usuarioId === 1) {
            this.#tipoUsuario = 1
        } else if (tipoUsuario) {

            this.#tipoUsuario = tipoUsuario
        } else {

            this.#tipoUsuario = 3
        }
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#correo = correo;
        this.#fechaNacimiento = fechaNacimiento;
        this.#region = region;
        this.#comuna = comuna;
        this.#direccion = direccion;
        this.#run = run;
        this.#contraseña = contraseña;
        this.#createdAt = updatedAt ? new Date(createdAt) : new Date();
        this.#updatedAt = updatedAt ? new Date(updatedAt) : new Date();
    }

    get contraseña() {
        return this.#contraseña
    }

    get usuarioId() {
        return this.#usuarioId;
    }

    get nombre() {
        return this.#nombre;
    }

    get apellido() {
        return this.#apellido;
    }

    get correo() {
        return this.#correo;
    }

    get fechaNacimiento() {
        return this.#fechaNacimiento;
    }

    get region() {
        return this.#region;
    }

    get comuna() {
        return this.#comuna;
    }

    get direccion() {
        return this.#direccion;
    }

    get run() {
        return this.#run;
    }

    get createdAt() {
        return this.#createdAt;
    }

    get updatedAt() {
        return this.#updatedAt;
    }

    get tipoUsuario() {
        return this.#tipoUsuario;
    }

    set contraseña(nuevaContraseña) {
        if (typeof nuevaContraseña === 'string' && nuevaContraseña.trim() !== '') {
            this.#contraseña = nuevaContraseña.trim();
            this.#updatedAt = new Date()
        } else {
            console.error('La contraseña debe ser un texto no vacío.')
        }
    }

    set nombre(nuevoNombre) {
        if (typeof nuevoNombre === 'string' && nuevoNombre.trim() !== '') {
            this.#nombre = nuevoNombre.trim();
            this.#updatedAt = new Date();
        } else {
            console.error("El nombre debe ser un texto no vacío.");
        }
    }

    set apellido(nuevoApellido) {
        if (typeof nuevoApellido === 'string' && nuevoApellido.trim() !== '') {
            this.#apellido = nuevoApellido.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('El apellido debe ser un texto no vacío.');
        }
    }

    set correo(nuevoCorreo) {
        if (typeof nuevoCorreo === 'string' && nuevoCorreo.trim() !== '') {
            this.#correo = nuevoCorreo.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('El correo debe ser un texto no vacio.');
        }
    }

    set fechaNacimiento(nuevaFechaNacimiento) {
        if (nuevaFechaNacimiento instanceof Date) {
            this.#fechaNacimiento = nuevaFechaNacimiento;
            this.#updatedAt = new Date();
        } else {
            console.error('El valor para fecha de nacimiento no es un objeto Date válido.');
        }
    }

    set region(nuevaRegion) {
        if (typeof nuevaRegion === 'string' && nuevaRegion.trim() !== '') {
            this.#region = nuevaRegion.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('La región debe ser un texto no vacío.');
        }
    }

    set comuna(nuevaComuna) {
        if (typeof nuevaComuna === 'string' && nuevaComuna.trim() !== '') {
            this.#comuna = nuevaComuna.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('La comuna debe ser un texto no vacío.');
        }
    }

    set direccion(nuevaDireccion) {
        if (typeof nuevaDireccion === 'string' && nuevaDireccion.trim() !== '') {
            this.#direccion = nuevaDireccion.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('La dirección debe ser un texto no vacío.');
        }
    }

    set run(nuevoRun) {
        if (typeof nuevoRun === 'string' && nuevoRun.trim() !== '') {
            this.#run = nuevoRun.trim();
            this.#updatedAt = new Date();
        } else {
            console.error('El RUN debe ser un texto no vacío.');
        }
    }

    set tipoUsuario(nuevoTipoUsuario) {
        if (typeof nuevoTipoUsuario === 'number' && Number.isInteger(nuevoTipoUsuario)) {
            this.#tipoUsuario = nuevoTipoUsuario;
            this.#updatedAt = new Date();
        } else {
            console.error('El tipo de usuario debe ser un número entero.');
        }
    }

    toJSON() {
        return {

            usuarioId: this.#usuarioId,
            nombre: this.#nombre,
            apellido: this.#apellido,
            correo: this.#correo,
            fechaNacimiento: this.#fechaNacimiento,
            region: this.#region,
            comuna: this.#comuna,
            direccion: this.#direccion,
            run: this.#run,
            contraseña: this.#contraseña,
            tipoUsuario: this.#tipoUsuario,

            createdAt: this.#createdAt.toISOString(),
            updatedAt: this.#updatedAt.toISOString()
        };
    }
}