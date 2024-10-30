import * as express from 'express';
import Expense from '../models/Expense';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, category, description } = req.body;
    const expense = new Expense({
      user: req.user.id,
      amount,
      category,
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error creating expense' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Expense.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});

export default router;