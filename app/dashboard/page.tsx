import { Product } from "../../type/products"

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // force SSR for this page

export default async function Dashboard() {
  // Fetch fresh data from the API route server-side
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/products`, { cache: "no-store" });
  const products = (await res.json()) as Product[];

  const total = products.length;
  const lowStock = products.filter((p) => p.inventory < 5).length;
  const totalInventory = products.reduce((s, p) => s + p.inventory, 0);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Inventory Dashboard (SSR)</h1>
      <ul>
        <li>Total products: <strong>{total}</strong></li>
        <li>Total stock count: <strong>{totalInventory}</strong></li>
        <li>Low stock items (&lt;5): <strong>{lowStock}</strong></li>
      </ul>

      <section className="mt-6">
        <h2 className="font-semibold mb-2">Low stock products</h2>
        <ul>
          {products.filter((p) => p.inventory < 5).map((p) => (
            <li key={p.id} className="mb-2">
              {p.name} — Stock: {p.inventory}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
