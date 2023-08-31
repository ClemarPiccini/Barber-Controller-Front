import React, { useState, useEffect } from 'react';

import axios from 'axios';

function Agenda() {
  const [compromissos, setCompromissos] = useState([]);
  const [servicoNome, setServico] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [clienteNome, setCliente] = useState('');
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
    axios.post('http://localhost:3001/horarios', { servicoNome, data, horario, clienteNome })
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
    setEditingServico(compromisso.servicoNome);
    setEditingData(compromisso.data);
    setEditingHorario(compromisso.horario);
    setEditingCliente(compromisso.clienteNome);
  }

  function salvarEdicaoCompromisso(id) {
    axios.put(`http://localhost:3001/horarios/${id}`, {
      servicoNome: editingServico,
      data: editingData,
      horario: editingHorario,
      clienteNome: editingCliente
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

  
    function renderFormularioCriacao() {
      return (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Serviço"
            value={servicoNome}
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
            value={clienteNome}
            onChange={e => setCliente(e.target.value)}
          />
          <button type="submit">Criar</button>
        </form>
      );
    }
  
    return (
      <div className="agenda">
        <h1>Agenda Eletrônica</h1>
        {renderFormularioCriacao()}
  
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
                  <strong>{compromisso.servicoNome}</strong>
                  <p>{compromisso.data}</p>
                  <p>{compromisso.horario}</p>
                  <p>{compromisso.clienteNome}</p>
                  <button onClick={() => iniciarEdicaoCompromisso(compromisso)}>Editar</button>
                  <button onClick={() => excluirCompromisso(compromisso.id)}>Excluir</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Agenda;