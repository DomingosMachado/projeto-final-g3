import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Cadastro } from "../pages/cadastro/cadastro.jsx";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}
