import { useState } from "react";
import { User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = { email: usuario.trim(), password: contraseña };
      const { data } = await auth.login(payload);
      const token = data?.token;
      if (!token) throw new Error(data?.message || "Token no recibido");
      localStorage.setItem("token", token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/profesionales");
    } catch (err) {
      console.error("Error login:", err);
      setError(err.response?.data?.message || err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">ConstruLink</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Usuario</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input type="text" placeholder="Ingresa tu usuario o correo" value={usuario} onChange={(e) => setUsuario(e.target.value)} className="w-full outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock className="text-gray-500 mr-2" size={18} />
              <input type="password" placeholder="Ingresa tu contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} className="w-full outline-none" required />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿No tienes cuenta? <a href="/registro" className="text-blue-600 font-medium hover:underline">Regístrate</a>
        </p>
      </div>
    </div>
  );
}