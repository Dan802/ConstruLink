import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, User, Trash2, MessageSquare } from "lucide-react";

export default function MensajesPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Cargar lista de chats desde localStorage
    const storedChats = localStorage.getItem("chatsList");
    if (storedChats) {
      const parsed = JSON.parse(storedChats);
      setChats(parsed);

      // Si hay un chat pendiente (desde profesionales o solicitudes), añadirlo/activarlo
      const pending = localStorage.getItem("chatWith");
      if (pending) {
        const newChat = JSON.parse(pending);
        const exists = parsed.find((c) => c.id === newChat.id);
        if (!exists) {
          const updated = [...parsed, newChat];
          setChats(updated);
          localStorage.setItem("chatsList", JSON.stringify(updated));
        }
        setActiveChat(newChat);
        loadMessages(newChat.id);
        localStorage.removeItem("chatWith");
      } else if (parsed.length > 0) {
        setActiveChat(parsed[0]);
        loadMessages(parsed[0].id);
      }
    } else {
      const pending = localStorage.getItem("chatWith");
      if (pending) {
        const newChat = JSON.parse(pending);
        setChats([newChat]);
        setActiveChat(newChat);
        localStorage.setItem("chatsList", JSON.stringify([newChat]));
        localStorage.removeItem("chatWith");
      }
    }
  }, [navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadMessages = (chatId) => {
    const key = `chat_${chatId}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([]);
    }
  };

  const saveMessages = (chatId, msgs) => {
    const key = `chat_${chatId}`;
    localStorage.setItem(key, JSON.stringify(msgs));
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat);
    loadMessages(chat.id);
  };

  const handleDeleteChat = (chatId, e) => {
    e.stopPropagation();
    if (!confirm("¿Eliminar esta conversación?")) return;

    const updated = chats.filter((c) => c.id !== chatId);
    setChats(updated);
    localStorage.setItem("chatsList", JSON.stringify(updated));
    localStorage.removeItem(`chat_${chatId}`);

    if (activeChat?.id === chatId) {
      if (updated.length > 0) {
        setActiveChat(updated[0]);
        loadMessages(updated[0].id);
      } else {
        setActiveChat(null);
        setMessages([]);
      }
    }
  };

  const handleSend = () => {
    if (!input.trim() || !activeChat) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: "me",
      timestamp: new Date().toISOString()
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    saveMessages(activeChat.id, updated);
    setInput("");
  };

  if (!activeChat && chats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-6">
        <div className="text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-12 max-w-md">
          <MessageSquare size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No hay conversaciones</h3>
          <p className="text-gray-600 mb-6">Contacta a un profesional o responde a solicitudes para iniciar un chat</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/profesionales")}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-semibold"
            >
              Ver profesionales
            </button>
            <button
              onClick={() => navigate("/solicitudes")}
              className="bg-white text-indigo-600 border border-indigo-300 px-6 py-3 rounded-lg hover:bg-indigo-50 transition font-semibold"
            >
              Ver solicitudes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Sidebar - Lista de chats */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-lg">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
          <h2 className="text-xl font-bold text-white">Mensajes</h2>
          <p className="text-sm text-indigo-100 mt-1">{chats.length} conversaciones</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b border-gray-100 transition group ${
                activeChat?.id === chat.id ? "bg-indigo-50 border-l-4 border-indigo-600" : ""
              }`}
            >
              <img
                src={chat.foto || "https://i.pravatar.cc/40"}
                alt={chat.nombre}
                className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{chat.nombre}</h3>
                <p className="text-xs text-gray-500 truncate">
                  {chat.tituloSolicitud || "Conversación activa"}
                </p>
              </div>
              <button
                onClick={(e) => handleDeleteChat(chat.id, e)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition"
                title="Eliminar conversación"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de conversación */}
      {activeChat && (
        <div className="flex-1 flex flex-col">
          {/* Header del chat activo */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm">
            <img
              src={activeChat.foto || "https://i.pravatar.cc/40"}
              alt={activeChat.nombre}
              className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
            />
            <div className="flex-1">
              <h2 className="font-semibold text-gray-800">{activeChat.nombre}</h2>
              {activeChat.tituloSolicitud && (
                <p className="text-xs text-gray-500">Sobre: {activeChat.tituloSolicitud}</p>
              )}
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-gray-50 to-blue-50/30">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-400">
                  <MessageSquare size={48} className="mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No hay mensajes aún. ¡Inicia la conversación!</p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                        : "bg-white text-gray-800 border border-gray-200"
                    }`}
                  >
                    <p className="break-words">{msg.text}</p>
                    <span className={`text-xs block mt-1 ${msg.sender === "me" ? "text-indigo-100" : "text-gray-400"}`}>
                      {new Date(msg.timestamp).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensaje */}
          <div className="bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-gray-50"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg px-5 py-3 hover:from-indigo-700 hover:to-purple-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}