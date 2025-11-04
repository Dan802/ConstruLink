import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Proyectos from "./views/ProyectosPage.jsx"
import Profesionales from "./views/ProfesionalesPage.jsx"
import Login from "./views/LoginPage.jsx"
import Index from "./views/InicioPage.jsx"
import Registro from "./views/RegistroPage.jsx"
import Admin from "./views/AdminPage.jsx"
import PerfilPage from "./views/PerfilPage";
import CrearSolicitudPage from "./views/CrearSolicitudPage.jsx";
import SolicitudesPage from "./views/SolicitudesPage";
import MensajesPage from "./views/MensajesPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Index />} />

          <Route path="/proyectos" element={<Proyectos />} />

          <Route path="/profesionales" element={<Profesionales />} />

          <Route path="/login" element={<Login />} />

          <Route path="/registro" element={<Registro />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/perfil" element={<PerfilPage />} />

          <Route path="/crear-solicitud" element={<CrearSolicitudPage />} />

          <Route path="/solicitudes" element={<SolicitudesPage />} />

          <Route path="/mensajes" element={<MensajesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
