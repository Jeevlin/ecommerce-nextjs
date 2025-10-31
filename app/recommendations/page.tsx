import WishlistButton from '../components/wishbuttons';
import products from "../../data/products.json";

export default function Recommendations() {
  const recommended = (products as any[]).slice(0, 2);

  return (
    <main className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Recommended for you (Server + Client)</h1>
      <ul>
        {recommended.map((p) => (
          <li
            key={p.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm text-gray-600">₹{p.price}</div>
            </div>

            {/* 👇 Client-side wishlist button */}
            <WishlistButton id={p.id} />
          </li>
        ))}
      </ul>
    </main>
  );
}
