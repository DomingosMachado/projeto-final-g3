import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./navbar.module.css";
import { MenuMobile } from "../MenuMobile/menumobile";
import logo from "../../assets/novologo.png";
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

  // ADICIONADO: Funções para controlar o MiniCarrinho
  const handleMouseEnterCarrinho = () => {
    setMostrarMiniCarrinho(true);
  };

  const handleMouseLeaveCarrinho = () => {
    setMostrarMiniCarrinho(false);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Logo da Empresa" className={styles.logoImage} />
        </Link>

        {/* Menu Desktop */}
        <nav>
          <ul className={styles.navItens}>
            <li>
              <Link to="/" aria-label="Página inicial">
                Início
              </Link>
            </li>
            <li>
              <Link to="/sobre" aria-label="Sobre nós">
                Sobre
              </Link>
            </li>
            {/* MODIFICADO: Adicionar hover no carrinho */}
            <li
              className={styles.carrinhoContainer}
              onMouseEnter={handleMouseEnterCarrinho}
              onMouseLeave={handleMouseLeaveCarrinho}
            >
              <Link
                to="/carrinho"
                className={styles.carrinhoLink}
                aria-label={`Carrinho de compras com ${totalItens} ${
                  totalItens === 1 ? "item" : "itens"
                }`}
              >
                🛒 Carrinho
                {totalItens > 0 && (
                  <span className={styles.carrinhoCount} aria-hidden="true">
                    {totalItens > 99 ? "99+" : totalItens}
                  </span>
                )}
              </Link>

              {/* ADICIONADO: MiniCarrinho dentro do li do carrinho */}
              {mostrarMiniCarrinho && totalItens > 0 && (
                <div className={styles.miniCarrinhoWrapper}>
                  <MiniCarrinho onClose={() => setMostrarMiniCarrinho(false)} />
                </div>
              )}
            </li>

            {isLogged ? (
              <>
                <li>
                  <Link to="/perfil" aria-label="Meu perfil">
                    Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className={styles.logoutBtn}
                    aria-label="Sair da conta"
                  >
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" aria-label="Fazer login">
                    Entrar
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro" aria-label="Criar conta">
                    Cadastrar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Botão Menu Mobile */}
        <button
          className={styles.menuBtn}
          onClick={toggleMobileMenu}
          aria-label={showMenuMobile ? "Fechar menu" : "Abrir menu"}
          aria-expanded={showMenuMobile}
        >
          {showMenuMobile ? "✕" : "☰"}
        </button>
      </div>

      {/* Menu Mobile */}
      <MenuMobile isOpen={showMenuMobile} onToggle={toggleMobileMenu} />
    </header>
  );
}
