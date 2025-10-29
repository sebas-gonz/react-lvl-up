import React from 'react'

export default function OrdenCompletadoCard() {
    const ordenData = {
        nombre: "pedro",
        apellido: "hacker", 
        correo: "pedro.hacer20@example.com",
        calle: "Los crisantemos, Edificio Norte",
        depto: "Depto 603",
        region: "Región Metropolitana de Santiago",
        comuna: "Cerrillos",
        indicaciones: "El martes no estaremos en el depto, pero puede dejarselo con el conserje.",
        productos: [
            { id: 1, img: "https://via.placeholder.com/50", nombre: "Fortnite", precio: 0, cantidad: 1, subtotal: 0 }
        
        ],
        totalPagado: 28775
    };

    return (
        <>
            <div className="row my-3">
                <div className="card mb-3">
                    <div className="card-body row">

                        <div className="col-3 col-md-4 mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre<small
                                className="text-danger">*</small></label>
                            <input type="text" className="form-control" id="nombre" value="pedro"
                                disabled readOnly name="nombre" required />
                        </div>
                        <div className="col-6 col-md-4 mb-3">
                            <label htmlFor="apellidos" className="form-label">Apellidos<small
                                className="text-danger">*</small></label>
                            <input type="text" className="form-control" id="apellidos"
                                value="hacker" disabled readOnly name="apellidos"
                                required />
                        </div>

                        <div className="mb-3 col-md-4 col-6">
                            <label htmlFor="correo" className="form-label">Correo<small
                                className="text-danger">*</small></label>
                            <input type="email" className="form-control" id="correo" name="correo"
                                disabled value="pedro.hacer20@example.com" required />
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
                                    value="Los crisantemos, Edificio Norte" disabled
                                    name="fechaNacimiento" required />
                            </div>
                            <div className="mb-3 col-12 col-md-6">
                                <label htmlFor="fechaNacimiento" className="form-label">Departamento
                                    (opcional)</label>
                                <input type="text" className="form-control" id="fechaNacimiento"
                                    name="fechaNacimiento" disabled value="Depto 603"
                                    placeholder="Ej: 603" />
                            </div>

                            <div className="mb-3 col-6 col-md-6">
                                <label htmlFor="regionSelect" className="form-label">Región<small
                                    className="text-danger">*</small></label>
                                <select className="form-select" id="regionSelect" disabled
                                    required>
                                    <option value="1000">Región Metropolitana de Santiago
                                    </option>
                                </select>
                            </div>
                            <div className="mb-3 col-6 col-md-6">
                                <label htmlFor="comunaSelect" className="form-label">Comuna<small
                                    className="text-danger">*</small></label>
                                <select className="form-select" id="comunaSelect" disabled
                                    required>
                                    <option value="1001">Cerrillos</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor className="form-label">Indicaciones para la entrega
                                    (opcional)</label>
                                <textarea className="form-control" rows="3"
                                    placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                                    disabled></textarea>
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
                                    <tr>
                                        <td><img src="https://via.placeholder.com/400x300"
                                            alt="Fortnite"  /></td>
                                        <td>Fortnite</td>
                                        <td>$ 0</td>
                                        <td>1</td>
                                        <td>$ 0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mb-3">
                <div className="card bg-white">
                    <div className="card-body">
                        <h4>Total pagado: $ 28775</h4>
                    </div>
                </div>
            </div>
        </>
    )
}
