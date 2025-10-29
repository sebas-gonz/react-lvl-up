import React from 'react'
import MainProductosAdmin from '../../main/MainProductosAdmin'
import NavbarProductosAdmin from '../../Producto/NavbarProductosAdmin'
import Registro from '../../Autenticacion/Registro'

export default function NuevoUsuario() {
    const usuarioLinks = [
        { to: '/admin/usuarios', text: 'Listado de Usuarios' },
        { to: '/admin/usuarios/nuevo', text: 'Nuevo usuario' }
    ]
    return (
        <MainProductosAdmin tituloText='Nuevo Usuario' parrafoText='Agregar un nuevo usuario'>
            <NavbarProductosAdmin links={usuarioLinks}></NavbarProductosAdmin>
            <div className='mt-3'>
                <Registro esAdmin={true}></Registro>
            </div>
        </MainProductosAdmin>
    )
}
