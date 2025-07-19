import express from 'express';
import Reminder from '../models/Reminder.js';

const router = express.Router();

// Create a new reminder
router.post('/', async (req, res) => {
  try {
    const { title, type, date, time, userId } = req.body;
    if (!title || !type || !date || !time || !userId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const reminder = await Reminder.create({ title, type, date, time, userId });
    res.status(201).json({ reminder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create reminder', error: err.message });
  }
});

// Get all reminders for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const reminders = await Reminder.find({ userId });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reminders', error: err.message });
  }
});

// Delete a reminder
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Reminder.findByIdAndDelete(id);
    res.json({ message: 'Reminder deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete reminder', error: err.message });
  }
});

export default router; 