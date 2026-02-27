export default function BrandChips({
  activeBrand,
  onBrandChange,
  brands,
}: {
  activeBrand: string;
  onBrandChange: (brand: string) => void;
  brands: string[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {brands.map((b) => {
        const active = activeBrand === b;
        return (
          <button
            key={b}
            onClick={() => onBrandChange(b)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-black border transition ${
              active
                ? "bg-emerald-500 text-black border-emerald-500"
                : "bg-white/5 text-white/80 border-white/10 hover:border-white/20"
            }`}
          >
            {b}
          </button>
        );
      })}
    </div>
  );
}
