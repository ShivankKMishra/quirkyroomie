import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  const users = await User.find().sort({ karma: -1 }).limit(10); // Top 10 users
  res.json(users);
});

export default router;