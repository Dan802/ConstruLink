import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { requests } from "../services/api";
import { Briefcase, DollarSign, User, Calendar } from "lucide-react";

export default function SolicitudesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await requests.getAll();
        setList(data || []);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
        setError(err.response?.data?.message || err.message || "Error al cargar solicitudes");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatPrice = (p) => {
    if (!p && p !== 0) return "No especificado";
    return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(p);
  };

  const handleContactar = (solicitud) => {
    // Verificar si hay usuario asociado a la solicitud
    if (!solicitud.userId) {
      alert("No se puede contactar: información del cliente no disponible");
      return;
    }

    // Guardar info del cliente para el chat
    localStorage.setItem("chatWith", JSON.stringify({
      id: solicitud.userId._id || solicitud.userId,
      nombre: solicitud.userId.name || "Cliente",
      foto: solicitud.userId.foto || "https://i.pravatar.cc/80",
      solicitudId: solicitud._id,
      tituloSolicitud: solicitud.titulo
    }));
    
    navigate("/mensajes");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando solicitudes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg border border-red-200 p-8 max-w-md">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Solicitudes de Trabajo
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explora proyectos disponibles y envía tus propuestas a los clientes
            </p>
          </div>

          {list.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
              <Briefcase size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">No hay solicitudes publicadas aún.</p>
              <p className="text-gray-500 text-sm mt-2">Vuelve más tarde para ver nuevos proyectos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {list.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Briefcase size={20} className="text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 line-clamp-1">
                        {req.titulo}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {req.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <DollarSign size={16} className="text-emerald-500" />
                      <span className="font-semibold text-emerald-600">
                        {formatPrice(req.presupuesto)}
                      </span>
                    </div>

                    {req.userId?.name && (
                      <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <User size={16} className="text-indigo-500" />
                        <span>{req.userId.name}</span>
                      </div>
                    )}

                    {req.createdAt && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Calendar size={14} />
                        <span>{new Date(req.createdAt).toLocaleDateString("es-CO")}</span>
                      </div>
                    )}
                  </div>

                  <button 
                    onClick={() => handleContactar(req)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
                  >
                    Contactar cliente
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}