import mongoose from 'mongoose';

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

export default mongoose.models.JobPost || mongoose.model('JobPost', JobPostSchema);
