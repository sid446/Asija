import mongoose from 'mongoose';

// Prevent model re-registration in serverless environments
const JobPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a job title'],
    maxlength: 100,
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
    maxlength: 50,
  },
  location: {
    type: String,
    required: [true, 'Please provide a location'],
  },
  type: {
    type: String,
    required: [true, 'Please provide job type'],
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  requirements: {
    type: [String],
    required: [true, 'Please provide requirements'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use a more robust model registration pattern for serverless environments
let JobPost: any;

try {
  // Try to get existing model
  JobPost = mongoose.model('JobPost');
} catch (error) {
  // Model doesn't exist, create it
  JobPost = mongoose.model('JobPost', JobPostSchema);
}

export default JobPost;
