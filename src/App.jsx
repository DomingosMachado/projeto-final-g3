import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./routes/AppRouter";
import CarrinhoC from "./context/carrinhoContext";

function App() {
  return (
    <CarrinhoC>
      <AppRouter />
    </CarrinhoC>
  );
}

export default App;
