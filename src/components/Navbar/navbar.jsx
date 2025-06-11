import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./navbar.module.css";
import MobileMenu from "./MobileMenu";

export function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1 className={styles.logoText}>🛍️ ShopHub</h1>
        </div>

        {/* Desktop Navigation */}
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

        <MobileMenu isOpen={showMobileMenu} onToggle={toggleMobileMenu} />
      </nav>
    </>
  );
}
