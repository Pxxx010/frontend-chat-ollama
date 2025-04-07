import { useState, useEffect } from "react";

const CreateAgentModal = ({ isOpen, onClose, onCreateAgent, editingAgent }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    personality: "reflexivo",
    customPersonality: "",
    model: "llama3",
  });

  const [showCustomPersonality, setShowCustomPersonality] = useState(false);

  useEffect(() => {
    if (editingAgent) {
      setFormData({
        name: editingAgent.name,
        description: editingAgent.description,
        personality: editingAgent.personality,
        customPersonality: editingAgent.personality,
        model: editingAgent.model,
      });
      setShowCustomPersonality(true);
    } else {
      setFormData({
        name: "",
        description: "",
        personality: "reflexivo",
        customPersonality: "",
        model: "llama3",
      });
      setShowCustomPersonality(false);
    }
  }, [editingAgent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPersonality = showCustomPersonality 
      ? formData.customPersonality 
      : formData.personality;
    onCreateAgent({ ...formData, personality: finalPersonality });
    onClose();
  };

  const handlePersonalityChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, personality: value });
    setShowCustomPersonality(value === "custom");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1A103D] rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            {editingAgent ? "Editar Agente" : "Criar Novo Agente"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome do Agente
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Personalidade
            </label>
            <select
              value={formData.personality}
              onChange={handlePersonalityChange}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
            >
              <option value="reflexivo">Reflexivo e Analítico</option>
              <option value="criativo">Criativo e Inovador</option>
              <option value="pratico">Prático e Objetivo</option>
              <option value="custom">Personalizado</option>
            </select>
            
            {showCustomPersonality && (
              <input
                type="text"
                value={formData.customPersonality}
                onChange={(e) => setFormData({ ...formData, customPersonality: e.target.value })}
                placeholder="Digite a personalidade personalizada"
                className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required={showCustomPersonality}
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Modelo
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-3 py-2 bg-zinc-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="llama3">Llama 3</option>
              <option value="openchat">OpenChat</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
            >
              {editingAgent ? "Salvar Alterações" : "Criar Agente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAgentModal; 