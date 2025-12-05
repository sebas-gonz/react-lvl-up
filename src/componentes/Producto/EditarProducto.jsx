import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {usarAuth} from '../../hooks/usarAuth'
import api from '../../api/axiosConfig';

export default function EditarProductoCard() {

    const { productoId } = useParams(); 
    const navigate = useNavigate()
    const { usuarioActual } = usarAuth()

    const CLOUD_NAME = 'dsfuxaywv';
    const UPLOAD_PRESET = 'lvl-up';

    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcionProducto: '',
        precio: '',
        precioOferta: '',
        oferta: false,
        stockProducto: '',
        stockMinimo: '',
        categoriaId: '',
        imagenProducto: null
    })

    const [categorias, setCategorias] = useState([])
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');
    const [subiendoImg, setSubiendoImg] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true);

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            setCargandoDatos(true);
            try {
                const cat = await api.get('/categorias');
                setCategorias(cat.data);

                if (productoId) {
                    const resProd = await api.get(`/productos/${productoId}`);
                    const producto = resProd.data;

                    setFormData({
                        nombreProducto: producto.nombreProducto,
                        descripcionProducto: producto.descripcionProducto,
                        precio: producto.precio,
                        precioOferta: producto.precioOferta || '',
                        oferta: producto.oferta,
                        stockProducto: producto.stock,
                        stockMinimo: producto.stockMinimo,
                        categoriaId: producto.categoria?.categoriaId || '',
                        imagenProducto: producto.imagenProducto
                    });
                }
            } catch (error) {
                console.error("Error cargando datos:", error);
                setErrores({ general: "Error al cargar la información del producto." });
            } finally {
                setCargandoDatos(false);
            }
        };
        cargarDatosIniciales();
    }, [productoId]);

    const handleOfertaChange = (e) => {
        const estaEnOferta = e.target.checked;
        setFormData(prevData => ({
            ...prevData,
            oferta: estaEnOferta,
            precioOferta: !estaEnOferta ? '' : prevData.precioOferta
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCategoriasChange = (e) => {
        setFormData({ ...formData, categoriaId: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSubiendoImg(true);
        setErrores(prev => ({ ...prev, imagenProducto: null }));

        const dataImg = new FormData();
        dataImg.append('file', file);
        dataImg.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: dataImg
            });
            const data = await res.json();

            if (data.secure_url) {
                setFormData(prev => ({ ...prev, imagenProducto: data.secure_url }));
            } else {
                setErrores(prev => ({ ...prev, imagenProducto: 'Error al subir imagen a Cloudinary.' }));
            }
        } catch (error) {
            console.error("Error Cloudinary", error);
            setErrores(prev => ({ ...prev, imagenProducto: 'Error de conexión.' }));
        } finally {
            setSubiendoImg(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrores({});
        setExito('');

        const precio = parseFloat(formData.precio);
        const precioOferta = formData.oferta ? parseFloat(formData.precioOferta) : null;
        const stock = parseInt(formData.stockProducto, 10);
        const stockMinimo = parseInt(formData.stockMinimo, 10);

        const nuevosErrores = {};
        if (usuarioActual.rol !== 'ROLE_ADMIN') nuevosErrores.general = 'No tienes permisos.';
        if (!formData.nombreProducto.trim()) nuevosErrores.nombreProducto = 'Nombre requerido.';
        if (!formData.descripcionProducto.trim()) nuevosErrores.descripcionProducto = 'Descripción requerida.';
        if (isNaN(precio) || precio < 0) nuevosErrores.precio = 'Precio inválido.';
        if (formData.oferta && (isNaN(precioOferta) || precioOferta < 0 || precioOferta >= precio)) {
            nuevosErrores.precioOferta = 'Precio oferta inválido.';
        }
        if (isNaN(stock) || stock < 0) nuevosErrores.stockProducto = 'Stock inválido.';
        if (isNaN(stockMinimo) || stockMinimo < 0) nuevosErrores.stockMinimo = 'Stock mínimo inválido.';
        if (!formData.categoriaId) nuevosErrores.categoriaId = 'Seleccione categoría.';
        if (!formData.imagenProducto) nuevosErrores.imagenProducto = 'Imagen requerida.';

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setEnviando(true);

        try {

            const datosProductoDTO = {
                nombre: formData.nombreProducto,
                descripcion: formData.descripcionProducto,
                precio: precio,
                stock: stock,
                oferta: formData.oferta,
                precioOferta: formData.oferta ? precioOferta : null,
                imagenUrl: formData.imagenProducto,
                stockMinimo: stockMinimo,
                categoriaId: parseInt(formData.categoriaId, 10)
            };

            await api.put(`/productos/${productoId}`, datosProductoDTO);
            setExito('¡Producto actualizado exitosamente!');

            setTimeout(() => {
                navigate('/admin/productos');
            }, 1500);

        } catch (error) {
            console.error("Error al actualizar:", error);
            setErrores({ general: `Error: ${error.response?.data?.message || error.message}` });
        } finally {
            setEnviando(false);
        }
    }

    if (cargandoDatos) return <div className="text-center p-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="card text-start shadow-sm border-0">
            <div className="card-header bg-warning text-dark fw-bold">
                <i className="bi bi-pencil-square me-2"></i> Editando Producto #{productoId}
            </div>
            <div className="card-body">
                {errores.general && <div className="alert alert-danger">{errores.general}</div>}
                {exito && <div className="alert alert-success">{exito}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Producto<small className="text-danger">*</small></label>
                        <input type="text" className={`form-control ${errores.nombreProducto ? 'is-invalid' : ''}`}
                            name='nombreProducto' value={formData.nombreProducto} onChange={handleChange} />
                        {errores.nombreProducto && <div className="invalid-feedback">{errores.nombreProducto}</div>}
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bold">Descripción<small className="text-danger">*</small></label>
                        <textarea className={`form-control ${errores.descripcionProducto ? 'is-invalid' : ''}`}
                            name='descripcionProducto' value={formData.descripcionProducto} onChange={handleChange} rows="3"></textarea>
                        {errores.descripcionProducto && <div className="invalid-feedback">{errores.descripcionProducto}</div>}
                    </div>

                    <div className="row">
                        <div className="mb-3 col-md-4">
                            <label className="form-label fw-bold">Precio<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
                                name='precio' value={formData.precio} onChange={handleChange} />
                            {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                        </div>

                        <div className="mb-3 col-md-4 d-flex align-items-end">
                            <div className="form-check form-switch mb-2">
                                <input className="form-check-input" type="checkbox" role="switch" id="ofertaCheckEdit"
                                    name="oferta" checked={formData.oferta} onChange={handleOfertaChange} />
                                <label className="form-check-label" htmlFor="ofertaCheckEdit">En Oferta</label>
                            </div>
                        </div>

                        <div className="mb-3 col-md-4">
                            <label className="form-label fw-bold">Precio Oferta</label>
                            <input type="number" className={`form-control ${errores.precioOferta ? 'is-invalid' : ''}`}
                                name="precioOferta" value={formData.precioOferta} onChange={handleChange}
                                disabled={!formData.oferta} />
                            {errores.precioOferta && <div className="invalid-feedback">{errores.precioOferta}</div>}
                        </div>
                    </div>

                    <div className='row'>
                        <div className="mb-3 col-md-4">
                            <label className="form-label fw-bold">Stock<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.stockProducto ? 'is-invalid' : ''}`}
                                name='stockProducto' value={formData.stockProducto} onChange={handleChange} />
                            {errores.stockProducto && <div className="invalid-feedback">{errores.stockProducto}</div>}
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label fw-bold">Stock Crítico<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.stockMinimo ? 'is-invalid' : ''}`}
                                name='stockMinimo' value={formData.stockMinimo} onChange={handleChange} />
                            {errores.stockMinimo && <div className="invalid-feedback">{errores.stockMinimo}</div>}
                        </div>
                        <div className="mb-3 col-md-4">
                            <label className="form-label fw-bold">Categoría<small className="text-danger">*</small></label>
                            <select name='categoriaId' className={`form-select ${errores.categoriaId ? 'is-invalid' : ''}`}
                                value={formData.categoriaId} onChange={handleCategoriasChange}>
                                <option value="" disabled>Seleccione...</option>
                                {categorias.map(cat => (
                                    <option key={cat.categoriaId} value={cat.categoriaId}>{cat.nombreCategoria}</option>
                                ))}
                            </select>
                            {errores.categoriaId && <div className="invalid-feedback">{errores.categoriaId}</div>}
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-bold">Imagen del Producto</label>
                        <input type="file" className={`form-control ${errores.imagenProducto ? 'is-invalid' : ''}`}
                            onChange={handleImageChange} accept="image/*" disabled={subiendoImg} />

                        {subiendoImg && <div className="text-primary mt-2">Subiendo imagen...</div>}

                        {formData.imagenProducto && !subiendoImg && (
                            <div className="mt-3 p-2 border rounded bg-light text-center" style={{ maxWidth: '200px' }}>
                                <img src={formData.imagenProducto} alt="Actual" className="img-fluid rounded" />
                                <small className="d-block text-secondary mt-1">Imagen Actual</small>
                            </div>
                        )}
                        {errores.imagenProducto && <div className="invalid-feedback d-block">{errores.imagenProducto}</div>}
                    </div>

                    <div className="text-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/admin/productos')}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-warning px-5"
                            disabled={enviando || subiendoImg}>
                            {enviando ? 'Guardando...' : 'Actualizar Producto'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}