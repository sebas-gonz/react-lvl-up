import React from 'react'
import OrdenTable from '../Orden/OrdenTable'
import OrdenFormulario from '../Orden/OrdenFormulario'

export default function OrdenCard() {
    return (
    <div className='card'>
        <div className='card-body'>
            <OrdenTable></OrdenTable>
            <OrdenFormulario></OrdenFormulario>
        </div>
    </div>
    )
}
