import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import { MenuMobile } from "../MenuMobile/menumobile";
import { MiniCarrinho } from "../../pages/carrinho/miniCarrinho/miniCarrinho";
import { useCarrinho } from "../../context/carrinhoContext";

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const toggleMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  const [mostrarMiniCarrinho, setMostrarMiniCarrinho] = useState(false)
  const { totalItens} = useCarrinho();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>🛍️ Grupo 3</h1>
        </div>

        <ul className={styles.navItens}>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li
            onMouseEnter={() => setMostrarMiniCarrinho(true)}
            onMouseLeave={() => setMostrarMiniCarrinho(false)}>
            <Link to="/carrinho">🛒 Carrinho
              {totalItens() > 0 && (
                <span >{totalItens()}</span>
              )}
            </Link>
            {mostrarMiniCarrinho && <MiniCarrinho />}
          </li>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastrar</Link>
          </li>
          <li>
            <Link to="/perfil">👤 Perfil</Link>
          </li>
        </ul>

        <button className={styles.menuBtn} onClick={toggleMenuMobile}>
          &#9776;
        </button>

        <MenuMobile isOpen={showMenuMobile} onToggle={toggleMenuMobile} />
      </nav>
    </>
  );
}
