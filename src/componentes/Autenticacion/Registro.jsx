
// src/componentes/Autenticacion/Registro.jsx (o donde lo tengas)

import React, { useState, useEffect } from 'react';
import db from '../../servicios/Database.js';
import { getRegiones, getComunasPorRegion } from '../../utils/ubicaciones.js';
import { validarCorreo, validarRun } from '../../utils/validaciones.js';
import { useNavigate } from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth.jsx';
export default function Registro({ esAdmin = false }) {

    const navigate = useNavigate()
    const { usuarioActual, registroInicio } = usarAuth();


    const [formData, setFormData] = useState({
        run: '',
        fechaNacimiento: '',
        nombre: '',
        apellido: '',
        correo: '',
        contraseña: '',
        direccion: '',
        region: '',
        comuna: '',
        tipoUsuario: 3
    });

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');

    useEffect(() => {
        setRegiones(getRegiones());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegionChange = (e) => {
        const regionSeleccionada = e.target.value;
        setFormData({
            ...formData,
            region: regionSeleccionada,
            comuna: ''
        });
        setComunas(getComunasPorRegion(regionSeleccionada));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        setErrores({});
        setExito('');

        if (esAdmin && usuarioActual?.tipoUsuario !== 1) {
            setErrores({ general: 'No tienes permisos para registrar usuarios.' });
            return;
        }

        const nombreLimpio = formData.nombre.trim();
        const apellidoLimpio = formData.apellido.trim();
        const correoLimpio = formData.correo.trim();
        const runLimpio = formData.run.trim();
        const direccionLimpio = formData.direccion.trim();
        const contraseñaLimpia = formData.contraseña.trim();

        const nuevosErrores = {};
        if (!validarRun(runLimpio)) {
            nuevosErrores.run = 'El RUN no tiene un formato válido (ej: 12345678K).';
        }
        if (!validarCorreo(correoLimpio) && correoLimpio === '') {
            nuevosErrores.correo = 'El correo no es válido o el dominio no está permitido.';
        }
        if (nombreLimpio === '') {
            nuevosErrores.nombre = "El nombre esta vacío."
        }

        if (apellidoLimpio === '') {
            nuevosErrores.apellido = 'El apellido esta vacío.'
        }

        if (direccionLimpio === '') {
            nuevosErrores.direccion = 'La direccion de la calle esta vacío.'
        }
        if (contraseñaLimpia === '') {
            nuevosErrores.contraseña = 'La contraseña esta vacía.'
        }
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return; 
        }

        const datosLimpios = {
            ...formData,
            run: runLimpio.toUpperCase(),
            correo: correoLimpio,
            nombre: nombreLimpio,
            apellido: apellidoLimpio,
            contraseña: contraseñaLimpia,
            tipoUsuario: parseInt(formData.tipoUsuario)
        };
        try {

            registroInicio(datosLimpios, esAdmin)

            setExito('¡Usuario registrado!');
            setFormData({
                run: '', fechaNacimiento: '', nombre: '', apellido: '',
                correo: '', contraseña: '', direccion: '', region: '', comuna: ''
            });
            setComunas([]);

            setTimeout(() => {
                if (esAdmin) {
                    navigate('/admin/usuarios')
                } else {
                    navigate('/');
                }
            }, 1500);

        } catch (error) {
            setErrores({ general: error.message });
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
                                    <label htmlFor="password" className="form-label">Contraseña<small
                                        className="text-danger">*</small></label>
                                    <input type="password" className={`form-control ${errores.contraseña ? 'is-invalid' : ''}`} id="password" name="contraseña"
                                        value={formData.contraseña} onChange={handleChange} />
                                    {errores.contraseña && <div className="invalid-feedback">{errores.contraseña}</div>}
                                </div>

                                {esAdmin && usuarioActual?.tipoUsuario === 1 && (
                                    <div className="col-md-6 mb-3"> {/* O col-12 si prefieres */}
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
                                    <label htmlFor="direccion" className="form-label">Calle<small
                                        className="text-danger">*</small></label>
                                    <input type="text" className={`form-control ${errores.direccion ? 'is-invalid' : ''}`} id="direccion"
                                        name="direccion" value={formData.direccion} onChange={handleChange} />
                                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                                </div>
                                <div className="mb-3 col-6 col-md-6">
                                    <label htmlFor="region" className="form-label">Región<small
                                        className="text-danger">*</small></label>
                                    <select className="form-select" id="region" value={formData.region} onChange={handleRegionChange} >
                                        <option value="">Seleccione una región</option>
                                        {regiones.map(region => (
                                            <option key={region} value={region}>{region}</option>
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
                                            <option key={comuna} value={comuna}>{comuna}</option>
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
