import { createContext, useContext, useState } from "react";
import { CelularesMockup } from "../utils/CelularesMockup";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
    const [celulares] = useState(CelularesMockup);
    const [carrito, setCarrito] = useState([]);

    function AgregarProducto(celular) {
        const existe = carrito.findIndex((producto) => producto.id === celular.id);
        if (existe >= 0) {
            const copiaCarrito = [...carrito];
            copiaCarrito[existe].quantity++;
            setCarrito(copiaCarrito);
        } else {
            celular.quantity = 1;
            setCarrito([...carrito, celular]);
        }
    }

    const carritoTotal = () =>
        carrito.reduce((total, item) => total + item.quantity * item.precio, 0);

    return (
        <CarritoContext.Provider
            value={{ celulares, carrito, AgregarProducto, carritoTotal, setCarrito }}
        >
            {children}
        </CarritoContext.Provider>
    );
}


export function useCarrito() {
    return useContext(CarritoContext);
}
