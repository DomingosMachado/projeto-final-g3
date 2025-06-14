import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./menumobile.module.css";

export function MenuMobile({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    setIsLogged(!!localStorage.getItem("token"));
    const onStorage = () => setIsLogged(!!localStorage.getItem("token"));
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
    onToggle();
    navigate("/");
  };

  return (
    <div className={styles.menuMobileOverlay} onClick={onToggle}>
      <div className={styles.menuMobile} onClick={(e) => e.stopPropagation()}>
        <div className={styles.menuHeader}>
          <h2 className={styles.menuTitle}>Menu</h2>
          <button className={styles.closeBtn} onClick={onToggle}>
            ✕
          </button>
        </div>

        <div className={styles.menuContent}>
          <ul>
            <li>
              <Link to="/" onClick={onToggle}>
                🏠 Início
              </Link>
            </li>
            <li>
              <Link to="/sobre" onClick={onToggle}>
                ℹ️ Sobre
              </Link>
            </li>
            <li>
              <Link to="/carrinho" onClick={onToggle}>
                🛒 Carrinho
              </Link>
            </li>
            {!isLogged && (
              <>
                <li>
                  <Link to="/login" onClick={onToggle}>
                    🔑 Entrar
                  </Link>
                </li>
                <li>
                  <Link to="/cadastro" onClick={onToggle}>
                    📝 Cadastrar
                  </Link>
                </li>
              </>
            )}
            {isLogged && (
              <>
                <li>
                  <Link to="/perfil" onClick={onToggle}>
                    👤 Perfil
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
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
                      width: "100%",
                      textAlign: "left",
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
        </div>
      </div>
    </div>
  );
}
