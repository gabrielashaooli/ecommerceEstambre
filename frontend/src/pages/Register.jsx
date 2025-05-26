import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = async () => {
  setMensaje("");

  if (!nombre || !correo || !contrasena) {
    setMensaje("Por favor, completa todos los campos.");
    return;
  }

  if (contrasena.length < 6) {
    setMensaje("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  const res = await fetch("http://localhost:8080/api/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, contrasena }),
  });

  const data = await res.text();
  setMensaje(data);

  if (data === "Registro exitoso.") {
    navigate("/login");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#d3dbd9] to-white">
      <div className="w-full max-w-md bg-[#a4bdbc] p-8 rounded-lg shadow-lg">
        <h3 className="text-3xl font-bold mb-6 text-center text-white">Crear cuenta</h3>

        {mensaje && (
          <p className="mb-4 text-center text-[#ffdabf] font-medium">{mensaje}</p>
        )}

        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-white text-[#a4bdbc] border border-[#d3dbd9] placeholder-[#d3dbd9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a52]"
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className="w-full px-4 py-2 mb-4 bg-white text-[#a4bdbc] border border-[#d3dbd9] placeholder-[#d3dbd9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a52]"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          className="w-full px-4 py-2 mb-6 bg-white text-[#a4bdbc] border border-[#d3dbd9] placeholder-[#d3dbd9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff9a52]"
        />
        <button
          onClick={manejarRegistro}
          className="w-full bg-[#ff9a52] text-white font-semibold py-2 rounded-lg hover:bg-[#ffbf91] transition duration-200 mb-4"
        >
          Registrarme
        </button>

        <p className="text-center text-white">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="font-semibold text-[#ffdabf] hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;