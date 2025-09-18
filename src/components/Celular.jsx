import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

export default function Celular({ celular }) {
    const { AgregarProducto } = useCarrito();
    const { marca, modelo, precio, almacenamiento, ram, sistemaOperativo, image } =
        celular;

    return (
        <div className="celular-card">
            <Link to={`/celular/${celular.id}`}>
                <img src={`./public/img/${image}.png`} alt={`imagen ${modelo}`} />
                <h3>{modelo}</h3>
                <p>Marca: {marca}</p>
                <p>RAM: {ram}GB - Almacenamiento: {almacenamiento}GB</p>
                <p>Sist. Operativo: {sistemaOperativo}</p>
                <p className="precio">${precio} USD</p>
            </Link>
            <button onClick={() => AgregarProducto(celular)}>
                Agregar al Carrito
            </button>
        </div>
    );
}
