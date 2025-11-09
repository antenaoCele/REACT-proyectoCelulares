import { createContext, useContext, useState } from "react";
import { CelularesMockup } from "../utils/CelularesMockup";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [celulares] = useState(CelularesMockup);
    const [carrito, setCarrito] = useState([]);

    function AgregarProducto(celular) {
        const existe = carrito.findIndex((producto) => producto.id === celular.id);
        if (existe >= 0) {
            const nuevoCarrito = carrito.map((item, index) => {
                if (index === existe) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCarrito(nuevoCarrito);
        } else {
            const nuevoProducto = { ...celular, quantity: 1 };
            setCarrito([...carrito, nuevoProducto]);
        }
    }

    function EliminarProducto(celularId) {
        const nuevoCarrito = carrito.filter(producto => producto.id !== celularId);
        setCarrito(nuevoCarrito);
    }

    function LimpiarCarrito() {
        setCarrito([]);
    }

    const carritoTotal = () =>
        carrito.reduce((total, item) => total + item.quantity * item.precio, 0);

    return (
        <CarritoContext.Provider
            value={{ celulares, carrito, AgregarProducto, carritoTotal, setCarrito, EliminarProducto, LimpiarCarrito }}
        >
            {children}
        </CarritoContext.Provider>
    );
}


export function useCarrito() {
    return useContext(CarritoContext);
}
