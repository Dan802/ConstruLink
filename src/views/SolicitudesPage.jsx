import { useEffect, useState } from "react";
import { requests } from "../services/api";
import { Briefcase, DollarSign } from "lucide-react";

export default function SolicitudesPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return new Intl.NumberFormat("es-CO").format(p) + " COP";
  };

  if (loading) return <div className="p-8 text-center">Cargando solicitudes...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-center mb-8">Solicitudes de Trabajo</h1>

        {list.length === 0 ? (
          <p className="text-center text-gray-600">No hay solicitudes publicadas aún.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((req) => (
              <div key={req._id} className="bg-white rounded-lg shadow p-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-800">
                  <Briefcase size={18} />
                  <h3 className="font-semibold text-lg">{req.titulo}</h3>
                </div>

                <p className="text-sm text-gray-700">{req.descripcion}</p>

                <div className="flex items-center gap-2 text-blue-600 font-semibold">
                  <DollarSign size={18} />
                  <span>Presupuesto: {formatPrice(req.presupuesto)}</span>
                </div>

                {req.userId?.name && (
                  <p className="text-xs text-gray-500">Publicado por: {req.userId.name}</p>
                )}

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}