import React, { useState, useEffect } from 'react'
import ProductoCard from '../common/ProductoCard'
import db from '../../servicios/Database';
import { Link, useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';
export default function Categorias() {

    const { categoriaId } = useParams();

    const [categoria, setCategoria] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const id = parseInt(categoriaId, 10);
        const cargarDatos = async () => {
            try {

                const categoriaCargada = await api.get('/categorias/'+ id)
                const productosCargados = await api.get('/productos/categoria/'+id)
                setCategoria(categoriaCargada.data)
                setProductos(productosCargados.data)
            } catch(e){
                console.error('Error al cargar los datos '+ e)
            }
        }
        cargarDatos()
    }, [categoriaId]);

    return (
        <>
            <h2 className="text-center mb-4">
                {categoria ? categoria.nombreCategoria : 'Categoría'}
            </h2>
            {productos.length > 0 ? (
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
                    {productos.map(producto => (
                        <div className='col' key={producto.productoId}>
                            <ProductoCard producto={producto} />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-muted">No se encontraron productos en esta categoría.</p>
            )}
        </>


    )
}
