import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Property from '@/lib/models/Property';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const formData = await request.formData();
    const files = formData.getAll('images') as File[];
    const propertyId = params.id;
    
    if (!files.length) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }
    
    // In production: Upload to cloud storage (AWS S3, Cloudinary, etc.)
    // For now, we'll simulate by storing base64 (not recommended for production)
    const uploadedUrls: string[] = [];
    
    for (const file of files) {
      // Convert to base64 (temporary solution)
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64}`;
      
      uploadedUrls.push(dataUrl);
    }
    
    // Update property with new images
    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: 'Property not found' },
        { status: 404 }
      );
    }
    
    // Add new images to media array
    const newMedia = uploadedUrls.map((url, index) => ({
      url,
      type: 'image',
      order: property.media.length + index,
      caption: { en: '', ar: '' }
    }));
    
    property.media.push(...newMedia);
    await property.save();
    
    return NextResponse.json({
      success: true,
      urls: uploadedUrls,
      message: `${files.length} images uploaded successfully`
    });
    
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}
