import express from 'express';
import Complaint from '../models/Complaint.js';
import User from '../models/User.js'; // Ensure User model is imported
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// File a new complaint
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, type, severity, againstUser } = req.body;
  try {
    const complaint = new Complaint({
      title,
      description,
      type,
      severity,
      createdBy: req.userId,
      againstUser: againstUser || null,
    });
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upvote/downvote a complaint
router.post('/:id/vote', authMiddleware, async (req, res) => {
  const { vote } = req.body; // vote = 1 (upvote) or -1 (downvote)
  const userId = req.userId;
  const complaintId = req.params.id;

  try {
    const complaint = await Complaint.findById(complaintId).populate('createdBy');
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user has already voted
    const hasUpvoted = complaint.upvotes.includes(userId);
    const hasDownvoted = complaint.downvotes.includes(userId);

    if ((vote === 1 && hasUpvoted) || (vote === -1 && hasDownvoted)) {
      return res.status(400).json({ message: 'You have already voted this way' });
    }

    // Adjust votes and karma
    if (vote === 1) {
      if (hasDownvoted) {
        complaint.downvotes.pull(userId); // Remove downvote
        complaint.votes += 1; // Neutralize downvote
      }
      complaint.upvotes.push(userId); // Add upvote
      complaint.votes += 1;

      // Increase creator's karma
      const creator = await User.findById(complaint.createdBy._id);
      creator.karma += 5; // Award 5 karma points for an upvote
      await creator.save();
    } else if (vote === -1) {
      if (hasUpvoted) {
        complaint.upvotes.pull(userId); // Remove upvote
        complaint.votes -= 1; // Neutralize upvote
      }
      complaint.downvotes.push(userId); // Add downvote
      complaint.votes -= 1;

      // Decrease creator's karma
      const creator = await User.findById(complaint.createdBy._id);
      creator.karma -= 3; // Deduct 3 karma points for a downvote
      await creator.save();
    }

    await complaint.save();

    // Check for 10+ upvotes and generate punishment
    let punishment = null;
    if (complaint.votes >= 10) {
      punishment = generatePunishment(complaint.type);
    }

    res.json({ complaint, punishment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// List all complaints
router.get('/', authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate('createdBy', 'username') // Populate createdBy with username
      .populate('againstUser', 'username'); // Populate againstUser with username
    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark complaint as resolved
router.put('/:id/resolve', authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found' });
    }

    // Update complaint status
    complaint.resolved = true;
    await complaint.save();

    // Award karma points to the user who resolved it
    const user = await User.findById(req.userId);
    user.karma += 10; // Award 10 points for resolving a complaint
    await user.save();

    res.json({ message: 'Complaint resolved!', karma: user.karma });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;