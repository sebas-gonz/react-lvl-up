import React from 'react'
import AdminHeader from '../header/AdminHeader'
import AdminSideBar from '../header/AdminSideBar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <AdminHeader>
            </AdminHeader>
            <div className='container-fluid"'>
                <div className='row'>
                    <AdminSideBar></AdminSideBar>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
