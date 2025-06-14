// Teste rápido da API
console.log("🧪 Testando API...");

const API_BASE_URL = "http://localhost:8080";

async function testarAPI() {
  try {
    console.log("📡 Testando conexão com backend...");

    // Teste 1: Produtos
    try {
      const response = await fetch(`${API_BASE_URL}/api/produtos`);
      if (response.ok) {
        const produtos = await response.json();
        console.log("✅ Produtos carregados:", produtos.length);
      } else {
        console.error("❌ Erro ao buscar produtos:", response.status);
      }
    } catch (err) {
      console.error("❌ Erro de conexão com produtos:", err.message);
    }

    // Teste 2: Categorias
    try {
      const response = await fetch(`${API_BASE_URL}/api/categorias`);
      if (response.ok) {
        const categorias = await response.json();
        console.log("✅ Categorias carregadas:", categorias.length);
      } else {
        console.error("❌ Erro ao buscar categorias:", response.status);
      }
    } catch (err) {
      console.error("❌ Erro de conexão com categorias:", err.message);
    }
  } catch (error) {
    console.error("❌ Erro geral:", error);
  }
}

// Executar teste quando página carregar
if (typeof window !== "undefined") {
  window.addEventListener("load", testarAPI);
} else {
  testarAPI();
}
