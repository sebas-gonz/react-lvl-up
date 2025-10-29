import React, { useState, useEffect } from 'react'
import Carrusel from './carrusel'
import Section from '../main/Section'
import ListaCategorias from '../Categorias/ListaCategorias'
import ListaProductosHome from '../Producto/ListaProductos'
import db from '../../servicios/Database'

export default function MainHome() {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([])
    const [error,setError] =  useState(null)

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {

            const productosObtenidos = db.obtenerProductos().slice(0, 8);
            const categoriasObtenidas = db.obtenerCategorias().slice(0, 3);

            setProductos(productosObtenidos);
            setCategorias(categoriasObtenidas);
        } catch (err) {
            console.error("Error al cargar datos del home:", err);
            setError("No se pudieron cargar los datos.");
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <Carrusel productos={productos}></Carrusel>
            <Section>
                <ListaCategorias categorias={categorias} />

                {!loading && !error && productos.length > 0 && (
                    <ListaProductosHome productos={productos} />
                )}
                {!loading && !error && productos.length === 0 && (
                    <p className="text-center text-muted">No hay productos destacados disponibles.</p>
                )}
            </Section>
        </>
    )
}
