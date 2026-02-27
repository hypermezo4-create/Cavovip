import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import { useCart } from "@/data/CartContext";
import { useStore } from "@/data/StoreContext";
import { cartTotal } from "@/data/cart";
import { openCartWhatsApp } from "@/data/whatsapp";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [search, setSearch] = useState("");
  const { items, remove, clear, setQty } = useCart();
  const { settings } = useStore();

  const total = cartTotal(items);
  const hasCustomPrice = items.some(it => !!it.product.priceLabel || it.product.priceEgp == null);

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar search={search} onSearchChange={setSearch} />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-black">سلة المشتريات</div>
            <div className="text-sm text-white/60 mt-1">راجع طلبك قبل الإرسال على واتساب</div>
          </div>
          <Link to="/" className="text-sm font-bold text-white/70 hover:text-white">رجوع للمتجر</Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
            <div className="text-lg font-black">السلة فاضية</div>
            <div className="text-white/60 mt-2">اختار منتجات واضغط “سلة”</div>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              {items.map((it) => (
                <div key={it.product.id + (it.size || "")} className="bg-[#0f0f10] border border-white/5 rounded-2xl p-3 flex gap-3">
                  <img src={it.product.image} className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="font-black">{it.product.name}</div>
                    <div className="text-xs text-white/60 mt-1">{it.product.brand} • {it.product.category}{it.size ? ` • مقاس ${it.size}` : ""}</div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="font-black">{it.product.priceLabel ? it.product.priceLabel : (it.product.priceEgp ?? 0).toLocaleString("ar-EG") + " جنيه"}</div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => setQty(it.product.id, it.qty - 1)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
                          <Minus size={16} />
                        </button>
                        <div className="min-w-8 text-center font-black">{it.qty}</div>
                        <button onClick={() => setQty(it.product.id, it.qty + 1)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
                          <Plus size={16} />
                        </button>
                        <button onClick={() => remove(it.product.id)} className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-200">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60">الإجمالي</div>
                <div className="text-2xl font-black">{hasCustomPrice ? "حسب السعر" : total.toLocaleString("ar-EG") + " جنيه"}</div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={clear} className="px-4 py-3 rounded-2xl border border-white/10 text-white/80 hover:border-white/20 font-bold">
                  مسح
                </button>
                <button
                  onClick={() => openCartWhatsApp(settings, items)}
                  className="px-4 py-3 rounded-2xl bg-emerald-500 text-black font-black"
                >
                  إرسال الطلب واتساب
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </div>

      <WhatsAppFAB />
    </div>
  );
}
