
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
    });

    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({});
        setExito('');

        const nuevosErrores = {};

        if (!formData.run || !validarRun(formData.run)) nuevosErrores.run = 'RUN inválido';
        if (!formData.correo || !validarCorreo(formData.correo)) nuevosErrores.correo = 'Correo inválido';
        if (!formData.nombre?.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
        if (!formData.apellido?.trim()) nuevosErrores.apellido = "El apellido es obligatorio";
        if (!formData.password || formData.password.length < 8) nuevosErrores.password = "Mínimo 8 caracteres";
        if (formData.password !== formData.passwordConfirmation) nuevosErrores.passwordConfirmation = "Las contraseñas no coinciden";
        
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
            fotoUsuario: null,
            tipoUsuario: esAdmin && formData.tipoUsuario ? parseInt(formData.tipoUsuario) : null
        };

        try {
            await registroInicio(datosUsuario);
            setExito('¡Registro exitoso! Redirigiendo...');
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            const mensaje = Array.isArray(error) ? error[0] : (error.message || "Error al registrar");
            setErrores({ general: mensaje });
        }
    };
    return (
        <div className="row d-flex justify-content-center">
            <div className="col-md-7">
                <div className="card text-start shadow-sm">
                    <div className="card-body p-4">
                        <h4 className="card-title text-center mb-4">Crear Cuenta</h4>
                        {exito && <div className="alert alert-success">{exito}</div>}
                        {errores.general && <div className="alert alert-danger">{errores.general}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label">RUN <small className="text-danger">*</small></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errores.run ? 'is-invalid' : ''}`}
                                        name="run"
                                        value={formData.run}
                                        onChange={handleChange}
                                        placeholder="12345678-K"
                                    />
                                    <div className="invalid-feedback">{errores.run}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Fecha Nacimiento <small className="text-danger">*</small></label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="fechaNacimiento"
                                        value={formData.fechaNacimiento}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Nombre <small className="text-danger">*</small></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errores.nombre}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Apellidos <small className="text-danger">*</small></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errores.apellido}</div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Correo Electrónico <small className="text-danger">*</small></label>
                                    <input
                                        type="email"
                                        className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
                                        name="correo"
                                        value={formData.correo}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errores.correo}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Contraseña <small className="text-danger">*</small></label>
                                    <input
                                        type="password"
                                        className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errores.password}</div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Confirmar Contraseña <small className="text-danger">*</small></label>
                                    <input
                                        type="password"
                                        className={`form-control ${errores.passwordConfirmation ? 'is-invalid' : ''}`}
                                        name="passwordConfirmation"
                                        value={formData.passwordConfirmation}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errores.passwordConfirmation}</div>
                                </div>
                                {esAdmin && usuarioActual?.tipoUsuario === 1 && (
                                    <div className="col-md-6">
                                        <label className="form-label">Tipo de Usuario <small className="text-danger">*</small></label>
                                        <select
                                            className="form-select"
                                            name="tipoUsuario"
                                            value={formData.tipoUsuario || 3}
                                            onChange={handleChange}
                                        >
                                            <option value={3}>Cliente</option>
                                            <option value={2}>Vendedor</option>
                                            <option value={1}>Administrador</option>
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="d-grid gap-2 mt-4">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    {esAdmin ? 'Crear Usuario' : 'Registrarse'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
