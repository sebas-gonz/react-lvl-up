import React from 'react'
import { Link } from 'react-router-dom'
import OrdenCompletado from "../OrdenCompletado.jsx"
export default function OrdenAdmin() {
    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="mt-4">
                <div className="col-sm-12">
                    <h4>
                        <Link to="/admin/ordenes" className="text-secondary me-2 decoration-none">
                            <i className="bi bi-arrow-left-circle-fill"></i>
                        </Link>
                        Orden de compra #20240705
                    </h4>
                </div>
                <p className="card-text">Boleta emitida 05/08/2024 14:30</p>
                <OrdenCompletado></OrdenCompletado>
            </div>
        </main>
    )
}
