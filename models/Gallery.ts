import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the event'],
  },
  date: {
    type: Date,
    required: [true, 'Please provide a date for the event'],
  },
  description: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Delete the model if it exists to ensure the new schema is used (useful during development)
if (mongoose.models.Gallery) {
  delete mongoose.models.Gallery;
}

export default mongoose.model('Gallery', GallerySchema);
