import express from 'express';
import Income from '../models/Income';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, source, description } = req.body;
    const income = new Income({
      user: req.user.id,
      amount,
      source,
      description,
    });
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ message: 'Error creating income' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const incomes = await Income.find({ user: req.user.id }).sort({ date: -1 });
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incomes' });
  }
});
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Income.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting goal' });
  }
});
export default router;