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
  const [holdInterval, setHoldInterval] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    produtos.length > 0 ? [...produtos, ...produtos, ...produtos] : [];

  // Scroll por clique e segurar
  const scroll = (direction, continuous = false) => {
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
      behavior: continuous ? "auto" : "smooth",
    });
    setTimeout(() => setIsScrolling(false), 300);
  };

  // Scroll contínuo ao segurar botão
  const handleHold = (direction) => {
    if (holdInterval) return;
    const interval = setInterval(() => scroll(direction, true), 30);
    setHoldInterval(interval);
  };
  const handleRelease = () => {
    if (holdInterval) {
      clearInterval(holdInterval);
      setHoldInterval(null);
    }
  };

  // Drag com mouse/touch
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches?.[0]?.pageX);
    setScrollLeft(carrosselRef.current.scrollLeft);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches?.[0]?.pageX;
    const walk = (x - startX) * 1.2; // sensibilidade
    carrosselRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // Scroll infinito
  const handleScroll = () => {
    if (!carrosselRef.current || isScrolling || produtos.length === 0) return;
    const container = carrosselRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const totalProductWidth = produtos.length * (280 + 24);
    const threshold = 50;
    if (scrollLeft >= scrollWidth - clientWidth - threshold) {
      container.scrollTo({ left: totalProductWidth, behavior: "auto" });
    }
    if (scrollLeft <= threshold) {
      container.scrollTo({ left: totalProductWidth, behavior: "auto" });
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
    <div
      className={styles.carrosselContainer}
      style={{ animation: "fadeIn 1.2s cubic-bezier(0.4,0,0.2,1)" }}
    >
      <div className={styles.header}>
        <h2 className={styles.titulo}>{categoria.nome}</h2>
        <div className={styles.controles}>
          <button
            className={styles.botaoNav}
            onMouseDown={() => handleHold("left")}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={() => handleHold("left")}
            onTouchEnd={handleRelease}
            onClick={() => scroll("left")}
            disabled={isScrolling}
          >
            ◀
          </button>
          <button
            className={styles.botaoNav}
            onMouseDown={() => handleHold("right")}
            onMouseUp={handleRelease}
            onMouseLeave={handleRelease}
            onTouchStart={() => handleHold("right")}
            onTouchEnd={handleRelease}
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
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {produtosInfinitos.map((produto, index) => (
          <div key={`${produto.id}-${index}`} className={styles.cardWrapper}>
            <CardProduto
              imagem={ApiService.getFotoProduto(produto.id)}
              nome={produto.nome}
              preco={formatarPreco(produto)}
              onAdicionar={() => onAdicionarProduto(produto)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
