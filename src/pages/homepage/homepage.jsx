import { useEffect, useState } from "react";
import styles from "./home.module.css";
import { Navbar } from "../../components/Navbar/navbar.jsx";
import { Footer } from "../../components/Footer/footer.jsx";
import { CardProduto } from "../../components/CardProduto/cardproduto.jsx";
import { BarraPesquisa } from "../../components/BarraPesquisa/barrapesquisa.jsx";

// MOCK PARA TESTAR PRODUTOS
const produtosExemplo = [
  {
    id: 1,
    imagem: "https://via.placeholder.com/180",
    nome: "Produto Exemplo 1",
    descricao: "Descrição breve do produto 1.",
    preco: "49.90",
  },
  {
    id: 2,
    imagem: "https://via.placeholder.com/180",
    nome: "Produto Exemplo 2",
    descricao: "Descrição breve do produto 2.",
    preco: "79.90",
  },
  {
    id: 3,
    imagem: "https://via.placeholder.com/180",
    nome: "Produto Exemplo 3",
    descricao: "Descrição breve do produto 3.",
    preco: "99.90",
  },
  {
    id: 4,
    imagem: "https://via.placeholder.com/180",
    nome: "Socorro",
    descricao: "Não centraliza de jeito nenhum.",
    preco: "19.90",
  },
];

export function Homepage() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setProdutos(produtosExemplo);
  }, []);

  const produtosFiltrados = produtos.filter(
    (produto) =>
      produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
      produto.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.titulo}>Nossa Lojinha</h1>
        <BarraPesquisa onPesquisar={setBusca} />
        <div className={styles.gridProdutos}>
          {produtosFiltrados.map((produto) => (
            <CardProduto
              key={produto.id}
              {...produto}
              onAdicionar={() => alert(`Adicionado: ${produto.nome}`)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
