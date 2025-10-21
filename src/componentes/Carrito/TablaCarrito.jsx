import React from 'react'

export default function TablaCarrito() {
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
                    <tr>
                        <td><img src="https://via.placeholder.com/50" alt="producto ejemplo" style={{ width: '50px' }} /></td>
                        <td>producto</td>
                        <td>$20.000</td>
                        <td>
                            <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary btn-sm">-</button>
                                <span className="mx-2">20</span>
                                <button className="btn btn-outline-secondary btn-sm">+</button>
                            </div>
                        </td>
                        <td>$20.000</td>
                        <td><button className="btn btn-danger btn-sm">Eliminar</button></td>
                    </tr>
                    <tr>
                        <td colspan="4" className="text-end fw-bold">Total</td>
                        <td colspan="2" className="fw-bold"><strong>$20.000</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
