import React, { createContext, useState, useEffect, useContext } from 'react';

const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        try {
            const carritoGuardado = localStorage.getItem('carrito');
            return carritoGuardado ? JSON.parse(carritoGuardado) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);


    const agregarAlCarrito = (producto, cantidadSeleccionada = 1) => {
        setCarrito(prevCarrito => {
            const itemExistente = prevCarrito.find(item => item.productoId === producto.productoId);

            if (itemExistente) {
                return prevCarrito.map(item =>
                    item.productoId === producto.productoId
                        ? { ...item, cantidad: item.cantidad + cantidadSeleccionada }
                        : item
                );
            } else {
                return [...prevCarrito, { ...producto, cantidad: cantidadSeleccionada }];
            }
        });
    };

    const eliminarDelCarrito = (productoId) => {
        setCarrito(prevCarrito => prevCarrito.filter(item => item.productoId !== productoId));
    };

    const restarCantidad = (productoId) => {
        setCarrito(prevCarrito => {
            const itemExistente = prevCarrito.find(item => item.productoId === productoId);
            
            if (itemExistente?.cantidad === 1) {
                // Si queda 1, lo eliminamos
                return prevCarrito.filter(item => item.productoId !== productoId);
            } else {
                // Si hay más, restamos 1
                return prevCarrito.map(item =>
                    item.productoId === productoId
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                );
            }
        });
    };

    const vaciarCarrito = () => {
        setCarrito([]);
    };

    const totalCompra = carrito.reduce((acc, item) => {
        const precioReal = item.oferta ? item.precioOferta : item.precio;
        return acc + (precioReal * item.cantidad);
    }, 0);

    // Calcular Cantidad de Items (para el badge del icono)
    const cantidadTotalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

    return (
        <CarritoContext.Provider value={{
            carrito,
            agregarAlCarrito,
            eliminarDelCarrito,
            restarCantidad,
            vaciarCarrito,
            totalCompra,
            cantidadTotalItems
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const usarCarrito = () => useContext(CarritoContext);