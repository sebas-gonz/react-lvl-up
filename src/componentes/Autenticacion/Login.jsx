import React, { useState } from 'react'
import { useNavigate , Link} from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth.jsx';
export default function Login() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');
    const { login } = usarAuth(); 
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            await login(correo, contraseña); 
            navigate('/');
        } catch (err) {
            setError(err.message); 
        }
    };

    return (
        <div className="row d-flex justify-content-center my-5"> 
            <div className="col-md-6"> 
                <div className="card bg-dark text-light" style={{ borderColor: 'var(--bs-primary)' }}> 
                    <div className="card-body"> 
                        <h2 className="mb-4 text-center">Iniciar Sesión</h2>

                        
                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>¡Error!</strong> {error} 
                                <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                            </div>
                        )}


                        <form id="loginForm" onSubmit={handleSubmit}> 
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Correo</label> 
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    id="username" 
                                    required 
                                    value={correo} 
                                    onChange={(e) => setCorreo(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    required 
                                    value={contraseña} 
                                    onChange={(e) => setContraseña(e.target.value)} 
                                />
                            </div>
                            <div className="mb-3 d-flex justify-content-between"> 
                                <Link to="/iniciar-sesion">¿No tienes cuenta? Regístrate aquí</Link> 
                                <Link to="/iniciar-sesion" >¿Olvidaste tu contraseña?</Link> 
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                <strong>INICIAR SESIÓN</strong>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

