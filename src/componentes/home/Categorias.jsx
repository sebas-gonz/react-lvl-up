import React from 'react'

export default function Categorias() {
    return (
        <div className='container'>
            <h2 className="text-center mb-4">Categorías</h2>
            <div className='row'>
                <div className="col-md-4">
                    <div className="card">
                        <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="Acción"/>
                            <div className="card-body">
                                <h5 className="card-title">Acción</h5>
                                <p className="card-text">Juegos llenos de adrenalina y emoción.</p>
                                <a href="/categorias.html" className="btn btn-primary">Explorar</a>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
