import React, { useState } from 'react';
import ForgotPasswordForm from '../../components/EsqueciSenha/esqueciSenha.jsx';
import ResetPasswordForm from '../../components/EsqueciSenha/resetSenha.jsx';
import './esqueciSenha.css';

export default function EsqueciSenhaPage() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');

    return (
        <main className="esqueci-senha-container">
            <div className="esqueci-senha-card">
                {step === 1 && (
                    <ForgotPasswordForm onSuccess={(email) => { setEmail(email); setStep(2); }} />
                )}
                {step === 2 && (
                    <ResetPasswordForm email={email} />
                )}
            </div>
        </main>
    );
}