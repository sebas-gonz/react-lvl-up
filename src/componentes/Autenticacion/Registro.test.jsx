import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Registro from './Registro';
// regiones y comunas por regiones
vi.mock('../../utils/ubicaciones', () => ({
    getRegiones: () => ['region test'],
    getComunasPorRegion: (region) => (region === 'region test' ? ['comuna test'] : [])
}));
//correo y run validados
vi.mock('../../utils/validaciones', () => ({
    validarCorreo: vi.fn(() => true),
    validarRun: vi.fn(() => true)
}));
vi.mock('../../hooks/usarAuth', () => ({
    usarAuth: () => ({ registroInicio: vi.fn() })
}));
describe('componente Registro', () => {
    it('deberia actualizar el estado de la region y la comuna al seleccionar', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        const selectRegion = screen.getByLabelText(/Región/i);
        const selectComuna = screen.getByLabelText(/Comuna/i);

        expect(selectRegion.value).toBe('');
        expect(selectComuna.value).toBe('');
        expect(selectComuna).toBeDisabled(); 

        await user.selectOptions(selectRegion, 'region test');

        // nuevo estado
        expect(selectRegion.value).toBe('region test');
        expect(selectComuna).not.toBeDisabled(); // habilitado por haber seleccionado una region

    });
});