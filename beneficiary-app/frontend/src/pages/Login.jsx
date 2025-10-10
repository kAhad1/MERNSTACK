import { useState, useContext, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";   // 👈 named import
import { useNavigate } from "react-router-dom";

export default function Login() {
  // 👇 useContext is called inside your component function
  const { login, user } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Auto redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === "Admin") navigate("/admin");
      else if (user.role === "Receptionist") navigate("/receptionist");
      else if (user.role === "Staff") navigate("/staff");
    }
  }, [user, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      console.log("Login response:", res.data); // debug
      login(res.data.token, res.data.role); // 👈 calling login from context

      if (res.data.role === "Admin") navigate("/admin");
      else if (res.data.role === "Receptionist") navigate("/receptionist");
      else navigate("/staff");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-lg rounded-lg"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border w-full p-2 mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}
