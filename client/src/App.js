import React from 'react';
import { Button } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/employees/Login';
import Register from './pages/employees/Register';
import Home from './pages/Home';
import './styles/theme.css';
import './styles/layout.css'
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import { Toaster } from 'react-hot-toast'
import EmployeeHome from './pages/employees/EmployeeHome';
import ProtectedRoute from './components/ProtectedRoute';
import Students from './pages/employees/Students';


function App() {

  const { loading } = useSelector(state => state.alert);


  return (
    <div className="App">
      {loading ? <Spinner /> : null}
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employee" element={<ProtectedRoute><EmployeeHome /></ProtectedRoute>} />
          <Route path="/employee/students" element={<ProtectedRoute><Students/></ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
