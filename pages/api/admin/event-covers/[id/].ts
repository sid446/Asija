import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import EventCover from '@/models/EventCover';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { type, image, order } = req.body;

      const updatedCover = await EventCover.findByIdAndUpdate(
        id,
        { type, image, order },
        { new: true }
      );

      if (!updatedCover) {
        return res.status(404).json({ error: 'Event cover not found' });
      }

      res.status(200).json(updatedCover);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event cover' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const deletedCover = await EventCover.findByIdAndDelete(id);

      if (!deletedCover) {
        return res.status(404).json({ error: 'Event cover not found' });
      }

      res.status(200).json({ message: 'Event cover deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event cover' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}