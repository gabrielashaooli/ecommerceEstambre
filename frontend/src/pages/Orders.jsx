// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaTruck } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Orders() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      // Simulación de datos
      const mockOrders = [
        {
          id: 1,
          fecha: "2024-01-15",
          total: 749.0,
          estado: "entregado",
          items: [
            { id: 1, nombreProducto: "Estambre Azul", cantidad: 2, precio: 249.0 },
            { id: 2, nombreProducto: "Agujas Set", cantidad: 1, precio: 251.0 },
          ],
        },
        {
          id: 2,
          fecha: "2024-01-20",
          total: 498.0,
          estado: "enviado",
          items: [{ id: 3, nombreProducto: "Estambre Rosa", cantidad: 2, precio: 249.0 }],
        },
      ];

      setOrders(mockOrders);
      setIsLoading(false);
    };

    fetchOrders();
  }, [user]);

  const getIcon = (estado) => {
    switch (estado) {
      case "pendiente":
        return <FaClock className="text-yellow-500" />;
      case "procesando":
        return <FaBox className="text-blue-500" />;
      case "enviado":
        return <FaTruck className="text-orange-500" />;
      case "entregado":
        return <FaCheckCircle className="text-green-500" />;
      case "cancelado":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaClock className="text-gray-500" />;
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case "pendiente":
        return "Pendiente";
      case "procesando":
        return "Procesando";
      case "enviado":
        return "Enviado";
      case "entregado":
        return "Entregado";
      case "cancelado":
        return "Cancelado";
      default:
        return estado;
    }
  };

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc]">
      <div className="container mx-auto p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-[#45654f] mb-4">Mis Pedidos</h1>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin h-12 w-12 border-4 border-[#45654f] border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-4 text-[#7f9e99]">Cargando pedidos...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <FaBox className="mx-auto text-4xl text-[#7f9e99]" />
              <p className="mt-4 text-lg text-[#45654f] font-semibold">No tienes pedidos aún</p>
              <button
                onClick={() => navigate("/products")}
                className="mt-6 bg-[#ff9a52] text-white px-4 py-2 rounded-lg hover:bg-[#ffbf91]"
              >
                Ir a productos
              </button>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow mb-6 p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-[#45654f]">
                      Pedido #{order.id}
                    </h2>
                    <p className="text-[#7f9e99]">
                      Fecha: {new Date(order.fecha).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getIcon(order.estado)}
                    <span className="text-[#45654f] font-medium">
                      {getEstadoTexto(order.estado)}
                    </span>
                  </div>
                  <div className="text-[#45654f] font-bold text-lg">
                    ${order.total.toFixed(2)}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-[#45654f] mb-2">Productos</h3>
                  <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-2 flex justify-between text-sm text-[#45654f]">
                        <span>{item.nombreProducto} x{item.cantidad}</span>
                        <span>${(item.precio * item.cantidad).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
