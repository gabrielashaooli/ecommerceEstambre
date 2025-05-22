import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart({ items, isAuthenticated, getTotalPrice, clearCart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Debes iniciar sesión para completar la compra");
      navigate("/login");
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      navigate("/checkout");
    }, 1000);
  };

  if (!items || items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc]">
        <Navbar />
        <div className="container mx-auto p-6 flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
        <FaShoppingBag className="h-16 w-16 text-[#7f9e99] mb-4" />
          <h2 className="text-2xl font-bold text-[#45654f] mb-2">Tu carrito está vacío</h2>
          <p className="text-[#7f9e99] mb-6">¿No sabes qué comprar? ¡Tenemos muchos productos para ti!</p>
          <Link
            to="/"
            className="bg-[#ff9a52] hover:bg-[#ffbf91] text-white px-4 py-2 rounded"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc]">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#45654f] mb-6">Tu carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {items.map((item) => (
                <div key={item.id} className="mb-4 border-b pb-4">
                  <h3 className="font-bold text-[#45654f]">{item.nombreProducto}</h3>
                  <p className="text-[#7f9e99]">{item.descripcion}</p>
                  <p className="text-[#7f9e99]">Precio: ${item.precio}</p>
                  <p className="text-[#7f9e99]">Cantidad: {item.cantidad}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold text-[#45654f] mb-4">Resumen</h2>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-[#7f9e99]">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7f9e99]">Envío</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full bg-[#ff9a52] hover:bg-[#ffbf91] text-white font-semibold py-2 rounded-lg"
                >
                  {isProcessing ? "Procesando..." : "Proceder al pago"}
                </button>

                <button
                  onClick={clearCart}
                  className="w-full border border-[#7f9e99] text-[#7f9e99] hover:bg-[#e6f1ef] py-2 rounded-lg"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;