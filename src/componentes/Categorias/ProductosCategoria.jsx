import { useState,useEffect } from 'react'
import React from 'react'
import api from '../../api/axiosConfig.js'
import ListaCategorias from '../Categorias/ListaCategorias'
export default function ProductosCategoria({producto}) {
    const [categorias, setCategorias] = useState([])

    useEffect(() => {
        
        const cargarDatos = async () =>{
            try{
                const categoriasRespuesta = await api.get('/categorias')
                setCategorias(categoriasRespuesta.data)
                console.log("Datos cargados")
            } catch(e){
                console.error("Error al cargar los datos " + e)
            }
        }
        cargarDatos()
    }, []);

    return (
        <>
                    <ListaCategorias categorias={categorias} />
        </>
    )
}
