import React from 'react'

export default function Registro() {
    return (
        <div class="row">
            <div class="col-md-5 d-none d-md-block">
                <img src="https://via.placeholder.com/600x400" class="product-img" alt="Producto" />
            </div>
            <div class="col-md-7">
                <div class="card text-start ">
                    <div class="card-body">
                        <h4 class="card-title">Registro de nuevo usuario</h4>
                        <p class="card-text">Bienvenidos</p>
                        <div class="row">
                            <div class="col-6 mb-3">
                                <label for="nombre" class="form-label">Run<small
                                    class="text-danger">*</small></label>
                                <input type="text" class="form-control" id="nombre" placeholder="ej: 11111111K"
                                    name="nombre" required />
                            </div>
                            <div class="mb-3 col-6 col-md-6">
                                <label for="fechaNacimiento" class="form-label">Fecha nacimiento<small
                                    class="text-danger">*</small></label>
                                <input type="date" class="form-control" id="fechaNacimiento"
                                    name="fechaNacimiento" required />
                            </div>
                            <div class="col-6 mb-3">
                                <label for="nombre" class="form-label">Nombre<small
                                    class="text-danger">*</small></label>
                                <input type="text" class="form-control" id="nombre" name="nombre" required />
                            </div>
                            <div class="col-6 mb-3">
                                <label for="apellidos" class="form-label">Apellidos<small
                                    class="text-danger">*</small></label>
                                <input type="text" class="form-control" id="apellidos" name="apellidos"
                                    required />
                            </div>

                            <div class="mb-3 col-6">
                                <label for="correo" class="form-label">Correo<small
                                    class="text-danger">*</small></label>
                                <input type="email" class="form-control" id="correo" name="correo" required />
                            </div>

                            <div class="mb-3 col-6">
                                <label for="password" class="form-label">Contraseña<small
                                    class="text-danger">*</small></label>
                                <input type="password" class="form-control" id="password" name="password"
                                    required />
                            </div>
                        </div>
                        <div class="text-center">
                            <button type="button" class="btn btn-primary"
                                onclick="handleGuardar()">Registrarse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
