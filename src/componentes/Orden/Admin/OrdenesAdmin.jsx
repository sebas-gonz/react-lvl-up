import React, { useState, useEffect } from 'react'
import TableCardAdmin from '../../common/TableCardAdmin'
import { Link } from 'react-router-dom';
import db from '../../../servicios/Database';
export default function OrdenesAdmin() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            const data = [
                { ordenId: 10001, codigo: 'ORDER12345', fecha: '2024-08-05T14:30:00', total: 15000, comuna: 'Santiago Centro' },
                { ordenId: 10002, codigo: 'ORDER67890', fecha: '2024-08-06T10:15:00', total: 25500, comuna: 'Providencia' }
            ];
            setOrdenes(data);
        } catch (error) {
            console.error("Error al obtener órdenes:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const columnasConfigOrdenes = [
        { header: 'ID de Orden', accessor: 'ordenId' },
        {
            header: 'Código',
            accessor: 'codigo',

            render: (item) => <Link to={`/admin/ordenes/${item.ordenId}`}>{item.codigo}</Link>
        },
        {
            header: 'Fecha y Hora',
            accessor: 'fecha',
            // Render personalizado para formatear la fecha (opcional)
            render: (item) => new Date(item.fecha).toLocaleString('es-CL')
        },
        {
            header: 'Monto Final',
            accessor: 'total',

            render: (item) => `$${item.total.toLocaleString('es-CL')}`
        },
        { header: 'Comuna', accessor: 'comuna' },
        {
            header: 'Acciones',
            accessor: 'acciones',
            render: (item) => (
                <Link to={`/admin/ordenes/orden`} className="btn btn-primary btn-sm">
                    DETALLES
                </Link>
            )
        }
    ];

    if (loading) return <p>Cargando órdenes...</p>;

    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div className="mt-4">
                <h4 className="card-title">Ordenes de compra</h4>
                <p className="card-text">Listado de todas las boletas emitidas.</p>
                <TableCardAdmin columnas={columnasConfigOrdenes} datos={ordenes} />
            </div>
        </main>
    )
}
