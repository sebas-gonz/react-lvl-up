import React, { createContext, useState, useContext, useEffect } from 'react';
export const AuthContext = createContext(null);
import api from '../../../api/axiosConfig';

export const AutenticacionContext = ({ children }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUsuarioActual({ token });
        }
        setCarga(false);
    }, []);

    const registroInicio = async (datosUsuario, datosDireccion) => {
        try {
            const registro = await api.post('/auth/registro', datosUsuario);
            const { token } = registro.data;
            localStorage.setItem('token', token);
            setUsuarioActual({ token });
            if (datosDireccion && datosDireccion.calle) {

                // INTENTO 1: Usar axios puro (sin interceptores) para esta llamada específica
                // Importa axios directamente arriba: import axios from 'axios';
                await axios.post('http://localhost:8080/direcciones', datosDireccion, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }

            return true;
        } catch (error) {
            console.error("Error en registro:", error);
            throw error.response?.data || "Error al registrar";
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            setUsuarioActual({ token: res.data.token });
        } catch (error) {
            throw error.response?.data || "Error de credenciales";
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUsuarioActual(null);
    };

    const valores = {
        usuarioActual,
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


