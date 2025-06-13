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
      setLoading(true);
      setError(null);
      try {
        const produtos = await ApiService.getProdutos();
        // Busca por slug do nome
        const prod = produtos.find(
          (p) => slugify(p.nome) === nome.toLowerCase()
        );
        setProduto(prod || null);
        if (!prod) setError("Produto não encontrado.");
      } catch (err) {
        setError("Erro ao buscar produto.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [nome]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.loading}>Carregando...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !produto) {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.error}>
            {error || "Produto não encontrado."}
          </div>
          <Link to="/" className={styles.voltar}>
            Voltar para a loja
          </Link>
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
