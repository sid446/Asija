import mongoose, { Schema, model, models } from 'mongoose';

const GlobalServiceContentSchema = new Schema({
  heroTitle: { type: String, default: 'Asija Global Services' },
  heroDescription: { type: String, default: 'Empowering organizations worldwide with premier KPO, Financial, and Technology solutions.' },
  heroVideoUrl: { type: String, default: 'https://res.cloudinary.com/db2qa9dzs/video/upload/v1764353942/1851190-uhd_3840_2160_25fps_a9d0fu.mp4' },
  introTitle: { type: String, default: 'Global Expertise, Local Precision.' },
  introDescription1: { type: String, default: 'Asija Global Services is a dedicated KPO vertical providing world-class Accounting, Bookkeeping, CFO, and CEO services. We integrate advanced MIS and Tech solutions to streamline operations for organizations across the globe.' },
  introDescription2: { type: String, default: 'Whether you are expanding into new markets or optimizing existing operations, our team delivers the strategic insight and operational excellence you need to succeed.' },
}, { timestamps: true });

export default models.GlobalServiceContent || model('GlobalServiceContent', GlobalServiceContentSchema);
