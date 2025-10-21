import React from 'react'
import '../../assets/estilos/header/navbar.css'
export default function OffCanvas() {
    return (
        <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasMobileMenu"
            aria-labelledby="offcanvasMobileMenuLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasMobileMenuLabel">Menú</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                <div className="card">
                    <div className="row g-0 d-flex justify-content-center">

                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Nombre del Usuario</h5>
                                <p className="card-text">correo@ejemplo.com</p>
                                <div className="d-flex justify-content-between">
                                    <a href="/#" className="btn btn-primary btn-sm">Ver Perfil</a>
                                    <a href="/#" className="btn btn-danger btn-sm">Cerrar Sesión</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex my-3">
                    <a href="/iniciar-sesion.html" className="btn btn-outline-primary ms-2">Iniciar Sesión</a>
                    <a href="/crear-sesion.html" className="btn btn-primary ms-2">Crear Cuenta</a>
                </div>


                <ul className="list-group">
                    <li className="list-group-item">
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                        Categorías
                                    </button>
                                </h2>
                                <div id="flush-collapseOne" className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionFlushExample">
                                    <ul className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Cras justo odio
                                            <span className="badge bg-primary rounded-pill">14</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Cras justo odio
                                            <span className="badge bg-primary rounded-pill">14</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            Cras justo odio
                                            <span className="badge bg-primary rounded-pill">14</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="list-group-item"><a href="/#" className="link-none">Ofertas</a></li>
                    <li className="list-group-item"><a href="/#" className="link-none">Historial</a></li>
                </ul>
            </div>
        </div>
    )
}
