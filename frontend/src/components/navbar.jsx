import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-[#d3dbd9] text-[#a4bdbc] shadow-md px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold tracking-wide text-[#ff9a52]">
        🧶 EstambresUP
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/login" className="hover:text-[#ff9a52] font-medium">Iniciar sesión</Link>
        <Link to="/register" className="hover:text-[#ff9a52] font-medium">Registrarse</Link>
        <Link to="/perfil" className="text-xl hover:text-[#ff9a52]"><FaUserCircle /></Link>
        <Link to="/carrito" className="text-xl hover:text-[#ff9a52]"><FaShoppingCart /></Link>
      </div>
    </nav>
  );
}

export default Navbar;