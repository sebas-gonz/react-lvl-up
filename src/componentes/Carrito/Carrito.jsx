import React from 'react'
import ProductoCarritoCard from '../common/ProductoCarritoCard'
import TablaCarrito from './TablaCarrito'
import { Link } from 'react-router-dom'

export default function Carrito() {
    return (
        <div className='container'>Carrito
            <div className='row'>
                <div className="col-md-6">
                    <h2 className="text-start mb-4">Lista de productos</h2>
                    <div className="row" id="product-list">
                        <ProductoCarritoCard></ProductoCarritoCard>
                    </div>
                </div>
                <div className='col'>
                    <h2>Carrito de compras</h2>
                    <TablaCarrito></TablaCarrito>
                </div>
                <div className="text-end">
                    <button id="purchase-button" className="btn btn-secondary btn-lg" type="button">Limpiar</button>
                    <Link className="btn btn-success btn-lg ms-4" to="/compra">Comprar ahora</Link>
                </div>
            </div>
        </div>
    )
}
