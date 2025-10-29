import React, { useState, useEffect} from 'react'
import MainProductosAdmin from '../main/MainProductosAdmin'
import ProductoOfertaCard from '../common/ProductoOfertaCard'
import NavbarProductosAdmin from './NavbarProductosAdmin'
import db from '../../servicios/Database'

export default function Productos() {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const productos = db.obtenerProductos()

        setProductos(productos);
        setLoading(false);
    }, []);

    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/tarjetas', text: 'Formato tarjeta' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]

    return (
        <MainProductosAdmin tituloText='Productos' parrafoText='Listado de productos'>
            <NavbarProductosAdmin links={productosNavLinks}></NavbarProductosAdmin>
            <div className='row my-3'>

                {productos.map(producto => (

                    <ProductoOfertaCard key={producto.productoId} producto={producto} />
                ))}
            </div>
        </MainProductosAdmin>
    )
}
