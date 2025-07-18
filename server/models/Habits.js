import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // optional if you have a User model
  },
  name: {
    type: String,
    required: true,
  },
  category: String,
  progress: {
    type: Number,
    default: 0,
  },
  streak: {
    type: Number,
    default: 0,
  },
  time: String,
  completed: {
    type: Boolean,
    default: false,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
  },
  notes: String,

  // Timing fields
  timeSpent: {
    type: Number,
    default: 0, // in seconds
  },
  targetTime: {
    type: Number,
    default: 0, // in seconds
  },

  // 👇 NEW field to indicate how the habit is tracked
  type: {
    type: String,
    enum: ['time', 'checklist', 'counter'],
    required: true,
  },

  // Optional for counter-type habits (like water intake)
  counterValue: {
    type: Number,
    default: 0,
  },
  counterTarget: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
});

export default mongoose.model('Habit', habitSchema);
