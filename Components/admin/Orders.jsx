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
        console.log(ordersArray)
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
          console.log(updated)

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
  console.log(ordersArray)

  const orders = selectedFilter === "all" ? allOrders : allOrders.filter((order) => (order.order_status === selectedFilter));

  const totalRevenue = orders.reduce(
    (acc, order) => acc + (order.total_price || 0),
    0
  );

  const completedOrders = orders.filter(
    (o) => o.order_status === "Success"
  );

  const pendingOrders = orders.filter(
    (o) => o.order_status === "Pending"
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBFD] p-6 pt-28">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="h-20 bg-pink-50/50 rounded-3xl animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-28 bg-pink-50/50 rounded-2xl animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-3xl bg-pink-50/30 animate-pulse border border-pink-50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-8 mt-10 pt-28 text-[#33081B]">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-pink-100/60 shadow-sm">
          

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="flex flex-wrap gap-2 sm:gap-3 flex-1 sm:flex-none">
              <div className="flex flex-wrap gap-3">
                {["Pending", "Packed", "Out for Delivery", "Success", "Cancel"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedFilter(status)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${selectedFilter === status
                      ? "bg-[#5D1232] text-white"
                      : "bg-white border border-pink-100 text-[#5D1232]"
                      }`}
                  >
                    {status === "Success" ? "Delivered" : status}
                  </button>
                ))}
              </div>
            </div>
            {/* <button className="flex-1 sm:flex-none px-4 py-2.5 bg-[#5D1232] hover:bg-[#420B22] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-maroon-900/10 active:scale-95">
              <Calendar size={15} />
              Export Data
            </button> */}

          </div>
        </div>



        {/* Main Orders Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#5D1232]" />
            <h2 className="text-lg font-black text-[#5D1232] uppercase tracking-wider text-sm">Live Feed ({orders.length})</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {orders.map((order, id) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: id * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl border border-pink-100/80 p-6 shadow-sm hover:shadow-xl hover:border-pink-200/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start gap-4 mb-5 pb-5 border-b border-pink-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center border border-pink-100/50 shrink-0">
                        <ShoppingBag size={20} className="text-[#5D1232]" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-[#5D1232] leading-tight">
                          {order.customer_name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-pink-500/90 mt-1 font-medium">
                          <Clock size={12} />
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                            : "Just now"}
                        </div>
                      </div>
                    </div>

                    <select

                      value={order.order_status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="px-3 py-2 rounded-xl border border-pink-100 bg-white text-xs font-black text-[#5D1232] outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Packed">Packed</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Success">Delivered</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>

                  {/* Order Meta Info */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-[#FFFBFD] border border-pink-50 p-3.5 rounded-2xl">
                      <span className="text-[10px] text-pink-400 uppercase font-black tracking-wider block mb-0.5">
                        Amount Paid
                      </span>
                      <div className="flex items-center text-lg font-black text-[#5D1232]">
                        <IndianRupee size={14} className="mr-0.5 stroke-[2.5]" />
                        {order.total_price}
                      </div>
                    </div>

                    <div className="bg-[#FFFBFD] border border-pink-50 p-3.5 rounded-2xl">
                      <span className="text-[10px] text-pink-400 uppercase font-black tracking-wider block mb-0.5">
                        Total Items
                      </span>
                      <p className="text-lg font-black text-[#5D1232]">
                        {(typeof order.order_items === "string"
                          ? JSON.parse(order.order_items)
                          : order.order_items
                        )?.length || 0}                      </p>
                    </div>
                  </div>

                  {/* Ordered Items List */}
                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-pink-400 uppercase tracking-[0.15em] flex items-center gap-1.5 mb-2">
                      <Package size={12} />
                      Items Summary
                    </p>

                    {/* Dynamic wrapper without fixed height restriction */}
                    <div className="space-y-2.5 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                      {(typeof order.order_items === "string"
                        ? JSON.parse(order.order_items)
                        : order.order_items
                      )?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-pink-50 hover:border-pink-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/api/placeholder/64/64"}
                              alt={item.name}
                              className="w-12 h-12 rounded-xl object-cover border border-pink-100/60 shrink-0"
                            />
                            <div>
                              <h4 className="font-bold text-[#5D1232] text-xs line-clamp-1">
                                {item.name}
                              </h4>
                              <p className="text-[11px] text-pink-500 font-medium mt-0.5">
                                Qty: <span className="font-bold text-[#5D1232]">{item.quantity}</span>
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-black text-[#5D1232]">
                              ₹{item.price * item.quantity}
                            </p>
                            {item.quantity > 1 && (
                              <p className="text-[9px] text-pink-400">
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
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Orders;