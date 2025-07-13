import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscaId, setBuscaId] = useState("");
  const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const buscarProduto = () => {
    setLoading(true);
    fetch("http://localhost:5000/produtos/produtos")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((err) => {
        console.error("Erro:", err);
        setProdutos([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    buscarProduto();
  }, []);

  const produtosFiltrados = produtos.filter((produto) => {
    const idStr = String(produto?.id || "");
    const buscaStr = buscaId.replace(/\D/g, "");
    return idStr.replace(/\D/g, "").includes(buscaStr);
  });

  const confirmarExclusao = (produto) => {
    setProdutoParaExcluir(produto);
    setMostrarModal(true);
  };

  const excluirProduto = () => {
    if (!produtoParaExcluir) return;

    fetch(`http://localhost:5000/produtos/produtos/${produtoParaExcluir.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setProdutos(produtos.filter((c) => c.id !== produtoParaExcluir.id));
        } else {
          alert("Erro ao excluir produto.");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir produto.");
      })
      .finally(() => {
        setMostrarModal(false);
        setProdutoParaExcluir(null);
      });
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(preco);
  };

  return (
    <div className="gestao-clientes">
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-titulo">Deseja mesmo excluir?</h2>
            <p className="modal-mensagem">Essa ação não poderá ser desfeita.</p>
            <div className="botoes-modal">
              <button
                onClick={() => setMostrarModal(false)}
                className="cancelar"
              >
                Cancelar
              </button>
              <button onClick={excluirProduto} className="confirmar">
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <div className="rectangle-2"></div>

        <div className="group-1">
          <div className="frame-168">
            <img
              className="design-sem-nome-22-1"
              src="design-sem-nome-22-10.png"
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
        <div className="cabecalho-clientes">
          <div className="titulo">
            <h1>Produtos</h1>
            <p>Produtos cadastrados</p>
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
            <Link to="/produtos/novo">
              <button className="novo-cliente-btn">Novo produto</button>
            </Link>
          </div>
        </div>

        <div className="tabela">
          <div className="tabela-header">
            <span>Nome</span>
            <span>ID</span>
            <span>Preço</span>
            <span>Estoque</span>
          </div>

          {loading ? (
            <p className="mensagem">Carregando produtos...</p>
          ) : produtosFiltrados.length === 0 ? (
            <p className="mensagem">Nenhum produto encontrado.</p>
          ) : (
            produtosFiltrados.map((produto) => (
              <div className="linha-cliente" key={produto.id}>
                <span>{produto.nome}</span>
                <span>{produto.id}</span>
                <span>{formatarPreco(produto.preco)}</span>
                <span>{produto.estoque}</span>
                <div className="acoes">
                  <Link to={`/produtos/editar/${produto.id}`}>
                    <button className="acao editar">Editar</button>
                  </Link>
                  <button
                    className="acao excluir"
                    onClick={() => confirmarExclusao(produto)}
                  >
                    Excluir Produto
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Produtos;
