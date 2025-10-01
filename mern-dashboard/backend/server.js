import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js'; // Include file extension if using ES module

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Create default admin
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin'
      });
      await adminUser.save();
      console.log('✅ Default admin created');
    } else {
      console.log('ℹ️ Admin already exists');
    }
  } catch (err) {
    console.error('❌ Error creating default admin:', err.message);
  }
};

// Connect DB and start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✅ MongoDB connected');
    createDefaultAdmin();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
