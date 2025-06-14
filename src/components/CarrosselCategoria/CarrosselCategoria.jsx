import { useRef, useState, useEffect } from "react";
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

export function CarrosselCategoria({
  categoria,
  produtos,
  onAdicionarProduto,
}) {
  const carrosselRef = useRef(null);
  const [dragStartX, setDragStartX] = useState(null);
  const [dragging, setDragging] = useState(false);

  // Scroll com setas
  const scroll = (direction) => {
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
  };

  // Drag com mouse/touch
  const handleMouseDown = (e) => {
    setDragging(false);
    setDragStartX(e.pageX || e.touches?.[0]?.pageX);
    document.body.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (dragStartX !== null && carrosselRef.current) {
      setDragging(true);
      const x = e.pageX || e.touches?.[0]?.pageX;
      carrosselRef.current.scrollLeft -= x - dragStartX;
      setDragStartX(x);
    }
  };

  const handleMouseUp = () => {
    setDragStartX(null);
    document.body.style.cursor = "";
    setTimeout(() => setDragging(false), 50);
  };

  useEffect(() => {
    if (dragStartX !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  });

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
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ cursor: dragStartX !== null ? "grabbing" : "grab" }}
      >
        {produtos.map((produto) => (
          <div key={produto.id} className={styles.cardWrapper}>
            <CardProduto
              imagem={ApiService.getFotoProduto(produto.id)}
              nome={produto.nome}
              preco={formatarPreco(produto)}
              estoque={produto.estoque} 
              onAdicionar={() => onAdicionarProduto(produto)}
              abrirLink={() => {
                if (!dragging) {
                  window.open(`/produto/${slugify(produto.nome)}`, "_blank");
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
