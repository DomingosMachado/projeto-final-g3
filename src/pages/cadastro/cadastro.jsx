import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/navbar.jsx';
import { Footer } from '../../components/Footer/footer.jsx';
import './cadastro.css';
import { Link } from 'react-router-dom';

export function Cadastro() {
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    telefone: '',
    email: '',
    senha: '',
    confirmaSenha: ''
  });

  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    numero: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingCep, setLoadingCep] = useState(false);

  // Efeito para buscar CEP quando estiver completo
  useEffect(() => {
    if (endereco.cep.replace(/\D/g, '').length === 8) {
      buscarEnderecoPorCep();
    }
  }, [endereco.cep]);

  const buscarEnderecoPorCep = async () => {
    const cepLimpo = endereco.cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setMensagem('CEP não encontrado');
        return;
      }

      setEndereco(prev => ({
        ...prev,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
        complemento: data.complemento || prev.complemento // Mantém o complemento se já existir
      }));

    } catch (error) {
      setMensagem('Erro ao buscar CEP');
      console.error('Erro na busca do CEP:', error);
    } finally {
      setLoadingCep(false);
    }
  };

  const formatarCampo = (name, value) => {
    const apenasNumeros = value.replace(/\D/g, '');
    
    if (name === 'cpf') {
      if (apenasNumeros.length <= 3) return apenasNumeros;
      if (apenasNumeros.length <= 6) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3)}`;
      if (apenasNumeros.length <= 9) return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6)}`;
      return `${apenasNumeros.slice(0, 3)}.${apenasNumeros.slice(3, 6)}.${apenasNumeros.slice(6, 9)}-${apenasNumeros.slice(9, 11)}`;
    }
    
    if (name === 'telefone') {
      if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
      if (apenasNumeros.length <= 6) return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
      if (apenasNumeros.length <= 10) return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
    }
    
    if (name === 'cep') {
      if (apenasNumeros.length <= 5) return apenasNumeros;
      return `${apenasNumeros.slice(0, 5)}-${apenasNumeros.slice(5, 8)}`;
    }
    
    return value;
  };

  const handleDadosChange = (e) => {
    const { name, value } = e.target;
    setDadosPessoais(prev => ({
      ...prev,
      [name]: formatarCampo(name, value)
    }));
  };

  const handleEnderecoChange = (e) => {
    const { name, value } = e.target;
    setEndereco(prev => ({
      ...prev,
      [name]: formatarCampo(name, value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/cliente/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...dadosPessoais,
          ...endereco
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      setMensagem('Cadastro realizado com sucesso!');
      // Limpar formulários...
      
    } catch (error) {
      setMensagem(error.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="cadastro-container">
        <form onSubmit={handleSubmit} className="form-dados-pessoais">
          <h2>Cadastro</h2>
          
          {mensagem && <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
            {mensagem}
          </div>}
          
          <div className="campo">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={dadosPessoais.nome}
              onChange={handleDadosChange}
              required
            />
          </div>
          
          <div className="campo">
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={dadosPessoais.cpf}
              onChange={handleDadosChange}
              maxLength="14"
              placeholder="000.000.000-00"
              required
            />
          </div>
          
          <div className="campo">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataDeNascimento" // Nome do campo atualizado
              value={dadosPessoais.dataDeNascimento}
              onChange={handleDadosChange}
              required
            />
          </div>
          
          <div className="campo">
            <label>Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={dadosPessoais.telefone}
              onChange={handleDadosChange}
              maxLength="15"
              placeholder="(00) 00000-0000"
              required
            />
          </div>
          
          <div className="campo">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={dadosPessoais.email}
              onChange={handleDadosChange}
              required
            />
          </div>
          
          <div className="campo">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={dadosPessoais.senha}
              onChange={handleDadosChange}
              minLength="6"
              required
            />
          </div>
          
          <div className="campo">
            <label>Confirme a Senha</label>
            <input
              type="password"
              name="confirmaSenha"
              value={dadosPessoais.confirmaSenha}
              onChange={handleDadosChange}
              minLength="6"
              required
            />
          </div>
            <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={loading}
            className="botao-cadastrar"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
          
          <div className="login-link">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
        </form>

        <form className="form-endereco">
          <h2>Endereço</h2>
          
          {mensagem && <div className="mensagem">{mensagem}</div>}
          
          <div className="campo">
            <label>CEP {loadingCep && <span className="loading">(Buscando...)</span>}</label>
            <input
              type="text"
              name="cep"
              value={endereco.cep}
              onChange={handleEnderecoChange}
              maxLength="9"
              placeholder="00000-000"
              required
            />
          </div>
          
          <div className="campo">
            <label>Logradouro</label>
            <input
              type="text"
              name="logradouro"
              value={endereco.logradouro}
              onChange={handleEnderecoChange}
              required
              readOnly={!!endereco.logradouro}
            />
          </div>
          
          <div className="campo">
            <label>Número</label>
            <input
              type="text"
              name="numero"
              value={endereco.numero}
              onChange={handleEnderecoChange}
              required
            />
          </div>
          
          <div className="campo">
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              value={endereco.complemento}
              onChange={handleEnderecoChange}
            />
          </div>
          
          <div className="campo">
            <label>Bairro</label>
            <input
              type="text"
              name="bairro"
              value={endereco.bairro}
              onChange={handleEnderecoChange}
              required
              readOnly={!!endereco.bairro}
            />
          </div>
          
          <div className="campo-dupla">
            <div className="campo">
              <label>Cidade</label>
              <input
                type="text"
                name="localidade"
                value={endereco.localidade}
                onChange={handleEnderecoChange}
                required
                readOnly={!!endereco.localidade}
              />
            </div>
            
            <div className="campo">
              <label>UF</label>
              <input
                type="text"
                name="uf"
                value={endereco.uf}
                onChange={handleEnderecoChange}
                maxLength="2"
                required
                readOnly={!!endereco.uf}
              />
            </div>
          </div>

        </form>
      </main>
      <Footer />
    </>
  );
}