import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IIndustry extends Document {
  title: string;
  description: string;
  details: string;
  image: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const IndustrySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Industry: Model<IIndustry> = mongoose.models.Industry || mongoose.model<IIndustry>('Industry', IndustrySchema);

export default Industry;
