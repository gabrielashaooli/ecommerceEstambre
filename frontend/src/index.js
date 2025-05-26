import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


// Importamos los contextos
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ToastContainer />
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
