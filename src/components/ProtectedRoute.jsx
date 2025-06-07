// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("authToken");
  const userRole = localStorage.getItem("userRole"); // store user role on login, e.g. "donor", "recipient", "admin"

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRole !== userRole) {
    // Role not allowed, redirect to their dashboard or login page
    // You can customize this logic based on your app flow
    switch (userRole) {
      case "donor":
        return <Navigate to="/donor-dashboard" replace />;
      case "recipient":
        return <Navigate to="/recipient-dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
