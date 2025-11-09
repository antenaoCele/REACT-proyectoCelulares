import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCarrito } from '../context/CarritoContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const { carrito } = useCarrito();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const totalItems = carrito.reduce((acc, item) => acc + item.quantity, 0);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/');
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                boxShadow: 'none',
                borderBottom: '1px solid #eee',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                {/* Izquierda: Carrito + Login */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconButton color="inherit" component={Link} to="/carrito">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>

                    {isAuthenticated ? (
                        <>
                            <IconButton color="inherit" onClick={handleMenu}>
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem component={Link} to="/clientes" onClick={handleClose}>
                                    Clientes
                                </MenuItem>
                                <MenuItem component={Link} to="/vendedores" onClick={handleClose}>
                                    Vendedores
                                </MenuItem>
                                <MenuItem component={Link} to="/registrar-venta" onClick={handleClose}>
                                    Registrar Venta
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Button component={Link} to="/login" color="inherit">
                            Login
                        </Button>
                    )}
                </Box>

                {/* Título centrado */}
                <Typography
                    variant="h3"
                    component={Link}
                    to="/"
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#FF3399',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '5rem',
                    }}
                >
                    CeluStore
                </Typography>
            </Toolbar>
        </AppBar>

    );
}