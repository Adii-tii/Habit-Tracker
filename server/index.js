import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // Import routes

dotenv.config();         // Load env variables
connectDB();             // Connect to MongoDB

const app = express();

// 🔒 Middlewares
app.use(cors());
app.use(express.json()); // To parse incoming JSON

// ✅ Routes
app.use('/api/users', userRoutes);

// 🏠 Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
