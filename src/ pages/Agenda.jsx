import React from 'react';
import './styles.css';
import { useState } from 'react';

function Agenda() {
  const [compromissos, setCompromissos] = useState([]);

  function criarCompromisso(titulo, data, hora) {
    const novoCompromisso = {
      titulo,
      data,
      hora
    };

    setCompromissos([...compromissos, novoCompromisso]);
  }

  function editarCompromisso(id, titulo, data, hora) {
    const compromisso = compromissos.find(compromisso => compromisso.id === id);

    compromisso.titulo = titulo;
    compromisso.data = data;
    compromisso.hora = hora;

    setCompromissos([...compromissos.filter(compromisso => compromisso.id !== id), compromisso]);
  }

  function excluirCompromisso(id) {
    setCompromissos(compromissos.filter(compromisso => compromisso.id !== id));
  }

  return (
    <div class="agenda">
      <h1>Agenda</h1>
      <ul>
        {compromissos.map((compromisso, i) => (
          <li key={i}>
            <strong>{compromisso.titulo}</strong>
            <p>{compromisso.data}</p>
            <p>{compromisso.hora}</p>
            <button onClick={() => editarCompromisso(compromisso.id, compromisso.titulo, compromisso.data, compromisso.hora)}>Editar</button>
            <button onClick={() => excluirCompromisso(compromisso.id)}>Excluir</button>
          </li>
        ))}
      </ul>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Título" />
        <input type="date" placeholder="Data" />
        <input type="time" placeholder="Hora" />
        <button type="submit">Criar</button>
      </form>
    </div>
  );
}

export default Agenda;