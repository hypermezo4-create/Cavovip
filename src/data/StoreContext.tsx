import React, { createContext, useContext, useMemo, useState } from "react";
import type { Product, StoreSettings } from "./models";
import { loadProducts, loadSettings, saveProducts, saveSettings } from "./storage";

type StoreCtx = {
  products: Product[];
  setProducts: (p: Product[]) => void;
  settings: StoreSettings;
  setSettings: (s: StoreSettings) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, _setProducts] = useState<Product[]>(() => loadProducts());
  const [settings, _setSettings] = useState<StoreSettings>(() => loadSettings());

  const setProducts = (p: Product[]) => {
    _setProducts(p);
    saveProducts(p);
  };

  const setSettings = (s: StoreSettings) => {
    _setSettings(s);
    saveSettings(s);
  };

  const value = useMemo(() => ({ products, setProducts, settings, setSettings }), [products, settings]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useStore must be used within StoreProvider");
  return v;
}
