import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const [formData, setFormData] = useState({
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    telefono: "",
    notas: "",
    numeroTarjeta: "",
    nombreTarjeta: "",
    expiracion: "",
    cvv: "",
  });

  const [procesando, setProcesando] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcesando(true);
    setTimeout(() => {
      toast.success("¡Compra completada! Gracias por tu pedido.");
      clearCart();
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc]">
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-bold text-[#45654f] mb-6 text-center">Finalizar compra</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h2 className="text-xl font-bold text-[#45654f]">Datos de envío</h2>
          <input name="direccion" placeholder="Dirección" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input name="ciudad" placeholder="Ciudad" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input name="codigoPostal" placeholder="Código Postal" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input name="telefono" placeholder="Teléfono" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <textarea name="notas" placeholder="Notas adicionales" onChange={handleChange} className="w-full px-4 py-2 border rounded" />

          <h2 className="text-xl font-bold text-[#45654f] pt-4">Datos de tarjeta</h2>
          <input name="numeroTarjeta" placeholder="Número de tarjeta" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <input name="nombreTarjeta" placeholder="Nombre en la tarjeta" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          <div className="flex gap-4">
            <input name="expiracion" placeholder="MM/YY" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
            <input name="cvv" placeholder="CVV" onChange={handleChange} className="w-full px-4 py-2 border rounded" />
          </div>

          <button type="submit" disabled={procesando} className="w-full mt-4 bg-[#ff9a52] hover:bg-[#ffbf91] text-white font-semibold py-2 rounded">
            {procesando ? "Procesando..." : "Finalizar compra"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
