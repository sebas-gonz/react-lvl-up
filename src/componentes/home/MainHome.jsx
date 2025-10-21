import React from 'react'
import Carrusel from './carrusel'
import Section from '../main/Section'
import Categorias from './Categorias'
import Productos from '../Categorias/Productos'

export default function MainHome() {
    return (
        <>
            <Carrusel></Carrusel>
            <Section>
                <Categorias></Categorias>
                <Productos></Productos>
            </Section>
        </>
    )
}
