import React, { useState, useEffect } from 'react'
import MainProductosAdmin from '../../main/MainProductosAdmin'
import NavbarProductosAdmin from '../../Producto/NavbarProductosAdmin'
import TableCardAdmin from '../../common/TableCardAdmin';
import { Link } from 'react-router-dom';
import api from '../../../api/axiosConfig';

export default function ListadoUsuariosPage() {
    const usuarioLinks = [
        { to: '/admin/usuarios', text: 'Listado de Usuarios' },
        { to: '/admin/usuarios/nuevo', text: 'Nuevo usuario' }
    ]

    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    const cargarUsuarios = async () => {
        setLoading(true);
        try {
            const usuarios = await api.get('/usuarios');
            setUsuarios(usuarios.data);
        } catch (error) {
            console.error("Error cargando usuarios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const renderizarTipoUsuario = (rolString) => {
        switch (rolString) {
            case 'ROLE_ADMIN':
                return <span className="badge bg-danger">ADMINISTRADOR</span>;
            case 'ROLE_VENDEDOR':
                return <span className="badge bg-success">VENDEDOR</span>;
            case 'ROLE_USER':
            default:
                return <span className="badge bg-primary">CLIENTE</span>;
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm(`¿Estás seguro de eliminar el usuario con ID ${id}?`)) {
            try {
                await api.delete(`/usuarios/${id}`);
                setUsuarios(prev => prev.filter(u => u.usuarioId !== id));
                alert("Usuario eliminado.");
            } catch (error) {
                console.error("Error eliminando:", error);
                alert("No se pudo eliminar el usuario.");
            }
        }
    };

    const columnasConfigUsuarios = [
        { header: '#', accessor: 'usuarioId' },
        {
            header: 'Nombre Completo', accessor: 'nombreCompleto',
            render: (item) => <span className="fw-bold">{item.nombre} {item.apellido}</span>
        },
        { header: 'Correo', accessor: 'email' },
        {
            header: 'RUT', accessor: 'runUsuario',
            render: (item) => item.runUsuario ? `${item.runUsuario}-${item.dvUsuario}` : 'N/A'
        },
        {
            header: 'Rol', accessor: 'rol',
            render: (item) => renderizarTipoUsuario(item.rol)
        },
        {
            header: 'Acciones', accessor: 'acciones',
            render: (item) => (
                <>
                    <Link to={`/admin/usuarios/editar/${item.usuarioId}`} className="btn btn-sm btn-outline-warning me-1">
                        <i className="bi bi-pencil-fill"></i>
                    </Link>
                    <button onClick={() => handleEliminar(item.usuarioId)} className="btn btn-sm btn-outline-danger">
                        <i className="bi bi-trash-fill"></i>
                    </button>
                </>
            )
        }
    ];

    if (loading) return (
        <MainProductosAdmin tituloText='Usuarios' parrafoText='Cargando usuarios...'>
            <div className="text-center my-5"><div className="spinner-border text-primary"></div></div>
        </MainProductosAdmin>
    );

    return (
        <MainProductosAdmin tituloText='Usuarios' parrafoText='Gestión de usuarios registrados'>
            <NavbarProductosAdmin links={usuarioLinks}></NavbarProductosAdmin>
            <TableCardAdmin columnas={columnasConfigUsuarios} datos={usuarios}></TableCardAdmin>
        </MainProductosAdmin>
    )
}