"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isFocused, setIsFocused] = useState("");
  
  // Custom Notification State
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success" // "success" | "error"
  });

  // Helper function to trigger pop-up
  const showToast = (message, type = "success") => {
    setNotification({ show: true, message, type });
    // Automatically hide after 3.5 seconds
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 3500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showToast(data.message || "Logged in successfully!", "success");
        setFormData({ email: "", password: "" });

        // Delay routing slightly so the user can see the success toast
        setTimeout(() => {
          router.push("/");
        }, 1200);
      } else {
        showToast(data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Something went wrong. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fff5f7] flex items-center justify-center px-4 md:px-10 py-6 overflow-hidden relative selection:bg-pink-100 selection:text-[#5d1232]">
      
      {/* CUSTOM POP-UP NOTIFICATION (TOAST) */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-[0_15px_40px_rgba(93,18,50,0.08)] border backdrop-blur-md font-medium text-sm tracking-wide ${
              notification.type === "success"
                ? "bg-white/90 border-emerald-100 text-emerald-800"
                : "bg-white/90 border-rose-100 text-rose-800"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
            ) : (
              <AlertCircle size={18} className="text-rose-500 shrink-0" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtler Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-20"></div>

      {/* Warm Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          x: [0, 20, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 blur-[100px] rounded-full -z-10"
      ></motion.div>

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, -30, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-100/30 blur-[130px] rounded-full -z-10"
      ></motion.div>

      {/* MINIMALIST LIGHT CONTAINER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-md bg-white backdrop-blur-xl shadow-[0_20px_80px_rgba(93,18,50,0.05),0_0_20px_rgba(93,18,50,0.02)] rounded-[32px] border border-white p-7 md:p-9 z-10 group"
      >
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-pink-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6 text-center">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1, filter: "drop-shadow(0 0 10px rgba(236,72,153,0.3))" }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="w-12 h-12 bg-gradient-to-tr from-[#5D1232] via-[#7a1a44] to-pink-500 rounded-2xl flex items-center justify-center text-white font-serif text-2xl font-bold shadow-[0_10px_30px_rgba(93,18,50,0.3)] mb-3 cursor-pointer relative"
          >
            L
            <span className="absolute -top-1.5 -right-1.5 text-pink-300 animate-pulse"><Sparkles size={12} /></span>
          </motion.div>

          <h1 className="font-serif text-3xl font-black tracking-tighter text-[#5d1232]">
            Welcome Back
          </h1>
          <p className="text-[10px] font-black text-pink-600 uppercase tracking-[0.3em] mt-2 bg-pink-100/50 px-3 py-0.5 rounded-full">
            Sign in to your LOTUS account
          </p>
        </div>

        {/* INPUTS */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="space-y-1.5"
          >
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
              Email Address
            </label>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${isFocused === "email" ? "text-pink-600" : "text-[#5d1232]/40"}`}>
                <Mail size={16} strokeWidth={2.2} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setIsFocused("email")}
                onBlur={() => setIsFocused("")}
                required
                placeholder="you@email.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
              />
            </div>
          </motion.div>

          {/* Password field */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-1.5"
          >
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-[10px] font-black uppercase tracking-[0.15em] text-pink-600 hover:text-pink-800 transition-colors"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 ${isFocused === "password" ? "text-pink-600" : "text-[#5d1232]/40"}`}>
                <Lock size={16} strokeWidth={2.2} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onFocus={() => setIsFocused("password")}
                onBlur={() => setIsFocused("")}
                required
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
              />
            </div>
          </motion.div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.01, y: -1, shadow: "0 15px 35px rgba(93,18,50,0.3)" }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full group relative flex items-center justify-center gap-2.5 bg-[#5D1232] hover:bg-[#72173e] text-white font-bold text-xs uppercase tracking-[0.25em] py-4 rounded-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(93,18,50,0.2)] overflow-hidden mt-2"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer-fast pointer-events-none" />
            <span>Sign In Now</span>
            <ArrowRight size={16} className="text-pink-300 group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>
        </form>

        {/* FOOTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 pt-5 border-t border-pink-100/50 text-center"
        >
          <p className="text-xs text-[#5d1232]/80 font-medium">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="relative text-pink-600 font-black uppercase tracking-wider inline-block group ml-1"
            >
              Sign Up
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default LoginComponent;