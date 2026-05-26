"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, XCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AdminLoginComponent = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: ""
  });

  const triggerNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        setFormData({
          email: "",
          password: ""
        });

        triggerNotification("success", "Admin Loggedin Successfully");
        
        setTimeout(() => {
          router.push("/admin/dashboard");
          router.refresh();
        }, 1500);
      } else {
        triggerNotification("error", data.message || "Invalid credentials");
      }
    } catch (error) {
      triggerNotification("error", "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcf8f9] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden relative selection:bg-red-100 selection:text-[#4a0e26]">
      
      {/* Subtler Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-20" />

      {/* Very Soft, Warm Glows */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 15, 0],
          y: [0, -15, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/40 blur-[100px] rounded-full -z-10"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -20, 0],
          y: [0, 20, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-red-100/20 blur-[130px] rounded-full -z-10"
      />

      {/* Custom Clean Notification Popup */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`absolute top-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border backdrop-blur-md max-w-sm w-11/12 text-xs font-semibold ${
              notification.type === "success" 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {notification.type === "success" ? <CheckCircle2 size={16} className="text-emerald-600" /> : <XCircle size={16} className="text-rose-600" />}
            <p className="flex-1 tracking-wide">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimalist Admin Container Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white backdrop-blur-xl shadow-[0_20px_80px_rgba(74,14,38,0.06)] rounded-[32px] border border-white p-6 sm:p-9 z-10 group"
      >
        {/* Inner Border Glow */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-red-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* Header Section */}
        <div className="flex flex-col items-center mb-6 text-center">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05, filter: "drop-shadow(0 0 12px rgba(139,22,55,0.15))" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-14 h-14 bg-gradient-to-tr from-[#4A0E26] via-[#6b1436] to-[#8b1637] rounded-2xl flex items-center justify-center text-white shadow-[0_10px_30px_rgba(74,14,38,0.2)] mb-4 cursor-pointer"
          >
            <ShieldCheck size={28} className="text-red-200" />
          </motion.div>

          <h1 className="font-serif text-2xl sm:text-3xl font-black tracking-tighter text-[#4a0e26]">
            Admin Portal
          </h1>
          <p className="text-[10px] font-black text-red-700 uppercase tracking-[0.25em] mt-2 bg-red-50 px-3 py-1 rounded-full border border-red-100/50">
            Lotus Management System
          </p>
        </div>

        {/* Form Inputs */}
        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email Block */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a0e26]/70 block px-1">
              Admin Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a0e26]/40">
                <Mail size={16} strokeWidth={2.2} />
              </div>
              <input
                onChange={handleChange}
                type="email"
                name="email"
                required
                placeholder="admin@lotus.com"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 focus:bg-white rounded-2xl border border-gray-200 focus:border-[#4a0e26] text-sm text-[#4a0e26] font-medium placeholder-gray-400 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(74,14,38,0.04)]"
              />
            </div>
          </div>

          {/* Password Block */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4a0e26]/70">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-black uppercase tracking-[0.15em] text-red-700 hover:text-red-900 transition-colors"
              >
                Reset?
              </Link>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#4a0e26]/40">
                <Lock size={16} strokeWidth={2.2} />
              </div>
              <input
                onChange={handleChange}
                type="password"
                name="password"
                required
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 focus:bg-white rounded-2xl border border-gray-200 focus:border-[#4a0e26] text-sm text-[#4a0e26] font-medium placeholder-gray-400 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(74,14,38,0.04)]"
              />
            </div>
          </div>

          {/* Submit Trigger */}
          <motion.button
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full group relative flex items-center justify-center gap-2.5 bg-[#4A0E26] hover:bg-[#5c1230] text-white font-bold text-xs uppercase tracking-[0.25em] py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(74,14,38,0.15)] overflow-hidden mt-2"
          >
            <span>Verify & Enter</span>
            <ArrowRight size={16} className="text-red-300 group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>
        </form>

        {/* Footer Brand Secure Text */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
            Secured Admin Environment
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default AdminLoginComponent;