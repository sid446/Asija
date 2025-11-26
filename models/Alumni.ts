import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlumni extends Document {
  fullName: string;
  email: string;
  phone: string;
  yearOfLeaving: number;
  designationAtAsija: string;
  currentProfessionalQualification: string;
  currentDesignation: string;
  linkedinProfile?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
}

const AlumniSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  yearOfLeaving: { type: Number, required: true },
  designationAtAsija: { type: String, required: true },
  currentProfessionalQualification: { type: String, required: true },
  currentDesignation: { type: String, required: true },
  linkedinProfile: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

// Delete the model if it exists to prevent OverwriteModelError and ensure schema updates in dev
if (process.env.NODE_ENV === 'development' && mongoose.models.Alumni) {
  delete mongoose.models.Alumni;
}

const Alumni: Model<IAlumni> = mongoose.models.Alumni || mongoose.model<IAlumni>('Alumni', AlumniSchema);

export default Alumni;
