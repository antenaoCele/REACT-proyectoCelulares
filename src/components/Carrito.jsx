import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import {
    Container,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Avatar
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

export default function Carrito() {
    const { carrito, EliminarProducto, LimpiarCarrito, carritoTotal } = useCarrito();

    if (carrito.length === 0) {
        return (
            <Container sx={{ textAlign: 'center', my: 5 }}>
                <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: 500 }}>Tu carrito está vacío</Typography>
                <Button component={Link} to="/" variant="contained" color="primary" sx={{
                    fontFamily: 'sans-serif',
                    fontWeight: 600,
                    bgcolor: 'black',
                    color: 'white',
                    '&:hover': {
                        bgcolor: '#FF3399',
                    }

                }}>
                    Volver al catálogo
                </Button>
            </Container>
        );
    }

    const total = carritoTotal();

    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom >
                Tu Carrito de Compras
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Producto</TableCell>
                            <TableCell align="right">Precio</TableCell>
                            <TableCell align="center">Cantidad</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                            <TableCell align="center">Eliminar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {carrito.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar src={`/img/${item.image}.png`} sx={{ mr: 2 }} variant="square" />
                                        {item.marca} {item.modelo}
                                    </Box>
                                </TableCell>
                                <TableCell align="right">${item.precio.toFixed(2)}</TableCell>
                                <TableCell align="center">{item.quantity}</TableCell>
                                <TableCell align="right">${(item.precio * item.quantity).toFixed(2)}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => EliminarProducto(item.id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ mt: 3, textAlign: 'right' }}>
                <Typography variant="h5" component="p">
                    Total: ${total.toFixed(2)}
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    onClick={LimpiarCarrito}
                    sx={{
                        fontFamily: 'sans-serif',
                        fontWeight: 600,
                        bgcolor: 'black',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#FF3399',
                        }

                    }}
                >
                    Vaciar Carrito
                </Button>
            </Box>
        </Container>
    );
}