import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import { BarraPesquisa } from "../../components/BarraPesquisa/barrapesquisa.jsx";
import { CardProduto } from "../../components/CardProduto/cardproduto.jsx";
import { CarrosselInfinito } from "../../components/CarrosselCategoria/CarrosselCategoria.jsx";
import ApiService from "../../services/api.js";
import toast, { Toaster } from "react-hot-toast";
import { useCarrinho } from "../../context/carrinhoContext.jsx";

export function Homepage() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Contexto do carrinho
  let carrinhoData = { adcAoCarrinho: () => {}, carrinhoItens: [] };
  try {
    carrinhoData = useCarrinho();
  } catch (err) {
    console.error("❌ Erro no contexto do carrinho:", err);
  }

  const { adcAoCarrinho } = useCarrinho();

  // Carregar dados da API
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true);
        const [produtosData, categoriasData] = await Promise.all([
          ApiService.getProdutos(),
          ApiService.getCategorias(),
        ]);
        setProdutos(produtosData || []);
        setCategorias(categoriasData || []);
      } catch (err) {
        console.error("❌ Erro ao carregar dados:", err);
        setError(`Erro: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  // Função para filtrar produtos por busca
  const produtosFiltrados = () => {
    if (!busca || !busca.trim()) return [];

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

  // Produtos por categoria
  const produtosPorCategoria = () => {
    return categorias
      .filter((categoria) => categoria && categoria.id)
      .map((categoria) => {
        const produtosCategoria = produtos.filter(
          (produto) => produto && produto.idCategoria === categoria.id
        );
        return { categoria, produtos: produtosCategoria };
      })
      .filter((item) => item.produtos.length > 0);
  };

  // Função para formatar preço
  const formatarPreco = (produto) => {
    if (
      produto.precoPromocional &&
      produto.precoPromocional !== produto.preco
    ) {
      return produto.precoPromocional.toFixed(2);
    }
    return produto.preco?.toFixed(2) || "0.00";
  };

  // Função para adicionar produto
  const handleAdicionarProduto = (produto) => {
    adcAoCarrinho(produto);
  };

  // Função slugify
  function slugify(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  // Estados de loading e error
  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>
            <h2>Carregando produtos...</h2>
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

  // Renderização principal
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <h1 className={styles.titulo}>Nossa Lojinha</h1>
          <p className={styles.subtitulo}>
            Encontre os melhores produtos com os melhores preços!
          </p>
          <BarraPesquisa onPesquisar={setBusca} />
        </div>

        {/* Exibir resultados da busca ou produtos por categoria */}
        {busca.trim() ? (
          // Resultados da busca
          <div className={styles.resultadosBusca}>
            <h3 className={styles.tituloSecao}>
              {produtosFiltrados().length} produto(s) encontrado(s) para "
              {busca}"
            </h3>
            <div className={styles.gridProdutos}>
              {produtosFiltrados().length > 0 ? (
                produtosFiltrados().map((produto) => (
                  <CardProduto
                    key={produto.id}
                    imagem={ApiService.getFotoProduto(produto.id)}
                    nome={produto.nome}
                    preco={formatarPreco(produto)}
                    estoque={produto.estoque}
                    onAdicionar={() => adcAoCarrinho(produto)}
                    abrirLink={() => {
                      window.open(
                        `/produto/${slugify(produto.nome)}`,
                        "_blank"
                      );
                    }}
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
          // Produtos organizados por categoria
          <div className={styles.categorias}>
            {produtosPorCategoria().map(
              ({ categoria, produtos: produtosCategoria }) => (
                <div key={categoria.id} className={styles.categoriaSecao}>
                  <CarrosselInfinito
                    categoria={categoria}
                    produtos={produtosCategoria}
                    onAdicionarProduto={handleAdicionarProduto}
                  />
                </div>
              )
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
