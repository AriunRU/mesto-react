import React from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

function ProtectedRoute({ element: Component, ...props }) {
  const value = React.useContext(AppContext);
  return value.state ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
}

export default ProtectedRoute;
