const express = require('express');
const router = express.Router();
const QuickTask = require('../models/QuickTask');

// Create a new quick task
router.post('/', async (req, res) => {
  try {
    const { text, userId } = req.body;
    if (!text || !userId) {
      return res.status(400).json({ message: 'Text and userId are required.' });
    }
    const quickTask = await QuickTask.create({ text, userId });
    res.status(201).json({ quickTask });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create quick task', error: err.message });
  }
});

// Get all quick tasks for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const quickTasks = await QuickTask.find({ userId });
    res.json(quickTasks);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch quick tasks', error: err.message });
  }
});

// Update a quick task (toggle done or edit text)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const quickTask = await QuickTask.findByIdAndUpdate(id, updates, { new: true });
    res.json({ quickTask });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update quick task', error: err.message });
  }
});

// Delete a quick task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await QuickTask.findByIdAndDelete(id);
    res.json({ message: 'Quick task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete quick task', error: err.message });
  }
});

module.exports = router; 