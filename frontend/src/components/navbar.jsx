import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-[#45654f] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          🧵 EstambresUP
        </Link>

        {/* Menú derecho */}
        <div className="flex items-center gap-4 relative">
          <Link
            to="/productos"
            className="text-white hover:text-[#ffdabf] font-medium"
          >
            Productos
          </Link>

          {/* Icono carrito */}
          <Link to="/carrito" className="relative text-white">
            <FaShoppingCart className="text-xl" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff9a52] text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </Link>

          {/* Usuario */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="text-white text-xl focus:outline-none"
                onClick={() => setMenuAbierto(!menuAbierto)}
              >
                <FaUserCircle />
              </button>

              {menuAbierto && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="p-3 border-b">
                    <p className="text-sm font-semibold text-[#45654f]">
                      {user?.nombre}
                    </p>
                    <p className="text-xs text-gray-500">{user?.correo}</p>
                  </div>
                  <Link
                    to="/perfil"
                    className="block px-4 py-2 hover:bg-gray-100 text-[#45654f]"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    to="/mis-pedidos"
                    className="block px-4 py-2 hover:bg-gray-100 text-[#45654f]"
                    onClick={() => setMenuAbierto(false)}
                  >
                    Mis pedidos
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMenuAbierto(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-white hover:text-[#ffdabf] font-medium"
            >
              <FaSignInAlt className="text-sm" />
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
