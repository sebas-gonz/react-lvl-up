import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableCardAdmin from '../common/TableCardAdmin'
import NavbarProductosAdmin from '../Producto/NavbarProductosAdmin';
import MainProductosAdmin from '../main/MainProductosAdmin';
import db from '../../servicios/Database';

export default function ProductosCriticosPage() {
    const [productosCriticos, setProductosCriticos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const productos = db.obtenerProductos();
            const categorias = db.obtenerCategorias();
            const productosConCategoria = productos.map(p => {
                const cat = categorias.find(c => c.categoriaId === p.categoriaId);
                return {
                    productoId: p.productoId,
                    imagenUrl: p.imagenesProducto,
                    nombreProducto: p.nombreProducto,
                    categoriaNombre: cat ? cat.nombreCategoria : 'Desconocida',
                    descripcion: p.descripcionProducto,
                    stock: p.stockProducto,
                    stockMinimo: p.stockMinimoProducto

                };
            });
            const criticos = productosConCategoria.filter(p => p.stock <= p.stockMinimo);
            setProductosCriticos(criticos);
        } catch (err) {
            console.error("Error al cargar o filtrar productos críticos:", err);
        } finally {
            setLoading(false);
        }
    }, []);


    const renderizarEstadoStock = (item) => {
        const diferencia = item.stock - item.stockMinimo;
        if (item.stock === 0) {
            return <span className="badge bg-dark">AGOTADO</span>;
        } else if (diferencia <= 0) {
            return <span className="badge bg-warning text-dark">SOLICITAR ({item.stockMinimo - item.stock})</span>;
        }

    };


    const columnasConfigProductosCriticos = [
        {
            header: '#',
            accessor: 'productoId'
        },
        {
            header: 'Imagen',
            accessor: 'imagenUrl',
            render: (item) => <img src={item.imagenUrl} alt={item.nombreProducto} style={{ width: '50px', height: 'auto' }} />
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
            accessor: 'descripcion'
        },
        {
            header: 'Stock',
            accessor: 'stock',
            cellClassName: 'text-center'
        },
        {
            header: 'Stock Crítico',
            accessor: 'stockMinimo',
            cellClassName: 'text-center'
        },
        {
            header: '',
            accessor: 'estadoStock',
            render: renderizarEstadoStock,
            cellClassName: 'text-center'
        }
    ];

    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/tarjetas', text: 'Formato tarjeta' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]

    if (loading) return <p>Cargando productos críticos...</p>;

    return (
        <MainProductosAdmin tituloText='Productos Críticos' parrafoText='Listdo de productos'>
            <NavbarProductosAdmin links={productosNavLinks} />
            <TableCardAdmin columnas={columnasConfigProductosCriticos} datos={productosCriticos} />
        </MainProductosAdmin>

    );
}
