import React from 'react'

export default function OrdenFormulario() {
    return (
        <div className="row">
            <h4 className="card-title">Información del cliente</h4>
            <p className="card-text">Completa la siguiente información</p>
            <div className="col-6 mb-3">
                <label for="nombre" className="form-label">Nombre<small
                    className="text-danger">*</small></label>
                <input type="text" className="form-control" id="nombre" name="nombre" required/>
            </div>
            <div className="col-6 mb-3">
                <label for="apellidos" className="form-label">Apellidos<small
                    className="text-danger">*</small></label>
                <input type="text" className="form-control" id="apellidos" name="apellidos"
                    required/>
            </div>

            <div className="mb-3 col-6">
                <label for="correo" className="form-label">Correo<small
                    className="text-danger">*</small></label>
                <input type="email" className="form-control" id="correo" name="correo" required/>
            </div>

            <h4 className="card-title">Dirección de entrega de los productos</h4>
            <p className="card-text">Ingrese direccion de forma detallada</p>
            <div className="row">

                <div className="mb-3 col-12 col-md-6">
                    <label for="fechaNacimiento" className="form-label">Calle<small
                        className="text-danger">*</small></label>
                    <input type="text" className="form-control" id="fechaNacimiento" name="fechaNacimiento" required/>
                </div>
                <div className="mb-3 col-12 col-md-6">
                    <label for="fechaNacimiento" className="form-label">Departamento (opcional)</label>
                    <input type="text" className="form-control" id="fechaNacimiento" name="fechaNacimiento" placeholder="Ej: 603"/>
                </div>

                <div className="mb-3 col-6 col-md-6">
                    <label for="regionSelect" className="form-label">Región<small className="text-danger">*</small></label>
                    <select className="form-select" id="regionSelect" required>
                        
                    </select>
                </div>
                <div className="mb-3 col-6 col-md-6">
                    <label for="comunaSelect" className="form-label">Comuna<small className="text-danger">*</small></label>
                    <select className="form-select" id="comunaSelect" required>
                        
                    </select>
                </div>

                <div className="mb-3">
                    <label for="" className="form-label">Indicaciones para la entrega (opcional)</label>
                    <textarea className="form-control" name="" id="" rows="3"
                        placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."></textarea>
                </div>


                <div className="text-end">
                    <a className="btn btn-success btn-lg" href="/comprar-ok.html">Pagar ahora <span id="totalPagoBtn"><strong>$0.000</strong></span></a>
                </div>
            </div>

        </div>
    )
}
