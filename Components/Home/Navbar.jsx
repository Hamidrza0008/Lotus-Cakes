"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Search,
  History,
  User,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  const getCurrentUser = async () => {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        console.log(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (data.success) {
        setUser(null);
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menupage" },
    { name: "Specialities", href: "/specialities" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-2 sm:px-4 md:px-10 ${
          scrolled ? "py-2 sm:py-3" : "py-4 sm:py-6"
        }`}
      >
        <div
          className={`max-w-6xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
            scrolled
              ? "bg-white/85 backdrop-blur-md shadow-[0_10px_30px_-5px_rgba(93,18,50,0.1)] rounded-[20px] sm:rounded-[24px] border border-white/40"
              : "bg-transparent"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-tr from-[#5D1232] to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-serif text-lg sm:text-xl shadow-md group-hover:rotate-[10deg] transition-transform duration-500">
                L
              </div>
              <div className="absolute -inset-1 bg-pink-400/20 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="font-serif text-xl sm:text-2xl font-black tracking-tighter text-[#5D1232]">
              LOTUS
            </span>
          </Link>

          {/* NAV LINKS (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 group ${
                    isActive ? "text-[#5D1232]" : "text-pink-600/80 hover:text-[#5D1232]"
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 h-[2px] bg-[#5D1232] transition-all duration-300 ${
                      isActive ? "left-0 w-full" : "left-1/2 w-0 group-hover:w-full group-hover:left-0"
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            
            {/* Search Button with Text */}
            <button
              onClick={() => router.push("/search")}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 ${
                pathname === "/search"
                  ? "bg-pink-100 text-[#5D1232] font-semibold"
                  : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
              }`}
              title="Search"
            >
              <Search size={18} strokeWidth={2.5} className="shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">Search</span>
            </button>

            {/* Orders Button with Text */}
            <Link
              href="/orderspage"
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 ${
                pathname === "/orderspage"
                  ? "bg-pink-100 text-[#5D1232] font-semibold"
                  : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
              }`}
              title="My Orders"
            >
              <History size={18} strokeWidth={2.5} className="shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">Orders</span>
            </Link>

            {/* Profile / Login Button */}
            <button
              onClick={() => router.push(user ? "/profile" : "/login")}
              className={`flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl transition-all duration-300 ${
                pathname === "/profile" || pathname === "/login"
                  ? "bg-pink-100 text-[#5D1232] font-semibold"
                  : "text-pink-600 hover:text-[#5D1232] hover:bg-pink-50"
              }`}
              title={user ? "Profile" : "Login"}
            >
              <User size={18} strokeWidth={2.5} className="shrink-0" />
              <span className="text-xs font-bold uppercase tracking-wider hidden lg:inline">
                {user ? "Profile" : "Login"}
              </span>
            </button>

            {/* Cart / Tray Button */}
            <Link
              href="/cartpage"
              className={`group relative flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-300 ${
                pathname === "/cartpage"
                  ? "bg-pink-600 scale-[1.02] shadow-lg shadow-pink-500/30"
                  : "bg-[#5D1232] hover:bg-[#4a0e28] hover:shadow-md"
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

          </div>
        </div>
      </nav>

      <style jsx global>{`
        @keyframes bounce-short {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-short {
          animation: bounce-short 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;