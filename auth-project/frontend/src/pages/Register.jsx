import { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('auth/register', form);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Registration successful! Redirecting to login...</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          name="name" 
          onChange={handleChange} 
          placeholder="Name" 
          required
          style={{ padding: '0.5rem' }}
        />
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
          style={{ padding: '0.5rem', backgroundColor: '#28a745', color: 'white', border: 'none' }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;