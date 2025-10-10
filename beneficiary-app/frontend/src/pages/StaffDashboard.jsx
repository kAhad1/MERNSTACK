import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function StaffDashboard() {
  const [cnic, setCnic] = useState("");
  const [beneficiary, setBeneficiary] = useState(null);
  const [status, setStatus] = useState("");

  // 🔍 Search Beneficiary by CNIC
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/beneficiaries/search?cnic=${cnic}`);
      setBeneficiary(res.data);
      setStatus(res.data.status || "Pending");
    } catch (err) {
      setBeneficiary(null);
      alert("❌ Beneficiary not found. Please check CNIC.");
    }
  };

  // 🔄 Update Status
  const handleStatusUpdate = async () => {
    if (!beneficiary?.tokenId) {
      return alert("No token found for this beneficiary.");
    }
  
    try {
      await api.put(`/beneficiaries/update-status/${beneficiary.tokenId}`, {
        status,
      });
      alert("✅ Token status updated successfully!");
      setBeneficiary({ ...beneficiary, status });
    } catch (err) {
      alert("❌ Failed to update token status");
      console.error(err);
    }
  };
  
  
  
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Staff Dashboard</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={cnic}
            onChange={(e) => setCnic(e.target.value)}
            placeholder="Enter CNIC to search"
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        {/* Beneficiary Info */}
        {beneficiary && (
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Beneficiary Details</h2>
            <p><strong>Name:</strong> {beneficiary.name}</p>
            <p><strong>CNIC:</strong> {beneficiary.cnic}</p>
            <p><strong>Purpose:</strong> {beneficiary.purpose}</p>
            <p><strong>Department:</strong> {beneficiary.department}</p>
            <p><strong>Current Status:</strong> {beneficiary.status || "Pending"}</p>

            {/* Status Update Dropdown */}
            <div className="mt-4">
              <label className="font-semibold">Update Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border p-2 rounded ml-2"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button
                onClick={handleStatusUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded ml-3 hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
