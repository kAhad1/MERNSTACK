import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="container">
      <h2>Welcome User!</h2>
      <p>This is the User Dashboard.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
