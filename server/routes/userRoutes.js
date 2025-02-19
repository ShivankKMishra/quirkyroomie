// server/routes/userRoutes.js
import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get all users (for dropdown)
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Only fetch username
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;