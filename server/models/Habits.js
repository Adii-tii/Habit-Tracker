import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  category: String,
  progress: Number,
  streak: Number,
  time: String,
  completed: Boolean,
  difficulty: String,
  priority: String,
  notes: String,
  timeSpent: Number,
  targetTime: Number,
}, { timestamps: true });

export default mongoose.model('Habit', habitSchema);
