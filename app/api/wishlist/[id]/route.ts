import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // In a real app, you'd save this to DB or user session
  console.log(`✅ Product ${id} added to wishlist`);

  return NextResponse.json({
    message: `Product ${id} added to wishlist successfully.`,
  });
}
