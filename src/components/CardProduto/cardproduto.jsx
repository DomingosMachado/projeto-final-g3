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

      {/* Informações do produto (não clicáveis) */}
      <div className={styles.infoProduto}>
        <h3 className={styles.nome}>{nome || "Nome não disponível"}</h3>
      </div>

      {/* Footer com preço e botão (não clicável para produto) */}
      <div className={styles.footerCard}>
        <span className={styles.preco}>R$ {preco}</span>
        <Botao
          disabled={esgotado}
          onClick={(e) => {
            e.stopPropagation(); // Impede propagação para o link
            onAdicionar();
          }}
          className={esgotado ? styles.btnEsgotado : styles.btnAdicionar}
        >
          {esgotado ? "ESGOTADO" : "+ Adicionar"}
        </Botao>
      </div>
    </div>
  );
}
