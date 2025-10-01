import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          name="email" 
          type="email"
          onChange={handleChange} 
          placeholder="Email" 
          required
          style={{ padding: '0.5rem' }}
        />
        <input 
          name="password" 
          type="password" 
          onChange={handleChange} 
          placeholder="Password" 
          required
          style={{ padding: '0.5rem' }}
        />
        <button 
          type="submit"
          style={{ padding: '0.5rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
          Login 
        </button>
        Don't have a account <a href='Register'>Register here</a>
      </form>
    </div>
  );
};

export default Login;