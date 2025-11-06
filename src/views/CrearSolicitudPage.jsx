import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requests } from "../services/api";

export default function CrearSolicitudPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ titulo: "", descripcion: "", presupuesto: "" });
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const payload = {
        titulo: form.titulo,
        descripcion: form.descripcion,
        presupuesto: Number(form.presupuesto || 0)
      };
      const { data } = await requests.create(payload);
      console.log("Solicitud creada:", data);
      setMsg("Solicitud publicada correctamente.");
      setForm({ titulo: "", descripcion: "", presupuesto: "" });
      navigate("/solicitudes");
    } catch (err) {
      console.error("Error publicar solicitud:", err);
      setMsg(err?.response?.data?.message || err.message || "Error al publicar solicitud");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-2xl h-[60vh]">
      <h2 className="text-2xl font-bold mb-4">Crear solicitud de trabajo</h2>

      {msg && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{msg}</div>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input placeholder="Título del trabajo" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className="w-full p-2 border rounded" required />
        <textarea placeholder="Descripción" value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })} className="w-full p-2 border rounded" rows={5} required />
        <input placeholder="Presupuesto (COP)" type="number" value={form.presupuesto} onChange={(e) => setForm({ ...form, presupuesto: e.target.value })} className="w-full p-2 border rounded" />
        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
          {loading ? "Publicando..." : "Publicar solicitud"}
        </button>
      </form>
    </div>
  );
}