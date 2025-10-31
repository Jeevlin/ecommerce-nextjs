import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params; // ✅ Await params

  try {
    // your wishlist logic here
    return NextResponse.json({ message: `Wishlist updated for ${id}` });
  } catch (error) {
    return NextResponse.json({ message: "Error updating wishlist" }, { status: 500 });
  }
}
