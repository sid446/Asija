import mongoose, { Schema, model, models } from 'mongoose';

const GlobalOfferingSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'ShieldCheck' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

export default models.GlobalOffering || model('GlobalOffering', GlobalOfferingSchema);
