import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // NavBar usa <Link>
import NavBar from './NavBar';

// Mock de el hook usarAuth ANTES de los tests
vi.mock('../../hooks/usarAuth', () => ({
    usarAuth: () => ({ usuarioActual: null }) // Simulacion de que nadie ha iniciado sesión
}));

describe('Componente NavBar (Sin Sesión)', () => {

    it('debería mostrar "Iniciar Sesión" y "Crear Cuenta" si no hay usuario', () => {
        render(
            <MemoryRouter>
                <NavBar />
            </MemoryRouter>
        );
        //test
        expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
        expect(screen.getByText('Crear Cuenta')).toBeInTheDocument();

        // Comprobacion de que el saludo Hola no esta
        expect(screen.queryByText(/¡Hola,/)).toBeNull();
    });

});