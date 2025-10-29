import React, { useState, useEffect, useMemo } from 'react'
import OrdenCard from '../common/OrdenCard'
import { usarAuth } from '../../hooks/usarAuth';
import { useNavigate, Link } from 'react-router-dom';
import db from '../../servicios/Database';
import { getComunasPorRegion, getRegiones } from '../../utils/ubicaciones';
export default function Orden() {
    const { usuarioActual } = usarAuth();
    const navigate = useNavigate();

    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '', apellido: '', correo: '', direccion: '',
        numeroDepartamento: '', region: '', comuna: '', indicacion: ''
    });
    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorCarga, setErrorCarga] = useState(null);
    const [errorSubmit, setErrorSubmit] = useState(null);
    const [formErrores, setFormErrores] = useState({});

    useEffect(() => {
        setLoading(true);
        setErrorCarga(null);
        setFormErrores({});

        if (!usuarioActual) {
            navigate('/login');
            return;
        }

        try {
            const items = db.obtenerCarritoUsuario(usuarioActual.usuarioId);
            if (items.length === 0) {
                navigate('/carrito');
                return;
            }
            const itemsInicializados = items.map(item => {
                const producto = db.obtenerProductoPorId(item.productoId);
                return {
                    carroId: item.carroId,
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    subTotal: item.subTotal,
                    precioUnitarioAlAgregar: item.precioUnitarioAlAgregar,
                    nombreProducto: producto ? producto.nombreProducto : 'N/A',
                    imagenProducto: producto ? producto.imagenesProducto : null
                };
            });

            setItemsCarrito(itemsInicializados);

            setFormData({
                nombre: usuarioActual.nombre || '',
                apellido: usuarioActual.apellido || '',
                correo: usuarioActual.correo || '',
                direccion: usuarioActual.direccion || '',
                region: usuarioActual.region || '',
                comuna: usuarioActual.comuna || '',
                numeroDepartamento: '',
                indicacion: ''
            });

            setRegiones(getRegiones());
            if (usuarioActual.region) {
                setComunas(getComunasPorRegion(usuarioActual.region));
            } else {
                setComunas([]);
            }

        } catch (err) {
            console.error("Error al cargar datos de orden:", err);
            setErrorCarga("No se pudo cargar la información para la orden.");
        } finally {
            setLoading(false);
        }
    }, [usuarioActual, navigate]);

    const totalCarrito = useMemo(() => {
        return itemsCarrito.reduce((total, item) => total + item.subTotal, 0);
    }, [itemsCarrito]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrores[name]) {
            setFormErrores(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleRegionChange = (e) => {
        const regionSeleccionada = e.target.value;
        setFormData(prev => ({ ...prev, region: regionSeleccionada, comuna: '' }));
        setComunas(getComunasPorRegion(regionSeleccionada));
        if (formErrores.region) setFormErrores(prev => ({ ...prev, region: undefined }));
        if (formErrores.comuna) setFormErrores(prev => ({ ...prev, comuna: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorSubmit(null);
        setFormErrores({});

        let erroresValidacion = {};
        if (!formData.nombre.trim()) erroresValidacion.nombre = "Nombre requerido.";
        if (!formData.apellido.trim()) erroresValidacion.apellido = "Apellido requerido.";
        if (!formData.correo.trim()) erroresValidacion.correo = "Correo requerido.";
        if (!formData.direccion.trim()) erroresValidacion.direccion = "Dirección requerida.";
        if (!formData.region) erroresValidacion.region = "Región requerida.";
        if (!formData.comuna) erroresValidacion.comuna = "Comuna requerida.";

        if (Object.keys(erroresValidacion).length > 0) {
            setFormErrores(erroresValidacion);
            return;
        }

        try {
            const carritosOriginales = db.obtenerCarritoUsuario(usuarioActual.usuarioId);
            const nuevaOrden = db.crearOrden({
                usuario: usuarioActual,
                carritos: carritosOriginales,
                numeroDepartamento: formData.numeroDepartamento.trim(),
                indicacion: formData.indicacion.trim()
            });
            navigate(`/orden-confirmada/${nuevaOrden.ordenId}`);

        } catch (error) {
            console.error("Error al crear la orden:", error);
            setErrorSubmit(`Error al procesar la orden: ${error.message}`);
        }
    };


    if (loading) return <p className="text-center my-5">Cargando orden...</p>;
    if (errorCarga) return <div className="container my-5 alert alert-danger">{errorCarga}</div>;
    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <form onSubmit={handleSubmit}>
                        <OrdenCard
                            items={itemsCarrito}
                            total={totalCarrito}
                            formData={formData}
                            handleChange={handleChange}
                            handleRegionChange={handleRegionChange}
                            regiones={regiones}
                            comunas={comunas}
                            erroresFormulario={formErrores}
                        />
                        {errorSubmit && <div className="alert alert-danger mt-3">{errorSubmit}</div>}

                        <div className="text-end mt-4">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg"
                                disabled={itemsCarrito.length === 0}>
                                Pagar ahora ({formatoChile(totalCarrito)})
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const formatoChile = (valor) => `$${valor.toLocaleString('es-CL')}`;