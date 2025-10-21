    import React from 'react';
    import { Outlet } from 'react-router-dom'; // <-- FALTABA ESTO
    import Footer from '../Footer/Footer.jsx';      // <-- FALTABA ESTO
    import Header from '../header/Header.jsx';             // <-- FALTABA ESTO (Asumiendo que NavBar era Header)

    export default function MainLayout({clase = 'container my-4'}) {
        return (
            <div>
                {/* Usamos el nombre del componente importado: Header */}
                <Header />
                <main className={clase}> {/* Añadí 'my-4' para un espaciado de Bootstrap */}
                    <Outlet />
                </main>
                <Footer />
            </div>
        )
    }