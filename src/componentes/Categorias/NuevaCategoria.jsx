import React from 'react'
import MainProductosAdmin from '../main/MainProductosAdmin'
import NavbarProductosAdmin from '../Producto/NavbarProductosAdmin'
import NuevaCategoriaForm from './NuevaCategoriaForm'
export default function NuevaCategoria() {
    const categoriasNavLinks = [
        { to: '/admin/categorias', text: 'Listado de categorias' },
        { to: '/admin/categorias/nueva', text: 'Nueva categoria' }
    ]
    return (
        <MainProductosAdmin tituloText='Nueva categoria' parrafoText='Agregar nueva categoria'>
            <NavbarProductosAdmin links={categoriasNavLinks}></NavbarProductosAdmin>
            <NuevaCategoriaForm></NuevaCategoriaForm>
        </MainProductosAdmin>
    )
}
