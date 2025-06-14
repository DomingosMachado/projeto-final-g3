import styles from "./botao.module.css";

export function Botao({ children, onClick, type = "button", className = "", disabled }) {
  return (
    <button
      type={type}
      className={`${styles.botao} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
