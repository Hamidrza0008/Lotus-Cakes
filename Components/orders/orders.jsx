"use client";

import { Package, Clock, CheckCircle, ChevronRight, Calendar, MapPin, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const OrderHistory = () => {
    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/orders");
                if (!res.ok) throw new Error("Failed to fetch orders");
                const data = await res.json();
                const orders = Array.isArray(data[0]) ? data[0] : data;

                const formattedOrders = orders.map((order) => ({
                    ...order,
                    order_items: typeof order.order_items === "string"
                        ? JSON.parse(order.order_items)
                        : order.order_items,
                }));
                setOrderHistory(formattedOrders);
            } catch (err) {
                setError("Failed to fetch your orders.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-pink-50">
            <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-pink-50 text-gray-800 pt-28 pb-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-pink-600 tracking-tight">
                        My <span className="text-gray-900">Orders</span>
                    </h1>
                    <p className="text-pink-400 font-medium mt-1">Your delicious history with Lotus Cakes</p>
                </header>

                {orderHistory.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="bg-white rounded-[30px] p-16 text-center shadow-sm border border-pink-100"
                    >
                        <Package className="mx-auto text-pink-100 mb-4" size={80} />
                        <h2 className="text-2xl font-bold text-gray-800">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't ordered any treats lately.</p>
                        <a href="/menupage" className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold hover:bg-pink-700 transition-all inline-block shadow-lg shadow-pink-200">
                            Explore Menu
                        </a>
                    </motion.div>
                ) : (
                    <div className="grid gap-8">
                        {orderHistory.map((order, idx) => (
                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[32px] overflow-hidden shadow-md border border-pink-50 hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="p-6 md:p-8">
                                    {/* Order Top Bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-pink-50">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-pink-100 p-3 rounded-2xl">
                                                <Package className="text-pink-600" size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-pink-400 uppercase tracking-wider">Order Reference</p>
                                                <h3 className="text-xl font-black text-gray-900">#{order.id}</h3>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-400" />
                                                <span className="text-sm font-semibold">{new Date(order.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="bg-green-50 px-4 py-2 rounded-xl border border-green-100 flex items-center gap-2">
                                                <CheckCircle size={16} className="text-green-500" />
                                                <span className="text-sm font-bold text-green-600 uppercase">{order.order_status || "Confirmed"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Details Content */}
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="md:col-span-2 space-y-4">
                                            {order.order_items?.map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 bg-pink-50/30 p-4 rounded-2xl border border-pink-50/50">
                                                    <img
                                                        src={item.image || "/placeholder-cake.jpg"}
                                                        className="w-20 h-20 rounded-xl object-cover shadow-sm"
                                                        alt={item.name}
                                                    />
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-gray-800 text-lg">{item.name}</h4>
                                                        <p className="text-sm text-pink-400 font-medium">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                                                        <p className="text-[10px] text-gray-400 font-bold uppercase">₹{item.price} each</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                <div className="flex items-start gap-2 text-sm">
                                                    <MapPin size={16} className="text-pink-400 mt-1 shrink-0" />
                                                    <p className="text-gray-500 line-clamp-2">{order.customer_address}</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-sm">
                                                    <CreditCard size={16} className="text-pink-400 mt-1 shrink-0" />
                                                    <p className="text-gray-500">{order.payment_method}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Summary Sidebar */}
                                        <div className="bg-gray-50 p-6 rounded-[24px] flex flex-col justify-between border border-gray-100">
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Subtotal</span>
                                                    <span className="font-bold text-gray-700">₹{order.total_price}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-500">Delivery</span>
                                                    <span className="font-bold text-green-500">FREE</span>
                                                </div>
                                                <div className="pt-3 border-t border-gray-200 flex justify-between items-end">
                                                    <span className="text-xs font-black uppercase text-pink-600">Paid Total</span>
                                                    <span className="text-3xl font-black text-gray-900">₹{order.total_price}</span>
                                                </div>
                                            </div>

                                            <button className="w-full mt-6 bg-pink-600 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-all group">
                                                View Receipt
                                                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;