import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth.jsx';
import api from '../../api/axiosConfig.js';

export default function EditarCategoria() {

    const { categoriaId } = useParams();
    const navigate = useNavigate()
    const { usuarioActual } = usarAuth();

    const CLOUD_NAME = 'dsfuxaywv';
    const UPLOAD_PRESET = 'lvl-up';

    const [formData, setFormData] = useState({
        nombreCategoria: '',
        imagenCategoria: null,
        descripcion: ''
    })
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');
    const [subiendoImg, setSubiendoImg] = useState(false);
    const [enviando, setEnviando] = useState(false);
    const [cargandoDatos, setCargandoDatos] = useState(true);

    useEffect(() => {
        const cargarCategoria = async () => {
            setCargandoDatos(true);
            try {
                const res = await api.get(`/categorias/${categoriaId}`);
                const data = res.data;
                setFormData({
                    nombreCategoria: data.nombreCategoria,
                    descripcion: data.descripcionCategoria,
                    imagenCategoria: data.imagenCategoria,
                    prefijoCategoria: data.prefijoCategoria
                });
            } catch (error) {
                console.error("Error al cargar categoría:", error);
                setErrores({ general: "No se pudo cargar la categoría." });
            } finally {
                setCargandoDatos(false);
            }
        };
        cargarCategoria();
    }, [categoriaId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSubiendoImg(true);
        setErrores(prev => ({ ...prev, imagen: null }));

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
                setFormData(prev => ({ ...prev, imagenCategoria: data.secure_url }));
            } else {
                setErrores(prev => ({ ...prev, imagen: 'Error al subir imagen.' }));
            }
        } catch (error) {
            setErrores(prev => ({ ...prev, imagen: 'Error de conexión.' }));
        } finally {
            setSubiendoImg(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrores({})
        setExito('')
        
        if (usuarioActual?.rol !== 'ROLE_ADMIN') {
            setErrores({ general: 'No tienes permisos.' })
            return
        }

        let nuevosErrores = {};
        if (!formData.nombreCategoria.trim()) nuevosErrores.nombreCategoria = 'Nombre obligatorio.';
        if (!formData.descripcion.trim()) nuevosErrores.descripcion = 'Descripción obligatoria.';
        if (!formData.imagenCategoria) nuevosErrores.imagen = 'Imagen obligatoria.';
        if (!formData.prefijoCategoria) nuevosErrores.prefijoCategoria = 'El prefijo es obligatorio'

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setEnviando(true);

        try {
            const datosDTO = {
                nombreCategoria: formData.nombreCategoria.trim(),
                descripcionCategoria: formData.descripcion.trim(),
                imagenCategoria: formData.imagenCategoria,
                prefijoCategoria: formData.prefijoCategoria
            };
            await api.put(`/categorias/${categoriaId}`, datosDTO);

            setExito('¡Categoría actualizada con éxito!');
            
            setTimeout(() => {
                navigate('/admin/categorias');
            }, 1500);

        } catch (error) {
            setErrores({ general: `Error: ${error.response?.data?.message || error.message}` });
        } finally {
            setEnviando(false);
        }
    }

    if (cargandoDatos) return <div className="text-center p-4"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="card text-start shadow-sm border-0">
            <div className="card-header bg-warning text-dark fw-bold">
                <i className="bi bi-pencil-square me-2"></i> Editando Categoría
            </div>
            <div className="card-body">
                {exito && <div className="alert alert-success">{exito}</div>}
                {errores.general && <div className="alert alert-danger">{errores.general}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className='form-label fw-bold'>Nombre<small className="text-danger">*</small></label>
                        <input type="text" className={`form-control ${errores.nombreCategoria ? 'is-invalid' : ''}`} 
                            name='nombreCategoria' value={formData.nombreCategoria}
                            onChange={handleChange} />
                        {errores.nombreCategoria && <div className="invalid-feedback">{errores.nombreCategoria}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prefijoCategoria" className='form-label fw-bold'>Prefijo<small className="text-danger">*</small></label>
                        <input type="text" className={`form-control ${errores.nombreCategoria ? 'is-invalid' : ''}`} 
                            id="prefijoCategoria" name='prefijoCategoria' value={formData.prefijoCategoria}
                            onChange={handleChange} placeholder="Ej: Consolas" />
                        {errores.prefijoCategoria && <div className="invalid-feedback">{errores.prefijoCategoria}</div>}
                    </div>

                    <div className="mb-3">
                        <label className='form-label fw-bold'>Descripción<small className="text-danger">*</small></label>
                        <textarea
                            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                            name="descripcion" value={formData.descripcion} onChange={handleChange} rows={3}
                        />
                        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                    </div>

                    <div className="mb-3">
                        <label className='form-label fw-bold'>Imagen</label>
                        <input type="file" className={`form-control ${errores.imagen ? 'is-invalid' : ''}`}
                            onChange={handleImageChange} accept="image/*" disabled={subiendoImg} />
                        
                        {subiendoImg && <div className="text-primary mt-2">Subiendo imagen...</div>}

                        {formData.imagenCategoria && !subiendoImg && (
                            <div className="mt-2 p-2 border rounded bg-light d-inline-block text-center">
                                <img src={formData.imagenCategoria} alt="Actual" style={{ maxWidth: '200px', maxHeight: '150px' }} className="rounded" />
                                <small className="d-block text-muted">Imagen Actual</small>
                            </div>
                        )}
                    </div>

                    <div className="text-end">
                        <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/admin/categorias')}>Cancelar</button>
                        <button type="submit" className="btn btn-warning px-4" disabled={enviando || subiendoImg}>
                            {enviando ? 'Guardando...' : 'Actualizar'}
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}