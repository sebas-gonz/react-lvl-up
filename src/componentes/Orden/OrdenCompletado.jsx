import React from 'react'
import OrdenCompletadoCard from './OrdenCompletadoCard'

export default function OrdenRealizado() {
    return (
        <div className="card text-start mb-5">
            <div className="card-body">
                <section id="productos-comprados" className="py-3">
                    <div className="container">
                        <h5 className="card-title">
                            <i className="bi bi-check-circle text-success"></i>
                            Orden de compra.
                        </h5>
                        <div className="">
                            <em><small>Código de orden: ORDER12345</small></em>
                        </div>
                        <OrdenCompletadoCard></OrdenCompletadoCard>
                    </div>
                </section>
            </div>
        </div>
    )
}
