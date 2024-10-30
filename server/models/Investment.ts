import mongoose from 'mongoose';

const investmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  return: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Investment', investmentSchema);