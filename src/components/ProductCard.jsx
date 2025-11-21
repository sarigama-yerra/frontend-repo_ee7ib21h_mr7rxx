import React from 'react'

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition">
      <div className="aspect-square overflow-hidden bg-white/5">
        <img src={product.images?.[0] || 'https://images.unsplash.com/photo-1520975867597-0af37a22e31b?q=80&w=800&auto=format&fit=crop'} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold truncate">{product.title}</h3>
          <span className="text-emerald-400 font-bold">R{Number(product.price_zar).toFixed(2)}</span>
        </div>
        <p className="text-white/60 text-sm mt-1 truncate">{product.brand || product.category}</p>
        <div className="mt-3 flex gap-2 text-xs text-white/60">
          {product.sizes?.slice(0,3)?.map((s) => (
            <span key={s} className="px-2 py-1 rounded bg-white/10 border border-white/10">{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
