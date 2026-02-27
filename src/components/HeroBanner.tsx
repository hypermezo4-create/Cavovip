import cavoLogo from "@/assets/cavo-logo.jpg";

const HeroBanner = () => {
  return (
    <div className="relative bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="container mx-auto px-4 py-6 flex items-center justify-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
        <h1 className="font-display text-xl md:text-3xl font-bold text-gold tracking-[0.15em]">
          WALK WITH CONFIDENCE
        </h1>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
      </div>
    </div>
  );
};

export default HeroBanner;
