"use client";

import { useState } from "react";

export default function WishlistButton({ id }: { id: string }) {
  const [message, setMessage] = useState("");

  async function handleAdd() {
    setMessage("Adding...");
    try {
      const res = await fetch(`/api/wishlist/${id}`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed");
      setMessage("✅ Added to wishlist!");
    } catch (err) {
      setMessage("❌ Error adding to wishlist.");
    }
    // Clear the message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-all"
      >
        Add to Wishlist
      </button>
      {message && <p className="text-sm text-gray-600 mt-1">{message}</p>}
    </div>
  );
}
