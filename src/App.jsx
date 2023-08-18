import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './ pages/Home';
import Dashboard from './ pages/Dashboard';
import Agenda from './ pages/Agenda';
import Clientes from './ pages/Clientes';
import Relatorio from './ pages/Relatorio';
import Estoque from './ pages/Estoque';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
