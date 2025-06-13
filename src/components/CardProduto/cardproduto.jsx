import styles from "./cardpoduto.module.css";
import { Botao } from "../Botao/botao";

export function CardProduto({
  imagem,
  nome,
  preco,
  onAdicionar,
  abrirLink,
  estoque,
}) {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=Sem+Foto";
  };

  const esgotado = estoque === 0;

  return (
    <div className={styles.cardProduto}>
      <div
        className={styles.cardLinkArea}
        onClick={abrirLink}
        style={{ cursor: "pointer" }}
        tabIndex={0}
        role="button"
        aria-label={`Ver detalhes de ${nome}`}
      >
        <img
          src={imagem}
          alt={nome || "Produto"}
          className={styles.imagem}
          onError={handleImageError}
        />
        <div className={styles.nome}>{nome || "Nome não disponível"}</div>
      </div>
      <div className={styles.footerCard}>
        <div className={styles.preco}>R$ {preco}</div>
        <button
          className={styles.btnAdicionar}
          onClick={(e) => {
            e.stopPropagation(); // impede que o click no botão propague para o link
            onAdicionar();
          }}
        >
          + Adicionar
        </button>
      </div>
    </div>
  );
}
