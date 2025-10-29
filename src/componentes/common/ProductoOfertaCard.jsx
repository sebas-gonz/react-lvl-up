import React from 'react';
import { Link } from 'react-router-dom';


export default function ProductoOfertaCard({ producto }) {

    const formatoChile = (precio) => {

        return typeof precio === 'number' ? `$${precio.toLocaleString('es-CL')}` : 'Precio no disponible';
    };

    const id = producto.productoId;
    const nombre = producto.nombreProducto;
    const imagen = producto.imagenesProducto;
    const precio = producto.precioProducto;
    return (

        <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card card-producto h-100 bg-dark text-light border-secondary">

                <img
                    src={imagen}
                    className="card-img-top"
                    alt={nombre}
                    style={{ height: '200px', objectFit: 'contain' }}
                />
                <div className="card-body d-flex flex-column">
                    <Link to={`/productos/${id}`} className="link-light text-decoration-none">
                        <h5 className="card-title">{nombre}</h5>
                    </Link>
                    <div className="d-flex flex-column mb-3 mt-auto">
                        <span className="precio-nuevo fw-bolder text-warning fs-5">{formatoChile(precio)}</span>
                    </div>
                    <div className="d-grid">
                        <Link className="btn btn-primary" to={`/productos/${id}`}>Ver Detalles</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
