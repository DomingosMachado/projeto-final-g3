import React from "react";
import styles from "./ConfirmDeleteUser.module.css"; 

export function ConfirmDeleteUser({ mensagem, aberto, onConfirm, onCancel }) {
  if (!aberto) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.placa}>
          <span className={styles.exclamacao}>!</span>
        </div>
        <p className={styles.mensagem}>{mensagem}</p>
        <div className={styles.botoes}>
          <button className={styles.confirm} onClick={onConfirm}>
            Sim, quero excluir
          </button>
          <button className={styles.cancel} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}