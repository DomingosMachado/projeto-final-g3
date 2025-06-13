import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../../context/carrinhoContext";
import styles from "./minicarrinho.module.css"
import { Botao } from "../../../components/Botao/botao";
import ApiService from "../../../services/api.js";

export function MiniCarrinho(){
    const { carrinhoItens, totalPreco, removerDoCarrinho} = useCarrinho();
    const navigate = useNavigate()

     return (
    <div className={styles.miniCarrinho}>
      <h4>Meu Carrinho</h4>
      {carrinhoItens.length === 0 ? (
        <p>Está vazio</p>
      ) : (
        <>
          <ul>
            {carrinhoItens.map(({ produto, quantidade }) => (
              <li key={produto.id}>
                 <img
                  src={ApiService.getFotoProduto(produto.id)}
                  alt={produto.nome}
                  className={styles.foto}
                />
                {produto.nome} x{quantidade}
                <button
                  className={styles.remover}
                  onClick={() => removerDoCarrinho(produto.id)}
                >
                 🗑️
                </button>
              </li>
            ))}
          </ul>
          <p>Total: R$ {totalPreco().toFixed(2)}</p>
          <Botao onClick={() => navigate("/carrinho")}>
            Ir para o carrinho
          </Botao> 
        </>
      )} 
    </div>
  );
}