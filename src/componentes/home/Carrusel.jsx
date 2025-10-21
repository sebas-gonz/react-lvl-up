import React from 'react'

export default function Carrusel() {
    return (
        <div className="">
            <div className="d-md-none">
                <div id="carouselMobile" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselMobile" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselMobile" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselMobile" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://via.placeholder.com/900x500" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Nuevos Lanzamientos</h5>
                                    <p>Descubre los últimos juegos disponibles en nuestra tienda.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/900x500" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Ofertas Especiales</h5>
                                    <p>Aprovecha nuestros descuentos exclusivos.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/900x500" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Juegos Más Vendidos</h5>
                                    <p>Explora los títulos más populares entre nuestros clientes.</p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselMobile"
                        data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselMobile"
                        data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>
            </div>

            <div className="d-none d-md-block">
                <div id="carouselWeb" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselWeb" data-bs-slide-to="0" className="active"
                            aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselWeb" data-bs-slide-to="1"
                            aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselWeb" data-bs-slide-to="2"
                            aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="https://via.placeholder.com/1200x300" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Nuevos Lanzamientos</h5>
                                    <p>Descubre los últimos juegos disponibles en nuestra tienda.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/1200x300" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Ofertas Especiales</h5>
                                    <p>Aprovecha nuestros descuentos exclusivos.</p>
                                </div>
                        </div>
                        <div className="carousel-item">
                            <img src="https://via.placeholder.com/1200x300" className="d-block w-100" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>Juegos Más Vendidos</h5>
                                    <p>Explora los títulos más populares entre nuestros clientes.</p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselWeb" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Anterior</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselWeb" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Siguiente</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
