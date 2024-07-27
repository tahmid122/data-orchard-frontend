import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth2 } from "./AuthContext2";

const ProtectedRoutes2 = ({ children }) => {
  const { isAuthenticated2 } = useAuth2();
  if (isAuthenticated2) {
    return children;
  } else {
    return <Navigate to="/adminLogin" replace />;
  }
};

export default ProtectedRoutes2;
