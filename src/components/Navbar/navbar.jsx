import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import { MenuMobile } from "../MenuMobile/menumobile";

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const toggleMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

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
          <li>
            <Link to="/carrinho">🛒 Carrinho</Link>
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
          ☰
        </button>

        <MenuMobile isOpen={showMenuMobile} onToggle={toggleMenuMobile} />
      </nav>
    </>
  );
}
