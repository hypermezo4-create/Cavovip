export function cartMessage(items: CartItem[]) {
  const lines = items.map((it) => {
    const size = it.size ? ` | مقاس: ${it.size}` : "";
    const priceLine = it.product.priceLabel
      ? it.product.priceLabel
      : `${(it.product.priceEgp ?? 0) * it.qty} جنيه`;
    return `- ${it.product.name} x${it.qty}${size} = ${priceLine}`;
  });

  const hasCustom = items.some(
    (it) => !!it.product.priceLabel || it.product.priceEgp == null
  );

  const total = items.reduce(
    (s, it) => s + (it.product.priceEgp ?? 0) * it.qty,
    0
  );

  return `طلب Cavo:
${lines.join("\n")}

الإجمالي: ${hasCustom ? "حسب السعر" : `${total} جنيه`}`;
}