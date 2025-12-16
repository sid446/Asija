import mongoose, { Schema, model, models } from 'mongoose';

const AboutTimelineSchema = new Schema(
  {
    year: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AboutTimeline = models.AboutTimeline || model('AboutTimeline', AboutTimelineSchema);

export default AboutTimeline;
