// src/pages/LoginPage.jsx
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login({ username: email, password });
    if (!success) {
      setError("Credenciales inválidas o usuario no registrado");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 p-10 border-3 rounded-xl border-indigo-500"
      >
        <h1 className="text-3xl font-bold text-indigo-900">Iniciar sesión</h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border-2 border-indigo-300 p-2 rounded-lg text-center focus:outline-none focus:ring focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border-2 border-indigo-300 p-2 rounded-lg text-center focus:outline-none focus:ring focus:ring-indigo-500"
        />

        {error && (
          <p className="text-xs text-white font-medium bg-red-500 py-1 px-6 rounded-full">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="bg-indigo-500 py-3 px-8 rounded-lg text-white hover:bg-indigo-600 transition-colors duration-300"
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
