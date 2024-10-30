import mongoose from 'mongoose';

const incomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  source: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Income', incomeSchema);