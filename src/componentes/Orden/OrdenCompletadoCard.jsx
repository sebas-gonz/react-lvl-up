import React from 'react'

export default function OrdenCompletadoCard({ orden }) {

    const formatoChile = (valor) => `$${valor.toLocaleString('es-CL')}`

    const nombreCliente = `${orden.nombre}`;
    const apellidoCliente = `${orden.apellido}`
    const correoCliente = orden.correo || 'No disponible';
    const direccionCompleta = `${orden.direccion || ''}${orden.numeroDepartamento ? `, Depto ${orden.numeroDepartamento}` : ''}`;
    const regionCliente = orden.region || 'No disponible';
    const comunaCliente = orden.comuna || 'No disponible';
    const indicacionesCliente = orden.indicacion || '';
    const itemsOrden = orden.carritos || orden.items || [];
    const totalOrden = orden.total || 0;
    const numeroDepartamento = orden.numeroDepartamento
    return (
        <>
            <div className="row my-3">
                <div className="card mb-3 text-dark">
                    <div className="card-body row">

                        <div className="col-3 col-md-4 mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre<small
                                className="text-danger">*</small></label>
                            <input type="text" className="form-control" id="nombre" value={nombreCliente}
                                disabled readOnly name="nombre" required />
                        </div>
                        <div className="col-6 col-md-4 mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos<small
                                className="text-danger">*</small></label>
                            <input type="text" className="form-control" id="apellidos"
                                value={apellidoCliente} disabled readOnly name="apellidos"
                                required />
                        </div>

                        <div className="mb-3 col-md-4 col-6">
                            <label htmlFor="correo" className="form-label">Correo<small
                                className="text-danger">*</small></label>
                            <input type="email" className="form-control" id="correo" name="correo"
                                disabled value={correoCliente} required />
                        </div>
                    </div>
                </div>
                <div className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">Dirección de entrega de los productos</h5>
                        <div className="row">

                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="fechaNacimiento" className="form-label">Calle<small
                                    className="text-danger">*</small></label>
                                <input type="text" className="form-control" id="fechaNacimiento"
                                    value={direccionCompleta} disabled
                                    name="fechaNacimiento" required />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="fechaNacimiento" className="form-label">Departamento
                                    (opcional)</label>
                                <input type="text" className="form-control" id="fechaNacimiento"
                                    name="fechaNacimiento" disabled value={numeroDepartamento}
                                    placeholder="Ej: 603" />
                            </div>

                            <div className="mb-3 col-6 col-md-6">
                                <label htmlFor="regionSelect" className="form-label">Región<small
                                    className="text-danger">*</small></label>
                                <input type="text" className="form-control" value={regionCliente} disabled readOnly />
                            </div>
                            <div className="mb-3 col-6 col-md-6">
                                <label htmlFor="comunaSelect" className="form-label">Comuna<small
                                    className="text-danger">*</small></label>
                                <input type="text" className="form-control" value={comunaCliente} disabled readOnly />
                            </div>
                            <div className="mb-3">
                                <label htmlFor className="form-label">Indicaciones para la entrega
                                    (opcional)</label>
                                <textarea className="form-control" rows="3"
                                    disabled value={indicacionesCliente}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            Detalle de la compra
                        </h5>
                        <div className="table-responsive">
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
                                    {itemsOrden.length > 0 ? (
                                        itemsOrden.map((item, index) => (
                                            <tr key={item.carroId || item.productoId || index}>
                                                <td>
                                                    <img

                                                        src={item.imagenProducto}
                                                        alt={item.nombreProducto}
                                                        style={{ width: "50px", height: "auto", objectFit: 'contain' }}
                                                    />
                                                </td>
                                                <td className='align-middle'>{item.nombreProducto || 'N/A'}</td>
                                                <td className='text-end align-middle'>{formatoChile(item.precioUnitarioAlAgregar)}</td>
                                                <td className='text-center align-middle'>{item.cantidad || 0}</td>
                                                <td className='text-end align-middle'>{formatoChile(item.subTotal)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="5" className="text-center text-muted">No hay productos en esta orden.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mb-4">
                <div className="col-md-6">
                    <div className="card bg-success text-white shadow">
                        <div className="card-body py-3">
                            <h4 className="m-0 d-flex justify-content-between px-3">
                                <span>Total Pagado:</span>
                                <span className="fw-bold">{formatoChile(totalOrden)}</span>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
