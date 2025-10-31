"use client";

import { useEffect, useState } from "react";

type Product = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  inventory: number;
  lastUpdated?: string;
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({
    name: "",
    slug: "",
    description: "",
    price: 0,
    category: "",
    inventory: 0,
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch all products on load
  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  // ✅ Add or Update product
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    if (!form.name || !form.slug || !form.category) {
      setMessage("⚠️ Please fill all required fields!");
      return;
    }

    const apiKey = prompt("Enter admin key:") || "";
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/products/update/${form.id}` : "/api/products";


    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error");

      if (form.id) {
        // ✅ Update existing product in state
        setProducts((p) => p.map((prod) => (prod.id === data.id ? data : prod)));
        setMessage("✅ Product updated successfully!");
      } else {
        // ✅ Add new product
        setProducts((p) => [...p, data]);
        setMessage("✅ Product added successfully!");
      }

      // ✅ Reset form
      setForm({
        name: "",
        slug: "",
        description: "",
        price: 0,
        category: "",
        inventory: 0,
      });
    } catch (err: any) {
      setMessage("❌ Error: " + err.message);
    }
  }

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel (CSR)</h1>

      {/* FORM */}
      <section className="mb-6">
        <h2 className="font-semibold mb-2">
          {form.id ? "Edit Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Name"
            className="border p-2 w-full"
          />
          <input
            required
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            placeholder="Slug (unique)"
            className="border p-2 w-full"
          />
          <input
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Category"
            className="border p-2 w-full"
          />
          <input
            required
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
            placeholder="Price"
            className="border p-2 w-full"
          />
          <input
            required
            type="number"
            value={form.inventory}
            onChange={(e) =>
              setForm({ ...form, inventory: Number(e.target.value) })
            }
            placeholder="Inventory"
            className="border p-2 w-full"
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Description"
            className="border p-2 w-full"
          />
          <div>
            <button
              type="submit"
              onClick={() => setMessage("")}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {form.id ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>

        {message && <p className="mt-2 text-sm">{message}</p>}
      </section>

      {/* EXISTING PRODUCTS */}
      <section>
        <h2 className="font-semibold mb-2">Existing Products</h2>
        <ul>
          {products.map((p) => (
            <li
              key={`${p.id}-${p.slug}`}
              className="border p-2 mb-2 rounded cursor-pointer hover:bg-gray-50"
              onClick={() => setForm(p)} // ✅ Fill form to edit
            >
              <strong>{p.name}</strong> — Stock: {p.inventory} — ₹{p.price}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
