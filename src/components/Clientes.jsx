import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '../apiConfig';

export default function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correo, setCorreo] = useState('');
    const [direccion, setDireccion] = useState('');
    const [editingCliente, setEditingCliente] = useState(null); // Estado para el cliente en edición

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
        const clienteData = { nombre, apellido, telefono, correo, direccion };

        let response;
        if (editingCliente) {
            // Actualizar cliente existente
            response = await fetch(`${API_URL}/clientes/${editingCliente.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteData),
            });
        } else {
            // Agregar nuevo cliente
            response = await fetch(`${API_URL}/clientes/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(clienteData),
            });
        }

        // Limpiar formulario y refrescar lista
        setNombre('');
        setApellido('');
        setTelefono('');
        setCorreo('');
        setDireccion('');
        setEditingCliente(null); // Limpiar estado de edición
        fetchClientes();
        if (response.ok) {
            alert(editingCliente ? 'Cliente actualizado exitosamente' : 'Cliente agregado exitosamente');
        } else {
            alert(editingCliente ? 'Error al actualizar el cliente' : 'Error al agregar el cliente');
        }
    };

    const handleEdit = (cliente) => {
        // Llenar el formulario con los datos del cliente seleccionado
        setNombre(cliente.nombre);
        setApellido(cliente.apellido);
        setTelefono(cliente.telefono);
        setCorreo(cliente.correo);
        setDireccion(cliente.direccion);
        setEditingCliente(cliente);
    };

    const handleCancelEdit = () => {
        // Limpiar formulario y estado de edición
        setNombre('');
        setApellido('');
        setTelefono('');
        setCorreo('');
        setDireccion('');
        setEditingCliente(null);
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestión de Clientes
                </Typography>

                <Typography variant="h5" gutterBottom>
                    {editingCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        {editingCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
                    </Button>
                    {editingCliente && (
                        <Button variant="outlined" onClick={handleCancelEdit}>
                            Cancelar
                        </Button>
                    )}
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
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(cliente)}>
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}