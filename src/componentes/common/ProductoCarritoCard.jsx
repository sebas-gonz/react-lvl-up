import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductoCarritoCard({producto, onAgregar}) {
    if (!producto) return null;
    const id = producto.productoId;
    const nombre = producto.nombreProducto;
    const imagen = producto.imagenesProducto; 
    const precio = producto.precioProducto;

    const formatoChile = (valor) => typeof valor === 'number' ? `$${valor.toLocaleString('es-CL')}` : '';

    const handleAgregarClick = () => {
        onAgregar(producto); 
    };

    return (
        <div className="col col-md-3">
            <div className="card card-producto">
                <img src={imagen} className="card-img-top" alt={nombre} />
                <div className="card-body">
                    <Link to={`/productos/${id}`} className="link-none">
                        <p className="card-title">{nombre}</p>
                    </Link>
                    <div className="d-flex flex-column mb-2 mt-auto">
                        <span className="precio-nuevo fw-bolder">{formatoChile(precio)}</span>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary btn-sm" onClick={handleAgregarClick}> 
                            Añadir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
