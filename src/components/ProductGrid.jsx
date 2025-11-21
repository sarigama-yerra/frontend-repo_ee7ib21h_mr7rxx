import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function ProductGrid() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ q: '', category: 'all' })

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (filters.q) params.append('q', filters.q)
        if (filters.category && filters.category !== 'all') params.append('category', filters.category)
        const res = await fetch(`${API_BASE}/api/products?${params.toString()}`, { signal: controller.signal })
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [filters.q, filters.category])

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">Popular right now</h2>
        <div className="flex gap-3">
          <input
            placeholder="Search tees, hoodies, sneakers..."
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
          >
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="shoes">Shoes</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-white/70">Loading products…</p>
      ) : products?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-white/70">No products yet. Add some from the backend or via API.</div>
      )}
    </section>
  )
}
