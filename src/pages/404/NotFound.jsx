import React from 'react';
import { Link } from 'react-router-dom';
import Ballpit from './Ballpit'; // Ajuste o caminho conforme necessário
import './NotFound.css'; // Criaremos este arquivo CSS

const NotFound = () => {
  return (
    <div className="not-found-container">
      {/* Fundo com as bolinhas interativas */}
      <div className="ballpit-wrapper">
        <Ballpit 
          count={404}
          gravity={0.4}
          friction={1}
          wallBounce={0.75}
          followCursor={false}

        />
      </div>
      
      {/* Conteúdo da página 404 */}
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Página não encontrada</h2>
        <p className="not-found-message">
          Parece que você se perdeu em meio às bolinhas...
        </p>
        <Link to="/" className="not-found-button">
          Voltar para a segurança
        </Link>
      </div>
    </div>
  );
};

export default NotFound;