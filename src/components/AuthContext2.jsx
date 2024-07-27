import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext2 = createContext();

export const AuthProvider2 = ({ children }) => {
  const [isAuthenticated2, setIsAuthenticated2] = useState(() => {
    const storedAuthState2 = localStorage.getItem("isAuthenticated2");
    return storedAuthState2 ? JSON.parse(storedAuthState2) : false;
  });

  useEffect(() => {
    localStorage.setItem("isAuthenticated2", JSON.stringify(isAuthenticated2));
  }, [isAuthenticated2]);

  return (
    <AuthContext2.Provider value={{ isAuthenticated2, setIsAuthenticated2 }}>
      {children}
    </AuthContext2.Provider>
  );
};

export const useAuth2 = () => useContext(AuthContext2);
