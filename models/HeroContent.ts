import mongoose, { Schema, model, models } from 'mongoose';

const HeroContentSchema = new Schema(
  {
    tagline: {
      type: String,
      required: true,
      default: 'Build the Future with Clarity',
    },
    title: {
      type: String,
      required: true,
      default: 'Transformation',
    },
    description: {
      type: String,
      required: true,
      default: 'Asija teams give you the confidence to shape the future and create new value by reimagining and realizing transformations across the entire enterprise.',
    },
    learnMore: {
      type: String,
      default: 'Learn More',
    },
    contactUs: {
      type: String,
      default: 'Contact Us',
    },
    videoPoster: {
        type: String,
        default: 'https://res.cloudinary.com/db2qa9dzs/video/upload/so_0,w_1920,q_auto,f_jpg/v1764139755/855507-hd_1920_1080_25fps_kyxlva.jpg'
    },
    videoWebm: {
        type: String,
        default: 'https://res.cloudinary.com/db2qa9dzs/video/upload/f_webm,q_auto:eco,vc_auto,w_1920/v1764139755/855507-hd_1920_1080_25fps_kyxlva.webm'
    },
    videoMp4: {
        type: String,
        default: 'https://res.cloudinary.com/db2qa9dzs/video/upload/f_mp4,q_auto:eco,vc_auto,w_1920/v1764139755/855507-hd_1920_1080_25fps_kyxlva.mp4'
    },
    showFAQ: {
      type: Boolean,
      default: true,
    },
    showInsights: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

const HeroContent = models.HeroContent || model('HeroContent', HeroContentSchema);

export default HeroContent;
