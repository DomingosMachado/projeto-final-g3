import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { MenuMobile } from "../MenuMobile/menumobile";
import logo from "../../assets/logo.png";
import { MiniCarrinho } from "../../pages/carrinho/miniCarrinho/miniCarrinho";
import { useCarrinho } from "../../context/carrinhoContext";

export function Navbar() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const [mostrarMiniCarrinho, setMostrarMiniCarrinho] = useState(false);
  const { totalItens } = useCarrinho();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    window.location.href = "/";
  };

  const toggleMobileMenu = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo" className={styles.logoImage} />
        </Link>

        {/* Menu Desktop */}
        <ul className={styles.navItens}>
          <li>
            <Link to="/">🏠 Início</Link>
          </li>
          <li>
            <Link to="/sobre">ℹ️ Sobre</Link>
          </li>
          <li>
            <Link to="/carrinho" className={styles.carrinhoLink}>
              🛒 Carrinho
              {totalItens > 0 && (
                <span className={styles.carrinhoCount}>{totalItens}</span>
              )}
            </Link>
          </li>

          {isLogged ? (
            <>
              <li>
                <Link to="/perfil">👤 Perfil</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/cadastro">Cadastrar</Link>
              </li>
            </>
          )}
        </ul>

        {/* Botão Menu Mobile */}
        <button
          className={styles.menuBtn}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Usando o MenuMobile existente com as props corretas */}
      <MenuMobile isOpen={showMenuMobile} onToggle={toggleMobileMenu} />

      {mostrarMiniCarrinho && (
        <MiniCarrinho onClose={() => setMostrarMiniCarrinho(false)} />
      )}
    </header>
  );
}
