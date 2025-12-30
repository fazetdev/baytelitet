import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export interface AuthUser {
  id: string;
  role: 'agent' | 'admin' | 'developer';
  email: string;
}

export function authenticate(req: NextRequest): AuthUser {
  const authHeader = req.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized');
  }
  const token = authHeader.split(' ')[1];
  if (!process.env.JWT_SECRET) throw new Error('JWT secret not set');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as AuthUser;
    if (!payload.id) throw new Error('Invalid token payload');
    return payload;
  } catch (err) {
    throw new Error('Invalid token');
  }
}
