import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import { CarrosselCategoria } from "../../components/CarrosselCategoria/CarrosselCategoria.jsx";
import { BarraPesquisa } from "../../components/BarraPesquisa/barrapesquisa.jsx";
import { CardProduto } from "../../components/CardProduto/cardproduto.jsx";
import ApiService from "../../services/api.js";
import { useCarrinho } from "../../context/carrinhoContext.jsx";

export function Homepage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {adcAoCarrinho} = useCarrinho();

  const handleBusca = (valorBusca) => {
    console.log("🏠 Homepage - Recebeu busca:", valorBusca);
    setBusca(valorBusca);
  };

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);

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
      }
    };

    carregarDados();
  }, []);

  const produtosPorCategoria = () => {
    return categorias
      .filter((categoria) => categoria && categoria.id)
      .map((categoria) => {
        const produtosCategoria = produtos.filter(
          (produto) => produto && produto.idCategoria === categoria.id
        );

        return {
          categoria,
          produtos: produtosCategoria,
        };
      })
      .filter((item) => item.produtos.length > 0);
  };

  const produtosFiltrados = () => {
    if (!busca || !busca.trim()) {
      return [];
    }

    const termoBusca = busca.toLowerCase().trim();

    return produtos.filter((produto) => {
      if (!produto) return false;

      const nomeMatch =
        produto.nome && produto.nome.toLowerCase().includes(termoBusca);

      const descricaoMatch =
        produto.descricao &&
        produto.descricao.toLowerCase().includes(termoBusca);

      const categoria = categorias.find(
        (cat) => cat.id === produto.idCategoria
      );
      const categoriaMatch =
        categoria &&
        categoria.name &&
        categoria.name.toLowerCase().includes(termoBusca);

      return nomeMatch || descricaoMatch || categoriaMatch;
    });
  };

  const produtosFiltradosArray = produtosFiltrados();

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
    adcAoCarrinho(produto)
    console.log("🛒 Produto adicionado:", produto);
    alert(`Produto "${produto.nome}" adicionado ao carrinho!`);
  };

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
        <div className={styles.hero}>
          <h1 className={styles.titulo}>Nossa Lojinha</h1>
          <p className={styles.subtitulo}>
            Encontre os melhores produtos com os melhores preços!
          </p>
          <BarraPesquisa onPesquisar={setBusca} />
        </div>

        {/* Se houver busca, mostra resultados */}
        {busca.trim() ? (
          <div className={styles.resultadosBusca}>
            <div className={styles.gridProdutos}>
              {produtosFiltradosArray.length > 0 ? (
                produtosFiltradosArray.map((produto) => (
                  <CardProduto
                    key={produto.id}
                    imagem={ApiService.getFotoProduto(produto.id)}
                    nome={produto.nome}
                    preco={formatarPreco(produto)}
                    onAdicionar={() => handleAdicionarProduto(produto)}
                  />
                ))
              ) : (
                <div className={styles.semResultados}>
                  <h3>😔 Nenhum produto encontrado</h3>
                  <p>
                    Tente outras palavras-chave ou explore nossas categorias
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Carrosséis quando não há busca */
          <div className={styles.categorias}>
            {produtosPorCategoria().map(
              ({ categoria, produtos: produtosCategoria }) => (
                <CarrosselCategoria
                  key={categoria.id}
                  categoria={categoria}
                  produtos={produtosCategoria}
                  onAdicionarProduto={handleAdicionarProduto}
                />
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
