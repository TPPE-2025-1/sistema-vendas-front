import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/EditarProduto.css";

function EditarProduto() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nome: "",
    preco: "",
    estoque: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const formatarMoeda = (valor) => {
    const numericValue = valor.replace(/\D/g, "");
    const floatValue = (parseInt(numericValue, 10) / 100).toFixed(2);
    return "R$ " + floatValue.replace(".", ",");
  };

  const desformatarMoeda = (valorFormatado) => {
    return parseFloat(valorFormatado.replace(/\D/g, "")) / 100;
  };

  useEffect(() => {
    fetch(`http://localhost:5000/produtos/produtos/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao carregar produto");
        return res.json();
      })
      .then((data) =>
        setForm({
          nome: data.nome,
          preco: formatarMoeda(data.preco.toFixed(2)),
          estoque: data.estoque,
        })
      )
      .catch(() => setErro("Erro ao carregar dados do produto."));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "preco") {
      setForm((prev) => ({ ...prev, preco: formatarMoeda(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    if (!form.nome.trim()) return "O nome é obrigatório.";
    if (isNaN(desformatarMoeda(form.preco))) return "Preço inválido.";
    if (!form.estoque || isNaN(form.estoque)) return "Estoque inválido.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    fetch(`http://localhost:5000/produtos/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        preco: desformatarMoeda(form.preco),
        estoque: parseInt(form.estoque, 10),
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar produto");
        return res.json();
      })
      .then(() => {
        setSucesso("Produto atualizado com sucesso!");
        setTimeout(() => {
          navigate("/produtos");
        }, 1000);
      })
      .catch(() => {
        setErro("Erro ao atualizar produto. Tente novamente.");
      });
  };

  return (
    <div className="novo-produto">
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

      <div className="cadastrar-novo-produto">Editar Produto</div>

      <form onSubmit={handleSubmit}>
        <div className="frame-174">
          <div className="group-225">
            <label className="nome">Nome</label>
            <input
              className="input"
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="group-227">
            <label className="preco">Preço</label>
            <input
              className="input"
              type="text"
              name="preco"
              value={form.preco}
              onChange={handleChange}
            />
          </div>

          <div className="group-228">
            <label className="estoque">Estoque</label>
            <input
              className="input"
              type="number"
              name="estoque"
              value={form.estoque}
              onChange={handleChange}
              min="0"
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
              <button type="submit" className="cadastrar-produto">
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditarProduto;
