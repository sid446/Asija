import mongoose from 'mongoose';

const EventCoverSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Please provide a type'],
  },
  image: {
    type: String,
    required: [true, 'Please provide an image'],
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Delete the model if it exists to ensure the new schema is used (useful during development)
if (mongoose.models.EventCover) {
  delete mongoose.models.EventCover;
}

export default mongoose.model('EventCover', EventCoverSchema);