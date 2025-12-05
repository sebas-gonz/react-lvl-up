import React from 'react'
import { Link } from 'react-router-dom'

export default function TableAdmin({ columnas, datos }) {

    if (!datos || datos.length === 0) {
        return <p className="text-center text-muted">No hay datos para mostrar.</p>;
    }

    return (
        <table className="table table-sm table-hover">
            <thead>
                <tr>
                    {columnas.map((columna) => (
                        <th key={columna.accessor} scope="col">{columna.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {datos.map((item, index) => (
                    <tr key={item.id || item.ordenId || item.productoId || index}>
                        {columnas.map((columna) => (
                            <td key={columna.accessor}>
                                {
                                    columna.render ? columna.render(item) :
                                        item[columna.accessor]
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
