import React from 'react'
import NavBar from '../header/NavBar'
import Login from '../Autenticacion/Login'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function AutentiacionLayout() {
    return (
        <div>
            <NavBar></NavBar>
            <main className='container mt-5'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    )
}
