import type { CartItem } from "./cart";
import type { Product, StoreSettings } from "./models";

export function waLink(number: string, message: string) {
  const n = number.replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function productMessage(p: Product) {
  return `عايز اطلب: ${p.name}\nالسعر: ${p.priceEgp} جنيه`;
}

export function cartMessage(items: CartItem[]) {
  const lines = items.map(it => {
    const size = it.size ? ` | مقاس: ${it.size}` : "";
    return `- ${it.product.name} x${it.qty}${size} = ${it.product.priceEgp * it.qty} جنيه`;
  });
  const total = items.reduce((s, it) => s + it.product.priceEgp * it.qty, 0);
  return `طلب Cavo:\n${lines.join("\n")}\n\nالإجمالي: ${total} جنيه`;
}

export function openProductWhatsApp(settings: StoreSettings, p: Product) {
  window.open(waLink(settings.whatsappNumber, productMessage(p)), "_blank");
}

export function openCartWhatsApp(settings: StoreSettings, items: CartItem[]) {
  window.open(waLink(settings.whatsappNumber, cartMessage(items)), "_blank");
}
