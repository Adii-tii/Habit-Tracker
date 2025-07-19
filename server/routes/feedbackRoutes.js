import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure nodemailer transporter (replace with real credentials in production)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sableaditi8@gmail.com',
    pass: 'eeht dlbx tngu zlnd',
  },
});

router.post('/', async (req, res) => {
  const { feedback, email } = req.body;
  if (!feedback) {
    return res.status(400).json({ message: 'Feedback is required.' });
  }
  const mailOptions = {
    from: email || 'no-reply@habittracker.com',
    to: 'sableaditi8@gmail.com',
    subject: 'New HabitTracker Feedback',
    text: `Feedback: ${feedback}\nFrom: ${email || 'Anonymous'}`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Feedback sent successfully.' });
  } catch (err) {
    console.error('Feedback email error:', err);
    res.status(500).json({ message: 'Failed to send feedback.' });
  }
});

export default router; 
