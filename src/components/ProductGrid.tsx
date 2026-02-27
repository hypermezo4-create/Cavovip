import { MessageCircle, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/models";
import { useStore } from "@/data/StoreContext";
import { useCart } from "@/data/CartContext";
import { openProductWhatsApp } from "@/data/whatsapp";

function badgeClasses(b?: Product["badge"]) {
  if (b === "HOT") return "bg-red-500/90";
  if (b === "SALE") return "bg-yellow-500/90 text-black";
  if (b === "NEW") return "bg-emerald-500/90";
  return "bg-white/10";
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { settings } = useStore();
  const { add } = useCart();

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <div key={p.id} className="bg-[#0f0f10] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition">
          <div className="relative aspect-square bg-black/30">
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            {p.badge && (
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${badgeClasses(p.badge)}`}>
                {p.badge}
              </div>
            )}
          </div>

          <div className="p-3">
            <div className="text-sm font-semibold line-clamp-2">{p.name}</div>
            <div className="text-xs text-white/60 mt-1">{p.brand} • {p.category}</div>

            <div className="flex items-center justify-between mt-3">
              <div className="text-base font-black">{p.priceEgp.toLocaleString("ar-EG")} <span className="text-xs font-semibold text-white/60">جنيه</span></div>
              <div className="text-xs text-white/60">{p.colorsCount}+ ألوان</div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => add(p)}
                className="flex items-center justify-center gap-2 rounded-xl bg-white text-black font-bold py-2 text-sm active:scale-[0.98]"
              >
                <ShoppingCart size={18} />
                سلة
              </button>

              <button
                onClick={() => openProductWhatsApp(settings, p)}
                className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 text-black font-bold py-2 text-sm active:scale-[0.98]"
              >
                <MessageCircle size={18} />
                واتساب
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
