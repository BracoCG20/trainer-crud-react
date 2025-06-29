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
      setError("Invalid credentials");
    }
  };

  return (
    <>
      <section className=" h-screen flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 p-10 border-3 rounded-xl border-indigo-500"
        >
          <h1 className="text-3xl font-bold text-indigo-900">
            Login to your account
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border-2 border-indigo-300 p-2 rounded-lg w-sm text-center focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-indigo-300 p-2 rounded-lg w-sm text-center focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500"
          />
          {error && (
            <p className="text-xs text-white font-medium bg-red-500 py-1 px-10 rounded-full">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="bg-indigo-500 py-3 px-8 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-indigo-600"
          >
            Login
          </button>
        </form>
      </section>
    </>
  );
}

export default LoginPage;
