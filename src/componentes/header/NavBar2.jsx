import React, { useEffect, useState } from 'react'
import '../../assets/estilos/header/navbar.css'
import { Link } from 'react-router-dom'
import api from '../../api/axiosConfig';
export default function NavBar2() {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try{
                const categoriasCargadas = await api.get('/categorias')
                setCategorias(categoriasCargadas.data)
            } catch(e){
                console.error("Error al cargar las categorias " + e)
            }
        }
        cargarCategorias()
    }, []);
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
                                {categorias.length > 0 ? (
                                    categorias.map(categoria => (
                                        <li key={categoria.categoriaId}>
                                            <Link
                                                className="dropdown-item"
                                                
                                                to={`/categorias/${categoria.categoriaId}`}
                                            >
                                                {categoria.nombreCategoria}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li><span className="dropdown-item">Cargando...</span></li>
                                )}
                                <li><hr className="dropdown-divider" /></li>
                                <li>
                                    <Link className="dropdown-item" to="/categorias">
                                        Ver Todas
                                    </Link>
                                </li>
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

                        <li className="nav-item ms-lg-5">
                            <Link className="btn btn-success ms-5" to="/carrito"><strong><i className="bi bi-cart4"></i> Carrito <span className=""> <strong>$5.000</strong></span>
                            </strong></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
