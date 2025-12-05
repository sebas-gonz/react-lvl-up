import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import { usarAuth } from '../../hooks/usarAuth';

export default function EditarPerfil() {
    const { usuarioActual, setUsuarioActual } = usarAuth();
    const navigate = useNavigate();

    const CLOUD_NAME = 'dsfuxaywv';
    const UPLOAD_PRESET = 'lvl-up';
    
    const [datos, setDatos] = useState({
        nombre: '',
        apellido: '',
        email: '',
        runUsuario: '',
        dvUsuario: '',
        fechaNacimiento: '',
        fotoUsuario: ''
    });
    const [subiendoImg, setSubiendoImg] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        if (usuarioActual) {
            setDatos({
                nombre: usuarioActual.nombre || '',
                apellido: usuarioActual.apellido || '',
                email: usuarioActual.email || '',
                runUsuario: usuarioActual.runUsuario || '',
                dvUsuario: usuarioActual.dvUsuario || '',
                fechaNacimiento: usuarioActual.fechaNacimiento || '',
                fotoUsuario: usuarioActual.fotoUsuario || ''
            });
        }
    }, [usuarioActual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImagenChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSubiendoImg(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();

            if (data.secure_url) {
                setDatos(prev => ({ ...prev, fotoUsuario: data.secure_url }));
            } else {
                setMensaje({ tipo: 'warning', texto: 'No se pudo obtener la URL de la imagen.' });
            }
        } catch (error) {
            console.error("Error subiendo a Cloudinary", error);
            setMensaje({ tipo: 'danger', texto: 'Error al subir la imagen. Intenta nuevamente.' });
        } finally {
            setSubiendoImg(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        setMensaje(null);

        try {
            const respuesta = await api.put('/usuarios/perfil', datos);
            setUsuarioActual(respuesta.data);
            setMensaje({ tipo: 'success', texto: '¡Perfil actualizado con éxito!' });
        } catch (error) {
            console.error("Error actualizando perfil:", error);
            setMensaje({ tipo: 'danger', texto: 'Error al guardar los cambios.' });
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0 rounded-3 mb-5">
                        <div className="card-header bg-primary text-white text-center py-3">
                            <h4 className="mb-0 fw-bold"><i className="bi bi-person-gear me-2"></i>Editar Perfil</h4>
                        </div>
                        <div className="card-body p-4">

                            {mensaje && (
                                <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
                                    {mensaje.texto}
                                    <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="text-center mb-4">
                                    <div className="mb-3 position-relative d-inline-block">
                                        {subiendoImg ? (
                                            <div className="d-flex align-items-center justify-content-center rounded-circle border bg-light" style={{ width: '120px', height: '120px' }}>
                                                <div className="spinner-border text-primary" role="status"></div>
                                            </div>
                                        ) : datos.fotoUsuario ? (
                                            <img src={datos.fotoUsuario} alt="Avatar" className="rounded-circle border border-3 border-primary" style={{ width: '120px', height: '120px', objectFit: 'cover' }} />
                                        ) : (
                                            <div className="bg-light rounded-circle d-flex align-items-center justify-content-center border border-3 border-secondary" style={{ width: '120px', height: '120px' }}>
                                                <i className="bi bi-person text-secondary" style={{ fontSize: '4rem' }}></i>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="upload-photo" className="btn btn-outline-primary btn-sm">
                                            <i className="bi bi-camera-fill me-2"></i>Cambiar Foto
                                        </label>
                                        <input
                                            type="file"
                                            id="upload-photo"
                                            accept="image/*"
                                            onChange={handleImagenChange}
                                            style={{ display: 'none' }}
                                        />
                                    </div>
                                </div>

                                <div className="row g-2 mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                                name="nombre"
                                                placeholder="Nombre"
                                                value={datos.nombre}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="nombre">Nombre</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apellido"
                                                name="apellido"
                                                placeholder="Apellido"
                                                value={datos.apellido}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label htmlFor="apellido">Apellido</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control bg-light"
                                        id="rut"
                                        value={`${datos.runUsuario}-${datos.dvUsuario}`}
                                        disabled
                                        readOnly
                                    />
                                    <label htmlFor="rut">RUT (No editable)</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="email"
                                        className="form-control" 
                                        id="email"
                                        name="email"
                                        placeholder="correo@ejemplo.com"
                                        value={datos.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label htmlFor="email">Correo Electrónico</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fechaNacimiento"
                                        name="fechaNacimiento"
                                        value={datos.fechaNacimiento}
                                        onChange={handleChange}
                                    />
                                    <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary px-4"
                                        onClick={() => navigate(-1)}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4 fw-bold"
                                        disabled={cargando}
                                    >
                                        {cargando ? (
                                            <span><span className="spinner-border spinner-border-sm me-2"></span>Guardando...</span>
                                        ) : (
                                            <span><i className="bi bi-save me-2"></i>Guardar Cambios</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}