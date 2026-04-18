import mongoose, { Schema, model, models } from 'mongoose';

const PolicySchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  category: { type: String, enum: ['general', 'employee'], default: 'general' },
  subCategory: { type: String, required: false }, // Allow any string value for custom departments
  pdfUrl: { type: String, required: false },
  excelUrl: { type: String, required: false },
  videoUrl: { type: String, required: false },
  policyType: { type: String, enum: ['text', 'pdf'], default: 'text' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Force model recompilation to ensure new schema fields are picked up
if (mongoose.models && mongoose.models.Policy) {
  delete mongoose.models.Policy;
}

export default models.Policy || model('Policy', PolicySchema);
