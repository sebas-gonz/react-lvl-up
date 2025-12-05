import React, { useState, useEffect, useMemo, useRef } from 'react'
import OrdenCard from '../common/OrdenCard'
import { usarAuth } from '../../hooks/usarAuth';
import { useNavigate } from 'react-router-dom';
import { usarCarrito } from '../../hooks/CarritoContext';
import api from '../../api/axiosConfig';

export default function Orden() {
    const { usuarioActual } = usarAuth();
    const navigate = useNavigate();
    const { carrito, vaciarCarrito } = usarCarrito();
    const [itemsCarrito, setItemsCarrito] = useState([]);
    const [direccionesGuardadas, setDireccionesGuardadas] = useState([]);

    const ordenEnviada = useRef(false);

    const [formData, setFormData] = useState({
        nombre: '', apellido: '', correo: '',
        direccion: '', numeroDepartamento: '',
        region: '', comuna: '', indicaciones: ''
    });

    const [regiones, setRegiones] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorCarga, setErrorCarga] = useState(null);
    const [errorSubmit, setErrorSubmit] = useState(null);
    const [formErrores, setFormErrores] = useState({});

    useEffect(() => {
        setLoading(true);
        if (!usuarioActual) {
            navigate('/login');
            return;
        }

        if (carrito.length === 0 && !ordenEnviada.current) {
            navigate('/carrito');
            return;
        }

        const cargarDatos = async () => {
            try {
                const items = carrito.map(item => ({
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    subTotal: (item.oferta ? item.precioOferta : item.precio) * item.cantidad,
                    precioUnitario: item.oferta ? item.precioOferta : item.precio,
                    nombreProducto: item.nombreProducto,
                    imagenProducto: item.imagenProducto
                }));
                setItemsCarrito(items);

                const reg = await api.get('/regiones')
                setRegiones(reg.data)

                setFormData(prev => ({
                    ...prev,
                    nombre: usuarioActual.nombre || '',
                    apellido: usuarioActual.apellido || '',
                    correo: usuarioActual.email || ''
                }));

                const dir = await api.get('/direcciones');
                setDireccionesGuardadas(dir.data);

            } catch (err) {
                console.error("Error cargando datos:", err);
                setErrorCarga("Error al cargar información.");
            } finally {
                setLoading(false);
            }
        };

        cargarDatos();
    }, [usuarioActual, navigate, carrito]);

    const totalCarrito = useMemo(() => {
        return itemsCarrito.reduce((total, item) => total + item.subTotal, 0);
    }, [itemsCarrito]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (formErrores[name]) setFormErrores(prev => ({ ...prev, [name]: undefined }));
    };

    const handleDireccionGuardadaChange = async (e) => {
        const indice = e.target.value;

        const direccionSelec = direccionesGuardadas[parseInt(indice)];

        if (direccionSelec) {
            setFormData(prev => ({
                ...prev,
                direccion: direccionSelec.calle,
                numeroDepartamento: direccionSelec.numeroDepto,
                indicaciones: direccionSelec.indicaciones,
                region: '',
                comuna: ''
            }));

            if (direccionSelec.comuna) {
                try {
                    const respComuna = await api.get(`/comunas/${direccionSelec.comuna}`);
                    let regionId = null;
                    if (respComuna && respComuna.data) {
                        regionId = respComuna.data.regionId;
                    }
                    if (regionId) {
                        const respComunasRegion = await api.get('/comunas/region/' + regionId);
                        setComunas(respComunasRegion.data);
                        setFormData(prev => ({
                            ...prev,
                            region: regionId,
                            comuna: direccionSelec.comuna
                        }));
                    } else {
                        setFormData(prev => ({ ...prev, comuna: direccionSelec.comuna }));
                    }

                } catch (error) {
                    console.error("No se pudo cargar la geolocalización automática:", error);
                    setFormData(prev => ({ ...prev, comuna: direccionSelec.comuna }));
                }
            }
        }
    };
    const handleRegionChange = async (e) => {
        const regionSeleccionada = e.target.value;
        setFormData(prev => ({ ...prev, region: regionSeleccionada, comuna: '' }));
        try {
            const response = await api.get('/comunas/region/' + regionSeleccionada);
            setComunas(response.data);
        } catch (error) {
            setComunas([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorSubmit(null);

        let errores = {};
        if (!formData.direccion || formData.direccion.length < 10) errores.direccion = "La dirección debe tener al menos 10 caracteres.";
        if (!formData.comuna) errores.comuna = "Comuna requerida.";

        if (Object.keys(errores).length > 0) {
            setFormErrores(errores);
            return;
        }

        try {
            const boletaDTO = {
                totalBoleta: totalCarrito,
                calle: formData.direccion,
                numeroDepto: formData.numeroDepartamento ? parseInt(formData.numeroDepartamento) : null,
                indicaciones: formData.indicaciones,
                comuna: formData.comuna,
                detalles: itemsCarrito.map(item => ({
                    productoId: item.productoId,
                    cantidad: item.cantidad,
                    subTotal: item.subTotal
                }))
            };
            const response = await api.post('/boletas', boletaDTO);
            ordenEnviada.current = true;

            vaciarCarrito();
            navigate(`/orden-confirmada/${response.data.boletaId}`);

        } catch (error) {
            console.error("Error creando boleta:", error);
            setErrorSubmit("Error al procesar la compra. Intente nuevamente.");
            ordenEnviada.current = false
        }
    };

    if (loading) return <div className="text-center py-5">Cargando...</div>;

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
                            handleDireccionGuardadaChange={handleDireccionGuardadaChange}
                            direccionesGuardadas={direccionesGuardadas}
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
                                Pagar ahora (${totalCarrito.toLocaleString('es-CL')})
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}