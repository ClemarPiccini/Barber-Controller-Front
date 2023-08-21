import React from 'react';
import './styles.css';
import { useState } from 'react';

function Relatorio() {
  const [vendas, setVendas] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);

  function exportarRelatorio(tipoRelatorio, dataInicial, dataFinal) {
    const dados = tipoRelatorio === "vendas" ? vendas : agendamentos;

    const blob = new Blob([JSON.stringify(dados)], { type: "application/json" });

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = tipoRelatorio + ".json";

    document.body.appendChild(link);
    link.click();
  }

  return (
    <div>
      <h1>Relatório</h1>
      <ul>
        <li>
          <input type="radio" name="tipoRelatorio" value="vendas" checked /> Vendas
        </li>
        <li>
          <input type="radio" name="tipoRelatorio" value="agendamentos" /> Agendamentos
        </li>
      </ul>
      <input type="date" placeholder="Data inicial" />
      <input type="date" placeholder="Data final" />
      <button onClick={() => exportarRelatorio(document.querySelector("input[name='tipoRelatorio']").value, document.querySelector("input[type='date'][name='dataInicial']").value, document.querySelector("input[type='date'][name='dataFinal']").value)}>Exportar</button>
    </div>
  );
}

export default Relatorio;