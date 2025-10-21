import React from 'react'

export default function Login() {
    return (
        <div className="row">
            <div className="card">
                <div className="card-body row">
                    <div className="col-md-6">
                        <h2 className="mb-4 text-center">Iniciar Sesión</h2>
                        <div id="error" hidden className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>¡Error!</strong> Usuarios o Contraseña mal ingresados.
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        <form id="loginForm">
                            <div className="mb-3">
                                <label for="username" className="form-label">Usuario</label>
                                <input type="text" className="form-control" id="username" required/>
                            </div>
                            <div className="mb-3">
                                <label for="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" id="password" required/>
                            </div>
                            <div className="mb-3">
                                <a href="/crear-sesion.html">¿No tienes cuenta? Regístrate aquí</a>
                                <a href="/recuperar-contrasena.html" className="float-end">¿Olvidaste tu contraseña?</a>
                            </div>

                            <button type="submit" className="btn btn-primary w-100"><strong>INICIAR SESIÓN</strong></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
