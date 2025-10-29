import React from 'react'
import { Link } from 'react-router-dom'

export default function NosotrosPage() {
    return (
        <div className="container my-4">
            <div className="row justify-content-center">
                <div className="col-lg-10 col-xl-8">
                    <div className="card bg-dark text-light border-secondary">
                        <img src="src\assets\imagenes\Banner\banner2.png" className="card-img-top" alt="Banner Lvl-Up" />
                        <div className="card-body">
                            <h4 className="card-title text-center mb-4">🎮 Sobre Lvl-Up</h4>

                            <section className="mb-4">
                                <h5 className="mb-2 text-primary">💻 Proyecto Académico - Programación Full Stack II</h5>
                                <p className="card-text">
                                    Este proyecto fue desarrollado por <strong>Sebastián González</strong>, estudiante de segundo año de
                                    <strong> Duoc UC</strong>, como parte del ramo <strong>Programación Full Stack II (Año 2025)</strong>.
                                    Está construido utilizando <strong>React</strong> con <strong>Vite</strong> como herramienta de construcción.
                                </p>
                                <p className="card-text">
                                    La finalidad de este proyecto es afianzar las habilidades en el desarrollo web moderno,
                                    demostrando la capacidad del estudiante para diseñar y construir una plataforma de e-commerce
                                    funcional, atractiva y adaptable, orientada a empresas que deseen vender sus productos en línea.
                                    Este trabajo integra los conocimientos adquiridos en front-end, back-end y buenas prácticas
                                    de desarrollo, reflejando un enfoque profesional en la creación de aplicaciones web completas.
                                </p>
                            </section>

                            <hr className="my-4" />

                            <section className="text-center">
                                <h5 className="mb-3">Desarrollado por</h5>
                                <div className="row justify-content-center">
                                    <div className="col-lg-6 d-flex flex-column align-items-center">
                                        <img
                                            src="https://avatars.githubusercontent.com/u/135254198?v=4"
                                            className="bd-placeholder-img rounded-circle mb-2"
                                            width="140"
                                            height="140"
                                            alt="Sebastián González"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <h2 className="fw-normal fs-4 mb-1">Sebastián González</h2>
                                        <small className='d-block mb-2'><strong>Estudiante Desarrollador</strong></small>

                                        <div className="d-flex justify-content-center">
                                            <a href="https://github.com/sebas-gonz" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm me-2">
                                                <i className="bi bi-github"></i> GitHub
                                            </a>
                                            <a href="#" target="_blank" rel="noopener noreferrer" className="btn btn-light btn-sm">
                                                <i className="bi bi-linkedin"></i> LinkedIn
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
