import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the URL to follow redirects (e.g. maps.app.goo.gl short links)
    // We use a User-Agent to ensure Google treats us like a browser and gives the full redirect
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const finalUrl = response.url;
    
    // Regex patterns to match coordinates in the final URL
    const patterns = [
      /@(-?\d+\.\d+),(-?\d+\.\d+)/, // @lat,lng
      /query=(-?\d+\.\d+),(-?\d+\.\d+)/, // query=lat,lng
      /q=(-?\d+\.\d+),(-?\d+\.\d+)/, // q=lat,lng
      /[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/, // ll=lat,lng
      /!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/, // !3dlat!4dlng
      /search\/[^\/]+\/(-?\d+\.\d+),(-?\d+\.\d+)/ // search/Place/lat,lng
    ];

    let lat = null;
    let lng = null;

    for (const pattern of patterns) {
      const match = finalUrl.match(pattern);
      if (match) {
        lat = parseFloat(match[1]);
        lng = parseFloat(match[2]);
        break;
      }
    }

    if (lat && lng) {
      return NextResponse.json({ lat, lng, finalUrl });
    } else {
      return NextResponse.json({ error: 'Could not extract coordinates from the resolved URL', finalUrl }, { status: 404 });
    }

  } catch (error) {
    console.error('Error extracting coords:', error);
    return NextResponse.json({ error: 'Failed to process URL' }, { status: 500 });
  }
}
