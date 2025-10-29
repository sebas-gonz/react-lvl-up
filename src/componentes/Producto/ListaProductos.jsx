import React from 'react';
import ProductoCard from '../common/ProductoCard.jsx'; 


export default function ListaProductosHome({ productos = [] }) { 
    return (
        <div className="container my-4"> 
            <h2 className="text-center mb-4">Productos Destacados</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"> 
                {productos.map(producto => (
                    
                    <ProductoCard key={producto.productoId} producto={producto} />
                ))}
            </div>
        </div>
    );
}