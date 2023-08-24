import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false); 

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email: username, 
        senha: password,
      });

      // Verificar a resposta do servidor e tomar as ações necessárias
      if (response.data.token) {
        console.log('Login bem-sucedido');
        setRedirectToDashboard(true); 
      } else {
        console.log('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };
  if (redirectToDashboard) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="principal">
      <h1>Bem-vindo à Barber Controller</h1>
      <p>Seu sistema de gerenciamento de barbearia</p>

      <div>
        <h2>Login</h2>
        <form>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Senha: </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleLogin}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Home;
