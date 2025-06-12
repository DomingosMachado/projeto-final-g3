import styles from "./cardpoduto.module.css";
import { Botao } from "../Botao/botao";

export function CardProduto({ imagem, nome, preco, onAdicionar }) {
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200?text=Sem+Foto';
  };

  return (
    <div className={styles.cardProduto}>
      <img 
        src={imagem} 
        alt={nome} 
        className={styles.imagem}
        onError={handleImageError}
      />
      <div className={styles.infoProduto}>
        <h3 className={styles.nome}>{nome}</h3>
        <div className={styles.footerCard}>
          <span className={styles.preco}>R$ {preco}</span>
          <Botao className={styles.btnAdicionar} onClick={onAdicionar}>
            + Adicionar
          </Botao>
        </div>
      </div>
    </div>
  );
}
