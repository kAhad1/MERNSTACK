import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ReceptionistDashboard() {
  const [form, setForm] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    department: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/beneficiaries/register", form);
      alert("✅ Beneficiary registered & token assigned successfully!");
      setForm({
        cnic: "",
        name: "",
        phone: "",
        address: "",
        purpose: "",
        department: "",
      });
    } catch (err) {
      alert("❌ Failed to register beneficiary");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Receptionist Dashboard</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg p-6 rounded-lg max-w-lg"
        >
          <input
            name="cnic"
            placeholder="CNIC"
            value={form.cnic}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          />
          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          />

          {/* Dropdown for Purpose */}
          <select
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          >
            <option value="">Select Purpose</option>
            <option value="Medical Assistance">Medical Assistance</option>
            <option value="Financial Aid">Financial Aid</option>
            <option value="Education Support">Education Support</option>
            <option value="Food Ration">Food Ration</option>
            <option value="Job Assistance">Job Assistance</option>
            <option value="Shelter Support">Shelter Support</option>
            <option value="Donation Inquiry">Donation Inquiry</option>
            <option value="Other">Other</option>
          </select>

          {/* Dropdown for Department */}
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            className="border p-2 mb-3 w-full rounded"
            required
          >
            <option value="">Select Department</option>
            <option value="Health Department">Health Department</option>
            <option value="Finance Department">Finance Department</option>
            <option value="Education Department">Education Department</option>
            <option value="Food & Supplies Department">Food & Supplies Department</option>
            <option value="Employment Office">Employment Office</option>
            <option value="Housing Department">Housing Department</option>
            <option value="Donations Office">Donations Office</option>
            <option value="Human Resources">Human Resources</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 w-full rounded hover:bg-green-700"
          >
            Register Beneficiary
          </button>
        </form>
      </div>
    </div>
  );
}
