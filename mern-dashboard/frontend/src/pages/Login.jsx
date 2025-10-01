import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.role === 'admin') navigate('/admin');
      else navigate('/dashboard');
     
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      <div className="link">
        Don’t have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
