import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../common/Breadcrumb'
import db from '../../servicios/Database'
import { usarAuth } from '../../hooks/usarAuth'

export default function Producto() {

    const { productoId } = useParams();
    const navigate = useNavigate();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [mensajeExito, setMensajeExito] = useState('');

    const { usuarioActual } = usarAuth();

    useEffect(() => {
        setLoading(true);
        setError(null);
        setMensajeExito('');
        try {

            const id = parseInt(productoId, 10);
            const productoEncontrado = db.obtenerProductoPorId(id);
            if (productoEncontrado) {
                setProducto(productoEncontrado);
            } else {
                setError(`Producto con ID ${productoId} no encontrado.`);
            }
        } catch (err) {
            console.error("Error al cargar producto:", err);
            setError("No se pudo cargar la información del producto.");
        } finally {
            setLoading(false);
        }
    }, [productoId]);



    const handleAgregarAlCarrito = () => {
        setMensajeExito('');
        setError(null);

        if (!usuarioActual) {
            return;
        }

        if (!producto || cantidad <= 0) {
            setError("Producto no válido o cantidad inválida.");
            return;
        }

        try {

            db.agregarProductoAlCarrito(usuarioActual, producto, cantidad);
            setMensajeExito(`¡${cantidad} x ${producto.nombreProducto} agregado(s) al carrito!`);

        } catch (err) {
            console.error("Error al agregar al carrito:", err);
            setError(`No se pudo agregar el producto: ${err.message}`);
        }
    };

    if (loading) return <div className="container mt-5 text-center"><p>Cargando producto...</p></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
    if (!producto) return <div className="container mt-5"><p>Producto no encontrado.</p></div>;

    const nombre = producto.nombreProducto;
    const imagen = producto.imagenesProducto;
    const descripcion = producto.descripcionProducto;
    const precio = producto.precioProducto;
    const enOferta = producto.oferta;
    const precioOferta = producto.precioOferta;

    const formatoChile = (valor) => typeof valor === 'number' ? `$${valor.toLocaleString('es-CL')}` : '';

    return (
        <div className='container mt-5'>
            <Breadcrumb></Breadcrumb>
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
            <div class="card">
                <div class="card-body row">

                    <div class="col-md-6">
                        <img src={imagen} class="img-fluid" alt={nombre} />
                    </div>
                    <div class="col-md-6">
                        <div class="product-detail p-md-4">
                            <h1 class="mb-3">Nombre del Producto</h1>

                            <div class="d-flex flex-column mb-3 fs-4">
                                {enOferta && precioOferta !== null && precioOferta < precio && (
                                    <span className="precio-descuento text-decoration-line-through text-muted small">
                                        {formatoChile(precio)}
                                    </span>
                                )}
                                <span className="precio-nuevo fw-bolder text-warning">
                                    {enOferta && precioOferta !== null && precioOferta < precio
                                        ? formatoChile(precioOferta)
                                        : formatoChile(precio)}
                                </span>
                            </div>
                            <p class="mb-4">
                                {descripcion}
                            </p>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="cantidadProducto" className="form-label me-2">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidadProducto"
                                    className="form-control"
                                    value={cantidad}
                                    onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                    style={{ width: '80px' }}
                                />
                            </div>
                            <div className="d-grid">
                                <button
                                    className="btn btn-primary btn-lg"
                                    type="button"
                                    onClick={handleAgregarAlCarrito}>
                                    Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
