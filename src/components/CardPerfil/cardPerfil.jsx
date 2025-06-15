import React from "react";
import styles from "./cardPerfil.module.css";

const CardPerfil = ({ usuario }) => {
  return (
    <div className={styles["card-perfil"]}>
      <h2>Perfil de {usuario.nome}</h2>
      <p><strong>Email:</strong> {usuario.email}</p>
      <p><strong>Telefone:</strong> {usuario.telefone}</p>
      <p><strong>Endereço:</strong> {usuario.endereco}</p>
    </div>
  );
};

export default CardPerfil;