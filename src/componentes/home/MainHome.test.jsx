import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainHome from './MainHome'; // Ajusta la ruta

//maqueta de la base de datos
vi.mock('../../servicios/Database', () => ({
    default: {
        obtenerProductos: vi.fn(() => []),
        obtenerCategorias: vi.fn(() => []),
    },
}));

// mock de los componentes hijos
vi.mock('./Carrusel', () => ({ default: () => <div>Componente Carrusel</div> }));
vi.mock('../Categorias/ListaCategorias', () => ({ default: () => <div>Componente ListaCategorias</div> }));
vi.mock('../Producto/ListaProductos', () => ({ default: () => <div>Componente ListaProductosHome</div> }));

describe('componente MainHome', () => {

    it('deberia renderizar sus componentes hijos principales', () => {

        render(
            <MemoryRouter>
                <MainHome />
            </MemoryRouter>
        );


        expect(screen.getByText('Componente Carrusel')).toBeInTheDocument();
        expect(screen.getByText('Componente ListaCategorias')).toBeInTheDocument();
    });

});