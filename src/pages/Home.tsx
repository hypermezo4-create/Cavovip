import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import CategoryTabs from "@/components/CategoryTabs";
import BrandChips from "@/components/BrandChips";
import FiltersSidebar, { SortKey } from "@/components/FiltersSidebar";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { useStore } from "@/data/StoreContext";
import type { Product } from "@/data/models";

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export default function Home() {
  const { products } = useStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("كل الشركات");
  const [sortBy, setSortBy] = useState<SortKey>("suggested");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map(p => p.category))).filter(Boolean);
    return [
      { id: "all", label: "الكل" },
      ...cats.map(c => ({ id: c, label: c }))
    ];
  }, [products]);

  const brands = useMemo(() => {
    const bs = Array.from(new Set(products.map(p => p.brand))).filter(Boolean);
    return ["كل الشركات", ...bs];
  }, [products]);

  const filtered = useMemo(() => {
    let list: Product[] = products;

    if (activeCategory !== "all") list = list.filter(p => p.category === activeCategory);
    if (activeBrand !== "كل الشركات") list = list.filter(p => normalize(p.brand) === normalize(activeBrand));

    const q = normalize(search);
    if (q) {
      list = list.filter(p =>
        normalize(p.name).includes(q) ||
        normalize(p.brand).includes(q) ||
        normalize(p.category).includes(q)
      );
    }

    if (selectedSizes.length) {
      list = list.filter(p => p.sizes?.some(s => selectedSizes.includes(s)));
    }

    if (sortBy === "priceAsc") list = [...list].sort((a,b) => (a.priceEgp ?? 0) - (b.priceEgp ?? 0));
    if (sortBy === "priceDesc") list = [...list].sort((a,b) => (b.priceEgp ?? 0) - (a.priceEgp ?? 0));
    if (sortBy === "hot") list = [...list].sort((a,b) => (b.badge==="HOT"?1:0) - (a.badge==="HOT"?1:0));

    return list;
  }, [products, activeCategory, activeBrand, search, selectedSizes, sortBy]);

  const toggleSize = (s: string) => {
    setSelectedSizes(prev => prev.includes(s) ? prev.filter(x => x!==s) : [...prev, s]);
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setActiveBrand("كل الشركات");
    setSelectedSizes([]);
    setSortBy("suggested");
    setSearch("");
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar search={search} onSearchChange={setSearch} />
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-6">
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            categories={categories}
          />
        </div>

        <div className="mt-4">
          <BrandChips
            activeBrand={activeBrand}
            onBrandChange={setActiveBrand}
            brands={brands}
          />
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
          <FiltersSidebar
            sortBy={sortBy}
            onSortChange={setSortBy}
            selectedSizes={selectedSizes}
            onToggleSize={toggleSize}
            onClear={clearFilters}
          />

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-white/60">عدد النتائج: <span className="text-white font-bold">{filtered.length}</span></div>
              <button onClick={clearFilters} className="text-sm font-bold text-white/70 hover:text-white">إعادة ضبط</button>
            </div>
            <ProductGrid products={filtered} />
          </div>
        </div>

        <div className="mt-10">
          <Footer />
        </div>
      </div>

      <WhatsAppFAB />
    </div>
  );
}
