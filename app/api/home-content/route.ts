import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import HeroContent from '@/models/HeroContent';

export async function GET() {
  try {
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
        showFAQ: true,
        showSnowfall: true
      });
    }

    // Ensure showFAQ field exists
    const contentWithShowFAQ = {
      ...heroContent,
      showFAQ: heroContent.showFAQ !== undefined ? heroContent.showFAQ : true,
      showSnowfall: heroContent.showSnowfall !== undefined ? heroContent.showSnowfall : true
    };
    
    console.log('Home API - Final content with showFAQ:', contentWithShowFAQ.showFAQ);
    console.log('Home API - Final content with showSnowfall:', contentWithShowFAQ.showSnowfall);

    return NextResponse.json(contentWithShowFAQ);
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return NextResponse.json({ error: 'Failed to fetch hero content' }, { status: 500 });
  }
}