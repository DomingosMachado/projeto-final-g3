import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const localApi = axios.create({
  baseURL: "http://localhost:8080",
});

class ApiService {
  static async get(endpoint) {
    console.log(`🔄 Fazendo requisição para: ${API_BASE_URL}${endpoint}`);

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(`📡 Resposta da API:`, response.status, response.statusText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ Dados recebidos:`, data);
      return data;
    } catch (error) {
      console.error(`❌ Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  // Produtos
  static async getProdutos() {
    return this.get("/produtos");
    return this.get("/produtos");
  }

  static async getProdutoById(id) {
    return this.get(`/produtos/${id}`);
  }

  static getFotoProduto(id) {
    const fotoUrl = `${API_BASE_URL}/produtos/${id}/foto`;
    console.log(`📸 URL da foto: ${fotoUrl}`);
    return fotoUrl;
  }

  // Categorias
  static async getCategorias() {
    return this.get("/categorias");
    return this.get("/categorias");
  }
  // Login
  static async login(email, senha) {
    try {
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("senha", senha);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const token = await response.text(); // <- pega string diretamente
      return token;
    } catch (error) {
      throw error;
    }
  }
    static async getUsuarioLogado() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(`${API_BASE_URL}/cliente/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao buscar usuário logado");
    }

    const usuario = await response.json();
    return usuario;
  }
 static async atualizarUsuario(dados) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    const response = await fetch(`${API_BASE_URL}/cliente/atualizacaoParcial`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar usuário");
    }

    const usuarioAtualizado = await response.json();
    return usuarioAtualizado;
  }

static async atualizarEnderecoCep(enderecoUpdateDto) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/cliente/endereco`, {  // Sem interpolar objeto na URL
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(enderecoUpdateDto),
  });
}
   atualizarCliente = async (dados, token) => {
  const response = await fetch(`${API_BASE_URL}/cliente/atualizacaoParcial`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao atualizar");
  }

  return response; // se quiser só status, ou .json() se a API retornar algo
};

 buscarClienteAtual = async (token) => {
  const response = await fetch(`${API_BASE_URL}/cliente/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar dados atualizados.");
  }

  return await response.json();
}
static async deletarUsuarioLogado() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token não encontrado");

  const response = await fetch(`${API_BASE_URL}/cliente/delete`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const erro = await response.json();
    throw new Error(erro.message || "Erro ao deletar usuário");
  }

  return await response.text(); // ou json, dependendo do que sua API retornar
}
}
export default ApiService;
