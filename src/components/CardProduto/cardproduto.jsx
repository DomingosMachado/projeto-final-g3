import styles from "./cardpoduto.module.css";
import { Botao } from "../Botao/botao";

export function CardProduto({ imagem, nome, descricao, preco, onAdicionar }) {
  return (
    <div className={styles.cardProduto}>
      <img src={imagem} alt={nome} className={styles.imagem} />
      <div className={styles.infoProduto}>
        <h3 className={styles.nome}>{nome}</h3>
        <p className={styles.descricao}>{descricao}</p>
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
