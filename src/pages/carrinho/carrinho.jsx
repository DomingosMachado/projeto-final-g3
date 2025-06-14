import { Botao } from "../../components/Botao/botao";
import { Navbar } from "../../components/Navbar/navbar";
import { useCarrinho } from "../../context/carrinhoContext";
import ApiService from "../../services/api.js";
import styles from "./carrinho.module.css"

export function Carrinho() {
    const {
        carrinhoItens,
        removerDoCarrinho,
        atualizarQuantia,
        totalItens,
        totalPreco,
        finalizarCompra
    } = useCarrinho();

    if (carrinhoItens.length === 0) {} //fazer depois 

    return (
        <>
            <Navbar /> {/*colocar outra navbar para cliente logado depois*/}

            <div className={styles.containerCarrinho}>
                <h2>Carrinho</h2>
                {carrinhoItens.map(({ produto, quantidade }) => (
                    <div className={styles.produtosCarrinho}>
                        <img
                            className={styles.imagensCarrinho}
                            src={ApiService.getFotoProduto(produto.id)}
                            alt={produto.nome}
                            style={{ width: "150px", height: "auto", objectFit: "cover" }}
                        />
                        <h4>{produto.nome}</h4>
                        <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                        <div className={styles.quantidade}>
                            <Botao onClick={() => atualizarQuantia(produto.id, quantidade - 1)}>-</Botao>
                            <input type="number" value={quantidade} min="1" onChange={(e) => atualizarQuantia(produto.id, parseInt(e.target.value))} />
                            <Botao onClick={() => atualizarQuantia(produto.id, quantidade + 1)}>+</Botao>
                        </div>
                        <Botao onClick={() => removerDoCarrinho(produto.id)}>Remover</Botao>
                    </div>

                )

                )}


                <div>
                    <p>Total de itens: {totalItens()}</p>
                    <p>Valor total: R$ {totalPreco().toFixed(2)}</p>
                    <Botao onClick={finalizarCompra}>
                        Finalizar Compra
                    </Botao>
                </div>
            </div>
        </>)

}