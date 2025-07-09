import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Clientes.css";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/clientes/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => {
        console.error("Erro:", err);
        setClientes([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="gestao-clientes">
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
          <div className="avatar">
            <img className="image-107" src="image-107.png" alt="avatar" />
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
              <input type="text" placeholder="Pesquisar..." />
              <img src="/search.png" alt="Buscar" />
            </div>
            <button className="novo-cliente-btn">Novo cliente</button>
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
          ) : clientes.length === 0 ? (
            <p className="mensagem">Nenhum cliente cadastrado.</p>
          ) : (
            clientes.map((cliente) => (
              <div className="linha-cliente" key={cliente.id}>
                <span>{cliente.nome}</span>
                <span>{cliente.cpf}</span>
                <span>{cliente.telefone}</span>
                <span>{cliente.email}</span>
                <div className="acoes">
                  <button className="acao editar">Editar</button>
                  <button className="acao historico">
                    Visualizar Histórico
                  </button>
                  <button className="acao excluir">Excluir Cliente</button>
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
