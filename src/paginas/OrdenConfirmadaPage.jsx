import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrdenCompletadoCard from '../componentes/Orden/OrdenCompletadoCard';
import api from '../api/axiosConfig';

export default function OrdenConfirmadaPage() {
    const { ordenId } = useParams();
    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarOrden = async () => {
            setLoading(true);
            setError(null);
            try {
                if (!ordenId) throw new Error("ID de orden inválido");
                const response = await api.get(`/boletas/${ordenId}`);
                const dataBackend = response.data;
                const ordenAdaptada = {
                    ordenId: dataBackend.boletaId,
                    nombre: dataBackend.usuario?.nombre,
                    apellido: dataBackend.usuario?.apellido,
                    correo: dataBackend.usuario?.email,
                    direccion: dataBackend.calle,
                    numeroDepartamento: dataBackend.numeroDepto,
                    comuna: dataBackend.comuna,
                    region: "Chile",
                    indicacion: dataBackend.indicaciones,
                    total: dataBackend.totalBoleta,
                    items: dataBackend.detalles.map(detalle => ({
                        productoId: detalle.producto.productoId,
                        nombreProducto: detalle.producto.nombreProducto,
                        imagenProducto: detalle.producto.imagenProducto,
                        precioUnitarioAlAgregar: detalle.subTotal / detalle.cantidad,
                        cantidad: detalle.cantidad,
                        subTotal: detalle.subTotal
                    }))
                };

                setOrden(ordenAdaptada);

            } catch (err) {
                console.error("Error al cargar la orden:", err);
                setError("No se pudo cargar la información de la orden.");
            } finally {
                setLoading(false);
            }
        };

        cargarOrden();
    }, [ordenId]);

    if (loading) return (
        <div className="text-center my-5">
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Confirmando orden...</p>
        </div>
    );

    if (error) return (
        <div className="container my-5">
            <div className="alert alert-danger d-flex align-items-center">
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>{error}</div>
            </div>
            <div className="text-center">
                <Link to="/" className="btn btn-outline-dark">Volver al inicio</Link>
            </div>
        </div>
    );

    return (
        <div className="container my-5">
            <div className="card text-center bg-dark text-light border-success shadow-lg">
                <div className="card-header bg-success text-white">
                    <h1 className="card-title h3 my-2">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        ¡Orden Realizada con Éxito!
                    </h1>
                </div>
                <div className="card-body bg-light text-dark">
                    <p className="card-text fs-5 mt-3">Gracias por tu compra.</p>
                    <p className="card-text text-white mb-4">
                        Código de Orden: <strong>#{orden?.ordenId}</strong>
                    </p>
                    <OrdenCompletadoCard orden={orden} />

                    <div className="mt-4 mb-3">
                        <Link to="/" className="btn btn-primary btn-lg px-5">
                            Seguir Comprando
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}