// src/pages/Profile.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc] flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="h-24 w-24 bg-[#a4bdbc] rounded-full flex items-center justify-center mb-4">
            <FaUser className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#45654f]">{user.nombre}</h1>
          <p className="text-[#7f9e99]">{user.correo}</p>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-[#45654f] mb-2">Información de la cuenta</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#7f9e99] mb-1">Nombre</label>
                <p className="font-medium text-[#45654f]">{user.nombre}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#7f9e99] mb-1">Correo electrónico</label>
                <p className="font-medium text-[#45654f]">{user.correo}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-lg font-semibold text-[#45654f] mb-3">Acciones</h2>
            <div className="space-y-3">
              <button
                className="w-full bg-[#7f9e99] hover:bg-[#a4bdbc] text-white font-semibold py-2 rounded"
                onClick={() => navigate("/Orders")}
              >
                Ver mis pedidos
              </button>
              <button
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
