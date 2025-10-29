import React from 'react'
import ProductoCard from '../common/ProductoCard.jsx'
export default function ProductosCategoria({producto}) {
    return (
        <>
            <h2 className="text-center mb-4">Productos</h2>
            <div className="row row-cols-2 row-cols-md-6 g-3 mb-3">
                <div className="col">
                    <ProductoCard producto={producto}>
                    </ProductoCard>
                </div>
            </div>
        </>
    )
}
