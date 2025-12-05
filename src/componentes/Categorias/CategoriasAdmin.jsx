import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MainProductosAdmin from '../main/MainProductosAdmin'
import NavbarProductosAdmin from '../Producto/NavbarProductosAdmin'
import TableCardAdmin from '../common/TableCardAdmin'
import api from '../../api/axiosConfig'

export default function CategoriasAdmin() {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarCategorias = async () => {
        setLoading(true);
        try {
            const cat = await api.get('/categorias');
            setCategorias(cat.data);
        } catch (error) {
            console.error("Error cargando categorías:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm(`¿Estás seguro de eliminar la categoría con ID ${id}?`)) {
            try {
                await api.delete(`/categorias/${id}`);
                setCategorias(prev => prev.filter(c => c.categoriaId !== id));
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("No se pudo eliminar la categoría (puede tener productos asociados).");
            }
        }
    };

    const columnasConfigCategorias = [
        { header: '#', accessor: 'categoriaId' },
        {
            header: 'Imagen', accessor: 'imagenCategoria',
            render: (item) => <img src={item.imagenCategoria} alt="cat" style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
        },
        {
            header: 'Categoría', accessor: 'nombreCategoria',
            render: (item) => <span className="fw-bold">{item.nombreCategoria}</span>
        },
        { header: 'Descripción', accessor: 'descripcionCategoria' },
        { header: 'Prefijo', accessor: 'prefijoCategoria' },
        {
            header: 'Acciones', accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/categorias/editar/${item.categoriaId}`} className="btn btn-sm btn-outline-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button onClick={() => handleEliminar(item.categoriaId)} className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    if (loading) return (
        <MainProductosAdmin tituloText='Categorías' parrafoText='Cargando...'>
            <div className="text-center my-5"><div className="spinner-border text-primary"></div></div>
        </MainProductosAdmin>
    );

    const categoriasNavLinks = [
        { to: '/admin/categorias', text: 'Listado de categorias' },
        { to: '/admin/categorias/nueva', text: 'Nueva categoria' }
    ]

    return (
        <MainProductosAdmin tituloText='Categorías' parrafoText='Gestión de categorías de productos'>
            <NavbarProductosAdmin links={categoriasNavLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigCategorias} datos={categorias} ></TableCardAdmin>
        </MainProductosAdmin>
    )
}