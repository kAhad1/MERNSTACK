import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Welcome Admin!</h2>
      <p>This is the Admin Dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
