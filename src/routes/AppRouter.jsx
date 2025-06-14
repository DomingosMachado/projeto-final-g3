import { Routes, Route } from "react-router-dom";
import { Homepage } from "../pages/homepage/homepage.jsx";
import { Sobre } from "../pages/sobre/sobre.jsx"

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/sobre" element={<Sobre />} />
     
    
    </Routes>
  );
}
