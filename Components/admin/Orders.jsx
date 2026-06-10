"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Filter,
  Calendar,
  IndianRupee,
  Package,
  ArrowUpRight,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { motion } from "framer-motion";

const Orders = () => {
  const [ordersArray, setOrdersArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("Pending");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrdersArray(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch("/api/admin/update-status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrdersArray((prev) => {
          let updated = [...prev];
          updated = updated.map((order) =>
            order.id === orderId
              ? { ...order, order_status: newStatus }
              : order
          );
          return updated;
        });
      }
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const allOrders = [...ordersArray].reverse();
  const orders = selectedFilter === "all" ? allOrders : allOrders.filter((order) => order.order_status === selectedFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-6 pt-20 md:pt-28">
        <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
          <div className="h-16 bg-pink-50/50 rounded-2xl md:rounded-3xl animate-pulse" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-72 md:h-80 rounded-2xl md:rounded-3xl bg-pink-50/30 animate-pulse border border-pink-50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFD] p-3 sm:p-6 md:p-8 pt-16 md:pt-24 text-[#33081B] overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

        {/* Header Section - No Side Scroll, Wrap Perfectly */}
        <div className="bg-white p-4 rounded-2xl md:rounded-3xl border border-pink-100/60 shadow-sm">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-start sm:justify-center">
            {["Pending", "Packed", "Out for Delivery", "Success", "Cancel"].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedFilter(status)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all border flex-1 sm:flex-none text-center"
                style={{
                  backgroundColor: selectedFilter === status ? "#5D1232" : "white",
                  color: selectedFilter === status ? "white" : "#5D1232",
                  borderColor: selectedFilter === status ? "#5D1232" : "#FCE7F3"
                }}
              >
                {status === "Success" ? "Delivered" : status}
              </button>
            ))}
          </div>
        </div>

        {/* Main Orders Grid */}
        <div>
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5D1232]" />
            <h2 className="text-xs sm:text-sm font-black text-[#5D1232] uppercase tracking-wider">Live Feed ({orders.length})</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {orders.length === 0 ? (
              <div className="col-span-full py-16 text-center text-pink-400 font-medium text-sm flex flex-col items-center justify-center gap-2 bg-white rounded-3xl border border-pink-100/40">
                <AlertCircle className="text-pink-200" size={32} />
                No orders found under "{selectedFilter === "Success" ? "Delivered" : selectedFilter}".
              </div>
            ) : (
              orders.map((order, id) => (
                <motion.div
                  key={order.id || id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(id * 0.05, 0.3) }}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl md:rounded-3xl border border-pink-100/80 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pb-4 border-b border-pink-50">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0 w-full sm:w-auto">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-50 rounded-xl sm:rounded-2xl flex items-center justify-center border border-pink-100/50 shrink-0">
                          <ShoppingBag size={18} className="text-[#5D1232]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm sm:text-base font-black text-[#5D1232] leading-tight truncate">
                            {order.customer_name || "Guest Customer"}
                          </h3>
                          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-xs text-pink-500/90 font-medium">
                            <Clock size={11} />
                            <span className="truncate">
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                                : "Just now"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown status */}
                      <select
                        value={order.order_status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className="w-full sm:w-auto px-2.5 py-1.5 rounded-xl border border-pink-100 bg-white text-xs font-black text-[#5D1232] outline-none cursor-pointer shadow-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Packed">Packed</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Success">Delivered</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    </div>

                    {/* Order Meta Info */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#FFFBFD] border border-pink-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl">
                        <span className="text-[9px] sm:text-[10px] text-pink-400 uppercase font-black tracking-wider block mb-0.5">
                          Amount Paid
                        </span>
                        <div className="flex items-center text-base sm:text-lg font-black text-[#5D1232]">
                          <IndianRupee size={12} className="mr-0.5 stroke-[2.5]" />
                          {order.total_price}
                        </div>
                      </div>

                      <div className="bg-[#FFFBFD] border border-pink-50 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl">
                        <span className="text-[9px] sm:text-[10px] text-pink-400 uppercase font-black tracking-wider block mb-0.5">
                          Total Items
                        </span>
                        <p className="text-base sm:text-lg font-black text-[#5D1232]">
                          {(typeof order.order_items === "string"
                            ? JSON.parse(order.order_items)
                            : order.order_items
                          )?.length || 0}
                        </p>
                      </div>
                    </div>

                    {/* Ordered Items List */}
                    <div className="space-y-2">
                      <p className="text-[9px] sm:text-[10px] font-black text-pink-400 uppercase tracking-[0.15em] flex items-center gap-1.5 mb-1">
                        <Package size={11} />
                        Items Summary
                      </p>

                      <div className="space-y-2 max-h-[160px] overflow-y-auto pr-0.5 custom-scrollbar">
                        {(typeof order.order_items === "string"
                          ? JSON.parse(order.order_items)
                          : order.order_items
                        )?.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-white p-2 rounded-xl border border-pink-50 hover:border-pink-100 transition-colors gap-2"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={item.image || "/api/placeholder/64/64"}
                                alt={item.name}
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover border border-pink-100/60 shrink-0"
                              />
                              <div className="min-w-0">
                                <h4 className="font-bold text-[#5D1232] text-xs truncate line-clamp-1">
                                  {item.name}
                                </h4>
                                <p className="text-[10px] sm:text-[11px] text-pink-500 font-medium mt-0.5">
                                  Qty: <span className="font-bold text-[#5D1232]">{item.quantity}</span>
                                </p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-xs font-black text-[#5D1232]">
                                ₹{item.price * item.quantity}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-[8px] sm:text-[9px] text-pink-400">
                                  (₹{item.price} each)
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Orders;