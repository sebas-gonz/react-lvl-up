import React from 'react'
import TableAdmin from './TableAdmin'

export default function TableCardAdmin({columnas, datos}) {
    return (
        <div className="card text-start">
            <div className="card-body">
                <div className="table-responsive small">
                    <TableAdmin columnas={columnas} datos={datos}></TableAdmin>
                </div>
            </div>
        </div>
    )
}
