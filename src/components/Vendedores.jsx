import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { API_URL } from '../apiConfig';

export default function Vendedores() {
    const [vendedores, setVendedores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editingVendedor, setEditingVendedor] = useState(null); // Estado para el vendedor en edición

    const fetchVendedores = async () => {
        try {
            const response = await fetch(`${API_URL}/vendedores/`);
            const data = await response.json();
            setVendedores(data);
        } catch (error) {
            console.error("Error al obtener los vendedores:", error);
        }
    };

    useEffect(() => {
        fetchVendedores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vendedorData = { nombre, apellido, telefono, email };
        if (password) vendedorData.password = password;  // Incluye password solo si se proporciona

        let response;
        if (editingVendedor) {
            // Actualizar vendedor existente
            response = await fetch(`${API_URL}/vendedores/${editingVendedor.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vendedorData),
            });
        } else {
            // Agregar nuevo vendedor (password requerido)
            if (!password) {
                alert('La contraseña es requerida para agregar un vendedor');
                return;
            }
            response = await fetch(`${API_URL}/vendedores/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(vendedorData),
            });
        }

        // Limpiar formulario y refrescar lista
        setNombre('');
        setApellido('');
        setTelefono('');
        setEmail('');
        setPassword('');
        setEditingVendedor(null); // Limpiar estado de edición
        fetchVendedores();
        if (response.ok) {
            alert(editingVendedor ? 'Vendedor actualizado exitosamente' : 'Vendedor agregado exitosamente');
        } else {
            alert(editingVendedor ? 'Error al actualizar el vendedor' : 'Error al agregar el vendedor');
        }
    };

    const handleEdit = (vendedor) => {
        // Llenar el formulario con los datos del vendedor seleccionado (excepto password)
        setNombre(vendedor.nombre);
        setApellido(vendedor.apellido);
        setTelefono(vendedor.telefono);
        setEmail(vendedor.email);
        setPassword('');  // No llenar password por seguridad
        setEditingVendedor(vendedor);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este vendedor?')) {
            try {
                const response = await fetch(`${API_URL}/vendedores/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Vendedor eliminado exitosamente');
                    fetchVendedores(); // Refrescar la lista
                } else {
                    alert('Error al eliminar el vendedor');
                }
            } catch (error) {
                console.error('Error al eliminar el vendedor:', error);
                alert('Error al eliminar el vendedor');
            }
        }
    };

    const handleCancelEdit = () => {
        // Limpiar formulario y estado de edición
        setNombre('');
        setApellido('');
        setTelefono('');
        setEmail('');
        setPassword('');
        setEditingVendedor(null);
    };

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Gestión de Vendedores
                </Typography>

                <Typography variant="h5" gutterBottom>
                    {editingVendedor ? 'Actualizar Vendedor' : 'Agregar Vendedor'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
                    <TextField label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required fullWidth margin="normal" />
                    <TextField label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingVendedor} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary" sx={{ mr: 2 }}>
                        {editingVendedor ? 'Actualizar Vendedor' : 'Agregar Vendedor'}
                    </Button>
                    {editingVendedor && (
                        <Button variant="outlined" onClick={handleCancelEdit}>
                            Cancelar
                        </Button>
                    )}
                </Box>

                <Typography variant="h5" gutterBottom>Listado de Vendedores</Typography>
                <List>
                    {vendedores.map((vendedor) => (
                        <ListItem key={vendedor.id} divider>
                            <ListItemText
                                primary={`${vendedor.nombre} ${vendedor.apellido}`}
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="text.primary">
                                            Email: {vendedor.email}
                                        </Typography>
                                        <br />
                                        Tel: {vendedor.telefono}
                                    </>
                                }
                            />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(vendedor)} sx={{ mr: 1 }}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(vendedor.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}