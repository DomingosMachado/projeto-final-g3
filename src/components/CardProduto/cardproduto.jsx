import styles from "./cardpoduto.module.css";
import { Botao } from "../Botao/botao";

export function CardProduto({ imagem, nome, preco, onAdicionar, estoque }) {
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x200?text=Sem+Foto";
  };

const estoqueNumerico = Number(estoque ?? 0);
const esgotado = estoqueNumerico <= 0;
 console.log("Produto:", nome, " Estoque", estoque);
  return (
    
    <div className={styles.cardProduto}>
      <img
        src={imagem}
        alt={nome || "Produto"}
        className={styles.imagem}
        onError={handleImageError}
      />
      <div className={styles.infoProduto}>
        <h3 className={styles.nome}>
          {nome || "Nome não disponível"}
        </h3>
        <div className={styles.footerCard}>
          <span className={styles.preco}>R$ {preco}</span>
          <Botao  disabled={esgotado} onClick={onAdicionar} className={estoque === 0 ? styles.btnEsgotado : styles.btnAdicionar}>
            {esgotado ? "ESGOTADO" : "+ Adicionar"}
          </Botao>
        </div>
      </div>
    </div>
  );
}
