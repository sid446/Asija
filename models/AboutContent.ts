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
      required: false,
      default: 'We, at Asija, aim to deliver quality to our stakeholders and strive to be the best at everything we do. We believe in working together to fulfill the needs of our clients beyond their expectations.',
    },
    // Our People Section
    peopleTitle: {
      type: String,
      default: 'Our People – The Heart of Our Firm',
    },
    peopleDescription1: {
      type: String,
      default: 'Today, our firm proudly comprises more than 100 professionals, including qualified chartered accountants, semi-qualified managers, and skilled executives. This diverse and talented team represents a balanced mix of experience, technical capability, and youthful energy.',
    },
    peopleDescription2: {
      type: String,
      default: 'This inclusive workforce drives innovation, collaboration, and excellence across all our assignments.',
    },
    peopleStats: {
      type: [{
        label: String,
        percentage: Number,
      }],
      default: [
        { label: 'Female Professionals', percentage: 42 },
        { label: 'Male Professionals', percentage: 58 }
      ]
    },
    // Looking Ahead Section
    futureTitle: {
      type: String,
      default: 'Looking Ahead',
    },
    futureSubtitle: {
      type: String,
      default: 'Our Vision for the Future',
    },
    futureDescription1: {
      type: String,
      default: 'As Asija & Associates LLP continues to expand its footprint across India and beyond, we remain deeply committed to our founding values of integrity, excellence, and professional independence. With a growing global presence, a strengthened leadership team, and a dynamic workforce, we are poised to embrace new opportunities in audit, advisory, compliance, systems, and development-sector consulting.',
    },
    futureDescription2: {
      type: String,
      default: 'Our journey ahead is guided by innovation, technology-driven solutions, and a steadfast focus on delivering measurable value to clients. We look forward with pride, purpose, and confidence as we continue to build a firm that stands for trust, quality, and global capability.',
    },
  },
  { timestamps: true }
);

const AboutContent = models.AboutContent || model('AboutContent', AboutContentSchema);

export default AboutContent;
