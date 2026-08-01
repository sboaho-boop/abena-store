import { useState } from 'react'
import { useStore } from '../StoreContext'
import ProductCard from './ProductCard'

const CATEGORIES = ['All', 'Fashion', 'Beauty', 'Electronics', 'Home', 'Food']

export default function ShopPage({ onAdd, goCheckout }) {
  const { products, cart, settings } = useStore()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const filtered = products.filter((p) => {
    const inCat = category === 'All' || p.category === category
    const matches = p.name.toLowerCase().includes(query.toLowerCase())
    return inCat && matches
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-rose-600 via-pink-600 to-amber-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col items-center text-center gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{settings.tagline}</h1>
          <p className="text-white/85 max-w-xl">
            Shop quality products, pay on delivery, and track your order right from your phone.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-sm">
            <span className="rounded-full bg-white/15 px-3 py-1.5">✅ Pay on delivery</span>
            <span className="rounded-full bg-white/15 px-3 py-1.5">🚚 Fast delivery</span>
            <span className="rounded-full bg-white/15 px-3 py-1.5">🎁 Daily deals</span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between mb-6">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full sm:max-w-xs px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm"
          />

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
                  category === c
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-medium">No products found. Try a different search or category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={onAdd} />
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="sticky bottom-4 mt-8 flex justify-center">
            <button
              onClick={goCheckout}
              className="px-6 py-3 rounded-full bg-rose-600 text-white font-bold shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition"
            >
              Checkout ({cart.length} item{cart.length > 1 ? 's' : ''}) →
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
