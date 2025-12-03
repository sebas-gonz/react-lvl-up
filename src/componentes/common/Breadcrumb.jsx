import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb() {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Volver</Link></li>
                <li className="breadcrumb-item"><Link to="/categorias">Categorías</Link></li>
                <li className="breadcrumb-item active" aria-current="page">producto</li>
            </ol>
        </nav>

    )
}
