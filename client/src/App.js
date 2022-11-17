import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/employees/Login';
import Register from './pages/employees/Register';
import Home from './pages/Home';
import './styles/theme.css';
import './styles/layout.css'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
