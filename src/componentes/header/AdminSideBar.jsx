import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth';
export default function AdminSideBar() {

    const { logout } = usarAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login'); 
    };
    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-start bg-body-tertiary" tabIndex="-1" id="sidebarMenu"
                aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"
                        data-bs-target="#sidebarMenu" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <ul className="nav flex-column">
                        <li className="nav-item mx-2">
                            <Link to="/admin" className="nav-link nav-menu d-flex gap-2 nav-active">
                                <i className="bi bi-house-fill"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/ordenes">
                                <i className="bi bi-file-earmark"></i>
                                Ordenes
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/productos">
                                <i className="bi bi-cart"></i>
                                Productos
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/categorias">
                                <i className="bi bi-list-ul"></i>
                                Categorías
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/usuarios">
                                <i className="bi bi-people"></i>
                                Usuarios
                            </Link>
                        </li>
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/reportes">
                                <i className="bi bi-graph-up"></i>
                                Reportes
                            </Link>
                        </li>
                    </ul>

                    <hr className="my-3" />

                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item mx-2">
                            <Link className="nav-link nav-menu d-flex gap-2" to="/admin/perfil/index.html">
                                <i className="bi bi-person-circle"></i>
                                Perfil
                            </Link>
                        </li>
                    </ul>

                    <hr className="my-3" />


                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item mt-2 mx-2">
                            <Link className="mx-4 text-center d-flex gap-2 btn btn-dark" to="/">
                                <i className="bi bi-shop"></i>
                                <strong>Tienda</strong>
                            </Link>
                        </li>
                        <li className="nav-item mt-2 mx-2">
                            <button className="mx-4 text-center d-flex gap-2 btn btn-danger w-75" onClick={handleLogout}> {/* Ajusta w-75 si es necesario */}
                                <i className="bi bi-door-closed"></i>
                                Cerrar Sesión
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
