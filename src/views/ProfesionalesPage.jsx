import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Wrench } from "lucide-react";
import { profesionales as profesionalesData } from "../data/profesionales";
import { professionals } from "../services/api";

export default function PresupuestoSection() {
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
        // Combinar profesionales de API con los locales (provisionales)
        // Elimina duplicados por nombre
        const apiProfs = data || [];
        const combined = [...profesionalesData];
        
        apiProfs.forEach(apiProf => {
          const exists = combined.find(p => 
            p.nombre?.toLowerCase() === apiProf.nombre?.toLowerCase()
          );
          if (!exists) {
            // Formatear profesional de API al formato esperado
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
        // Si falla API, usar solo los locales
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

  // Filtrar por búsqueda y filtro
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
      <section className="py-16 bg-gray-200">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">Cargando profesionales...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-200">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Profesionales Disponibles
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar por nombre o profesión"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-1/2 border bg-gray-50 border-blue-400 focus:ring-blue-600 focus:outline-none rounded-md px-3 py-2"
          />

          <select
            onChange={(e) => setFilter(e.target.value)}
            className="w-[200px] border bg-gray-50 border-blue-400 focus:ring-blue-600 focus:outline-none rounded-md px-3 py-2"
          >
            <option value="">Filtrar por...</option>
            <option value="asc">$ Menor a mayor</option>
            <option value="desc">$ Mayor a menor</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {filtrados.map((prof, idx) => (
            <div
              key={prof._id || idx}
              className={`rounded-2xl shadow-md hover:shadow-lg transition border border-blue-200 bg-white p-6 space-y-3 ${
                selected.includes(prof.nombre) ? "border-2 border-blue-600" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={prof.foto}
                  alt={prof.nombre}
                  className="w-12 h-12 rounded-full border border-blue-300 object-cover"
                />
                <h3 className="font-semibold text-lg text-black">
                  {prof.nombre}
                </h3>
              </div>

              <div className="flex items-center gap-2 text-black mt-2">
                <Phone size={16} /> <span>{prof.contacto}</span>
              </div>
              <div className="flex items-center gap-2 text-black">
                <Wrench size={16} />
                <span>{prof.habilidades.join(", ")}</span>
              </div>
              <p className="text-blue-700 font-semibold">
                ${prof.precio.toLocaleString()} COP/hora
              </p>

              <button
                className="w-full rounded-2xl shadow-md px-4 py-2 font-medium transition bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => handleContactar(prof)}
              >
                Contactar
              </button>
            </div>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="mt-10 text-center bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Comparando {selected.length} profesionales
            </h3>
            <p className="text-black">
              Has seleccionado: {selected.join(", ")}
            </p>
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-md px-4 py-2">
              Ver comparación detallada
            </button>
          </div>
        )}
      </div>
    </section>
  );
}