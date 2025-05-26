import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#e6f1ef]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-40 bg-gradient-to-b from-[#45654f]/20 to-[#e6f1ef] relative">
        <img
          src="/imagenes/home.jpg"
          alt="Estambres"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-40 pointer-events-none"

        />
        <h1 className="text-5xl font-extrabold text-[#45654f] mb-4 z-10">
          Bienvenida a <span className="text-[#ff9a52]">EstambresUP</span>
        </h1>
        <p className="text-[#45654f] max-w-xl mb-6 z-10">
          Tu tienda de estambres para tejer con amor. Compra fácil, rápido y con productos de calidad premium.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 z-10">
          <button
            onClick={() => navigate("/products")}
            className="bg-[#ff9a52] text-white px-6 py-3 rounded hover:bg-[#ffbf91]"
          >
            Ver productos
          </button>
          <button
            onClick={() => navigate("/register")}
            className="border border-[#7f9e99] text-[#45654f] px-6 py-3 rounded hover:bg-[#dfeeea]"
          >
            Crear cuenta
          </button>
        </div>
      </section>

      {/* Beneficios */}
      <section className="bg-white py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-[#45654f] mb-10">¿Por qué elegirnos?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-[#f9fafc] p-6 rounded-lg shadow text-center">
            <img src="/imagenes/26.jpg" alt="Calidad" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold text-[#45654f]">Calidad premium</h3>
            <p className="text-[#7f9e99] mt-2">Estambres seleccionados con cuidado y amor.</p>
          </div>
          <div className="bg-[#f9fafc] p-6 rounded-lg shadow text-center">
            <img src="/imagenes/27.jpg" alt="Pasión" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold text-[#45654f]">Hecho con pasión</h3>
            <p className="text-[#7f9e99] mt-2">Apoyamos proyectos creativos como el tuyo.</p>
          </div>
          <div className="bg-[#f9fafc] p-6 rounded-lg shadow text-center">
            <img src="/imagenes/25.jpg" alt="Calidad" className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-bold text-[#45654f]">Compra segura</h3>
            <p className="text-[#7f9e99] mt-2">Tus datos están protegidos y tu compra garantizada.</p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-[#45654f] to-[#7f9e99] text-white text-center px-4">
        <h2 className="text-3xl font-bold mb-4">¿Lista para empezar?</h2>
        <p className="mb-6">Haz clic abajo para explorar todos nuestros productos.</p>
        <button
          onClick={() => navigate("/products")}
          className="bg-[#ff9a52] hover:bg-[#ffbf91] text-white font-semibold px-8 py-4 rounded"
        >
          Ver productos
        </button>
      </section>

      <footer className="bg-[#45654f] text-white text-center py-6">
        <p>© {new Date().getFullYear()} EstambresUP. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;
