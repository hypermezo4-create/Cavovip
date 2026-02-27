import type { Product } from "./models";

export type CartItem = { product: Product; qty: number; size?: string };

const KEY_CART = "cavo_cart_v1";

export function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY_CART);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  localStorage.setItem(KEY_CART, JSON.stringify(items));
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, it) => sum + it.product.priceEgp * it.qty, 0);
}
