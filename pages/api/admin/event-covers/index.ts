import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import EventCover from '@/models/EventCover';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const eventCovers = await EventCover.find({}).sort({ order: 1 });
      res.status(200).json(eventCovers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch event covers' });
    }
  } else if (req.method === 'POST') {
    try {
      const { type, image, order } = req.body;

      if (!type || !image) {
        return res.status(400).json({ error: 'Type and image are required' });
      }

      // Check if cover already exists for this type, update if so
      const existing = await EventCover.findOne({ type });
      if (existing) {
        existing.image = image;
        existing.order = order !== undefined ? order : existing.order;
        await existing.save();
        return res.status(200).json(existing);
      } else {
        const newCover = new EventCover({ type, image, order: order || 0 });
        await newCover.save();
        res.status(201).json(newCover);
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to create/update event cover' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}