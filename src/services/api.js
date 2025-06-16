import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const localApi = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptors para debug
localApi.interceptors.request.use(request => {
  console.log('🚀 Fazendo requisição para:', request.url);
  return request;
});

localApi.interceptors.response.use(
  response => {
    console.log('✅ Resposta recebida:', response.status);
    return response;
  },
  error => {
    console.error('❌ Erro na requisição:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

class ApiService {
  static async get(endpoint) {
    console.log(`🔄 Fazendo requisição para: ${API_BASE_URL}${endpoint}`);

    try {
      const response = await localApi.get(endpoint); // Usando localApi
      console.log(`✅ Dados recebidos:`, response.data);
      return response.data;
    } catch (error) {
      console.error(`❌ Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  // Produtos
  static async getProdutos() {
    return this.get("/produtos"); // Removido duplicação
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
    return this.get("/categorias"); // Removido duplicação
  }

  // Login
  static async login(email, senha) {
    try {
      console.log('🔑 Tentando fazer login...');
      
      const params = new URLSearchParams();
      params.append("email", email);
      params.append("senha", senha);

      const response = await localApi.post("/login", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = response.data;
      console.log('✅ Login realizado com sucesso');
      return token;
    } catch (error) {
      console.error('❌ Erro no login:', error);
      throw new Error("Usuário ou senha inválidos");
    }
  }

  // ADICIONADO: Usuário logado
  static async getUsuarioLogado() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    try {
      const response = await localApi.get("/cliente/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar usuário logado:", error);
      throw error;
    }
  }

  // ADICIONADO: Atualizar usuário
  static async atualizarUsuario(dados) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    try {
      const response = await localApi.patch("/cliente/atualizacaoParcial", dados, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  // ADICIONADO: Atualizar endereço por CEP
  static async atualizarEnderecoCep(enderecoUpdateDto) {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    try {
      const response = await localApi.patch("/cliente/endereco", enderecoUpdateDto, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar endereço:", error);
      throw error;
    }
  }

  // ADICIONADO: Buscar cliente atual
  static async buscarClienteAtual() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    try {
      const response = await localApi.get("/cliente/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados atualizados:", error);
      throw error;
    }
  }

  // ADICIONADO: Deletar usuário logado
  static async deletarUsuarioLogado() {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token não encontrado");

    try {
      const response = await localApi.delete("/cliente/delete", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  }
}

export default ApiService;
