import { NextResponse } from "next/server";
import type { Product } from "@/type/products"; // ✅ simplified import
import fs from "fs";
import path from "path";

const dataFile = path.resolve("data/products.json"); // ✅ ensures correct path

function readProducts(): Product[] {
  try {
    if (!fs.existsSync(dataFile)) return [];
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw || "[]") as Product[];
  } catch (err) {
    console.error("❌ Error reading products.json:", err);
    return [];
  }
}

function writeProducts(products: Product[]) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), "utf-8");
  } catch (err) {
    console.error("❌ Error writing products.json:", err);
  }
}

export async function GET() {
  const products = readProducts();
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const apiKey = request.headers.get("x-api-key") || "";
  if (apiKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  console.log("🟢 Received new product:", body); // <== Add this for debugging

const timestamp = Date.now();

const newProduct: Product = {
  id: String(timestamp),
  name: body.name?.trim() || `Unnamed Product ${timestamp}`,
  slug: body.slug?.trim() || `product-${timestamp}`,
  description: body.description?.trim() || "No description provided.",
  price: Number(body.price) || 0,
  category: body.category?.trim() || "Uncategorized",
  inventory: Number(body.inventory) || 0,
  lastUpdated: new Date().toISOString(),
};


  const products = readProducts();
  products.push(newProduct);
  writeProducts(products);
  console.log("📁 Writing to:", dataFile);


  return NextResponse.json(newProduct, { status: 201 });
}
