// src/componentes/Autenticacion/RutaProtegidaAdmin.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth';


const ROLES_PERMITIDOS = [1, 2];

export default function RutaProtegidaAdmin() {
    const { usuarioActual, carga } = usarAuth();

    if (carga) {
        return <div>Verificando permisos</div>;
    }

    if (!usuarioActual) {
        return <Navigate to="/login" replace />;
    }


    if (!ROLES_PERMITIDOS.includes(usuarioActual.tipoUsuario)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}