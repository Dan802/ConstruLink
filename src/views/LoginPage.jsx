import { useState } from "react";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Usuario:", usuario);
    console.log("Contraseña:", contraseña);
    // TODO 
    // Aquí se envia a la API
  };

  return (
    <div className="flex items-center justify-center min-h-svh  bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          ConstruLink
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Usuario
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                placeholder="Ingresa tu usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Contraseña
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock className="text-gray-500 mr-2" size={18} />
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes cuenta?{" "}
          <a
            href="/registro"
            className="text-blue-600 font-medium hover:underline"
          >
            Registrate
          </a>
        </p>
      </div>
    </div>
  );
}

