import React from 'react'
import AdminHeader from '../header/AdminHeader'
import AdminSideBar from '../header/AdminSideBar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
    return (
        <>
            <AdminHeader />
            <div className="container-fluid">
                <div className="row">
                    <AdminSideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}
