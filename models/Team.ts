import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  qualifications?: string;
  specialization?: string;
  experience?: string;
  membership?: string;
  associationYears?: string;
  mobile?: string;
  email?: string;
  description?: string;
  order?: number;
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String },
  linkedin: { type: String },
  qualifications: { type: String },
  specialization: { type: String },
  experience: { type: String },
  membership: { type: String },
  associationYears: { type: String },
  mobile: { type: String },
  email: { type: String },
  description: { type: String },
  order: { type: Number, default: 0 },
}, { timestamps: true });

const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);

export default Team;
