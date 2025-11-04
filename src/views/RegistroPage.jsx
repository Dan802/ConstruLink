import { useState } from "react";
import { Mail, User, Phone, Briefcase, DollarSign, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/api";

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
    celular: "",
    profesion: "",
    cobroHora: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data } = await auth.register({
        email: formData.correo,
        password: formData.password,
        name: formData.nombre,
        role: "client",
      });
      if (!data?.token) throw new Error("Token no recibido");
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("authChange"));
      navigate("/profesionales");
    } catch (err) {
      console.error("Error en registro:", err);
      setError(err.response?.data?.message || err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Regístrate en ConstruLink</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Nombre completo</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input name="nombre" type="text" placeholder="Tu nombre completo" value={formData.nombre} onChange={handleChange} className="w-full outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Correo electrónico</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Mail className="text-gray-500 mr-2" size={18} />
              <input name="correo" type="email" placeholder="ejemplo@correo.com" value={formData.correo} onChange={handleChange} className="w-full outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Contraseña</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Lock className="text-gray-500 mr-2" size={18} />
              <input name="password" type="password" placeholder="Tu contraseña" value={formData.password} onChange={handleChange} className="w-full outline-none" required />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">Celular</label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Phone className="text-gray-500 mr-2" size={18} />
              <input name="celular" type="tel" placeholder="Número de contacto" value={formData.celular} onChange={handleChange} className="w-full outline-none" />
            </div>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-600 font-medium hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
}