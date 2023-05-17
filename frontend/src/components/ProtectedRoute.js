import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Сomponent, loggedIn, elsePath }) => {
  return (
    loggedIn ? Сomponent : <Navigate to={elsePath} replace/>
)};

export default ProtectedRoute;