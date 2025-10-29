import React from 'react'

export default function GraficoCard({Grafico, titulo = '', descripcion = ''}) {
    return (
        <div className="card">
            <div className="card-body">
                <h4>{titulo}</h4>
                <small>{descripcion}</small>
                <Grafico></Grafico>
            </div>
        </div>
    )
}
