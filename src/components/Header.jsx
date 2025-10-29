import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div>
        <Link to="/">
          <img src="/logo.svg" className="w-32" alt="logo" />
        </Link>
      </div>

      <nav className="flex gap-4">
        <NavLink to="/proyectos">Proyectos</NavLink>

        <NavLink to="/profesionales">Profesionales</NavLink>
      </nav>
    </header>
  );
}
