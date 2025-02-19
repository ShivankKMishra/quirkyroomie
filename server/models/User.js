import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true, // Make email mandatory
    unique: true,   // Ensure email is unique
    sparse: true,   // Allow multiple `null` values if email is optional
  },
  karma: { type: Number, default: 0 }, // Karma points
});

export default mongoose.model('User', userSchema);