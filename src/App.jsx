import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Celular from "./components/Celular";
import DetalleCelular from "./components/DetalleCelular";
import Login from "./components/Login";
import Clientes from "./components/Clientes";
import Vendedores from "./components/Vendedores";
import AddVenta from "./components/AddVenta";
import Reportes from "./components/Reportes";
import Carrito from "./components/Carrito";
import { CarritoProvider, useCarrito } from "./context/CarritoContext";
import { AuthProvider } from "./context/AuthContext";

function Catalogo() {
  const { celulares } = useCarrito();

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
            <Route path="/reportes" element={<Reportes />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
}

export default App;