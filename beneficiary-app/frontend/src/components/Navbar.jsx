import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");  // 👈 send back to login
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="font-bold">Beneficiary App</h1>
      <div className="flex gap-4 items-center">
        {user && <span className="text-sm">Role: {user.role}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
