import React, { useState } from "react";
import "./login.css";
import ApiService from "../../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resposta = await ApiService.login(login, senha);
    const token = resposta.token;
    if (token) {
      localStorage.setItem("token", token); // token no localStorage
      alert("Login realizado com sucesso!");
      navigate("/home");
    } else {
      alert("Token não recebido!");
    }
  } catch (error) {
    alert(error.message || "Erro ao fazer login");
  }
};

  return (
    <div>
      <div className="background"></div>
      <div className="login">
        <h2>Bem vindo ao nosso site!</h2>
        <h3>Digite seu login e senha</h3>
        <form onSubmit={handleSubmit}>
          <div className={`textbox${login ? " filled" : ""}`}>
            <input
              type="text"
              id="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoComplete="username"
              required
            />
            <label htmlFor="login">Login</label>
          </div>
          <div className={`textbox${senha ? " filled" : ""}`}>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
              required
            />
            <label htmlFor="senha">Senha</label>
          </div>
          <button type="submit">Login</button>
        </form>
        <div className="login-links">
          <a href="#" className="criar-conta">
            Criar conta
          </a>
          <span> | </span>
          <a href="#" className="esqueceu-senha">
            Esqueceu a senha?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;