import React from 'react'
import MainProductosAdmin from '../main/MainProductosAdmin'
import NavbarProductosAdmin from './NavbarProductosAdmin'
import NuevoProductoCard from './NuevoProductoCard'

export default function NuevoProducto() {
    const productosNavLinks = [
        {to: '/admin/productos', text : 'Listado de productos'},
        {to: '/admin/productos/criticos', text : 'Productos criticos'},
        {to: '/admin/productos/nuevo', text : 'Nuevo producto'}
    ]
  return (
    <MainProductosAdmin tituloText='Nuevo Producto' parrafoText='Agregar un nuevo producto.'>
        <NavbarProductosAdmin links={productosNavLinks}></NavbarProductosAdmin>
        <NuevoProductoCard></NuevoProductoCard>
    </MainProductosAdmin>
  )
}
