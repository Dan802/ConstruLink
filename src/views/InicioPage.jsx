export default function InicioPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-200">
      <div className="max-w-6xl mx-auto space-y-8">
        <p>*Esto solo se muestra una vez iniciada la sesión*</p>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Gestión de Proyectos
          </h1>
          <button className="rounded-2xl shadow-md bg-gray-900 hover:bg-blue-900 text-white px-4 py-2">
            Crear Proyecto
          </button>
        </div>

        {/* Proyectos */}
        <div className="rounded-2xl shadow-sm border border-blue-200 bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Proyectos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-blue-800 bg-blue-50">
                    <th className="p-2 border-b">ID</th>
                    <th className="p-2 border-b">Nombre</th>
                    <th className="p-2 border-b">Descripción</th>
                    <th className="p-2 border-b">Etiquetas</th>
                    <th className="p-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="p-2 border-b">1</td>
                    <td className="p-2 border-b font-medium text-black">Edificio Central</td>
                    <td className="p-2 border-b text-black">
                      Construcción de oficinas corporativas
                    </td>
                    <td className="p-2 border-b">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Estructura
                      </span>
                    </td>
                    <td className="p-2 border-b space-x-2">
                      <button className="px-3 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                        Editar
                      </button>
                      <button className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-2 border-b">2</td>
                    <td className="p-2 border-b font-medium text-black">
                      Urbanización Los Pinos
                    </td>
                    <td className="p-2 border-b text-black">
                      Desarrollo de viviendas familiares
                    </td>
                    <td className="p-2 border-b">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                        Residencial
                      </span>
                    </td>
                    <td className="p-2 border-b space-x-2">
                      <button className="px-3 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                        Editar
                      </button>
                      <button className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Tareas */}
        <div className="rounded-2xl shadow-sm border border-blue-200 bg-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">
              Tareas Asignadas
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left text-blue-800 bg-blue-50">
                    <th className="p-2 border-b">ID</th>
                    <th className="p-2 border-b">Tarea</th>
                    <th className="p-2 border-b">Asignado a</th>
                    <th className="p-2 border-b">Estado</th>
                    <th className="p-2 border-b">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-blue-50">
                    <td className="p-2 border-b">101</td>
                    <td className="p-2 border-b text-black">Supervisar cimentación</td>
                    <td className="p-2 border-b text-black">Ing. Pérez</td>
                    <td className="p-2 border-b">
                      <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
                        Pendiente
                      </span>
                    </td>
                    <td className="p-2 border-b space-x-2">
                      <button className="px-3 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                        Editar
                      </button>
                      <button className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-blue-50">
                    <td className="p-2 border-b">102</td>
                    <td className="p-2 border-b text-black">Instalar sistemas eléctricos</td>
                    <td className="p-2 border-b text-black">Tec. Ramírez</td>
                    <td className="p-2 border-b">
                      <span className="bg-green-100 text-green-600 px-2 py-1 rounded">
                        Completada
                      </span>
                    </td>
                    <td className="p-2 border-b space-x-2">
                      <button className="px-3 py-1 text-blue-600 border border-blue-500 rounded hover:bg-blue-50">
                        Editar
                      </button>
                      <button className="px-3 py-1 text-white bg-red-600 hover:bg-red-700 rounded">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
