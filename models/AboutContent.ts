import mongoose, { Schema, model, models } from 'mongoose';

const AboutContentSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: 'Our Legacy of Trust',
    },
    quote: {
      type: String,
      required: true,
      default: 'Coming together is a beginning, keeping together is progress, working together is success.',
    },
    description1: {
      type: String,
      required: true,
      default: 'Asija & Associates LLP, Chartered Accountants was established on 1st April 1986 by our founder member CA. Uttam Chandra Asija with the aim of providing a wide range of Accounting and Financial services to clients in the Government, Corporate, and Private Sectors.',
    },
    description2: {
      type: String,
      required: true,
      default: 'Over the years, the firm has been built around a team of professionals possessing vast experience in auditing, accounting, taxation, company law matters, and a host of other financial services. We assist clients in solving complex problems and support the growth of society at large.',
    },
    description3: {
      type: String,
      required: true,
      default: 'Our firm has not only augmented in knowledge and skills but has also established a landmark achievement by becoming the first Chartered Accountancy firm in Lucknow to convert into a Limited Liability Partnership.',
    },
    description4: {
      type: String,
      required: true,
      default: 'We, at Asija, aim to deliver quality to our stakeholders and strive to be the best at everything we do. We believe in working together to fulfill the needs of our clients beyond their expectations.',
    },
  },
  { timestamps: true }
);

const AboutContent = models.AboutContent || model('AboutContent', AboutContentSchema);

export default AboutContent;
