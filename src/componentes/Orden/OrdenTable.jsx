import React from 'react'
import { Link } from 'react-router-dom'

export default function OrdenTable({ items = [], total }) {

    const formatoChile = (valor) => `$${valor.toLocaleString('es-CL')}`;

    return (
        <div className="container">

            <div className="d-flex justify-content-between">
                <div>
                    <h4 className="card-title">Resumen</h4>
                    <p className="card-text">Completa la siguiente información</p>
                </div>
                <Link to="/carrito" className="btn btn-primary py-3">Total a pagar: <strong><span>{formatoChile(total)}</span></strong></Link>
            </div>
            <div className="table-responsive mt-3">
                <table className="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody id="comprados-list">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-muted fst-italic py-3">
                                    No hay productos en la orden.
                                </td>
                            </tr>
                        ) : (
                            items.map(item => (
                                <tr key={item.carroId || item.productoId}> 
                                    <td>
                                        <img
                                            src={item.imagenProducto}
                                            alt={item.nombreProducto}
                                            style={{ width: "50px", height: "auto", objectFit: 'contain' }} 
                                        />
                                    </td>
                                    <td className='align-middle'>{item.nombreProducto}</td>
                                    <td className='text-end align-middle'>{formatoChile(item.precioUnitarioAlAgregar)}</td>
                                    <td className='text-center align-middle'>{item.cantidad}</td>                              
                                    <td className='text-end align-middle'>{formatoChile(item.subTotal)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
