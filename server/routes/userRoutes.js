import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

{/* login */ }
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Handle Google users (they have a special password)
    if (password === 'google-auth-user' && user.googleId) {
      res.json({
        message: 'Login successful',
        user: { id: user._id, name: user.name, email: user.email }
      });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/register', async (req, res) => {
  const { name, email, password, googleId } = req.body;

  console.log(name, email, password, googleId);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let hashedPassword;
    if (googleId) {
      // For Google users, use a special password
      hashedPassword = await bcrypt.hash('google-auth-user', 10);
    } else {
      // For regular users, hash their password
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      googleId: googleId || null,
    });

    const savedUser = await newUser.save();


    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
      }
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
