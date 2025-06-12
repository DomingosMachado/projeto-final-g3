import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar/navbar.jsx';
import { Footer } from '../../components/Footer/footer.jsx';
import './cadastro.css';
import { Link } from 'react-router-dom';


export function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataDeNascimento: '',
    genero: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    email: '',
    senha: '',
    confirmacaoSenha: ''
  });
  const [mensagem, setMensagem] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmacaoSenha' || e.target.name === 'senha') {

      // Verifica se as senhas coincidem
      if (

        (e.target.name === 'confirmacaoSenha' && e.target.value !== form.senha) ||
        (e.target.name === 'senha' && form.confirmacaoSenha && e.target.value !== form.confirmacaoSenha)

      ) {
        setErroSenha('As senhas não coincidem');
      } else {
        setErroSenha('');
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    //senha diferente
    if (form.senha !== form.confirmacaoSenha) {
      setErroSenha('As senhas não coincidem');
      return;
    }
    setMensagem('Cadastro realizado com sucesso!');
    setForm({
      nome: '',
      cpf: '',
      dataDeNascimento: '',
      genero: '',
      telefone: '',
      cep: '',
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      email: '',
      senha: '',
      confirmacaoSenha: ''
    });
    setErroSenha('');
    setTimeout(() => setMensagem(''), 3000);
  }

  async function handleCepBlur(e) {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          rua: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || ''
        }));
      }
    } catch (error) {
      // Você pode exibir uma mensagem de erro se quiser
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <form onSubmit={handleSubmit} className="cadastro-form">
          <h2>Cadastro</h2>
          <div>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              placeholder="Digite seu nome"
            />
          </div>
          <div>
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              required
              placeholder="Digite seu CPF"
              maxLength={14}
            />
          </div>
          <div>
            <label htmlFor="dataDeNascimento">Data de Nascimento</label>
            <input
              type="date"
              id="dataDeNascimento"
              name="dataDeNascimento"
              value={form.dataDeNascimento}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="genero">Gênero</label>
            <select
              id="genero"
              name="genero"
              value={form.genero}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
              <option value="OUTRO">Outro</option>
              <option value="PREFIRO_NAO_DIZER">Prefiro não dizer</option>
            </select>
          </div>
          <div>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              required
              placeholder="(00) 00000-0000"
              maxLength={15}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Digite seu e-mail"
            />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              required
              placeholder="Crie uma senha"
              minLength={6}
            />
          </div>
          <div>
            <label htmlFor="confirmacaoSenha">Confirme a Senha</label>
            <input
              type="password"
              id="confirmacaoSenha"
              name="confirmacaoSenha"
              value={form.confirmacaoSenha}
              onChange={handleChange}
              required
              placeholder="Confirme sua senha"
              minLength={6}
            />
            {erroSenha && (
              <span style={{ color: 'red', fontSize: '0.95em' }}>{erroSenha}</span>
            )}
          </div>
          <button type="submit" disabled={!!erroSenha}>Cadastrar</button>
          <a>Já tem uma conta? <Link to="/login" className="link-login" style={{ textDecoration: 'none', color: '#4f46e5', justifyContent: 'center', display: 'flex', marginTop: '10px'  }}>
            Faça login
          </Link></a>
        </form>
     <form onSubmit={handleSubmit} className="endereco-form">
          <h2>Endereço</h2>
          {mensagem && <p className="success-message">{mensagem}</p>}
         <div>
            <label htmlFor="cep">CEP</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              onBlur={handleCepBlur}
              required
              placeholder="Digite seu CEP"
              maxLength={9}
            />
          </div>
          <div>
            <label htmlFor="rua">Rua</label>
            <input
              type="text"
              id="rua"
              name="rua"
              value={form.rua}
              onChange={handleChange}
              required
              placeholder="Digite o nome da rua"
            />
          </div>
          <div>
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={form.numero}
              onChange={handleChange}
              required
              placeholder="Digite o Número"
              maxLength={6}
            />
          </div>
          <div>
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
              placeholder="Apartamento, bloco, etc. (opcional)"
            />
          </div>
          <div>
            <label htmlFor="bairro">Bairro</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              required
              placeholder="Digite o bairro"
            />
          </div>
          <div>
            <label htmlFor="cidade">Cidade</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
              placeholder="Digite a cidade"
            />
          </div>
          <div>
            <label htmlFor="estado">Estado</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
              placeholder="Digite o estado"
              maxLength={2}
              style={{ textTransform: 'uppercase' }}
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}