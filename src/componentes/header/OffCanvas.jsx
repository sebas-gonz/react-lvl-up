import React from 'react'
import '../../assets/estilos/header/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth'
export default function OffCanvas() {

    const { usuarioActual, logout } = usarAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="offcanvas offcanvas-start text-bg-dark" tabIndex="-1" id="offcanvasMobileMenu"
            aria-labelledby="offcanvasMobileMenuLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasMobileMenuLabel">Menú</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">

                {usuarioActual ? (
                    
                    <div className="card bg-secondary text-light mb-3"> 
                        <div className="row g-0 d-flex justify-content-center">
                            <div className="col-8">
                                <div className="card-body">
                                    <h5 className="card-title">{usuarioActual.nombre} {usuarioActual.apellido}</h5>
                                    <p className="card-text"><small>{usuarioActual.correo}</small></p>
                                    <div className="d-flex justify-content-between">
                                        <Link to="/#" className="btn btn-primary btn-sm">Ver Perfil</Link> 
                                        <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    
                    <div className="d-flex my-3">
                        <Link to="/login" className="btn btn-outline-primary ms-2" data-bs-dismiss="offcanvas">Iniciar Sesión</Link>
                        <Link to="/iniciar-sesion" className="btn btn-primary ms-2" data-bs-dismiss="offcanvas">Crear Cuenta</Link>
                    </div>
                )}


                <ul className="list-group">
                    <li className="list-group-item bg-dark">
                        <div className="accordion accordion-flush" id="accordionFlushExample">
                            <div className="accordion-item bg-dark">
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
                    <li className="list-group-item"><Link to="/ofertas" className="link-none">Ofertas</Link></li>
                    <li className="list-group-item"><Link to="#" className="link-none">Historial</Link></li>
                </ul>
            </div>
        </div>
    )
}
