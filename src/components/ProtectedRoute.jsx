import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const loggedInRole = localStorage.getItem("role");
  if (!loggedInRole) return <Navigate to="/login" replace />;
  if (loggedInRole !== role) return <Navigate to="/login" replace />;
  return children;
}

export default ProtectedRoute;
