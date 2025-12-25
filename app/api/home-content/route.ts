import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HeroContent from '@/models/HeroContent';
import { dbGet } from '@/lib/database';

export async function GET() {
  try {
    return await dbGet(async () => {
      await connectToDatabase();

      const heroContent = await HeroContent.findOne({}).lean();
      console.log('Home API - Raw hero content from DB:', heroContent);

      if (!heroContent) {
        console.log('Home API - No hero content found, returning defaults');
        return NextResponse.json({
          tagline: '',
          title: '',
          description: '',
          learnMore: '',
          contactUs: '',
          videoPoster: '',
          videoWebm: '',
          videoMp4: '',
          showFAQ: false
        });
      }

      // Ensure showFAQ field exists
      const contentWithShowFAQ = {
        ...heroContent,
        showFAQ: heroContent.showFAQ !== undefined ? heroContent.showFAQ : false
      };

      console.log('Home API - Final content with showFAQ:', contentWithShowFAQ.showFAQ);

      return NextResponse.json(contentWithShowFAQ);
    });
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}