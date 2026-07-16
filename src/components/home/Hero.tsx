import Image from "next/image";
import { Button } from "@/components/ui";

export default function Hero() {
  return (
    <div className="w-full bg-slate-950 py-4 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative h-[60vh] min-h-[400px] lg:h-[calc(100vh-200px)] rounded-3xl overflow-hidden border border-white/[0.08] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] group">
          {/* Background Image with Zoom Effect on Hover */}
          <div className="absolute inset-0 z-0 transition-transform duration-1000 ease-out group-hover:scale-105">
            <Image
              src="/images/banner/Jul 11, 2026, 09_14_47 PM.png"
              alt="Hero Banner"
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Premium Glassmorphic Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent backdrop-blur-[2px]" />

          {/* Subtle Ambient Glows inside Hero */}
          <div className="absolute top-12 left-1/4 w-72 h-72 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none z-10 animate-pulse" />
          <div className="absolute bottom-12 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px] pointer-events-none z-10" />

          {/* Floating Neon Glass Edge */}
          <div className="absolute inset-0 z-10 border border-white/[0.05] rounded-3xl pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

          {/* Content Wrapper */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 md:px-12 max-w-5xl mx-auto">
            {/* Mini Premium Badge */}
            <div className="mb-4 opacity-0 animate-[fadeIn_0.5s_ease-out_forward] style={{ animationFillMode: 'forwards' }}">
              <span className="text-xs font-bold tracking-[0.2em] text-orange-400 uppercase bg-orange-500/10 backdrop-blur-md px-4 py-2 rounded-full border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                Next-Gen Ecosystem
              </span>
            </div>

            {/* Main Headline with Silver-White Gradient */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 mb-6 max-w-4xl tracking-tight leading-[1.1]">
              Discover the Latest <br className="hidden md:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 drop-shadow-[0_2px_20px_rgba(249,115,22,0.2)]">
                Tech Innovations
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm md:text-lg lg:text-xl text-slate-300 mb-10 max-w-2xl font-light tracking-wide leading-relaxed">
              Explore our handpicked collection of cutting-edge gadgets,
              futuristic gear, and premium smart devices.
            </p>

            {/* Premium Interactive Button */}
            <div className="relative group/btn active:scale-95 transition-transform">
              {/* Outer Button Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl blur opacity-30 group-hover/btn:opacity-60 transition duration-300" />

              <Button
                href="/category/gadget"
                className="relative h-14 px-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base rounded-xl transition-all border border-orange-400/20 shadow-lg flex items-center justify-center gap-2"
              >
                Shop The Collection
              </Button>
            </div>
          </div>

          {/* Glass Slide Indicator Ornament */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
