import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [nomeProduto, setNomeProduto] = useState('');
  const [quantidadeProduto, setQuantidadeProduto] = useState('');
  const [valorProduto, setValorProduto] = useState('');
  const [isBeverageProduto, setIsBeverageProduto] = useState(false); // Inicializado como falso
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingProductName, setEditingProductName] = useState('');
  const [editingProductQuantity, setEditingProductQuantity] = useState('');
  const [editingProductValor, setEditingProductValor] = useState('');
  const [editingProductisBeverage, setEditingProductisBeverage] = useState(false); // Inicializado como falso
  const bebidaProdutos = produtos.filter(produto => produto.isBeverage);
  const naoBebidaProdutos = produtos.filter(produto => !produto.isBeverage);

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

  function criarProduto(nome, quantidade, isBeverage, valor) {
    axios.post('http://localhost:3001/produtos', { nome, quantidade, isBeverage, valor })
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
    setEditingProductisBeverage(produto.isBeverage);
    setEditingProductValor(produto.valor);
  }

  function salvarEdicaoProduto(id) {
    axios.put(`http://localhost:3001/produtos/${id}`, {
      nome: editingProductName,
      quantidade: editingProductQuantity,
      isBeverage: editingProductisBeverage,
      valor: editingProductValor
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
    setEditingProductValor('');
    setEditingProductisBeverage(false); // Definir como falso
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
    criarProduto(nomeProduto, quantidadeProduto, isBeverageProduto, valorProduto);
    setNomeProduto('');
    setQuantidadeProduto('');
    setValorProduto('');
    setIsBeverageProduto(false); // Definir como falso
  }

  
  function handleIncreaseQuantity(id) {
    // Lógica para aumentar a quantidade do produto/bebida com o ID especificado
    const updatedProducts = produtos.map(p => {
      if (p.id === id) {
        return {
          ...p,
          quantidade: p.quantidade + 1,
        };
      }
      return p;
    });
    setProdutos(updatedProducts);
  }

  function handleDecreaseQuantity(id) {
    // Lógica para diminuir a quantidade do produto/bebida com o ID especificado
    const updatedProducts = produtos.map(p => {
      if (p.id === id && p.quantidade > 0) {
        return {
          ...p,
          quantidade: p.quantidade - 1,
        };
      }
      return p;
    });
    setProdutos(updatedProducts);
  }

  return (
    <div className="estoque">
      <h1>Estoque</h1>
      <div className='bebidas'>
        <h2>Bebidas</h2>
        <ul>
          {bebidaProdutos.map(produto => (
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
                  <input
                    type="number"
                    placeholder="Valor"
                    value={editingProductValor}
                    onChange={e => setEditingProductValor(e.target.value)}
                  />
                  <input
                    type="checkbox" // Use um checkbox para valores booleanos
                    checked={editingProductisBeverage}
                    onChange={e => setEditingProductisBeverage(e.target.checked)}
                  />
                  <button onClick={() => salvarEdicaoProduto(produto.id)}>Salvar</button>
                  <button onClick={cancelarEdicaoProduto}>Cancelar</button>
                </>
              ) : (
                <>
                  <strong>{produto.nome}</strong>
                  <p>{produto.quantidade}</p>
                  <p>{produto.valor}</p>
                  <p>{produto.isBeverage ? 'Bebida' : 'Produto'}</p>
                  <button onClick={() => iniciarEdicaoProduto(produto)}>Editar</button>
                  <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
                  <button onClick={() => handleIncreaseQuantity(produto.id)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(produto.id)}>-</button>
                </>
              )}
            </li>
          ))}
        </ul>
        
      </div>
      <div className='produtos'>
  <h2>Produtos</h2>
  <ul>
    {naoBebidaProdutos.map(produto => (
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
            <input
              type="number"
              placeholder="Valor"
              value={valorProduto}
              onChange={e => setEditingProductValor(e.target.value)}
            />
            <input
              type="checkbox" // Use um checkbox para valores booleanos
              checked={editingProductisBeverage}
              onChange={e => setEditingProductisBeverage(e.target.checked)}
            />
            <button onClick={() => salvarEdicaoProduto(produto.id)}>Salvar</button>
            <button onClick={cancelarEdicaoProduto}>Cancelar</button>
          </>
        ) : (
          <>
            <strong>{produto.nome}</strong>
            <p>{produto.quantidade}</p>
            <p>{produto.valor}</p>
            <p>{produto.isBeverage ? 'Bebida' : 'Produto'}</p>
            <button onClick={() => iniciarEdicaoProduto(produto)}>Editar</button>
            <button onClick={() => excluirProduto(produto.id)}>Excluir</button>
            <button onClick={() => handleIncreaseQuantity(produto.id)}>+</button>
            <button onClick={() => handleDecreaseQuantity(produto.id)}>-</button>
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
          <input
            type="number"
            placeholder="Valor"
            value={valorProduto}
            onChange={e => setValorProduto(e.target.value)}
          />
          <input
            type="checkbox" // Use um checkbox para valores booleanos
            checked={isBeverageProduto}
            onChange={e => setIsBeverageProduto(e.target.checked)}
          />
          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

export default Estoque;
