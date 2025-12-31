import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import Agent from '@/lib/models/Agent';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password, role = 'agent' } = await request.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user based on role
    let user;
    if (role === 'agent') {
      user = await Agent.findOne({ email }).select('+password');
    }
    // Add other roles (admin, investor) as needed
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check password (assuming Agent model has password field)
    // For now, basic check - in real app, use bcrypt.compare
    const isValidPassword = password === 'demo123'; // Temporary demo
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Create JWT token
    const tokenPayload = {
      id: user._id?.toString() || 'demo-id',
      email: user.email,
      role: user.role || role,
      name: user.name,
      license: user.licenseNumber,
      jurisdiction: user.jurisdiction,
    };
    
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    
    const refreshToken = jwt.sign(
      { id: user._id?.toString() || 'demo-id' },
      JWT_SECRET + 'refresh',
      { expiresIn: '30d' }
    );
    
    // Remove password from response
    const userResponse = user.toObject ? user.toObject() : user;
    delete userResponse.password;
    
    return NextResponse.json({
      success: true,
      token,
      refreshToken,
      user: userResponse,
      expiresIn: JWT_EXPIRES_IN,
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
