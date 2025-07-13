import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Clientes.css";
import VendaDetalhada from "./VendaDetalhada";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modoCadastro, setModoCadastro] = useState(false);
  const [buscaCpf, setBuscaCpf] = useState("");
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const buscarClientes = () => {
    setLoading(true);
    fetch("http://localhost:5000/clientes/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => {
        console.error("Erro:", err);
        setClientes([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    buscarClientes();
  }, []);

  // Filtrar clientes por CPF
  const clientesFiltrados = clientes.filter((cliente) =>
    cliente.cpf.replace(/\D/g, "").includes(buscaCpf.replace(/\D/g, ""))
  );
  const confirmarExclusao = (cliente) => {
    setClienteParaExcluir(cliente);
    setMostrarModal(true);
  };

  const excluirCliente = () => {
    if (!clienteParaExcluir) return;

    fetch(`http://localhost:5000/clientes/clientes/${clienteParaExcluir.cpf}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setClientes(clientes.filter((c) => c.cpf !== clienteParaExcluir.cpf));
        } else {
          alert("Erro ao excluir cliente.");
        }
      })
      .catch((err) => {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir cliente.");
      })
      .finally(() => {
        setMostrarModal(false);
        setClienteParaExcluir(null);
      });
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
              <button onClick={excluirCliente} className="confirmar">
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
            <h1>Clientes</h1>
            <p>Clientes cadastrados</p>
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
            <Link to="/clientes/novo">
              <button className="novo-cliente-btn">Novo cliente</button>
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
            <p className="mensagem">Carregando clientes...</p>
          ) : clientesFiltrados.length === 0 ? (
            <p className="mensagem">Nenhum cliente encontrado.</p>
          ) : (
            clientesFiltrados.map((cliente) => (
              <div className="linha-cliente" key={cliente.id}>
                <span>{cliente.nome}</span>
                <span>{cliente.cpf}</span>
                <span>{cliente.telefone}</span>
                <span>{cliente.email}</span>
                <div className="acoes">
                  <Link to={`/clientes/editar/${cliente.cpf}`}>
                    <button className="acao editar">Editar</button>
                  </Link>
                  <Link to={`/clientes/${cliente.cpf}/historico`}>
                    <button className="acao editar">
                      Visualizar Histórico
                    </button>
                  </Link>

                  <button
                    className="acao excluir"
                    onClick={() => confirmarExclusao(cliente)}
                  >
                    Excluir Cliente
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

export default Clientes;
