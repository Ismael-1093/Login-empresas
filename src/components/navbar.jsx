import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/navbar.css'; // Certifique-se de que o arquivo CSS exista

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpar dados de autenticação (exemplo: removendo token do localStorage)
        localStorage.removeItem('authToken'); // Exemplo de remoção do token

        // Redirecionar para a página de login
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1>enCargo Caiçara</h1>
            </div>
            <div className="navbar-links">
                <Link to="/login">Login</Link>
                <Link to="/register">Cadastro</Link>
                <button onClick={handleLogout} className="logout-button">Sair</button>
            </div>
        </nav>
    );
};

export default Navbar;
