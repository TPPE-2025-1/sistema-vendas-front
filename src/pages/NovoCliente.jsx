import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NovoCliente.css";

function NovoCliente({ onSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const formatarCPF = (cpf) => {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/\D/g, "");
    // Aplica a máscara
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatarTelefone = (telefone) => {
    // Remove caracteres não numéricos
    telefone = telefone.replace(/\D/g, "");
    // Aplica a máscara
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Formata os campos de CPF e telefone automaticamente
    if (name === "cpf") {
      setForm({ ...form, [name]: formatarCPF(value) });
    } else if (name === "telefone") {
      setForm({ ...form, [name]: formatarTelefone(value) });
    } else {
      setForm({ ...form, [name]: value });
    }

    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.nome.trim()) return "O nome é obrigatório.";
    if (form.cpf.replace(/\D/g, "").length !== 11)
      return "CPF inválido. Deve conter 11 dígitos.";
    if (form.telefone.replace(/\D/g, "").length !== 11)
      return "Telefone inválido. Deve conter 11 dígitos.";
    if (!emailRegex.test(form.email))
      return "Email inválido. Inclua um @ válido.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    fetch("http://localhost:5000/clientes/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar cliente");
        return res.json();
      })
      .then(() => {
        setSucesso("Cliente cadastrado com sucesso!");
        setTimeout(() => {
          onSuccess();
        }, 1000);
      })
      .catch(() => {
        setErro("Erro ao cadastrar cliente. Tente novamente.");
      });
  };
  return (
    <div className="novo-cliente">
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

      <div className="cadastrar-novo-cliente">Cadastrar Novo Cliente</div>

      <form onSubmit={handleSubmit}>
        <div className="frame-174">
          <div className="group-225">
            <label className="nome">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              placeholder="Insira o nome completo"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="group-227">
            <label className="cpf-cnpj">CPF</label>
            <input
              className="input"
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={handleChange}
            />
          </div>

          <div className="group-228">
            <label className="telefone">Telefone</label>
            <input
              className="input"
              type="text"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="group-229">
            <label className="email">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="email@exemplo.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          {erro && <div className="mensagem-erro">{erro}</div>}
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}
          <div className="botoes-container">
            <div className="cadastrar-butao2">
              <button
                type="button"
                className="cancelar"
                onClick={() => navigate("/clientes")}
              >
                Cancelar
              </button>
            </div>

            <div className="cadastrar-butao">
              <button type="submit" className="botao-cadastrar-cliente">
                Cadastrar Cliente
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NovoCliente;
