import { NextResponse } from 'next/server';
import { dbGet, dbMutate } from '@/lib/database';
import HeroContent from '@/models/HeroContent';

export async function GET() {
  try {
    const content = await dbGet(async () => {
      let content = await HeroContent.findOne();

      if (!content) {
        // Seed with default data if not exists
        content = await HeroContent.create({
          tagline: 'Build the Future with Clarity',
          title: 'Transformation',
          description: 'Asija teams give you the confidence to shape the future and create new value by reimagining and realizing transformations across the entire enterprise.',
          learnMore: 'Learn More',
          contactUs: 'Contact Us',
          videoPoster: 'https://res.cloudinary.com/db2qa9dzs/video/upload/so_0,w_1920,q_auto,f_jpg/v1764139755/855507-hd_1920_1080_25fps_kyxlva.jpg',
          videoWebm: 'https://res.cloudinary.com/db2qa9dzs/video/upload/f_webm,q_auto:eco,vc_auto,w_1920/v1764139755/855507-hd_1920_1080_25fps_kyxlva.webm',
          videoMp4: 'https://res.cloudinary.com/db2qa9dzs/video/upload/f_mp4,q_auto:eco,vc_auto,w_1920/v1764139755/855507-hd_1920_1080_25fps_kyxlva.mp4',
          showFAQ: true
        });
      } else {
        // Ensure showFAQ field exists for existing documents
        if (content.showFAQ === undefined) {
          content.showFAQ = true;
          await content.save();
        }
      }

      return content;
    });

    console.log('Admin API GET - Returning content:', content);

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    const updateData = {
      ...data
    };

    const content = await dbMutate(async () => {
      return await HeroContent.findOneAndUpdate(
        {}, // Find any document (should be only one)
        updateData,
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      );
    });

    return NextResponse.json(content);
  } catch (error) {
    console.error('Error updating hero content:', error);
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 });
  }
}
