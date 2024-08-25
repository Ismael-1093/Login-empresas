// RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/RegisterE.css'; // Opcional: Adicione o CSS para estilização

const RegisterForm = () => {
    const [cnpj, setCnpj] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [fundacao, setFundacao] = useState('');
    const [site, setSite] = useState('');
    const [imagem, setImagem] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [buttonText, setButtonText] = useState('Registrar');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita o envio padrão do formulário

        const formData = new FormData();
        formData.append('cd_cnpj', cnpj.trim());
        formData.append('nm_empresa', nome.trim());
        formData.append('email', email.trim());
        formData.append('password', senha.trim());
        formData.append('telefone', telefone.trim());
        formData.append('dt_fundacao', fundacao);
        formData.append('ds_site', site.trim());
        if (imagem) formData.append('imagem', imagem);

        try {
            const response = await axios.post('http://localhost:5000/api/registerEmpresa', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.status === 'error') {
                setSuccess('');
                setError(response.data.error);
                setTimeout(() => setError(''), 3000);
            } else {
                setError('');
                setSuccess(response.data.success);
                setButtonText('Prosseguir');

                // Redirecionar para a página de registro de local após o sucesso
                setTimeout(() => {
                    navigate(`/register-local/${cnpj}`); // Atualize a URL com o CNPJ
                }, 3000); // Aguarda 3 segundos para mostrar a mensagem de sucesso
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Erro ao enviar requisição. Tente novamente.');
            setSuccess('');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagem(file);
            const imageURL = URL.createObjectURL(file);
            document.getElementById('previewImage').src = imageURL;
            document.getElementById('previewImage').style.display = 'block';
        }
    };

    return (
        <div className="register-container">
            <div className="register-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="cnpj">CNPJ:</label>
                        <input
                            type="text"
                            id="cnpj"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Digite o CNPJ"
                        />
                    </div>
                    <div>
                        <label htmlFor="nome">Nome da Empresa:</label>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite o nome da empresa"
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite o email"
                        />
                    </div>
                    <div>
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite a senha"
                        />
                    </div>
                    <div>
                        <label htmlFor="telefone">Telefone:</label>
                        <input
                            type="text"
                            id="telefone"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            placeholder="Digite o telefone"
                        />
                    </div>
                    <div>
                        <label htmlFor="fundacao">Data de Fundação:</label>
                        <input
                            type="date"
                            id="fundacao"
                            value={fundacao}
                            onChange={(e) => setFundacao(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="site">Site:</label>
                        <input
                            type="text"
                            id="site"
                            value={site}
                            onChange={(e) => setSite(e.target.value)}
                            placeholder="Digite o site"
                        />
                    </div>
                    <div>
                        <label htmlFor="imagem">Imagem:</label>
                        <input
                            type="file"
                            id="imagem"
                            onChange={handleImageChange}
                        />
                        <img id="previewImage" style={{ display: 'none', marginTop: '10px', maxWidth: '200px' }} alt="Preview" />
                    </div>
                    <div>
                        <button type="submit">{buttonText}</button>
                    </div>
                    {success && <div className="message success">{success}</div>}
                    {error && <div className="message error">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
