import { createContext, useContext, useState, useEffect } from "react";
import { localApi } from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CarrinhoContext = createContext();

// Componente Provider
function CarrinhoProvider({ children }) {
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

  const adcAoCarrinho = (produto) => {
    console.log("Adicionando produto:", produto);

    setCarrinhoItens((prevItens) => {
      const itemExistente = prevItens.find(
        (item) => item.produto?.id === produto.id || item.id === produto.id
      );

      if (itemExistente) {
        // VERIFICAÇÃO DE ESTOQUE: não permitir adicionar mais que o estoque
        const novaQuantidade = itemExistente.quantidade + 1;
        if (novaQuantidade > produto.estoque) {
          toast.error(
            `Estoque insuficiente! Máximo disponível: ${produto.estoque}`
          );
          return prevItens; // Não altera o carrinho
        }

        return prevItens.map((item) =>
          item.produto?.id === produto.id || item.id === produto.id
            ? { ...item, quantidade: novaQuantidade }
            : item
        );
      } else {
        // VERIFICAÇÃO DE ESTOQUE: verificar se há estoque para adicionar o primeiro item
        if (produto.estoque <= 0) {
          toast.error("Produto sem estoque!");
          return prevItens; // Não adiciona ao carrinho
        }

        return [...prevItens, { produto, quantidade: 1 }];
      }
    });

    toast.success(`${produto.nome} adicionado!`);
  };

  const removerDoCarrinho = (produtoId) => {
    setCarrinhoItens((prevItens) =>
      prevItens.filter(
        (item) => item.produto?.id !== produtoId && item.id !== produtoId
      )
    );
  };

  const atualizarQuantia = (produtoId, quantidade) => {
    setCarrinhoItens((produtoAnterior) => {
      if (quantidade <= 0) {
        return produtoAnterior.filter((item) => item.produto.id !== produtoId);
      }

      return produtoAnterior.map((item) => {
        if (item.produto.id === produtoId) {
          if (quantidade > item.produto.estoque) {
            toast.error(
              `Estoque insuficiente! Máximo disponível: ${item.produto.estoque}`
            );
            return item;
          }
          return { ...item, quantidade };
        }
        return item;
      });
    });
  };

  const limparCarrinho = () => {
    setCarrinhoItens([]);
  };

  const totalItens = carrinhoItens.reduce(
    (total, item) => total + item.quantidade,
    0
  );
  const totalPreco = carrinhoItens.reduce((total, item) => {
    const preco = item.produto?.preco || item.preco || 0;
    return total + preco * item.quantidade;
  }, 0);

  // Salvar no localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinhoItens));
  }, [carrinhoItens]);

  // Sincronizar entre abas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "carrinho") {
        const novoCarrinho = e.newValue ? JSON.parse(e.newValue) : [];
        setCarrinhoItens(novoCarrinho);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const finalizarCompra = async () => {
    console.log("🛒 Iniciando finalização da compra...");
    console.log("📦 Itens do carrinho:", carrinhoItens);
    console.log("💰 Total do carrinho:", totalPreco);

    if (carrinhoItens.length === 0) {
      toast.error("Seu carrinho está vazio!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Você precisa estar logado para realizar compra.");
      navigate("/login");
      return;
    }

    try {
      console.log("📦 Enviando pedidos para API...");
      console.log("🔑 Token:", token);

      for (const { produto, quantidade } of carrinhoItens) {
        console.log(
          `➡️ Processando produto: ${produto.nome} (ID: ${produto.id}) - Quantidade: ${quantidade}`
        );

        try {
          const response = await localApi.post("/pedidos/adicionar", null, {
            params: {
              idProduto: parseInt(produto.id),
              quantidade: parseInt(quantidade),
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          console.log(
            `✅ Produto ${produto.nome} adicionado com sucesso:`,
            response.data
          );
        } catch (itemError) {
          console.error(`❌ Erro ao adicionar ${produto.nome}:`, itemError);
          console.error("Detalhes do erro:", itemError.response?.data);

          // Parar o processo se um item falhar
          throw new Error(
            `Erro ao adicionar ${produto.nome}: ${
              itemError.response?.data?.erros?.[0] || itemError.message
            }`
          );
        }
      }

      // Se chegou aqui, todos os itens foram adicionados com sucesso
      console.log("✅ Todos os pedidos foram processados com sucesso!");

      // Limpar carrinho após compra bem-sucedida
      setCarrinhoItens([]);
      localStorage.removeItem("carrinho");

      toast.success(
        `Compra realizada com sucesso! Total: R$ ${totalPreco.toFixed(2)}`
      );
      navigate("/");
    } catch (error) {
      console.error("❌ Erro ao finalizar compra:", error);
      console.error("📋 Response data:", error.response?.data);
      console.error("📊 Status:", error.response?.status);

      // Mostrar erro específico do servidor se disponível
      const mensagemErro =
        error.response?.data?.erros?.[0] ||
        error.response?.data?.message ||
        error.message ||
        "Erro desconhecido";

      toast.error(`Erro ao finalizar compra: ${mensagemErro}`);
    }
  };

  const value = {
    carrinhoItens,
    adcAoCarrinho,
    removerDoCarrinho,
    atualizarQuantia,
    limparCarrinho,
    totalItens,
    totalPreco,
    finalizarCompra,
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// Hook customizado
function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoC");
  }
  return context;
}

// Export padrão
export default CarrinhoProvider;
export { useCarrinho };
