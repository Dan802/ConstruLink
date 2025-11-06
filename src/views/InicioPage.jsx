import { useState, useEffect } from "react";
import { Target, Eye, ChevronLeft, ChevronRight, CheckCircle, Users, Award, TrendingUp } from "lucide-react";

export default function InicioPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=600&fit=crop",
      title: "Conectamos Clientes con Profesionales",
      subtitle: "en Construcción y Renovación",
      description: "Encuentra expertos calificados para transformar tus espacios con calidad, innovación y confianza."
    },
    {
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
      title: "Profesionales Certificados",
      subtitle: "para tu Proyecto",
      description: "Accede a una red de expertos verificados listos para hacer realidad tus ideas."
    },
    {
      image: "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=1200&h=600&fit=crop",
      title: "Transforma tu Hogar",
      subtitle: "con los Mejores del Sector",
      description: "Conecta con maestros, arquitectos, electricistas y más. Todo en un solo lugar."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const beneficios = [
    {
      icon: CheckCircle,
      titulo: "Verificación de Profesionales",
      descripcion: "Todos nuestros profesionales pasan por un riguroso proceso de validación",
      color: "from-emerald-400 to-emerald-600"
    },
    {
      icon: Users,
      titulo: "Red de Expertos",
      descripcion: "Accede a miles de profesionales especializados en tu área",
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: Award,
      titulo: "Calidad Garantizada",
      descripcion: "Sistema de calificaciones y reseñas reales de clientes",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: TrendingUp,
      titulo: "Crecimiento Profesional",
      descripcion: "Impulsa tu carrera con proyectos constantes y bien remunerados",
      color: "from-orange-400 to-orange-600"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      
      {/* Carrusel Hero con overlay mejorado */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-blue-900/70" />

              <div className="relative h-full flex flex-col items-center justify-center text-white px-6 text-center">
                <div className="max-w-4xl space-y-6 animate-fadeIn">
                  <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl">
                    {slide.title}
                  </h1>
                  <h2 className="text-3xl md:text-5xl font-bold text-blue-200 drop-shadow-lg">
                    {slide.subtitle}
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-100 drop-shadow-md max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <a
                    href="/registro"
                    className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold px-10 py-4 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
                  >
                    Comienza Ahora →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-4 rounded-full transition-all shadow-xl hover:scale-110"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 backdrop-blur-md text-white p-4 rounded-full transition-all shadow-xl hover:scale-110"
        >
          <ChevronRight size={32} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white w-12" : "bg-white/50 w-3"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Sección de Beneficios - Diseño moderno */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              ¿Por qué elegir ConstruLink?
            </h3>
            <p className="text-xl text-gray-600">Conectamos talento con oportunidades de manera inteligente</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((ben, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${ben.color}`} />
                <div className={`mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br ${ben.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <ben.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{ben.titulo}</h4>
                <p className="text-gray-600 leading-relaxed">{ben.descripcion}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre el Sistema - Diseño mejorado */}
      <section id="descripcion" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-extrabold text-gray-800 mb-6">
                Sobre <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ConstruLink</span>
              </h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>ConstruLink</strong> es una plataforma web diseñada para conectar clientes con profesionales
                altamente cualificados en construcción, renovación y diseño de interiores. La aplicación actúa como un
                intermediario eficaz, facilitando la promoción de servicios, exhibiendo portafolios de profesionales y
                estableciendo un canal de comunicación directo entre clientes y expertos del sector.
              </p>
              <a
                href="/registro"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg transition"
              >
                Únete Ahora
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-3xl font-bold mb-2">Seguridad</h4>
                <p className="text-blue-100">Contrata con confianza: profesionales evaluados y reportes disponibles</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-3xl font-bold mb-2">Mensajeria</h4>
                <p className="text-purple-100">Chat directo para coordinar detalles y cotizaciones.</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-3xl font-bold mb-2">Filtros</h4>
                <p className="text-emerald-100">Búsqueda inteligente para llegar al profesional ideal.</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-700 text-white p-6 rounded-2xl shadow-lg">
                <h4 className="text-3xl font-bold mb-2">Rapido</h4>
                <p className="text-orange-100">Publica en minutos y recibe respuestas el mismo día.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión - Diseño premium */}
      <section id="mision" className="py-20 px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-extrabold mb-4">Nuestros Principios</h3>
            <p className="text-xl text-gray-300">Misión y visión que guían cada proyecto en ConstruLink</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-4 rounded-2xl">
                  <Target size={40} />
                </div>
              </div>
              <h4 className="text-3xl font-bold mb-4 text-center">Misión</h4>
              <p className="text-gray-200 leading-relaxed text-center">
                En <strong>ConstruLink</strong>, nuestra misión es transformar y mejorar espacios residenciales y
                comerciales a través de soluciones de construcción y renovación personalizadas, innovadoras y de alta
                calidad. Estamos comprometidos a brindar un servicio excepcional, superar las expectativas del cliente
                y contribuir al desarrollo de ambientes funcionales y estéticamente atractivos.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-center justify-center mb-6">
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-4 rounded-2xl">
                  <Eye size={40} />
                </div>
              </div>
              <h4 className="text-3xl font-bold mb-4 text-center">Visión</h4>
              <p className="text-gray-200 leading-relaxed text-center">
                La visión de <strong>ConstruLink</strong> es ser líder en la industria de la construcción y remodelación,
                reconocidos por nuestra excelencia en diseño, calidad y servicio al cliente. Aspiramos a innovar
                continuamente en tecnología y materiales para crear espacios que no solo satisfagan las necesidades
                funcionales, sino que también reflejen los deseos estéticos y de bienestar de nuestros clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}