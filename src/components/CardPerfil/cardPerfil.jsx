import React, { useState } from "react";
import styles from "./cardPerfil.module.css";

const CardPerfil = ({ usuario }) => {
  const [expanded, setExpanded] = useState(false);  // <-- Declarar o estado aqui

  function formatarEndereco(endereco) {
    if (!endereco) return "";
    return `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, ${endereco.cep}`;
  }

  return (
    <div
      className={`${styles["card-perfil"]} ${expanded ? styles.expanded : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className={styles.titulo}>Perfil de {usuario.nome}</div>
      <div className={styles["card-content"]}>
        <p><strong>Email:</strong> {usuario.email}</p>
        <p><strong>Telefone:</strong> {usuario.telefone}</p>
        <p><strong>Endereço:</strong> {formatarEndereco(usuario.endereco)}</p>
      </div>
    </div>
  );
};

export default CardPerfil;