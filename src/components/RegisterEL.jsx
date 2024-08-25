// RegisterLocalForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/RegisterLocalForm.css';

const RegisterLocalForm = () => {
    const { cnpj } = useParams(); // Obtém o CNPJ da URL
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Verifica se o CNPJ está disponível
        if (!cnpj) {
            setErrorMessage('CNPJ não fornecido.');
        }
    }, [cnpj]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verificar se todos os campos foram preenchidos
        if (!cep || !endereco || !numero || !bairro || !cidade || !estado) {
            setErrorMessage('Todos os campos devem ser preenchidos.');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        const data = {
            cnpj, // Inclui o CNPJ nos dados
            cep,
            endereco,
            numero,
            bairro,
            cidade,
            estado
        };

        try {
            const response = await axios.post('http://localhost:5000/api/registerLocal', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status === 'error') {
                setSuccessMessage('');
                setErrorMessage(response.data.error);
                setTimeout(() => setErrorMessage(''), 3000);
            } else {
                setErrorMessage('');
                setSuccessMessage('Todos os campos foram preenchidos com sucesso.');
                setTimeout(() => {
                    window.location.href = '/login'; // Redireciona para a tela de login
                }, 3000); // Aguarda 3 segundos para mostrar a mensagem de sucesso
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Erro ao enviar requisição. Tente novamente.');
            setSuccessMessage('');
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    const handleCepChange = async (event) => {
        const cepValue = event.target.value;
        setCep(cepValue);

        if (cepValue.length === 8 && !isNaN(cepValue)) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setEndereco(data.logradouro || '');
                    setBairro(data.bairro || '');
                    setCidade(data.localidade || '');
                    setEstado(data.uf || '');
                }
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        }
    };

    return (
        <div className="register-local-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cep">CEP:</label>
                    <input
                        type="text"
                        id="cep"
                        value={cep}
                        onChange={handleCepChange}
                        placeholder="Digite o CEP"
                        maxLength="8"
                    />
                </div>
                <div>
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                        type="text"
                        id="endereco"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        placeholder="Digite o endereço"
                    />
                </div>
                <div>
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        placeholder="Digite o número"
                    />
                </div>
                <div>
                    <label htmlFor="bairro">Bairro:</label>
                    <input
                        type="text"
                        id="bairro"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        placeholder="Digite o bairro"
                    />
                </div>
                <div>
                    <label htmlFor="cidade">Cidade:</label>
                    <input
                        type="text"
                        id="cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        placeholder="Digite a cidade"
                    />
                </div>
                <div>
                    <label htmlFor="estado">Estado:</label>
                    <input
                        type="text"
                        id="estado"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        placeholder="Digite o estado"
                    />
                </div>
                <div>
                    <button type="submit">Registrar</button>
                </div>
                {successMessage && <div className="message success">{successMessage}</div>}
                {errorMessage && <div className="message error">{errorMessage}</div>}
            </form>
        </div>
    );
};

export default RegisterLocalForm;
