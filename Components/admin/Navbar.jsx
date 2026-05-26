"use client";

import React, { useState } from "react";
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
      console.log("logout")
      const res = await fetch("/api/admin/logout", {
        method: "POST"
      })

      const data = await res.json();

      if (data.success) {
        window.location.href = "/admin/login";
      }
    } catch (error) {

    }

  }

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orderspage", icon: ShoppingBag },
    { name: "Inventory", path: "/admin/inventory", icon: Package }, // Fixed spelling path from inventery to inventory
    { name: "Sales", path: "/admin/salespage", icon: BarChart3 },
    { name: "Customers", path: "/admin/customers", icon: Users },
  ];

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
            <div className="w-10 h-10 bg-[#5D1232] rounded-xl flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105 shadow-sm">
              L
            </div>
            <div>
              <h1 className="text-lg font-black text-[#5D1232] tracking-tight leading-none mb-0.5">
                LOTUS
              </h1>
              <p className="text-[10px] text-pink-500 uppercase tracking-widest font-black">
                Admin Panel
              </p>
            </div>
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all relative ${isActive
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
            

            <button onClick={handleLoggedout} className="flex items-center gap-2 px-4 py-2 bg-[#5D1232] hover:bg-[#420B22] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md shadow-maroon-900/10 active:scale-95">
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Utility Menu Button */}
          <button
            className="lg:hidden p-2 text-[#5D1232] bg-pink-50/60 border border-pink-100 rounded-xl transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Floating Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[65px] left-0 w-full bg-white border-b border-pink-100 shadow-xl z-40 lg:hidden flex flex-col p-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.path;

              return (
                <button
                  key={link.name}
                  onClick={() => {
                    router.push(link.path);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-black uppercase tracking-wider text-left transition-all ${isActive
                      ? "bg-pink-50 text-[#5D1232] border-l-4 border-[#5D1232]"
                      : "text-gray-600 hover:bg-pink-50/30"
                    }`}
                >
                  <Icon size={16} className={isActive ? "text-[#5D1232]" : "text-pink-400"} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            <div className="h-px bg-pink-100 my-2" />

            <button onClick={handleLoggedout} className="flex items-center justify-center gap-2 w-full p-3 bg-[#5D1232] hover:bg-[#420B22] text-white text-sm font-black uppercase tracking-wider rounded-xl transition-all shadow-md">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminNavbar;