import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Carrinho } from "../pages/carrinho/carrinho.jsx";
import Login from "../pages/login/login.jsx";
import ProdutoPage from "../pages/produto/ProdutoPage";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/produto/:nome" element={<ProdutoPage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/carrinho" element={<Carrinho />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
