import { useEffect, useState } from "react";
import api from "../api/api";

function TesteAPI() {
  const [mensagem, setMensagem] = useState("Testando conexão...");

  useEffect(() => {
    api
      .get("/clientes/clientes") // ou outro endpoint real do seu backend
      .then((res) => {
        setMensagem("✅ Backend conectado com sucesso!");
        console.log(res.data);
      })
      .catch((err) => {
        setMensagem("❌ Erro ao conectar com o backend");
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Teste de Conexão com o Backend</h1>
      <p>{mensagem}</p>
    </div>
  );
}

export default TesteAPI;
