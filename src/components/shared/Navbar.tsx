"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  UserCircle,
  Tag,
  Phone,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setIsDropdownOpen(false);
    router.push("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Products", href: "/products" },
    { name: "Phones", href: "/Phones" },
    { name: "Cameras", href: "/Cameras" },
    { name: "Drones", href: "/Drones" },
    { name: "Wearables", href: "/Wearables" },
    { name: "Gaming", href: "/Gaming" },
    { name: "Laptops", href: "/Laptops" },
    { name: "Audio", href: "/Audio" },
    { name: "Tablets", href: "/Tablets" },
  ];

  return (
    <header className="w-full flex flex-col font-sans sticky top-0 z-[100] backdrop-blur-md bg-[var(--primary)]/90 border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.2)]">
      {/* 1. Micro-Header (Topmost thin bar) */}
      <div className="hidden lg:block w-full bg-slate-950/40 py-2 border-b border-white/[0.05]">
        <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center text-xs font-medium text-slate-400 tracking-wide">
          {/* Left Side Info */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
              <Phone size={13} className="text-orange-400" /> 24/7 Support:
              +1-800-GADGETS
            </span>
            <span className="w-px h-3 bg-slate-800"></span>
            <span className="text-slate-300 font-light">
              Free Standard Shipping on Orders Over $100
            </span>
          </div>

          {/* Right Side Quick Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/apple-store"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <MapPin size={13} /> Find Apple Store
            </Link>
            <span className="w-px h-3 bg-slate-800"></span>
            <Link
              href="/offers"
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors font-semibold"
            >
              <Tag size={13} /> Daily Deals & Offers
            </Link>
            <span className="w-px h-3 bg-slate-800"></span>
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              English / USD <ChevronDown size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <div className="w-full py-4 lg:py-5 relative z-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-center justify-between gap-6 lg:gap-10">
            {/* Clean Premium Typography Logo - ONLINE STORE */}
            <Link href="/" className="shrink-0 flex items-center gap-2 group">
              <div className="flex flex-col">
                <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 tracking-tight leading-none">
                  ONLINE
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    STORE
                  </span>
                </div>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.4em] mt-1.5 block ml-0.5">
                  Ecosystem
                </span>
              </div>
            </Link>

            {/* Centralized Bold Glassmorphic Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:flex">
              <div className="relative w-full flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl focus-within:border-orange-500/50 focus-within:shadow-[0_0_15px_rgba(249,115,22,0.15)] transition-all overflow-hidden backdrop-blur-sm">
                <input
                  type="text"
                  placeholder="Search over 10,000+ premium products..."
                  className="w-full bg-transparent text-white placeholder:text-slate-500 py-3 pl-5 pr-4 text-sm focus:outline-none"
                />
                <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white h-full px-7 flex items-center justify-center transition-all shadow-md font-bold text-sm">
                  <Search size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Right Side Actions (Auth & Cart) */}
            <div className="flex items-center gap-5 lg:gap-7 shrink-0 text-white">
              {/* User Account Area */}
              {!mounted || isPending ? (
                <div className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-slate-800"></div>
                  <div className="hidden sm:block w-20 h-8 bg-slate-800 rounded"></div>
                </div>
              ) : session?.user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 text-left focus:outline-none group bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] p-1.5 pr-3 rounded-full transition-all"
                  >
                    {session.user.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name}
                        className="w-8 h-8 rounded-full object-cover border border-white/10 shadow-sm"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center font-bold text-xs text-white border border-white/10 shadow-sm">
                        {session.user.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden sm:flex flex-col text-xs">
                      <span className="text-slate-400 font-light scale-90 origin-left">
                        Account
                      </span>
                      <span className="text-white font-bold truncate max-w-[100px] group-hover:text-orange-400 transition-colors">
                        {session.user.name.split(" ")[0]}
                      </span>
                    </div>
                    <ChevronDown
                      size={12}
                      className="hidden sm:block text-slate-400 group-hover:text-white transition-colors ml-1"
                    />
                  </button>

                  {/* Redesigned Dark Dropdown */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 backdrop-blur-xl bg-slate-900/95 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] py-2 border border-white/[0.08] z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="px-4 py-3 border-b border-white/[0.06] mb-1">
                        <p className="text-sm font-bold truncate text-white">
                          {session.user.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {session.user.email}
                        </p>
                      </div>

                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <UserCircle size={17} className="text-slate-400" />{" "}
                        Profile
                      </Link>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/[0.04] hover:text-white transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <LayoutDashboard size={17} className="text-slate-400" />{" "}
                        Dashboard
                      </Link>

                      <div className="h-px bg-white/[0.06] my-1.5 mx-3"></div>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left font-medium"
                      >
                        <LogOut size={17} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-3 group bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] p-1.5 pr-4 rounded-full transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-amber-500 transition-all shadow-inner">
                    <User
                      size={16}
                      className="text-slate-300 group-hover:text-white"
                    />
                  </div>
                  <div className="hidden sm:flex flex-col text-xs text-left">
                    <span className="text-slate-400 font-light scale-90 origin-left">
                      Hello, Guest
                    </span>
                    <span className="text-white font-bold transition-colors">
                      Sign In
                    </span>
                  </div>
                </Link>
              )}

              <span className="hidden lg:block w-px h-8 bg-white/[0.08]"></span>

              {/* Glass Prominent Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-3 group bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] p-1.5 pr-4 rounded-full transition-all"
              >
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center transition-colors">
                    <ShoppingCart
                      size={16}
                      className="text-slate-300 group-hover:text-white"
                    />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[9px] font-black h-[18px] min-w-[18px] px-1 rounded-full flex items-center justify-center shadow-lg border border-slate-900">
                    2
                  </span>
                </div>
                <div className="hidden sm:flex flex-col text-xs text-left">
                  <span className="text-slate-400 font-light scale-90 origin-left">
                    Total
                  </span>
                  <span className="text-white font-bold transition-colors">
                    $0.00
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Search Overlay */}
          <div className="md:hidden mt-3 relative w-full flex items-center bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden backdrop-blur-sm">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent text-white border-none py-3 pl-4 pr-4 text-sm focus:outline-none"
            />
            <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white h-full px-5 flex items-center justify-center shadow-md">
              <Search size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Bottom Navigation Bar */}
      <div className="w-full bg-slate-950/20 border-t border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]">
        <div className="container mx-auto max-w-7xl relative">
          <nav className="flex items-center xl:justify-center gap-1 md:gap-2 lg:gap-3 overflow-x-auto no-scrollbar scroll-smooth w-full px-4">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative py-3.5 px-3.5 text-xs font-semibold whitespace-nowrap tracking-wide uppercase transition-all group ${
                    isActive
                      ? "text-orange-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {item.name}
                  <div
                    className={`absolute bottom-0 left-3 right-3 h-0.5 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-amber-500"
                        : "bg-transparent group-hover:bg-slate-500 scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </header>
  );
}
