import React from 'react'
import ProductoCard from '../common/ProductoCard.jsx'
export default function Productos({titulo = 'Productos'}) {
    return (
        <>
            <h2 class="text-center mb-4">{titulo}</h2>
            <div class="row row-cols-2 row-cols-md-6 g-3 mb-3">
                <div class="col">
                    <ProductoCard>
                    </ProductoCard>
                </div>
            </div>
        </>
    )
}
