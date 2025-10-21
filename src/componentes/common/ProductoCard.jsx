import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductoCard() {
    return (
            <div className="card card-producto">
                <img src="https://via.placeholder.com/400x300" className="card-img-top" alt="Producto 3" />
                <div className="card-body">
                    <Link to="/productos/producto1.html" className="link-none">
                        <p className="card-title">Producto 1</p>
                    </Link>
                    <div className="d-flex flex-column mb-3">
                        <span className="precio-descuento text-decoration-line-through"><br /></span>
                        <span className="precio-nuevo fw-bolder">$ 13.450</span>
                    </div>
                    <div className="d-grid">
                        <Link className="btn btn-dark" to="/productos/producto1.html">Ver</Link>
                    </div>
                </div>
            </div>

    )
}
