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

  // Novo método para buscar usuário logado
  static async getUsuarioLogado() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    try {
      console.log("🔑 Buscando usuário logado com token:", token);

      const response = await localApi.get("/cliente/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Dados do usuário recebidos:", response.data);
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao buscar usuário logado:", error);
      throw error;
    }
  }

  // Novo método para deletar usuário logado
  static async deletarUsuarioLogado() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    try {
      const response = await localApi.delete("/cliente/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("❌ Erro ao deletar usuário:", error);
      throw error;
    }
  }
}
export default ApiService;
