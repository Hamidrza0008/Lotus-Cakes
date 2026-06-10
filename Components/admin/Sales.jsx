"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ShoppingBag, DollarSign, Activity } from "lucide-react";
import { motion } from "framer-motion";

const Sales = () => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sales data:", err);
        setLoading(false);
      });
  }, []);

  const analyticsData = useMemo(() => {
    const dailyMap = {};

    ordersArray.forEach((order) => {
      const rawDate = order.createdAt || order.created_at;
      if (!rawDate) return;

      const date = new Date(rawDate);
      if (isNaN(date.getTime())) return;

      const day = date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      if (!dailyMap[day]) {
        dailyMap[day] = { day, revenue: 0, orders: 0 };
      }

      dailyMap[day].revenue += Number(order.total_price || 0);
      dailyMap[day].orders += 1;
    });

    const sortedDailyData = Object.values(dailyMap).slice(-7);
    
    const totalRevenue = ordersArray
      .filter((o) => o.order_status?.toLowerCase() === "success")
      .reduce((sum, order) => sum + Number(order.total_price || 0), 0);

    const totalOrders = ordersArray.length;
    const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

    const peakDay = sortedDailyData.length > 0
      ? sortedDailyData.reduce((max, day) => (day.orders > max.orders ? day : max))
      : null;

    return { sortedDailyData, totalRevenue, totalOrders, avgOrderValue, peakDay };
  }, [ordersArray]);

  const { sortedDailyData, totalRevenue, totalOrders, avgOrderValue, peakDay } = analyticsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#5D1232] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[#5D1232] text-xs font-black tracking-widest animate-pulse">LOADING ANALYTICS...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-tr from-[#FFF5F7] to-[#FDF2F4] min-h-screen mt-16 pt-6 sm:mt-20 sm:pt-24 flex justify-center overflow-x-hidden">
      <div className="max-w-6xl w-full space-y-5 sm:space-y-6">
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#5D1232] tracking-tight">Sales Overview</h1>
            <p className="text-pink-500 font-bold text-[10px] sm:text-[11px] uppercase tracking-wider mt-0.5">Metrics & Performance</p>
          </div>
          <div className="flex items-center gap-1.5 bg-white px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-pink-100/70 shadow-sm shrink-0">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[#5D1232] font-black text-[9px] sm:text-[10px] uppercase tracking-wider">Live</span>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-6 border border-pink-100/60 shadow-sm"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <div className="p-2 bg-pink-50 rounded-xl text-[#5D1232]">
                  <DollarSign className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-black text-[#5D1232]">Revenue Timeline</h2>
                  <p className="text-[10px] sm:text-[11px] text-pink-400 font-medium">Last 7 days data stream</p>
                </div>
              </div>
            </div>

            <div className="h-[240px] sm:h-[310px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sortedDailyData} margin={{ left: -25, right: 5, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5D1232" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#5D1232" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#FCE7F3" />
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    stroke="#5D1232"
                    style={{ fontSize: "10px", fontWeight: "800" }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    stroke="#5D1232"
                    style={{ fontSize: "10px", fontWeight: "800" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#5D1232", 
                      borderRadius: "12px", 
                      color: "#FFF",
                      border: "none",
                      fontSize: "11px",
                      boxShadow: "0 10px 20px -5px rgba(93, 18, 50, 0.2)"
                    }}
                    itemStyle={{ color: "#FCE7F3", fontWeight: "bold" }}
                    labelStyle={{ fontWeight: "900" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#5D1232"
                    strokeWidth={3}
                    fill="url(#colorRev)"
                    animationDuration={1000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6 lg:h-full">
            
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl sm:rounded-[24px] p-4 sm:p-6 border border-pink-100/60 shadow-sm flex flex-col justify-between h-[155px] sm:h-[175px]"
            >
              <div className="flex justify-between items-start sm:items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 sm:p-2 bg-pink-50 rounded-xl text-pink-600 shrink-0">
                    <ShoppingBag className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <h2 className="text-xs sm:text-sm font-black text-[#5D1232] uppercase tracking-wider">Daily Orders</h2>
                </div>
                {peakDay && (
                  <div className="text-[8px] sm:text-[10px] font-black bg-pink-100 text-[#5D1232] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full whitespace-nowrap">
                    Peak: {peakDay.day}
                  </div>
                )}
              </div>

              <div className="h-16 sm:h-20 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sortedDailyData}>
                    <XAxis dataKey="day" hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#EC4899", borderRadius: "8px", border: "none", color: "#fff", fontSize: "10px" }}
                      labelStyle={{ color: "#fff", fontWeight: "bold" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="orders" fill="#EC4899" radius={[4, 4, 0, 0]} maxBarSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="bg-gradient-to-br from-[#4A0E28] to-[#2D0616] rounded-2xl sm:rounded-[24px] p-4 sm:p-6 text-white shadow-xl flex flex-col justify-between h-[155px] sm:h-[175px] relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl group-hover:scale-120 transition-transform"></div>

              <div>
                <p className="text-pink-300 text-[9px] sm:text-[11px] font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Activity className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> Total Gross Revenue
                </p>
                <p className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent tracking-tight">
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-4 pt-2.5 sm:pt-3.5 border-t border-white/10 text-xs relative z-10">
                <div>
                  <span className="text-pink-300/80 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-0.5">Orders</span>
                  <span className="font-black text-white text-sm">{totalOrders}</span>
                </div>
                <div>
                  <span className="text-pink-300/80 block text-[9px] sm:text-[10px] uppercase font-bold tracking-wider mb-0.5">Avg Ticket</span>
                  <span className="font-black text-white text-sm truncate block">₹{avgOrderValue.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sales;