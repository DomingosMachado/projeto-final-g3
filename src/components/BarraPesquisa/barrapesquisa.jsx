import { useState } from "react";
import styles from "./barrapesquisa.module.css";

export function BarraPesquisa({ onPesquisar }) {
  const [valor, setValor] = useState("");

  function handleChange(e) {
    const novoValor = e.target.value;
    setValor(novoValor);
    onPesquisar(novoValor);
  }

  function limparBusca() {
    setValor("");
    onPesquisar("");
  }

  return (
    <div className={styles.barraPesquisa}>
      <div className={styles.inputContainer}>
        <span className={styles.icone}>🔍</span>
        <input
          type="text"
          placeholder="Busque por produtos, categorias ou descrições..."
          value={valor}
          onChange={handleChange}
          className={styles.input}
        />
        {valor && (
          <button
            onClick={limparBusca}
            className={styles.btnLimpar}
            type="button"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
