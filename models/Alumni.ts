import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlumni extends Document {
  fullName: string;
  email: string;
  phone: string;
  yearOfLeaving: number;
  designationAtAsija: string;
  currentOrganization: string;
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
  currentOrganization: { type: String, required: true },
  currentDesignation: { type: String, required: true },
  linkedinProfile: { type: String },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

const Alumni: Model<IAlumni> = mongoose.models.Alumni || mongoose.model<IAlumni>('Alumni', AlumniSchema);

export default Alumni;
