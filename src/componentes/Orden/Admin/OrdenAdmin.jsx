import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import OrdenCompletadoCard from '../OrdenCompletadoCard';
import db from '../../../servicios/Database';
export default function OrdenAdmin() {
    const { ordenId } = useParams(); 
    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);
        try {
            const idNum = parseInt(ordenId, 10);
            const ordenEncontrada = db.obtenerOrdenPorId(idNum); 

            if (ordenEncontrada) {
                setOrden(ordenEncontrada);
            } else {
                setError(`Orden con ID ${ordenId} no encontrada.`);
            }
        } catch (err) {
            console.error("Error al cargar la orden (admin):", err);
            setError("No se pudo cargar la información de la orden.");
        } finally {
            setLoading(false);
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
                <p className="card-text text-muted mb-0">
                    Emitida: {orden?.createdAt ? new Date(orden.createdAt).toLocaleString('es-CL') : 'N/A'}
                </p>
            </div>
            <hr /> 

            <OrdenCompletadoCard orden={orden} />
        </div>
    );
}
