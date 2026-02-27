import defaultProducts from "./defaultProducts.json";
import defaultSettings from "./defaultSettings.json";
import type { Product, StoreSettings } from "./models";

const KEY_PRODUCTS = "cavo_products_v1";
const KEY_SETTINGS = "cavo_settings_v1";

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEY_PRODUCTS);
    if (!raw) return defaultProducts as unknown as Product[];
    return JSON.parse(raw) as Product[];
  } catch {
    return defaultProducts as unknown as Product[];
  }
}

export function saveProducts(products: Product[]) {
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(products));
}

export function loadSettings(): StoreSettings {
  try {
    const raw = localStorage.getItem(KEY_SETTINGS);
    if (!raw) return defaultSettings as unknown as StoreSettings;
    return JSON.parse(raw) as StoreSettings;
  } catch {
    return defaultSettings as unknown as StoreSettings;
  }
}

export function saveSettings(settings: StoreSettings) {
  localStorage.setItem(KEY_SETTINGS, JSON.stringify(settings));
}
