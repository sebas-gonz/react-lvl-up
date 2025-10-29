import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
// mock real del componente
import * as AuthHook from '../../hooks/usarAuth';

// maqueta completa del autentificador
vi.mock('../../hooks/usarAuth');

describe('Componente Login (Submit)', () => {

    it('deberia llamar a la función login al hacer clic en el botón', async () => {
        const user = userEvent.setup();

        //funcion espia
        const mockLogin = vi.fn();

        // cuando se usa authook debe retornar la funcion espia
        vi.spyOn(AuthHook, 'usarAuth').mockReturnValue({
            login: mockLogin
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        await user.type(screen.getByLabelText('Correo'), 'test@test.com');
        await user.type(screen.getByLabelText('Contraseña'), 'clave123');

        await user.click(screen.getByRole('button', { name: /iniciar sesión/i }));

        expect(mockLogin).toHaveBeenCalled();


        expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'clave123');
    });

});