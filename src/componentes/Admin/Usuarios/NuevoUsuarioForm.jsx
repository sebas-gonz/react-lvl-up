import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';

export default function NuevoUsuarioForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        runUsuario: '',
        dvUsuario: '',
        fechaNacimiento: '',
        rolId: 3
    });

    const [errores, setErrores] = useState([]);
    const [exito, setExito] = useState('');
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores([]);
        setExito('');
        setEnviando(true);

        try {
            await api.post('/auth/registro', {
                ...formData,
                rolId: parseInt(formData.rolId)
            });

            setExito('¡Usuario creado exitosamente!');

            setFormData({
                nombre: '', apellido: '', email: '', password: '', passwordConfirmation: '',
                runUsuario: '', dvUsuario: '', fechaNacimiento: '', rolId: 3
            });
            setTimeout(() => {
                navigate('/admin/usuarios');
            }, 1500);

        } catch (error) {
            console.error("Error al registrar:", error);
            if (Array.isArray(error.response.data)) {
                setErrores(error.response.data);
            } else {
                setErrores([error.response?.data?.message || "Error al crear usuario."]);
            }
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="card shadow-sm border-0">
            <div className="card-body">
                {exito && <div className="alert alert-success">{exito}</div>}
                {errores.length > 0 && (
                    <div className="alert alert-danger">
                        <ul className="mb-0 ps-3">
                            {errores.map((err, idx) => <li key={idx}>{err}</li>)}
                        </ul>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
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
                        <label className="form-label fw-bold">Asignar Rol</label>
                        <select className="form-select" name="rolId"
                            value={formData.rolId} onChange={handleChange}>
                            <option value="3">Cliente</option>
                            <option value="2">Vendedor</option>
                            <option value="1">Administrador</option>
                        </select>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3" htmlFor='password'>
                            <label className="form-label fw-bold">Contraseña</label>
                            <input type="password" className="form-control" name="password"
                                value={formData.password} onChange={handleChange} required />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold" htmlFor='passwordConfirmation'>Confirmar Contraseña</label>
                            <input type="password" className="form-control" name="passwordConfirmation"
                                value={formData.passwordConfirmation} onChange={handleChange} required
                                placeholder="Repita la contraseña" />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label fw-bold">Fecha Nacimiento</label>
                            <input type="date" className="form-control" name="fechaNacimiento"
                                value={formData.fechaNacimiento} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8 mb-3">
                            <label className="form-label fw-bold">RUN (Sin puntos ni DV)</label>
                            <input type="number" className="form-control" name="runUsuario" placeholder="11111111"
                                value={formData.runUsuario} onChange={handleChange} required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-bold">DV</label>
                            <input type="text" className="form-control" name="dvUsuario" maxLength="1" placeholder="K"
                                value={formData.dvUsuario} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-primary px-4" disabled={enviando}>
                            {enviando ? 'Guardando...' : 'Crear Usuario'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}