import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import { CardProduto } from "../../components/CardProduto/cardproduto.jsx";
import { BarraPesquisa } from "../../components/BarraPesquisa/barrapesquisa.jsx";
import ApiService from "../../services/api.js";

export function Homepage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🚀 Homepage carregada, iniciando busca de dados...");

    const carregarDados = async () => {
      try {
        setLoading(true);
        console.log("📊 Carregando produtos e categorias...");

        const [produtosData, categoriasData] = await Promise.all([
          ApiService.getProdutos(),
          ApiService.getCategorias(),
        ]);

        console.log("✅ Produtos carregados:", produtosData);
        console.log("✅ Categorias carregadas:", categoriasData);

        setProdutos(produtosData || []);
        setCategorias(categoriasData || []);
      } catch (err) {
        console.error("❌ Erro ao carregar dados:", err);
        setError("Erro ao carregar produtos: " + err.message);
      } finally {
        setLoading(false);
        console.log("🏁 Carregamento finalizado");
      }
    };

    carregarDados();
  }, []);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.name?.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao?.toLowerCase().includes(busca.toLowerCase())
  );

  const formatarPreco = (produto) => {
    if (
      produto.precoPromocional &&
      produto.precoPromocional !== produto.preco
    ) {
      return produto.precoPromocional.toFixed(2);
    }
    return produto.preco?.toFixed(2) || "0.00";
  };

  const handleAdicionarProduto = (produto) => {
    console.log("🛒 Produto adicionado:", produto);
    alert(`Produto "${produto.name}" adicionado ao carrinho!`);
  };

  console.log("🔍 Estado atual:", {
    loading,
    error,
    produtos: produtos.length,
    categorias: categorias.length,
  });

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>
            <h2>Carregando produtos...</h2>
            <p>Aguarde um momento</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.error}>
            <h2>Ops! Algo deu errado</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className={styles.btnRecarregar}
            >
              Tentar novamente
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.titulo}>Nossa Lojinha</h1>
        <p className={styles.subtitulo}>
          Encontre os melhores produtos com os melhores preços!
        </p>

        <BarraPesquisa onPesquisar={setBusca} />

        {busca && (
          <div className={styles.resultadoPesquisa}>
            <p>
              {produtosFiltrados.length > 0
                ? `${produtosFiltrados.length} produto(s) encontrado(s) para "${busca}"`
                : `Nenhum produto encontrado para "${busca}"`}
            </p>
          </div>
        )}

        <div className={styles.gridProdutos}>
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map((produto) => (
              <CardProduto
                key={produto.id}
                imagem={ApiService.getFotoProduto(produto.id)}
                nome={produto.name}
                descricao={produto.descricao}
                preco={formatarPreco(produto)}
                onAdicionar={() => handleAdicionarProduto(produto)}
              />
            ))
          ) : (
            <div className={styles.semProdutos}>
              <h3>Nenhum produto disponível no momento</h3>
              <p>Volte em breve para conferir nossas novidades!</p>
              <p>
                <small>
                  Debug: {produtos.length} produtos carregados
                </small>
              </p>
            </div>
          )}
        </div>

        {produtos.length > 0 && (
          <div className={styles.estatisticas}>
            <p>
              Exibindo {produtosFiltrados.length} de {produtos.length} produtos
            </p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
