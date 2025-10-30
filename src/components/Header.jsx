import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="bg-white text-gray-900 flex justify-between items-center py-4 px-8 shadow">
        
        {/* Si queremos añadir un logo */}
        {/* <Link 
          to="/" 
          className="font-bold text-lg tracking-wider uppercase text-gray-800"
        >
          <img src="/logo.svg" className="w-38" alt="ConstruLink"/>
        </Link> */}

        <div className="font-bold font-mono uppercase">
          <NavLink to="/" className="hover:text-gray-600 hover:underline transition-colors">ConstruLink</NavLink>
        </div>

        <div className="flex space-x-6 font-bold">
          <NavLink to="/proyectos" className="hover:text-gray-600 hover:underline transition-colors">Proyectos</NavLink>
          <NavLink to="/profesionales" className="hover:text-gray-600 hover:underline transition-colors">Profesionales</NavLink>
        </div>

        <div className="font-bold">
          <NavLink to="/login" className="hover:text-gray-600 hover:underline transition-colors">Iniciar Sesión</NavLink>
        </div>

      </nav>
    </header>
  );
}
