// src/paginas/OrdenConfirmadaPage.jsx (NUEVO ARCHIVO)

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrdenCompletadoCard from '../componentes/Orden/OrdenCompletadoCard'; 
import db from '../servicios/Database';

export default function OrdenConfirmadaPage() {
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
            console.error("Error al cargar la orden:", err);
            setError("No se pudo cargar la información de la orden.");
        } finally {
            setLoading(false);
        }
    }, [ordenId]); 

    if (loading) return <p className="text-center my-5">Cargando confirmación...</p>;
    if (error) return <div className="container my-5 alert alert-danger">{error}</div>;


    return (
        <div className="container my-5">
            <div className="card text-center bg-dark text-light border-success"> 
                <div className="card-body">
                    <h1 className="card-title text-success">
                        <i className="bi bi-check-circle-fill me-2"></i> 
                        ¡Orden Realizada con Éxito!
                    </h1>
                    <p className="card-text fs-5">Gracias por tu compra.</p>
                    <p className="card-text text-muted mb-4">Código de Orden: #{orden?.ordenId || ordenId}</p> 
                    <OrdenCompletadoCard orden={orden} />
                    <Link to="/" className="btn btn-primary mt-3">Volver al Inicio</Link>
                </div>
            </div>
        </div>
    );
}