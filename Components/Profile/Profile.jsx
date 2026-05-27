"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Camera,
  LogOut,
  Sparkles,
  ChevronRight,
  Clock,
  Cake,
  PackageOpen
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProfileComponent = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (Array.isArray(data)) {
        setRecentOrders(data);
        console.log(data);
      } else if (data && Array.isArray(data.orders)) {
        setRecentOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch("/api/me");
      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    getProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();

      if (data.success) {
        setUser(null);
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recent Order";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#fff5f7] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
        <span className="font-serif text-lg font-bold text-[#5D1232] tracking-wide animate-pulse">
          Loading your sweet profile...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#fff5f7] pt-24 md:pt-28 pb-10 md:pb-16 px-3 sm:px-4 md:px-10 flex items-center justify-center overflow-x-hidden">
  <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-pink-200/40 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10" />
  <div className="absolute bottom-0 left-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-purple-200/30 blur-[100px] md:blur-[120px] rounded-full pointer-events-none -z-10" />

  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="w-full max-w-6xl bg-white/70 backdrop-blur-xl border border-white/40 rounded-[24px] md:rounded-[32px] p-4 sm:p-5 md:p-10 shadow-[0_20px_50px_rgba(93,18,50,0.05)] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 relative overflow-hidden"
  >
    <div className="md:col-span-4 flex flex-col items-center md:border-r border-pink-100/60 md:pr-8">
      <div className="relative group">
        <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-[#5D1232] to-pink-500 p-[3px] shadow-[0_15px_30px_-5px_rgba(93,18,50,0.2)] transition-transform duration-500 group-hover:scale-105">
          <div className="w-full h-full bg-white rounded-[21px] overflow-hidden flex items-center justify-center relative">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-pink-50 flex items-center justify-center text-[#5D1232]">
                <User size={38} strokeWidth={1.5} />
              </div>
            )}

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
              <Camera className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 -right-1 bg-pink-500 text-white p-2 rounded-2xl shadow-md border-2 border-white">
          <Sparkles size={13} />
        </div>
      </div>

      <h1 className="text-xl sm:text-2xl font-serif font-black text-[#5D1232] mt-5 tracking-tight text-center break-words">
        {user?.name || "Guest User"}
      </h1>

      <span className="mt-2 px-3 py-1 bg-pink-100 text-[#5D1232] text-[10px] uppercase font-black tracking-widest rounded-full">
        {user?.role || "Customer"}
      </span>

      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-pink-100 to-transparent my-5 md:my-6" />

      <div className="w-full space-y-3 md:space-y-4">
        <div className="flex items-start gap-3 p-3 bg-pink-50/40 rounded-2xl border border-pink-100/30 transition-all hover:bg-pink-50">
          <div className="p-2.5 bg-white rounded-xl text-pink-500 shadow-sm shrink-0">
            <Mail size={17} />
          </div>

          <div className="flex flex-col text-left overflow-hidden min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
              Email Address
            </span>

            <span className="text-xs sm:text-sm font-semibold text-[#5D1232] break-all">
              {user?.email || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-pink-50/40 rounded-2xl border border-pink-100/30 transition-all hover:bg-pink-50">
          <div className="p-2.5 bg-white rounded-xl text-pink-500 shadow-sm shrink-0">
            <Phone size={17} />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
              Phone Number
            </span>

            <span className="text-xs sm:text-sm font-semibold text-[#5D1232] break-words">
              {user?.phone || "N/A"}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3 bg-pink-50/40 rounded-2xl border border-pink-100/30 transition-all hover:bg-pink-50">
          <div className="p-2.5 bg-white rounded-xl text-pink-500 shadow-sm shrink-0">
            <MapPin size={17} />
          </div>

          <div className="flex flex-col text-left min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-wider text-pink-400">
              Delivery Address
            </span>

            <span className="text-xs sm:text-sm font-semibold text-[#5D1232] break-words">
              {user?.address || "No address added yet"}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 md:mt-8 w-full group bg-[#5D1232] hover:bg-[#4a0e28] text-white py-3 px-5 rounded-2xl flex items-center justify-center gap-2 font-bold text-[11px] sm:text-xs uppercase tracking-widest transition-all duration-300 hover:shadow-[0_12px_25px_-5px_rgba(93,18,50,0.4)]"
      >
        <LogOut
          size={15}
          className="transition-transform group-hover:-translate-x-0.5"
        />
        Logout Account
      </button>
    </div>

    <div className="md:col-span-8 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-3 mb-5 md:mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-[#5D1232]" size={20} />

            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#5D1232]">
              Recent Orders
            </h2>
          </div>

          <Link
            href="/orderspage"
            className="text-[11px] sm:text-xs font-bold text-pink-600 hover:text-[#5D1232] flex items-center gap-1 transition-colors"
          >
            View All Orders <ChevronRight size={14} />
          </Link>
        </div>

        <div className="space-y-4">
          {recentOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-pink-50/20 border border-dashed border-pink-200/60 rounded-3xl">
              <div className="p-4 bg-white rounded-2xl text-pink-400 shadow-sm mb-4">
                <PackageOpen size={30} strokeWidth={1.5} />
              </div>

              <h3 className="text-sm font-bold text-[#5D1232]">
                No orders found
              </h3>

              <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                Looks like you haven't ordered any sweet treats yet.
              </p>
            </div>
          ) : (
            recentOrders.slice(0, 3).map((order, idx) => {
              const displayStatus = order.order_status;
              const displayPrice = order.total_price;
              const displayItem =JSON.parse(order.order_items)[0]?.name + " & more...";

              return (
                <motion.div
                  key={order.id || idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-4 sm:p-5 bg-white rounded-2xl border border-pink-100/50 hover:border-pink-200 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col gap-4 group"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-3 bg-pink-50 text-[#5D1232] rounded-xl group-hover:scale-105 transition-transform shrink-0">
                      <Cake size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[9px] sm:text-[10px] font-black text-pink-500 bg-pink-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          #ORD-{order.id || idx + 8140}
                        </span>

                        <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                          <Clock size={11} />{" "}
                          {formatDate(order.createdAt || order.date)}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#5D1232] mt-1 text-sm sm:text-base line-clamp-2 break-words">
                        {displayItem}
                      </h3>

                      <p className="text-[10px] sm:text-[11px] text-gray-400 line-clamp-1 font-medium">
                        To: {order.customer_name || "Valued Customer"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-dashed border-gray-100">
                    <span className="text-sm sm:text-base font-black text-[#5D1232]">
                      ₹{displayPrice.toString().replace("₹", "")}
                    </span>

                    <span
                      className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                        displayStatus === "Delivered" ||
                        displayStatus === "delivered"
                          ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                          : displayStatus === "Cancelled" ||
                            displayStatus === "cancelled"
                          ? "bg-rose-50 border-rose-100 text-rose-600"
                          : "bg-amber-50 border-amber-100 text-amber-600 animate-pulse"
                      }`}
                    >
                      {displayStatus}
                    </span>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-6 md:mt-8 p-5 sm:p-6 bg-gradient-to-br from-[#5D1232] to-[#801e47] rounded-3xl text-white relative overflow-hidden shadow-[0_15px_30px_-5px_rgba(93,18,50,0.2)]">
        <div className="absolute right-0 bottom-0 translate-x-6 translate-y-6 opacity-10">
          <Cake size={130} />
        </div>

        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-pink-300">
          Lotus Elite Club
        </span>

        <h3 className="text-base sm:text-lg font-serif font-bold mt-1">
          Baked with love, crafted just for you
        </h3>

        <p className="text-[11px] sm:text-xs text-pink-100/80 mt-1 max-w-md leading-relaxed">
          Every order rewards your sweet tooth. Keep collecting points for
          premium custom treats.
        </p>
      </div>
    </div>
  </motion.div>
</div>
  );
};

export default ProfileComponent;