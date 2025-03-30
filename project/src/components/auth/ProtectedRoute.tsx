// auth/protectedRoute.tsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../lib/store";
import type { User } from "../../types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: User["role"][];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    // User is not logged in; redirect to login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // User does not have an allowed role; redirect to home
    return <Navigate to="/" replace />;
  }

  // User is authorized, render the children
  return <>{children}</>;
}
