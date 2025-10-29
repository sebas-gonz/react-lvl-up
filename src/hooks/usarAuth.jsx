import React from 'react'
import { useContext } from 'react';
import {AuthContext} from '../componentes/Autenticacion/Contexto/AutenticacionContext'
export const usarAuth = () => useContext(AuthContext);

