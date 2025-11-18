import React, { useState, useEffect } from 'react';
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
    Tabs,
    Tab
} from '@mui/material';
import { API_URL } from '../apiConfig';

export default function Reportes() {
    const [tabValue, setTabValue] = useState(0);
    const [ventas, setVentas] = useState([]);
    const [reportesVendedores, setReportesVendedores] = useState([]);

    const fetchVentas = async () => {
        try {
            const response = await fetch(`${API_URL}/ventas/`);
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error al obtener ventas:', error);
        }
    };

    const fetchReportesVendedores = async () => {
        try {
            const response = await fetch(`${API_URL}/ventas/reportes`);
            const data = await response.json();
            setReportesVendedores(data);
        } catch (error) {
            console.error('Error al obtener reportes:', error);
        }
    };

    useEffect(() => {
        fetchVentas();
        fetchReportesVendedores();
    }, []);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Container sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Reportes de Ventas
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="Todas las Ventas" />
                    <Tab label="Reporte por Vendedor" />
                </Tabs>
            </Box>

            {/* Tab 1: Todas las Ventas */}
            {tabValue === 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Vendedor</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Celular</TableCell>
                                <TableCell align="right">Cantidad</TableCell>
                                <TableCell align="right">Precio Unit.</TableCell>
                                <TableCell align="right">Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ventas.map((venta) => (
                                <TableRow key={venta.id}>
                                    <TableCell>{venta.id}</TableCell>
                                    <TableCell>
                                        {new Date(venta.fecha_venta).toLocaleDateString('es-AR')}
                                    </TableCell>
                                    <TableCell>
                                        {venta.vendedor_nombre} {venta.vendedor_apellido}
                                    </TableCell>
                                    <TableCell>
                                        {venta.cliente_nombre} {venta.cliente_apellido}
                                    </TableCell>
                                    <TableCell>
                                        {venta.celular_marca} {venta.celular_modelo}
                                    </TableCell>
                                    <TableCell align="right">{venta.cantidad}</TableCell>
                                    <TableCell align="right">${venta.celular_precio}</TableCell>
                                    <TableCell align="right">
                                        ${(venta.cantidad * venta.celular_precio).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {ventas.length === 0 && (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography>No hay ventas registradas</Typography>
                        </Box>
                    )}
                </TableContainer>
            )}

            {/* Tab 2: Reporte por Vendedor */}
            {tabValue === 1 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vendedor</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell align="right">Total Ventas</TableCell>
                                <TableCell align="right">Celulares Vendidos</TableCell>
                                <TableCell align="right">Dinero Generado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reportesVendedores.map((reporte) => (
                                <TableRow key={reporte.id}>
                                    <TableCell>
                                        {reporte.nombre} {reporte.apellido}
                                    </TableCell>
                                    <TableCell>{reporte.email}</TableCell>
                                    <TableCell align="right">{reporte.total_ventas}</TableCell>
                                    <TableCell align="right">
                                        {reporte.total_celulares_vendidos || 0}
                                    </TableCell>
                                    <TableCell align="right">
                                        ${(reporte.total_dinero_generado || 0).toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {reportesVendedores.length === 0 && (
                        <Box sx={{ p: 3, textAlign: 'center' }}>
                            <Typography>No hay reportes disponibles</Typography>
                        </Box>
                    )}
                </TableContainer>
            )}
        </Container>
    );
}