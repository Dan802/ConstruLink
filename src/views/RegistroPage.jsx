import { useState } from "react";
import { Mail, User, Phone, Briefcase, DollarSign } from "lucide-react";

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    celular: "",
    profesion: "",
    cobroHora: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del registro:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Registrate en ConstruLink
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Nombre completo
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <User className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Correo electrónico
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Mail className="text-gray-500 mr-2" size={18} />
              <input
                type="email"
                name="correo"
                placeholder="ejemplo@correo.com"
                value={formData.correo}
                onChange={handleChange}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Celular
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Phone className="text-gray-500 mr-2" size={18} />
              <input
                type="tel"
                name="celular"
                placeholder="Número de contacto"
                value={formData.celular}
                onChange={handleChange}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Profesión
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <Briefcase className="text-gray-500 mr-2" size={18} />
              <input
                type="text"
                name="profesion"
                placeholder="Ej. Electricista, Plomero..."
                value={formData.profesion}
                onChange={handleChange}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Cobro por hora (COP)
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
              <DollarSign className="text-gray-500 mr-2" size={18} />
              <input
                type="number"
                name="cobroHora"
                placeholder="Ej. 50000"
                value={formData.cobroHora}
                onChange={handleChange}
                className="w-full outline-none border-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          ¿Ya tienes cuenta?{" "}
          <a
            href="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
