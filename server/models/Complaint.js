import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ['Noise', 'Cleanliness', 'Bills', 'Pets'], required: true },
    severity: { type: String, enum: ['Mild', 'Annoying', 'Major', 'Nuclear'], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    againstUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Optional
    votes: { type: Number, default: 0 },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    resolved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);
