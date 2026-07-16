import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-white/[0.05] relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute bottom-0 right-12 w-80 h-80 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <Link href="/" className="inline-block group">
              <div className="flex flex-col">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 tracking-tight leading-none">
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
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Your ultimate destination for cutting-edge technology. We provide
              the latest authentic gadgets, ecosystems, and premium smart gear.
            </p>

            {/* Social Icons with Glassmorphic Style */}
            <div className="flex items-center gap-3">
              {[
                "M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z",
                "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
                "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
              ].map((path, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="h-9 w-9 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-orange-500 hover:to-amber-500 hover:border-transparent transition-all shadow-md"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Phones",
                "Mac",
                "Tablets",
                "Watches",
                "Gaming",
                "Accessories",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/category/${link.toLowerCase()}`}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group font-light"
                  >
                    <span className="h-1 w-1 bg-slate-700 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 relative inline-block">
              Customer Support
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              {[
                "Contact Us",
                "Store Locator",
                "Track Order",
                "Return Policy",
                "Warranty Info",
                "FAQs",
              ].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-slate-400 hover:text-orange-400 transition-colors flex items-center gap-2 group font-light"
                  >
                    <span className="h-1 w-1 bg-slate-700 rounded-full group-hover:bg-orange-500 transition-colors"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6 relative inline-block">
              Get in Touch
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-4 mb-6 font-light">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-orange-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  123 Tech Avenue, Silicon Suite, Hub 10010
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-orange-400 shrink-0" />
                <span className="text-sm text-slate-400">+1 234 567 8900</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-orange-400 shrink-0" />
                <span className="text-sm text-slate-400">
                  support@onlinestore.com
                </span>
              </li>
            </ul>

            {/* Glassmorphic Subscription Input */}
            <form className="relative">
              <input
                type="email"
                placeholder="Newsletter subscription"
                className="w-full bg-white/[0.03] text-white rounded-xl py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-orange-500/50 border border-white/[0.08] backdrop-blur-sm placeholder:text-slate-500 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-lg flex items-center justify-center text-white transition-all shadow-md"
                aria-label="Subscribe"
              >
                <Mail size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left font-light tracking-wide">
            &copy; {currentYear}{" "}
            <span className="font-semibold text-slate-400">OnlineStore</span>{" "}
            Global Ecosystem. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500 font-light tracking-wide">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
