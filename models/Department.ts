import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  slug: string;
  name: string;
  description: string;
  icon: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema: Schema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  icon: {
    type: String,
    default: '🏷️'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Add index for better query performance
DepartmentSchema.index({ order: 1 });

export default mongoose.models.Department || mongoose.model<IDepartment>('Department', DepartmentSchema);