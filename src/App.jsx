import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // esse caminho precisa ser exato!
import Cliente from "./pages/Clientes";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Cliente />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
        <Route path="/clientes/editar/:cpf" element={<EditarCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
