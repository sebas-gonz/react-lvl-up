import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHeader() {
    return (
        <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
            <Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="/#">LVL UP</Link>
            <ul className="navbar-nav flex-row d-md-none">
                <li className="nav-item text-nowrap">
                    <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="bi bi-list"></i>
                    </button>
                </li>
            </ul>
            <div id="navbarSearch" className="navbar-search w-100 collapse">
                <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search"/>
            </div>
        </header>
    )
}
