import React from 'react'
import ProductoOfertaCard from '../common/ProductoOfertaCard'
export default function ProductoOferta({titulo = 'Ofertas'}) {
    return (
        <>
            <h2 className="text-center mb-4">{titulo}</h2>
            <div className="row row-cols-2 row-cols-md-6 g-3 mb-3">
                <div className="col">
                    <ProductoOfertaCard>
                    </ProductoOfertaCard>
                </div>
            </div>
        </>
    )
}
