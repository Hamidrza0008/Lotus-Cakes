"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  History,
  User,
  Menu,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Added Image import

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentUser = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cartCount = useSelector(
    (state) => state?.cart?.cartItems?.length || 0
  );

  useEffect(() => {
    getCurrentUser();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menupage" },
    { name: "Specialities", href: "/specialities" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-3 sm:px-4 md:px-10 ${scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
          }`}
      >
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 relative ${scrolled || isOpen
              ? "bg-white/85 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(93,18,50,0.1)] rounded-[20px] sm:rounded-[24px] border border-white/40"
              : "bg-transparent"
            }`}
        >
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative">
              {/* SVG Lotus Logo */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:rotate-[10deg] transition-transform duration-500">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-none stroke-[#5D1232] sm:stroke-pink-500"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left Laurel Wreath / Leaves from image_1295b6.png */}
                  <path d="M 22,70 C 12,60 10,40 18,22 C 16,35 18,50 28,60" stroke="#5D1232" strokeWidth="2.5" />
                  <path d="M 14,48 Q 8,42 12,35" stroke="#5D1232" strokeWidth="2" />
                  <path d="M 15,35 Q 10,28 16,22" stroke="#5D1232" strokeWidth="2" />

                  {/* Right Laurel Wreath / Leaves from image_1295b6.png */}
                  <path d="M 78,70 C 88,60 90,40 82,22 C 84,35 82,50 72,60" stroke="#5D1232" strokeWidth="2.5" />
                  <path d="M 86,48 Q 92,42 88,35" stroke="#5D1232" strokeWidth="2" />
                  <path d="M 85,35 Q 90,28 84,22" stroke="#5D1232" strokeWidth="2" />

                  {/* Center Main Lotus Petal */}
                  <path
                    d="M 50,25 C 62,45 65,70 50,80 C 35,70 38,45 50,25 Z"
                    className="fill-pink-500/10 stroke-[#5D1232]"
                    strokeWidth="4"
                  />

                  {/* Left Side Petals */}
                  <path d="M 50,45 C 32,50 26,68 44,78" className="stroke-[#5D1232]" />
                  <path d="M 50,58 C 22,62 28,76 48,79" className="stroke-[#5D1232]" />

                  {/* Right Side Petals */}
                  <path d="M 50,45 C 68,50 74,68 56,78" className="stroke-[#5D1232]" />
                  <path d="M 50,58 C 78,62 72,76 32,79" className="stroke-[#5D1232]" />

                  {/* Base Bottom Curve */}
                  <path d="M 35,80 Q 50,86 65,80" stroke="#5D1232" strokeWidth="4" />
                </svg>
              </div>
              <div className="absolute -inset-1 bg-pink-400/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="font-serif text-xl font-black tracking-tighter text-[#5D1232]">
              LOTUS
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${isActive ? "text-[#5D1232]" : "text-pink-600/80 hover:text-[#5D1232]"
                    }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 h-[2px] bg-[#5D1232] transition-all duration-300 ${isActive ? "left-0 w-full" : "left-1/2 w-0 group-hover:w-full group-hover:left-0"
                      }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions Area */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => router.push("/search")}
              className={`flex items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${pathname === "/search" ? "bg-pink-100 text-[#5D1232]" : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
                }`}
            >
              <Search size={18} strokeWidth={2.5} />
            </button>

            <Link
              href="/orderspage"
              className={`flex items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${pathname === "/orderspage" ? "bg-pink-100 text-[#5D1232]" : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
                }`}
            >
              <History size={18} strokeWidth={2.5} />
            </Link>

            <button
              onClick={() => router.push(user ? "/profile" : "/login")}
              className={`flex items-center gap-1.5 p-2 rounded-xl transition-all duration-300 ${pathname === "/profile" || pathname === "/login" ? "bg-pink-100 text-[#5D1232]" : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
                }`}
            >
              <User size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Right Side Controls (Mobile + Desktop Combined Container) */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Cart Tray - Always Visible */}
            <Link
              href="/cartpage"
              className={`group relative flex items-center gap-1.5 px-3 py-2 rounded-xl sm:rounded-2xl transition-all duration-300 ${pathname === "/cartpage"
                  ? "bg-pink-600 scale-[1.02] shadow-lg shadow-pink-500/30"
                  : "bg-[#5D1232] hover:bg-[#4a0e28]"
                }`}
            >
              <ShoppingBag size={17} className={pathname === "/cartpage" ? "text-white" : "text-pink-300"} />
              <span className="text-[11px] font-bold text-white uppercase tracking-wider hidden sm:inline">
                Tray
              </span>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 h-4 sm:min-w-5 sm:h-5 px-1 bg-pink-500 border-2 border-white text-white text-[9px] sm:text-[10px] font-black flex items-center justify-center rounded-full animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-pink-600 hover:text-[#5D1232] md:hidden rounded-xl hover:bg-pink-50 transition-all shrink-0"
            >
              {isOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </button>

          </div>

          {/* Mobile Dropdown Panel */}
          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-md rounded-[20px] shadow-xl border border-white/50 py-4 px-6 flex flex-col gap-1 md:hidden animate-slide-down">

              {/* Primary Navigation Links */}
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-xs font-bold uppercase tracking-[0.15em] py-3 border-b border-pink-50/50 transition-colors ${isActive ? "text-[#5D1232]" : "text-pink-600/80"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Utility Actions Inside Mobile Dropdown */}
              <button
                onClick={() => router.push("/search")}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] py-3 text-pink-600/80 border-b border-pink-50/50 text-left w-full"
              >
                <Search size={16} strokeWidth={2.5} /> Search
              </button>

              <button
                onClick={() => router.push("/orderspage")}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] py-3 text-pink-600/80 border-b border-pink-50/50 text-left w-full"
              >
                <History size={16} strokeWidth={2.5} /> Orders
              </button>

              <button
                onClick={() => router.push(user ? "/profile" : "/login")}
                className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.15em] py-3 text-pink-600/80 text-left w-full"
              >
                <User size={16} strokeWidth={2.5} /> {user ? "Profile" : "Login"}
              </button>

            </div>
          )}
        </div>
      </nav>

      <style jsx global>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navbar;