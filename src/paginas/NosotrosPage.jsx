import React from 'react'
import { Link } from 'react-router-dom'

export default function NosotrosPage() {
    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <img src="src\assets\imagenes\Banner\banner2.png" className="card-img-top" alt="Videojuegos Retro"/>
                        <div className="card-body">
                            <h4 className="card-title text-center mb-3">🎮 Historia de RetroGaming Haven</h4>
                            <h4 className="mb-2 text-muted">Un Viaje al Pasado 🚀</h4>
                            <p className="card-text">
                                RetroGaming Haven nació en el año 2010, en un pequeño local del centro de la ciudad, fundado por dos amigos apasionados por los videojuegos de su infancia. Con un sueño compartido de revivir la emoción de las consolas y juegos clásicos, comenzaron Link coleccionar, restaurar y vender videojuegos y consolas retro.
                            </p>
                            <h4 className="mb-2 text-muted">Crecimiento y Comunidad 🌟</h4>
                            <p className="card-text">
                                Con el tiempo, RetroGaming Haven se ganó la reputación de ser un santuario para los amantes de los videojuegos clásicos. Organizamos eventos temáticos y torneos que reúnen Link jugadores de todas las edades para compartir su amor por los juegos de antaño. Nuestra comunidad creció rápidamente, y en 2015, inauguramos nuestra tienda en línea, permitiendo que los aficionados de todo el mundo accedan Link nuestro catálogo de tesoros retro.
                            </p>
                            <h4 className="mb-2 text-muted">🎯 Misión</h4>
                            <p className="card-text">
                                Nuestra misión es preservar y celebrar la rica historia de los videojuegos, ofreciendo una experiencia única y nostálgica Link nuestros clientes. Nos esforzamos por ser un puente entre generaciones, proporcionando productos de calidad y servicios excepcionales Link los coleccionistas y entusiastas del gaming clásico.
                            </p>
                            <h4 className="mb-2 text-muted">🔮 Visión</h4>
                            <p className="card-text">
                                En RetroGaming Haven, soñamos con ser líderes mundiales en el mercado de videojuegos retro, comprometidos con la innovación y la expansión de nuestra comunidad global. Buscamos ser el destino predilecto para quienes desean revivir y compartir los momentos dorados del pasado del gaming.
                            </p>
                            <h4 className="mb-2 text-muted">🚀 Innovación Continua</h4>
                            <p className="card-text">
                                A lo largo de los años, hemos ampliado nuestra oferta para incluir servicios de reparación y restauración de consolas, así como una línea exclusiva de merchandising inspirado en los clásicos del videojuego. En el futuro, planeamos lanzar una serie de documentales que exploren la evolución de los videojuegos y su impacto en la cultura popular.
                            </p>


                            <div className="text-center">
                                <div className="row">              
                                    <div className="col-lg-4 d-flex flex-column mx-auto">
                                        <img src="/assets/img/pedro.png" className="bd-placeholder-img rounded-circle" width="140" height="140" alt=""/>
                                            <h2 className="fw-normal">Pedro</h2>
                                            <small><strong>Programador</strong></small>
                                            <p>Estudiante de informática Duoc UC 🎮 Me gusta programar.</p>
                                            <div className="d-flex justify-content-center">
                                                <Link to="https://github.com/pedrohacker20" className="btn btn-dark btn-sm"><i className="bi bi-github"></i></Link>
                                                <Link to="https://www.linkedin.com/feed/" className="btn btn-dark btn-sm mx-2"><i className="bi bi-linkedin"></i></Link>
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
