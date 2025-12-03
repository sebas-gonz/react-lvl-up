import React from 'react'
import { Link } from 'react-router-dom'

export default function Categorias({ categorias = [] }) {
    return (
        <div className='container my-4'> 
            <h2 className="text-center mb-4">Categorías</h2>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
                {categorias.map(categoria => (
                    <div className="col" key={categoria.categoriaId}>
                        <div className="card h-100 bg-dark text-light border-secondary">
                            <img
                                src={categoria.imagenCategoria}
                                className="card-img-top"
                                alt={categoria.nombreCategoria}
                                style={{ height: '150px', objectFit: 'cover' }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{categoria.nombreCategoria}</h5>
                                <Link to={`/categorias/${categoria.categoriaId}`} className="btn btn-primary mt-auto">Explorar</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
