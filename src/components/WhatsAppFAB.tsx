import { MessageCircle } from "lucide-react";
import { useCart } from "@/data/CartContext";
import { useStore } from "@/data/StoreContext";
import { openCartWhatsApp, waLink } from "@/data/whatsapp";

export default function WhatsAppFAB() {
  const { items } = useCart();
  const { settings } = useStore();

  const onClick = () => {
    if (items.length > 0) openCartWhatsApp(settings, items);
    else window.open(waLink(settings.whatsappNumber, "السلام عليكم، عايز أستفسر عن منتجات Cavo"), "_blank");
  };

  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg active:scale-95"
      aria-label="WhatsApp"
      title={items.length ? "اطلب السلة على واتساب" : "راسلنا على واتساب"}
    >
      <MessageCircle size={28} />
    </button>
  );
}
