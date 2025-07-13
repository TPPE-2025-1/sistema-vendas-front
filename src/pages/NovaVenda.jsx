import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/NovaVenda.css";

function NovaVenda({ onSuccess }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    data: "",
    cliente_cpf: "",
    vendedor_cpf: "",
    produto_id: "",
    quantidade: "",
  });

  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [produtos, setProdutos] = useState([]);

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Buscar dados ao carregar
  useEffect(() => {
    fetch("http://localhost:5000/clientes/clientes")
      .then((res) => res.json())
      .then(setClientes)
      .catch(() => setErro("Erro ao carregar clientes"));

    fetch("http://localhost:5000/vendedores/vendedores")
      .then((res) => res.json())
      .then(setVendedores)
      .catch(() => setErro("Erro ao carregar vendedores"));

    fetch("http://localhost:5000/produtos/produtos")
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() => setErro("Erro ao carregar produtos"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErro("");
    setSucesso("");
  };

  const validarFormulario = () => {
    if (!form.data) return "A data da venda é obrigatória.";
    if (!form.cliente_cpf) return "Selecione um cliente.";
    if (!form.vendedor_cpf) return "Selecione um vendedor.";
    if (!form.produto_id) return "Selecione um produto.";
    if (!form.quantidade || Number(form.quantidade) <= 0)
      return "A quantidade deve ser maior que zero.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroValidacao = validarFormulario();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    const dataParaEnviar = {
      data: form.data,
      cliente_cpf: form.cliente_cpf,
      vendedor_cpf: form.vendedor_cpf,
      produto_id: Number(form.produto_id),
      quantidade: Number(form.quantidade),
    };

    fetch("http://localhost:5000/vendas/vendas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataParaEnviar),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar venda");
        return res.json();
      })
      .then(() => {
        setSucesso("Venda cadastrada com sucesso!");
        setTimeout(() => {
          navigate("/vendas");
        }, 1000);
      })
      .catch(() => setErro("Erro ao cadastrar venda."));
  };

  return (
    <div className="nova-venda">
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

      <div className="cadastrar-nova-venda">Cadastrar Nova Venda</div>

      <form onSubmit={handleSubmit}>
        <div className="frame-174">
          <div className="group-225">
            <label className="label">Data</label>
            <input
              className="input"
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
            />
          </div>

          <div className="group-227">
            <label className="label">Cliente (CPF)</label>
            <select
              className="input"
              name="cliente_cpf"
              value={form.cliente_cpf}
              onChange={handleChange}
            >
              <option value="">Selecione um cliente</option>
              {clientes.map((c) => (
                <option key={c.cpf} value={c.cpf}>
                  {c.nome} - {c.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="group-228">
            <label className="label">Vendedor (CPF)</label>
            <select
              className="input"
              name="vendedor_cpf"
              value={form.vendedor_cpf}
              onChange={handleChange}
            >
              <option value="">Selecione um vendedor</option>
              {vendedores.map((v) => (
                <option key={v.cpf} value={v.cpf}>
                  {v.nome} - {v.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="group-229">
            <label className="label">Produto</label>
            <select
              className="input"
              name="produto_id"
              value={form.produto_id}
              onChange={handleChange}
            >
              <option value="">Selecione um produto</option>
              {produtos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - ID: {p.id}
                </option>
              ))}
            </select>
          </div>

          <div className="group-230">
            <label className="label">Quantidade</label>
            <input
              className="input"
              type="number"
              name="quantidade"
              value={form.quantidade}
              onChange={handleChange}
              min={1}
            />
          </div>

          {erro && <div className="mensagem-erro">{erro}</div>}
          {sucesso && <div className="mensagem-sucesso">{sucesso}</div>}

          <div className="botoes-container">
            <div className="cadastrar-butao2">
              <button
                type="button"
                className="cancelar"
                onClick={() => navigate("/vendedores")}
              >
                Cancelar
              </button>
            </div>

            <div className="cadastrar-butao">
              <button type="submit" className="cadastrar-vendedor">
                Cadastrar Vendedor
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default NovaVenda;
