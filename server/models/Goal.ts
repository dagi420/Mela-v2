import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Goal', goalSchema);