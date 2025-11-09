import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { API_URL } from '../apiConfig';

export default function AddVenta() {
    const [clientes, setClientes] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [celulares, setCelulares] = useState([]);

    const [clienteId, setClienteId] = useState('');
    const [vendedorId, setVendedorId] = useState('');
    const [celularId, setCelularId] = useState('');
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        // Cargar datos para los selectores
        const fetchData = async () => {
            const [clientesRes, vendedoresRes, celularesRes] = await Promise.all([
                fetch(`${API_URL}/clientes/`),
                fetch(`${API_URL}/vendedores/`),
                fetch(`${API_URL}/celulares/`)
            ]);
            setClientes(await clientesRes.json());
            setVendedores(await vendedoresRes.json());
            setCelulares(await celularesRes.json());
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevaVenta = {
            cliente_id: clienteId,
            vendedor_id: vendedorId,
            celular_id: celularId,
            cantidad: cantidad,
            fecha_venta: new Date().toISOString()
        };

        console.log("Enviando venta:", nuevaVenta);
        try {
            const response = await fetch(`${API_URL}/ventas/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaVenta),
            });
            if (!response.ok) throw new Error('Error al registrar la venta');
            alert('Venta registrada exitosamente.');
        } catch (error) {
            console.error(error);
            alert('Hubo un error al registrar la venta.');
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
                        <Select value={clienteId} label="Cliente" onChange={(e) => setClienteId(e.target.value)} required>
                            {clientes.map(c => <MenuItem key={c.id} value={c.id}>{c.nombre} {c.apellido}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Vendedor</InputLabel>
                        <Select value={vendedorId} label="Vendedor" onChange={(e) => setVendedorId(e.target.value)} required>
                            {vendedores.map(v => <MenuItem key={v.id} value={v.id}>{v.nombre} {v.apellido}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Celular</InputLabel>
                        <Select value={celularId} label="Celular" onChange={(e) => setCelularId(e.target.value)} required>
                            {celulares.map(c => <MenuItem key={c.id} value={c.id}>{c.marca} {c.modelo}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField label="Cantidad" type="number" value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value, 10))} required fullWidth margin="normal" InputProps={{ inputProps: { min: 1 } }} />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Registrar Venta
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}