import { Flame, ArrowDown, ArrowUp } from "lucide-react";

const sizes = [
  "39","40","41","42","43","44","45","46"
];

export type SortKey = "suggested" | "priceAsc" | "priceDesc" | "hot";

export default function FiltersSidebar({
  sortBy,
  onSortChange,
  selectedSizes,
  onToggleSize,
  onClear,
}: {
  sortBy: SortKey;
  onSortChange: (k: SortKey) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="bg-[#0f0f10] rounded-2xl border border-white/5 p-4 sticky top-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-black">فلترة</div>
        <button onClick={onClear} className="text-xs text-white/60 hover:text-white">مسح الكل</button>
      </div>

      <div className="mt-4">
        <div className="text-xs font-bold text-white/70 mb-2">الترتيب</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onSortChange("suggested")}
            className={`rounded-xl px-3 py-2 text-xs font-bold border ${sortBy==="suggested"?"bg-white text-black border-white":"border-white/10 text-white/80"}`}
          >
            مقترح
          </button>
          <button
            onClick={() => onSortChange("hot")}
            className={`rounded-xl px-3 py-2 text-xs font-bold border flex items-center justify-center gap-2 ${sortBy==="hot"?"bg-white text-black border-white":"border-white/10 text-white/80"}`}
          >
            <Flame size={16} /> Hot
          </button>
          <button
            onClick={() => onSortChange("priceAsc")}
            className={`rounded-xl px-3 py-2 text-xs font-bold border flex items-center justify-center gap-2 ${sortBy==="priceAsc"?"bg-white text-black border-white":"border-white/10 text-white/80"}`}
          >
            <ArrowUp size={16} /> سعر ↑
          </button>
          <button
            onClick={() => onSortChange("priceDesc")}
            className={`rounded-xl px-3 py-2 text-xs font-bold border flex items-center justify-center gap-2 ${sortBy==="priceDesc"?"bg-white text-black border-white":"border-white/10 text-white/80"}`}
          >
            <ArrowDown size={16} /> سعر ↓
          </button>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-bold text-white/70 mb-2">المقاسات</div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => {
            const active = selectedSizes.includes(s);
            return (
              <button
                key={s}
                onClick={() => onToggleSize(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${active ? "bg-emerald-500 text-black border-emerald-500" : "border-white/10 text-white/80 hover:border-white/20"}`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
