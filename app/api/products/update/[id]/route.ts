import { NextResponse } from "next/server";
import type { Product } from "@/type/products";
import fs from "fs";
import path from "path";

const dataFile = path.resolve("data/products.json");

function readProducts(): Product[] {
  if (!fs.existsSync(dataFile)) return [];
  const raw = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(raw || "[]") as Product[];
}

function writeProducts(products: Product[]) {
  fs.writeFileSync(dataFile, JSON.stringify(products, null, 2), "utf-8");
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ unwrap params properly

  const apiKey = request.headers.get("x-api-key") || "";
  if (apiKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const products = readProducts();

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  // ✅ Update existing product
  products[index] = {
    ...products[index],
    ...body,
    lastUpdated: new Date().toISOString(),
  };

  writeProducts(products);

  return NextResponse.json(products[index], { status: 200 });
}
