import { NextResponse } from "next/server";
import type { Product } from "@/type/products";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "products.json");

function readProducts(): Product[] {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw || "[]") as Product[];
}

function writeProducts(products: Product[]) {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), "utf-8");
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

  return NextResponse.json(newProduct, { status: 201 });
}
