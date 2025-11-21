import React from 'react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-fuchsia-500/10 to-amber-500/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Fresh South African fashion, sneakers and streetwear
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl">
            Discover local brands and global favorites. Priced in Rand, fast delivery across SA.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#products" className="px-5 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:opacity-90 transition">Shop now</a>
            <a href="#brands" className="px-5 py-3 rounded-xl bg-white/10 text-white border border-white/20 font-semibold hover:bg-white/20 transition">Explore brands</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop" alt="Sneakers" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-3xl bg-amber-500/20 blur-2xl" />
          <div className="absolute -top-6 -right-6 w-40 h-40 rounded-3xl bg-fuchsia-500/20 blur-2xl" />
        </div>
      </div>
    </section>
  )
}
