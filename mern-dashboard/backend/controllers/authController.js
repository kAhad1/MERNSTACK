import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Default admin credentials
const defaultAdmin = {
  email: 'admin@dashboard.com',
  password: 'admin123'
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === defaultAdmin.email && password === defaultAdmin.password) {
    const token = jwt.sign({ email, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ token, role: 'admin', name: 'Admin' });
  }

  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, role: user.role, name: user.name });
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists || email === defaultAdmin.email) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({ message: 'User registered successfully' });
};
