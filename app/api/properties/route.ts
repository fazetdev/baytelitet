import { NextResponse } from 'next/server';

const properties = [
  {
    id: 1,
    title: 'Palm Jumeirah Luxury Villa',
    price: 8500000,
    location: 'Dubai',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 6,
  },
  {
    id: 2,
    title: 'Downtown Dubai Sky Villa',
    price: 12500000,
    location: 'Dubai',
    type: 'penthouse',
    bedrooms: 4,
    bathrooms: 5,
  },
  {
    id: 3,
    title: 'Arabian Ranches Family Home',
    price: 4200000,
    location: 'Dubai',
    type: 'villa',
    bedrooms: 6,
    bathrooms: 7,
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');

    let filtered = [...properties];

    if (type && type !== 'all') {
      filtered = filtered.filter(p => p.type === type);
    }

    if (city && city !== 'all') {
      filtered = filtered.filter(p => p.location.toLowerCase() === city.toLowerCase());
    }

    if (minPrice) {
      filtered = filtered.filter(p => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(maxPrice));
    }

    return NextResponse.json(filtered, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}
