import express from 'express';
import Complaint from '../models/Complaint.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// File a new complaint
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, type, severity } = req.body;
  const complaint = new Complaint({
    title,
    description,
    type,
    severity,
    createdBy: req.userId,
  });
  await complaint.save();
  res.status(201).json(complaint);
});

// Upvote/downvote a complaint
router.post('/:id/vote', authMiddleware, async (req, res) => {
    const { vote } = req.body; // vote = 1 (upvote) or -1 (downvote)
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }
    complaint.votes += vote;
    await complaint.save();
    res.json(complaint);
  });

// List all complaints
router.get('/', authMiddleware, async (req, res) => {
  const complaints = await Complaint.find().populate('createdBy', 'username');
  res.json(complaints);
});

export default router;