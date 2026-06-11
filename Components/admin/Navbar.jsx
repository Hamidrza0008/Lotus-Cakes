"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  BarChart3,
  Users,
  LogOut,
  Menu,
  X,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLoggedout = async () => {
    try {
      console.log("logout");
      const res = await fetch("/api/admin/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orderspage", icon: ShoppingBag },
    { name: "Inventory", path: "/admin/inventory", icon: Package },
    { name: "Sales", path: "/admin/salespage", icon: BarChart3 },
    { name: "Customers", path: "/admin/customers", icon: Users },
  ];

  // Animation variants for the mobile menu container
  const menuVariants = {
    hidden: { opacity: 0, y: -12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: "easeOut",
        staggerChildren: 0.04,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  // Animation variants for individual links inside the mobile menu
  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120 } },
  };

  return (
    <>
      {/* Top Glassmorphic Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-pink-100/60 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3.5 flex items-center justify-between">
          
          {/* Brand Logo Wrapper */}
          <div
            onClick={() => {
              router.push("/admin/dashboard");
              setIsOpen(false);
            }}
            className="flex items-center gap-3 cursor-pointer select-none group"
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
            
          </div>

          {/* Desktop Navigation Links (Visible on Large Screens) */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;

              return (
                <button
                  key={link.name}
                  onClick={() => router.push(link.path)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all relative ${
                    isActive
                      ? "bg-pink-50 text-[#5D1232]"
                      : "text-gray-600 hover:bg-pink-50/40 hover:text-[#5D1232]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#5D1232]" : "text-pink-400"} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#5D1232] rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}

            <div className="w-px h-5 bg-pink-100 mx-2" />

            <button
              onClick={handleLoggedout}
              className="flex items-center gap-2 px-4 py-2 bg-[#5D1232] hover:bg-[#420B22] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-maroon-900/10 active:scale-95"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Utility Menu Button */}
          <button
            className="lg:hidden p-2 text-[#5D1232] bg-pink-50/60 border border-pink-100/70 rounded-xl transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Premium Dropdown Menu for Mobile Screens */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-[69px] left-4 right-4 bg-white/95 backdrop-blur-md border border-pink-100/80 shadow-xl shadow-maroon-950/5 z-40 lg:hidden flex flex-col p-2.5 rounded-2xl gap-1"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;

              return (
                <motion.button
                  key={link.name}
                  variants={itemVariants}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    router.push(link.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-left transition-all ${
                    isActive
                      ? "bg-pink-50 text-[#5D1232]"
                      : "text-gray-500 hover:bg-pink-50/30 hover:text-[#5D1232]"
                  }`}
                >
                  <Icon size={14} className={isActive ? "text-[#5D1232]" : "text-pink-400"} />
                  <span>{link.name}</span>
                </motion.button>
              );
            })}

            <div className="h-px bg-pink-100/60 my-1.5 mx-2" />

            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoggedout}
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#5D1232] hover:bg-[#420B22] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-maroon-900/10"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar;