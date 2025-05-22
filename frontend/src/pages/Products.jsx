import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc] min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center text-[#45654f] mb-6">
        Productos disponibles
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {productos.map((prod) => (
          <div
            key={prod.id || prod.id_producto}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-transform p-6"
          >
            <h2 className="text-xl font-bold text-[#45654f] mb-2">{prod.nombreProducto}</h2>
            <p className="text-[#7f9e99] mb-4">{prod.descripcion}</p>
            <div className="text-sm text-[#45654f] mb-4">
              <p>💰 <span className="font-semibold">Precio:</span> ${prod.precio.toFixed(2)}</p>
              <p>📦 <span className="font-semibold">Stock:</span> {prod.stock} unidades</p>
            </div>
            <button
              onClick={() => addToCart(prod)}
              className="mt-4 w-full bg-[#ff9a52] text-white py-2 rounded-md hover:bg-[#ffbf91]"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
