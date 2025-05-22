import React, { createContext, useContext, useState, useEffect } from "react";

const toast = ({ title, description }) => {
  alert(`${title}\n${description}`);
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al leer usuario:", error);
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (correo, contrasena) => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      if (!res.ok) {
        const text = await res.text();
        toast({ title: "Error de inicio de sesión", description: text || "Credenciales incorrectas" });
        return false;
      }

      const userData = await res.json();
      localStorage.setItem("authToken", userData.token || "fake-token");
      localStorage.setItem("user", JSON.stringify({
        id: userData.id,
        nombre: userData.nombre,
        correo: userData.correo,
      }));

      setUser(userData);
      setIsAuthenticated(true);
      toast({ title: "¡Bienvenido!", description: `Hola, ${userData.nombre}` });

      return true;
    } catch (error) {
      console.error("Error en login:", error);
      toast({ title: "Error de conexión", description: "No pudimos conectar al servidor." });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (nombre, correo, contrasena) => {
    try {
      setIsLoading(true);

      const res = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }),
      });

      const text = await res.text();

      if (!res.ok) {
        toast({ title: "Error de registro", description: text || "No se pudo crear la cuenta" });
        return text;
      }

      toast({ title: "Registro exitoso", description: "Ya puedes iniciar sesión." });
      return text;
    } catch (error) {
      console.error("Error en registro:", error);
      toast({ title: "Error de conexión", description: "Inténtalo más tarde." });
      return "Error de conexión.";
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    toast({ title: "Sesión cerrada", description: "Saliste correctamente." });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};
