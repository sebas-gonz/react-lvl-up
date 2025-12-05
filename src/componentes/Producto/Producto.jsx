import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../common/Breadcrumb'
import { usarCarrito } from '../../hooks/CarritoContext'
import api from '../../api/axiosConfig'

export default function Producto() {

    const { productoId } = useParams();
    const navigate = useNavigate();
    const { agregarAlCarrito } = usarCarrito();

    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cantidad, setCantidad] = useState(1);
    const [mensajeExito, setMensajeExito] = useState('');


    useEffect(() => {
        setLoading(true);
        setError(null);
        setMensajeExito('');
        const id = parseInt(productoId, 10);
        const cargarDatos = async () => {
            try {
                const productoCargado = await api.get('/productos/' + id)
                setProducto(productoCargado.data)
            } catch (e) {
                console.error("Error al cargar el producto " + e)
            } finally {
                setLoading(false)
            }
        }
        cargarDatos()
    }, [productoId]);



    const handleAgregarAlCarrito = () => {
        setMensajeExito('');
        setError(null);
        if (!producto || cantidad <= 0) {
            setError("Producto no válido o cantidad inválida.");
            return;
        }
        try {
            agregarAlCarrito(producto, cantidad);
            setMensajeExito(`¡${cantidad} x ${producto.nombreProducto} agregado(s) al carrito!`);
            setTimeout(() => setMensajeExito(''), 3000);

        } catch (err) {
            console.error("Error al agregar al carrito:", err);
            setError(`No se pudo agregar el producto: ${err.message}`);
        }
    };

    if (loading) return <div className="container mt-5 text-center"><p>Cargando producto...</p></div>;
    if (error) return <div className="container mt-5"><div className="alert alert-danger">{error}</div></div>;
    if (!producto) return <div className="container mt-5"><p>Producto no encontrado.</p></div>;

    const { nombreProducto, imagenProducto, descripcionProducto, precio, oferta, precioOferta, stock } = producto;
    const formatearPrecio = (valor) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(valor);

    return (
        <div className='container mt-5'>
            <Breadcrumb></Breadcrumb>
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
            <div className="card">
                <div className="card-body row">

                    <div className="col-md-6">
                        <img src={imagenProducto} className="img-fluid" alt={nombreProducto} />
                    </div>
                    <div className="col-md-6">
                        <div className="product-detail p-md-4">
                            <h1 className="mb-3">{nombreProducto}</h1>

                            <div className="d-flex flex-column mb-3 fs-4">
                                {oferta && precioOferta !== null && precioOferta < precio && (
                                    <span className="precio-descuento text-decoration-line-through text-muted small">
                                        {formatearPrecio(precio)}
                                    </span>
                                )}
                                <span className="precio-nuevo fw-bolder text-warning">
                                    {oferta && precioOferta !== null && precioOferta < precio
                                        ? formatearPrecio(precioOferta)
                                        : formatearPrecio(precio)}
                                </span>
                            </div>
                            <p className="mb-4">
                                {descripcionProducto}
                            </p>
                            <div className="d-flex align-items-center mb-4">
                                <label htmlFor="cantidadProducto" className="form-label me-2">Cantidad:</label>
                                <input
                                    type="number"
                                    id="cantidadProducto"
                                    className="form-control text-center"
                                    value={cantidad}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value) || 1;
                                        if (val > stock) setCantidad(stock);
                                        else setCantidad(Math.max(1, val));
                                    }}
                                    min="1"
                                    max={stock}
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
