import mongoose, { Schema, model, models } from 'mongoose';

const LocationSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phones: {
    type: [String],
    default: [],
  },
  email: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  googleMapsUrl: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Location = models.Location || model('Location', LocationSchema);

export default Location;
