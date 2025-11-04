import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Send, User } from "lucide-react";

export default function MensajesPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]); // Lista de conversaciones activas
  const [activeChat, setActiveChat] = useState(null); // Chat actual seleccionado
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

      // Si hay un chat pendiente (desde profesionales), añadirlo/activarlo
      const pending = localStorage.getItem("chatWith");
      if (pending) {
        const newChat = JSON.parse(pending);
        // Verificar si ya existe
        const exists = parsed.find((c) => c.id === newChat.id);
        if (!exists) {
          const updated = [...parsed, newChat];
          setChats(updated);
          localStorage.setItem("chatsList", JSON.stringify(updated));
        }
        setActiveChat(newChat);
        loadMessages(newChat.id);
        localStorage.removeItem("chatWith"); // Limpiar pendiente
      } else if (parsed.length > 0) {
        // Si no hay pendiente, seleccionar el primero
        setActiveChat(parsed[0]);
        loadMessages(parsed[0].id);
      }
    } else {
      // Si no hay chats y hay uno pendiente, inicializarlo
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

    // Simular respuesta automática del profesional (opcional)
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: "Gracias por contactarme. ¿En qué puedo ayudarte?",
        sender: "them",
        timestamp: new Date().toISOString()
      };
      const withReply = [...updated, reply];
      setMessages(withReply);
      saveMessages(activeChat.id, withReply);
    }, 1500);
  };

  if (!activeChat && chats.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No hay conversaciones</h3>
          <p className="text-gray-500 mb-4">Contacta a un profesional para iniciar un chat</p>
          <button
            onClick={() => navigate("/profesionales")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Ver profesionales
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Lista de chats */}
      <div className="w-80 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Mensajes</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 border-b transition ${
                activeChat?.id === chat.id ? "bg-blue-50 border-l-4 border-blue-600" : ""
              }`}
            >
              <img
                src={chat.foto || "https://i.pravatar.cc/40"}
                alt={chat.nombre}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-800 truncate">{chat.nombre}</h3>
                <p className="text-xs text-gray-500">Toca para ver conversación</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel de conversación */}
      {activeChat && (
        <div className="flex-1 flex flex-col">
          {/* Header del chat activo */}
          <div className="bg-white border-b p-4 flex items-center gap-3 shadow">
            <img
              src={activeChat.foto || "https://i.pravatar.cc/40"}
              alt={activeChat.nombre}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold">{activeChat.nombre}</h2>
              <p className="text-xs text-gray-500">En línea</p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === "me"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 border"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs opacity-75">
                    {new Date(msg.timestamp).toLocaleTimeString("es-CO", {
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input de mensaje */}
          <div className="bg-white border-t p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribe un mensaje..."
              className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 flex items-center gap-2"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}