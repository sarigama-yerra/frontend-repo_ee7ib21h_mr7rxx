import React, { useMemo, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout({ cart, onClose, onSuccess }) {
  const [customer, setCustomer] = useState({ name: '', email: '', address: '' })
  const [plan, setPlan] = useState({ type: 'once_off', deposit_percent: 0 })
  const [loading, setLoading] = useState(false)
  const subtotal = useMemo(() => cart.reduce((sum, i) => sum + i.price_zar * i.quantity, 0), [cart])
  const shipping = subtotal < 1000 ? 80 : 0
  const total = subtotal + shipping

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        items: cart.map(i => ({
          product_id: i.id || i.product_id || '',
          title: i.title,
          price_zar: i.price_zar,
          quantity: i.quantity || 1,
          size: i.size || null,
          image: i.images?.[0] || i.image || null,
        })),
        payment_plan: plan.type === '3_month' ? {
          plan_type: '3_month',
          deposit_percent: plan.deposit_percent || 20,
          months: 3,
          monthly_amount: 0,
        } : {
          plan_type: 'once_off',
          deposit_percent: 0,
          months: 1,
          monthly_amount: 0,
        },
        customer_name: customer.name,
        email: customer.email,
        address: customer.address,
      }
      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Checkout failed')
      onSuccess?.(data)
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50">
      <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-bold text-lg">Checkout</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white">Close</button>
        </div>
        <div className="p-5 grid md:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Full name" className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50" value={customer.name} onChange={e=>setCustomer(c=>({...c,name:e.target.value}))} />
            <input required type="email" placeholder="Email" className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50" value={customer.email} onChange={e=>setCustomer(c=>({...c,email:e.target.value}))} />
            <textarea required placeholder="Delivery address" className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/50" rows={3} value={customer.address} onChange={e=>setCustomer(c=>({...c,address:e.target.value}))} />

            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white font-semibold">Payment plan</p>
              <div className="mt-2 flex gap-3">
                <label className="flex items-center gap-2 text-white/80">
                  <input type="radio" name="plan" checked={plan.type==='once_off'} onChange={()=>setPlan({type:'once_off', deposit_percent:0})} /> Once-off
                </label>
                <label className="flex items-center gap-2 text-white/80">
                  <input type="radio" name="plan" checked={plan.type==='3_month'} onChange={()=>setPlan(p=>({type:'3_month', deposit_percent:p.deposit_percent||20}))} /> 3 months
                </label>
              </div>
              {plan.type==='3_month' && (
                <div className="mt-2">
                  <label className="text-white/80 text-sm">Deposit %</label>
                  <input type="number" min={10} max={80} value={plan.deposit_percent||20} onChange={e=>setPlan(p=>({...p, deposit_percent:Number(e.target.value)}))} className="ml-2 w-20 px-2 py-1 rounded bg-white/10 border border-white/10 text-white" />
                </div>
              )}
            </div>

            <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-white text-slate-900 font-semibold hover:opacity-90 disabled:opacity-60">{loading? 'Processing…' : 'Place order'}</button>
          </form>

          <div>
            <p className="text-white font-semibold mb-2">Order summary</p>
            <div className="space-y-2 max-h-56 overflow-auto pr-2">
              {cart.map((i)=> (
                <div key={i.title+i.size} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2">
                  <img src={i.images?.[0]||i.image} alt="" className="w-12 h-12 rounded object-cover" />
                  <div className="text-white/80 text-sm">
                    <div className="font-semibold text-white">{i.title}</div>
                    <div>R{i.price_zar} × {i.quantity} {i.size? `• ${i.size}`:''}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-white/80 text-sm space-y-1">
              <div className="flex justify-between"><span>Subtotal</span><span>R{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>{shipping? `R${shipping.toFixed(2)}`: 'Free'}</span></div>
              <div className="flex justify-between font-bold text-white text-base mt-2"><span>Total</span><span>R{total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
