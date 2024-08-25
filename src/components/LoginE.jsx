import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/LoginE.css'; // Importa o arquivo CSS

const LoginForm = () => {
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [buttonText, setButtonText] = useState('Login');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const login = { cnpj, password };

        try {
            const response = await axios.post('http://localhost:5000/api/loginE', login, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setSuccess(response.data.success);
            setError('');
            setButtonText('Ir para a Página Principal');
            
            // Redirecionar após o sucesso
            setTimeout(() => {
                navigate('/'); // Redireciona para a página inicial
            }, 1000); // Aguarda 1 segundo para mostrar a mensagem de sucesso
        } catch (error) {
            console.error('Erro no login:', error);
            setError(error.response?.data?.error || 'Erro no servidor');
            setSuccess('');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input
                            type="text"
                            id="cnpj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Digite seu CNPJ"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </div>
                    <div>
                        <button type="submit">{buttonText}</button>
                    </div>
                    {success && <div className="message success">{success}</div>}
                    {error && <div className="message error">{error}</div>}
                </form>
                <div className="register-link">
                    <p>Não tem uma conta? <Link to="/register">Cadastre-se</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
