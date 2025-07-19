import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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

  type: {
    type: String,
    enum: ['time', 'checklist', 'counter'],
    required: true,
  },

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
