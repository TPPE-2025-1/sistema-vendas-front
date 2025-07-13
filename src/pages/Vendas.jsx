import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Vendas.css";

function VisualizarVendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscaId, setBuscaId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/vendas/vendas")
      .then((res) => res.json())
      .then((data) => setVendas(data))
      .catch((err) => {
        console.error("Erro:", err);
        setVendas([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const vendasFiltradas = vendas.filter((venda) => {
    const idStr = String(venda?.id || "");
    const buscaStr = buscaId.replace(/\D/g, "");
    return idStr.replace(/\D/g, "").includes(buscaStr);
  });

  const formatarPreco = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="gestao-vendas">
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

      <div className="conteudo">
        <div className="cabecalho-vendas">
          <div className="titulo">
            <h1>Vendas</h1>
            <p>Vendas realizadas</p>
          </div>

          <div className="barra-superior">
            <div className="pesquisa">
              <input
                type="text"
                placeholder="Pesquisar por ID..."
                value={buscaId}
                onChange={(e) => setBuscaId(e.target.value)}
              />
              <img src="/search.png" alt="Buscar" />
            </div>
            <Link to="/vendas/nova">
              <button className="novo-venda-btn">Nova venda</button>
            </Link>
          </div>
        </div>

        <div className="tabela-venda">
          <div className="tabela-header-venda">
            <span>Produto</span>
            <span>Valor</span>
            <span>Cliente</span>
            <span>Total</span>
            <span>Data</span>
            <span>ID</span>
          </div>

          {loading ? (
            <p className="mensagem">Carregando vendas...</p>
          ) : vendasFiltradas.length === 0 ? (
            <p className="mensagem">Nenhuma venda encontrada.</p>
          ) : (
            vendasFiltradas.map((venda) => (
              <div className="linha-venda" key={venda.id}>
                <span>{venda.produto?.nome}</span>
                <span>R$ {venda.produto?.preco?.toFixed(2)}</span>
                <span>{venda.cliente?.nome}</span>
                <span>R$ {venda.total?.toFixed(2)}</span>
                <span>{formatarData(venda.data)}</span>
                <span>{venda.id}</span>
                <div className="acoes">
                  <Link to={`/vendas/relatorio/${venda.id}`}>
                    <button className="acao editar">Visualizar Venda</button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default VisualizarVendas;
