import { Link } from "react-router-dom";
import styles from "./menumobile.module.css";

export function MenuMobile({ isOpen, onToggle }) {
  if (!isOpen) return null;

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
            <li>
              <Link to="/perfil" onClick={onToggle}>
                👤 Perfil
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
