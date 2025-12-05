import React, { createContext, useState, useContext, useEffect } from 'react';
export const AuthContext = createContext(null);
import api from '../../../api/axiosConfig';

export const AutenticacionContext = ({ children }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [carga, setCarga] = useState(true);


    const cargarDatosUsuario = async (token) => {
        try {
            const respuesta = await api.get('/usuarios/perfil');
            setUsuarioActual({ token, ...respuesta.data });
        } catch (error) {
            console.error("Error cargando perfil:", error);
            logout();
        } finally {
            setCarga(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            cargarDatosUsuario(token);
        } else {
            setCarga(false);
        }
    }, []);

    const registroInicio = async (datosUsuario) => {
        try {
            const registro = await api.post('/auth/registro', datosUsuario);
            const { token } = registro.data;
            localStorage.setItem('token', token);
            await cargarDatosUsuario(token);
            
            return true;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error.response?.data || "Error al registrar";
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            const token = res.data.token
            localStorage.setItem('token',token);
            await cargarDatosUsuario(token);
        } catch (error) {
            console.error(error)
            throw error.response?.data || "Error de credenciales";
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuarioActual(null);
    };

    const valores = {
        usuarioActual,
        setUsuarioActual,
        carga,
        login,
        logout,
        registroInicio
    };

    return (
        <AuthContext.Provider value={valores}>
            {!carga && children}
        </AuthContext.Provider>
    )
}


