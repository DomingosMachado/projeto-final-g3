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

  // Detecta se está logado (token no localStorage)
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
    // Opcional: escutar mudanças no localStorage
    const onStorage = () => setIsLogged(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleMenuMobile = () => {
    setShowMenuMobile(!showMenuMobile);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logoImage} />
          </Link>
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
            onMouseLeave={() => setMostrarMiniCarrinho(false)}
          >
            <Link to="/carrinho" className={styles.carrinhoLink}>
              🛒 Carrinho
              {totalItens() > 0 && <span>{totalItens()}</span>}
            </Link>
            {mostrarMiniCarrinho && <MiniCarrinho />}
          </li>
          {!isLogged && (
            <>
              <li>
                <Link to="/login">Entrar</Link>
              </li>
              <li>
                <Link to="/cadastro">Cadastrar</Link>
              </li>
            </>
          )}
          {isLogged && (
            <>
              <li>
                <Link to="/perfil">👤 Perfil</Link>
              </li>
              <li>
                <button
                  className={styles.logoutBtn}
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLogged(false);
                  }}
                  style={{
                    background:
                      "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: 600,
                    borderRadius: "10px",
                    padding: "8px 18px",
                    fontSize: "1rem",
                    marginLeft: "8px",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.filter = "brightness(1.1)")
                  }
                  onMouseOut={(e) => (e.currentTarget.style.filter = "none")}
                >
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>

        <button className={styles.menuBtn} onClick={toggleMenuMobile}>
          &#9776;
        </button>

        <MenuMobile isOpen={showMenuMobile} onToggle={toggleMenuMobile} />
      </nav>
    </>
  );
}
