import mongoose from 'mongoose';

const JobApplicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPost',
    required: true,
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
  qualification: {
    type: String,
    required: [true, 'Please provide your qualification'],
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
  resumeLink: {
    type: String,
    // required: [true, 'Please provide a link to your resume'], 
    // Making optional for now as we might not have file upload ready
  },
  coverLetter: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Pending', 'Reviewed', 'Shortlisted', 'Rejected'],
    default: 'Pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);
