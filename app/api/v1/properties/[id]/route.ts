import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import Property from '@/lib/models/Property';
import { rateLimit } from '@/lib/rate-limit';
import { isValidObjectId } from 'mongoose';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const start = Date.now();
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(req, 'generalAPI');
    if (!rateLimitResult.allowed) {
      const headers = new Headers();
      headers.set('X-RateLimit-Limit', '100');
      headers.set('X-RateLimit-Remaining', '0');
      headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());
      return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429, headers });
    }

    const { id } = await params;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ success: false, error: 'Invalid property ID' }, { status: 400 });
    }

    await connect();

    // Find property and increment view count in parallel
    const [property] = await Promise.all([
      Property.findById(id)
        .select('title price beds baths area city emirate type status category location referenceNumber createdAt viewCount favoriteCount media coverImage description')
        .lean(),
      // Increment view count (fire and forget - doesn't block response)
      Property.findByIdAndUpdate(id, { 
        $inc: { viewCount: 1 },
        $set: { lastViewedAt: new Date() }
      })
    ]);

    if (!property) {
      return NextResponse.json({ success: false, error: 'Property not found' }, { status: 404 });
    }

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Cache-Control', 'no-store, max-age=0');
    headers.set('X-RateLimit-Limit', '100');
    headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

    const duration = Date.now() - start;
    console.log(`GET /api/v1/properties/${id} completed in ${duration}ms, viewCount: ${property.viewCount + 1}`);

    return new NextResponse(JSON.stringify({ success: true, data: property }), { status: 200, headers });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message || 'Unknown error' }, { status: 500 });
  }
}
