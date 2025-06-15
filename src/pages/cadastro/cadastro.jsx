import React, { useState, useEffect } from "react";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import "./cadastro.css";
import { Link, useNavigate } from "react-router-dom";
// cpf cadastrado igual nao da erro 
export function Cadastro() {
  const navigate = useNavigate();
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    telefone: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    numero: "",
  });

  const [erros, setErros] = useState({
    nome: "",
    cpf: "",
    dataDeNascimento: "",
    telefone: "",
    email: "",
    senha: "",
    confirmaSenha: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    localidade: "",
    uf: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  useEffect(() => {
    if (endereco.cep.replace(/\D/g, "").length === 8) {
      buscarEnderecoPorCep();
    }
  }, [endereco.cep]);

  const buscarEnderecoPorCep = async () => {
    const cepLimpo = endereco.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErros((prev) => ({ ...prev, cep: "CEP não encontrado" }));
        return;
      }

      setEndereco((prev) => ({
        ...prev,
        logradouro: data.logradouro || "",
        bairro: data.bairro || "",
        localidade: data.localidade || "",
        uf: data.uf || "",
        complemento: data.complemento || prev.complemento,
      }));

      setErros((prev) => ({ ...prev, cep: "" }));
    } catch (error) {
      setErros((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }));
      console.error("Erro na busca do CEP:", error);
    } finally {
      setLoadingCep(false);
    }
  };

  const formatarCampo = (name, value) => {
    const apenasNumeros = value.replace(/\D/g, "");

    if (name === "cpf") {
      if (apenasNumeros.length <= 3) return apenasNumeros;
      if (apenasNumeros.length <= 6) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
      if (apenasNumeros.length <= 9)
        return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(
        6,
        9
      )}-${apenasNumeros.slice(9, 11)}`;
    }

    if (name === "telefone") {
      if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
      if (apenasNumeros.length <= 6) return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
      if (apenasNumeros.length <= 10)
        return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
    }

    if (name === "cep") {
      if (apenasNumeros.length <= 5) return apenasNumeros;
      return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
    }

    return value;
  };

  const validarSenha = (senha) => {
    if (senha.length < 8) {
      return "A senha deve ter no mínimo 8 caracteres";
    }

    if (!/[A-Z]/.test(senha)) {
      return "A senha deve conter pelo menos 1 letra maiúscula";
    }

    if (!/[a-z]/.test(senha)) {
      return "A senha deve conter pelo menos 1 letra minúscula";
    }

    if (!/[0-9]/.test(senha)) {
      return "A senha deve conter pelo menos 1 número";
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      return "A senha deve conter pelo menos 1 caractere especial";
    }

    return "";
  };

  const handleDadosChange = (e) => {
    const { name, value } = e.target;
    setDadosPessoais((prev) => ({
      ...prev,
      [name]: formatarCampo(name, value),
    }));

    // Validação em tempo real
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErros((prev) => ({
        ...prev,
        email: emailRegex.test(value) ? "" : "Email inválido",
      }));
    }

    if (name === "confirmaSenha") {
      setErros((prev) => ({
        ...prev,
        confirmaSenha: value === dadosPessoais.senha ? "" : "As senhas não coincidem",
      }));
    }

    if (name === "senha") {
      const erroSenha = validarSenha(value);
      setErros((prev) => ({
        ...prev,
        senha: erroSenha,
        confirmaSenha: value === dadosPessoais.confirmaSenha ? "" : "As senhas não coincidem",
      }));
    }
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({
      ...prev,
      [name]: formatarCampo(name, value),
    }));
  };

  const validarFormulario = () => {
    let valido = true;
    const novosErros = { ...erros };

    // Validação do nome
    if (!dadosPessoais.nome.trim()) {
      novosErros.nome = "Nome completo é obrigatório";
      valido = false;
    } else {
      novosErros.nome = "";
    }

    // Validação do CPF
    const cpfLimpo = dadosPessoais.cpf.replace(/\D/g, "");
    if (cpfLimpo.length !== 11) {
      novosErros.cpf = "CPF inválido (deve ter 11 dígitos)";
      valido = false;
    } else {
      novosErros.cpf = "";
    }

    // Validação da data de nascimento
    const hoje = new Date();
    const nascimento = new Date(dadosPessoais.dataDeNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();

    if (!dadosPessoais.dataDeNascimento) {
      novosErros.dataDeNascimento = "Data de nascimento é obrigatória";
      valido = false;
    } else {
      novosErros.dataDeNascimento = "";
    }

    // Validação do telefone
    const telefoneLimpo = dadosPessoais.telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      novosErros.telefone = "Telefone inválido";
      valido = false;
    } else {
      novosErros.telefone = "";
    }

    // Validação do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosPessoais.email)) {
      novosErros.email = "Email inválido";
      valido = false;
    } else {
      novosErros.email = "";
    }

    // Validação da senha
    novosErros.senha = validarSenha(dadosPessoais.senha);
    if (novosErros.senha) {
      valido = false;
    }

    // Validação da confirmação de senha
    if (dadosPessoais.senha !== dadosPessoais.confirmaSenha) {
      novosErros.confirmaSenha = "As senhas não coincidem";
      valido = false;
    } else {
      novosErros.confirmaSenha = "";
    }

    // Validação do CEP
    const cepLimpo = endereco.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
      novosErros.cep = "CEP inválido";
      valido = false;
    } else {
      novosErros.cep = "";
    }

    // Validação do número
    if (!endereco.numero.trim()) {
      novosErros.numero = "Número é obrigatório";
      valido = false;
    } else {
      novosErros.numero = "";
    }

    setErros(novosErros);
    return valido;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setMensagem("");
  setLoading(true);
  setErros({ ...erros, cpf: "" });

  if (!validarFormulario()) {
    setLoading(false);
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/cliente/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dadosPessoais, ...endereco }),
    });

    let errorText = "";
    let data = {};

    if (!response.ok) {
      // Tenta ler como JSON, se falhar, lê como texto puro
      try {
        data = await response.json();
        errorText = data.message || JSON.stringify(data);
      } catch {
        errorText = await response.text();
      }

      // Procura por CPF duplicado em qualquer mensagem
      if (
        errorText.toLowerCase().includes("cpf") 
        
      ) {
        setErros((prev) => ({
          ...prev,
          cpf: "Este CPF já está cadastrado.",
        }));
        setMensagem(""); // Limpa mensagem geral
      } else {
        setMensagem("Erro ao cadastrar: " + errorText);
      }
      setLoading(false);
      return;
    }

    setMensagem("Cadastro realizado com sucesso! Verifique seu e-mail.");
    // Redirecionar ou limpar formulário se desejar
    navigate("../ativarConta");
  } catch (error) {
    setMensagem("Erro ao cadastrar. Tente novamente.");
  } finally {
    setLoading(false);
  }
};

  return (

    //Transformando o componente Cadastro em proximo componente para endereço 
    <>
      <Navbar />
      <main className="cadastro-container">
        <form onSubmit={handleSubmit} className="form-dados-pessoais">
          <h2>Cadastro</h2>

          {mensagem && (
            <div className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>{mensagem}</div>
          )}

          <div className="campo">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={dadosPessoais.nome}
              onChange={handleDadosChange}
              className={erros.nome ? "erro-input" : ""}
              required
            />
            {erros.nome && <span className="erro-mensagem">{erros.nome}</span>}
          </div>

          <div className="campo">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={dadosPessoais.cpf}
              onChange={handleDadosChange}
              maxLength="14"
              placeholder="000.000.000-00"
              className={erros.cpf ? "erro-input" : ""}
              required
            />
            {erros.cpf && <span className="erro-mensagem">{erros.cpf}</span>}
          </div>

          <div className="campo">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataDeNascimento"
              value={dadosPessoais.dataDeNascimento}
              onChange={handleDadosChange}
              className={erros.dataDeNascimento ? "erro-input" : ""}
              required
            />
            {erros.dataDeNascimento && <span className="erro-mensagem">{erros.dataDeNascimento}</span>}
          </div>

          <div className="campo">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={dadosPessoais.telefone}
              onChange={handleDadosChange}
              maxLength="15"
              placeholder="(00) 00000-0000"
              className={erros.telefone ? "erro-input" : ""}
              required
            />
            {erros.telefone && <span className="erro-mensagem">{erros.telefone}</span>}
          </div>

          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={dadosPessoais.email}
              onChange={handleDadosChange}
              className={erros.email ? "erro-input" : ""}
              required
            />
            {erros.email && <span className="erro-mensagem">{erros.email}</span>}
          </div>

          <div className="campo">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={dadosPessoais.senha}
              onChange={handleDadosChange}
              className={erros.senha ? "erro-input" : ""}
              required
            />
            {erros.senha && <span className="erro-mensagem">{erros.senha}</span>}
          </div>

          <div className="campo">
            <label>Confirme a Senha</label>
            <input
              type="password"
              name="confirmaSenha"
              value={dadosPessoais.confirmaSenha}
              onChange={handleDadosChange}
              className={erros.confirmaSenha ? "erro-input" : ""}
              required
            />
            {erros.confirmaSenha && <span className="erro-mensagem">{erros.confirmaSenha}</span>}
          </div>

          <button type="submit" disabled={loading} className="botao-cadastrar">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <div className="login-link">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
          <div className="ativar-conta-link">
            <Link to="/ativarConta" style={{ margin: "auto", display: "block", textAlign: "center", fontSize: "0.8rem", color: "#4f46e5", fontWeight: "bold", textDecoration: "none" }}>Ative sua conta</Link>
          </div>
        </form>

        <form className="form-endereco">
          <h2>Endereço</h2>

          <div className="campo">
            <label>CEP {loadingCep && <span className="loading">(Buscando...)</span>}</label>
            <input
              type="text"
              name="cep"
              value={endereco.cep}
              onChange={handleEnderecoChange}
              maxLength="9"
              placeholder="00000-000"
              className={erros.cep ? "erro-input" : ""}
              required
            />
            {erros.cep && <span className="erro-mensagem">{erros.cep}</span>}
          </div>

          <div className="campo">
            <label>Logradouro</label>
            <input
              type="text"
              name="logradouro"
              value={endereco.logradouro}
              onChange={handleEnderecoChange}
              className={erros.logradouro ? "erro-input" : ""}
              required
              readOnly={!!endereco.logradouro}
            />
            {erros.logradouro && <span className="erro-mensagem">{erros.logradouro}</span>}
          </div>

          <div className="campo">
            <label>Número</label>
            <input
              type="text"
              name="numero"
              value={endereco.numero}
              onChange={handleEnderecoChange}
              className={erros.numero ? "erro-input" : ""}
              required
            />
            {erros.numero && <span className="erro-mensagem">{erros.numero}</span>}
          </div>

          <div className="campo">
            <label>Complemento</label>
            <input type="text" name="complemento" value={endereco.complemento} onChange={handleEnderecoChange} />
          </div>

          <div className="campo">
            <label>Bairro</label>
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={handleEnderecoChange}
              className={erros.bairro ? "erro-input" : ""}
              required
              readOnly={!!endereco.bairro}
            />
            {erros.bairro && <span className="erro-mensagem">{erros.bairro}</span>}
          </div>

          <div className="campo-dupla">
            <div className="campo">
              <label>Cidade</label>
              <input
                type="text"
                name="localidade"
                value={endereco.localidade}
                onChange={handleEnderecoChange}
                className={erros.localidade ? "erro-input" : ""}
                required
                readOnly={!!endereco.localidade}
              />
              {erros.localidade && <span className="erro-mensagem">{erros.localidade}</span>}
            </div>

            <div className="campo">
              <label>UF</label>
              <input
                type="text"
                name="uf"
                value={endereco.uf}
                onChange={handleEnderecoChange}
                maxLength="2"
                className={erros.uf ? "erro-input" : ""}
                required
                readOnly={!!endereco.uf}
              />
              {erros.uf && <span className="erro-mensagem">{erros.uf}</span>}
            </div>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
