import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json();
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      );
    }
    
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_SECRET + 'refresh') as any;
    
    // Create new access token
    const newToken = jwt.sign(
      { 
        id: decoded.id,
        email: decoded.email,
        role: decoded.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    return NextResponse.json({
      success: true,
      token: newToken,
      refreshToken, // Same refresh token (or issue new one)
    });
    
  } catch (error) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 }
    );
  }
}
