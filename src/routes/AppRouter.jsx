import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Carrinho } from "../pages/carrinho/carrinho.jsx";
import Login from "../pages/login/login.jsx";
import { Cadastro } from "../pages/cadastro/cadastro.jsx";
import NotFound from "../pages/404/NotFound.jsx"


export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="*" element={<NotFound/>} />
      <Route path="/carrinho" element={<Carrinho/>}/> 
      <Route path="/login" element={<Login/>}/> 
    
    </Routes>
  );
}
