import React, { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordForm({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/esqueciSenha/solicitarRecuperacao', { email });
            setMessage('Código de recuperação enviado por e-mail.');
            onSuccess(email);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                typeof error.response.data === 'string' &&
                (
                    error.response.data.includes('violates unique constraint') ||
                    error.response.data.includes('restrição de unicidade') ||
                    error.response.data.includes('já existe')
                )
            ) {
                // Vai direto para o componente de reset
                onSuccess(email);
            } else {
                setMessage('Erro ao enviar o código de recuperação. Tente novamente.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Esqueci a Senha</h2>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Solicitar Recuperação</button>
            {message && <p>{message}</p>}
        </form>
    );
}