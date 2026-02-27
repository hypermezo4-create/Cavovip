export default function CategoryTabs({
  activeCategory,
  onCategoryChange,
  categories,
}: {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  categories: { id: string; label: string }[];
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((cat) => {
        const active = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-2xl text-sm font-black border transition ${
              active
                ? "bg-white text-black border-white"
                : "bg-white/5 text-white/80 border-white/10 hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
