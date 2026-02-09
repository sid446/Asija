import mongoose from 'mongoose';

const SectionItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  subItems: [{ type: String }]
}, { _id: false });

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String },
  linkedin: { type: String },
  qualifications: [SectionItemSchema],
  specialization: [SectionItemSchema],
  experience: [SectionItemSchema],
  membership: { type: String },
  associationYears: { type: String },
  mobile: { type: String },
  email: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

// Prevent Mongoose OverwriteModelError by checking if the model exists
// But in dev, we might need to reset it if the schema changed
if (process.env.NODE_ENV === 'development') {
  delete mongoose.models.Team;
}

export default mongoose.models.Team || mongoose.model('Team', TeamSchema);
