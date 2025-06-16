import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ResetPasswordForm({ email }) {
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/esqueciSenha/redefinirSenha', {
                email,
                codigo,
                novaSenha
            });
            setMessage('Senha redefinida com sucesso.');
            navigate('/login'); // Redireciona para a página de login após redefinir a senha
        } catch (error) {
            setMessage('Erro ao redefinir senha');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Redefinir Senha</h2>
            <div>
                <label>Código recebido:</label>
                <input
                    type="text"
                    value={codigo}
                    onChange={(e) => setCodigo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Nova Senha:</label>
                <input
                    type="password"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Redefinir Senha</button>
            {message && <p>{message}</p>}
        </form>
    );
}