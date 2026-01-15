import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AccidentDetail from './pages/AccidentDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/accident/:id" element={<AccidentDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
