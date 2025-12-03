import React, { useState, useEffect } from 'react'
import Carrusel from './carrusel'
import Section from '../main/Section'
import ListaCategorias from '../Categorias/ListaCategorias'
import ListaProductosHome from '../Producto/ListaProductos'

import api from '../../api/axiosConfig'

export default function MainHome() {

    const [productos, setProductos] = useState([])
    const [loading, setLoading] = useState(true);
    const [categorias, setCategorias] = useState([])
    const [error,setError] =  useState(null)

    useEffect(() => {
        setLoading(true);
        setError(null);
        const cargarDatos = async () =>{
            try{
                const productosRespuesta = await api.get('/productos')
                const categoriasRespuesta = await api.get('/categorias')
                setProductos(productosRespuesta.data)
                setCategorias(categoriasRespuesta.data)
                console.log("Datos cargados")
            } catch(e){
                console.error("Error al cargar los datos " + e)
                setError("No se cargaros los datos: " + e)
            } finally {
                setLoading(false)
            }
        }
        cargarDatos()
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
