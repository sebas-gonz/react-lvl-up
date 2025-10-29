import { useState, useEffect } from 'react';
import React from 'react'
import ProductoCard from '../common/ProductoCard';
import db from '../../servicios/Database';
export default function ProductoOferta({ titulo = 'Ofertas' }) {
    const [productosEnOferta, setProductosEnOferta] = useState([]);
    useEffect(() => {
        try {
            const todosLosProductos = db.obtenerProductos();

            const ofertas = todosLosProductos.filter(producto => producto.oferta === true);

            setProductosEnOferta(ofertas);

        } catch (err) {
            console.error("Error al cargar productos en oferta:", err);
        }
    }, []);
    return (

        <div className="container my-4">
            <h2 className="text-center mb-4">Ofertas Especiales</h2>

            {productosEnOferta.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productosEnOferta.map(producto => (
                        <ProductoCard key={producto.productoId} producto={producto} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No hay productos en oferta en este momento.</p>
            )}
        </div>
    )
}
