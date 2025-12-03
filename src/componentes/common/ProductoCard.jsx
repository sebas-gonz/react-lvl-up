import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductoCard({ producto }) {
    const formatoChile = (precio) => {

        return typeof precio === 'number' ? `$${precio.toLocaleString('es-CL')}` : 'Precio no disponible';
    };

    const productoId = producto.productoId;
    const nombre = producto.nombreProducto;
    const imagen = producto.imagenProducto;
    const precio = producto.precio;
    return (
        <div className="card card-producto">
            <img src={imagen} className="card-img-top" alt={nombre} />
            <div className="card-body">
                <Link to={`/productos/${productoId}`} className="link-none">
                    <p className="card-title">{nombre}</p>
                </Link>
                <div className="d-flex flex-column mb-3 mt-auto">
                    {producto.precioOferta !== null && producto.precioOferta < precio && (
                        
                        <span className=" text-decoration-line-through small text-danger">
                            {formatoChile(precio)}
                        </span>
                    )}
                    <span className="fw-bolder text-warning fs-5">
                        
                        {producto.precioOferta !== null && producto.precioOferta < precio
                            ? formatoChile(producto.precioOferta)
                            : formatoChile(precio)}
                    </span>
                </div>
                <div className="d-grid">
                    <Link className="btn btn-dark" to={`/productos/${productoId}`}>Ver</Link>
                </div>
            </div>
        </div>

    )
}
