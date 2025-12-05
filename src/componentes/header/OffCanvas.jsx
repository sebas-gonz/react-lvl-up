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
                <h5 className="offcanvas-title" id="offcanvasMobileMenuLabel">{usuarioActual ? "Mi Perfil" : "Menú"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                {usuarioActual ? (
                    <div className="card bg-secondary text-light mb-3">
                        <div className="card-body text-center">
                            <div className="mb-3">
                                {usuarioActual.fotoUsuario ? (
                                    <img
                                        src={usuarioActual.fotoUsuario}
                                        alt="Foto de perfil"
                                        className="rounded-circle border border-2 border-white"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <i className="bi bi-person-circle text-light" style={{ fontSize: '4rem' }}></i>
                                )}
                            </div>


                            <h5 className="card-title fw-bold">{usuarioActual.nombre} {usuarioActual.apellido}</h5>
                            <p className="card-text small">{usuarioActual.email || usuarioActual.correo}</p>

                            <div className="d-grid gap-2">
                                <Link to="/perfil" className="btn btn-primary btn-sm">Ver Perfil Completo</Link>
                                {usuarioActual.rol && (usuarioActual.rol.rolId === 1 || usuarioActual.rol.rolId === 2) && (
                                    <Link to="/admin" className="btn btn-warning btn-sm">Panel Administración</Link>
                                )}

                                <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
                            </div>
                        </div>
                    </div>
                ) : (

                    <div className="d-flex my-3">
                        <Link to="/login" className="btn btn-outline-primary ms-2" data-bs-dismiss="offcanvas">Iniciar Sesión</Link>
                        <Link to="/iniciar-sesion" className="btn btn-primary ms-2" data-bs-dismiss="offcanvas">Crear Cuenta</Link>
                    </div>
                )}
                <ul className="list-group list-group-flush">
                    {usuarioActual && (
                        <>
                            <li className="list-group-item bg-dark border-secondary">
                                <Link to="/perfil/editar" className="text-decoration-none text-light d-block py-2">
                                    <i className="bi bi-pencil-square me-3 text-primary"></i>Editar mis datos
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark border-secondary">
                                <Link to="/perfil/direcciones" className="text-decoration-none text-light d-block py-2">
                                    <i className="bi bi-geo-alt-fill me-3 text-danger"></i>Mis Direcciones
                                </Link>
                            </li>
                            <li className="list-group-item bg-dark border-secondary p-0"><hr className="m-0 border-secondary"/></li>
                        </>
                    )}
                    <li className="list-group-item bg-dark border-secondary">
                        <Link to="/ofertas" className="text-decoration-none text-light d-block py-2">
                            <i className="bi bi-tag-fill me-2"></i>Ofertas
                        </Link>
                    </li>
                    <li className="list-group-item bg-dark border-secondary">
                        <Link to="/perfil/historial" className="text-decoration-none text-light d-block py-2">
                            <i className="bi bi-clock-history me-2"></i>Historial de Compras
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
