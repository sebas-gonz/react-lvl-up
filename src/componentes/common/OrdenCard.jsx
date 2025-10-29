import React from 'react'
import OrdenTable from '../Orden/OrdenTable'
import OrdenFormulario from '../Orden/OrdenFormulario'

export default function OrdenCard({
    items,
    total,
    formData,
    handleChange,
    handleRegionChange,
    regiones,
    comunas,
    erroresFormulario
}) {
    return (
        <div className='card'>
            <div className='card-body'>
                <OrdenTable items={items} total={total}></OrdenTable>
                <OrdenFormulario
                    formData={formData} 
                    handleChange={handleChange} 
                    handleRegionChange={handleRegionChange}
                    regiones={regiones}
                    comunas={comunas}
                    errores={erroresFormulario}
                ></OrdenFormulario>
            </div>
        </div>
    )
}
