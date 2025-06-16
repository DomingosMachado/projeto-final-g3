import { useNavigate } from "react-router-dom";
import { Botao } from "../../components/Botao/botao";
import { Navbar } from "../../components/Navbar/navbar";
import { useCarrinho } from "../../context/carrinhoContext";
import ApiService from "../../services/api.js";
import styles from "./carrinho.module.css";
import { Footer } from "../../components/Footer/footer.jsx";

export function Carrinho() {
  const {
    carrinhoItens,
    removerDoCarrinho,
    atualizarQuantia,
    totalItens,
    totalPreco,
    finalizarCompra,
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
              <Botao onClick={() => navigate("/")}>
                🛍️ Ir Às Compras Agora
              </Botao>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  function calcularFreteFront(quantidade) {
    const valorBase = 5.0;
    const adicionalPorItem = 1.0;
    return valorBase + adicionalPorItem * quantidade;
  }

  const frete = calcularFreteFront(totalItens);
  const totalFinal = totalPreco + frete;

  // APENAS adicionar esta função de debug:
  const handleRealizarCompra = () => {
    console.log("🛒 Botão Realizar Compra clicado!");
    console.log("📦 Itens no carrinho:", carrinhoItens);
    console.log("🔧 Função finalizarCompra existe?", typeof finalizarCompra);

    if (finalizarCompra) {
      console.log("✅ Chamando finalizarCompra...");
      finalizarCompra();
    } else {
      console.error("❌ Função finalizarCompra não encontrada!");
    }
  };

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
                  {/* Botão de diminuir - desabilitado quando quantidade = 1 */}
                  <Botao
                    onClick={() => atualizarQuantia(produto.id, quantidade - 1)}
                    disabled={quantidade <= 1}
                    style={{
                      opacity: quantidade <= 1 ? 0.5 : 1,
                      cursor: quantidade <= 1 ? "not-allowed" : "pointer",
                      backgroundColor: quantidade <= 1 ? "#ccc" : "",
                    }}
                  >
                    -
                  </Botao>

                  <input
                    type="number"
                    value={quantidade}
                    min="1"
                    max={produto.estoque}
                    onChange={(e) => {
                      const novaQuantidade = parseInt(e.target.value);
                      if (
                        novaQuantidade >= 1 &&
                        novaQuantidade <= produto.estoque
                      ) {
                        atualizarQuantia(produto.id, novaQuantidade);
                      }
                    }}
                  />

                  {/* Botão de aumentar - desabilitado quando quantidade = estoque */}
                  <Botao
                    onClick={() => atualizarQuantia(produto.id, quantidade + 1)}
                    disabled={quantidade >= produto.estoque}
                    style={{
                      opacity: quantidade >= produto.estoque ? 0.5 : 1,
                      cursor:
                        quantidade >= produto.estoque
                          ? "not-allowed"
                          : "pointer",
                      backgroundColor:
                        quantidade >= produto.estoque ? "#ccc" : "",
                    }}
                  >
                    +
                  </Botao>
                </div>

                <button
                  className={styles.btnRemover}
                  onClick={() => removerDoCarrinho(produto.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.colunaResumoContainer}>
          <div className={styles.colunaResumo}>
            <h3>Resumo</h3>
            <p>Total de itens: {totalItens}</p>
            <p>Valor dos Produtos: R$ {totalPreco.toFixed(2)}</p>
            <p>Frete: R$ {frete.toFixed(2)}</p>
            <p>
              <strong>Total: R$ {totalFinal.toFixed(2)}</strong>
            </p>
          </div>

          <div className={styles.blocoAcoes}>
            {/* APENAS TROCAR ESTA LINHA: */}
            <button
              className={styles.btnComprar}
              onClick={handleRealizarCompra}
            >
              Realizar Compra
            </button>
            <button
              className={styles.btnContinuar}
              onClick={() => navigate("/")}
            >
              Continuar Comprando
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
