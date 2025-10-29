import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DashboardCard from './DashboardCard';

describe('Componente DashboardCard', () => {

    it('debería renderizar el título y el texto pasados por props', () => {
        const tituloPrueba = "Prueba de Título";
        const textoPrueba = "Este es un párrafo de prueba.";

        //Renderiza el componente con esas props
        render(
            <DashboardCard
                h5Text={tituloPrueba}
                pText={textoPrueba}
                iClass="bi bi-test"
            />
        );

        // Busca un elemento que tenga el texto "Prueba de Título"
        expect(screen.getByText(tituloPrueba)).toBeInTheDocument();

        // Busca un elemento que tenga el texto "Este es un párrafo de prueba."
        expect(screen.getByText(textoPrueba)).toBeInTheDocument();
    });

});