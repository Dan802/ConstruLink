import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, LogOut, User, ClipboardList, Hammer } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [logged, setLogged] = useState(Boolean(localStorage.getItem("token")));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setLogged(Boolean(e.newValue));
    };
    const onAuthChange = () => setLogged(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onStorage);
    window.addEventListener("authChange", onAuthChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChange"));
    setAccountOpen(false);
    navigate("/");
  };

  const handleCTA = () => {
    const token = localStorage.getItem("token");
    navigate(token ? "/crear-solicitud" : "/registro");
  };

  const baseLink =
    "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const linkClass = ({ isActive }) =>
    `${baseLink} ${isActive ? "text-white bg-white/10" : "text-white/80 hover:text-white hover:bg-white/10"}`;

  return (
    <header className="sticky top-0 z-50">
      {/* Capa de gradiente de fondo */}
      <div className="absolute inset-0 h-[72px] bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900" />
      {/* Capa de blur/transparencia */}
      <div className={`absolute inset-0 h-[72px] ${scrolled ? "bg-black/25 backdrop-blur-md" : "bg-black/10 backdrop-blur-sm"}`} />

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[72px] flex items-center">
        {/* Logo */}
        <div className="flex items-center flex-1">
          <Link to="/" className="flex items-center gap-2">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg">
              <Hammer size={22} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-white font-extrabold tracking-wide text-lg">
              CONSTRULINK
            </span>
          </Link>
        </div>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/proyectos" className={linkClass}>Proyectos</NavLink>
          <NavLink to="/profesionales" className={linkClass}>Profesionales</NavLink>
          <NavLink to="/solicitudes" className={linkClass}>Solicitudes</NavLink>

          <button
            onClick={handleCTA}
            className="ml-2 inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition shadow-sm"
          >
            <ClipboardList size={18} />
            Publicar proyecto
          </button>

          {/* Cuenta */}
          {logged ? (
            <div className="relative ml-2">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-white/90 hover:bg-white/10"
              >
                <User size={18} /> Mi cuenta <ChevronDown size={16} />
              </button>
              {accountOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5 overflow-hidden"
                  onMouseLeave={() => setAccountOpen(false)}
                >
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/mensajes"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setAccountOpen(false)}
                  >
                    Mensajes
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 inline-flex items-center gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/10"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                className="px-3 py-2 rounded-md text-sm font-semibold bg-white text-indigo-700 hover:bg-gray-100 shadow-sm"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>

        {/* Botón mobile */}
        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white/90 hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="md:hidden bg-gradient-to-b from-indigo-900 to-purple-900 text-white/90 border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <NavLink to="/proyectos" className={linkClass} onClick={() => setOpen(false)}>Proyectos</NavLink>
            <NavLink to="/profesionales" className={linkClass} onClick={() => setOpen(false)}>Profesionales</NavLink>
            <NavLink to="/solicitudes" className={linkClass} onClick={() => setOpen(false)}>Solicitudes</NavLink>

            <button
              onClick={() => { setOpen(false); handleCTA(); }}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-white text-indigo-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition shadow-sm"
            >
              <ClipboardList size={18} />
              Publicar proyecto
            </button>

            <div className="pt-3 border-t border-white/10 mt-3">
              {logged ? (
                <>
                  <Link to="/perfil" className={baseLink} onClick={() => setOpen(false)}>Perfil</Link>
                  <Link to="/mensajes" className={baseLink} onClick={() => setOpen(false)}>Mensajes</Link>
                  <button className={`${baseLink} text-red-300 hover:text-red-200`} onClick={() => { setOpen(false); handleLogout(); }}>
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className={baseLink} onClick={() => setOpen(false)}>Iniciar sesión</Link>
                  <Link to="/registro" className={baseLink} onClick={() => setOpen(false)}>Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}