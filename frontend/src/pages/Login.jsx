import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";


function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(correo, contrasena);
    if (success) {
      ("Login exitoso");
      navigate("/");
    } else {
      ("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-[#d3dbd9] to-white px-4">
      <form onSubmit={handleLogin} className="bg-[#a4bdbc] w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Iniciar sesión</h2>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full px-4 py-2 mb-6 bg-white text-[#a4bdbc] border rounded-lg" placeholder="Correo" />
        <input type="password" value={contrasena} onChange={(e) => setContrasena(e.target.value)} className="w-full px-4 py-2 mb-6 bg-white text-[#a4bdbc] border rounded-lg" placeholder="Contraseña" />
        <button type="submit" className="w-full bg-[#ff9a52] hover:bg-[#ffbf91] text-white font-semibold py-2 rounded-lg">Entrar</button>
        <p className="text-center text-sm text-white mt-4">¿No tienes cuenta? <Link to="/register" className="font-semibold underline text-[#ffdabf] hover:text-white">Regístrate</Link></p>
      </form>
    </div>
  );
}

export default Login;