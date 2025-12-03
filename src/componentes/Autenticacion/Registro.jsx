
// src/componentes/Autenticacion/Registro.jsx (o donde lo tengas)

import React, { useState, useEffect } from 'react';
import { validarCorreo, validarRun } from '../../utils/validaciones.js';
import { useNavigate } from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth.jsx';
import api from '../../api/axiosConfig.js';
export default function Registro({ esAdmin = false }) {

    const navigate = useNavigate()
    const { usuarioActual, registroInicio } = usarAuth();


    const [formData, setFormData] = useState({
        run: '',
        nombre: '',
        apellido: '',
        correo: '',
        password: '',
        passwordConfirmation: '',
        fechaNacimiento: '',
        // --- DIRECCION ---
        calle: '',
        numeroDepto: '',
        indicaciones: '',
        region: '',
        comuna: ''
    });

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');

    useEffect(() => {
        const cargarDatos = async () => {
            const regionesCargadas = await api.get('/regiones')
            setRegiones(regionesCargadas.data)
        }
        cargarDatos()
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegionChange = async (e) => {
        const nombreRegion = e.target.value;
        const region = regiones.find(r => r.nombreRegion === nombreRegion);
        setFormData({ ...formData, region: nombreRegion, comuna: '' });
        setComunas([])
        if (region) {
            const comunas = await api.get(`/comunas/region/${region.regionId}`);
            setComunas(comunas.data);
        } else {
            setComunas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({});
        setExito('');

        const nuevosErrores = {};

        if (!validarRun(formData.run)) nuevosErrores.run = 'RUN inválido (Ej: 12345678-K)';
        if (!validarCorreo(formData.correo)) nuevosErrores.correo = 'Correo inválido';
        if (!formData.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
        if (!formData.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio";
        if (formData.password.length < 8) nuevosErrores.password = "Mínimo 8 caracteres";
        if (formData.password !== formData.passwordConfirmation) nuevosErrores.passwordConfirmation = "Las contraseñas no coinciden";

        if (!formData.calle.trim()) nuevosErrores.calle = "La calle es obligatoria";
        if (!formData.comuna) nuevosErrores.comuna = "Selecciona una comuna";

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        const runLimpio = formData.run.replace(/\./g, '').replace('-', '').trim();
        const runNumero = parseInt(runLimpio.slice(0, -1));
        const runDv = runLimpio.slice(-1).toUpperCase();

        const datosUsuario = {
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.correo,
            password: formData.password,
            passwordConfirmation: formData.passwordConfirmation,
            fechaNacimiento: formData.fechaNacimiento,
            runUsuario: runNumero,
            dvUsuario: runDv,
            fotoUsuario: null
        };

        const datosDireccion = {
            calle: formData.calle,
            numero: formData.numero,
            numeroDepto: formData.numeroDepto ? parseInt(formData.numeroDepto) : null,
            indicaciones: formData.indicaciones,
            comuna: formData.comuna
        };
        try {
            await registroInicio(datosUsuario, datosDireccion);
            setExito('¡Registro exitoso! Redirigiendo...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error(error);
            setErrores({ general: error.message || "Error al registrar" });
        }
    };

    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-7">
                <div className="card text-start ">
                    <div className="card-body">
                        <h4 className="card-title">Registro de nuevo usuario</h4>
                        <p className="card-text">Bienvenidos</p>
                        {exito && <div className="alert alert-success">{exito}</div>}
                        {errores.general && <div className="alert alert-danger">{errores.general}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-6 mb-3">
                                    <label htmlFor="nombre" className="form-label">Run<small
                                        className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errores.run ? 'is-invalid' : ''}`}
                                        id="run" placeholder="ej: 11111111K"
                                        name="run" value={formData.run} onChange={handleChange} />
                                    {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                                </div>
                                <div className="mb-3 col-6 col-md-6">
                                    <label htmlFor="fechaNacimiento" className="form-label">Fecha nacimiento<small
                                        className="text-danger">*</small></label>
                                    <input type="date" className="form-control" id="fechaNacimiento"
                                        name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre<small
                                        className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errores.nombre ? 'is-invalid' : ''}`} id="nombre"
                                        value={formData.nombre} onChange={handleChange} name="nombre" />
                                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellidos<small
                                        className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errores.apellido ? 'is-invalid' : ''}`} id="apellido" name="apellido"
                                        value={formData.apellido} onChange={handleChange} />
                                    {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                                </div>

                                <div className="mb-3 col-6">
                                    <label htmlFor="correo" className="form-label">Correo<small
                                        className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errores.correo ? 'is-invalid' : ''}`} id="correo" name="correo"
                                        value={formData.correo} onChange={handleChange} />
                                    {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
                                </div>

                                <div className="mb-3 col-6">
                                    <label htmlFor="password" className="form-label">Contraseña <small className="text-danger">*</small></label>
                                    <input
                                        type="password"
                                        className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                                </div>

                                <div className="mb-3 col-6">
                                    <label htmlFor="passwordConfirmation" className="form-label">Confirmar Contraseña <small className="text-danger">*</small></label>
                                    <input
                                        type="password"
                                        className={`form-control ${errores.passwordConfirmation ? 'is-invalid' : ''}`}
                                        id="passwordConfirmation"
                                        name="passwordConfirmation"
                                        value={formData.passwordConfirmation}
                                        onChange={handleChange}
                                    />
                                    {errores.passwordConfirmation && <div className="invalid-feedback">{errores.passwordConfirmation}</div>}
                                </div>

                                {esAdmin && usuarioActual?.tipoUsuario === 1 && (
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="tipoUsuario" className="form-label">Tipo de Usuario<small className="text-danger">*</small></label>
                                        <select
                                            className={`form-select ${errores.tipoUsuario ? 'is-invalid' : ''}`}
                                            id="tipoUsuario"
                                            name="tipoUsuario"
                                            value={formData.tipoUsuario}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value={3}>Cliente</option>
                                            <option value={2}>Vendedor</option>
                                            <option value={1}>Administrador</option>
                                        </select>
                                        {errores.general && <div className="invalid-feedback">{errores.general}</div>}
                                    </div>
                                )}
                            </div>

                            <hr className="w-100" />
                            <h4 className="card-title">Dirección de la entrega de los productos</h4>
                            <p className="card-text">Ingrese direccion de forma detallada</p>
                            <div className="row">

                                <div className="mb-3 col-12 col-md-6">
                                    <label htmlFor="calle" className="form-label">Calle <small className="text-danger">*</small></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errores.calle ? 'is-invalid' : ''}`}
                                        id="calle"
                                        name="calle"
                                        value={formData.calle}
                                        onChange={handleChange}
                                    />
                                    {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
                                </div>

                                <div className="col-md-4">
                                    <label className="form-label">N° Depto (Opcional)</label>
                                    <input
                                        type="number"
                                        name="numeroDepto"
                                        className="form-control"
                                        value={formData.numeroDepto || ''}
                                        onChange={handleChange}
                                        placeholder="504"
                                    />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label className="form-label">Indicaciones (Opcional)</label>
                                    <input
                                        type="text"
                                        name="indicaciones"
                                        className="form-control"
                                        value={formData.indicaciones || ''} 
                                        onChange={handleChange}
                                        placeholder="Reja negra, esquina..."
                                    />
                                </div>

                                <div className="mb-3 col-6 col-md-6">
                                    <label htmlFor="region" className="form-label">Región<small
                                        className="text-danger">*</small></label>
                                    <select className="form-select" id="region" value={formData.region} onChange={handleRegionChange} >
                                        <option value="">Seleccione una región</option>
                                        {regiones.map(region => (
                                            <option key={region.regionId} value={region.nombreRegion}>{region.nombreRegion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3 col-6 col-md-6">
                                    <label htmlFor="comuna" className="form-label">Comuna<small
                                        className="text-danger">*</small></label>
                                    <select className={`form-select ${errores.comuna ? 'is-invalid' : ''}`} id="comuna" name="comuna"
                                        value={formData.comuna} onChange={handleChange} disabled={comunas.length === 0}>
                                        <option value="">Seleccione una comuna</option>
                                        {comunas.map(comuna => (
                                            <option key={comuna.comunaId} value={comuna.nombreComuna}>{comuna.nombreComuna}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="text-center mt-3">
                                {esAdmin && usuarioActual?.tipoUsuario === 1 ? (
                                    <button type="submit" className="btn btn-primary">
                                        Registrar usuario
                                    </button>
                                ) : (
                                    <button type="submit" className="btn btn-primary">
                                        Registrarse
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}
