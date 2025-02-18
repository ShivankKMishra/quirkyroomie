import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['Noise', 'Cleanliness', 'Bills', 'Pets'], required: true },
  severity: { type: String, enum: ['Mild', 'Annoying', 'Major', 'Nuclear'], required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  votes: { type: Number, default: 0 },
  resolved: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Complaint', complaintSchema);