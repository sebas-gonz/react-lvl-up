import React from 'react'
import '../../assets/estilos/header/navbar.css'
import { Link } from 'react-router-dom'
export default function NavBar2() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary d-none d-lg-block">
            <div className="container-fluid">
                <div className="collapse navbar-collapse justify-content-center" id="navbarBottomContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/"><strong>Home</strong></Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Categorías
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/categorias">Acción</Link></li>
                                <li><Link className="dropdown-item" to="/categorias.html">Aventura</Link></li>
                                <li><Link className="dropdown-item" to="/categorias.html">Estrategia</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/ofertas">Ofertas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contacto">Contacto</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="btn btn-success ms-5" to="/carrito"><strong><i className="bi bi-cart4"></i> Carrito <span className=""> <strong>$5.000</strong></span>
                            </strong></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
