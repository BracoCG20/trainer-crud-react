import { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const succes = login({ username, password });
    if (succes) {
      navigate("/dashboard");
    } else {
      setError("Credenciales invalidas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Iniciar Sesion</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-2 border-blue-300 p-2 rounded-md"
      />
      <input
        type="password"
        placeholder="Contrasena"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-blue-300 p-2 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-500 py-3 px-6 rounded-lg text-white"
      >
        Ingresar
      </button>
    </form>
  );
}

export default LoginPage;
