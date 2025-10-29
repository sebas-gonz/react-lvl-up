import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductoCard({producto}) {
    const formatoChile = (precio) => {
        
        return typeof precio === 'number' ? `$${precio.toLocaleString('es-CL')}` : 'Precio no disponible';
    };

    const id = producto.productoId; 
    const nombre = producto.nombreProducto; 
    const imagen = producto.imagenesProducto; 
    const precio = producto.precioProducto;
    return (
            <div className="card card-producto">
                <img src={imagen} className="card-img-top" alt={nombre} />
                <div className="card-body">
                    <Link to="/productos/producto1.html" className="link-none">
                        <p className="card-title">{nombre}</p>
                    </Link>
                    <div className="d-flex flex-column mb-3">
                        <span className="precio-descuento text-decoration-line-through"><br /></span>
                        <span className="precio-nuevo fw-bolder">{formatoChile(precio)}</span>
                    </div>
                    <div className="d-grid">
                        <Link className="btn btn-dark" to="/productos/producto1.html">Ver</Link>
                    </div>
                </div>
            </div>

    )
}
