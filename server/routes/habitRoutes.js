import express from 'express';
import Habit from '../models/Habits.js';
const router = express.Router();

console.log("Habit Routes Loaded");

// Test route


// Get habits by userId
router.get('/user/:userId', async (req, res) => {
    console.log(`Getting habits for userId: ${req.params.userId}`);
    try {
        const habits = await Habit.find({ userId: req.params.userId });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch habits', error: err.message });
    }
});

// Create a new habit
router.post('/saveHabit', async (req, res) => {
    console.log('Creating new habit:', req.body);
    try {
        const newHabit = new Habit(req.body);
        const savedHabit = await newHabit.save();
        res.status(201).json({ message: 'Habit saved', habit: savedHabit });
    } catch (err) {
        res.status(500).json({ message: 'Failed to create habit', error: err.message });
    }
});

// Update a habit
router.put('/:habitId', async (req, res) => {
    try {
        const updated = await Habit.findByIdAndUpdate(
            req.params.habitId,
            { $set: req.body },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update habit', error: err.message });
    }
});

// Delete a habit
router.delete('/:habitId', async (req, res) => {
    try {
        await Habit.findByIdAndDelete(req.params.habitId);
        res.json({ message: 'Habit deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete habit', error: err.message });
    }
});

export default router;
