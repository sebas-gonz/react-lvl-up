import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableCardAdmin from '../common/TableCardAdmin'
import NavbarProductosAdmin from '../Producto/NavbarProductosAdmin';
import MainProductosAdmin from '../main/MainProductosAdmin';
import api from '../../api/axiosConfig';

export default function ProductosCriticosPage() {
    const [productosCriticos, setProductosCriticos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCriticos = async () => {
            setLoading(true);
            try {
                const productos = await api.get('/productos');
                
                const criticos = productos.data
                    .filter(p => p.stock <= p.stockMinimo)
                    .map(p => ({
                        productoId: p.productoId,
                        imagenProducto: p.imagenProducto,
                        nombreProducto: p.nombreProducto,
                        categoriaNombre: p.categoria.nombreCategoria ,
                        descripcionProducto: p.descripcionProducto,
                        stock: p.stock,
                        stockMinimo: p.stockMinimo
                    }));

                setProductosCriticos(criticos);
            } catch (err) {
                console.error("Error al cargar productos críticos:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCriticos();
    }, []);


    const renderizarEstadoStock = (item) => {
        const falta = item.stockMinimo - item.stock;
        if (item.stock === 0) {
            return <span className="badge bg-danger">AGOTADO</span>;
        } else {
            return <span className="badge bg-warning text-dark">SOLICITAR ({falta > 0 ? falta : 0})</span>;
        }
    };


    const columnasConfigProductosCriticos = [
        { header: '#', accessor: 'productoId' },
        {
            header: 'Imagen', accessor: 'imagenProducto',
            render: (item) => <img src={item.imagenProducto} alt="img" className="rounded" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
        },
        {
            header: 'Producto', accessor: 'nombreProducto',
            render: (item) => <Link to={`/admin/producto/${item.productoId}`} className="text-decoration-none fw-bold">{item.nombreProducto}</Link>
        },
        { header: 'Categoría', accessor: 'categoriaNombre' },
        { header: 'Stock Actual', accessor: 'stock', cellClassName: 'text-center fw-bold' },
        { header: 'Mínimo Requerido', accessor: 'stockMinimo', cellClassName: 'text-center' },
        {
            header: 'Estado', accessor: 'estadoStock',
            render: renderizarEstadoStock, cellClassName: 'text-center'
        }
    ];

    const productosNavLinks = [
        { to: '/admin/productos', text: 'Listado de productos' },
        { to: '/admin/productos/criticos', text: 'Productos criticos' },
        { to: '/admin/productos/nuevo', text: 'Nuevo producto' }
    ]

    if (loading) return (
        <MainProductosAdmin tituloText='Productos Críticos' parrafoText='Verificando stock...'>
            <div className="text-center my-5"><div className="spinner-border text-warning"></div></div>
        </MainProductosAdmin>
    );

    return (
        <MainProductosAdmin tituloText='Productos Críticos' parrafoText='Productos con bajo stock que requieren reposición'>
            <NavbarProductosAdmin links={productosNavLinks} />
            <TableCardAdmin columnas={columnasConfigProductosCriticos} datos={productosCriticos} />
        </MainProductosAdmin>
    );
}