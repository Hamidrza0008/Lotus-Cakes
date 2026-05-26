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
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data);
        setLoading(false);
        console.log(data)
      })
      .catch((err) => {
        console.error("Dashboard Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const orders = ordersArray || [];
  console.log(orders)



  const totalNumberOfOrders = orders.length;
  const completedOrders = orders.filter((o) => o.order_status === "Success");
  const pendingOrders = orders.filter((o) => o.order_status === "Pending");

  const totalRevenue = completedOrders.reduce((acc, order) => {
    return acc + (order.total_price || 0);
  }, 0);
  // Premium Metric Architecture
  const stats = [
    {
      title: "Total Sales",
      value: `₹${totalRevenue.toLocaleString('en-IN')}`,
      icon: <DollarSign size={18} className="stroke-[2.5]" />,
      trend: "+12.4%",
      color: "bg-emerald-50 text-emerald-700 border border-emerald-100"
    },
    {
      title: "Total Orders",
      value: `${totalNumberOfOrders}`,
      icon: <TrendingUp size={18} />,
      trend: "Live Updates",
      color: "bg-pink-50 text-[#5D1232] border border-pink-100"
    },
    {
      title: "Delivered Orders",
      value: `${completedOrders.length}`,
      icon: <CheckCircle2 size={18} />,
      trend: "Success",
      color: "bg-teal-50 text-teal-700 border border-teal-100"
    },
    {
      title: "Pending Orders",
      value: `${pendingOrders.length}`,
      icon: <ShoppingBasket size={18} />,
      trend: "Awaiting",
      color: "bg-amber-50 text-amber-700 border border-amber-100"
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBFD] p-6 pt-28">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-20 bg-pink-50/50 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-pink-50/30 rounded-3xl animate-pulse border border-pink-50" />
            ))}
          </div>
          <div className="h-96 bg-pink-50/20 rounded-[32px] animate-pulse border border-pink-50" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-8 mt-10 text-[#33081B]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-pink-100/60 shadow-sm">
          <div>
            <span className="text-pink-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">
              Lotus Analytics Engine
            </span>
            <h1 className="text-3xl font-black text-[#5D1232] tracking-tight">
              Dashboard Overview
            </h1>
          </div>
          
          <div className="flex items-center gap-2 text-xs font-black text-[#5D1232] bg-pink-50/60 border border-pink-100/60 px-4 py-2.5 rounded-2xl">
            <Calendar size={14} className="text-pink-500" />
            <span>Real-time Sync</span>
          </div>
        </div> */}

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white p-5 rounded-3xl border border-pink-100/70 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
            >
              <div className="flex justify-between items-center mb-4">
                <div className={`p-2.5 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  {stat.icon}
                </div>
                <span className="text-[9px] font-black bg-[#FFFBFD] border border-pink-50 text-pink-500 px-2 py-1 rounded-lg uppercase tracking-wider">
                  {stat.trend}
                </span>
              </div>
              <div>
                <p className="text-pink-400/90 text-[10px] font-black uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-black text-[#5D1232] tracking-tight mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Logs Section */}
        <div className="grid grid-cols-1 gap-8">

          {/* Recent Orders Blueprint */}
          <div className="bg-white rounded-[32px] p-6 md:p-8 border border-pink-100/70 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-pink-50">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#5D1232] rounded-full" />
                <h2 className="text-lg font-black text-[#5D1232] tracking-tight">Recent Activity Feed</h2>
              </div>
              <button className="text-pink-600 hover:text-[#5D1232] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors group">
                View All System Orders
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center text-pink-400 font-medium text-sm flex flex-col items-center justify-center gap-2">
                <Layers className="text-pink-200" size={32} />
                No active orders found in cache.
              </div>
            ) : (
              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1 custom-scrollbar">
                {orders.map((order, index) => (
                  <div
                    key={order.id || index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-pink-50 hover:border-pink-100 rounded-2xl hover:bg-[#FFFBFD] transition-all duration-200 gap-4"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar Wrapper */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-pink-100 shrink-0 bg-pink-50/50 flex items-center justify-center">
                        <img
                          src={order.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=120&h=120&fit=crop"}
                          alt="Cake"
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          loading="lazy"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-[#5D1232] text-sm tracking-tight">
                            Order #{order.id || "N/A"}
                          </p>
                          <span className="text-[9px] font-bold text-pink-400 bg-pink-50 px-1.5 py-0.5 rounded-md border border-pink-100/40">
                            {order.order_items?.length || 0} {order.order_items?.length === 1 ? 'item' : 'items'}
                          </span>
                        </div>

                        <p className="text-xs text-pink-500 font-bold mt-0.5 tracking-wide">
                          {order.customer_name}
                        </p>
                        {order.customer_phone && (
                          <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                            {order.customer_phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex sm:flex-col justify-between sm:justify-center items-center sm:items-end border-t sm:border-t-0 pt-2 sm:pt-0 border-pink-50/60">
                      <p className="font-black text-[#5D1232] text-base tracking-tight">
                        ₹{order.total_price}
                      </p>

                      <span
                        className={`text-[9px] flex items-center gap-1 font-black uppercase tracking-wider px-2 py-1 rounded-lg mt-1 border ${order.order_status === "Success"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-amber-50 text-amber-600 border-amber-100"
                          }`}
                      >
                        {order.order_status === "Success" ? (
                          <>
                            <CheckCircle2 size={10} className="stroke-[2.5]" />
                            Delivered
                          </>
                        ) : (
                          <>
                            <Clock size={10} className="stroke-[2.5]" />
                            {order.order_status || "Pending"}
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;