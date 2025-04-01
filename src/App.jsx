import { useState, useEffect, useRef } from "react";

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat-messages");
    return saved ? JSON.parse(saved) : [{ role: "assistant", content: "Olá! Como posso ajudar?" }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Rolagem automática
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Salvar mensagens no localStorage
  useEffect(() => {
    localStorage.setItem("chat-messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openchat", // ou o nome do modelo que você tem
          messages: newMessages,
          stream: false,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message.content },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Erro ao se comunicar com a IA." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-[#101010] text-white flex flex-col items-center px-4 py-6">
      <div className="flex items-center justify-between w-full max-w-2xl mb-4">
      <h1 className="text-2xl font-semibold">Chat com Ollama 🤖</h1>
      <button
        onClick={() => {
          localStorage.removeItem("chat-messages");
          setMessages([{ role: "assistant", content: "Olá! Como posso ajudar?" }]);
        }}
        className="text-sm bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-md transition text-zinc-300"
      >
        Limpar chat
      </button>
      </div>

      <div className="w-full max-w-2xl bg-zinc-900 p-4 rounded-2xl shadow-inner h-[70vh] overflow-y-auto flex flex-col">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 px-4 py-2 max-w-[80%] rounded-xl ${
              msg.role === "user"
                ? "bg-cyan-600 self-end ml-auto text-right"
                : "bg-zinc-800 self-start mr-auto text-left"
            }`}
          >
            <p className="text-sm text-zinc-300 mb-1">
              {msg.role === "user" ? "Você" : "Assistente"}
            </p>
            <p className="text-base">{msg.content}</p>
          </div>
        ))}
        {loading && (
          <div className="text-zinc-500 text-sm">Ollama está digitando...</div>
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
          className="bg-cyan-600 hover:bg-cyan-500 px-4 rounded-lg font-medium transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default App;
