import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/axios";




export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Example call for metrics (you can add charts later)
    async function fetchStats() {
      const res = await api.get("/beneficiaries/search?cnic=12345");
      setStats(res.data);
    }
    fetchStats();
  }, []);

  return (
    <div>
    <Navbar />
    <div className="p-6">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <p>Welcome to the Admin panel 🚀</p>
    </div>
  </div>
   
  );
}
