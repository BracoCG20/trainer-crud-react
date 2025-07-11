import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedRoute;
