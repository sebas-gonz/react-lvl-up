    import React from 'react';
    import { Outlet } from 'react-router-dom'; 
    import Footer from '../Footer/Footer.jsx';      
    import Header from '../header/Header.jsx';             

    export default function MainLayout({clase = 'container my-4'}) {
        return (
            <div>
                
                <Header />
                <main className={clase}> 
                    <Outlet />
                </main>
                <Footer />
            </div>
        )
    }