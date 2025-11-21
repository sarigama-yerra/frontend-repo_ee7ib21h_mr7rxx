import React from 'react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-white font-extrabold tracking-tight text-xl">Mzansi Fits</a>
        <nav className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#products" className="hover:text-white">Shop</a>
          <a href="#brands" className="hover:text-white">Brands</a>
          <a href="#about" className="hover:text-white">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10">Sign in</button>
          <button className="px-3 py-1.5 rounded-lg bg-white text-slate-900 font-semibold">Cart (0)</button>
        </div>
      </div>
    </header>
  )
}
