import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductoCarritoCard() {
    return (
        <div className="col col-md-3">
            <div className="card card-producto">
                <img src="https://via.placeholder.com/50" className="card-img-top" alt="ejemplo" />
                <div className="card-body">
                    <Link to="#" className="link-none">
                        <p className="card-title">producto</p>
                        <small className="text-muted">categoria</small>
                    </Link>
                    <div className="d-flex flex-column mb-3">
                        <span className="precio-nuevo fw-bolder">18.999</span>
                    </div>
                    <div className="d-grid">
                        <small className="text-muted">Stock Disponible 8</small>
                        <button className="btn btn-dark">Añadir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
