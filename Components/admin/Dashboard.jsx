"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ShoppingBasket,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboard = () => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All"); // "All" | "Pending" | "Success"

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const orders = ordersArray || [];

  const totalNumberOfOrders = orders.length;
  const completedOrders = orders.filter((o) => o.order_status === "Success");
  const pendingOrders = orders.filter((o) => o.order_status === "Pending");

  const totalRevenue = completedOrders.reduce((acc, order) => {
    return acc + (order.total_price || 0);
  }, 0);

  // Filter dynamic logic for orders stream
  const filteredOrders = orders.filter((order) => {
    if (activeFilter === "All") return true;
    return order.order_status === activeFilter;
  });

  const stats = [
    {
      title: "Total Sales",
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: <DollarSign size={16} className="stroke-[2.5]" />,
      trend: "+12.4%",
      color: "bg-emerald-50 text-emerald-700 border border-emerald-100"
    },
    {
      title: "Total Orders",
      value: `${totalNumberOfOrders}`,
      icon: <TrendingUp size={16} />,
      trend: "Live",
      color: "bg-pink-50 text-[#5D1232] border border-pink-100"
    },
    {
      title: "Delivered",
      value: `${completedOrders.length}`,
      icon: <CheckCircle2 size={16} />,
      trend: "Success",
      color: "bg-teal-50 text-teal-700 border border-teal-100"
    },
    {
      title: "Pending Orders",
      value: `${pendingOrders.length}`,
      icon: <ShoppingBasket size={16} />,
      trend: "Awaiting",
      color: "bg-amber-50 text-amber-700 border border-amber-100"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-6 pt-20 md:pt-28">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="h-16 md:h-20 bg-pink-50/50 rounded-2xl md:rounded-3xl animate-pulse" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 md:h-32 bg-pink-50/30 rounded-2xl md:rounded-3xl animate-pulse border border-pink-50" />
            ))}
          </div>
          <div className="h-96 bg-pink-50/20 rounded-[24px] md:rounded-[32px] animate-pulse border border-pink-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFD] p-3 sm:p-6 md:p-8 pt-16 md:pt-20 text-[#33081B] overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* Top Stats Cards - Exactly original grid logic layout untouched */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className="bg-white p-3 sm:p-5 rounded-2xl md:rounded-3xl border border-pink-100/70 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-2 sm:mb-4">
                <div className={`p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-[8px] sm:text-[9px] font-black bg-[#FFFBFD] border border-pink-50 text-pink-500 px-1.5 py-0.5 sm:py-1 rounded-md uppercase tracking-wider">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-pink-400/90 text-[8px] sm:text-[10px] font-black uppercase tracking-widest truncate">{stat.title}</p>
                <h3 className="text-lg sm:text-2xl font-black text-[#5D1232] tracking-tight mt-0.5 sm:mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Logs Section */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-4 sm:p-6 md:p-8 border border-pink-100/70 shadow-sm flex flex-col">
            
            {/* Header Content with Filter Controls */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-5 pb-4 border-b border-pink-50/60">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#5D1232] rounded-full" />
                <h2 className="text-base sm:text-lg font-black text-[#5D1232] tracking-tight">Recent Activity Feed</h2>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-1 bg-[#FFFBFD] border border-pink-100/40 p-1 rounded-xl self-start sm:self-auto">
                {[
                  { label: "All", value: "All" },
                  { label: "Pending", value: "Pending" },
                  { label: "Delivered", value: "Success" }
                ].map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setActiveFilter(tab.value)}
                    className={`relative px-3 py-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider rounded-lg transition-colors duration-200 ${
                      activeFilter === tab.value 
                        ? "text-white" 
                        : "text-pink-400/80 hover:text-[#5D1232]"
                    }`}
                  >
                    {activeFilter === tab.value && (
                      <motion.div 
                        layoutId="activeTabIndicator"
                        className="absolute inset-0 bg-[#5D1232] rounded-lg -z-0"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="py-12 text-center text-pink-400 font-medium text-xs sm:text-sm flex flex-col items-center justify-center gap-2">
                <Layers className="text-pink-200" size={24} />
                No active matching orders found.
              </div>
            ) : (
              /* No max-height scroll limits - full layout stream flow */
              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {filteredOrders.map((order, index) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      key={order.id || index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white border border-pink-50 hover:border-pink-100 rounded-xl sm:rounded-2xl hover:bg-[#FFFBFD] transition-all duration-200 gap-3 sm:gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        {/* Avatar Image Wrapper */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden border border-pink-100 shrink-0 bg-pink-50/50 flex items-center justify-center">
                          <img
                            src={order.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop"}
                            alt="Cake"
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="font-black text-[#5D1232] text-xs sm:text-sm tracking-tight truncate">
                              Order #{order.id || "N/A"}
                            </p>
                            <span className="text-[8px] sm:text-[9px] font-bold text-pink-400 bg-pink-50 px-1.5 py-0.5 rounded-md border border-pink-100/40 whitespace-nowrap">
                              {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'items'}
                            </span>
                          </div>

                          <p className="text-[11px] sm:text-xs text-pink-500 font-bold mt-0.5 tracking-wide truncate">
                            {order.customer_name}
                          </p>
                          {order.customer_phone && (
                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-mono mt-0.5">
                              {order.customer_phone}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Data Block with optimized alignments */}
                      <div className="flex sm:flex-col justify-between sm:justify-center items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-pink-50/60 w-full sm:w-auto shrink-0">
                        <p className="font-black text-[#5D1232] text-sm sm:text-base tracking-tight order-1 sm:order-none">
                          ₹{order.total_price}
                        </p>

                        <span
                          className={`text-[8px] sm:text-[9px] flex items-center gap-1 font-black uppercase tracking-wider px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg mt-0.5 border order-2 sm:order-none ${
                            order.order_status === "Success"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                        >
                          {order.order_status === "Success" ? (
                            <>
                              <CheckCircle2 size={9} className="stroke-[2.5]" />
                              Delivered
                            </>
                          ) : (
                            <>
                              <Clock size={9} className="stroke-[2.5]" />
                              {order.order_status || "Pending"}
                            </>
                          )}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;