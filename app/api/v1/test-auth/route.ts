import { NextRequest, NextResponse } from 'next/server';
import { authenticate } from '@/lib/middleware/auth';

export async function GET(req: NextRequest) {
  try {
    const user = authenticate(req); // throws if invalid
    return NextResponse.json({ success: true, user }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 401 });
  }
}
