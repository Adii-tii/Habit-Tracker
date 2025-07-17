import express from 'express';
const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  res.status(200).json({
    message: 'User registered',
    user: { name, email }
  });
});

export default router;
