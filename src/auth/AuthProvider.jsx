// src/auth/AuthProvider.jsx
import { useState } from "react";
import { AuthContext } from "./AuthContext";

const fakeUsers = [
  { username: "admin", password: "1234", role: "admin" },
  { username: "ash", password: "pikachu", role: "trainer" },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = ({ username, password }) => {
    const found = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
