import { useRef, useState, useEffect, useCallback } from "react";
import { CardProduto } from "../CardProduto/cardproduto";
import ApiService from "../../services/api";
import styles from "./CarrosselCategoria.module.css";

function slugify(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function formatarPreco(produto) {
  if (produto.precoPromocional && produto.precoPromocional !== produto.preco) {
    return `R$ ${produto.precoPromocional.toFixed(2)}`;
  }
  return `R$ ${produto.preco?.toFixed(2) || "0,00"}`;
}

export function CarrosselInfinito({ categoria, produtos, onAdicionarProduto }) {
  const carrosselRef = useRef(null);
  const scrollBarRef = useRef(null);
  const [produtosInfinitos, setProdutosInfinitos] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Criar lista infinita de produtos
  useEffect(() => {
    if (!produtos || produtos.length === 0) return;

    // Multiplicar produtos para criar efeito infinito
    const repeticoes = Math.max(3, Math.ceil(15 / produtos.length)); // Pelo menos 15 produtos
    const produtosRepetidos = [];

    for (let i = 0; i < repeticoes; i++) {
      produtos.forEach((produto, index) => {
        produtosRepetidos.push({
          ...produto,
          uniqueId: `${produto.id}-${i}-${index}`, // ID único para cada repetição
        });
      });
    }

    setProdutosInfinitos(produtosRepetidos);
  }, [produtos]);

  // Auto-scroll infinito
  useEffect(() => {
    const container = carrosselRef.current;
    if (!container || produtosInfinitos.length === 0) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      // Quando chega perto do final, volta para o meio
      if (scrollLeft >= scrollWidth - clientWidth - 100) {
        const novoScroll = scrollWidth / 3; // Volta para 1/3 do caminho
        container.scrollTo({ left: novoScroll, behavior: "auto" });
      }

      // Quando chega perto do início, vai para o meio
      if (scrollLeft <= 100) {
        const novoScroll = scrollWidth / 3; // Vai para 1/3 do caminho
        container.scrollTo({ left: novoScroll, behavior: "auto" });
      }
    };

    container.addEventListener("scroll", handleScroll);

    // Posiciona no meio inicialmente
    setTimeout(() => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      container.scrollTo({ left: scrollWidth / 3, behavior: "auto" });
    }, 100);

    return () => container.removeEventListener("scroll", handleScroll);
  }, [produtosInfinitos]);

  // Atualizar posição da barra customizada
  useEffect(() => {
    const container = carrosselRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      setScrollPosition(maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [produtosInfinitos]);

  // Scroll com setas visuais
  const scroll = useCallback(
    (direction) => {
      if (!carrosselRef.current) return;
      const container = carrosselRef.current;
      const cardWidth = 280;
      const gap = 24;
      const scrollAmount = (cardWidth + gap) * 2;
      const newScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    },
    [carrosselRef]
  );

  // Clique na barra customizada
  const handleScrollBarClick = (e) => {
    if (!carrosselRef.current || !scrollBarRef.current) return;
    const rect = scrollBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const barWidth = rect.width;
    const percent = clickX / barWidth;
    const container = carrosselRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    container.scrollTo({ left: percent * maxScroll, behavior: "smooth" });
  };

  // Suporte a setas do teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") scroll("left");
      if (e.key === "ArrowRight") scroll("right");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scroll]);

  if (!produtos || produtos.length === 0) {
    return null;
  }

  return (
    <div className={styles.carrosselContainer}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>
          {categoria?.nome || categoria?.name || "Categoria"}
        </h2>
        <div className={styles.controles}>
          <button
            className={styles.botaoNav}
            onClick={() => scroll("left")}
            aria-label="Anterior"
          >
            ◀
          </button>
          <button
            className={styles.botaoNav}
            onClick={() => scroll("right")}
            aria-label="Próximo"
          >
            ▶
          </button>
        </div>
      </div>
      <div
        className={styles.carrossel}
        ref={carrosselRef}
        tabIndex={0}
        style={{ cursor: "grab" }}
      >
        {produtosInfinitos.map((produto) => (
          <div key={produto.uniqueId} className={styles.cardWrapper}>
            <CardProduto
              imagem={ApiService.getFotoProduto(produto.id)}
              nome={produto.nome}
              preco={formatarPreco(produto)}
              estoque={produto.estoque}
              onAdicionar={() => onAdicionarProduto(produto)}
              abrirLink={() => {
                window.open(`/produto/${slugify(produto.nome)}`, "_blank");
              }}
            />
          </div>
        ))}
      </div>
      {/* Barra de scroll customizada */}
      <div
        className={styles.scrollBarCustom}
        ref={scrollBarRef}
        onClick={handleScrollBarClick}
      >
        <div
          className={styles.scrollThumb}
          style={{ left: `${scrollPosition}%` }}
        />
      </div>
    </div>
  );
}
