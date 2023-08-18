import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

function Dashboard() {
  return (
    <div>
      <h1>Painel de Controle</h1>
      <ul>
        <li><Link to="/agenda">Agenda</Link></li>
        <li><Link to="/estoque">Estoque</Link></li>
        <li><Link to="/relatorio">Relatório</Link></li>
        <li><Link to="/clientes">Clientes</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
