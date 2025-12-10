import mongoose, { Schema, model, models } from 'mongoose';

const AboutCardSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonContent: {
      type: String,
      default: 'Learn More',
    },
    link: {
      type: String,
      default: '/about',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const AboutCard = models.AboutCard || model('AboutCard', AboutCardSchema);

export default AboutCard;
