export async function GET() {
  return Response.json({ 
    message: "calculator API working",
    data: []
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ 
    message: "calculator created",
    data: body 
  });
}
