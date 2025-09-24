import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useState, useEffect } from "react";
import {
    Typography,
    Button,
    Box
} from "@mui/material";

export default function Celular({ celular }) {
    const { AgregarProducto } = useCarrito();
    const { marca, modelo, precio, almacenamiento, ram, sistemaOperativo, image } =
        celular;
    const [mostrarMsg, setMostrarMsg] = useState(false);


    useEffect(() => {
        let timer;
        if (mostrarMsg) {
            timer = setTimeout(() => setMostrarMsg(false), 2000);
        }
        return () => clearTimeout(timer);
    }, [mostrarMsg]);

    const handleAgregar = () => {
        AgregarProducto(celular);
        setMostrarMsg(true);
    };


    return (
        <>
            <div className="celular-card">
                <Link to={`/celular/${celular.id}`}>
                    <img src={`./public/img/${image}.png`} alt={`imagen ${modelo}`} />
                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            fontFamily: 'Poppins',
                            fontWeight: 600
                        }}
                    >{modelo}
                    </Typography>
                    <p>Marca: {marca}</p>
                    <p>RAM: {ram}GB - Almacenamiento: {almacenamiento}GB</p>
                    <p>Sist. Operativo: {sistemaOperativo}</p>

                    <Typography
                        variant="h5"
                        align="center"
                        sx={{
                            fontFamily: 'sans-serif',
                            fontWeight: 600
                        }}
                    >${precio} USD
                    </Typography>
                </Link>
                <Button
                    onClick={handleAgregar}
                    sx={{
                        fontFamily: 'sans-serif',
                        fontWeight: 600,
                        bgcolor: 'black',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#FF3399',
                        }

                    }}>
                    Agregar al Carrito
                </Button>

            </div>
            {mostrarMsg && (
                <Box
                    sx={{
                        position: "fixed",
                        top: "90%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "success.main",
                        color: "white",
                        p: 2,
                        borderRadius: 2,
                        textAlign: "center",
                        fontWeight: "bold",
                        fontFamily: 'sans-serif',

                    }}
                >
                    Agregado correctamente.
                </Box>
            )}
        </>



    );
}
