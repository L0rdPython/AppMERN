/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import { registerRequest } from "../api/auth";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("No AuthContext defined for this application");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
