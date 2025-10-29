import React, { useState, useEffect } from 'react'
import ProductoCard from '../common/ProductoCard'
import db from '../../servicios/Database';
import { Link, useParams } from 'react-router-dom';
export default function Categorias() {

    const { categoriaId } = useParams();

    const [categoria, setCategoria] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        try {
            const idNum = parseInt(categoriaId, 10);

            const catEncontrada = db.obtenerCategoriaPorId(idNum);

            if (catEncontrada) {
                setCategoria(catEncontrada);
                const productosFiltrados = db.obtenerProductosPorCategoria(idNum);
                setProductos(productosFiltrados);
            }
        } catch (err) {
            console.error("Error al cargar productos por categoría:", err);
        }
    }, [categoriaId]);

    return (
        <>
            <h2 className="text-center mb-4">
                {categoria ? categoria.nombreCategoria : 'Categoría'}
            </h2>
            {productos.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    {productos.map(producto => (
                        <ProductoCard key={producto.productoId} producto={producto} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No se encontraron productos en esta categoría.</p>
            )}
        </>


    )
}
