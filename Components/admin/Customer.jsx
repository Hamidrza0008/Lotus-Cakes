"use client";

import React, { useEffect, useState, useMemo } from "react";
import { User, Phone, MapPin, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Customers = () => {
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
        console.error("Error fetching customers data:", err);
        setLoading(false);
      });
  }, []);

  const customersData = useMemo(() => {
    const grouped = {};

    ordersArray.forEach((order) => {
      if (!order.user_id) return;

      if (!grouped[order.user_id]) {
        grouped[order.user_id] = {
          name: order.customer_name || "No Name",
          phone: order.customer_phone || "No Number",
          address: order.customer_address || "No Address",
          totalOrders: 0,
          totalSpent: 0,
        };
      }

      grouped[order.user_id].totalOrders += 1;
      grouped[order.user_id].totalSpent += Number(order.total_price || 0);
    });

    return Object.values(grouped);
  }, [ordersArray]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBFD] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-4 border-[#5D1232] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[#5D1232] text-xs font-black tracking-widest animate-pulse">
            LOADING CUSTOMERS...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFD] p-4 pt-20 sm:p-6 sm:pt-28 flex justify-center overflow-x-hidden">
      <div className="max-w-7xl w-full space-y-6 sm:space-y-8">
        
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1"
        >
          <h1 className="text-2xl sm:text-3xl font-black text-[#5D1232] tracking-tight">
            Customers
          </h1>
          <p className="text-pink-500 text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase">
            Customer Management
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {customersData.map((customer, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl border border-pink-100/70 p-4 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center shrink-0">
                    <User className="w-4.5 h-4.5 text-[#5D1232]" />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-sm font-black text-[#5D1232] truncate">
                      {customer.name}
                    </h2>
                    <p className="text-[10px] sm:text-[11px] text-pink-500 font-bold tracking-wider">
                      #{index + 1}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-[11px] sm:text-xs">
                  <div className="flex items-center gap-2 text-[#5D1232]/90">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[#5D1232]/70" />
                    <span className="truncate">{customer.phone}</span>
                  </div>

                  <div className="flex items-start gap-2 text-[#5D1232]/90">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[#5D1232]/70" />
                    <span className="line-clamp-2 leading-relaxed">
                      {customer.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-pink-50 flex justify-between items-center">
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase font-black text-pink-400 tracking-wider mb-0.5">
                    Orders
                  </p>
                  <div className="text-base sm:text-lg font-black text-[#5D1232] flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5D1232]/80" />
                    <span>{customer.totalOrders}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-[9px] sm:text-[10px] uppercase font-black text-pink-400 tracking-wider mb-0.5">
                    Spent
                  </p>
                  <p className="text-base sm:text-lg font-black text-[#5D1232] tracking-tight">
                    ₹{customer.totalSpent.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
};

export default Customers;