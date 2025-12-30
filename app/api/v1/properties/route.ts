import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/db';
import { propertySchema } from '@/lib/validators/property';
import { authenticate } from '@/lib/middleware/auth';
import Property from '@/lib/models/Property';
import { rateLimit } from '@/lib/rate-limit';

// Validation functions
function validateNumber(value: string, min: number, max: number): number {
  const num = Number(value);
  if (isNaN(num)) throw new Error(`Invalid number: ${value}`);
  if (num < min) throw new Error(`Value must be at least ${min}`);
  if (num > max) throw new Error(`Value must not exceed ${max}`);
  return num;
}

function validateEnum<T extends string>(value: string, allowed: readonly T[]): T {
  if (!allowed.includes(value as T)) {
    throw new Error(`Invalid value. Allowed: ${allowed.join(', ')}`);
  }
  return value as T;
}

export async function GET(req: NextRequest) {
  const start = Date.now();
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(req, 'generalAPI');
    if (!rateLimitResult.allowed) {
      const headers = new Headers();
      headers.set('X-RateLimit-Limit', '100');
      headers.set('X-RateLimit-Remaining', '0');
      headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429, headers }
      );
    }

    await connect();

    // Query parameters
    const url = new URL(req.url);
    const params = Object.fromEntries(url.searchParams.entries());

    // Validate and parse parameters
    const limit = Math.min(validateNumber(params.limit || '20', 1, 100), 100);
    const skip = validateNumber(params.skip || '0', 0, 10000);
    
    const sortBy = params.sortBy || 'createdAt';
    const order = validateEnum(params.order || 'desc', ['asc', 'desc'] as const);
    
    const filter: Record<string, any> = {};

    // Text filters
    if (params.city) filter.city = params.city;
    if (params.emirate) {
      filter.emirate = validateEnum(params.emirate, [
        'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 
        'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'
      ] as const);
    }
    if (params.type) {
      filter.type = validateEnum(params.type, [
        'apartment', 'villa', 'townhouse', 'office', 
        'warehouse', 'land', 'penthouse'
      ] as const);
    }
    if (params.status) {
      filter.status = validateEnum(params.status, [
        'draft', 'under_review', 'published', 'reserved', 
        'sold', 'rented', 'archived'
      ] as const);
    }
    if (params.category) {
      filter.category = validateEnum(params.category, [
        'rent', 'sale', 'off-plan'
      ] as const);
    }

    // Numeric filters with validation
    if (params.beds) filter.beds = validateNumber(params.beds, 0, 20);
    if (params.baths) filter.baths = validateNumber(params.baths, 0, 20);
    
    if (params.minPrice || params.maxPrice) {
      filter.price = {};
      if (params.minPrice) filter.price.$gte = validateNumber(params.minPrice, 0, 1000000000);
      if (params.maxPrice) filter.price.$lte = validateNumber(params.maxPrice, 0, 1000000000);
    }
    
    if (params.minArea || params.maxArea) {
      filter['area.builtUp'] = {};
      if (params.minArea) filter['area.builtUp'].$gte = validateNumber(params.minArea, 0, 10000);
      if (params.maxArea) filter['area.builtUp'].$lte = validateNumber(params.maxArea, 0, 10000);
    }

    // Geo filtering with validation
    if (params.lat && params.lng && params.radius) {
      const lat = validateNumber(params.lat, -90, 90);
      const lng = validateNumber(params.lng, -180, 180);
      const radius = Math.min(validateNumber(params.radius, 0.1, 100), 100); // max 100km
      
      filter.location = {
        $geoWithin: {
          $centerSphere: [[lng, lat], radius / 6378.1]
        }
      };
    }

    // Execute query with performance optimization
    const query = Property.find(filter)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(limit)
      .select('title price beds baths area city emirate type status category location referenceNumber createdAt')
      .lean();

    const properties = await query;
    
    // Get total count for pagination info (optional, can be heavy)
    // const total = await Property.countDocuments(filter);

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Cache-Control', 'no-store, max-age=0');
    headers.set('X-RateLimit-Limit', '100');
    headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

    const duration = Date.now() - start;
    console.log(`GET /api/v1/properties completed in ${duration}ms`);

    return new NextResponse(JSON.stringify({ 
      success: true, 
      data: properties,
      // pagination: { limit, skip, total } // Optional
    }), { status: 200, headers });
  } catch (err: any) {
    console.error(err);
    let status = 500;
    let message = err.message || 'Unknown error';
    
    // Client validation errors get 400
    if (err.message.includes('Invalid') || err.message.includes('must be')) {
      status = 400;
    }
    
    return NextResponse.json({ success: false, error: message }, { status });
  }
}

// POST handler - Property creation
export async function POST(req: NextRequest) {
  const start = Date.now();
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(req, 'generalAPI');
    if (!rateLimitResult.allowed) {
      const headers = new Headers();
      headers.set('X-RateLimit-Limit', '100');
      headers.set('X-RateLimit-Remaining', '0');
      headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429, headers }
      );
    }

    await connect();

    // Authenticate user
    const user = authenticate(req);
    if (!['agent', 'admin'].includes(user.role)) {
      return NextResponse.json({ success: false, error: 'Unauthorized role' }, { status: 403 });
    }

    // Parse and validate request
    const body = await req.json();
    const validatedData = propertySchema.parse(body);

    // Create property with authenticated user
    const property = new Property({
      ...validatedData,
      agentId: user.id,
    });

    await property.save();

    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('Cache-Control', 'no-store, max-age=0');
    headers.set('X-RateLimit-Limit', '100');
    headers.set('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());

    const duration = Date.now() - start;
    console.log(`POST /api/v1/properties completed in ${duration}ms`);

    return new NextResponse(
      JSON.stringify({ success: true, data: property }),
      { status: 201, headers }
    );
  } catch (err: any) {
    console.error(err);
    let status = 500;
    let message = err.message || 'Unknown error';

    if (err.name === 'ZodError') {
      status = 422;
      message = err.errors ? err.errors.map((e: any) => e.message).join(', ') : err.message;
    } else if (err.message?.includes('Invalid token')) {
      status = 401;
      message = 'Invalid authentication token';
    }

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
