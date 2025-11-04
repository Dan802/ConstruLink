import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(Boolean(localStorage.getItem("token")));
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

 useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "token") setLogged(Boolean(e.newValue));
    };
    const onAuthChange = () => {
      setLogged(Boolean(localStorage.getItem("token")));
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("authChange", onAuthChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChange", onAuthChange);
    };
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

    const handleLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
    setOpen(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  return (
    <header>
      <nav className="bg-white text-gray-900 flex justify-between items-center py-4 px-8 shadow">
        {/* Si queremos añadir un logo */}
        {/* <Link to="/" className="font-bold text-lg tracking-wider uppercase text-gray-800">
          <img src="/logo.svg" className="w-38" alt="ConstruLink"/>
        </Link> */}

        <div className="font-bold font-mono uppercase">
          <NavLink to="/" className="hover:text-gray-600 hover:underline transition-colors">ConstruLink</NavLink>
        </div>

        <div className="flex space-x-6 font-bold">
          <NavLink to="/proyectos" className="hover:text-gray-600 hover:underline transition-colors">Proyectos</NavLink>
          <NavLink to="/profesionales" className="hover:text-gray-600 hover:underline transition-colors">Profesionales</NavLink>
          <NavLink to="/solicitudes" className="hover:text-gray-600 hover:underline transition-colors">Solicitudes</NavLink>
        </div>

        <div className="font-bold relative" ref={menuRef}>
          {!logged ? (
            <NavLink to="/login" className="hover:text-gray-600 hover:underline transition-colors">Iniciar Sesión</NavLink>
          ) : (
            <>
              <button
                onClick={() => setOpen((s) => !s)}
                className="hover:text-gray-600 px-3 py-1 rounded transition-colors"
                aria-haspopup="true"
                aria-expanded={open}
              >
                Mi cuenta ▾
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                  <Link to="/perfil?role=professional" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Crear perfil profesional</Link>
                  <Link to="/crear-solicitud" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Crear solicitud</Link>
                  <Link to="/mensajes" onClick={() => setOpen(false)} className="block px-4 py-2 hover:bg-gray-100">Mensajes</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">Cerrar sesión</button>
                </div>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}