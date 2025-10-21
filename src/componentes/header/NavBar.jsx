import React from 'react'
import '../../assets/estilos/header/navbar.css'
import { Link } from 'react-router-dom'
export default function NavBar() {
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
                <div className="d-flex">
                    <Link to="/login" className="btn btn-outline-primary ms-2">Iniciar Sesión</Link>
                    <Link to="/iniciar-sesion" className="btn btn-primary ms-2">Crear Cuenta</Link>
                    <button className="btn btn-primary d-lg-none ms-2" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasMobileMenu" aria-controls="offcanvasMobileMenu">
                        <span className="navbar-toggler-icon text-white"></span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
