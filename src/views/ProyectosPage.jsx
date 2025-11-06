import { ClipboardList } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProyectosPage() {
  const navigate = useNavigate();

  const categorias = [
    {
      imagen: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      titulo: "Electricidad",
      descripcion: "Instalación, reparación y mantenimiento de sistemas eléctricos residenciales y comerciales."
    },
    {
      imagen: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=400&h=300&fit=crop",
      titulo: "Plomería",
      descripcion: "Reparación de tuberías, instalación de sistemas sanitarios y solución de fugas."
    },
    {
      imagen: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop",
      titulo: "Construcción",
      descripcion: "Obra gris, ampliaciones, estructuras y proyectos de construcción completa."
    },
    {
      imagen: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&h=300&fit=crop",
      titulo: "Pintura y Acabados",
      descripcion: "Pintura interior/exterior, texturizado, decoración y acabados profesionales."
    },
    {
      imagen: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=400&h=300&fit=crop",
      titulo: "Remodelación",
      descripcion: "Renovación de cocinas, baños, espacios y remodelaciones integrales."
    },
    {
      imagen: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      titulo: "Mantenimiento General",
      descripcion: "Reparaciones menores, mantenimiento preventivo y servicios de handyman."
    }
  ];

  const handlePublicarProyecto = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/crear-solicitud");
    } else {
      navigate("/registro");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="py-16 px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Encuentra Proyectos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explora categorías de servicios disponibles y conecta con clientes que necesitan tu experiencia
          </p>
        </div>

        {/* Grid de categorías mejorado */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categorias.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={cat.imagen}
                  alt={cat.titulo}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {cat.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {cat.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section mejorada */}
        <div className="mt-16 max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-10 text-center text-white shadow-xl">
          <ClipboardList size={52} className="mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-3">¿Necesitas publicar un proyecto?</h2>
          <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">
            Publica tu solicitud y recibe propuestas de profesionales calificados en tu área
          </p>
          <button
            onClick={handlePublicarProyecto}
            className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition shadow-md hover:shadow-lg"
          >
            Publicar proyecto
          </button>
        </div>
      </div>
    </div>
  );
}