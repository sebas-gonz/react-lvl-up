import React from 'react'
import { Link } from 'react-router-dom'

export default function BlogCard() {
    return (
        <div className="card">
            <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Acción"/>
                <div className="card-body">
                    <h5 className="card-title">Acción</h5>
                    <p className="card-text">Juegos llenos de adrenalina y emoción.</p>
                    <Link to="/nosotros" className="btn btn-primary">Explorar</Link>
                </div>
        </div>
    )
}
