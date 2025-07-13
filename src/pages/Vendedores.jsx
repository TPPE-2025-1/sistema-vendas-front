import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Vendedores.css";

function Vendedores() {
  const [vendedores, setVendedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buscaCpf, setBuscaCpf] = useState("");
  const [vendedorParaExcluir, setVendedorParaExcluir] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const buscarVendedores = () => {
    setLoading(true);
    fetch("http://localhost:5000/vendedores/vendedores")
      .then((res) => res.json())
      .then((data) => setVendedores(data))
      .catch((err) => {
        console.error("Erro:", err);
        setVendedores([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    buscarVendedores();
  }, []);

  // Filtrar vendedoress por CPF
  const vendedoresFiltrados = vendedores.filter((vendedor) =>
    vendedor.cpf.replace(/\D/g, "").includes(buscaCpf.replace(/\D/g, ""))
  );
  const confirmarExclusao = (vendedor) => {
    setVendedorParaExcluir(vendedor);
    setMostrarModal(true);
  };

  const excluirVendedores = () => {
    if (!vendedorParaExcluir) return;

    fetch(
      `http://localhost:5000/vendedores/vendedores/${vendedorParaExcluir.cpf}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          setVendedores(
            vendedores.filter((c) => c.cpf !== vendedorParaExcluir.cpf)
          );
        } else {
          alert("Erro ao excluir vendedor.");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir vendedor.");
      })
      .finally(() => {
        setMostrarModal(false);
        setVendedorParaExcluir(null);
      });
  };
  return (
    <div className="gestao-vendedores">
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
              <button onClick={excluirVendedores} className="confirmar">
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
        <div className="cabecalho-vendedores">
          <div className="titulo">
            <h1>Vendedores</h1>
            <p>Vendedores cadastrados</p>
          </div>

          <div className="barra-superior">
            <div className="pesquisa">
              <input
                type="text"
                placeholder="Pesquisar por CPF..."
                value={buscaCpf}
                onChange={(e) => setBuscaCpf(e.target.value)}
              />
              <img src="/search.png" alt="Buscar" />
            </div>
            <Link to="/vendedores/novo">
              <button className="novo-vendedor-btn">Novo vendedor</button>
            </Link>
          </div>
        </div>

        <div className="tabela">
          <div className="tabela-header">
            <span>Nome</span>
            <span>CPF</span>
            <span>Telefone</span>
            <span>Email</span>
          </div>

          {loading ? (
            <p className="mensagem">Carregando vendedores...</p>
          ) : vendedoresFiltrados.length === 0 ? (
            <p className="mensagem">Nenhum vendedor encontrado.</p>
          ) : (
            vendedoresFiltrados.map((vendedor) => (
              <div className="linha-vendedor" key={vendedor.id}>
                <span>{vendedor.nome}</span>
                <span>{vendedor.cpf}</span>
                <span>{vendedor.telefone}</span>
                <span>{vendedor.email}</span>
                <div className="acoes">
                  <Link to={`/vendedores/editar/${vendedor.cpf}`}>
                    <button className="acao editar">Editar</button>
                  </Link>
                  <button
                    className="acao excluir"
                    onClick={() => confirmarExclusao(vendedor)}
                  >
                    Excluir Vendedores
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

export default Vendedores;
