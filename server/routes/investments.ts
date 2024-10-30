import express from 'express';
import Investment from '../models/Investment';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, amount, return: returnRate } = req.body;
    const investment = new Investment({
      user: req.user.id,
      name,
      amount,
      return: returnRate,
    });
    await investment.save();
    res.status(201).json(investment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating investment' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const investments = await Investment.find({ user: req.user.id }).sort({ date: -1 });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching investments' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Investment.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Investment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting investment' });
  }
});

export default router;