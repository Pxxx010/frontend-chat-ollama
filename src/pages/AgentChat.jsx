import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

export default function AgentChat() {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const debugMode = false; // Altere para true para ver mensagens system no chat

  // Carregar agente e histórico
  useEffect(() => {
    const savedAgents = JSON.parse(localStorage.getItem("agents") || "[]");
    const foundAgent = savedAgents.find((a) => a.id === Number(id));
    setAgent(foundAgent);

    const savedMessages = JSON.parse(localStorage.getItem(`chat-${id}`) || "[]");
    setMessages(savedMessages);
  }, [id]);

  // Salvar mensagens localmente
  useEffect(() => {
    if (agent) {
      localStorage.setItem(`chat-${id}`, JSON.stringify(messages));
    }
  }, [messages, agent, id]);

  // Scroll automático
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !agent) return;

    const userMessage = { role: "user", content: input };

    const systemMessage = {
      role: "system",
      content: `Você é ${agent.name}, um assistente baseado no modelo ${agent.model}. Sua área de atuação é: ${agent.description}. Sua personalidade é: ${agent.personality}. Fale em português.`,
    };

    const allMessages =
      messages.length > 0 && messages[0].role === "system"
        ? [...messages, userMessage]
        : [systemMessage, ...messages, userMessage];

    console.log("📤 Enviando mensagens:", allMessages);

    setMessages(allMessages);
    setInput("");
    setLoading(true);

    try {
      const modelName = agent.model || "llama3";

      const res = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: modelName,
          messages: allMessages,
          stream: false,
        }),
      });

      const data = await res.json();

      if (!data.message?.content) {
        throw new Error("Resposta inválida da IA");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message.content },
      ]);
    } catch (err) {
      console.error("❌ ERRO:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Erro ao se comunicar com a IA.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const handleClearChat = () => {
    localStorage.removeItem(`chat-${id}`);
    setMessages([]);
  };

  if (!agent) {
    return <p className="text-white p-4">Agente não encontrado.</p>;
  }

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col items-center px-4 py-6">
      <div className="flex justify-between items-center w-full max-w-2xl mb-4">
        <h1 className="text-2xl font-semibold">Chat com {agent.name} 🤖</h1>
        <button
          onClick={handleClearChat}
          className="bg-zinc-800 hover:bg-zinc-700 text-sm px-3 py-1 rounded-md text-zinc-300 transition"
        >
          Limpar conversa
        </button>
      </div>

      <div className="w-full max-w-2xl bg-zinc-900 p-4 rounded-2xl shadow-inner h-[70vh] overflow-y-auto flex flex-col">
        {messages
          .filter((msg) => debugMode || msg.role !== "system")
          .map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 px-4 py-2 max-w-[80%] rounded-xl ${
                msg.role === "user"
                  ? "bg-cyan-600 self-end ml-auto text-right"
                  : "bg-zinc-800 self-start mr-auto text-left"
              }`}
            >
              <p className="text-sm text-zinc-300 mb-1">
                {msg.role === "user" ? "Você" : agent.name}
              </p>
              <p className="text-base whitespace-pre-line">{msg.content}</p>
            </div>
          ))}

        {loading && (
          <div className="text-sm text-zinc-500">🧠 {agent.name} está digitando...</div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex w-full max-w-2xl gap-2 mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 rounded-lg bg-zinc-800 text-white placeholder-zinc-400 outline-none"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className={`px-4 rounded-lg font-medium transition ${
            loading
              ? "bg-zinc-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-500"
          }`}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
