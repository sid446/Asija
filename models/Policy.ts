import mongoose, { Schema, model, models } from 'mongoose';

const PolicySchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['general', 'employee'], default: 'general' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Policy || model('Policy', PolicySchema);
