import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState('');
  const [editingProductQuantity, setEditingProductQuantity] = useState('');

  useEffect(() => {
    buscarProdutos();
  }, []);

  function buscarProdutos() {
    axios.get('http://localhost:3001/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
      });
  }

  function criarProduto(nome, quantidade) {
    axios.post('http://localhost:3001/produtos', { nome, quantidade })
      .then(response => {
        const novoProduto = response.data;
        setProdutos([...produtos, novoProduto]);
      })
      .catch(error => {
        console.error('Erro ao criar produto:', error);
      });
  }

  function iniciarEdicaoProduto(produto) {
    setEditingProductId(produto.id);
    setEditingProductName(produto.nome);
    setEditingProductQuantity(produto.quantidade);
  }

  function salvarEdicaoProduto(id) {
    axios.put(`http://localhost:3001/produtos/${id}`, {
      nome: editingProductName,
      quantidade: editingProductQuantity
    })
      .then(response => {
        const produtoAtualizado = response.data;
        setProdutos(prevProdutos => prevProdutos.map(p => (p.id === id ? produtoAtualizado : p)));
        cancelarEdicaoProduto();
      })
      .catch(error => {
        console.error('Erro ao editar produto:', error);
      });
  }

  function cancelarEdicaoProduto() {
    setEditingProductId(null);
    setEditingProductName('');
    setEditingProductQuantity('');
  }

  function excluirProduto(id) {
    axios.delete(`http://localhost:3001/produtos/${id}`)
      .then(() => {
        setProdutos(produtos.filter(produto => produto.id !== id));
      })
      .catch(error => {
        console.error('Erro ao excluir produto:', error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    criarProduto(nomeProduto, quantidadeProduto);
    setNomeProduto('');
    setQuantidadeProduto('');
  }

  return (
    <div className="estoque">
      <h1>Estoque</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {editingProductId === produto.id ? (
              <>
                <input
                  type="text"
                  placeholder="Nome"
                  value={editingProductName}
                  onChange={e => setEditingProductName(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Quantidade"
                  value={editingProductQuantity}
                  onChange={e => setEditingProductQuantity(e.target.value)}
                />
                <button onClick={() => salvarEdicaoProduto(produto.id)}>Salvar</button>
                <button onClick={cancelarEdicaoProduto}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{produto.nome}</strong>
                <p>{produto.quantidade}</p>
                <button onClick={() => iniciarEdicaoProduto(produto)}>Editar</button>
                <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nomeProduto}
          onChange={e => setNomeProduto(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidadeProduto}
          onChange={e => setQuantidadeProduto(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Estoque;
