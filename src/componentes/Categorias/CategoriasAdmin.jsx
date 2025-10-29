import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MainProductosAdmin from '../main/MainProductosAdmin'
import NavbarProductosAdmin from '../Producto/NavbarProductosAdmin'
import TableAdmin from '../common/TableAdmin'
import TableCardAdmin from '../common/TableCardAdmin'
import db from '../../servicios/Database'

export default function CategoriasAdmin() {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const categorias = db.obtenerCategorias()
        setCategorias(categorias);
        setLoading(false);
    }, []);

    const columnasConfigCategorias = [
        {
            header: '#',
            accessor: 'categoriaId'
        },
        {
            header: 'Imagen',
            accessor: 'imagenCategoria',

            render: (item) => <img src={item.imagenCategoria} alt={item.nombreCategoria} style={{ width: '50px', height: 'auto' }} className="category-img" />
        },
        {
            header: 'Categoría',
            accessor: 'nombreCategoria',
            render: (item) => <Link to={`/admin/categoria/${item.categoriaId}`}>{item.nombreCategoria}</Link> // Ajusta la ruta del link si es necesario
        },
        {
            header: 'Descripción',
            accessor: 'descripcion'
        },
        {
            header: 'Cantidad de Productos',
            accessor: 'cantidadProductos',
            cellClassName: 'text-center',
            render: (item) => db.obtenerProductosPorCategoria(item.categoriaId).length
        },
        {
            header: 'Acciones',
            accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/categoria/editar/${item.categoriaId}`} className="btn btn-sm btn-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button
                        onClick={() => handleEliminar(item.categoriaId)}
                        className="btn btn-sm btn-danger"
                    >
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    const handleEliminar = (id) => {
        if (window.confirm(`¿Estás seguro de eliminar la categoría con ID ${id}?`)) {
            console.log("Eliminando categoría:", id);
        }
    };

    if (loading) return <p>Cargando categorías...</p>;

    const categoriasNavLinks = [
        { to: '/admin/categorias', text: 'Listado de categorias' },
        { to: '/admin/categorias/nueva', text: 'Nueva categoria' }
    ]

    return (
        <MainProductosAdmin tituloText='Categorias' parrafoText='Listado de categorias'>
            <NavbarProductosAdmin links={categoriasNavLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigCategorias} datos={categorias} ></TableCardAdmin>
        </MainProductosAdmin>
    )
}
