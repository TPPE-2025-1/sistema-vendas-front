import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // esse caminho precisa ser exato!
import Cliente from "./pages/Clientes";
import NovoCliente from "./pages/NovoCliente";
import EditarCliente from "./pages/EditarCliente";
import Vendedores from "./pages/Vendedores";
import NovoVendedor from "./pages/NovoVendedor";
import EditarVendedor from "./pages/EditarVendedor";
import Produtos from "./pages/Produtos";
import NovoProduto from "./pages/NovoProduto";
import EditarProduto from "./pages/EditarProduto";
import Vendas from "./pages/Vendas";
import NovaVenda from "./pages/NovaVenda";
import VendaDetalhada from "./pages/VendaDetalhada";
import HistoricoCliente from "./pages/HistoricoCliente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Cliente />} />
        <Route path="/clientes/novo" element={<NovoCliente />} />
        <Route path="/clientes/editar/:cpf" element={<EditarCliente />} />
        <Route path="/vendedores" element={<Vendedores />} />
        <Route path="/vendedores/novo" element={<NovoVendedor />} />
        <Route path="/vendedores/editar/:cpf" element={<EditarVendedor />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/novo" element={<NovoProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/vendas/nova" element={<NovaVenda />} />
        <Route path="/vendas/relatorio/:id" element={<VendaDetalhada />} />
        <Route path="/clientes/:cpf/historico" element={<HistoricoCliente />} />
      </Routes>
    </Router>
  );
}

export default App;
