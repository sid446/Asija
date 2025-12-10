import mongoose, { Schema, model, models } from 'mongoose';

const ContactContentSchema = new Schema(
  {
    tagline: {
      type: String,
      default: 'Contact us',
    },
    title: {
      type: String,
      default: 'Connect With Us',
    },
    description: {
      type: String,
      default: "We'd love to hear from you! Please get in touch.",
    },
    officeLocations: {
      type: String,
      default: 'Office Locations',
    },
    officeLocation1: {
      type: String,
      default: '1st floor, 34/5 Gokhale Marg,',
    },
    officeLocation2: {
      type: String,
      default: 'Lucknow, U.P. (India) – 226001',
    },
    contactNo: {
      type: String,
      default: 'Contact No.',
    },
    phone1: {
      type: String,
      default: '0522-4004652',
    },
    phone2: {
      type: String,
      default: '0522-2205072',
    },
    emails: {
      type: String,
      default: 'Email',
    },
    email1: {
      type: String,
      default: 'admin@asija.in',
    },
    email2: {
      type: String,
      default: 'contact@asija.in',
    },
    enquiryForm: {
      type: String,
      default: 'Enquiry Form / Consult Us',
    },
    imageAlt: {
      type: String,
      default: 'Asija team in creative studio',
    },
    image: {
      type: String,
      default: '/aboutUs.jpg',
    }
  },
  { timestamps: true }
);

const ContactContent = models.ContactContent || model('ContactContent', ContactContentSchema);

export default ContactContent;
