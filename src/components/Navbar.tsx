import { useEffect, useState } from "react";
import { Search, Menu, X, Moon, Sun, ShoppingCart, Shield } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import cavoLogo from "@/assets/cavo-logo.jpg";
import { useCart } from "@/data/CartContext";

export default function Navbar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") return document.documentElement.classList.contains("dark");
    return true;
  });

  const { items } = useCart();
  const cartCount = items.reduce((s, it) => s + it.qty, 0);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-xl text-sm font-bold ${isActive ? "bg-white text-black" : "text-white/80 hover:text-white hover:bg-white/5"}`;

  return (
    <nav className="sticky top-0 z-40 bg-black/80 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-xl hover:bg-white/5"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="menu"
          >
            {isOpen ? <X /> : <Menu />}
          </button>

          <Link to="/" className="flex items-center gap-2">
            <img src={cavoLogo} className="w-9 h-9 rounded-xl object-cover" />
            <div className="leading-tight">
              <div className="font-black">CAVO</div>
              <div className="text-xs text-white/60">Shoes Store</div>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NavLink to="/" className={navClass}>الرئيسية</NavLink>
          <NavLink to="/admin" className={navClass}><span className="inline-flex items-center gap-2"><Shield size={16}/>المالك</span></NavLink>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2 w-full max-w-sm">
            <Search className="text-white/60" size={18} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن منتج…"
              className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
            />
          </div>

          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-white/5" aria-label="cart">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 bg-emerald-500 text-black text-xs font-black rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="p-2 rounded-xl hover:bg-white/5"
            onClick={() => setIsDark((v) => !v)}
            aria-label="theme"
          >
            {isDark ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">
            <Search className="text-white/60" size={18} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن منتج…"
              className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
            />
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <NavLink to="/" className={navClass} onClick={() => setIsOpen(false)}>الرئيسية</NavLink>
            <NavLink to="/cart" className={navClass} onClick={() => setIsOpen(false)}>السلة</NavLink>
            <NavLink to="/admin" className={navClass} onClick={() => setIsOpen(false)}>لوحة المالك</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}
