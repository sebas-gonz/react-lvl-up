import React from 'react'
import MainProductosAdmin from '../../../componentes/main/MainProductosAdmin'
import NavbarProductosAdmin from '../../../componentes/Producto/NavbarProductosAdmin' 
import EditarProducto from '../../../componentes/Producto/EditarProducto'

export default function EditarProductoPage() {
    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]
    return (
        <MainProductosAdmin tituloText='Editar Producto' parrafoText='Modificar información del inventario.'>
            <NavbarProductosAdmin links={productosNavLinks}></NavbarProductosAdmin>
            <EditarProducto/>
        </MainProductosAdmin>
    )
}