import { useStore } from '../StoreContext'

export default function Footer({ setPage }) {
  const { settings } = useStore()

  return (
    <footer className="mt-16 bg-slate-900 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-2">🛍️ {settings.storeName}</p>
          <p className="text-sm text-slate-400">{settings.tagline}</p>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Quick links</p>
          <div className="flex flex-col gap-2 text-sm">
            <button onClick={() => setPage('shop')} className="text-left hover:text-white">Shop</button>
            <button onClick={() => setPage('track')} className="text-left hover:text-white">Track order</button>
            <button onClick={() => setPage('admin')} className="text-left hover:text-white">Admin</button>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-3">Contact us</p>
          <a
            href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-emerald-500"
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
      </div>
    </footer>
  )
}
