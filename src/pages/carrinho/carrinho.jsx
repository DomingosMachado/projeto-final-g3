import { useNavigate } from "react-router-dom";
import { Botao } from "../../components/Botao/botao";
import { Navbar } from "../../components/Navbar/navbar";
import { useCarrinho } from "../../context/carrinhoContext";
import ApiService from "../../services/api.js";
import styles from "./carrinho.module.css"
import { Footer } from "../../components/Footer/footer.jsx";

export function Carrinho() {
    const {
        carrinhoItens,
        removerDoCarrinho,
        atualizarQuantia,
        totalItens,
        totalPreco,
        finalizarCompra
    } = useCarrinho();

    const navigate = useNavigate();


    if (carrinhoItens.length === 0) {
        return (
            <>
                <Navbar />
                <div className={styles.carrinhoVazioContainer}>
                    <div className={styles.mensagemVazia}>
                        <div className={styles.icone}>🛒</div>
                        <h2>Seu carrinho está vazio por enquanto...</h2>
                        <p> Ainda não escolheu nada?</p>
                        <p>Explore nossas ofertas e encontre produtos incriveis!</p>
                        <div className={styles.botoesAcao}>
                            <Botao onClick={() => navigate("/")}>🛍️ Ir Às Compras Agora</Botao>
                        </div>
                    </div>

                </div>
            </>
        )
    }

    function calcularFreteFront(quantidade) {
        const valorBase = 5.0
        const adicionalPorItem = 1.0
        return valorBase + adicionalPorItem * quantidade
    }
    const frete = calcularFreteFront(totalItens())
    const totalFinal = totalPreco() + frete

    return (
        <>
            <Navbar />

            <div className={styles.containerCarrinho}>
                <div className={styles.colunaProduto}>
                    <h2>Carrinho</h2>
                    {carrinhoItens.map(({ produto, quantidade }) => (
                        <div key={produto.id} className={styles.cardProdutoC}>
                            <img
                                className={styles.fotoProduto}
                                src={ApiService.getFotoProduto(produto.id)}
                                alt={produto.nome}
                                style={{ width: "150px", height: "auto", objectFit: "cover" }}
                            />
                            <div className={styles.infoProduto}>
                                <h4>{produto.nome}</h4>
                                <div className={styles.codigo}>ID: {produto.id}</div>
                                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
                                <p>Estoque: {produto.estoque}</p>

                                <div className={styles.quantidade}>
                                    <Botao onClick={() => atualizarQuantia(produto.id, quantidade - 1)}>-</Botao>
                                    <input type="number" value={quantidade} min="1" onChange={(e) => atualizarQuantia(produto.id, parseInt(e.target.value))} />
                                    <Botao onClick={() => atualizarQuantia(produto.id, quantidade + 1)}>+</Botao>
                                </div>
                                <button className={styles.btnRemover}onClick={() => removerDoCarrinho(produto.id)}>🗑️</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.colunaResumoContainer}>

                    <div className={styles.colunaResumo}>
                        <h3>Resumo</h3>
                        <p>Total de itens: {totalItens()}</p>
                        <p>Valor dos Produtos: R$ {totalPreco().toFixed(2)}</p>
                        <p>Frete: R$ {frete.toFixed(2)}</p>
                        <p><strong>Total: R$ {totalFinal.toFixed(2)}</strong></p>

                    </div>

                    <div className={styles.blocoAcoes}>
                        <button className={styles.btnComprar} onClick={finalizarCompra}>Realizar Compra</button>
                        <button className={styles.btnContinuar}onClick={() => navigate("/")}>Continuar Comprando</button>
                    </div>

                </div>
                <Footer />
            </div>

        </>)

} 