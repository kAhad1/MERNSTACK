import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from "./pages/SignUp";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import ReceptionistDashboard from "./pages/ReceptionistDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect root "/" to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute roles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/receptionist" element={<ProtectedRoute roles={["Receptionist"]}><ReceptionistDashboard /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute roles={["Staff"]}><StaffDashboard /></ProtectedRoute>} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
