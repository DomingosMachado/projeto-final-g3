import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import { MenuMobile } from "../MenuMobile/menumobile"; // Import correto

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const toggleMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>🛍️ ShopHub</h1>
        </div>

        <ul className={styles.navItens}>
          <li>
            <Link to="/">Início</Link>
          </li>
          <li>
            <Link to="/sobre">Sobre</Link>
          </li>
          <li>
            <Link to="/carrinho">Carrinho</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/cadastro">Cadastro</Link>
          </li>
          <li>
            <Link to="/perfil">Perfil</Link>
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
