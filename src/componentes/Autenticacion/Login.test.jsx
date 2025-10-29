import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; //userEvent
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';

// Mock del login de usarAuth
vi.mock('../../hooks/usarAuth', () => ({
    usarAuth: () => ({
        login: vi.fn() // Una funcion vacia
    })
}));

describe('Componente Login (Eventos)', () => {

    it('deberia permitir al usuario escribir en los campos de correo y contraseña', async () => {
        const user = userEvent.setup(); // simulacion del usuario
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const inputCorreo = screen.getByLabelText('Correo');
        const inputContraseña = screen.getByLabelText('Contraseña');

        // simulacion de los inputs
        await user.type(inputCorreo, 'usuario@prueba.com');
        await user.type(inputContraseña, 'miClave123');

        expect(inputCorreo.value).toBe('usuario@prueba.com');
        expect(inputContraseña.value).toBe('miClave123');
    });

});