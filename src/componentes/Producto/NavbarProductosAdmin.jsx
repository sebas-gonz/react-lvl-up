import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavbarProductosAdmin({ links = [] }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;
    return (
        <ul className="nav nav-tabs mb-3">

            {links.map((link, index) => (
                <li className="nav-item" key={link.to || index}>
                    <Link
                        className={`nav-link nav-menu ${isActive(link.to) ? 'active' : ''}`}
                        aria-current={isActive(link.to) ? 'page' : undefined}
                        to={link.to}>
                        {link.text}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
