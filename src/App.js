import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddEditUserPage from './pages/AddEditUserPage';
import './styles/styles.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddEditUserPage />} />
        <Route path="/edit/:id" element={<AddEditUserPage />} />
      </Routes>
    </Router>
  );
}

export default App;
