import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
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

      {/* BOTÕES DE GESTÃO */}
      <div className="frame-624992">
        <Link to="/vendas" className="frame-624988 gestao-botao">
          Gestão de Vendas
        </Link>
        <Link to="/clientes" className="frame-624989 gestao-botao">
          Gestão de Clientes
        </Link>
        <Link to="/vendedores" className="frame-624990 gestao-botao">
          Gestão de Vendedores
        </Link>
        <Link to="/produtos" className="frame-624991 gestao-botao">
          Gestão de Produtos
        </Link>
      </div>

      <div className="dermatology-skin-c">Painel de Acesso</div>
      <div className="mask"></div>
      <div className="mask"></div>
      <img
        className="sl-071322-51620-01"
        src="sl-071322-51620-010.png"
        alt="banner"
      />

      <div className="frame-624994">
        <div className="frame-624993">
          <div className="dermatology-skin-c2">Ana Scent</div>
          <div className="treating-all-skin-co">
            Organize suas vendas e produtos com facilidade. Use o menu para
            acessar as funcionalidades do sistema.
          </div>
        </div>

        {/* BOTÃO DE CADASTRAR NOVA VENDA */}
        <Link to="/vendas/nova" className="frame-6249922 cadastro-botao">
          Cadastrar nova venda
        </Link>
      </div>
    </div>
  );
};

export default Home;
