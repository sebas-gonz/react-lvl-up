import React from 'react'

export default function OrdenFormulario({ formData, handleChange, handleRegionChange, regiones = [], comunas = [], errores = {} }) {
    return (
        <>
            <hr className="my-4" />
            <h4 className="card-title">Información del cliente</h4>
            <p className="card-text text-muted">Confirma o actualiza tus datos.</p>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre<small className="text-danger">*</small></label>
                    <input
                        type="text"
                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                        id="nombre"
                        name="nombre"
                        value={formData.nombre || ''}
                        onChange={handleChange}
                        required
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="apellido" className="form-label">Apellidos<small className="text-danger">*</small></label>

                    <input
                        type="text"
                        className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                        id="apellido"
                        name="apellido"
                        value={formData.apellido || ''}
                        onChange={handleChange}
                        required
                    />
                    {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="correo" className="form-label">Correo<small className="text-danger">*</small></label>
                    <input
                        type="email"
                        className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                        id="correo"
                        name="correo"
                        value={formData.correo || ''}
                        onChange={handleChange}
                        required
                    />
                    {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                </div>
            </div>

            <hr className="my-4" />
            <h4 className="card-title">Dirección de entrega</h4>
            <p className="card-text text-muted">Confirma o actualiza tu dirección.</p>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="direccion" className="form-label">Calle y Número<small className="text-danger">*</small></label>
                    <input
                        type="text"
                        className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                        id="direccion"
                        name="direccion"
                        value={formData.direccion || ''}
                        onChange={handleChange}
                        required
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="numeroDepartamento" className="form-label">Departamento (opcional)</label>
                    {/* Corregido id, name */}
                    <input
                        type="text"
                        className="form-control"
                        id="numeroDepartamento"
                        name="numeroDepartamento"
                        value={formData.numeroDepartamento || ''}
                        onChange={handleChange}
                        placeholder="Ej: 603"
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="region" className="form-label">Región<small className="text-danger">*</small></label>
                    <select
                        className={`form-select ${errores.region ? 'is-invalid' : ''}`}
                        id="region"
                        name="region"
                        value={formData.region || ''}
                        onChange={handleRegionChange}
                        required
                    >
                        <option value="">Seleccione una región</option>
                        {regiones.map(region => (
                            <option key={region} value={region}>{region}</option>
                        ))}
                    </select>
                    {errores.region && <div className="invalid-feedback">{errores.region}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="comuna" className="form-label">Comuna<small className="text-danger">*</small></label>
                    <select
                        className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
                        id="comuna"
                        name="comuna"
                        value={formData.comuna || ''}
                        onChange={handleChange}
                        required
                        disabled={comunas.length === 0}
                    >
                        <option value="">Seleccione una comuna</option>
                        {comunas.map(comuna => (
                            <option key={comuna} value={comuna}>{comuna}</option>
                        ))}
                    </select>
                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                </div>
                <div className="col-12 mb-3">
                    <label htmlFor="indicacion" className="form-label">Indicaciones (opcional)</label>
                    <textarea
                        className="form-control"
                        name="indicacion"
                        id="indicacion"
                        rows="3"
                        value={formData.indicacion || ''}
                        onChange={handleChange}
                        placeholder="Ej.: Entre calles, color del edificio, no tiene timbre."
                    ></textarea>
                </div>
            </div>
            {/* El botón de Pagar ahora estará en OrdenPage */}
        </>
    );
}