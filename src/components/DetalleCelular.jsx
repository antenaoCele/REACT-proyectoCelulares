import { useParams } from "react-router-dom";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useCarrito } from "../context/CarritoContext";
import { Link } from "react-router-dom";

export default function DetalleCelular() {
    const { id } = useParams();
    const { celulares, AgregarProducto } = useCarrito();
    const celular = celulares.find((c) => c.id === parseInt(id));

    if (!celular) return <Typography variant="h6">Celular no encontrado</Typography>;

    return (
        <>
            <Card
                sx={{ display: "flex", maxWidth: 900, margin: "2rem auto", p: 2, boxShadow: 4 }}
            >
                <Grid container spacing={10}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                        <CardMedia
                            component="img"
                            image={`/img/${celular.imagen}.png`}
                            alt={celular.modelo}
                            sx={{ width: "100%", maxWidth: 300, borderRadius: 2, mt: -12 }}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CardContent>
                            <Typography
                                variant="h4"
                                gutterBottom
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontWeight: 600
                                }}>
                                {celular.modelo}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Marca: {celular.marca}
                            </Typography>
                            <Typography variant="body1">
                                RAM: {celular.ram}GB
                            </Typography>
                            <Typography variant="body1">
                                Almacenamiento: {celular.almacenamiento}GB
                            </Typography>
                            <Typography variant="body1">
                                Sistema Operativo: {celular.sistemaOperativo}
                            </Typography>
                            <Typography variant="body1">
                                Color disponible: {celular.color}
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 2,
                                    fontFamily: 'Poppins',
                                    fontWeight: 600,
                                    color: "black"
                                }}>
                                Precio: ${celular.precio} USD
                            </Typography>

                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3, px: 3, py: 1,
                                    fontFamily: 'Poppins',
                                    fontWeight: 600,
                                    bgcolor: 'black',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: '#FF3399',
                                    }
                                }}
                                onClick={() => AgregarProducto(celular)}
                            >
                                Agregar al carrito
                            </Button>
                        </CardContent>
                    </Grid>
                    <IconButton
                        component={Link}
                        to="/"
                        sx={{
                            position: "absolute",
                            top: 35,
                            left: 30,
                            border: "2px solid #e91e63",
                            color: "#e91e63",
                            borderRadius: "50%",
                            width: 56,
                            height: 56,
                            transition: "0.3s",
                            textDecoration: "none",
                            transition: "transform 0.2s",
                            "&:hover": {
                                transform: "scale(1.2)"
                            }
                        }}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                </Grid>
            </Card >


        </>

    );
}
