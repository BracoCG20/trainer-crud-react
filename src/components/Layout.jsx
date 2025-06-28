import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/trainers" className="hover:underline">
            Entrenadores
          </Link>
          <Link to="/admin/users" className="hover:underline">
            Usuarios
          </Link>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-purple-700 text-white p-4 shadow">
          <h1 className="text-lg font-semibold">PokéApp</h1>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
