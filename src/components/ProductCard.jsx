import { useStore, money } from '../StoreContext'

export default function ProductCard({ product, onAdd }) {
  const { settings, priceOf } = useStore()
  const price = priceOf(product)
  const hasDiscount = (product.discount || 0) > 0

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      {hasDiscount && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-rose-500 text-white text-xs font-bold px-2.5 py-1">
          -{product.discount}%
        </span>
      )}

      <div
        className="relative aspect-square grid place-items-center text-7xl"
        style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}55)` }}
      >
        <span className="drop-shadow-lg transition group-hover:scale-110">{product.emoji}</span>
        {!product.inStock && (
          <div className="absolute inset-0 grid place-items-center bg-white/70 backdrop-blur-sm">
            <span className="rounded-full bg-slate-900 text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wide">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          {product.category}
        </span>
        <h3 className="font-semibold text-slate-900 leading-snug">{product.name}</h3>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          <div>
            {hasDiscount && (
              <div className="text-xs text-slate-400 line-through">
                {money(product.price, settings.currency)}
              </div>
            )}
            <div className="font-bold text-lg text-slate-900">
              {money(price, settings.currency)}
            </div>
          </div>

          <button
            onClick={() => onAdd(product.id)}
            disabled={!product.inStock}
            className="px-3 py-2 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-rose-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add +
          </button>
        </div>
      </div>
    </div>
  )
}
