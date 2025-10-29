import React from 'react'

export default function DashBoardAdmin() {
    return (
        <>
            <h4 className="card-title">Dashboard</h4>
            <p className="card-text">Resumen de las actividades diarias</p>

            <div className="container dashboard-section mb-3">
                <div className="row g-4">
                    <div className="col-6 col-md-4">
                        <div className="card text-white dashboard-card card-primary">
                            <div className="card-body bg-primary">
                                <div className="d-flex align-items-center">
                                    <div className="dashboard-icon">
                                        <i className="bi bi-cart-fill"></i>
                                    </div>
                                    <div className="ms-5">
                                        <h5 className="card-title">Compras</h5>
                                        <h3 className="card-text">1,234</h3>
                                    </div>
                                </div>
                                <p className="card-text text-center mt-3">Probabilidad de aumento: <strong>20%</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4">
                        <div className="card text-white dashboard-card card-success">
                            <div className="card-body bg-success">
                                <div className="d-flex align-items-center">
                                    <div className="dashboard-icon">
                                        <i className="bi bi-box-seam"></i>
                                    </div>
                                    <div className="ms-5">
                                        <h5 className="card-title">Productos</h5>
                                        <h3 className="card-text">400</h3>
                                    </div>
                                </div>
                                <p className="card-text text-center mt-3">Inventario actual: <strong>500</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-4">
                        <div className="card text-white dashboard-card card-warning">
                            <div className="card-body bg-warning">
                                <div className="d-flex align-items-center">
                                    <div className="dashboard-icon">
                                        <i className="bi bi-people-fill"></i>
                                    </div>
                                    <div className="ms-5">
                                        <h5 className="card-title">Usuarios</h5>
                                        <h3 className="card-text">890</h3>
                                    </div>
                                </div>
                                <p className="card-text text-center mt-3">Nuevos usuarios este mes: <strong>120</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
