import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ApiService from "../../services/api";
import styles from "./ProdutoPage.module.css";
import { Navbar } from "../../components/Navbar/navbar";
import { Footer } from "../../components/Footer/footer";
import { Botao } from "../../components/Botao/botao";

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function ProdutoPage() {
  const { nome } = useParams();
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduto = async () => {
      console.log("🔍 ProdutoPage: Iniciando busca", {
        nomeParam: nome,
        nomeDecoded: decodeURIComponent(nome || ""),
      });

      setLoading(true);
      setError(null);

      try {
        const produtos = await ApiService.getProdutos();
        console.log("📦 ProdutoPage: Total produtos:", produtos?.length || 0);

        if (!produtos || produtos.length === 0) {
          setError("Nenhum produto encontrado no sistema.");
          return;
        }

        // Normalizar o nome da URL
        const nomeNormalizado = decodeURIComponent(nome || "")
          .toLowerCase()
          .trim();
        console.log("🔤 Nome normalizado:", nomeNormalizado);

        // Buscar produto - tentar várias estratégias
        let produtoEncontrado = null;

        // Estratégia 1: Por slug exato
        produtoEncontrado = produtos.find(
          (p) => slugify(p.nome) === nomeNormalizado
        );

        // Estratégia 2: Por nome exato (caso insensitive)
        if (!produtoEncontrado) {
          produtoEncontrado = produtos.find(
            (p) => p.nome.toLowerCase().trim() === nomeNormalizado
          );
        }

        // Estratégia 3: Por slug contendo o termo
        if (!produtoEncontrado) {
          produtoEncontrado = produtos.find(
            (p) =>
              slugify(p.nome).includes(nomeNormalizado) ||
              nomeNormalizado.includes(slugify(p.nome))
          );
        }

        // Log para debug
        console.log("🎯 Produto encontrado:", produtoEncontrado);
        console.log(
          "📋 Primeiros 3 produtos disponíveis:",
          produtos.slice(0, 3).map((p) => ({
            id: p.id,
            nome: p.nome,
            slug: slugify(p.nome),
          }))
        );

        if (produtoEncontrado) {
          setProduto(produtoEncontrado);
          console.log("✅ Produto carregado:", produtoEncontrado.nome);
        } else {
          console.warn("❌ Produto não encontrado para:", nomeNormalizado);
          setError(`Produto "${decodeURIComponent(nome)}" não encontrado.`);
        }
      } catch (err) {
        console.error("❗ Erro ao buscar produto:", err);
        setError("Erro ao carregar produto: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (nome) {
      fetchProduto();
    } else {
      setError("Nome do produto não fornecido.");
      setLoading(false);
    }
  }, [nome]);
  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>
            <div className="skeleton-loader">
              <div className="skeleton-card"></div>
            </div>
            <p>Carregando produto...</p>
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
            <Link to="/" className={styles.voltar}>
              🏠 Voltar para a loja
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!produto) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.error}>
            <h2>Produto não encontrado</h2>
            <p>O produto que você está procurando não foi encontrado.</p>
            <Link to="/" className={styles.voltar}>
              🏠 Voltar para a loja
            </Link>
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
        <div className={styles.produtoContainer}>
          <div className={styles.imagemBox}>
            <img
              src={ApiService.getFotoProduto(produto.id)}
              alt={produto.nome}
              className={styles.imagem}
              onError={(e) =>
                (e.target.src =
                  "https://via.placeholder.com/400x400?text=Sem+Foto")
              }
            />
          </div>
          <div className={styles.infoBox}>
            <h1 className={styles.nome}>{produto.nome}</h1>
            <p className={styles.descricao}>{produto.descricao}</p>
            <div className={styles.precoBox}>
              <span className={styles.preco}>
                R$ {produto.preco?.toFixed(2)}
              </span>
              {produto.precoPromocional &&
                produto.precoPromocional !== produto.preco && (
                  <span className={styles.precoPromocional}>
                    R$ {produto.precoPromocional.toFixed(2)}
                  </span>
                )}
            </div>
            <p className={styles.estoque}>
              <b>Estoque:</b> {produto.estoque}
            </p>
            <p className={styles.categoria}>
              <b>Categoria:</b> {produto.idCategoria}
            </p>
            <p className={styles.fabricante}>
              <b>Fabricante:</b> {produto.fabricantes}
            </p>
            <p className={styles.status}>
              <b>Status:</b> {produto.ativo ? "Ativo" : "Inativo"}
            </p>
            <Botao
              onClick={() =>
                alert(`Produto \"${produto.nome}\" adicionado ao carrinho!`)
              }
            >
              + Adicionar
            </Botao>
            <Link to="/" className={styles.voltar}>
              Voltar para a loja
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
