# 🛍️ E-commerce App (Next.js 16 + TypeScript)

A small **e-commerce-style web application** built using **Next.js 16**, demonstrating different **rendering strategies (SSG, ISR, SSR, CSR)** and **API integration** with a local JSON data source.

---

## 🚀 Project Overview

This app displays products, allows viewing product details, and lets an admin add or update products via an admin panel.  
It also demonstrates **Next.js App Router**, **Server Components**, and **API Routes**.

---

## 🧱 Features Implemented

| Page | Route | Rendering Type | Description |
|------|--------|----------------|--------------|
| 🏠 Home | `/` | **SSG** (Static Site Generation) | Displays a product list with client-side search |
| 📦 Product Detail | `/products/[slug]` | **ISR** (Incremental Static Regeneration)** | Fetches product details and revalidates every 60s |
| 📊 Dashboard | `/dashboard` | **SSR** (Server-Side Rendering) | Shows real-time inventory stats and low-stock alerts |
| ⚙️ Admin Panel | `/admin` | **CSR** (Client-Side Rendering) | Lets admin add or update products dynamically |
| 💡 Recommendations | `/recommendations` | **Server Components** | Server-rendered recommendations with a client button |
| 🔗 API Routes | `/api/products`, `/api/products/[slug]`, `/api/products/update/[id]` | **Node.js API Routes** | Handles CRUD operations securely |

---

## 🗄️ Data Source

Data is stored in `data/products.json`, which serves as a mock database.  
Each API route reads and writes to this JSON file for demo purposes.

---

## 🔐 Admin Access

Admin routes (`POST`, `PUT`) are protected with a simple key-based check using `.env`:

```env
ADMIN_KEY=hi
NEXT_PUBLIC_BASE_URL=http://localhost:3000
