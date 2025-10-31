import { notFound } from "next/navigation";
import  products from "../../../data/products.json";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params; // ✅ unwrap params
  const product = products.find((p) => p.slug === slug);

  if (!product) return notFound(); // ✅ shows 404 only when not found

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="mt-4 text-gray-700">{product.description}</p>
      <p className="mt-2 text-green-600 font-semibold">₹{product.price}</p>
      <p className="mt-2 text-sm text-gray-500">Category: {product.category}</p>
    </div>
  );
}
