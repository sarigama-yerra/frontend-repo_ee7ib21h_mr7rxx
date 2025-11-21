import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Checkout from './components/Checkout'

function App() {
  const [cart, setCart] = useState([])
  const [showCheckout, setShowCheckout] = useState(false)

  // Simple cart from local state for demo
  function addToCart(product) {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id && p.size === product.size)
      if (existing) {
        return prev.map(p => p === existing ? { ...p, quantity: (p.quantity||1) + 1 } : p)
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  useEffect(() => {
    // Expose global for quick add from console during demo
    window.__addToCart = addToCart
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-extrabold tracking-tight text-xl">
            <span className="bg-gradient-to-r from-amber-400 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">Mzansi</span> Boutique
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setShowCheckout(true)} className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-semibold">
              Cart ({cart.reduce((s,i)=> s + (i.quantity||1), 0)})
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <div className="max-w-7xl mx-auto px-6 -mt-6">
          <div className="rounded-3xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 p-4 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Featured</h2>
              <p className="text-white/60 text-sm">Click any product card to add it to your cart</p>
            </div>
            {/* Product grid is interactive through card click handler override */}
            <ProductGrid />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-10 text-center text-white/60 text-sm">
        Built for South African shoppers • Prices in Rands • Fast delivery
      </footer>

      {showCheckout && (
        <Checkout
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSuccess={(data) => {
            setShowCheckout(false)
            setCart([])
            alert('Order created! Order ID: ' + (data.order_id || 'N/A'))
          }}
        />
      )}
    </div>
  )
}

export default App
