import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import NotFound from "../pages/404/NotFound.jsx"
import { Cadastro } from "../pages/cadastro/cadastro.jsx";
import { AtivarConta } from "../pages/ativarConta/AtivarConta.jsx";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cadastro" element={<Cadastro/>}/>
      <Route path="*" element={<NotFound />} />
      <Route path="/ativarConta" element={<AtivarConta />} />
    </Routes>
  );
}
