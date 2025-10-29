import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { usarAuth } from '../../hooks/usarAuth.jsx';
import db from '../../servicios/Database.js';

export default function NuevaCategoriaForm() {

    const navigate = useNavigate()

    const { usuarioActual } = usarAuth();

    const [formData, setFormData] = useState({
        nombreCategoria: '',
        imagenCategoriaBase64: null,
        descripcion: ''
    })
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    imagenCategoriaBase64: reader.result
                }));
                setErrores(prevErrores => ({ ...prevErrores, imagen: undefined }));
            };
            reader.onerror = (error) => {
                console.error("Error al leer el archivo:", error);
                setErrores(prevErrores => ({ ...prevErrores, imagen: 'Error al procesar la imagen.' }));
                setFormData(prevData => ({ ...prevData, imagenCategoriaBase64: null }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prevData => ({ ...prevData, imagenCategoriaBase64: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrores({})
        setExito('')
        if (usuarioActual.tipoUsuario !== 1) {
            setErrores({ general: 'No tienes permisos para crear una categoria.' })
            return
        }
        let nuevosErrores = {};
        if (!formData.nombreCategoria.trim()) {
            nuevosErrores.nombreCategoria = 'El nombre de la categoría es obligatorio.';
        }
        if (!formData.descripcion.trim()) {
            nuevosErrores.descripcion = 'La descripción es obligatoria.';
        }
        if (!formData.imagenCategoriaBase64) {
            nuevosErrores.imagen = 'Debe seleccionar una imagen.';
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        try {
            const datosCategoria = {
                nombreCategoria: formData.nombreCategoria.trim(),
                descripcion: formData.descripcion.trim(),
                imagenCategoria: formData.imagenCategoriaBase64
            };
            db.agregarCategoria(datosCategoria);

            setExito('¡Categoría creada con éxito!');
            setFormData({ nombreCategoria: '', imagenCategoriaBase64: null, descripcion: '' });


            setTimeout(() => {
                navigate('/admin/categorias');
            }, 1500);

        } catch (error) {
            console.error("Error al guardar categoría:", error);
            setErrores({ general: `Error al guardar: ${error.message}` });
        }
    }

    return (
        <div className="card text-start">
            <div className="card-body">
                {exito && <div className="alert alert-success">{exito}</div>}
                {errores.general && <div className="alert alert-danger">{errores.general}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className='form-label'>Nombre de la categoria<small className="text-danger">*</small></label>
                        <input type="text" className={`form-control ${errores.nombreCategoria ? 'is-invalid' : ''}`} id="categoryName" name='nombreCategoria' value={formData.nombreCategoria}
                            onChange={handleChange} placeholder="Ingrese el nombre de la categoria" />
                        {errores.nombreCategoria && <div className="invalid-feedback">{errores.nombreCategoria}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className='form-label'>
                            Descripción<small className="text-danger">*</small>
                        </label>
                        <textarea
                            className={`form-control ${errores.descripcion ? 'is-invalid' : ''}`}
                            id="descripcion"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            placeholder="Ingrese una descripción para la categoría."
                            rows={5}
                        />
                        {errores.descripcion && <div className="invalid-feedback">{errores.descripcion}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imagenFile" className='form-label'>Imagen<small className="text-danger">*</small></label>
                        <input type="file" className={`form-control ${errores.imagen ? 'is-invalid' : ''}`} id="imagenFile"
                            name='imagenFile' onChange={handleImageChange} accept="image/*" />
                        {errores.imagen && <div className="invalid-feedback">{errores.imagen}</div>}

                        {formData.imagenCategoriaBase64 && (
                            <div className="mt-2">
                                <p>Imagen</p>
                                <img src={formData.imagenCategoriaBase64} alt="Previsualización" style={{ maxWidth: '200px', maxHeight: '150px' }} />
                            </div>
                        )}
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div >
        </div >
    )
}
