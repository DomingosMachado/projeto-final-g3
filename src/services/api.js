const API_BASE_URL = 'http://localhost:8080';

class ApiService {
  static async get(endpoint) {
    console.log(`🔄 Fazendo requisição para: ${API_BASE_URL}${endpoint}`);
    
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
    return this.get('/produtos');
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
    return this.get('/categorias');
  }
}

export default ApiService;
