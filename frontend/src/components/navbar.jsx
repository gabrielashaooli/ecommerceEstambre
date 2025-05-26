import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUserCircle, FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-[#45654f] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">🧵 EstambresUP</Link>

        <div className="flex items-center gap-4 relative">
          <Link to="/products" className="text-white hover:text-[#ffdabf] font-medium">Productos</Link>

          <Link to="/cart" className="relative text-white">
            <FaShoppingCart className="text-xl" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff9a52] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="relative">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-white text-xl focus:outline-none">
                <FaUserCircle />
              </button>
              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="p-3 border-b">
                    <p className="text-sm font-semibold text-[#45654f]">{user?.nombre}</p>
                    <p className="text-xs text-gray-500">{user?.correo}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-[#45654f]" onClick={() => setMenuAbierto(false)}>Perfil</Link>
                  <Link to="/Orders" className="block px-4 py-2 hover:bg-gray-100 text-[#45654f]" onClick={() => setMenuAbierto(false)}>Pedidos</Link>

                  <button onClick={() => { logout(); setMenuAbierto(false); }} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">Cerrar sesión</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-white hover:text-[#ffdabf] font-medium">
              <FaSignInAlt className="text-sm" /> Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;