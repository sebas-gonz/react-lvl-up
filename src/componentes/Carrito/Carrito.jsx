import React, { useState, useEffect, useMemo } from 'react'
import ProductoCarritoCard from '../common/ProductoCarritoCard'
import TablaCarrito from './TablaCarrito'
import { Link, useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth'
import { usarCarrito } from '../../hooks/CarritoContext'
import api from '../../api/axiosConfig'

export default function Carrito() {

    const {
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        restarCantidad,
        vaciarCarrito,
        totalCompra
    } = usarCarrito();

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const prod = await api.get('/productos');
                setProductosDisponibles(prod.data);
            } catch (error) {
                console.error("Error cargando productos", error);
            } finally {
                setLoading(false);
            }
        };
        cargarProductos();
    }, []);

    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [loading, setLoading] = useState(true);

    const itemsTabla = carrito.map(item => {
        const precioFinal = item.oferta ? item.precioOferta : item.precio;
        return {
            carroId: item.productoId,
            productoId: item.productoId,
            nombreProducto: item.nombreProducto,
            imagenProducto: item.imagenProducto,
            precioProducto: precioFinal,
            cantidad: item.cantidad,
            subTotal: precioFinal * item.cantidad
        };
    });

    const handleActualizarCantidad = (id, nuevaCantidad) => {
        const itemActual = carrito.find(i => i.productoId === id);
        if (!itemActual) return;

        if (nuevaCantidad > itemActual.cantidad) {
            agregarAlCarrito(itemActual);
        } else {
            restarCantidad(id);
        }
    };

    return (
        <div className='container my-4'>Carrito
            <div className='row'>
                <div className="col-lg-7 mb-4">
                    <h2 className="text-start mb-4">Productos disponibles</h2>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                            {productosDisponibles.length > 0 ? (
                                productosDisponibles.map(producto => (
                                    <ProductoCarritoCard
                                        key={producto.productoId}
                                        producto={producto}
                                        onAgregar={() => agregarAlCarrito(producto)}
                                    />
                                ))
                            ) : (
                                <p className="text-muted">No hay productos disponibles.</p>
                            )}
                        </div>
                    )}
                </div>
                <div className='col-lg-5'>
                    <div className="card shadow-sm border-0">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Carrito de compras</h2>

                            <TablaCarrito
                                items={itemsTabla}
                                onActualizarCantidad={handleActualizarCantidad}
                                onEliminar={eliminarDelCarrito}
                                total={totalCompra}
                            />

                            <div className="d-grid gap-2 mt-4">
                                <Link
                                    className={`btn btn-success btn-lg ${carrito.length === 0 ? 'disabled' : ''}`}
                                    to="/compra"
                                >
                                    Ir a Pagar <span className="fw-bold">(${totalCompra.toLocaleString('es-CL')})</span>
                                </Link>

                                <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={() => {
                                        if (window.confirm("¿Estás seguro de vaciar el carrito?")) vaciarCarrito();
                                    }}
                                    disabled={carrito.length === 0}
                                >
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
