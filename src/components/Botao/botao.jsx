import styles from "./botao.module.css";

export function Botao({ children, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`${styles.botao} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
