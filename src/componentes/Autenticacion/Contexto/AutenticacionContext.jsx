import React, { createContext, useState, useContext, useEffect } from 'react';
import db from '../../../servicios/Database';
export const AuthContext = createContext(null);

export const AutenticacionContext = ({ children }) => {
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        const usuario = db.getUsuarioIniciado();
        setUsuarioActual(usuario);
        setCarga(false);
    }, []);

    const registroInicio = (datosUsuario, esAdmin) => {
        try {
            if (!esAdmin) {
                const nuevoUsuario = db.registrarUsuario(datosUsuario);

                setUsuarioActual(nuevoUsuario);
                return nuevoUsuario;

            }
            db.registrarUsuario(datosUsuario);

        } catch (error) {

            setUsuarioActual(null);
            throw error;
        }
    };

    const login = (correo, contraseña) => {
        try {
            const usuario = db.login(correo, contraseña);
            setUsuarioActual(usuario);
            return usuario; // Devuelve el usuario si el login es exitoso
        } catch (error) {
            setUsuarioActual(null);
            throw error;
        }
    };

    const logout = () => {
        db.logout();
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


