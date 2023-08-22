import React from 'react';
import './styles.css';
import { useState } from 'react';

function Estoque() {
  const [produtos, setProdutos] = useState([]);

  function criarProduto(nome, quantidade) {
    const novoProduto = {
      nome,
      quantidade
    };

    setProdutos([...produtos, novoProduto]);
  }

  function editarProduto(id, nome, quantidade) {
    const produto = produtos.find(produto => produto.id === id);

    produto.nome = nome;
    produto.quantidade = quantidade;

    setProdutos([...produtos.filter(produto => produto.id !== id), produto]);
  }

  function excluirProduto(id) {
    setProdutos(produtos.filter(produto => produto.id !== id));
  }

  return (
    <div class="estoque">
      <h1>Estoque</h1>
      <ul>
        {produtos.map((produto, i) => (
          <li key={i}>
            <strong>{produto.nome}</strong>
            <p>{produto.quantidade}</p>
            <button onClick={() => editarProduto(produto.id, produto.nome, produto.quantidade)}>Editar</button>
            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Nome" />
        <input type="number" placeholder="Quantidade" />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Estoque;