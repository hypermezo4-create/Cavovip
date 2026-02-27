import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "./models";
import type { CartItem } from "./cart";
import { loadCart, saveCart } from "./cart";

type CartCtx = {
  items: CartItem[];
  add: (p: Product, size?: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setQty: (productId: string, qty: number) => void;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart());

  const persist = (next: CartItem[]) => {
    setItems(next);
    saveCart(next);
  };

  const add = (p: Product, size?: string) => {
    const next = [...items];
    const idx = next.findIndex(x => x.product.id === p.id && x.size === size);
    if (idx >= 0) next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
    else next.push({ product: p, qty: 1, size });
    persist(next);
  };

  const remove = (productId: string) => {
    persist(items.filter(x => x.product.id !== productId));
  };

  const clear = () => persist([]);

  const setQty = (productId: string, qty: number) => {
    const next = items.map(x => x.product.id === productId ? { ...x, qty: Math.max(1, qty) } : x);
    persist(next);
  };

  const value = useMemo(() => ({ items, add, remove, clear, setQty }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within CartProvider");
  return v;
}
