import React, { useState, useEffect } from 'react'
import MainProductosAdmin from '../../main/MainProductosAdmin'
import NavbarProductosAdmin from '../../Producto/NavbarProductosAdmin'
import TableCardAdmin from '../../common/TableCardAdmin';
import { Link } from 'react-router-dom';
import db from '../../../servicios/Database';

export default function ListadoUsuarios() {
    const usuarioLinks = [
        { to: '/admin/usuarios', text: 'Listado de Usuarios' },
        { to: '/admin/usuarios/nuevo', text: 'Nuevo usuario' }
    ]

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuarios = db.obtenerUsuarios()

        setUsuarios(usuarios);
        setLoading(false);
    }, []);

    const renderizarTipoUsuario = (tipo) => {
        switch (tipo) {
            case 1:
                return <span className="badge bg-primary">ADMINISTRADOR</span>;
            case 2:
                return <span className="badge bg-success">VENDEDOR</span>;
            case 3:
            default:
                return <span className="badge bg-warning text-dark">CLIENTE</span>;
        }
    };

    const columnasConfigUsuarios = [
        {
            header: '#',
            accessor: 'usuarioId'
        },
        {
            header: 'Nombre Completo',
            accessor: 'nombreCompleto',

            render: (item) => <Link to={`/admin/usuario/${item.usuarioId}`}>{item.nombre} {item.apellido}</Link> // Ajusta la ruta del link
        },
        {
            header: 'Correo Electrónico',
            accessor: 'correo'
        },
        {
            header: 'Run',
            accessor: 'run'
        },
        {
            header: 'Tipo',
            accessor: 'tipoUsuario',

            render: (item) => <h6>{renderizarTipoUsuario(item.tipoUsuario)}</h6>
        },
        {
            header: 'Creado en',
            accessor: 'createdAt',
            render: (item) => new Date(item.createdAt).toLocaleString()
        },
        {
            header: 'Actualizado en',
            accessor: 'updatedAt',
            render: (item) => new Date(item.updatedAt).toLocaleString()
        },
        {
            header: 'Acciones',
            accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/usuario/editar/${item.usuarioId}`} className="btn btn-sm btn-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button
                        onClick={() => handleEliminar(item.usuarioId)}
                        className="btn btn-sm btn-danger"

                    >
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    const handleEliminar = (id) => {
        if (window.confirm(`¿Estás seguro de eliminar el usuario con ID ${id}?`)) {
            console.log("Eliminando usuario:", id);
        }
    };

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <MainProductosAdmin tituloText='Usuarios' parrafoText='Usuarios registrados'>
            <NavbarProductosAdmin links={usuarioLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigUsuarios} datos={usuarios}></TableCardAdmin>
        </MainProductosAdmin>
    )
}
