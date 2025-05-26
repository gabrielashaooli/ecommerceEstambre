// Archivo: src/context/CartContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();
const CART_KEY = "carrito";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAuth();

  // Cargar carrito desde localStorage al inicio
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error al leer el carrito:", error);
        localStorage.removeItem(CART_KEY);
      }
    }
  }, []);

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        if (existing.cantidad + 1 > product.stock) {
          toast.warning("¡Stock insuficiente!");
          return prevItems;
        }

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        toast.success(`${product.nombreProducto} añadido al carrito`);
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast.info("Producto eliminado del carrito");
  };

  const updateQuantity = (productId, cantidad) => {
    if (cantidad < 1) return;

    setItems((prevItems) => {
      const product = prevItems.find((item) => item.id === productId);

      if (product && cantidad > product.stock) {
        toast.warning("¡Stock insuficiente!");
        return prevItems;
      }

      return prevItems.map((item) =>
        item.id === productId ? { ...item, cantidad } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem(CART_KEY);
    toast.success("Carrito vaciado");
  };

  const getTotalItems = () =>
    items.reduce((total, item) => total + item.cantidad, 0);

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
};
