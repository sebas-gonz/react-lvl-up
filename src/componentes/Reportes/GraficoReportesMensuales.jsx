import React from 'react'
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export default function GraficoReportesMensuales() {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [{
            label: 'Ventas',
            data: [120, 150, 180, 220, 200, 250],
            backgroundColor: 'rgba(54, 162, 235, 0.5)', // Azul Bootstrap
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        responsive: true, 
        plugins: {
            legend: {
                position: 'top', 
            },
            title: {
                display: false, 
                text: 'Ventas Mensuales',
            },
        },
        scales: {
            y: {
                beginAtZero: true 
            }
        }
    };

    return <Bar options={options} data={data} />;
}
