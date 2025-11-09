import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { API_URL } from '../apiConfig';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');

    const fetchClientes = async () => {
        // En una aplicación real, la URL vendría de una variable de entorno
        const response = await fetch(`${API_URL}/clientes/`);
        const data = await response.json();
        setClientes(data);
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nuevoCliente = { nombre, apellido, telefono, correo, direccion };

        const response = await fetch(`${API_URL}/clientes/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoCliente),
        });

        // Limpiar formulario y refrescar lista
        setNombre('');
        setApellido('');
        setTelefono('');
        setCorreo('');
        setDireccion('');
        fetchClientes();
        if (response.ok) {
            alert('Cliente agregado exitosamente');
        } else {
            alert('Error al agregar el cliente');
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestión de Clientes
                </Typography>

                <Typography variant="h5" gutterBottom>Agregar Cliente</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary">
                        Agregar Cliente
                    </Button>
                </Box>

                <Typography variant="h5" gutterBottom>Listado de Clientes</Typography>
                <List>
                    {clientes.map((cliente) => (
                        <ListItem key={cliente.id} divider>
                            <ListItemText
                                primary={`${cliente.nombre} ${cliente.apellido}`}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            Email: {cliente.correo}
                                        </Typography>
                                        <br />
                                        Tel: {cliente.telefono} - Dirección: {cliente.direccion}
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}