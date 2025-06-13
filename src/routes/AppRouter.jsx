import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Carrinho } from "../pages/carrinho/carrinho.jsx";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
      <Route path="/carrinho" element={<Carrinho/>}/> 
    
    </Routes>
  );
}
