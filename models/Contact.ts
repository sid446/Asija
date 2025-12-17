import mongoose from 'mongoose';

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [60, 'Name cannot be more than 60 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  phone: {
    type: String,
    required: [true, 'Please provide your phone number'],
  },
  company: {
    type: String,
    required: false,
  },
  jobTitle: {
    type: String,
    required: false,
  },
  zipcode: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  topic: {
    type: String,
    required: [true, 'Please select a service'],
  },
  industry: {
    type: String,
    required: [true, 'Please select an industry'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
