import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 Quartermasters FZC. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;