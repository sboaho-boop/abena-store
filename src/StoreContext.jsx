import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const KEYS = {
  products: 'abena_products',
  cart: 'abena_cart',
  orders: 'abena_orders',
  settings: 'abena_settings',
}

export const DEFAULT_SETTINGS = {
  storeName: 'Abena Store',
  tagline: 'Quality general goods at your doorstep',
  whatsapp: '233000000000',
  promoCode: 'ABENA10',
  promoDiscount: 10,
  deliveryFee: 20,
  currency: 'GH₵',
}

export const DEFAULT_PRODUCTS = [
  { id: 'p1', name: 'Classic Handbag', category: 'Fashion', price: 150, discount: 0, emoji: '👜', color: '#f43f5e', inStock: true },
  { id: 'p2', name: 'Sneakers (Unisex)', category: 'Fashion', price: 220, discount: 10, emoji: '👟', color: '#0ea5e9', inStock: true },
  { id: 'p3', name: 'Maxi Dress', category: 'Fashion', price: 180, discount: 0, emoji: '👗', color: '#a855f7', inStock: true },
  { id: 'p4', name: 'Aviator Sunglasses', category: 'Fashion', price: 60, discount: 5, emoji: '🕶️', color: '#f59e0b', inStock: true },
  { id: 'p5', name: 'Skincare Set', category: 'Beauty', price: 130, discount: 15, emoji: '🧴', color: '#ec4899', inStock: true },
  { id: 'p6', name: 'Perfume 50ml', category: 'Beauty', price: 200, discount: 0, emoji: '🌸', color: '#8b5cf6', inStock: true },
  { id: 'p7', name: 'Wireless Earbuds', category: 'Electronics', price: 120, discount: 10, emoji: '🎧', color: '#22c55e', inStock: true },
  { id: 'p8', name: 'Phone Charger (Fast)', category: 'Electronics', price: 45, discount: 0, emoji: '🔌', color: '#06b6d4', inStock: true },
  { id: 'p9', name: 'Blender 1.5L', category: 'Home', price: 350, discount: 5, emoji: '🥤', color: '#6366f1', inStock: true },
  { id: 'p10', name: 'Kitchen Knife Set', category: 'Home', price: 90, discount: 0, emoji: '🔪', color: '#ef4444', inStock: true },
  { id: 'p11', name: 'Organic Honey 500g', category: 'Food', price: 55, discount: 0, emoji: '🍯', color: '#f97316', inStock: true },
  { id: 'p12', name: 'Nutella Spread 350g', category: 'Food', price: 40, discount: 0, emoji: '🍫', color: '#78716c', inStock: true },
]

export const ORDER_STATUSES = [
  { id: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-700' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-sky-100 text-sky-700' },
  { id: 'shipped', label: 'Shipped', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'delivered', label: 'Delivered', color: 'bg-emerald-100 text-emerald-700' },
  { id: 'cancelled', label: 'Cancelled', color: 'bg-rose-100 text-rose-700' },
]

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => load(KEYS.products, DEFAULT_PRODUCTS))
  const [cart, setCart] = useState(() => load(KEYS.cart, []))
  const [orders, setOrders] = useState(() => load(KEYS.orders, []))
  const [settings, setSettings] = useState(() => ({ ...DEFAULT_SETTINGS, ...load(KEYS.settings, {}) }))

  useEffect(() => save(KEYS.products, products), [products])
  useEffect(() => save(KEYS.cart, cart), [cart])
  useEffect(() => save(KEYS.orders, orders), [orders])
  useEffect(() => save(KEYS.settings, settings), [settings])

  function priceOf(product) {
    return product.price * (1 - (product.discount || 0) / 100)
  }

  function addToCart(productId, qty = 1) {
    setCart((prev) => {
      const found = prev.find((i) => i.productId === productId)
      if (found) {
        return prev.map((i) => (i.productId === productId ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { productId, qty }]
    })
  }

  function setQty(productId, qty) {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i)),
    )
  }

  function clearCart() {
    setCart([])
  }

  function cartDetails() {
    const lines = cart
      .map((i) => ({ item: i, product: products.find((p) => p.id === i.productId) }))
      .filter((l) => l.product)
    const subtotal = lines.reduce((s, l) => s + priceOf(l.product) * l.item.qty, 0)
    return { lines, subtotal }
  }

  function placeOrder(details) {
    const order = {
      id: `ABN-${Date.now().toString().slice(-6)}`,
      ...details,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [order, ...prev])
    clearCart()
    return order
  }

  function updateOrderStatus(id, status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  function getOrder(id) {
    return orders.find((o) => o.id.toUpperCase() === String(id).trim().toUpperCase())
  }

  const value = useMemo(
    () => ({
      products,
      setProducts,
      cart,
      addToCart,
      setQty,
      clearCart,
      cartDetails,
      priceOf,
      orders,
      placeOrder,
      updateOrderStatus,
      getOrder,
      settings,
      setSettings,
    }),
    [products, cart, orders, settings],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function money(n, currency) {
  return `${currency}${n.toFixed(2)}`
}

export function orderStatusMeta(id) {
  return ORDER_STATUSES.find((s) => s.id === id) || ORDER_STATUSES[0]
}
