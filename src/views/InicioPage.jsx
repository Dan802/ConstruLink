import { Target, Eye } from "lucide-react";

export default function InicioPage() {
  return (
    <div className="text-gray-800 bg-gray-100">

      <section className="bg-blue-100 py-20 text-center">
        <div className="max-w-4xl m-auto">
          <h2 className="text-4xl  md:text-5xl font-bold text-blue-800 mb-4">
            Conectamos Clientes con Profesionales en Construcción y Renovación
          </h2>
        </div>
        <p className="text-lg max-w-2xl mx-auto text-gray-700 mb-6">
          Encuentra expertos calificados para transformar tus espacios con calidad, innovación y confianza.
        </p>
        <a
          href="/registro"
          className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
        >
          Regístrate ahora
        </a>
      </section>

      <section id="descripcion" className="py-16 px-6 max-w-6xl mx-auto ">
        <h3 className="text-3xl font-bold text-blue-700 mb-6">Sobre el Sistema</h3>
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          <strong>ConstruLink</strong> es una plataforma web diseñada para conectar clientes con profesionales
          altamente cualificados en construcción, renovación y diseño de interiores. La aplicación actúa como un
          intermediario eficaz, facilitando la promoción de servicios, exhibiendo portafolios de profesionales y
          estableciendo un canal de comunicación directo entre clientes y expertos del sector.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Accesibilidad</h4>
            <p>Plataforma accesible desde cualquier dispositivo con conexión a internet y navegadores modernos.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Interfaz Intuitiva</h4>
            <p>Diseño fácil de usar que simplifica la búsqueda de profesionales y la gestión de proyectos.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Seguridad</h4>
            <p>Protección de datos y transacciones mediante medidas de seguridad avanzadas.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Escalabilidad</h4>
            <p>Adaptable a diversos tamaños de proyectos y a un número creciente de usuarios y profesionales.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
            <h4 className="text-xl font-semibold text-blue-700 mb-2">Integraciones</h4>
            <p>Compatible con herramientas de gestión, calendarios y plataformas de pago.</p>
          </div>
        </div>
      </section>

      <section id="mision" className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h3 className="text-3xl font-bold text-blue-700 mb-2">Nuestros Principios</h3>
          <p className="text-gray-600">Misión y visión que guían cada proyecto en ConstruLink</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full text-white">
                <Target size={28} />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-blue-700 mb-3">Misión</h4>
            <p className="text-gray-700 leading-relaxed">
              En <strong>ConstruLink</strong>, nuestra misión es transformar y mejorar espacios residenciales y
              comerciales a través de soluciones de construcción y renovación personalizadas, innovadoras y de alta
              calidad. Estamos comprometidos a brindar un servicio excepcional, superar las expectativas del cliente
              y contribuir al desarrollo de ambientes funcionales y estéticamente atractivos, respaldados por nuestro
              experimentado y dedicado equipo de profesionales.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-blue-600 p-3 rounded-full text-white">
                <Eye size={28} />
              </div>
            </div>
            <h4 className="text-2xl font-bold text-blue-700 mb-3">Visión</h4>
            <p className="text-gray-700 leading-relaxed">
              La visión de <strong>ConstruLink</strong> es ser líder en la industria de la construcción y remodelación,
              reconocidos por nuestra excelencia en diseño, calidad y servicio al cliente. Aspiramos a innovar
              continuamente en tecnología y materiales para crear espacios que no solo satisfagan las necesidades
              funcionales de nuestros clientes, sino que también reflejen sus deseos estéticos y de bienestar.
              Queremos construir un futuro donde cada proyecto sea un reflejo de nuestra búsqueda de la perfección y
              la completa satisfacción del cliente.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
