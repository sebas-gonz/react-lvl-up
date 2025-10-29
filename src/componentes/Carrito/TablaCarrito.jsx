import React from 'react'

export default function TablaCarrito({ items = [], onActualizarCantidad, onEliminar, total }) {

    const formatoChile = (valor) => typeof valor === 'number' ? `$${valor.toLocaleString('es-CL')}` : '$0';

    const handleDisminuir = (item) => {
        onActualizarCantidad(item.carroId, item.cantidad - 1);
    };

    const handleAumentar = (item) => {
        onActualizarCantidad(item.carroId, item.cantidad + 1);
    };

    const handleEliminarClick = (carroId) => {
        onEliminar(carroId);
    };

    return (
        <div className="table-responsive">
            <table className="table table-striped" id="cart-table">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="cart-list">
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center text-muted fst-italic py-3">
                                Tu carrito está vacío
                            </td>
                        </tr>
                    ) : (

                        items.map(item => (
                            <tr key={item.carroId}>
                                <td>

                                    <img
                                        src={item.imagenProducto}
                                        alt={item.nombreProducto}
                                        style={{ width: '50px', height: 'auto', objectFit: 'contain' }}
                                    />
                                </td>

                                <td className="align-middle">{item.nombreProducto}</td>

                                <td className="text-end align-middle">{formatoChile(item.precioProducto)}</td>
                                <td className="text-center align-middle">
                                    <div className="d-flex align-items-center justify-content-center">

                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => handleDisminuir(item)}
                                            disabled={item.cantidad <= 1}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.cantidad}</span>

                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => handleAumentar(item)}

                                        >
                                            +
                                        </button>
                                    </div>
                                </td>

                                <td className="text-end align-middle">{formatoChile(item.subTotal)}</td>
                                <td className="text-center align-middle">

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleEliminarClick(item.carroId)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    {items.length > 0 && (
                        <tr>
                            <td colSpan="4" className="text-end fw-bold border-0">Total</td> 
                        
                            <td colSpan="2" className="fw-bold text-end border-0 fs-5"> 
                                {formatoChile(total)}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
