import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./layouts/Layout";

const Proyectos = lazy(() => import("./views/ProyectosPage"));
const Profesionales = lazy(() => import("./views/ProfesionalesPage"));
const Index = lazy(() => import("./views/InicioPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Index />} />

          <Route path="/proyectos" element={<Proyectos />} />

          <Route path="/profesionales" element={<Profesionales />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
