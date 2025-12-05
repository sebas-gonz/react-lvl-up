import React from 'react'

export default function OrdenFormulario({
    formData,
    handleChange,
    handleRegionChange,
    handleDireccionGuardadaChange,
    direccionesGuardadas = [],
    regiones = [],
    comunas = [],
    errores = {}
}) {
    return (
        <>
            <hr className="my-4" />
            <h4 className="card-title">Información del cliente</h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" value={formData.nombre} disabled readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Correo</label>
                    <input type="email" className="form-control" value={formData.correo} disabled readOnly />
                </div>
            </div>

            <hr className="my-4" />

            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="card-title mb-0">Dirección de entrega</h4>
            </div>

            <div className="mb-4 p-3 bg-light rounded border">
                {direccionesGuardadas && direccionesGuardadas.length > 0 ? (
                    <>
                        <label htmlFor="direccionesGuardadas" className="form-label fw-bold text-primary">
                            <i className="bi bi-geo-alt-fill me-2"></i>Usar una dirección guardada:
                        </label>
                        <select
                            className="form-select mt-2"
                            id="direccionesGuardadas"
                            onChange={handleDireccionGuardadaChange}
                            defaultValue=""
                        >
                            <option value="" disabled>-- Selecciona para autocompletar --</option>
                            {direccionesGuardadas.map((dir, index) => (
                                <option key={index} value={index}>
                                    {dir.calle} {dir.numeroDepto}
                                </option>
                            ))}
                        </select>
                    </>
                ) : (
                    <div className="text-muted d-flex align-items-center">
                        <i className="bi bi-info-circle-fill me-2 fs-5"></i>
                        <div>
                            <strong>No tienes direcciones guardadas.</strong>
                            <br />
                            <small>Ingresa tu dirección manualmente en el formulario de abajo.</small>
                        </div>
                    </div>
                )}
            </div>

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
                        placeholder="Av. Siempre Viva 123"
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label htmlFor="numeroDepartamento" className="form-label">Nº Depto / Oficina</label>
                    <input
                        type="number"
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
                            <option key={region.regionId} value={region.regionId}>
                                {region.nombreRegion}
                            </option>
                        ))}
                    </select>
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
                            <option key={comuna.comunaId} value={comuna.nombreComuna}>
                                {comuna.nombreComuna}
                            </option>
                        ))}
                    </select>
                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                </div>

                <div className="col-12 mb-3">
                    <label htmlFor="indicaciones" className="form-label">Indicaciones adicionales</label>
                    <textarea
                        className="form-control"
                        name="indicaciones"
                        id="indicaciones"
                        rows="2"
                        value={formData.indicaciones || ''}
                        onChange={handleChange}
                        placeholder="Ej: Casa esquina reja blanca, dejar en conserjería."
                    ></textarea>
                </div>
            </div>
        </>
    );
}