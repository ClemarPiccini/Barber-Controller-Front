import React from 'react';
import './styles.css';

function Dashboard() {
  return (
    <div class="dashboard">
      <h1 class="dashboardh1">Painel de Controle</h1>
      <nav onClick={() => {
        document.querySelector('nav').classList.toggle('open');
      }}>
        <ul>
          <li><a href="agenda">Agenda</a></li>
          <li><a href="estoque">Estoque</a></li>
          <li><a href="clientes">Clientes</a></li>
          <li><a href="relatorio">Relatório</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;