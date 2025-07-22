import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NovoProduto.css";

function NovoProduto({ onSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "preco") {
      const raw = value.replace(/\D/g, "");
      const formatado = (Number(raw) / 100)
        .toFixed(2)
        .replace(".", ",")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setForm((prev) => ({ ...prev, preco: formatado }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }

    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    if (!form.nome.trim()) return "O nome é obrigatório.";

    const precoNumerico = parseFloat(
      form.preco.replace(/\./g, "").replace(",", ".")
    );
    if (isNaN(precoNumerico) || precoNumerico <= 0) return "Preço inválido.";

    const estoqueNumerico = parseInt(form.estoque);
    if (isNaN(estoqueNumerico) || estoqueNumerico < 0)
      return "Estoque inválido.";

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const precoNumerico = parseFloat(
      form.preco.replace(/\./g, "").replace(",", ".")
    );

    const produtoData = {
      nome: form.nome,
      preco: precoNumerico,
      estoque: parseInt(form.estoque),
    };

    fetch("https://sistema-vendas-back.onrender.com/produtos/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar produto");
        return res.json();
      })
      .then(() => {
        setSucesso("Produto cadastrado com sucesso!");
        if (onSuccess) onSuccess(); // Agora usamos o onSuccess se vier por props
        setTimeout(() => {
          navigate("/produtos");
        }, 1000);
      })
      .catch(() => {
        setErro("Erro ao cadastrar produto. Tente novamente.");
      });
  };

  return (
    <div className="novo-vendedor">
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

      <div className="cadastrar-novo-vendedor">Cadastrar Novo Produto</div>

      <form onSubmit={handleSubmit}>
        <div className="frame-174">
          <div className="group-225">
            <label className="nome">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              placeholder="Insira o nome do produto"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="group-228">
            <label className="telefone">Preço</label>
            <input
              className="input"
              type="text"
              name="preco"
              placeholder="R$ 0,00"
              value={`R$ ${form.preco}`}
              onChange={handleChange}
            />
          </div>

          <div className="group-229">
            <label className="email">Estoque</label>
            <input
              className="input"
              type="text"
              name="estoque"
              placeholder="0"
              value={form.estoque}
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
                onClick={() => navigate("/produtos")}
              >
                Cancelar
              </button>
            </div>

            <div className="cadastrar-butao">
              <button type="submit" className="cadastrar-vendedor">
                Cadastrar Produto
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NovoProduto;
