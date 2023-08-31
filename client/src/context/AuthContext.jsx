/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest, loginRequest, verityTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

//? Define un contexto de autenticación
export const AuthContext = createContext();

//? Hook personalizado para acceder al contexto de autenticación
//? Retorna el contexto de autenticación o arroja un error si no se encuentra
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No Context defined for this application");
  }
  return context;
};

//? Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {
  //? Estados para el usuario autenticado, el estado de autenticación, errores y carga
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  //? Función para el proceso de registro
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  //? Función para el proceso de inicio de sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
      console.log(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  //? Efecto para limpiar los errores después de un tiempo determinado
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  //? Efecto para verificar la autenticación inicial
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verityTokenRequest(cookies.token);

        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  //? Proporciona el contexto de autenticación y sus valores a los componentes hijos
  return (
    <AuthContext.Provider
      value={{ signup, signin, logout, isAuthenticated, errors, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
