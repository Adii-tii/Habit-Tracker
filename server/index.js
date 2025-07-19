import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import habitRoutes from './routes/habitRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
import quickTaskRoutes from './routes/quickTaskRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/quicktasks', quickTaskRoutes);
app.use('/api/feedback', feedbackRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
