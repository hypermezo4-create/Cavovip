import { Phone, MessageCircle } from "lucide-react";
import { useStore } from "@/data/StoreContext";
import { waLink } from "@/data/whatsapp";

export default function TopBar() {
  const { settings } = useStore();
  return (
    <div className="bg-black border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <div className="text-xs text-white/60">
          دعم سريع • طلبات واتساب
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${settings.phoneDisplay}`}
            className="flex items-center gap-2 text-xs font-bold text-white/80 hover:text-white"
          >
            <Phone size={16} />
            {settings.phoneDisplay}
          </a>
          <a
            href={waLink(settings.whatsappNumber, "السلام عليكم، عايز أستفسر عن منتجات Cavo")}
            target="_blank"
            className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            rel="noreferrer"
          >
            <MessageCircle size={16} />
            واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
