# 🛍️ E-commerce App (Next.js 16 – Full Rendering Demo)

**Author:** Jeevlin Princess D  
**Date:** October 2025  
**Tech Stack:** Next.js (App Router), TypeScript, JSON data source, Tailwind CSS  

---

## 📖 Overview

This project is a small **E-commerce-style web application** built with **Next.js 16**.  
It demonstrates different rendering strategies — **SSG, ISR, SSR, and CSR** — along with **Next.js API routes** and **basic admin CRUD features**.

The app allows users to:
- Browse products (SSG)
- View product details with auto-regeneration (ISR)
- View live inventory (SSR)
- Manage products from an admin panel (CSR)
- Add items to wishlist (Server Component + Client Interaction)

---

## 🚀 Features

| Page | Route | Rendering Method | Description |
|------|--------|------------------|--------------|
| **Home Page** | `/` | **SSG (Static Site Generation)** | Built at build time using static JSON data. Includes client-side search/filter. |
| **Product Details** | `/products/[slug]` | **ISR (Incremental Static Regeneration)** | Pre-generated product pages auto-update every 60s when data changes. |
| **Inventory Dashboard** | `/dashboard` | **SSR (Server-Side Rendering)** | Fetches live data from JSON file every request. Displays low stock alerts. |
| **Admin Panel** | `/admin` | **CSR (Client-Side Rendering)** | Allows adding and updating products using protected API routes. |
| **Recommendations** | `/recommendations` | **Server Components + Client Action** | Server-rendered product suggestions with client “Add to Wishlist” button. |

---

## 🧩 API Routes

| Endpoint | Method | Description | Protected |
|-----------|--------|-------------|------------|
| `/api/products` | **GET** | Fetch all products | ❌ |
| `/api/products/[slug]` | **GET** | Fetch single product | ❌ |
| `/api/products` | **POST** | Add new product | ✅ Uses `x-api-key` header |
| `/api/products/update/[id]` | **PUT** | Update existing product | ✅ Uses `x-api-key` header |
| `/api/wishlist/[id]` | **POST** | Add to wishlist (demo only) | ❌ |

---

## 🗂️ Data Model

Each product is stored in **`data/products.json`** using this structure:

```json
{
  "id": "string",
  "name": "string",
  "slug": "string",
  "description": "string",
  "price": 0,
  "category": "string",
  "inventory": 0,
  "lastUpdated": "string (ISO datetime)"
}
