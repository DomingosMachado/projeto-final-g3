import { createContext, useState, useContext } from "react";
import { localApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

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
            alert("Seu carrinho está vazio!")
            return;
        }
        const token = localStorage.getItem("token") //quando fizermos o login, tem que armazenar o token e eu uso ele aqui

        if (!token) {
            Swal.fire({
            icon: 'warning',
            title: 'Atenção!',
            text: 'Você precisa estar logado para realizar compra.',
        }).then(() => {navigate("/login")}) 
        return
        }
    console.log("Token:", `Bearer ${token}`)
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

            const responses = await Promise.all(promises)
            setCarrinhoItens([]);
            Swal.fire({
                icon:"success",
                title:"Compra finalizada!",
                text:"Sua compra foi finalizada com sucesso!"
            }).then(() => {navigate("/")})
        } catch (error) {
            console.error("Erro ao finalizar compra:", error)
            Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Ocorreu um erro ao finalizar sua compra.',
        })
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
export default CarrinhoC; //corrigindo 
export const useCarrinho = () => useContext(CarrinhoContext)