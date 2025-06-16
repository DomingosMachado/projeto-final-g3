import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { localApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const CarrinhoContext = createContext();

export const CarrinhoC = ({ children }) => {
  // Inicializar com dados do localStorage
  const [carrinhoItens, setCarrinhoItens] = useState(() => {
    try {
      const savedCarrinho = localStorage.getItem("carrinho");
      return savedCarrinho ? JSON.parse(savedCarrinho) : [];
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      return [];
    }
  });

  const navigate = useNavigate();

  // CORRIGIR a função adcAoCarrinho (linha ~28):
  const adcAoCarrinho = (produto) => {
    console.log("Adicionando produto:", produto);

    setCarrinhoItens((prevItens) => {
      const itemExistente = prevItens.find(
        (item) => item.produto?.id === produto.id || item.id === produto.id
      );

      if (itemExistente) {
        return prevItens.map((item) =>
          item.produto?.id === produto.id || item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...prevItens, { produto, quantidade: 1 }]; // MUDOU: estrutura correta
      }
    });

    // Toast simples para evitar conflitos
    toast.success(`${produto.nome} adicionado!`);
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinhoItens((prodAnterior) =>
      prodAnterior.filter((item) => item.produto.id !== produtoId)
    );
  };

  const atualizarQuantia = (produtoId, quantidade) => {
    setCarrinhoItens((produtoAnterior) => {
      if (quantidade <= 0) {
        return produtoAnterior.filter((item) => item.produto.id !== produtoId);
      }
      return produtoAnterior.map((item) =>
        item.produto.id === produtoId ? { ...item, quantidade } : item
      );
    });
  };

  const totalItens = () => {
    let total = 0;
    for (let item of carrinhoItens) {
      total += item.quantidade;
    }
    return total;
  };

  const totalPreco = () => {
    let total = 0;
    for (let item of carrinhoItens) {
      total += item.produto.preco * item.quantidade;
    }
    return total;
  };

  //aqui vou precisar da API
  const finalizarCompra = async () => {
    if (carrinhoItens.length === 0) {
      alert("Seu carrinho está vazio!");
      return;
    }
    const token = localStorage.getItem("token"); //quando fizermos o login, tem que armazenar o token e eu uso ele aqui

    if (!token) {
      alert("Você precisa estar logado para finalizar a compra."); //trocar depois
      navigate("/login");
      return;
    }
    console.log("Token:", `Bearer ${token}`);
    try {
      const promises = carrinhoItens.map(({ produto, quantidade }) =>
        localApi.post("/pedidos/adicionar", null, {
          params: {
            idProduto: produto.id,
            quantidade: quantidade,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      const responses = await Promise.all(promises);
      setCarrinhoItens([]);
      Swal.fire({
        icon: "success",
        title: "Compra finalizada!",
        text: "Sua compra foi finalizada com sucesso!",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Ocorreu um erro ao finalizar sua compra.",
      });
    }
  };

  // Salvar no localStorage sempre que mudar
  useEffect(() => {
    try {
      localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }, [carrinhoItens]);

  // Sincronizar entre abas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "carrinho") {
        try {
          const novoCarrinho = e.newValue ? JSON.parse(e.newValue) : [];
          setCarrinhoItens(novoCarrinho);
        } catch (error) {
          console.error("Erro ao sincronizar carrinho:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinhoItens,
        adcAoCarrinho,
        removerDoCarrinho,
        atualizarQuantia,
        totalItens,
        totalPreco,
        finalizarCompra,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};
export default CarrinhoC; //corrigindo
export const useCarrinho = () => useContext(CarrinhoContext);
