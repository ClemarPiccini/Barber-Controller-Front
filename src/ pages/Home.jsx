import React, { useState } from 'react';
import './styles.css';

function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform your login logic here
    console.log('Username:', username);
    console.log('Password:', password);
  };

  return (
    <div>
      <h1>Bem-vindo à Barber Controller</h1>
      <p>Seu sistema de gerenciamento de barbearia</p>

      <div>
        <h2>Fazer Login</h2>
        <form>
          <div>
            <label>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
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
