import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    buscarClientes();
  }, []);

  function buscarClientes() {
    axios.get('http://localhost:3001/clientes')  // Substitua pela URL correta da sua API
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }

  function criarCliente(nome, telefone, email) {
    axios.post('http://localhost:3001/clientes', { nome, telefone, email })  // Substitua pela URL correta da sua API
      .then(response => {
        const novoCliente = response.data;
        setClientes([...clientes, novoCliente]);
      })
      .catch(error => {
        console.error('Erro ao criar cliente:', error);
      });
  }

  function editarCliente(id, nome, telefone, email) {
    axios.put(`http://localhost:3001/clientes/${id}`, { nome, telefone, email })  // Substitua pela URL correta da sua API
      .then(response => {
        const clienteAtualizado = response.data;
        setClientes(prevClientes => prevClientes.map(c => (c.id === id ? clienteAtualizado : c)));
      })
      .catch(error => {
        console.error('Erro ao editar cliente:', error);
      });
  }

  function excluirCliente(id) {
    axios.delete(`http://localhost:3001/clientes/${id}`)  // Substitua pela URL correta da sua API
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir cliente:', error);
      });
  }

  return (
    <div class="clientes">
      <h1>Clientes</h1>
      <ul>
        {clientes.map((cliente, i) => (
          <li key={i}>
            <strong>{cliente.nome}</strong>
            <p>{cliente.telefone}</p>
            <p>{cliente.email}</p>
            <button onClick={() => editarCliente(cliente.id, cliente.nome, cliente.telefone, cliente.email)}>Editar</button>
            <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="Telefone" />
        <input type="text" placeholder="Email" />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Clientes;