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
    <section className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="font-bold text-3xl uppercase text-indigo-900">
        Dashboard
      </h1>
      <p className="text-indigo-900">
        Welcome <strong>{user?.username}</strong> (rol:<em>{user?.role}</em>)
      </p>
      <nav className="flex items-center gap-10 m-4 p-4 ">
        <Link
          to="/trainers"
          className="text-indigo-500 border-2 border-indigo-500 px-5 py-2 rounded-2xl transition-colors duration-300 ease-in-out hover:text-white  hover:bg-indigo-500"
        >
          Go to Trainer Management
        </Link>
        {user.role === "admin" && (
          <>
            {"|"}
            <Link
              to="/admin/users"
              className="text-indigo-500 border-2 border-indigo-500 px-5 py-2 rounded-2xl transition-colors duration-300 ease-in-out hover:text-white  hover:bg-indigo-500"
            >
              Go to User Management
            </Link>
          </>
        )}
      </nav>
      <button
        onClick={handleLogout}
        className="bg-indigo-500 py-3 px-8 rounded-lg text-white cursor-pointer transition-colors duration-300 hover:bg-indigo-600"
      >
        Log Out
      </button>
    </section>
  );
}

export default Dashboard;
