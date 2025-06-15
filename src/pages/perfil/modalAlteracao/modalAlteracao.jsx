import React from "react";
import styles from "./modalAlteracao.module.css";

export const ModalAlteracao = ({ usuario, setUsuario, fechar }) => {
  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fechar(); // fecha o modal após salvar
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Editar Informações</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input name="nome" value={usuario.nome} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input name="email" value={usuario.email} onChange={handleChange} />
          </label>
          <label>
            Telefone:
            <input name="telefone" value={usuario.telefone} onChange={handleChange} />
          </label>
          <label>
            Endereço:
            <input name="endereco" value={usuario.endereco} onChange={handleChange} />
          </label>
          <div className={styles.botoes}>
            <button type="submit">Salvar</button>
            <button type="button" onClick={fechar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};