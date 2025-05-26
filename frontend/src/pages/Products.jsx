import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const { addToCart } = useCart();
  const [precioMax, setPrecioMax] = useState(120);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.log(err));
  }, []);

  const productosFiltrados = productos.filter((prod) => {
    const nombre = prod.nombreProducto?.toLowerCase() || "";
    const coincideBusqueda = nombre.includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoria === "todas" || prod.categoria?.id === parseInt(categoria);
    const coincidePrecioMax = prod.precio <= parseFloat(precioMax);

      return coincideBusqueda && coincideCategoria && coincidePrecioMax;

  });

  

  return (
    <div className="bg-gradient-to-b from-[#e6f1ef] to-[#f9fafc] min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center text-[#45654f] mb-6">
        Productos disponibles
      </h1>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#7f9e99] w-full md:w-1/2"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="px-4 py-2 rounded-lg border border-[#7f9e99] w-full md:w-1/3"
        >
          <option value="todas">Todas las categorías</option>
          <option value="1">Acrílico</option>
          <option value="2">Lana</option>
          <option value="3">Algodón</option>
          <option value="4">Reciclado</option>
        </select>
      </div>

      {/* Filtro de precio */}
      <div className="flex flex-col items-center gap-2 mb-8 max-w-4xl mx-auto">
        <label className="text-[#45654f] font-semibold">Filtrar por precio hasta: ${precioMax}</label>
          <input
            type="range"
            min="0"
            max="120"
            step="0"
            value={precioMax}
            onChange={(e) => setPrecioMax(e.target.value)}
              className="w-full md:w-2/3 accent-[#ff9a52]"
          />
          </div>


      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {productosFiltrados.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-transform p-4"
          >
            <img
              src={`/imagenes/${prod.imagen}`}
              alt={prod.nombreProducto}
              className="w-full h-50 object-cover rounded-xl mb-4"
              onError={(e) => (e.target.src = "/imagenes/neon.jpg")}
            />
            <h2 className="text-xl font-bold text-[#45654f] mb-2">
              {prod.nombreProducto}
            </h2>
            <p className="text-[#7f9e99] mb-4">{prod.descripcion}</p>
            <div className="text-sm text-[#45654f] mb-4">
              <p>💰 <span className="font-semibold">Precio:</span> ${prod.precio.toFixed(2)}</p>
              <p>📦 <span className="font-semibold">Stock:</span> {prod.stock} unidades</p>
            </div>
            <button
              onClick={() => addToCart(prod)}
              className="w-full bg-[#ff9a52] text-white py-2 rounded-md hover:bg-[#ffbf91]"
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
