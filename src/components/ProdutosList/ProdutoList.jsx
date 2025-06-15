import React, { useState, useEffect } from 'react';
import { CardProduto } from './CardProduto/cardproduto';
import ApiService from '../services/api';
import styles from './ProdutosList.module.css';

const ProdutosList = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produtosData, categoriasData] = await Promise.all([
          ApiService.getProdutos(),
          ApiService.getCategorias()
        ]);
        
        setProdutos(produtosData);
        setCategorias(categoriasData);
      } catch (err) {
        setError('Erro ao carregar dados: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdicionarProduto = (produto) => {
    // Aqui você pode implementar a lógica do carrinho
    console.log('Produto adicionado:', produto);
    // Exemplo: adicionarAoCarrinho(produto);
  };

  const formatarPreco = (produto) => {
    if (produto.precoPromocional && produto.precoPromocional !== produto.preco) {
      return produto.precoPromocional.toFixed(2);
    }
    return produto.preco?.toFixed(2) || '0.00';
  };

  if (loading) return <div className={styles.loading}>Carregando produtos...</div>;
  if (error) return <div className={styles.error}>Erro: {error}</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Nossos Produtos ({produtos.length})</h1>
      
      <div className={styles.produtosGrid}>
        {produtos.map(produto => (
          <CardProduto
            key={produto.id}
            imagem={ApiService.getFotoProduto(produto.id)}
            nome={produto.name}
            descricao={produto.descricao}
            preco={formatarPreco(produto)}
            onAdicionar={() => handleAdicionarProduto(produto)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProdutosList;