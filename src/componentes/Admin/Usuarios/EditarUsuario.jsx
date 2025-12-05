import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../api/axiosConfig';

export default function EditarUsuarioForm() {
    const navigate = useNavigate();
    const { id } = useParams(); 

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        runUsuario: '',
        dvUsuario: '',
        fechaNacimiento: '',
        rolId: 3
    });

    const [errores, setErrores] = useState([]);
    const [exito, setExito] = useState('');
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const response = await api.get(`/api/usuarios/${id}`);
                const usuario = response.data;

                setFormData({
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    email: usuario.email,
                    runUsuario: usuario.runUsuario,
                    dvUsuario: usuario.dvUsuario,
                    fechaNacimiento: usuario.fechaNacimiento,
                    rolId: usuario.rol ? usuario.rol.id : 3 
                });
            } catch (error) {
                setErrores(["No se pudo cargar la información del usuario."]);
            } finally {
                setCargando(false);
            }
        };
        cargarUsuario();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores([]);
        setExito('');

        try {
            await api.put(`/usuarios/${id}`, {
                ...formData,
                rolId: parseInt(formData.rolId),
                runUsuario: parseInt(formData.runUsuario)
            });

            setExito('¡Usuario actualizado exitosamente!');
            setTimeout(() => {
                navigate('/admin/usuarios');
            }, 1500);

        } catch (error) {
            console.error("Error al actualizar:", error);
            if (error.response && error.response.data) {
                // Ajusta esto según cómo devuelva los errores tu backend
                setErrores(Array.isArray(error.response.data) ? error.response.data : [error.response.data.message || "Error al guardar"]);
            } else {
                setErrores(["Error de conexión."]);
            }
        }
    };

    if (cargando) return <div className="p-4">Cargando datos...</div>;

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                <h4 className="mb-4">Editar Usuario</h4>

                {exito && <div className="alert alert-success">{exito}</div>}
                {errores.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0 ps-3">
                            {errores.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Campos iguales a NuevoUsuarioForm, pero SIN contraseña */}

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Nombre</label>
                            <input type="text" className="form-control" name="nombre"
                                value={formData.nombre} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Apellido</label>
                            <input type="text" className="form-control" name="apellido"
                                value={formData.apellido} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Correo Electrónico</label>
                        <input type="email" className="form-control" name="email"
                            value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">Rol</label>
                        <select className="form-select" name="rolId"
                            value={formData.rolId} onChange={handleChange}>
                            <option value="3">Cliente</option>
                            <option value="2">Vendedor</option>
                            <option value="1">Administrador</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Fecha Nacimiento</label>
                            <input type="date" className="form-control" name="fechaNacimiento"
                                value={formData.fechaNacimiento} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <label className="form-label fw-bold">RUN</label>
                            <input type="number" className="form-control" name="runUsuario"
                                value={formData.runUsuario} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">DV</label>
                            <input type="text" className="form-control" name="dvUsuario" maxLength="1"
                                value={formData.dvUsuario} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="text-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/admin/usuarios')}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-warning px-4">
                            Actualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}