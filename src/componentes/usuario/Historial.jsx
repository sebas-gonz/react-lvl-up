import React, { useEffect, useState } from 'react';
import { usarAuth } from '../../hooks/usarAuth'; // Asumo que tienes esto
import api from '../../api/axiosConfig';

export default function Historial() {
    const { usuarioActual } = usarAuth();
    const [boletas, setBoletas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (usuarioActual?.usuarioId) {
            cargarHistorial();
        }
    }, [usuarioActual]);

    const formatearMoneda = (monto) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP'
        }).format(monto);
    };

    const cargarHistorial = async () => {
        try {
            const boletas = await api.get(`/boletas/usuario/${usuarioActual.usuarioId}`);
            console.log("Respuesta del servidor:", boletas);
            setBoletas(boletas.data);
        } catch (error) {
            console.error("Error al cargar historial:", error);
        } finally {
            setCargando(false);
        }
    };

    if (cargando) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Mis Compras</h2>

            {boletas.length === 0 ? (
                <div className="alert alert-info">No has realizado compras aún.</div>
            ) : (
                <div className="accordion" id="accordionHistorial">
                    {boletas.map((boleta, index) => (
                        <div className="accordion-item" key={boleta.boletaId}>
                            <h2 className="accordion-header" id={`heading${boleta.boletaId}`}>
                                <button
                                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#collapse${boleta.boletaId}`}
                                    aria-expanded={index === 0 ? 'true' : 'false'}
                                    aria-controls={`collapse${boleta.boletaId}`}
                                >
                                    <div className="d-flex justify-content-between w-100 me-3">
                                        <span><strong>Boleta #{boleta.boletaId}</strong></span>
                                        <span className="text-muted">
                                            {new Date(boleta.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="badge bg-success">{formatearMoneda(boleta.totalBoleta)}</span>
                                    </div>
                                </button>
                            </h2>
                            <div
                                id={`collapse${boleta.boletaId}`}
                                className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                aria-labelledby={`heading${boleta.boletaId}`}
                                data-bs-parent="#accordionHistorial"
                            >
                                <div className="accordion-body">
                                    <h6>Detalles del envío:</h6>
                                    <p className="small mb-3">
                                        {boleta.calle} #{boleta.numeroDepto}, {boleta.comuna}. <br />
                                        <em className="text-muted">{boleta.indicaciones}</em>
                                    </p>

                                    <table className="table table-sm table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Producto</th>
                                                <th>Cant.</th>
                                                <th className="text-end">Subtotal</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {boleta.detalles && boleta.detalles.map((detalle) => (
                                                <tr key={detalle.detalleBoletaId}>
                                                    <td>{detalle.producto?.nombreProducto || 'Producto'}</td>
                                                    <td>{detalle.cantidad}</td>
                                                    <td className="text-end">{formatearMoneda(detalle.subTotal)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}