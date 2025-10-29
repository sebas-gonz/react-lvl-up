import React from 'react'
import DashBoardAdmin from './DashBoardAdmin'
import DashboardCard from '../common/DashboardCard'

export default function Admin() {
    return (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-3">
            <div className="mt-4">
                <DashBoardAdmin></DashBoardAdmin>
                <div className=" mt-3">
                    <div className="row row-cols-2 row-cols-md-4 g-4">
                        <DashboardCard iClass={"bi bi-speedometer2 card-icon"} 
                            h5Text={"Dashboard"}
                            pText={"Visión general de todas las métricas y estadísticas clave del sistema."}>
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-cart-check card-icon"}
                            h5Text={"Órdenes"}
                            pText={"Gestión y seguimiento de todas las órdenes de compra realizadas."}>
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-box-seam card-icon"}
                            h5Text={"Productos"}
                            pText={"Administrar inventario y detalles de los productos disponibles."}>
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-tags card-icon"}
                            h5Text={"Categorías"}
                            pText={"Organizar productos en categorías para facilitar su navegación."}>
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-people card-icon"}
                            h5Text={"Usuarios"}
                            pText={"Gestión de cuentas de usuario y sus roles dentro del sistema."}>
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-bar-chart-line card-icon"}
                            h5Text={"Reportes"}
                            pText={"Generación de informes detallados sobre las operaciones del sistema."}>                         
                        </DashboardCard>

                        <DashboardCard
                            iClass={"bi bi-person card-icon"}
                            h5Text={"Perfil"}
                            pText={"Administración de la información personal y configuraciones de cuenta."}>
                        </DashboardCard>
                        
                        <DashboardCard
                            iClass={"bi bi-shop card-icon"}
                            h5Text={"Tienda"}
                            pText={"Visualiza tu tienda en tiempo real, visualiza los reportes de los usuarios."}>
                        </DashboardCard>
                    </div>
                </div>
            </div>
        </main>
    )
}
