import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Utensils, Wine, Coffee, ChefHat, ChevronRight, Menu, X, Flame, MapPin, Mail, Phone } from "lucide-react";

// Gourmet restaurant imagery
const HERO_IMAGE = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2560&auto=format&fit=crop";

const FEATURES = [
  {
    title: "Alta Cocina",
    description: "Ingredientes seleccionados cuidadosamente para crear platos que despiertan todos los sentidos.",
    icon: <ChefHat className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Vinos Selectos",
    description: "Una cava exclusiva con maridajes diseñados por nuestros expertos sommeliers.",
    icon: <Wine className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Experiencia Única",
    description: "Un ambiente íntimo, elegante y minimalista diseñado para paladares exigentes.",
    icon: <Utensils className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 selection:bg-gastro-200 selection:text-gastro-900 overflow-hidden font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className={`p-2 rounded-full ${isScrolled ? 'bg-gastro-600 text-white' : 'bg-white text-gastro-600'}`}
            >
              <Flame className="w-5 h-5" />
            </motion.div>
            <span className={`text-xl font-medium tracking-widest uppercase ${isScrolled ? 'text-zinc-900' : 'text-white'}`}>Aura</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#experiencia" className={`text-sm font-medium transition-colors hover:text-gastro-500 ${isScrolled ? 'text-zinc-600' : 'text-zinc-200'}`}>Experiencia</a>
            <a href="#menu" className={`text-sm font-medium transition-colors hover:text-gastro-500 ${isScrolled ? 'text-zinc-600' : 'text-zinc-200'}`}>Menú</a>
            <a href="#reservas" className={`text-sm font-medium transition-colors hover:text-gastro-500 ${isScrolled ? 'text-zinc-600' : 'text-zinc-200'}`}>Ubicación</a>
            <a href="#reservas" className={`px-6 py-2.5 rounded-none text-sm font-medium tracking-wide uppercase transition-all transform hover:scale-105 active:scale-95 border ${isScrolled ? 'bg-zinc-900 border-zinc-900 text-white hover:bg-gastro-600 hover:border-gastro-600' : 'bg-white/10 backdrop-blur-sm border-white/50 text-white hover:bg-white hover:text-zinc-900'} shadow-[0_0_20px_rgba(255,255,255,0.05)]`}>
              Reservar Mesa
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={`w-6 h-6 ${isScrolled ? 'text-zinc-900' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${isScrolled ? 'text-zinc-900' : 'text-white'}`} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-zinc-950/60 z-10" />
          <img 
            src={HERO_IMAGE} 
            alt="Plato Gourmet" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-6 py-2 border border-white/20 text-white mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Cocina de Autor</span>
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.1] mb-6 drop-shadow-lg italic"
          >
            Arte en cada <br/> bocado.
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-12 font-light tracking-wide"
          >
            Una travesía culinaria donde la tradición y la innovación técnica convergen en platos visualmente impresionantes.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#experiencia" className="w-full sm:w-auto px-8 py-4 bg-gastro-600 hover:bg-gastro-700 text-white uppercase tracking-wider text-sm font-medium transition-all group flex items-center justify-center gap-2">
              Descubrir Menú
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer" onClick={() => document.getElementById('experiencia')?.scrollIntoView({ behavior: 'smooth'})}>
          <div className="w-[30px] h-[50px] border border-white/30 flex items-start justify-center p-1">
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-[1px] h-4 bg-white"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="experiencia" className="py-32 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-gastro-600 font-medium tracking-[0.2em] text-sm uppercase mb-3">La Filosofía</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-6 italic">Gastronomía Sin Prisa.</h3>
            <p className="text-lg text-zinc-500 font-light tracking-wide">
              Creemos en los tiempos perfectos, las temperaturas precisas y la pasión absoluta por los detalles en cada creación.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {FEATURES.map((feature, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="group relative overflow-hidden bg-zinc-50 border border-zinc-100 hover:shadow-2xl hover:shadow-gastro-900/10 transition-all duration-500"
              >
                <div className="h-72 overflow-hidden relative">
                  <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-[1.5s] ease-out brightness-90 group-hover:brightness-100" 
                  />
                  <div className="absolute top-6 left-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm flex items-center justify-center text-gastro-600 border border-white/50">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-10 text-center">
                  <h4 className="text-xl font-serif text-zinc-900 mb-4 group-hover:text-gastro-600 transition-colors uppercase tracking-widest">{feature.title}</h4>
                  <p className="text-zinc-500 leading-relaxed font-light mb-8">
                    {feature.description}
                  </p>
                  <a href="#menu" className="inline-flex items-center text-gastro-600 font-medium text-xs uppercase tracking-widest hover:text-gastro-800 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gastro-600 after:scale-x-0 outline-none hover:after:scale-x-100 after:transition-transform after:origin-left pb-1">
                    Explorar
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Menu / Philosophy Quote Banner */}
      <section id="menu" className="py-24 relative overflow-hidden bg-zinc-950 text-white flex items-center">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000&auto=format&fit=crop" alt="Textura restaurante" className="w-full h-full object-cover opacity-20 invert grayscale"/>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
             <Flame className="w-10 h-10 text-gastro-500 mx-auto mb-8" />
             <h2 className="text-3xl md:text-5xl font-serif mb-8 italic text-zinc-300 leading-relaxed">
               "Comer es una necesidad, pero disfrutar de una obra maestra es un arte."
             </h2>
             <p className="text-gastro-400 tracking-[0.2em] text-sm uppercase">— El Chef Ejecutivo</p>
          </motion.div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="reservas" className="py-32 bg-gastro-50 relative z-20 border-t border-gastro-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-gastro-600 font-medium tracking-[0.2em] text-sm uppercase mb-3">Reservas</h2>
              <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 mb-6 italic">Asegura tu Mesa.</h3>
              <p className="text-lg text-zinc-600 font-light mb-12">
                 Ubicados en un exclusivo y silencioso sector de San Miguel. Te invitamos a vivir una velada gastronómica inigualable. Se requiere reserva con antelación.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-gastro-200 bg-white flex items-center justify-center text-gastro-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-zinc-900 mb-1">Ubicación Exclusiva</h4>
                    <p className="text-zinc-600 font-light">A pasos de la <strong className="text-gastro-800 font-medium">Estación de Metro El Llano</strong></p>
                    <p className="text-zinc-500 text-sm font-light">Barrio Residencial El Llano, San Miguel, Santiago</p>
                    <a 
                      href="https://goo.gl/maps/bH3zZ35L4cQ8mXJq7" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-gastro-600 hover:text-gastro-800 font-medium text-xs uppercase tracking-widest transition-colors"
                    >
                      Ver en el Mapa <ChevronRight className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-gastro-200 bg-white flex items-center justify-center text-gastro-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-zinc-900 mb-1">Contacto Directo</h4>
                    <p className="text-zinc-600 font-light">+56 9 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 border border-gastro-200 bg-white flex items-center justify-center text-gastro-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-zinc-900 mb-1">Para Eventos Privados</h4>
                    <p className="text-zinc-600 font-light">reservas@aurarestaurant.cl</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
               className="relative h-[600px] border-4 border-white shadow-2xl shadow-gastro-900/10 group"
            >
                <div className="absolute inset-0 bg-zinc-200 animate-pulse" />
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2000&auto=format&fit=crop" 
                  alt="Fachada del Restaurante Aura en El Llano" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-1000"
                />
                
                {/* Overlay exact location marker */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <a 
                  href="https://goo.gl/maps/bH3zZ35L4cQ8mXJq7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 cursor-pointer w-full"
                >
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 flex flex-col items-center text-center max-w-[250px]">
                     <MapPin className="w-6 h-6 text-gastro-400 mb-3" />
                     <p className="font-serif text-white text-lg mb-1">Barrio El Llano</p>
                     <p className="text-xs text-gastro-200 uppercase tracking-widest">Abrir Mapa</p>
                  </div>
                </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-zinc-400 py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-2xl font-serif text-white tracking-widest uppercase mb-2">Aura</span>
              <p className="text-sm font-light text-zinc-500">Alta Cocina en San Miguel</p>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest font-medium">
              <a href="#" className="hover:text-gastro-400 transition-colors">Menú</a>
              <a href="#" className="hover:text-gastro-400 transition-colors">Vinos</a>
              <a href="#" className="hover:text-gastro-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-gastro-400 transition-colors">Instagram</a>
            </div>
            <p className="text-xs font-light tracking-wide text-zinc-600">© {new Date().getFullYear()} AURA RESTAURANT. TODOS LOS DERECHOS RESERVADOS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
