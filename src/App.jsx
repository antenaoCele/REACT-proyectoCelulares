import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Celular from "./components/Celular";
import DetalleCelular from "./components/DetalleCelular";
import { CarritoProvider, useCarrito } from "./context/CarritoContext";

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
    <CarritoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Catalogo />} />
          <Route path="/celular/:id" element={<DetalleCelular />} />
        </Routes>
      </Router>
    </CarritoProvider>
  );
}

export default App;
