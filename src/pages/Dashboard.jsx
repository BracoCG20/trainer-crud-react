import React from "react";
import { useAuth } from "../auth/useAuth";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Bienvenido <strong>{user?.username}</strong> (rol:<em>{user?.role}</em>)
      </p>
      <nav className="m-4">
        <Link to="/trainers" className="text-blue-500 underline">
          Ir a Gestion de Entrenadores
        </Link>
        {user.role === "admin" && (
          <>
            {"|"}
            <Link to="/admin/users" className="text-blue-500 underline">
              Ir a Gestion de usuarios
            </Link>
          </>
        )}
      </nav>
      <button onClick={handleLogout}>Cerrar Session</button>
    </div>
  );
}

export default Dashboard;
