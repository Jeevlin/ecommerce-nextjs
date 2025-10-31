"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-75 justify-center">
      <Link href="/" className="hover:text-yellow-300">Home</Link>
      <Link href="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
      <Link href="/admin" className="hover:text-yellow-300">Admin</Link>
      <Link href="/recommendations" className="hover:text-yellow-300">Recommendations</Link>
    </nav>
  );
}
