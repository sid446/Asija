import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: false, // Made optional for general applications
  },
  fullName: {
    type: String,
    required: [true, 'Please provide your full name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  position: {
    type: String,
    required: false, // For general applications
  },
  department: {
    type: String,
    required: false, // For general applications
  },
  qualification: {
    type: String,
    required: false, // Made optional
    enum: ['CA Final', 'CA Intermediate', 'CA Foundation', 'B.Com', 'M.Com', 'MBA', 'CS', 'CMA', 'Other'],
  },
  experience: {
    type: String,
    required: [true, 'Please provide your experience'],
  },
  currentCTC: {
    type: String,
  },
  expectedCTC: {
    type: String,
  },
  resume: {
    type: String, // Store Cloudinary URL or filename
    required: false,
  },
  resumeLink: {
    type: String,
    // Making optional for now
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected'],
    default: 'pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
