import { proyectos } from "../data/proyectos";

//! TODO
// LA INFO DE LOS PROYECTOS NOS LA DEBE DAR UNA API 
// Provisional (data/proyectos.js)

export default function ProyectosPage() {
 
  return (
    <section className="bg-gray-200 min-h-screen text-gray-900">

      <div className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {proyectos.map((proyecto) => (
            <div key={proyecto.id} className="bg-white text-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
              <img src={proyecto.imagenProyecto} alt={proyecto.descripcion} className="w-full h-56 object-cover" />
              <div className="p-6 text-center">
                <div className="flex flex-col items-center mb-4">
                  <img src={proyecto.imagenArquitecto} alt={proyecto.arquitecto} className="w-16 h-16 rounded-full mb-2 border-2 border-gray-400" />
                  <p className="text-lg font-semibold text-gray-700">{proyecto.arquitecto}</p>
                </div>
                <p className="text-sm text-gray-500 mb-3">⏱ {proyecto.tiempo}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{proyecto.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
