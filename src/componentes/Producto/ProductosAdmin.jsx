import React, { useState, useEffect } from 'react'
import NavbarProductosAdmin from './NavbarProductosAdmin'
import { Link } from 'react-router-dom'
import TableCardAdmin from '../common/TableCardAdmin'
import MainProductosAdmin from '../main/MainProductosAdmin';
import api from '../../api/axiosConfig';

export default function ProductosAdmin() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const productos = await api.get('/productos');
            const productosAdaptados = productos.data.map(p => ({
                productoId: p.productoId,
                imagenProducto: p.imagenProducto, 
                nombreProducto: p.nombreProducto,
                categoriaNombre:  p.categoria.nombreCategoria,
                descripcionProducto: p.descripcionProducto,
                precio: p.precio, 
                stock: p.stock,   
                stockMinimo: p.stockMinimo, 
            }));

            setProductos(productosAdaptados);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleEliminar = async (id) => {
        if (window.confirm(`¿Estás seguro de eliminar el producto con ID ${id}? Esta acción es irreversible.`)) {
            try {
                await api.delete(`/productos/delete/${id}`);
                setProductos(prev => prev.filter(p => p.productoId !== id));
                alert("Producto eliminado correctamente.");
            } catch (error) {
                console.error("Error eliminando:", error);
                alert("No se pudo eliminar el producto. Verifica si tiene ventas asociadas.");
            }
        }
    };

    const columnasConfigProductos = [
        { header: '#', accessor: 'productoId' },
        {
            header: 'Imagen', accessor: 'imagenProducto',
            render: (item) => <img src={item.imagenProducto} alt="prod" className="rounded" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        },
        {
            header: 'Producto', accessor: 'nombreProducto',
            render: (item) => <Link to={`/admin/producto/${item.productoId}`} className="fw-bold text-decoration-none">{item.nombreProducto}</Link>
        },
        { header: 'Categoría', accessor: 'categoriaNombre' },
        { 
            header: 'Precio', accessor: 'precioProducto',
            render: (item) => item.precio === 0 ? <span className="badge bg-success">Gratis</span> : `$${item.precio.toLocaleString('es-CL')}`
        },
        {
            header: 'Stock', accessor: 'stockProducto',
            render: (item) => {
                const esCritico = item.stock <= item.stockMinimo;
                return (
                    <span className={`badge ${item.stockProducto > 0 ? (esCritico ? 'bg-warning text-dark' : 'bg-secondary') : 'bg-danger'}`}>
                        {item.stock} / {item.stockMinimo}
                    </span>
                )
            }
        },
        {
            header: 'Acciones', accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/productos/editar/${item.productoId}`} className="btn btn-sm btn-outline-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button onClick={() => handleEliminar(item.productoId)} className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]

    if (loading) return (
        <MainProductosAdmin tituloText='Productos' parrafoText='Cargando inventario...'>
            <div className="text-center my-5"><div className="spinner-border text-primary"></div></div>
        </MainProductosAdmin>
    );

    return (
        <MainProductosAdmin tituloText='Productos' parrafoText='Gestión del inventario general'>
            <NavbarProductosAdmin links={productosNavLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigProductos} datos={productos} />
        </MainProductosAdmin>
    )
}