import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

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
        foto: profForm.foto || ""
      };

      const { data } = await professionals.create(payload);

      const created = data || { ...payload, _id: `local-${Date.now()}` };
      localStorage.setItem("myProfessional", JSON.stringify(created));

      setMsg("Perfil profesional creado correctamente.");
      navigate("/profesionales");
    } catch (err) {
      console.error("Error crear profesional:", err);
      setMsg(err?.response?.data?.message || err.message || "Error al crear perfil profesional");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h2 className="text-2xl font-bold mb-4">Crear perfil profesional</h2>

      {msg && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{msg}</div>}

      <form onSubmit={handleCreateProfessional} className="space-y-4 bg-white p-6 rounded shadow">
        <input name="nombre" placeholder="Nombre" value={profForm.nombre} onChange={(e) => setProfForm({ ...profForm, nombre: e.target.value })} className="w-full p-2 border rounded" required />

        <input name="especialidad" placeholder="Especialidad" value={profForm.especialidad} onChange={(e) => setProfForm({ ...profForm, especialidad: e.target.value })} className="w-full p-2 border rounded" required />

        <input name="contacto" placeholder="Contacto (tel)" value={profForm.contacto} onChange={(e) => setProfForm({ ...profForm, contacto: e.target.value })} className="w-full p-2 border rounded" />

        <input name="precio" placeholder="Cobro por hora (COP)" type="number" value={profForm.precio} onChange={(e) => setProfForm({ ...profForm, precio: e.target.value })} className="w-full p-2 border rounded" required />

        <input name="foto" placeholder="URL foto (opcional)" value={profForm.foto} onChange={(e) => setProfForm({ ...profForm, foto: e.target.value })} className="w-full p-2 border rounded" />

        <input name="habilidades" placeholder="Habilidades (separadas por coma)" value={profForm.habilidades} onChange={(e) => setProfForm({ ...profForm, habilidades: e.target.value })} className="w-full p-2 border rounded" />

        <textarea name="descripcion" placeholder="Descripción breve" value={profForm.descripcion} onChange={(e) => setProfForm({ ...profForm, descripcion: e.target.value })} className="w-full p-2 border rounded" rows={3} />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Guardando..." : "Guardar perfil profesional"}
        </button>
      </form>
    </div>
  );
}