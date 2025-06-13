import { createContext, useState, useContext } from "react";
import { localApi } from "../services/api";
import { useNavigate } from "react-router-dom";

const CarrinhoContext = createContext();

export const CarrinhoC = ({ children }) => {

    const [carrinhoItens, setCarrinhoItens] = useState([])

    const navigate = useNavigate();

    const adcAoCarrinho = (produto) => {
        setCarrinhoItens((prodAnterior) => {
            const itemId = prodAnterior.findIndex(item => item.produto.id === produto.id)
            if (itemId !== -1) {
                const novoCarrinho = [...prodAnterior]
                novoCarrinho[itemId].quantidade += 1
                return novoCarrinho
            }
            else {
                return [...prodAnterior, { produto, quantidade: 1 }]
            }
        })
    }

    const removerDoCarrinho = (produtoId) => {
        setCarrinhoItens((prodAnterior) => prodAnterior.filter(item => item.produto.id !== produtoId))
    }

    const atualizarQuantia = (produtoId, quantidade) => {
        setCarrinhoItens((produtoAnterior) => {
            if (quantidade <= 0) {
                return produtoAnterior.filter(item => item.produto.id !== produtoId)
            }
            return produtoAnterior.map(item => item.produto.id === produtoId ? { ...item, quantidade } : item)
        })
    }

    const totalItens = () => {
        let total = 0
        for (let item of carrinhoItens) {
            total += item.quantidade
        }
        return total

    }

    const totalPreco = () => {
        let total = 0
        for (let item of carrinhoItens) {
            total += item.produto.preco * item.quantidade
        }
        return total
    }


    //aqui vou precisar da API
    const finalizarCompra = async () => {
        if (carrinhoItens.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        const token = localStorage.getItem("token"); //quando fizermos o login, tem que armazenar o token e eu uso ele aqui

        try {
            const promises = carrinhoItens.map(({ produto, quantidade }) =>
                localApi.post(
                    "/pedidos/adicionar",
                    null,
                    {
                        params: {
                            idProduto: produto.id,
                            quantidade: quantidade,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            );

            const responses = await Promise.all(promises);

            console.log("Todos os produtos adicionados ao pedido!", responses);
            setCarrinhoItens([]);
            alert("Compra finalizada com sucesso!"); //mudar o alerta depois (sweetalert ou toastify?)
            navigate("/");
        } catch (error) {
            console.error("Erro ao finalizar compra:", error);
            alert("Erro ao finalizar compra.");
        }
    };

    return (
        <CarrinhoContext.Provider
            value={{
                carrinhoItens,
                adcAoCarrinho,
                removerDoCarrinho,
                atualizarQuantia,
                totalItens,
                totalPreco,
                finalizarCompra
            }}
        >
            {children}
        </CarrinhoContext.Provider>
    )
}
export const useCarrinho = () => useContext(CarrinhoContext);