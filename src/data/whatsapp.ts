import type { CartItem } from "./cart";
import type { Product, StoreSettings } from "./models";

export function waLink(number: string, message: string) {
  const n = number.replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

export function productMessage(p: Product) {
  const price = p.priceLabel ? p.priceLabel : `${p.priceEgp ?? 0} جنيه`;
  return `عايز اطلب: ${p.name}
السعر: ${price}`;
}

export function cartMessage(items: CartItem[]) {
  const lines = items.map(it => {
    const size = it.size ? ` | مقاس: ${it.size}` : "";
    const priceLine = it.product.priceLabel ? it.product.priceLabel : `${(it.product.priceEgp ?? 0) * it.qty} جنيه`;
    return `- ${it.product.name} x${it.qty}${size} = ${priceLine}`;
  });
  const hasCustom = items.some(it => !!it.product.priceLabel || it.product.priceEgp == null);
  const total = items.reduce((s, it) => s + (it.product.priceEgp ?? 0) * it.qty, 0);
  return `طلب Cavo:
${lines.join("
")}

الإجمالي: ${hasCustom ? "حسب السعر" : `${total} جنيه`}`;
}

export function openProductWhatsApp(settings: StoreSettings, p: Product) {
  window.open(waLink(settings.whatsappNumber, productMessage(p)), "_blank");
}

export function openCartWhatsApp(settings: StoreSettings, items: CartItem[]) {
  window.open(waLink(settings.whatsappNumber, cartMessage(items)), "_blank");
}
