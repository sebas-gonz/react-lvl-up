import React, { useState, useEffect } from 'react'
import TableCardAdmin from '../../common/TableCardAdmin'
import { Link } from 'react-router-dom';
import db from '../../../servicios/Database';
import MainProductosAdmin from '../../main/MainProductosAdmin';
export default function OrdenesAdmin() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatoChile = (valor) => `$${valor.toLocaleString('es-CL')}`

    useEffect(() => {
        setLoading(true);
        try {
            const ordenes = db.obtenerOrdenes()
            setOrdenes(ordenes);
        } catch (error) {
            console.error("Error al obtener órdenes:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const columnasConfigOrdenes = [
        {
            header: 'ID Orden',
            accessor: 'ordenId'
        },
        {
            header: 'Fecha y Hora',
            accessor: 'createdAt',

            render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleString('es-CL') : 'N/A'
        },
        {
            header: 'Monto Final',
            accessor: 'total',

            render: (item) => formatoChile(item.total)
        },
        {
            header: 'Comuna',
            accessor: 'comuna'
        },
        {
            header: 'Acciones',
            accessor: 'acciones',
            render: (item) => (
                <Link to={`/admin/ordenes/${item.ordenId}`} className="btn btn-primary btn-sm">
                    DETALLES
                </Link>
            )
        }
    ];

    if (loading) return <p>Cargando órdenes...</p>;

    return (
        <MainProductosAdmin tituloText='Ordenes de compra' parrafoText='Lista de ordenes'>
            <TableCardAdmin columnas={columnasConfigOrdenes} datos={ordenes} />
        </MainProductosAdmin>
    )
}
