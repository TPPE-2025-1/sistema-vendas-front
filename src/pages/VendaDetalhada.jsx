import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/VendaDetalhada.css";

function VendaDetalhada({ venda: vendaProp, modoResumido = false }) {
  const { id } = useParams();
  const [venda, setVenda] = useState(vendaProp || null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!vendaProp && id) {
      fetch(`http://localhost:5000/vendas/vendas/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Venda não encontrada");
          return res.json();
        })
        .then((data) => setVenda(data))
        .catch(() => setErro("Erro ao carregar venda."));
    }
  }, [id, vendaProp]);

  if (erro) return <p className="erro">{erro}</p>;
  if (!venda) return <p>Carregando...</p>;

  // Modo resumido para uso em tabela no histórico
  if (modoResumido) {
    return (
      <tr>
        <td>{venda.produto?.nome}</td>
        <td>R$ {venda.total?.toFixed(2)}</td>
      </tr>
    );
  }

  // Modo completo original
  return (
    <div className="venda-detalhada">
      {/* Header */}
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

      <div className="inicio">
        <Link to="/vendas" className="voltar">
          ← Voltar
        </Link>
        <div className="inicio-venda-detalhada">
          Detalhes da Venda: {venda.id}
        </div>
      </div>

      <div className="info-bloco">
        <p>
          <strong>Data:</strong> {venda.data}
        </p>
        <p>
          <strong>Quantidade:</strong> {venda.quantidade}
        </p>
        <p>
          <strong>Total:</strong> R$ {venda.total?.toFixed(2)}
        </p>
        <p>
          <strong>Comissão:</strong> R$ {venda.comissao?.toFixed(2)}
        </p>
      </div>

      {venda.cliente && (
        <div className="info-bloco">
          <h2>Cliente</h2>
          <p>
            <strong>Nome:</strong> {venda.cliente.nome}
          </p>
          <p>
            <strong>CPF:</strong> {venda.cliente.cpf}
          </p>
          <p>
            <strong>Email:</strong> {venda.cliente.email}
          </p>
          <p>
            <strong>Telefone:</strong> {venda.cliente.telefone}
          </p>
        </div>
      )}

      {venda.produto && (
        <div className="info-bloco">
          <h2>Produto</h2>
          <p>
            <strong>ID:</strong> {venda.produto.id}
          </p>
          <p>
            <strong>Nome:</strong> {venda.produto.nome}
          </p>
          <p>
            <strong>Preço:</strong> R$ {venda.produto.preco?.toFixed(2)}
          </p>
        </div>
      )}

      {venda.vendedor && (
        <div className="info-bloco">
          <h2>Vendedor</h2>
          <p>
            <strong>Nome:</strong> {venda.vendedor.nome}
          </p>
          <p>
            <strong>CPF:</strong> {venda.vendedor.cpf}
          </p>
          <p>
            <strong>Comissão (%):</strong> {venda.vendedor.comissao_percentual}%
          </p>
        </div>
      )}
    </div>
  );
}

export default VendaDetalhada;
