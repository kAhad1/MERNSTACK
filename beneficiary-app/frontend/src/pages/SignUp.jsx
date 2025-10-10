import { useState } from "react";
import api from "../api/axios";

export default function SignUp() {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      alert("User registered successfully! You can now login.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border w-full p-2 mb-2"/>
        <input name="email" placeholder="Email" onChange={handleChange} className="border w-full p-2 mb-2"/>
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border w-full p-2 mb-2"/>

        <select name="role" onChange={handleChange} className="border w-full p-2 mb-2" required>
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Receptionist">Receptionist</option>
          <option value="Staff">Staff</option>
        </select>

        <button className="bg-green-500 text-white px-4 py-2 w-full">Sign Up</button>
      </form>
    </div>
  );
  
}


