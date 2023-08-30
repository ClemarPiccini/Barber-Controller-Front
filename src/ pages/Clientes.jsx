import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [editingClientId, setEditingClientId] = useState(null);
  const [editingClientName, setEditingClientName] = useState('');
  const [editingClientPhone, setEditingClientPhone] = useState('');
  const [pageNumber, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage] = useState(6); // Número de clientes por página
  useEffect(() => {
    buscarClientes();
  }, [pageNumber]);

  function buscarClientes() {
    axios.get(`http://localhost:3001/clientes/paginados?_page=${pageNumber}&_limit=${perPage}`)
      .then(response => {
        setClientes(response.data.clientes);
        const totalCount = parseInt(response.headers['x-total-count']);
        setTotalPages(Math.ceil(totalCount / perPage));
        console.log(pageNumber, perPage, totalCount, totalPages)
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }
  function criarCliente(nome, telefone) {
    axios.post('http://localhost:3001/clientes', { nome, telefone })
      .then(response => {
        const novoCliente = response.data;
        setClientes([...clientes, novoCliente]);
      })
      .catch(error => {
        console.error('Erro ao criar cliente:', error);
      });
  }

  function iniciarEdicaoCliente(cliente) {
    setEditingClientId(cliente.id);
    setEditingClientName(cliente.nome);
    setEditingClientPhone(cliente.telefone);
  }

  function salvarEdicaoCliente(id) {
    axios.put(`http://localhost:3001/clientes/${id}`, {
      nome: editingClientName,
      telefone: editingClientPhone
    })
      .then(response => {
        const clienteAtualizado = response.data;
        setClientes(prevClientes => prevClientes.map(c => (c.id === id ? clienteAtualizado : c)));
        cancelarEdicaoCliente();
      })
      .catch(error => {
        console.error('Erro ao editar cliente:', error);
      });
  }

  function cancelarEdicaoCliente() {
    setEditingClientId(null);
    setEditingClientName('');
    setEditingClientPhone('');
  }

  function excluirCliente(id) {
    axios.delete(`http://localhost:3001/clientes/${id}`)
      .then(() => {
        setClientes(clientes.filter(cliente => cliente.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir cliente:', error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    criarCliente(nomeCliente, telefoneCliente);
    setNomeCliente('');
    setTelefoneCliente('');
  }

  return (
    <div className="clientes">
      <h1>Clientes</h1>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>
            {editingClientId === cliente.id ? (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  value={editingClientName}
                  onChange={e => setEditingClientName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={editingClientPhone}
                  onChange={e => setEditingClientPhone(e.target.value)}
                />
                <button onClick={() => salvarEdicaoCliente(cliente.id)}>Salvar</button>
                <button onClick={cancelarEdicaoCliente}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{cliente.nome}</strong>
                <p>{cliente.telefone}</p>
                <button onClick={() => iniciarEdicaoCliente(cliente)}>Editar</button>
                <button onClick={() => excluirCliente(cliente.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {pageNumber > 1 && <button onClick={() => setPage(pageNumber - 1)}>Anterior</button>}
        <span>Página {pageNumber} de {totalPages}</span>
        {pageNumber < totalPages && <button onClick={() => setPage(pageNumber + 1)}>Próxima</button>}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nomeCliente}
          onChange={e => setNomeCliente(e.target.value)}
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefoneCliente}
          onChange={e => setTelefoneCliente(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Clientes;
