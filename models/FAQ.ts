import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
  },
  answer: {
    type: String,
    required: [true, 'Please provide an answer'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
