import React, { useState, useEffect, useMemo } from 'react'
import ProductoCarritoCard from '../common/ProductoCarritoCard'
import TablaCarrito from './TablaCarrito'
import { Link, useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth'
import db from '../../servicios/Database'

export default function Carrito() {

    const { usuarioActual } = usarAuth();
    const navigate = useNavigate();

    const [productosDisponibles, setProductosDisponibles] = useState([]);
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarDatosCarrito = () => {
        if (!usuarioActual) {
            setItemsCarrito([]);
            return;
        }
        try {
            const items = db.obtenerCarritoUsuario(usuarioActual.usuarioId);


            const productosInicializados = items.map(item => {
                const producto = db.obtenerProductoPorId(item.productoId);
                return {
                    carroId: item.carroId,
                    usuarioId: item.usuarioId,
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    subTotal: item.subTotal,
                    precioProducto: item.precioUnitarioAlAgregar, 
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    
                    nombreProducto: producto ? producto.nombreProducto : 'Producto no encontrado',
                    imagenProducto: producto ? producto.imagenesProducto : null
                };
            }).filter(item => item !== null);

            setItemsCarrito(productosInicializados);

        } catch (err) {
            console.error("Error al cargar carrito:", err);
            setError("No se pudo cargar el carrito.");
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            setProductosDisponibles(db.obtenerProductos());
            cargarDatosCarrito();
        } catch (err) {
            console.error("Error al cargar datos iniciales:", err);
            setError("Error al cargar la página.");
        } finally {
            setLoading(false);
        }
    }, [usuarioActual]);

    const handleAgregar = (producto) => {
        if (!usuarioActual) { navigate('/login'); return; }
        try {
            db.agregarProductoAlCarrito(usuarioActual, producto, 1);
            cargarDatosCarrito();
        } catch (err) { setError(err.message); }
    };

    const handleActualizarCantidad = (carroId, nuevaCantidad) => {
        try {
            db.actualizarCantidadItem(carroId, nuevaCantidad);
            cargarDatosCarrito();
        } catch (err) { setError(err.message); }
    };

    const handleEliminar = (carroId) => {
        if (window.confirm("¿Seguro que quieres eliminar este producto del carrito?")) {
            try {
                db.eliminarItemDelCarrito(carroId);
                cargarDatosCarrito();
            } catch (err) { setError(err.message); }
        }
    };

    const handleLimpiar = () => {
        if (usuarioActual && window.confirm("¿Seguro que quieres vaciar todo el carrito?")) {
            try {
                db.limpiarCarritoUsuario(usuarioActual.usuarioId);
                cargarDatosCarrito();
            } catch (err) { setError(err.message); }
        }
    };

    const totalCarrito = useMemo(() => {
        return itemsCarrito.reduce((total, item) => total + item.subTotal, 0);
    }, [itemsCarrito]);


    return (
        <div className='container my-4'>Carrito
            {error && <div className="alert alert-danger">{error}</div>}
            <div className='row'>
                <div className="col-lg-7 mb-4">
                    <h2 className="text-start mb-4">Productos disponibles</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
                        {productosDisponibles.length > 0 ? (
                            productosDisponibles.map(producto => (
                                <ProductoCarritoCard
                                    key={producto.productoId}
                                    producto={producto}
                                    onAgregar={handleAgregar}
                                />
                            ))
                        ) : (
                            <p className="text-muted">No hay productos disponibles.</p>
                        )}
                    </div>
                </div>
                <div className='col-lg-5'>
                    <h2>Carrito de compras</h2>
                    <TablaCarrito
                        items={itemsCarrito}
                        onActualizarCantidad={handleActualizarCantidad}
                        onEliminar={handleEliminar}
                        total={totalCarrito} // Pasa el total calculado
                    />
                </div>
                <div className="text-end mt-3"> 
                    <button
                        id="clear-cart-button" 
                        className="btn btn-outline-danger me-3"
                        type="button"
                        onClick={handleLimpiar} 
                        disabled={itemsCarrito.length === 0}>
                            Limpiar Carrito
                    </button>
                    <Link
                        className={`btn btn-success btn-lg ${itemsCarrito.length === 0 ? 'disabled' : ''}`} 
                        to="/compra"
                        aria-disabled={itemsCarrito.length === 0} 
                        tabIndex={itemsCarrito.length === 0 ? -1 : undefined}>
                            Comprar ahora ({`$${totalCarrito.toLocaleString('es-CL')}`}) 
                    </Link>
                </div>
            </div>
        </div>
    )
}
