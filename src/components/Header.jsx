import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCarrito } from "../context/CarritoContext";

function Header() {
    const [anchorEl, setAnchorEl] = useState(null);
    const { carrito, carritoTotal, setCarrito } = useCarrito();

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return (
        <AppBar position="static" color="default">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, textAlign: "center" }}
                >
                    celuStore
                </Typography>

                <Box>
                    <IconButton color="inherit" onClick={handleClick}>
                        <ShoppingCartIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        paperProps={{ style: { width: 350, padding: "20px" } }}
                    >
                        {carrito.length === 0 ? (
                            <Typography variant="body1" gutterBottom>
                                El carrito está vacío
                            </Typography>
                        ) : (
                            <>
                                <TableContainer component={Paper}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Imagen</TableCell>
                                                <TableCell>Nombre</TableCell>
                                                <TableCell>Precio</TableCell>
                                                <TableCell>Cantidad</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {carrito.map((producto) => (
                                                <TableRow key={producto.id}>
                                                    <TableCell>
                                                        <img
                                                            src={`/public/img/${producto.image}.png`}
                                                            alt="Celular"
                                                            style={{ width: "50px" }}
                                                        />
                                                    </TableCell>
                                                    <TableCell>{producto.modelo}</TableCell>
                                                    <TableCell>${producto.precio}</TableCell>
                                                    <TableCell>{producto.quantity}</TableCell>
                                                    <TableCell>
                                                        <Button
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                setCarrito(
                                                                    carrito.filter((c) => c.id !== producto.id)
                                                                )
                                                            }
                                                        >
                                                            X
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                <Typography variant="body1" sx={{ mt: 2 }}>
                                    Total pagar: <strong>{carritoTotal()}</strong>
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                    onClick={() => setCarrito([])}
                                >
                                    Vaciar Carrito
                                </Button>
                            </>
                        )}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
