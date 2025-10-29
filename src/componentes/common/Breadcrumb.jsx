import React from 'react'

export default function Breadcrumb() {
    return (
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Volver</a></li>
                <li class="breadcrumb-item"><a href="/categorias">Categorías</a></li>
                <li class="breadcrumb-item active" aria-current="page">producto</li>
            </ol>
        </nav>

    )
}
