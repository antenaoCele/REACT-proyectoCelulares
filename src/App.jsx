import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Celular from "./components/Celular";
import DetalleCelular from "./components/DetalleCelular";
import Login from "./components/Login";
import Clientes from "./components/Clientes";
import Vendedores from "./components/Vendedores";
import AddVenta from "./components/AddVenta";
import Carrito from "./components/Carrito";
import { CarritoProvider, useCarrito } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";
import { useState, useEffect } from "react";




function Catalogo() {

  const { celulares } = useCarrito();

  // const [celulares, setCelulares] = useState([]);

  const getCelulares = async () => {
    const response = await fetch("http://localhost:8000/celulares");
    const data = await response.json();
    console.log("Celulares: ", data);
    setCelulares(data);
  };

  useEffect(() => {
    getCelulares();
  }, []);


  return (
    <main>
      <div className="catalogo">
        {celulares.map((celular) => (
          <Celular key={celular.id} celular={celular} />
        ))}
      </div>
    </main>
  );
}

function App() {
  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/celular/:id" element={<DetalleCelular />} />
            <Route path="/login" element={<Login />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/vendedores" element={<Vendedores />} />
            <Route path="/registrar-venta" element={<AddVenta />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;
