import React from 'react'
import { Link } from 'react-router-dom'

export default function OrdenTable() {
    return (
        <div className="container">

            <div className="d-flex justify-content-between">
                <div className="">
                    <h4 className="card-title">Carrito de compra</h4>
                    <p className="card-text">Completa la siguiente información</p>
                </div>
                <Link to="/carrito" className="btn btn-primary py-3">Total Link pagar: <strong><span id="totalPago">$5.000</span></strong></Link>
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
                        <tr>
                            <td><img src="#" alt="producto-ejemplo" style={{width: "50px;"}}/></td>
                            <td>nombre</td>
                            <td>20.000</td>
                            <td>20</td>
                            <td>20.000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
