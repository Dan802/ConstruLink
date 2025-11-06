import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Upload } from "lucide-react";
import { professionals } from "../services/api";

export default function PerfilPage() {
  const navigate = useNavigate();
  const [profForm, setProfForm] = useState({
    nombre: "",
    especialidad: "",
    contacto: "",
    precio: "",
    descripcion: "",
    habilidades: "",
    foto: ""
  });
  const [previewFoto, setPreviewFoto] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setProfForm({ ...profForm, foto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getDefaultAvatar = () => {
    // SVG de avatar por defecto (muñeco blanco con fondo gris)
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23d1d5db' width='200' height='200'/%3E%3Cpath fill='%23fff' d='M100 110c-13.8 0-25-11.2-25-25s11.2-25 25-25 25 11.2 25 25-11.2 25-25 25zm0-40c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zM140 160H60c-2.8 0-5-2.2-5-5 0-22.1 17.9-40 40-40h10c22.1 0 40 17.9 40 40 0 2.8-2.2 5-5 5zm-75-10h70c-2.2-14.5-14.8-25-30-25h-10c-15.2 0-27.8 10.5-30 25z'/%3E%3C/svg%3E`;
  };

  const handleCreateProfessional = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const payload = {
        nombre: profForm.nombre,
        especialidad: profForm.especialidad,
        contacto: profForm.contacto,
        precio: Number(profForm.precio || 0),
        descripcion: profForm.descripcion,
        habilidades: profForm.habilidades
          .split(",")
          .map((h) => h.trim())
          .filter(Boolean),
        foto: profForm.foto || getDefaultAvatar()
      };

      const { data } = await professionals.create(payload);

      const created = data || { ...payload, _id: `local-${Date.now()}` };
      localStorage.setItem("myProfessional", JSON.stringify(created));

      setMsg("Perfil profesional creado correctamente.");
      setTimeout(() => navigate("/profesionales"), 1500);
    } catch (err) {
      console.error("Error crear profesional:", err);
      setMsg(err?.response?.data?.message || err.message || "Error al crear perfil profesional");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Crear perfil profesional
          </h1>
          <p className="text-gray-600">Completa tu información para aparecer en el directorio</p>
        </div>

        {msg && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-center">
            {msg}
          </div>
        )}

        <form onSubmit={handleCreateProfessional} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6">
          {/* Foto de perfil */}
          <div className="text-center">
            <label className="block text-sm font-medium text-gray-700 mb-3">Foto de perfil</label>
            <div className="flex flex-col items-center gap-4">
              <img
                src={previewFoto || getDefaultAvatar()}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100 shadow-lg"
              />
              <label className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition">
                <Upload size={18} />
                Subir foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500">Si no subes una foto, se usará un avatar por defecto</p>
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              name="nombre"
              placeholder="Tu nombre completo"
              value={profForm.nombre}
              onChange={(e) => setProfForm({ ...profForm, nombre: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
              required
            />
          </div>

          {/* Especialidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
            <input
              name="especialidad"
              placeholder="Ej: Electricista, Plomero, Constructor"
              value={profForm.especialidad}
              onChange={(e) => setProfForm({ ...profForm, especialidad: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
              required
            />
          </div>

          {/* Contacto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono de contacto</label>
            <input
              name="contacto"
              placeholder="Número de teléfono"
              value={profForm.contacto}
              onChange={(e) => setProfForm({ ...profForm, contacto: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cobro por hora (COP)</label>
            <input
              name="precio"
              placeholder="Ej: 50000"
              type="number"
              value={profForm.precio}
              onChange={(e) => setProfForm({ ...profForm, precio: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
              required
            />
          </div>

          {/* Habilidades */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Habilidades</label>
            <input
              name="habilidades"
              placeholder="Electricidad, Instalaciones, Mantenimiento (separadas por coma)"
              value={profForm.habilidades}
              onChange={(e) => setProfForm({ ...profForm, habilidades: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción breve</label>
            <textarea
              name="descripcion"
              placeholder="Cuéntanos sobre tu experiencia..."
              value={profForm.descripcion}
              onChange={(e) => setProfForm({ ...profForm, descripcion: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition bg-gray-50"
              rows={4}
            />
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Guardar perfil profesional"}
          </button>
        </form>
      </div>
    </div>
  );
}