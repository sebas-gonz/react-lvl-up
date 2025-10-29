import React, { use, useEffect, useState } from 'react'
import db from '../../servicios/Database'
import { useNavigate } from 'react-router-dom'
import { usarAuth } from '../../hooks/usarAuth'

export default function NuevoProductoCard() {

    const navigate = useNavigate()
    const { usuarioActual } = usarAuth()

    const [formData, setFormData] = useState({
        nombreProducto: '',
        descripcionProducto: '',
        precioProducto: '',
        precioOferta: '',
        oferta: false,
        stockProducto: '',
        stockMinimoProducto: '',
        categoriaId: '',
        imagenProducto: null
    })

    const [categorias, setCategorias] = useState([])
    const [errores, setErrores] = useState({});
    const [exito, setExito] = useState('');
    useEffect(() => {
        setCategorias(db.obtenerCategorias())
    }, [])

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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCategoriasChange = (e) => {
        const categoriaSeleccionada = e.target.value;
        setFormData({
            ...formData,
            categoriaId: categoriaSeleccionada,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevData => ({
                    ...prevData,
                    imagenProducto: reader.result
                }));
                setErrores(prevErrores => ({ ...prevErrores, imagen: undefined }));
            };
            reader.onerror = (error) => {
                console.error("Error al leer el archivo:", error);
                setErrores(prevErrores => ({ ...prevErrores, imagen: 'Error al procesar la imagen.' }));
                setFormData(prevData => ({ ...prevData, imagenProducto: null }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prevData => ({ ...prevData, imagenProducto: null }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrores({});
        setExito('');

        const precio = parseFloat(formData.precioProducto);
        const precioOferta = formData.oferta ? parseFloat(formData.precioOferta) : null;
        const stock = parseInt(formData.stockProducto, 10);
        const stockMinimo = parseInt(formData.stockMinimoProducto, 10);

        const nuevosErrores = {};
        if (usuarioActual?.tipoUsuario !== 1) {
            nuevosErrores.general = 'No tienes permisos para registrar productos.';
            return;
        }

        if (formData.nombreProducto.trim() === '') {
            nuevosErrores.nombreProducto = 'El nombre del producto no puede estar vacio.'
        }

        if (formData.descripcionProducto.trim() === '') {
            nuevosErrores.descripcionProducto = 'La descripción está vacía.'
        }

        if (isNaN(precio || precio < 0)) {
            nuevosErrores.precioProducto = 'El precio debe ser un número positivo.';
        }
        if (formData.oferta) {
            if (isNaN(precioOferta) || precioOferta === null || precioOferta < 0) {
                nuevosErrores.precioOferta = 'El precio de oferta debe ser un número positivo.';
            } else if (precioOferta >= precio) {
                nuevosErrores.precioOferta = 'El precio de oferta debe ser menor al precio normal.';
            }
        }

        if (isNaN(stock) || stock < 0) {
            nuevosErrores.stockProducto = 'El stock debe ser un número entero positivo o cero.';
        }

        if (isNaN(stockMinimo) || stockMinimo < 0) {
            nuevosErrores.stockMinimoProducto = 'El stock mínimo debe ser un número entero positivo o cero.';
        } else if (stockMinimo > stock) {
            if (!isNaN(stock)) {
                nuevosErrores.stockMinimoProducto = 'El stock mínimo no puede ser mayor al stock actual.';
            }
        }

        if (!formData.categoriaId) {
            nuevosErrores.categoriaId = 'Debe seleccionar una categoría.';
        }

        if (!formData.imagenProducto) {
            nuevosErrores.imagenProducto = 'Debe seleccionar una imagen.';
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }
        try {
            const datosProducto = {
                nombreProducto: formData.nombreProducto,
                descripcionProducto: formData.descripcionProducto,
                precioProducto: precio,
                oferta: formData.oferta,
                precioOferta: formData.oferta && !isNaN(precioOferta) ? precioOferta : null,
                stockProducto: stock,
                stockMinimoProducto: stockMinimo,
                categoriaId: parseInt(formData.categoriaId, 10), // Guardar como número
                imagenesProducto: formData.imagenProducto
            };

            db.agregarProducto(datosProducto)
            setExito('!Producto agregado¡')
            setFormData({
                nombreProducto: '', descripcionProducto: '', precioProducto: '', precioOferta: '',
                oferta: false, stockProducto: '', stockMinimoProducto: '', categoriaId: '',
                imagenProducto: null
            });
            setTimeout(() => {
                navigate('/admin/productos');
            }, 1500);
        } catch (error) {
            console.error("Error al guardar producto:", error);
            setErrores({ general: `Error al guardar: ${error.message}` });
        }

    }


    return (
        <div className="card text-start">
            <div className="card-body">
                <form onSubmit={handleSubmit}>


                    <div className="mb-3">
                        <label htmlFor="nombreProducto" className="form-label">Producto<small className="text-danger">*</small></label>
                        <input type="text" className={`form-control ${errores.nombreProducto ? 'is-invalid' : ''}`}
                            name='nombreProducto' value={formData.nombreProducto} onChange={handleChange} id="nombreProducto" placeholder="Ingrese el nombre del producto" />
                        {errores.nombreProducto && <div className="invalid-feedback">{errores.nombreProducto}</div>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción<small className="text-danger">*</small></label>
                        <textarea className={`form-control ${errores.descripcionProducto ? 'is-invalid' : ''}`}
                            name='descripcionProducto' value={formData.descripcionProducto} onChange={handleChange} id="descripcion" rows="3" placeholder="Ingrese una descripción del producto"></textarea>
                        {errores.descripcionProducto && <div className="invalid-feedback">{errores.descripcionProducto}</div>}
                    </div>
                    <div className="row">
                        <div className="mb-3 col-6 col-md-4">
                            <label htmlFor="precio" className="form-label">Precio<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.precioProducto ? 'is-invalid' : ''}`}
                                name='precioProducto' value={formData.precioProducto} onChange={handleChange} id="precio" placeholder="Ingrese el precio del juego" />
                            {errores.precioProducto && <div className="invalid-feedback">{errores.precioProducto}</div>}
                        </div>

                        <div className="mb-3 col-md-4 d-flex align-items-end"> 
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    id="ofertaCheck"
                                    name="oferta" 
                                    checked={formData.oferta}
                                    onChange={handleOfertaChange}
                                />
                                <label className="form-check-label" htmlFor="ofertaCheck">
                                    En Oferta
                                </label>
                            </div>
                        </div>

                        <div className="mb-3 col-md-4"> 
                            <label htmlFor="precioOferta" className="form-label">Precio Oferta</label>
                            
                            <input type="number" step="0.01" min="0"
                                className={`form-control ${errores.precioOferta ? 'is-invalid' : ''}`}
                                id="precioOferta" name="precioOferta"
                                value={formData.precioOferta} onChange={handleChange}
                                placeholder="Precio con descuento"
                                disabled={!formData.oferta} // 
                                required={formData.oferta} 
                            />
                            {errores.precioOferta && <div className="invalid-feedback">{errores.precioOferta}</div>}
                        </div>
                    </div>
                    <div className='row'> 
                        <div className="mb-3 col-6 col-md-4">
                            <label htmlFor="stock" className="form-label">Stock<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.stockProducto ? 'is-invalid' : ''}`}
                                name='stockProducto' value={formData.stockProducto} onChange={handleChange} id="stock" placeholder="Cantidad de productos" />
                            {errores.stockProducto && <div className="invalid-feedback">{errores.stockProducto}</div>}
                        </div>
                        <div className="mb-3 col-6 col-md-4">
                            <label htmlFor="productPrice" className="form-label">Stock crítico<small className="text-danger">*</small></label>
                            <input type="number" className={`form-control ${errores.stockMinimoProducto ? 'is-invalid' : ''}`}
                                name='stockMinimoProducto' value={formData.stockMinimoProducto} onChange={handleChange} id="productPrice" placeholder="Cantidad de productos alerta" />
                            {errores.stockMinimoProducto && <div className="invalid-feedback">{errores.stockMinimoProducto}</div>}
                        </div>
                        <div className="mb-3 col-6 col-md-4">
                            <label htmlFor="categoria" className="form-label">Categoría<small className="text-danger">*</small></label>
                            <select name='categoriaId' className="form-select" id="categoria" value={formData.categoriaId} onChange={handleCategoriasChange}>
                                <option value="" disabled selected>Seleccione una categoría</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.categoriaId} value={categoria.categoriaId}>{categoria.nombreCategoria}</option>
                                ))}
                            </select>
                            {errores.categoriaId && <div className="invalid-feedback">{errores.categoriaId}</div>}
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productoImagen" className="form-label">Imagen del Producto</label>
                        <input type="file" className={`form-control ${errores.imagenProducto ? 'is-invalid' : ''}`}
                            id="productoImagen" onChange={handleImageChange} accept="image/*" />
                        {errores.imagenProducto && <div className="invalid-feedback">{errores.imagenProducto}</div>}
                        {formData.imagenProducto && (
                            <div className="mt-2">
                                <p>Previsualización:</p>
                                <img src={formData.imagenProducto} alt="Previsualización" style={{ maxWidth: '200px', maxHeight: '150px' }} />
                            </div>
                        )}
                    </div>

                    <div className="text-end">
                        <button type="submit" className="btn btn-primary" disabled={usuarioActual?.tipoUsuario !== 1 && usuarioActual?.tipoUsuario !== 2}>
                            Guardar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
