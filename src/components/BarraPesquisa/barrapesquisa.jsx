import { useState } from "react";
import styles from "./barrapesquisa.module.css";

export function BarraPesquisa({ onPesquisar }) {
  const [valor, setValor] = useState("");

  function handleChange(e) {
    setValor(e.target.value);
    onPesquisar(e.target.value);
  }

  return (
    <div className={styles.barraPesquisa}>
      <input
        type="text"
        placeholder="Pesquisar produtos..."
        value={valor}
        onChange={handleChange}
        className={styles.input}
      />
    </div>
  );
}
