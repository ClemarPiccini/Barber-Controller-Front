import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';

function Agenda() {
  const [compromissos, setCompromissos] = useState([]);
  const [servico, setServico] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [cliente, setCliente] = useState('');
  const [editingCompromissoId, setEditingCompromissoId] = useState(null);
  const [editingServico, setEditingServico] = useState('');
  const [editingData, setEditingData] = useState('');
  const [editingHorario, setEditingHorario] = useState('');
  const [editingCliente, setEditingCliente] = useState('');

  useEffect(() => {
    buscarCompromissos();
  }, []);

  function buscarCompromissos() {
    axios.get('http://localhost:3001/horarios')
      .then(response => {
        setCompromissos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar compromissos:', error);
      });
  }

  function criarCompromisso() {
    axios.post('http://localhost:3001/horarios', { servico, data, horario, cliente })
      .then(response => {
        const novoCompromisso = response.data;
        setCompromissos([...compromissos, novoCompromisso]);
        cancelarEdicaoCompromisso();
      })
      .catch(error => {
        console.error('Erro ao criar compromisso:', error);
      });
  }

  function iniciarEdicaoCompromisso(compromisso) {
    setEditingCompromissoId(compromisso.id);
    setEditingServico(compromisso.servico);
    setEditingData(compromisso.data);
    setEditingHorario(compromisso.horario);
    setEditingCliente(compromisso.cliente);
  }

  function salvarEdicaoCompromisso(id) {
    axios.put(`http://localhost:3001/horarios/${id}`, {
      servico: editingServico,
      data: editingData,
      horario: editingHorario,
      cliente: editingCliente
    })
      .then(response => {
        const compromissoAtualizado = response.data;
        setCompromissos(prevCompromissos => prevCompromissos.map(c => (c.id === id ? compromissoAtualizado : c)));
        cancelarEdicaoCompromisso();
      })
      .catch(error => {
        console.error('Erro ao editar compromisso:', error);
      });
  }

  function cancelarEdicaoCompromisso() {
    setEditingCompromissoId(null);
    setEditingServico('');
    setEditingData('');
    setEditingHorario('');
    setEditingCliente('');
  }

  function excluirCompromisso(id) {
    axios.delete(`http://localhost:3001/horarios/${id}`)
      .then(() => {
        const updatedCompromissos = compromissos.filter(compromisso => compromisso.id !== id);
        setCompromissos(updatedCompromissos);
      })
      .catch(error => {
        console.error('Erro ao excluir compromisso:', error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    criarCompromisso();
  }

  return (
    <div className="agenda">
      <h1>Agenda</h1>
      <ul>
        {compromissos.map(compromisso => (
          <li key={compromisso.id}>
            {editingCompromissoId === compromisso.id ? (
              <>
                <input
                  type="text"
                  placeholder="Serviço"
                  value={editingServico}
                  onChange={e => setEditingServico(e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Data"
                  value={editingData}
                  onChange={e => setEditingData(e.target.value)}
                />
                <input
                  type="time"
                  placeholder="Hora"
                  value={editingHorario}
                  onChange={e => setEditingHorario(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Cliente"
                  value={editingCliente}
                  onChange={e => setEditingCliente(e.target.value)}
                />
                <button onClick={() => salvarEdicaoCompromisso(compromisso.id)}>Salvar</button>
                <button onClick={cancelarEdicaoCompromisso}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{compromisso.servico}</strong>
                <p>{compromisso.data}</p>
                <p>{compromisso.horario}</p>
                <p>{compromisso.cliente}</p>
                <button onClick={() => iniciarEdicaoCompromisso(compromisso)}>Editar</button>
                <button onClick={() => excluirCompromisso(compromisso.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Serviço"
          value={servico}
          onChange={e => setServico(e.target.value)}
        />
        <input
          type="date"
          placeholder="Data"
          value={data}
          onChange={e => setData(e.target.value)}
        />
        <input
          type="time"
          placeholder="Hora"
          value={horario}
          onChange={e => setHorario(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cliente"
          value={cliente}
          onChange={e => setCliente(e.target.value)}
        />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Agenda;
