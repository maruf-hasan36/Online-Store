"use client";

import { useState } from "react";
import Image from "next/image";
import { useToast } from "@/contexts/ToastContext";
import Link from "next/link";
import {
  Star,
  ShoppingCart,
  Check,
  ShieldCheck,
  Truck,
  ChevronRight,
  Share2,
  Heart,
} from "lucide-react";

export default function ProductDetails({ product }: { product: any }) {
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] ||
      product.thumbnail ||
      "https://placehold.co/600x600/f8fafc/a1a1aa?text=No+Image",
  );
  const [isWishlist, setIsWishlist] = useState(false);
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900 text-slate-100 py-12 selection:bg-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-slate-400 mb-8 tracking-wide">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <Link href="/products" className="hover:text-white transition-colors">
            Products
          </Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <Link
            href={`/category/${product.category?.toLowerCase() || ""}`}
            className="hover:text-white transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight size={14} className="mx-2 text-slate-600" />
          <span className="text-orange-400 font-medium truncate max-w-[150px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* Main Premium Glass Card */}
        <div className="backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] p-6 md:p-10 lg:p-12 relative overflow-hidden hidden-before">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 relative z-10">
            {/* Left Column: Image Gallery */}
            <div className="flex flex-col gap-6">
              {/* Main Image View */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group shadow-inner">
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Utility Actions */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => setIsWishlist(!isWishlist)}
                    className="p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/[0.1] text-slate-300 hover:text-red-400 hover:bg-slate-900 transition-all active:scale-95"
                  >
                    <Heart
                      size={18}
                      fill={isWishlist ? "currentColor" : "none"}
                      className={isWishlist ? "text-red-500" : ""}
                    />
                  </button>
                  <button
                    onClick={() =>
                      showToast("Link copied to clipboard!", "success")
                    }
                    className="p-3 rounded-xl bg-slate-900/60 backdrop-blur-md border border-white/[0.1] text-slate-300 hover:text-white hover:bg-slate-900 transition-all active:scale-95"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Glassy Thumbnail List */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none custom-scrollbar">
                  {product.images.map((img: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-white/[0.02] flex items-center justify-center transition-all duration-300 ${
                        activeImage === img
                          ? "border-2 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.2)] opacity-100 scale-95"
                          : "border border-white/[0.08] opacity-50 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover p-1"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-3">
                <span className="text-xs font-bold tracking-widest text-orange-400 uppercase bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
                  {product.brand || "Premium"}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                {product.title}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg text-amber-400">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-sm">
                    {product.rating ? Number(product.rating).toFixed(1) : "0.0"}
                  </span>
                </div>
                <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
                <span className="text-sm text-emerald-400 font-medium flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-lg">
                  <Check size={14} className="stroke-[3]" /> In Stock (
                  {product.stock})
                </span>
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-sm">
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 tracking-tight">
                    ${Number(product.price).toLocaleString()}
                  </p>
                </div>
                <p className="text-xs text-slate-400 mt-2 tracking-wide uppercase">
                  Inclusive of all local & international taxes
                </p>
              </div>

              <p className="text-slate-300 text-base leading-relaxed mb-8 font-light">
                {product.shortDescription}
              </p>

              {/* Action Buttons with Dynamic Shadows */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <button
                  onClick={() =>
                    showToast("Cart functionality is coming soon!", "info")
                  }
                  className="flex-1 h-14 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:from-orange-600 hover:to-amber-600 transition-all shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.45)] active:scale-[0.98]"
                >
                  <ShoppingCart size={18} className="stroke-[2.5]" />
                  Add to Cart
                </button>
                <button
                  onClick={() =>
                    showToast("Checkout functionality is coming soon!", "info")
                  }
                  className="flex-1 h-14 bg-white text-slate-900 rounded-xl font-bold text-base flex items-center justify-center gap-2 hover:bg-slate-100 transition-all shadow-lg active:scale-[0.98]"
                >
                  Buy it Now
                </button>
              </div>

              {/* Glassy Trust Badges */}
              <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/[0.08] mb-8">
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-orange-400">
                    <Truck size={18} />
                  </div>
                  <span className="text-sm font-medium tracking-wide">
                    Free Global Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-emerald-400">
                    <ShieldCheck size={18} />
                  </div>
                  <span className="text-sm font-medium tracking-wide">
                    1 Year Extended Warranty
                  </span>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Key Specifications
                  </h3>
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4 text-sm text-slate-300 font-light leading-relaxed">
                    {product.specifications}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Description Section */}
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <div className="max-w-3xl">
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                Product Story & Overview
              </h2>
              <div className="text-slate-300 font-light leading-relaxed space-y-4 text-base">
                <p>{product.fullDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
