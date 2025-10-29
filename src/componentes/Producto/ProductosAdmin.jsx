import React, { useState, useEffect } from 'react'
import NavbarProductosAdmin from './NavbarProductosAdmin'
import { Link, useNavigate } from 'react-router-dom'
import TableCardAdmin from '../common/TableCardAdmin'
import MainProductosAdmin from '../main/MainProductosAdmin';
import db from '../../servicios/Database';
export default function ProductosAdmin() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        try {
            const productos = db.obtenerProductos();
            const categorias = db.obtenerCategorias();
            const productosParaTabla = productos.map(p => {
                const cat = categorias.find(c => c.categoriaId === p.categoriaId);

                return {
                    productoId: p.productoId,
                    imagenesProducto: p.imagenesProducto,
                    nombreProducto: p.nombreProducto,
                    categoriaNombre: cat ? cat.nombreCategoria : 'Desconocida',
                    descripcionProducto: p.descripcionProducto,
                    precioProducto: p.precioProducto,
                    stockProducto: p.stockProducto,
                    stockMinimoProducto: p.stockMinimoProducto,
                };
            });


            setProductos(productosParaTabla);
        } catch (error) {
            console.error("Error al cargar productos o categorías:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const columnasConfigProductos = [
        {
            header: '#',
            accessor: 'productoId'
        },
        {
            header: 'Imagen',
            accessor: 'imagenesProducto',

            render: (item) => <img src={item.imagenesProducto} alt={item.nombreProducto} style={{ width: '50px', height: 'auto' }} />
        },
        {
            header: 'Juego',
            accessor: 'nombreProducto',

            render: (item) => <Link to={`/admin/producto/${item.productoId}`}>{item.nombreProducto}</Link>
        },
        {
            header: 'Categoría',
            accessor: 'categoriaNombre'
        },
        {
            header: 'Descripción',
            accessor: 'descripcionProducto'
        },
        {
            header: 'Precio',
            accessor: 'precioProducto',

            render: (item) => item.precioProducto === 0 ? 'Gratis' : `$${item.precioProducto}`
        },
        {
            header: 'Disponibilidad',
            accessor: 'stockProducto',

            render: (item) => item.stockProducto > 0 ? `${item.stockProducto}/${item.stockMinimoProducto}` : <span className="text-danger">Agotado</span>
        },
        {
            header: 'Acciones',
            accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/producto/editar/${item.productoId}`} className="btn btn-sm btn-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button
                        onClick={() => handleEliminar(item.productoId)}
                        className="btn btn-sm btn-danger"
                    >
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    const handleEliminar = (id) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}?`)) {
            console.log("Eliminando producto:", id);

        }
    };

    if (loading) return <p>Cargando productos...</p>;

    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/tarjetas', text: 'Formato tarjeta' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]

    return (
        <MainProductosAdmin tituloText='Productos' parrafoText='Listado de productos criticos'>
            <NavbarProductosAdmin links={productosNavLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigProductos} datos={productos} />
        </MainProductosAdmin>
    )
}
