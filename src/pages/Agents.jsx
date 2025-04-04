import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Agents() {
  const navigate = useNavigate();

  const [agents, setAgents] = useState(() => {
    const saved = localStorage.getItem("agents");

    if (saved && saved !== "[]") {
      return JSON.parse(saved);
    }

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

  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    personality: "",
    customPersonality: "",
    model: "llama3",
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedAgent, setEditedAgent] = useState({});

  const handleChange = (e) => {
    setNewAgent({ ...newAgent, [e.target.name]: e.target.value });
  };

  const handleAddAgent = (e) => {
    e.preventDefault();
    if (!newAgent.name.trim()) return;

    const finalPersonality =
      newAgent.personality === "custom"
        ? newAgent.customPersonality
        : newAgent.personality;

    const newId = agents.length > 0 ? agents[agents.length - 1].id + 1 : 1;
    const agentToAdd = {
      id: newId,
      name: newAgent.name,
      description: newAgent.description,
      personality: finalPersonality,
      model: newAgent.model,
    };

    setAgents([...agents, agentToAdd]);
    setNewAgent({ name: "", description: "", personality: "", customPersonality: "", model: "llama3" });
    setShowForm(false);
    setTimeout(() => navigate(`/agente/${newId}`), 100);
  };

  const handleDeleteAgent = (id) => {
    setAgents(agents.filter((a) => a.id !== id));
    localStorage.removeItem(`chat-${id}`);
  };

  const handleEditClick = (agent) => {
    setEditingId(agent.id);
    setEditedAgent({ ...agent });
  };

  const handleEditChange = (e) => {
    setEditedAgent({ ...editedAgent, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    const updatedAgents = agents.map((a) =>
      a.id === editingId ? editedAgent : a
    );
    setAgents(updatedAgents);
    setEditingId(null);
    setEditedAgent({});
  };

  const getAgentIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes("historiador")) return "📜";
    if (lower.includes("cientista")) return "📊";
    if (lower.includes("advogado")) return "⚖️";
    if (lower.includes("designer")) return "🎨";
    return "🤖";
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col items-center px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Agentes 🤖</h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 mb-6 rounded-lg font-medium transition"
        >
          + Novo Agente
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleAddAgent}
          className="bg-zinc-900 p-6 rounded-xl shadow max-w-2xl w-full mb-6 space-y-4"
        >
          <input
            type="text"
            name="name"
            value={newAgent.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
            placeholder="Nome do agente"
          />
          <input
            type="text"
            name="description"
            value={newAgent.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
            placeholder="Descrição"
          />

          <select
            name="personality"
            value={newAgent.personality}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
          >
            <option value="">Selecione a personalidade</option>
            <option value="Calmo e paciente">Calmo e paciente</option>
            <option value="Engraçado e informal">Engraçado e informal</option>
            <option value="Sério e direto ao ponto">Sério e direto ao ponto</option>
            <option value="Curioso e comunicativo">Curioso e comunicativo</option>
            <option value="custom">Personalizada</option>
          </select>

          {newAgent.personality === "custom" && (
            <input
              type="text"
              name="customPersonality"
              value={newAgent.customPersonality}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
              placeholder="Descreva a personalidade personalizada"
            />
          )}

          <select
            name="model"
            value={newAgent.model}
            onChange={handleChange}
            className="w-full p-2 rounded bg-zinc-800 text-white outline-none"
          >
            <option value="llama3">LLaMA 3</option>
            <option value="openchat">OpenChat</option>
            <option value="mistral">Mistral</option>
            <option value="gemma">Gemma</option>
          </select>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg font-medium transition"
            >
              Adicionar
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-zinc-600 hover:bg-zinc-500 px-4 py-2 rounded-lg font-medium transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="bg-zinc-900 p-6 rounded-xl shadow max-w-2xl w-full space-y-4">
        {agents.length === 0 ? (
          <p className="text-zinc-400">Nenhum agente cadastrado ainda.</p>
        ) : (
          agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-5 rounded-2xl shadow-md border border-zinc-700"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl pt-1">{getAgentIcon(agent.name)}</div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-cyan-400 drop-shadow">{agent.name}</h2>
                  <p className="text-sm text-zinc-300 mt-1">{agent.description}</p>
                  <p className="text-xs text-zinc-400 italic mt-2">
                    Personalidade: {agent.personality || "não definida"}
                  </p>
                  <p className="text-xs text-zinc-500">Modelo: {agent.model}</p>
                  <div className="flex gap-2 mt-4 justify-end">
                    <button
                      onClick={() => navigate(`/agente/${agent.id}`)}
                      className="bg-cyan-700 hover:bg-cyan-600 px-3 py-1 rounded text-sm"
                    >
                      Abrir Chat
                    </button>
                    <button
                      onClick={() => handleEditClick(agent)}
                      className="bg-yellow-700 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteAgent(agent.id)}
                      className="bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}