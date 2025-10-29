import React from 'react'
import { Link } from 'react-router-dom';
export default function Carrusel({ productos = [] }) {

    if (productos.length === 0) {
        return (
            <div className="container my-4 text-center">

                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }
    const carouselId = "homeCarousel";
    return (
        <div className="mb-4">
            <div id={carouselId} className="carousel slide" data-bs-ride="carousel">

                <div className="carousel-indicators">
                    {productos.map((producto, index) => (
                        <button
                            key={producto.productoId || index}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? 'active' : ''}
                            aria-current={index === 0 ? 'true' : 'false'}
                            aria-label={`Slide ${index + 1}`}
                        ></button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {productos.map((producto, index) => (

                        <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={producto.productoId || index}>
                            <Link to={`/productos/${producto.productoId}`}>
                                <img
                                    src={producto.imagenesProducto}
                                    className="d-block w-100"
                                    alt={producto.nombreProducto}

                                    style={{ maxHeight: '400px', objectFit: 'contain', minHeight: '200px', backgroundColor: '#212529' }}
                                />
                            </Link>

                            <div className="carousel-caption d-none d-md-block">
                                <h5>{producto.nombreProducto || `Producto ${index + 1}`}</h5>

                            </div>
                        </div>
                    ))}
                </div>

                <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Anterior</span>
                </button>

                <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Siguiente</span>
                </button>
            </div>

        </div>
    )
}
