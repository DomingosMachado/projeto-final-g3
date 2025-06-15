import { useState, useRef, useEffect } from "react";
import { CardProduto } from "../CardProduto/cardproduto";
import ApiService from "../../services/api";
import styles from "./CarrosselCategoria.module.css";

export function CarrosselCategoria({
  categoria,
  produtos,
  onAdicionarProduto,
}) {
  const carrosselRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const formatarPreco = (produto) => {
    if (
      produto.precoPromocional &&
      produto.precoPromocional !== produto.preco
    ) {
      return produto.precoPromocional.toFixed(2);
    }
    return produto.preco?.toFixed(2) || "0.00";
  };

  const produtosInfinitos =
    produtos.length > 0
      ? [...produtos, ...produtos, ...produtos] // Triplicar para garantir scroll suave
      : [];

  const scroll = (direction) => {
    if (!carrosselRef.current || isScrolling) return;

    setIsScrolling(true);
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

    setTimeout(() => setIsScrolling(false), 300);
  };

  const handleScroll = () => {
    if (!carrosselRef.current || isScrolling || produtos.length === 0) return;

    const container = carrosselRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;

    const totalProductWidth = produtos.length * (280 + 24);
    const threshold = 50;

    if (scrollLeft >= scrollWidth - clientWidth - threshold) {
      container.scrollTo({
        left: totalProductWidth,
        behavior: "auto",
      });
    }

    if (scrollLeft <= threshold) {
      container.scrollTo({
        left: totalProductWidth,
        behavior: "auto",
      });
    }
  };

  useEffect(() => {
    if (carrosselRef.current && produtos.length > 0) {
      const totalProductWidth = produtos.length * (280 + 24);
      carrosselRef.current.scrollTo({
        left: totalProductWidth,
        behavior: "auto",
      });
    }
  }, [produtos]);

  if (!produtos || produtos.length === 0) {
    return null;
  }

  return (
    <div className={styles.carrosselContainer}>
      <div className={styles.header}>
        <h2 className={styles.titulo}>{categoria.nome}</h2>
        <div className={styles.controles}>
          <button
            className={styles.botaoNav}
            onClick={() => scroll("left")}
            disabled={isScrolling}
          >
            ◀
          </button>
          <button
            className={styles.botaoNav}
            onClick={() => scroll("right")}
            disabled={isScrolling}
          >
            ▶
          </button>
        </div>
      </div>

      <div
        className={styles.carrossel}
        ref={carrosselRef}
        onScroll={handleScroll}
      >
        {produtosInfinitos.map((produto, index) => (
          <div key={`${produto.id}-${index}`} className={styles.cardWrapper}>
            <CardProduto
              imagem={ApiService.getFotoProduto(produto.id)}
              nome={produto.nome}
              preco={formatarPreco(produto)}
              estoque={produto.estoque} 
              onAdicionar={() => onAdicionarProduto(produto)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
