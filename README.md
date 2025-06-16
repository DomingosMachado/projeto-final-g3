# 🛒 E-Commerce React - Projeto Final G3

**Missão Concluída**: Sistema de e-commerce desenvolvido com React + Vite integrado à API REST.

## 📋 Sobre o Projeto

Sistema completo de e-commerce desenvolvido pelo **Grupo 3** como projeto final do curso **Serratec**. A aplicação oferece uma experiência de compra moderna e intuitiva, com gerenciamento de estado avançado e integração total com backend.

## 🎯 Funcionalidades Implementadas

### 🏠 **Homepage (Base de Lançamento)**

- Catálogo de produtos com imagens, nomes, descrições e preços
- Sistema de filtragem por categorias
- Busca avançada de produtos
- Botão "Adicionar ao Carrinho" integrado ao Context API

### 🛒 **Sistema de Carrinho (Centro de Operações)**

- **Context API** para gerenciamento global do estado
- Persistência dos itens no localStorage
- Cálculo automático de totais e frete
- **MiniCarrinho** com hover na navbar
- Finalização de compra com integração à API
- Validação de estoque em tempo real

### 🔐 **Autenticação & Perfil (Ponto de Acesso)**

- Login seguro com JWT tokens
- Cadastro de novos usuários com validações
- Perfil do usuário com dados editáveis
- Sistema de recuperação de senha
- Ativação de conta por email
- Logout com limpeza de sessão

### 📱 **Interface & Navegação**

- Design responsivo (Mobile-first)
- **React Router** para navegação SPA
- **CSS Modules** para estilização isolada
- Menu mobile com hamburger
- Toast notifications (react-hot-toast)
- Loading states e error boundaries

### 🌐 **Integração com Backend**

- Consumo completo da API REST
- Interceptors Axios para debug e tratamento de erros
- Upload e exibição de imagens de produtos
- Gerenciamento de pedidos
- Validação de dados no frontend e backend

## 🚀 Tecnologias Utilizadas

### **Frontend**

- **React 18** + **Vite** (Build tool moderna)
- **React Router DOM** (Navegação SPA)
- **Context API** (Gerenciamento de estado global)
- **Axios** (Requisições HTTP)
- **CSS Modules** (Estilização isolada)
- **React Hot Toast** (Notificações)
- **SweetAlert2** (Modais elegantes)

### **Backend Integration**

- **Spring Boot** API REST
- **JWT Authentication**
- **MySQL Database**
- **Cors** configurado para desenvolvimento

## 📁 Estrutura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── Navbar/          # Barra de navegação
│   ├── Footer/          # Rodapé
│   ├── Botao/           # Botão customizado
│   └── MenuMobile/      # Menu responsivo
├── pages/               # Páginas da aplicação
│   ├── homepage/        # Tela inicial
│   ├── carrinho/        # Carrinho de compras
│   ├── login/           # Autenticação
│   ├── cadastro/        # Registro de usuários
│   ├── perfil/          # Perfil do usuário
│   ├── produto/         # Detalhes do produto
│   └── sobre/           # Sobre a equipe
├── context/             # Context API
│   └── carrinhoContext.jsx  # Estado global do carrinho
├── services/            # Integração com API
│   └── api.js           # Configuração Axios
├── routes/              # Configuração de rotas
│   └── AppRouter.jsx    # Roteamento principal
└── assets/              # Recursos estáticos
```

### **Configuração da API**

```javascript
// src/services/api.js
const API_BASE_URL = "http://localhost:8080";
```

### **🎯 Membros & Responsabilidades**

<table>
<tr>
<td align="center">
<img src="https://github.com/pachecoCaua.png" width="100px;" alt="Cauã Pacheco"/><br>
<sub><b>👨‍💻 Cauã Pacheco</b></sub><br>
<a href="https://github.com/pachecoCaua">@pachecoCaua</a><br>
<em>📱 Perfil & User Management</em>
</td>
<td align="center">
<img src="https://github.com/Danzete.png" width="100px;" alt="Daniel Lopes"/><br>
<sub><b>👨‍💻 Daniel Lopes</b></sub><br>
<a href="https://github.com/Danzete">@Danzete</a><br>
<em>🔐 Cadastro, 404 & Auth Flow</em>
</td>
<td align="center">
<img src="https://github.com/DomingosMachado.png" width="100px;" alt="Domingos Machado"/><br>
<sub><b>👨‍💻 Domingos Machado</b></sub><br>
<a href="https://github.com/DomingosMachado">@DomingosMachado</a><br>
<em>🏠 Homepage & Produto</em>
</td>
</tr>
<tr>
<td align="center">
<img src="https://github.com/raycaThais.png" width="100px;" alt="Rayca Thais"/><br>
<sub><b>👩‍💻 Rayca Thais</b></sub><br>
<a href="https://github.com/raycaThais">@raycaThais</a><br>
<em>🛒 Carrinho & Mini Carrinho</em>
</td>
<td align="center">
<img src="https://github.com/rodschuab.png" width="100px;" alt="Rodrigo Schuab"/><br>
<sub><b>👨‍💻 Rodrigo Schuab</b></sub><br>
<a href="https://github.com/rodschuab">@rodschuab</a><br>
<em>ℹ️ Página Sobre & Documentação</em>
</td>
<td align="center">
<img src="https://github.com/Sai-czs.png" width="100px;" alt="Sabrina Siqueira"/><br>
<sub><b>👩‍💻 Sabrina Siqueira</b></sub><br>
<a href="https://github.com/Sai-czs">@Sai-czs</a><br>
<em>🔑 Login & Autenticação</em>
</td>
</tr>
</table>

---

## 📅 Entrega Final: 16/06/2025

**Status**: ✅ **MISSÃO CONCLUÍDA COM SUCESSO**

> Desenvolvido com ❤️ pelo Grupo 3 - Serratec 2025

## 🔗 Links Úteis

- [Documentação React](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Context API Guide](https://react.dev/reference/react/useContext)

## 📞 Contato da Equipe

**Grupo 3 - Turma Serratec 2025** 🎓
