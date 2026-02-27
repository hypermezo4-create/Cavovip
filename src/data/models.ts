export type Product = {
  id: string;
  name: string;
  priceEgp: number | null;
  priceLabel?: string; // e.g. "خاص" to hide price
  brand: string;
  category: string;
  sizes: string[];
  colorsCount: number;
  image: string; // relative url in /assets or external
  badge?: "HOT" | "SALE" | "NEW";
  desc?: string;
};

export type StoreSettings = {
  whatsappNumber: string; // e.g. 2012...
  phoneDisplay: string;   // e.g. 012...
  ownerPin: string;       // simple local PIN (not secure)
};
