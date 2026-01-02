import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Property from '@/lib/models/Property';
import { IProperty } from '@/lib/models/Property';
import mongoose from 'mongoose';

// Helper function to generate a unique slug
const generateSlug = async (title: string, existingSlug?: string): Promise<string> => {
  // Convert title to slug format
  let slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();

  // If no slug was generated from title, use a fallback
  if (!slug) {
    slug = `property-${Date.now().toString().slice(-6)}`;
  }

  // Check if slug already exists in database
  let uniqueSlug = slug;
  let counter = 1;
  
  while (true) {
    const existing = await Property.findOne({ 'slug.en': uniqueSlug });
    if (!existing || (existingSlug && existingSlug === uniqueSlug)) {
      break;
    }
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
};

// Convert API request to MongoDB schema - FIXED FOR UPDATED PROPERTY MODEL
const apiToDb = async (data: any): Promise<Partial<IProperty>> => {
  // Ensure RERA number format matches validation: RERA-[A-Z0-9]+
  const reraNumber = data.reraNumber?.startsWith('RERA-')
    ? data.reraNumber
    : `RERA-${(data.reraNumber || '').toUpperCase().replace(/[^A-Z0-9]/g, '')}`;

  // Generate a unique slug for the property
  const propertyTitle = data.title || 'Property';
  const slug = await generateSlug(propertyTitle);

  return {
    // Basic Info
    title: {
      en: data.title || '',
      ar: data.title || ''
    },
    description: {
      en: data.description || '',
      ar: data.description || ''
    },
    type: data.type || 'apartment',
    category: data.category || 'sale',

    // Pricing
    price: data.price || 0,
    currency: data.currency || 'AED',
    pricePerSqm: data.pricePerSqm || 0,

    // Specifications
    beds: data.beds || data.bedrooms || 0,
    baths: data.baths || data.bathrooms || 0,
    area: {
      builtUp: data.area || 0,
      plot: data.plotArea || 0,
      unit: data.areaUnit || 'sqft',
    },
    furnishing: data.furnishing || 'unfurnished',

    // Location
    emirate: data.emirate || data.state || '',
    city: data.city || '',
    address: data.address || 'Not specified', // Required top-level address field
    neighborhood: data.neighborhood || '',
    location: {
      type: 'Point',
      coordinates: [data.lng || 55.2708, data.lat || 25.2048],
      address: {
        en: data.address || '',
        ar: data.address || ''
      },
      emirate: data.emirate || data.state || '',
      city: data.city || '',
    },

    // Media - FIXED: Property model uses 'media' not 'gallery'
    media: data.heroImage ? [{
      url: data.heroImage,
      type: 'image' as const,
      order: 0,
      caption: { en: data.title || '', ar: data.title || '' }
    }] : [],
    coverImage: data.heroImage || data.coverImage || 'https://via.placeholder.com/600x400?text=Property+Image',

    // Agent & Commission
    agentId: data.agentId ? new mongoose.Types.ObjectId(data.agentId) : new mongoose.Types.ObjectId(),
    commission: {
      percentage: data.commissionRate || 2.0,
      paymentTerms: 'Standard 30 days'
    },

    // Gulf Compliance
    reraNumber: reraNumber,
    reraVerified: false,
    escrowRequired: data.escrowRequired || false,

    // Status & Metadata - CHANGED: Auto-publish for now
    status: 'published',
    isPublished: true,
    isFeatured: false,
    slug: { en: slug, ar: slug }, // Use generated slug
    referenceNumber: `PROP-${Date.now().toString().slice(-6)}`,
    tags: [data.type, data.city].filter(Boolean),
  };
};

// Convert MongoDB document to API response
const dbToApi = (property: any) => ({
  id: property._id?.toString(),
  title: property.title?.en || property.title || '',
  description: property.description?.en || property.description || '',
  type: property.type,
  category: property.category,
  price: property.price,
  currency: property.currency,
  bedrooms: property.beds,
  bathrooms: property.baths,
  area: property.area?.builtUp || 0,
  areaUnit: property.area?.unit || 'sqft',
  city: property.city,
  state: property.emirate,
  country: 'UAE',
  address: property.address || property.location?.address?.en || '',
  lat: property.location?.coordinates?.[1],
  lng: property.location?.coordinates?.[0],
  heroImage: property.coverImage,
  gallery: property.media?.map((m: any) => m.url) || [],
  reraNumber: property.reraNumber,
  commissionRate: property.commission?.percentage || 0,
  agentName: '',
  agentLicense: '',
  complianceStatus: property.reraVerified ? 'verified' : 'pending',
  isPublished: property.isPublished,
  status: property.status,
  createdAt: property.createdAt,
  updatedAt: property.updatedAt,
});

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const query: any = {};

    // Apply filters
    const type = searchParams.get('type');
    if (type && type !== 'all') query.type = type;

    const city = searchParams.get('city');
    if (city && city !== 'all') query.city = new RegExp(city, 'i');

    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Only show published properties for public API
    query.isPublished = true;
    query.status = 'published';

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(properties.map(dbToApi));

  } catch (error) {
    console.error('GET /api/properties error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const data = await request.json();

    // Validate required fields - UPDATED for Property model
    const required = ['title', 'price', 'type', 'city', 'reraNumber'];
    const missing = required.filter(field => !data[field]);

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    // Transform and save - Note: apiToDb is now async
    const propertyData = await apiToDb(data);

    // Log for debugging
    console.log('Creating property with data:', JSON.stringify(propertyData, null, 2));

    const property = await Property.create(propertyData);

    return NextResponse.json(dbToApi(property.toObject()), { status: 201 });

  } catch (error: any) {
    console.error('POST /api/properties error:', error);

    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate property reference or slug' },
        { status: 400 }
      );
    }

    // Log validation errors if any
    if (error.errors) {
      console.error('Validation errors:', error.errors);
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create property', details: error.message },
      { status: 500 }
    );
  }
}
