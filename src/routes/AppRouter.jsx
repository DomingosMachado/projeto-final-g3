import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Carrinho } from "../pages/carrinho/carrinho.jsx";
import Login from "../pages/login/login.jsx";
import { Cadastro } from "../pages/cadastro/cadastro";
import ProdutoPage from "../pages/produto/ProdutoPage";
import NotFound from "../pages/404/NotFound.jsx";
import { AtivarConta } from "../pages/ativarConta/ativarConta.jsx";
import  EsqueciSenhaPage  from "../pages/esqueciSenha/esqueciSenha.jsx";



export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/produto/:nome" element={<ProdutoPage />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/ativarConta" element={<AtivarConta />} />
      <Route path="/esqueciSenha" element={<EsqueciSenhaPage />} />
    
    </Routes>
  );
}
