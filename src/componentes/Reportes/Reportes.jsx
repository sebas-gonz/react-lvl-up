import React from 'react'
import GraficoCard from './GraficoCard'
import GraficoReportesMensuales from './GraficoReportesMensuales'
import MainProductosAdmin from '../main/MainProductosAdmin'

export default function Reportes() {
    return (
        <MainProductosAdmin tituloText='Reportes' parrafoText='Visualizacion del estado de ventas realizadas y cantidad de usuarios de la plataforma.'>
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <div className="card h-100">
                        <GraficoCard Grafico={GraficoReportesMensuales} titulo='Ventas Mensuales'
                            descripcion='Ventas realizadas en el primer semestre del año.'>
                        </GraficoCard>
                    </div>
                </div>
            </div>
        </MainProductosAdmin>
    )
}
