import { useNavigate } from "react-router-dom";
import { useCarrinho } from "../../../context/carrinhoContext";
import styles from "./minicarrinho.module.css"
import { Botao } from "../../../components/Botao/botao";
import ApiService from "../../../services/api.js";

export function MiniCarrinho() {
    const { carrinhoItens, totalPreco, removerDoCarrinho, atualizarQuantia, finalizarCompra, totalItens } = useCarrinho();
    const navigate = useNavigate()

    return (
        <div className={styles.miniCarrinho}>
            {carrinhoItens.length === 0 ? (
                <p className={styles.vazio}>Seu carrinho está vazio</p>
            ) : (
                <>
                    <ul className={styles.listaItens}>
                        {carrinhoItens.map(({ produto, quantidade }) => (
                            <li key={produto.id} className={styles.item}>
                                <img
                                    src={ApiService.getFotoProduto(produto.id)}
                                    alt={produto.nome}
                                    className={styles.foto}
                                />
                                <div className="styles.info">
                                    <div className={styles.nome}>{produto.nome}</div>
                                    <div className={styles.codigo}>ID: {produto.id}</div>
                                    <div className={styles.detalhes}>
                                        <input type="number"
                                            min="1"
                                            value={quantidade}
                                            onChange={(e) => atualizarQuantia(produto.id, parseInt(e.target.value))}
                                            className={styles.quantidadeInput} />
                                        <div className={styles.precoUnitario}>R$ {produto.preco.toFixed(2)}</div>
                                        <div className={styles.subtotal}>Subtotal: R$ {(produto.preco * quantidade).toFixed(2)}</div>
                                    </div>
                                </div>

                                <button
                                    className={styles.remover}
                                    onClick={() => removerDoCarrinho(produto.id)}
                                >
                                    🗑️
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.resumo}>
                        <p className={styles.total}>Total Itens: <strong>{totalItens()}</strong></p>
                        <p className={styles.total}>Total: <strong>R$ {totalPreco().toFixed(2)}</strong></p>
                        <div className={styles.botoes}>
                            <button onClick={() => navigate("/carrinho")} className={styles.botaoSecundario}>Ver Carrinho</button>
                            <button onClick={finalizarCompra} className={styles.botaoPrincipal}>Finalizar Compra</button>

                        </div>
                    </div>
                </>
            )}
        </div>
    );
}