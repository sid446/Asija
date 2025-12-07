import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IService extends Document {
  title: string;
  translationKey: string;
  items: string[];
  insights: boolean;
  imgSrc: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  subItems: any;
  deepSubItems: any;
}

const ServiceSchema: Schema = new Schema({
  title: { type: String, required: true },
  translationKey: { type: String, required: true },
  items: [{ type: String }],
  insights: { type: Boolean, default: false },
  imgSrc: { type: String },
  description: { type: String },
  detailedDescription: { type: String },
  benefits: [{ type: String }],
  subItems: { type: Schema.Types.Mixed, default: {} },
  deepSubItems: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true });

const Service: Model<IService> = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

export default Service;
