import React, { useState, useEffect } from "react";
import styles from "./modalAlteracao.module.css";
import ApiService from "../../../services/api"; 
const API_BASE_URL = "http://localhost:8080";

export const ModalAlteracao = ({
  usuarioLogado,
  fecharModal,
  atualizarUsuario,
}) => {
  // Estados para dados pessoais e endereço
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: "",
    telefone: "",
    email: "",
  });

  const [endereco, setEndereco] = useState({
    cep: "",
    rua: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
  });

  const [erros, setErros] = useState({});
  const [mensagem, setMensagem] = useState("");
  const [loadingCep, setLoadingCep] = useState(false);
  const [loading, setLoading] = useState(false);

  // Quando usuarioLogado mudar, atualizar os estados
  useEffect(() => {
    if (usuarioLogado) {
      setDadosPessoais({
        nome: usuarioLogado.nome || "",
        telefone: usuarioLogado.telefone || "",
        email: usuarioLogado.email || "",
      });

      setEndereco({
        cep: usuarioLogado.cep || "",
        rua: usuarioLogado.logradouro || "", // corrigido: "logradouro" para "rua"
        bairro: usuarioLogado.bairro || "",
        cidade: usuarioLogado.cidade || "",
        estado: usuarioLogado.estado || "",
        numero: usuarioLogado.numero || "",
      });
    }
  }, [usuarioLogado]);

  // Buscar endereço automaticamente quando cep válido for digitado
  useEffect(() => {
    const cepLimpo = endereco.cep.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarEnderecoPorCep();
    }
  }, [endereco.cep]);

  async function buscarEnderecoPorCep() {
    const cepLimpo = endereco.cep.replace(/\D/g, "");
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await res.json();

      if (data.erro) {
        setErros((prev) => ({ ...prev, cep: "CEP não encontrado" }));
        return;
      }

      // Aplicar os dados no estado
      setEndereco((prev) => ({
        ...prev,
        rua: data.logradouro || "",
        bairro: data.bairro || "",
        cidade: data.localidade || "",
        estado: data.uf || "",
      }));

      setErros((prev) => ({ ...prev, cep: "" }));
    } catch {
      setErros((prev) => ({ ...prev, cep: "Erro ao buscar CEP" }));
    } finally {
      setLoadingCep(false);
    }
  }

  function validarFormulario() {
    const novosErros = {};

    if (!dadosPessoais.nome.trim()) novosErros.nome = "Nome é obrigatório";

    if (!dadosPessoais.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      novosErros.email = "Email inválido";

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(dadosPessoais.telefone)) {
      novosErros.telefone = "Telefone deve estar no formato (xx) xxxxx-xxxx";
    }

    // Validação do CEP no formato 12345-678
    if (!/^\d{5}-\d{3}$/.test(endereco.cep)) {
      novosErros.cep = "CEP deve estar no formato 12345-678";
    }

    if (!endereco.rua.trim()) novosErros.rua = "Logradouro é obrigatório";

    if (!endereco.numero.trim()) novosErros.numero = "Número é obrigatório";

    setErros(novosErros);

    return Object.keys(novosErros).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensagem("");
    setLoading(true);

    if (!validarFormulario()) {
      setLoading(false);
      return;
    }

    try {
      const dadosParaAtualizar = {
        nome: dadosPessoais.nome,
        email: dadosPessoais.email,
        telefone: dadosPessoais.telefone,
        endereco: {
          cep: endereco.cep,
          rua: endereco.rua,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          numero: endereco.numero,
        },
      };

      const token = localStorage.getItem("token");

      // Requisição PATCH para atualizar parcialmente o cliente
      const response = await fetch(
        `${API_BASE_URL}/cliente/atualizacaoParcial`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dadosParaAtualizar),
        }
      );

      if (!response.ok) {
        const erro = await response.json();
        setMensagem(
          "Erro ao atualizar: " + (erro.message || "Erro desconhecido")
        );
        setLoading(false);
        return;
      }

      // Após o PATCH bem sucedido, buscar os dados atualizados do cliente
      const respostaMe = await fetch(`${API_BASE_URL}/cliente/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!respostaMe.ok) {
        setMensagem("Erro ao buscar dados atualizados.");
        setLoading(false);
        return;
      }

      const dadosAtualizados = await respostaMe.json();

      // Atualizar estado no componente pai para refletir as mudanças
      atualizarUsuario(dadosAtualizados);

      setMensagem("Perfil atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      setMensagem("Erro ao atualizar perfil. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function handleChangeDados(e) {
    const { name, value } = e.target;
    setDadosPessoais((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeEndereco(e) {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className={styles.overlay} onClick={fecharModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <h2>Atualizar Perfil</h2>

          <div>
            <label>Nome:</label>
            <input
              name="nome"
              value={dadosPessoais.nome || ""}
              onChange={handleChangeDados}
            />
            {erros.nome && <span style={{ color: "red" }}>{erros.nome}</span>}
          </div>

          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={dadosPessoais.email || ""}
              onChange={handleChangeDados}
            />
            {erros.email && <span style={{ color: "red" }}>{erros.email}</span>}
          </div>

          <div>
            <label>Telefone:</label>
            <input
              name="telefone"
              value={dadosPessoais.telefone || ""}
              onChange={handleChangeDados}
            />
            {erros.telefone && (
              <span style={{ color: "red" }}>{erros.telefone}</span>
            )}
          </div>

          <hr />

          <div>
            <label>CEP:</label>
            <input
              name="cep"
              value={endereco.cep || ""}
              onChange={handleChangeEndereco}
            />
            {erros.cep && <span style={{ color: "red" }}>{erros.cep}</span>}
            {loadingCep && <small>Buscando endereço...</small>}
          </div>

          <div>
            <label>Logradouro (Rua):</label>
            <input
              name="rua"
              value={endereco.rua || ""}
              onChange={handleChangeEndereco}
            />
            {erros.rua && <span style={{ color: "red" }}>{erros.rua}</span>}
          </div>

          <div>
            <label>Bairro:</label>
            <input
              name="bairro"
              value={endereco.bairro || ""}
              onChange={handleChangeEndereco}
            />
          </div>

          <div>
            <label>Cidade:</label>
            <input
              name="cidade"
              value={endereco.cidade || ""}
              onChange={handleChangeEndereco}
            />
          </div>

          <div>
            <label>Estado (UF):</label>
            <input
              name="estado"
              value={endereco.estado || ""}
              onChange={handleChangeEndereco}
            />
          </div>

          <div>
            <label>Número:</label>
            <input
              name="numero"
              value={endereco.numero || ""}
              onChange={handleChangeEndereco}
            />
            {erros.numero && (
              <span style={{ color: "red" }}>{erros.numero}</span>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar Perfil"}
          </button>

          {mensagem && <p>{mensagem}</p>}
        </form>
        <button onClick={fecharModal}>Fechar</button>
      </div>
    </div>
  );
};
