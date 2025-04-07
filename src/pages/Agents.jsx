import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMoreVertical, FiEdit2, FiTrash2 } from "react-icons/fi";
import CreateAgentModal from "../components/CreateAgentModal";

export default function Agents() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingAgent, setEditingAgent] = useState(null);

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem("agents");
    if (saved && saved !== "[]") return JSON.parse(saved);

    const defaultAgents = [
      {
        id: 1,
        name: "Historiador",
        description:
          "Analisa a evolução da IA comparando com revoluções tecnológicas históricas, como a Revolução Industrial.",
        personality: "Reflexivo, contextual e analítico",
        model: "llama3",
      },
      {
        id: 2,
        name: "Cientista de Dados",
        description:
          "Foca em métricas quantitativas e dados sobre produtividade e impacto no emprego.",
        personality: "Objetivo e baseado em dados",
        model: "llama3",
      },
      {
        id: 3,
        name: "Advogado",
        description:
          "Analisa riscos éticos, trabalhistas e regulatórios relacionados à IA.",
        personality: "Rigoroso, técnico e legalista",
        model: "llama3",
      },
      {
        id: 4,
        name: "Designer de Produto",
        description:
          "Foca na experiência do usuário e na interação humano-máquina durante a adoção da IA.",
        personality: "Criativo, empático e centrado no usuário",
        model: "llama3",
      },
    ];
    localStorage.setItem("agents", JSON.stringify(defaultAgents));
    return defaultAgents;
  });

  useEffect(() => {
    localStorage.setItem("agents", JSON.stringify(agents));
  }, [agents]);

  const handleCreateAgent = (newAgentData) => {
    const newAgent = {
      id: agents.length + 1,
      ...newAgentData,
    };
    setAgents([...agents, newAgent]);
  };

  const handleUpdateAgents = () => {
    // Aqui você pode implementar a lógica para atualizar os agentes
    // Por exemplo, buscar novos agentes de uma API
    alert("Agentes atualizados com sucesso!");
  };

  const handleDeleteAgent = (agentId) => {
    setAgents(agents.filter(agent => agent.id !== agentId));
    setOpenMenuId(null);
  };

  const handleEditAgent = (agentId) => {
    const agentToEdit = agents.find(agent => agent.id === agentId);
    setEditingAgent(agentToEdit);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleUpdateAgent = (updatedAgentData) => {
    setAgents(agents.map(agent => 
      agent.id === editingAgent.id 
        ? { ...agent, ...updatedAgentData }
        : agent
    ));
    setEditingAgent(null);
    setIsModalOpen(false);
  };

  const isDefaultAgent = (agentId) => {
    return agentId <= 4; // IDs 1-4 são os agentes padrão
  };

  const getAgentIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("historiador")) return "📜";
    if (lower.includes("cientista")) return "📊";
    if (lower.includes("advogado")) return "⚖️";
    if (lower.includes("designer")) return "🎨";
    return "🤖";
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0F0B29] text-white px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Agentes</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleUpdateAgents}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded flex items-center gap-2 text-sm"
          >
            <span className="text-lg">🔄</span> Atualizar
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-semibold text-sm"
          >
            + Criar Agente
          </button>
        </div>
      </div>

      {/* Pesquisa e filtros */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Pesquisar agentes..."
            className="pl-10 pr-4 py-2 bg-zinc-800 text-white rounded w-full focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-800 px-4 py-1 rounded text-sm">Ativos</button>
          <button className="bg-gray-500 px-4 py-1 rounded text-sm font-semibold">Templates</button>
          <button className="bg-zinc-800 px-4 py-1 rounded text-sm">Registros</button>
        </div>
      </div>

      {/* Grid de agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <div
            key={agent.id}
            className="bg-[#1A103D] border border-zinc-700 rounded-xl p-5 flex flex-col justify-between relative"
          >
            <div>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getAgentIcon(agent.name)}</span>
                  <h2 className="text-lg font-semibold text-white leading-tight">
                    {agent.name}
                  </h2>
                </div>
                {!isDefaultAgent(agent.id) && (
                  <div className="relative">
                    <button
                      onClick={() => setOpenMenuId(openMenuId === agent.id ? null : agent.id)}
                      className="text-zinc-400 hover:text-white p-1"
                    >
                      <FiMoreVertical size={20} />
                    </button>
                    {openMenuId === agent.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-zinc-800 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => handleEditAgent(agent.id)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-white hover:bg-zinc-700 rounded-t-lg"
                        >
                          <FiEdit2 size={16} />
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteAgent(agent.id)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-zinc-700 rounded-b-lg"
                        >
                          <FiTrash2 size={16} />
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-sm text-zinc-300 mb-2">
                {agent.description}
              </p>
              <div className="mb-3">
                <p className="text-sm text-zinc-400 font-semibold">Capacidades:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  <span className="bg-zinc-800 text-white text-xs px-3 py-1 rounded-full">
                    {agent.personality}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate(`/agente/${agent.id}`)}
              className="mt-4 bg-green-600 hover:bg-green-500 py-2 rounded text-sm font-medium w-full"
            >
              Conversar
            </button>
          </div>
        ))}
      </div>

      <CreateAgentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingAgent(null);
        }}
        onCreateAgent={editingAgent ? handleUpdateAgent : handleCreateAgent}
        editingAgent={editingAgent}
      />
    </div>
  );
}