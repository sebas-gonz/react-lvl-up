import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../common/Breadcrumb'
import { usarAuth } from '../../hooks/usarAuth'
import api from '../../api/axiosConfig'

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
        const id = parseInt(productoId, 10);
        const cargarDatos = async () => {
            try {
                const productoCargado = await api.get('/productos/' + id)
                setProducto(productoCargado.data)
            } catch (e){
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
    const imagen = producto.imagenProducto;
    const descripcion = producto.descripcionProducto;
    const precio = producto.precioProducto;
    const enOferta = producto.oferta;
    const precioOferta = producto.precioOferta;

    const formatoChile = (valor) => typeof valor === 'number' ? `$${valor.toLocaleString('es-CL')}` : '';

    return (
        <div className='container mt-5'>
            <Breadcrumb></Breadcrumb>
            {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
            <div className="card">
                <div className="card-body row">

                    <div className="col-md-6">
                        <img src={imagen} className="img-fluid" alt={nombre} />
                    </div>
                    <div className="col-md-6">
                        <div className="product-detail p-md-4">
                            <h1 className="mb-3">{nombre}</h1>

                            <div className="d-flex flex-column mb-3 fs-4">
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
                            <p className="mb-4">
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
