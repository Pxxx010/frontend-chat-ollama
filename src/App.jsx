import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Agents from "./pages/Agents";
import AgentChat from "./pages/AgentChat";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#101010] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Chat />} />
          <Route path="/agentes" element={<Agents />} />
          <Route path="/agente/:id" element={<AgentChat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
