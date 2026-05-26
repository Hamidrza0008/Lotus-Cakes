"use client";

import React, { useEffect, useState } from "react";
import {
    User,
    Phone,
    MapPin,
    ShoppingBag
} from "lucide-react";
import { motion } from "framer-motion";

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetch("/api/admin/orders")
            .then((res) => res.json())
            .then((data) => {
                const orders = data || [];
                console.log(data)

                const grouped = {};

                orders.forEach((order) => {
                    if (!grouped[order.user_id]) {
                        grouped[order.user_id] = {
                            name: order.customer_name || "No Name",
                            phone: order.customer_phone || "No Number",
                            address: order.customer_address || "No Address",
                            totalOrders: 0,
                            totalSpent: 0
                        };
                    }

                    grouped[order.user_id].totalOrders += 1;
                    grouped[order.user_id].totalSpent += Number(order.total_price || 0);
                });

                setCustomers(Object.values(grouped));
            });
    }, []);

    console.log(customers)

    return (
        <div className="min-h-screen bg-[#FFFBFD] p-6 pt-28">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-[#5D1232]">
                        Customers
                    </h1>
                    <p className="text-pink-500 text-xs font-bold tracking-[0.25em] uppercase">
                        Customer Management
                    </p>
                </div>

                {/* Compact Premium Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {customers.map((customer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            whileHover={{ y: -4 }}
                            className="bg-white rounded-2xl border border-pink-100 p-4 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all"
                        >
                            {/* Top */}
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-pink-50 flex items-center justify-center">
                                    <User size={18} className="text-[#5D1232]" />
                                </div>

                                <div className="min-w-0">
                                    <h2 className="text-sm font-black text-[#5D1232] truncate">
                                        {customer.name}
                                    </h2>
                                    <p className="text-[11px] text-pink-500 truncate">
                                        #{index + 1}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 text-xs">
                                <div className="flex items-center gap-2 text-[#5D1232]">
                                    <Phone size={13} />
                                    <span>{customer.phone}</span>
                                </div>

                                <div className="flex items-start gap-2 text-[#5D1232]">
                                    <MapPin size={13} className="mt-0.5 shrink-0" />
                                    <span className="line-clamp-2">
                                        {customer.address}
                                    </span>
                                </div>
                            </div>

                            {/* Bottom Stats */}
                            <div className="mt-4 pt-4 border-t border-pink-50 flex justify-between">
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-pink-400">
                                        Orders
                                    </p>
                                    <p className="text-lg font-black text-[#5D1232] flex items-center gap-1">
                                        <ShoppingBag size={14} />
                                        {customer.totalOrders}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-[10px] uppercase font-bold text-pink-400">
                                        Spent
                                    </p>
                                    <p className="text-lg font-black text-[#5D1232]">
                                        ₹{customer.totalSpent}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Customers;