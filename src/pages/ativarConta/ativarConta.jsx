import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AtivarConta.css";
import { Footer } from "../../components/Footer/footer.jsx";
import { Navbar } from "../../components/Navbar/navbar.jsx";

export function AtivarConta() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem("");

    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("token", token);
      const response = await fetch("http://localhost:8080/cliente/ativarConta", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString()
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao ativar conta");
      }

      setMensagem("Conta ativada com sucesso! Redirecionando para login...");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      setMensagem(error.message || "Erro ao ativar conta. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="ativar-conta-container">
        <div className="ativar-conta-card">
          <h2>Ativar Conta</h2>
          <p>Insira o token recebido por email e seu endereço de email para ativar sua conta.</p>

          <form onSubmit={handleSubmit}>
            {mensagem && (
              <div className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>{mensagem}</div>
            )}

            <div className="campo">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Seu email cadastrado"
              />
            </div>

            <div className="campo">
              <label>Token de Ativação</label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                placeholder="Token recebido por email"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Ativando..." : "Ativar Conta"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
