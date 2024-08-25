import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginE';
import RegisterForm from './components/RegisterE';
import HomePage from './components/HomePageE'; // Importe o componente HomePage
import Navbar from './components/navbar';
import RegisterLocalForm from './components/RegisterEL';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/registerLocal" element={<RegisterLocalForm />} />
                {/* Adicione outras rotas conforme necessário */}
            </Routes>
        </Router>
    );
};

export default App;
