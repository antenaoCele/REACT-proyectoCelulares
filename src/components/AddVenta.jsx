import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { API_URL } from '../apiConfig';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function AddVenta() {
    const [clientes, setClientes] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [celulares, setCelulares] = useState([]);

    const [clienteId, setClienteId] = useState('');
    const [vendedorId, setVendedorId] = useState('');
    const [celularId, setCelularId] = useState('');
    const [cantidad, setCantidad] = useState(1);

    const { vendedor } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Si hay vendedor logueado, pre-seleccionarlo
        if (vendedor) {
            setVendedorId(vendedor.id);
        }

        // Cargar datos para los selectores
        const fetchData = async () => {
            try {
                const [clientesRes, vendedoresRes, celularesRes] = await Promise.all([
                    fetch(`${API_URL}/clientes/`),
                    fetch(`${API_URL}/vendedores/`),
                    fetch(`${API_URL}/celulares/`)
                ]);
                setClientes(await clientesRes.json());
                setVendedores(await vendedoresRes.json());
                setCelulares(await celularesRes.json());
            } catch (error) {
                console.error('Error al cargar datos:', error);
                alert('Error al cargar los datos');
            }
        };
        fetchData();
    }, [vendedor]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nuevaVenta = {
            id_vendedor: parseInt(vendedorId),
            id_cliente: parseInt(clienteId),
            id_celular: parseInt(celularId),
            cantidad: parseInt(cantidad),
            fecha_venta: new Date().toISOString()
        };

        console.log("Enviando venta:", nuevaVenta);

        try {
            const response = await fetch(`${API_URL}/ventas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaVenta),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Error al registrar la venta');
            }

            alert('Venta registrada exitosamente.');

            // Limpiar formulario
            setClienteId('');
            setCelularId('');
            setCantidad(1);
            // Mantener vendedorId si está logueado
            if (!vendedor) {
                setVendedorId('');
            }
        } catch (error) {
            console.error(error);
            alert(error.message || 'Hubo un error al registrar la venta.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registrar Nueva Venta
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Cliente</InputLabel>
                        <Select
                            value={clienteId}
                            label="Cliente"
                            onChange={(e) => setClienteId(e.target.value)}
                            required
                        >
                            {clientes.map(c => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.nombre} {c.apellido}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Vendedor</InputLabel>
                        <Select
                            value={vendedorId}
                            label="Vendedor"
                            onChange={(e) => setVendedorId(e.target.value)}
                            required
                            disabled={!!vendedor}
                        >
                            {vendedores.map(v => (
                                <MenuItem key={v.id} value={v.id}>
                                    {v.nombre} {v.apellido}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Celular</InputLabel>
                        <Select
                            value={celularId}
                            label="Celular"
                            onChange={(e) => setCelularId(e.target.value)}
                            required
                        >
                            {celulares.map(c => (
                                <MenuItem key={c.id} value={c.id}>
                                    {c.marca} {c.modelo} - ${c.precio}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Cantidad"
                        type="number"
                        value={cantidad}
                        onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
                        required
                        fullWidth
                        margin="normal"
                        InputProps={{ inputProps: { min: 1 } }}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Registrar Venta
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}