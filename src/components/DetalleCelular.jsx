import { useParams } from "react-router-dom";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import { useCarrito } from "../context/CarritoContext";

export default function DetalleCelular() {
    const { id } = useParams();
    const { celulares, AgregarProducto } = useCarrito();
    const celular = celulares.find((c) => c.id === parseInt(id));

    if (!celular) return <Typography variant="h6">Celular no encontrado</Typography>;

    return (
        <Card
            sx={{ display: "flex", maxWidth: 900, margin: "2rem auto", p: 2, boxShadow: 4 }}
        >
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <CardMedia
                        component="img"
                        image={`/public/img/${celular.image}.png`}
                        alt={celular.modelo}
                        sx={{ width: "100%", maxWidth: 250, borderRadius: 2 }}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {celular.modelo}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary">
                            Marca: {celular.marca}
                        </Typography>
                        <Typography variant="body1">
                            RAM: {celular.ram}GB - Almacenamiento: {celular.almacenamiento}GB
                        </Typography>
                        <Typography variant="body1">
                            Sistema Operativo: {celular.sistemaOperativo}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                            Precio: ${celular.precio} USD
                        </Typography>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, px: 3, py: 1 }}
                            onClick={() => AgregarProducto(celular)}
                        >
                            Agregar al carrito
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Card>
    );
}
