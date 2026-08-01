import { useStore } from '../StoreContext'

export default function Navbar({ page, setPage, onCartOpen }) {
  const { cart, settings } = useStore()
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const links = [
    { id: 'shop', label: 'Shop' },
    { id: 'track', label: 'Track Order' },
    { id: 'admin', label: 'Admin' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => setPage('shop')}
          className="flex items-center gap-2.5 font-bold text-lg text-slate-900"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white text-sm shadow">
            🛍️
          </span>
          {settings.storeName}
        </button>

        <nav className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                page === l.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button
          onClick={onCartOpen}
          className="relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold bg-slate-900 text-white hover:bg-slate-700 transition"
        >
          <span>🛒</span>
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 grid place-items-center min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-xs font-bold">
              {count}
            </span>
          )}
        </button>
      </div>

      <nav className="sm:hidden flex items-center justify-around border-t border-slate-200 py-1.5">
        {links.map((l) => (
          <button
            key={l.id}
            onClick={() => setPage(l.id)}
            className={`px-3 py-1 rounded-lg text-sm font-medium ${
              page === l.id ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            {l.label}
          </button>
        ))}
      </nav>
    </header>
  )
}
