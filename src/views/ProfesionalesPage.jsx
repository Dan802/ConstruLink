import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Wrench, Search, SlidersHorizontal } from "lucide-react";
import { profesionales as profesionalesData } from "../data/profesionales";
import { professionals } from "../services/api";

export default function ProfesionalesPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [profesionalesAPI, setProfesionalesAPI] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfessionals = async () => {
      try {
        setLoading(true);
        const { data } = await professionals.getAll();
        const apiProfs = data || [];
        const combined = [...profesionalesData];
        
        apiProfs.forEach(apiProf => {
          const exists = combined.find(p => 
            p.nombre?.toLowerCase() === apiProf.nombre?.toLowerCase()
          );
          if (!exists) {
            combined.push({
              nombre: apiProf.nombre,
              foto: apiProf.foto || "https://i.pravatar.cc/80",
              contacto: apiProf.contacto || apiProf.userId?.email || "No especificado",
              habilidades: apiProf.habilidades || [],
              precio: apiProf.precio || 0,
              _id: apiProf._id
            });
          }
        });
        
        setProfesionalesAPI(combined);
      } catch (err) {
        console.error("Error cargando profesionales:", err);
        setProfesionalesAPI(profesionalesData);
      } finally {
        setLoading(false);
      }
    };
    
    loadProfessionals();
  }, []);

  const toggleSeleccion = (nombre) => {
    setSelected((prev) =>
      prev.includes(nombre)
        ? prev.filter((n) => n !== nombre)
        : [...prev, nombre]
    );
  };

  const handleContactar = (prof) => {
    localStorage.setItem("chatWith", JSON.stringify({
      id: prof._id || prof.nombre,
      nombre: prof.nombre,
      foto: prof.foto
    }));
    navigate("/mensajes");
  };

  const filtrados = profesionalesAPI
    .filter(
      (prof) =>
        prof.nombre.toLowerCase().includes(search.toLowerCase()) ||
        prof.habilidades.join(" ").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "asc") return a.precio - b.precio;
      if (filter === "desc") return b.precio - a.precio;
      return 0;
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <p className="text-gray-600 text-lg">Cargando profesionales...</p>
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
              Profesionales Disponibles
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra expertos calificados para tu proyecto
            </p>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por nombre o área"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white"
              />
            </div>

            <div className="relative w-full md:w-64">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer"
              >
                <option value="">Filtrar por precio</option>
                <option value="asc">Menor a mayor</option>
                <option value="desc">Mayor a menor</option>
              </select>
            </div>
          </div>

          {/* Grid de profesionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtrados.map((prof, idx) => (
              <div
                key={prof._id || idx}
                className={`bg-white rounded-2xl shadow-md border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                  selected.includes(prof.nombre) ? "border-indigo-500 ring-2 ring-indigo-200" : "border-gray-100"
                }`}
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={prof.foto}
                      alt={prof.nombre}
                      className="w-16 h-16 rounded-full border-2 border-indigo-100 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {prof.nombre}
                      </h3>
                      <p className="text-sm text-gray-500">{prof.habilidades[0]}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Wrench size={16} className="text-indigo-500" />
                      <span>{prof.habilidades.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone size={16} className="text-indigo-500" />
                      <span>{prof.contacto}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      ${prof.precio.toLocaleString()} COP/hora
                    </p>
                  </div>

                  <button
                    onClick={() => handleContactar(prof)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
                  >
                    Contactar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparación (opcional) */}
          {selected.length > 0 && (
            <div className="mt-12 bg-white border border-indigo-100 rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Comparando {selected.length} profesionales
              </h3>
              <p className="text-gray-600 mb-4">
                Has seleccionado: {selected.join(", ")}
              </p>
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-md">
                Ver comparación detallada
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}