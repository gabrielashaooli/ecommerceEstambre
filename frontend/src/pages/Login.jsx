import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí pondrás tu lógica de login con backend
    if (correo && contrasena) {
      navigate("/"); // simula login exitoso
    }
  };

    return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#d3dbd9] to-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-[#a4bdbc] w-full max-w-md p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Iniciar sesión
        </h2>

        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full px-4 py-2 mb-6 bg-white text-[#a4bdbc] border border-[#d3dbd9] placeholder-[#d3dbd9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a52]"
          placeholder="Correo"
        />


        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full px-4 py-2 mb-6 bg-white text-[#a4bdbc] border border-[#d3dbd9] placeholder-[#d3dbd9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a52]"
          placeholder="Contraseña"
        />

        <button
          type="submit"
          className="w-full bg-[#ff9a52] hover:bg-[#ffbf91] text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-white mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="font-semibold underline text-[#ffdabf] hover:text-white">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;