import React from 'react';
import './styles.css';
import { useState } from 'react';

function Clientes() {
  const [clientes, setClientes] = useState([]);

  function criarCliente(nome, telefone, email) {
    const novoCliente = {
      nome,
      telefone,
      email
    };

    setClientes([...clientes, novoCliente]);
  }

  function editarCliente(id, nome, telefone, email) {
    const cliente = clientes.find(cliente => cliente.id === id);

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.email = email;

    setClientes([...clientes.filter(cliente => cliente.id !== id), cliente]);
  }

  function excluirCliente(id) {
    setClientes(clientes.filter(cliente => cliente.id !== id));
  }

  return (
    <div>
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