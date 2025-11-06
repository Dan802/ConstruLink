import { Mail, MapPin, Phone, Github, Linkedin, Twitter, Hammer } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg">
                  <Hammer size={22} className="text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-bold">ConstruLink</span>
              </Link>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Conectamos clientes con profesionales calificados en construcción y renovación.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/proyectos" className="text-gray-300 hover:text-white transition">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="/profesionales" className="text-gray-300 hover:text-white transition">
                  Profesionales
                </a>
              </li>
              <li>
                <a href="/solicitudes" className="text-gray-300 hover:text-white transition">
                  Solicitudes
                </a>
              </li>
              <li>
                <a href="/registro" className="text-gray-300 hover:text-white transition">
                  Registrarse
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contáctanos</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <Mail size={16} className="text-indigo-400" />
                <span>info@construlink.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-indigo-400" />
                <span>+57 1234567890</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <MapPin size={16} className="text-indigo-400" />
                <span>Colombia, Medellin</span>
              </li>
            </ul>

            {/* Redes sociales */}
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ConstruLink. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}