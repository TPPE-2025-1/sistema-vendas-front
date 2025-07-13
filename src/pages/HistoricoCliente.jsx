import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import VendaDetalhada from "./VendaDetalhada";
import "../styles/HistoricoCliente.css";

function HistoricoCliente() {
  const { cpf } = useParams();
  const [vendas, setVendas] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/vendas/vendas/cliente/${cpf}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar vendas");
        return res.json();
      })
      .then(setVendas)
      .catch(() => setErro("Erro ao carregar histórico."));
  }, [cpf]);

  if (erro) return <p>{erro}</p>;
  if (vendas.length === 0) return <p>Nenhuma venda encontrada.</p>;

  return (
    <div className="hist-cliente">
      <div className="header">
        <div className="rectangle-2"></div>

        <div className="group-1">
          <div className="frame-168">
            <img
              className="design-sem-nome-22-1"
              src="/design-sem-nome-22-10.png"
              alt="logo"
            />
            <div className="skin-clinic">Ana Scent</div>
          </div>
        </div>

        <div className="frame-189">
          <div className="frame-188">
            <div className="frame-184">
              <Link to="/" className="home2">
                Home
              </Link>
            </div>
            <div className="frame-185">
              <Link to="/clientes" className="clientes">
                Clientes
              </Link>
            </div>
            <div className="frame-186">
              <Link to="/produtos" className="produtos">
                Produtos
              </Link>
            </div>
            <div className="frame-187">
              <Link to="/vendas" className="vendas">
                Vendas
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="titulo-historico">
        <Link to="/clientes" className="voltar">
          ← Voltar
        </Link>
        <h1>Histórico de Compras</h1>
        <p>
          {vendas.length > 0
            ? vendas[0].cliente?.nome
            : "Cliente não encontrado"}
        </p>
      </div>

      <table className="historico-tabela">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <VendaDetalhada key={venda.id} venda={venda} modoResumido />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistoricoCliente;
