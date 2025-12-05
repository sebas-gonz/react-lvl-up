import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrdenCompletadoCard from '../OrdenCompletadoCard';
import api from '../../../api/axiosConfig';
export default function OrdenAdmin() {
    const { ordenId } = useParams(); 
    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarOrden = async () => {
            setLoading(true);
            setError(null);
            try {
                const boleta = await api.get(`/boletas/${ordenId}`);
                const boletaDatos = boleta.data;
                const ordenAdaptada = {
                    ordenId: boletaDatos.boletaId,
                    nombre: boletaDatos.usuario?.nombre,
                    apellido: boletaDatos.usuario?.apellido,
                    correo: boletaDatos.usuario?.email,
                    direccion: boletaDatos.calle,
                    numeroDepartamento: boletaDatos.numeroDepto,
                    comuna: boletaDatos.comuna,
                    region: "Chile",
                    indicacion: boletaDatos.indicaciones,
                    total: boletaDatos.totalBoleta,
                    createdAt: boletaDatos.createdAt,
                    items: boletaDatos.detalles?.map(detalle => ({
                        productoId: detalle.producto?.productoId,
                        nombreProducto: detalle.producto?.nombreProducto,
                        imagenProducto: detalle.producto?.imagenProducto,
                        precioUnitarioAlAgregar: detalle.subTotal / detalle.cantidad, 
                        cantidad: detalle.cantidad,
                        subTotal: detalle.subTotal
                    })) || []
                };

                setOrden(ordenAdaptada);

            } catch (err) {
                console.error("Error al cargar la orden (admin):", err);
                setError("No se pudo cargar la información de la orden o no existe.");
            } finally {
                setLoading(false);
            }
        };

        if (ordenId) {
            cargarOrden();
        }
    }, [ordenId]);

    if (loading) return <p>Cargando orden...</p>; 
    if (error) return <div className="alert alert-danger">{error}</div>; 

    return (
        <div className="mt-4">
            <div className="col-sm-12 d-flex justify-content-between align-items-center"> 
                <h4>
                    <Link to="/admin/ordenes" className="text-secondary me-2 text-decoration-none">
                        <i className="bi bi-arrow-left-circle-fill"></i>
                    </Link>
                    Orden de compra #{orden?.ordenId || ordenId}
                </h4>
                <p className="card-text  mb-0 text-white">
                    Emitida: {orden.createdAt.toLocaleString('es-CL')}
                </p>
            </div>
            <hr /> 

            <OrdenCompletadoCard orden={orden} />
        </div>
    );
}
