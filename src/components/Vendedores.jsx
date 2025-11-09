import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { API_URL } from '../apiConfig';

export default function Vendedores() {
    const [vendedores, setVendedores] = useState([]);

    useEffect(() => {
        const fetchVendedores = async () => {
            try {
                // Asumo que tu endpoint de vendedores es similar al de clientes
                const response = await fetch(`${API_URL}/vendedores/`);
                const data = await response.json();
                setVendedores(data);
            } catch (error) {
                console.error("Error al obtener los vendedores:", error);
            }
        };

        fetchVendedores();
    }, []);

    return (
        <Container>
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Nuestros Vendedores
                </Typography>
                <List>
                    {vendedores.map((vendedor) => (
                        <ListItem key={vendedor.id} divider>
                            <ListItemText
                                primary={`${vendedor.nombre} ${vendedor.apellido}`}
                                secondary={`Email: ${vendedor.correo}`}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
}