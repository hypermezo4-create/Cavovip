import { MessageCircle, Phone } from "lucide-react";
import cavoLogo from "@/assets/cavo-logo.jpg";
import { useStore } from "@/data/StoreContext";
import { waLink } from "@/data/whatsapp";

export default function Footer() {
  const { settings } = useStore();

  return (
    <footer className="bg-[#0b0b0c] border-t border-white/5 mt-12 rounded-2xl overflow-hidden">
      <div className="px-5 py-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3">
              <img src={cavoLogo} className="w-12 h-12 rounded-2xl object-cover" />
              <div>
                <div className="text-xl font-black">CAVO</div>
                <div className="text-sm text-white/60">Shoes Store</div>
              </div>
            </div>
            <p className="text-sm text-white/60 mt-4 leading-relaxed">
              متجر كوتشي باختيار محترم وتجربة طلب سهلة — اطلب على واتساب في ثواني.
            </p>
          </div>

          <div>
            <div className="font-black mb-3">روابط</div>
            <div className="space-y-2 text-sm">
              <a href="/" className="block text-white/70 hover:text-white">الرئيسية</a>
              <a href="/cart" className="block text-white/70 hover:text-white">السلة</a>
              <a href="/admin" className="block text-white/70 hover:text-white">لوحة المالك</a>
            </div>
          </div>

          <div>
            <div className="font-black mb-3">تواصل</div>
            <div className="space-y-3">
              <a href={`tel:${settings.phoneDisplay}`} className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-bold">
                <Phone size={16} /> {settings.phoneDisplay}
              </a>
              <a
                href={waLink(settings.whatsappNumber, "السلام عليكم، عايز أطلب من Cavo")}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-bold"
              >
                <MessageCircle size={16} /> واتساب
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-xs text-white/50 flex items-center justify-between">
          <div>© {new Date().getFullYear()} Cavo</div>
          <div>Developer: Mohammed</div>
        </div>
      </div>
    </footer>
  );
}
