import { useMemo, useState } from "react";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useStore } from "@/data/StoreContext";
import type { Product } from "@/data/models";
import { Plus, Save, Download, Upload, Trash2, LogOut, KeyRound } from "lucide-react";

function uid() {
  return "p_" + Math.random().toString(16).slice(2) + Date.now().toString(16);
}

function toNum(v: string) {
  const n = Number(String(v).replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export default function Admin() {
  const [search, setSearch] = useState("");
  const { products, setProducts, settings, setSettings } = useStore();

  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(() => localStorage.getItem("cavo_owner_authed") === "1");
  const [message, setMessage] = useState<string | null>(null);

  const [editing, setEditing] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }, [products, search]);

  const startNew = () => {
    setEditing({
      id: uid(),
      name: "",
      priceEgp: 0,
      brand: "",
      category: "",
      sizes: ["40","41","42","43","44"],
      colorsCount: 1,
      image: "/assets/product-1.png",
      badge: "NEW",
      desc: ""
    });
  };

  const saveEdit = () => {
    if (!editing) return;
    if (!editing.name.trim()) return setMessage("اكتب اسم المنتج");
    if (!editing.brand.trim()) return setMessage("اكتب الشركة/البراند");
    if (!editing.category.trim()) return setMessage("اكتب الفئة/التصنيف");

    const next = [...products];
    const idx = next.findIndex(p => p.id === editing.id);
    if (idx >= 0) next[idx] = editing;
    else next.unshift(editing);
    setProducts(next);
    setMessage("اتحفظ ✅");
  };

  const del = (id: string) => {
    if (!confirm("مسح المنتج؟")) return;
    setProducts(products.filter(p => p.id !== id));
    if (editing?.id === id) setEditing(null);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(products, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cavo-products.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File) => {
    try {
      const text = await file.text();
      const data = JSON.parse(text) as Product[];
      if (!Array.isArray(data)) throw new Error("bad");
      setProducts(data);
      setMessage("تم الاستيراد ✅");
    } catch {
      setMessage("ملف JSON غير صالح");
    }
  };

  const logout = () => {
    localStorage.removeItem("cavo_owner_authed");
    setAuthed(false);
  };

  const login = () => {
    if (pin === settings.ownerPin) {
      localStorage.setItem("cavo_owner_authed", "1");
      setAuthed(true);
      setPin("");
      setMessage(null);
    } else {
      setMessage("PIN غلط");
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar search={search} onSearchChange={setSearch} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-2xl font-black">لوحة المالك</div>
            <div className="text-sm text-white/60 mt-1">إضافة/تعديل منتجات + إعدادات واتساب</div>
          </div>

          {authed && (
            <button onClick={logout} className="px-4 py-2 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 font-bold inline-flex items-center gap-2">
              <LogOut size={16} /> خروج
            </button>
          )}
        </div>

        {message && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-3 text-sm">{message}</div>
        )}

        {!authed ? (
          <div className="mt-6 bg-[#0f0f10] border border-white/10 rounded-2xl p-5 max-w-md">
            <div className="font-black flex items-center gap-2"><KeyRound size={18}/> دخول المالك</div>
            <div className="text-sm text-white/60 mt-1">اكتب PIN (افتراضي: 1234) وتقدر تغيّره بعد الدخول.</div>
            <div className="mt-4 flex gap-2">
              <input
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="PIN"
                className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />
              <button onClick={login} className="px-4 py-3 rounded-2xl bg-emerald-500 text-black font-black">دخول</button>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
              <div className="bg-[#0f0f10] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-black">إعدادات</div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <div className="text-xs text-white/60 mb-1">رقم واتساب (بدون +)</div>
                    <input
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">رقم التليفون للعرض</div>
                    <input
                      value={settings.phoneDisplay}
                      onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">PIN المالك</div>
                    <input
                      value={settings.ownerPin}
                      onChange={(e) => setSettings({ ...settings, ownerPin: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button onClick={exportJson} className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 font-bold inline-flex items-center justify-center gap-2">
                      <Download size={16} /> تصدير
                    </button>

                    <label className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 font-bold inline-flex items-center justify-center gap-2 cursor-pointer">
                      <Upload size={16} /> استيراد
                      <input type="file" accept="application/json" className="hidden" onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) importJson(f);
                        e.currentTarget.value = "";
                      }} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-[#0f0f10] border border-white/10 rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <div className="font-black">المنتجات ({products.length})</div>
                  <button onClick={startNew} className="px-4 py-2 rounded-2xl bg-emerald-500 text-black font-black inline-flex items-center gap-2">
                    <Plus size={16} /> إضافة
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filtered.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setEditing(p)}
                      className={`text-right p-3 rounded-2xl border transition ${
                        editing?.id === p.id ? "border-emerald-500 bg-emerald-500/10" : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="font-black line-clamp-1">{p.name}</div>
                      <div className="text-xs text-white/60 mt-1">{p.brand} • {p.category}</div>
                      <div className="text-sm font-black mt-2">{p.priceEgp.toLocaleString("ar-EG")} جنيه</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-[#0f0f10] border border-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="font-black">تعديل المنتج</div>
                {editing && (
                  <button onClick={() => del(editing.id)} className="px-4 py-2 rounded-2xl bg-red-500/20 text-red-200 font-black inline-flex items-center gap-2">
                    <Trash2 size={16} /> مسح
                  </button>
                )}
              </div>

              {!editing ? (
                <div className="text-sm text-white/60 mt-2">اختار منتج أو اضغط إضافة</div>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-white/60 mb-1">الاسم</div>
                    <input
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">السعر (جنيه)</div>
                    <input
                      value={editing.priceEgp}
                      onChange={(e) => setEditing({ ...editing, priceEgp: toNum(e.target.value) })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">البراند</div>
                    <input
                      value={editing.brand}
                      onChange={(e) => setEditing({ ...editing, brand: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">الفئة</div>
                    <input
                      value={editing.category}
                      onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">رابط الصورة (أو /assets/...)</div>
                    <input
                      value={editing.image}
                      onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <div className="text-xs text-white/60 mb-1">عدد الألوان</div>
                    <input
                      value={editing.colorsCount}
                      onChange={(e) => setEditing({ ...editing, colorsCount: toNum(e.target.value) })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="text-xs text-white/60 mb-1">المقاسات (افصل بينهم بفاصلة)</div>
                    <input
                      value={editing.sizes.join(",")}
                      onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(",").map(x => x.trim()).filter(Boolean) })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="text-xs text-white/60 mb-1">وصف بسيط</div>
                    <textarea
                      value={editing.desc || ""}
                      onChange={(e) => setEditing({ ...editing, desc: e.target.value })}
                      className="w-full bg-black/40 border border-white/10 rounded-2xl px-4 py-3 outline-none min-h-24"
                    />
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button onClick={saveEdit} className="px-5 py-3 rounded-2xl bg-white text-black font-black inline-flex items-center gap-2">
                      <Save size={18} /> حفظ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-10">
          <Footer />
        </div>
      </div>
    </div>
  );
}
