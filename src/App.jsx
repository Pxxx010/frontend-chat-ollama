import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Chat from "./pages/Chat";
import Agents from "./pages/Agents";
import AgentChat from "./pages/AgentChat";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const handleLogin = (credentials) => {
    // Sua lógica de autenticação aqui
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#101010] text-white">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/agentes" element={isAuthenticated ? <Agents /> : <Navigate to="/login" />} />
          <Route path="/agente/:id" element={isAuthenticated ? <AgentChat /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
