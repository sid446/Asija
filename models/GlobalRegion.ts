import mongoose, { Schema, model, models } from 'mongoose';

const GlobalRegionSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  
  // Page Content
  heroImage: { type: String },
  heroTitle: { type: String },
  heroDescription: { type: String },
  contentHeading: { type: String },
  contentDescription: { type: String },
  features: [{ type: String }],
}, { timestamps: true });

export default models.GlobalRegion || model('GlobalRegion', GlobalRegionSchema);
