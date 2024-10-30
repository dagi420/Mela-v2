import express from 'express';
import Goal from '../models/Goal';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, targetAmount, currentAmount, deadline } = req.body;
    const goal = new Goal({
      user: req.user.id,
      name,
      targetAmount,
      currentAmount,
      deadline,
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error creating goal' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({ date: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goals' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { currentAmount } = req.body;
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { currentAmount },
      { new: true }
    );
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Error updating goal' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Goal.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

export default router;