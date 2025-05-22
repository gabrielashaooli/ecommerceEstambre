import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

// función de alerta simple que reemplaza toast
const toast = ({ title, description }) => {
  alert(`${title}\n${description}`);
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error al leer el carrito:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);

      if (existing) {
        if (existing.cantidad + 1 > product.stock) {
          toast({
            title: "¡Stock insuficiente!",
            description: "No hay más unidades disponibles.",
          });
          return prevItems;
        }

        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        toast({
          title: "Producto añadido",
          description: `${product.nombreProducto} añadido al carrito`,
        });
        return [...prevItems, { ...product, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, cantidad) => {
    if (cantidad < 1) return;

    setItems((prevItems) => {
      const product = prevItems.find((item) => item.id === productId);

      if (product && cantidad > product.stock) {
        toast({
          title: "¡Stock insuficiente!",
          description: "No hay más unidades disponibles.",
        });
        return prevItems;
      }

      return prevItems.map((item) =>
        item.id === productId ? { ...item, cantidad } : item
      );
    });
  };

  const clearCart = () => {
    setItems([]);
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
