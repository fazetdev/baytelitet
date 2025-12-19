import { NextResponse } from 'next/server';
import { calculateMortgagePlan, PaymentInput } from '@/lib/calculations';

// Development-only in-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const data = requestCounts.get(ip);

  if (!data || now > data.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + 60_000 });
    return true;
  }

  if (data.count >= 60) return false;

  data.count += 1;
  return true;
}

// API-level shape validation only
function validateAPIInput(input: any): asserts input is PaymentInput {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid request body');
  }

  const { propertyPrice, downPaymentPercent, loanTermYears, annualInterestRate } = input;

  if (typeof propertyPrice !== 'number') {
    throw new Error('propertyPrice must be a number');
  }
  if (typeof downPaymentPercent !== 'number') {
    throw new Error('downPaymentPercent must be a number');
  }
  if (typeof loanTermYears !== 'number') {
    throw new Error('loanTermYears must be a number');
  }
  if (typeof annualInterestRate !== 'number') {
    throw new Error('annualInterestRate must be a number');
  }
}

export async function POST(request: Request) {
  try {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }

    const body = await request.json();
    validateAPIInput(body);

    const result = calculateMortgagePlan(body);

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Invalid request'
      },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const details = url.searchParams.get('details') === 'true';

  const base = {
    success: true,
    service: 'BaytElite Calculator API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  };

  if (!details) {
    return NextResponse.json(base);
  }

  return NextResponse.json({
    ...base,
    description: 'Mortgage and payment plan calculations',
    requiredFields: {
      propertyPrice: 'number',
      downPaymentPercent: 'number',
      loanTermYears: 'number',
      annualInterestRate: 'number'
    }
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}
