import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';

export default function Direcciones() {
    const [direcciones, setDirecciones] = useState([]);
    const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
    const [cargando, setCargando] = useState(false);

    const [nuevaDireccion, setNuevaDireccion] = useState({
        calle: '',
        numeroDepto: '',
        indicaciones: '',
        comuna: ''
    });

    const [comunas, setComunas] = useState([]);
    const [regiones, setRegiones] = useState([])
    const [regionSeleccionada, setRegionSeleccionada] = useState('')

    useEffect(() => {
        cargarDirecciones();
        cargarRegiones();
    }, []);

    const cargarRegiones = async () => {
        try {
            const reg = await api.get('/regiones')
            setRegiones(reg.data)
        } catch (error) {
            console.error("Error cargando regiones", error)
        }
    }

    const cargarDirecciones = async () => {
        try {
            const dir = await api.get('/direcciones');
            setDirecciones(dir.data);
        } catch (error) {
            console.error("Error cargando direcciones", error);
        }
    };

    const handleRegionChange = async (e) => {
        const regionId = e.target.value;
        setRegionSeleccionada(regionId);
        setNuevaDireccion(prev => ({ ...prev, comuna: '' }));
        setComunas([]);

        if (regionId) {
            try {
                const com = await api.get(`/comunas/region/${regionId}`);
                setComunas(com.data);
            } catch (error) {
                console.error("Error cargando comunas por región", error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNuevaDireccion(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        try {
            await api.post('/direcciones', nuevaDireccion);
            await cargarDirecciones();
            setMostrandoFormulario(false);
            setNuevaDireccion({ calle: '', numeroDepto: '', indicaciones: '', comuna: '' });
        } catch (error) {
            console.error("Error creando dirección", error);
            alert("Error al guardar la dirección. Revisa los datos.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4"><i className="bi bi-geo-alt me-2"></i>Mis Direcciones</h2>
            <div className="row g-3 mb-4">
                {direcciones.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">No tienes direcciones guardadas.</div>
                    </div>
                ) : (
                    direcciones.map((dir, index) => (
                        <div key={index} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm border-start border-4 border-primary">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{dir.calle}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{dir.comuna}</h6>
                                    {dir.numeroDepto && <p className="card-text mb-1"><small>Departamento: {dir.numeroDepto}</small></p>}
                                    {dir.indicaciones && <p className="card-text text-muted fst-italic"><small>"{dir.indicaciones}"</small></p>}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!mostrandoFormulario ? (
                <button className="btn btn-primary" onClick={() => setMostrandoFormulario(true)}>
                    <i className="bi bi-plus-circle me-2"></i>Agregar Nueva Dirección
                </button>
            ) : (
                <div className="card shadow border-0">
                    <div className="card-header bg-light">
                        <h5 className="mb-0">Nueva Dirección</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row g-2">
                                <div className="col-md-8">
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" name="calle" placeholder="Calle" value={nuevaDireccion.calle} onChange={handleChange} required minLength={10} />
                                        <label>Calle (Mínimo 10 caracteres)</label>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-2">
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            name="region"
                                            value={regionSeleccionada}
                                            onChange={handleRegionChange}
                                            required
                                        >
                                            <option value="">Selecciona una región...</option>
                                            {regiones.map(r => (
                                                <option key={r.regionId || r.id} value={r.regionId || r.id}>
                                                    {r.nombre || r.nombreRegion}
                                                </option>
                                            ))}
                                        </select>
                                        <label>Región</label>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <select
                                            className="form-select"
                                            name="comuna"
                                            value={nuevaDireccion.comuna}
                                            onChange={handleChange}
                                            required
                                            disabled={!regionSeleccionada} 
                                        >
                                            <option value="">Selecciona una comuna...</option>
                                            {comunas.map(c => (
                                                <option key={c.comunaId || c.id} value={c.comunaId || c.id}>
                                                    {c.nombre || c.nombreComuna}
                                                </option>
                                            ))}
                                        </select>
                                        <label>Comuna</label>
                                    </div>
                                </div>
                            </div>

                            <div className="row g-2">
                                <div className="col-md-6">
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control" name="numeroDepto" placeholder="Depto (Opcional)" value={nuevaDireccion.numeroDepto} onChange={handleChange} />
                                        <label>N° Depto (Opcional)</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-floating mb-3">
                                <textarea className="form-control" name="indicaciones" placeholder="Indicaciones" style={{ height: '100px' }} value={nuevaDireccion.indicaciones} onChange={handleChange}></textarea>
                                <label>Indicaciones (Ej: Casa esquina, reja blanca)</label>
                            </div>

                            <div className="d-flex justify-content-end gap-2">
                                <button type="button" className="btn btn-secondary" onClick={() => setMostrandoFormulario(false)}>Cancelar</button>
                                <button type="submit" className="btn btn-success" disabled={cargando}>
                                    {cargando ? 'Guardando...' : 'Guardar Dirección'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}