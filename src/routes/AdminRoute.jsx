import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }
  return children;
}

export default AdminRoute;
