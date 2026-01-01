import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Agent from '@/lib/models/Agent';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'password', 'reraLicense'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Check if agent already exists with this email
    const existingAgent = await Agent.findOne({ email: body.email.toLowerCase() });
    if (existingAgent) {
      return NextResponse.json(
        { error: 'Agent with this email already exists' },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create new agent - Typed as any to allow optional agencyId assignment
    const agentData: any = {
      name: body.name,
      email: body.email.toLowerCase(),
      phone: body.phone,
      reraLicense: body.reraLicense,
      password: hashedPassword,
      specialization: body.specialization || [],
      languages: body.languages || ['English', 'Arabic'],
      picture: body.picture || undefined,
      status: body.status || 'active',
      ratings: {
        average: 0,
        count: 0
      }
    };

    // If agencyId is provided, add it
    if (body.agencyId) {
      agentData.agencyId = body.agencyId;
    }

    const agent = await Agent.create(agentData);

    // Remove password from response
    const agentResponse = agent.toObject();
    delete agentResponse.password;

    return NextResponse.json({
      success: true,
      data: agentResponse,
      message: 'Agent created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating agent:', error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Agent with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}

// Also add GET method to list agents
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    // Search by name, email, or license if search param provided
    const search = searchParams.get('search');
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { reraLicense: { $regex: search, $options: 'i' } }
      ];
    }

    // Filter by status if provided
    const status = searchParams.get('status');
    if (status) {
      query.status = status;
    }

    const agents = await Agent.find(query)
      .select('-password') // Exclude password
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Agent.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: agents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}
