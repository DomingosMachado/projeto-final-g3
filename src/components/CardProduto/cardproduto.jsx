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

  const estoqueNumerico = Number(estoque ?? 0);
  const esgotado = estoqueNumerico <= 0;

  // Debug do estoque
  console.log(
    "🔍 Produto:",
    nome,
    "- Estoque original:",
    estoque,
    "- Estoque numérico:",
    estoqueNumerico,
    "- Esgotado:",
    esgotado
  );
  return (
    <div className={styles.cardProduto}>
      {/* Área clicável para abrir produto (apenas imagem) */}
      <div
        className={styles.areaClicavel}
        onClick={abrirLink}
        style={{ cursor: "pointer" }}
      >
        <img
          src={imagem}
          alt={nome || "Produto"}
          className={styles.imagem}
          onError={handleImageError}
        />
      </div>

      <div className={styles.infoProduto}>
        <h3 className={styles.nome}>{nome || "Nome não disponível"}</h3>
      </div>

      <div className={styles.footerCard}>
        <span className={styles.preco}>{preco}</span>
        <button
          className={`${styles.botaoAdicionar} ${
            estoqueNumerico <= 0 ? styles.esgotado : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onAdicionar();
          }}
          disabled={estoqueNumerico <= 0}
        >
          {estoqueNumerico <= 0 ? "ESGOTADO" : "+ Adicionar"}
        </button>
      </div>
    </div>
  );
}
