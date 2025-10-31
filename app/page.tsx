"use client";

import Link from "next/link";
import products from "../data/products.json";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated: string;
};


export default function Home() {
  const [q, setQ] = useState("");
  const list = products as Product[];

  const filtered = list.filter(
    (p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Product Catalog (SSG)</h1>
        <p className="text-sm text-gray-600">Built at build-time. Client-side search enabled.</p>
      </header>

      <div className="mb-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by name or category..."
          className="border p-2 rounded w-full"
        />
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <li key={p.id} className="border rounded p-4">
            <h2 className="font-semibold text-lg">{p.name}</h2>
            <p className="text-sm text-gray-600">{p.category}</p>
            <p className="mt-2">₹{p.price}</p>
            <p className="mt-1 text-xs">Stock: {p.inventory}</p>
            <Link href={`/products/${p.slug}`} className="text-blue-600 mt-2 inline-block">
              View details
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
