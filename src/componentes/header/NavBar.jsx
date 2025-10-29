import React from 'react'
import '../../assets/estilos/header/navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth';
export default function NavBar() {

    const { usuarioActual, logout } = usarAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand mx-auto me-sm-auto" to="/">
                    <img src="src\assets\imagenes\logos\lvl-up-logo.png" alt="Logo" className="d-inline-block img-logo img-fluid" />
                </Link>
                <div className="collapse navbar-collapse justify-content-center" id="navbarTopContent">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Buscar" />
                        <button className="btn btn-outline-success" type="submit">Buscar</button>
                    </form>
                </div>
                <div className="d-flex align-items-center">
                    {!usuarioActual ? (
                        <>
                            <Link to="/login" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
                            <Link to="/iniciar-sesion" className="btn btn-primary ms-2">Crear Cuenta</Link>
                        </>
                    ) : (
                        <>
                        
                        <span className="navbar-text ms-2 d-none d-lg-block"> ¡Hola, {usuarioActual.nombre}! </span>
                        <button onClick={handleLogout} className="btn btn-danger btn-sm">Cerrar Sesión</button>
                        { (usuarioActual.tipoUsuario === 1 || usuarioActual.tipoUsuario === 2) && (
                            <Link to="/admin" className="btn btn-warning ms-2">Panel de administracion</Link>
                        )}
                        </>
                    )}
                    <button className="btn btn-primary d-lg-none ms-2" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasMobileMenu" aria-controls="offcanvasMobileMenu">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
