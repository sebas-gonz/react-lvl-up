import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import OffCanvas from './OffCanvas';

//usuario de prueba
const mockUser = {
    nombre: 'Sebastián',
    apellido: 'González',
    correo: 'test@duoc.cl',
    tipoUsuario: 1
};

//Mock de el hook usarAuth
vi.mock('../../hooks/usarAuth', () => ({
    usarAuth: () => ({
        usuarioActual: mockUser, // Simulacion de que se ha iniciado sesion
        logout: vi.fn() // mock del logout
    })
}));

describe('Componente OffCanvas (Con Sesión)', () => {

    it('deberia mostrar el nombre del usuario y el boton cerrar sesion', () => {
        render(
            <MemoryRouter>
                <OffCanvas />
            </MemoryRouter>
        );

        expect(screen.getByText('Sebastián González')).toBeInTheDocument();
        expect(screen.getByText('test@duoc.cl')).toBeInTheDocument();
        expect(screen.getByText('Cerrar Sesión')).toBeInTheDocument();

        expect(screen.queryByText('Iniciar Sesión')).toBeNull();
    });

});