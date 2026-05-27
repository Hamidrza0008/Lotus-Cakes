"use client";

import {
    Package,
    CheckCircle,
    ChevronRight,
    Calendar,
    MapPin,
    CreditCard,
    Circle,
    Truck
} from "lucide-react";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const orderSteps = [
    "Confirmed",
    "Packed",
    "Out for Delivery",
    "Delivered"
];

const getCurrentStep = (status) => {
    switch (status?.toLowerCase()) {
        case "confirmed":
            return 0;

        case "packed":
            return 1;

        case "out for delivery":
            return 2;

        case "delivered":
        case "success":
            return 3;

        default:
            return 0;
    }
};

const OrderHistory = () => {

    const [orderHistory, setOrderHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await fetch("/api/orders");

                if (!res.ok) {
                    throw new Error("Failed to fetch orders");
                }

                const data = await res.json();

                const orders = Array.isArray(data[0]) ? data[0] : data;

                const formattedOrders = orders.map((order) => ({
                    ...order,

                    order_items:
                        typeof order.order_items === "string"
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-pink-50">
                <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-pink-50 text-gray-800 pt-20 md:pt-28 pb-12 px-3 sm:px-6 md:px-8">

            <div className="max-w-5xl mx-auto">

                <header className="mb-6 md:mb-10 text-center sm:text-left">

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-600 tracking-tight">
                        My <span className="text-gray-900">Orders</span>
                    </h1>

                    <p className="text-pink-400 font-medium mt-1 text-xs sm:text-sm md:text-base">
                        Your delicious history with Lotus Cakes
                    </p>

                </header>

                {orderHistory.length === 0 ? (

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-[24px] md:rounded-[30px] p-6 sm:p-8 md:p-16 text-center shadow-sm border border-pink-100"
                    >

                        <Package className="mx-auto text-pink-100 mb-4 w-14 h-14 md:w-20 md:h-20" />

                        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                            No orders yet
                        </h2>

                        <p className="text-gray-500 mb-6 md:mb-8 text-xs md:text-base">
                            Looks like you haven't ordered any treats lately.
                        </p>

                        <a
                            href="/menupage"
                            className="bg-pink-600 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-bold hover:bg-pink-700 transition-all inline-block shadow-lg shadow-pink-200 text-xs md:text-base"
                        >
                            Explore Menu
                        </a>

                    </motion.div>

                ) : (

                    <div className="grid gap-4 md:gap-8">

                        {orderHistory.map((order, idx) => (

                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[20px] sm:rounded-[24px] md:rounded-[32px] overflow-hidden shadow-md border border-pink-50 hover:shadow-xl transition-shadow duration-300"
                            >

                                <div className="p-4 sm:p-6 md:p-8">

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 md:mb-6 pb-4 md:pb-6 border-b border-pink-50">

                                        <div className="flex items-center gap-3 md:gap-4">

                                            <div className="bg-pink-100 p-2 md:p-3 rounded-xl md:rounded-2xl shrink-0">
                                                <Package className="text-pink-600 w-5 h-5 md:w-6 md:h-6" />
                                            </div>

                                            <div>

                                                <p className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                                                    Order Reference
                                                </p>

                                                <h3 className="text-base md:text-xl font-black text-gray-900">
                                                    #{order.id}
                                                </h3>

                                            </div>

                                        </div>

                                        <div className="flex items-center gap-2 justify-start sm:justify-end flex-wrap w-full sm:w-auto">

                                            <div className="bg-gray-50 px-2.5 sm:px-4 py-1.5 rounded-xl border border-gray-100 flex items-center gap-1.5">

                                                <Calendar size={12} className="text-gray-400 sm:w-[14px]" />

                                                <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-600">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </span>

                                            </div>

                                            <div className="bg-green-50 px-2.5 sm:px-4 py-1.5 rounded-xl border border-green-100 flex items-center gap-1.5">

                                                <CheckCircle size={12} className="text-green-500 sm:w-[14px]" />

                                                <span className="text-[11px] sm:text-xs md:text-sm font-bold text-green-600 uppercase">
                                                    {order.order_status || "Confirmed"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-8">

                                        <div className="lg:col-span-2 space-y-5 md:space-y-6">

                                            {/* ORDER TRACKING SECTION */}
                                            <div className="bg-pink-50/10 p-3 sm:p-4 rounded-2xl border border-pink-100/40">

                                                <div className="flex items-center gap-2 mb-3">

                                                    <Truck className="text-pink-500 w-4 h-4 md:w-[16px] md:h-[16px]" />

                                                    <h3 className="font-black text-gray-800 text-[11px] md:text-sm uppercase tracking-wide">
                                                        Order Tracking
                                                    </h3>

                                                </div>

                                                {/* Ultra-compact horizontal tracking flow */}
                                                <div className="flex items-center justify-between w-full px-1">

                                                    {orderSteps.map((step, stepIndex) => {

                                                        const currentStep = getCurrentStep(order.order_status);

                                                        const completed = stepIndex <= currentStep;

                                                        return (

                                                            <div
                                                                key={step}
                                                                className={`flex items-center ${stepIndex !== orderSteps.length - 1 && stepIndex !== 0
                                                                        ? "flex-1"
                                                                        : stepIndex === 0
                                                                            ? "flex-none"
                                                                            : ""
                                                                    }`}
                                                            >

                                                                {/* Indicator and Label Wrapper */}
                                                                <div className="flex flex-col items-center shrink-0">

                                                                    <div
                                                                        className={`w-5 h-5 md:w-8 md:h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${completed
                                                                                ? "bg-pink-600 border-pink-600 text-white"
                                                                                : "bg-white border-pink-200 text-pink-300"
                                                                            }`}
                                                                    >

                                                                        {completed ? (
                                                                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                                                        ) : (
                                                                            <Circle className="w-2.5 h-2.5 md:w-[12px] md:h-[12px]" />
                                                                        )}

                                                                    </div>

                                                                    <p
                                                                        className={`mt-1 text-[9px] md:text-xs font-bold text-center tracking-tight ${completed
                                                                                ? "text-pink-600"
                                                                                : "text-gray-400"
                                                                            }`}
                                                                    >
                                                                        {step}
                                                                    </p>

                                                                </div>

                                                                {/* Connecting Line - Skipped after 'Confirmed' (index 0) */}
                                                                {stepIndex !== orderSteps.length - 1 && stepIndex !== 0 && (

                                                                    <div className="flex-1 h-[2px] md:h-[3px] mx-1 md:mx-2 rounded-full overflow-hidden bg-pink-100 mb-3 md:mb-4">

                                                                        <div
                                                                            className={`h-full rounded-full transition-all duration-500 ${stepIndex < currentStep
                                                                                    ? "bg-pink-600 w-full"
                                                                                    : "bg-pink-300 w-1/2"
                                                                                }`}
                                                                        />

                                                                    </div>

                                                                )}

                                                                {/* Empty spacer spacer to balance the missing line after Confirmed */}
                                                                {stepIndex === 0 && (
                                                                    <div className="w-3 sm:w-6 md:w-8" />
                                                                )}

                                                            </div>

                                                        );
                                                    })}

                                                </div>

                                            </div>

                                            {/* ORDER ITEMS */}
                                            <div className="space-y-3">

                                                {order.order_items?.map((item, i) => (

                                                    <div
                                                        key={i}
                                                        className="flex items-center gap-3 bg-pink-50/30 p-3 rounded-xl md:rounded-2xl border border-pink-50/50"
                                                    >

                                                        <img
                                                            src={item.image || "/placeholder-cake.jpg"}
                                                            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl object-cover shadow-sm shrink-0"
                                                            alt={item.name}
                                                        />

                                                        <div className="flex-1 min-w-0">

                                                            <h4 className="font-bold text-gray-800 text-xs sm:text-sm md:text-lg line-clamp-1">
                                                                {item.name}
                                                            </h4>

                                                            <p className="text-[11px] sm:text-xs text-pink-400 font-medium mt-0.5">
                                                                Quantity: {item.quantity}
                                                            </p>

                                                        </div>

                                                        <div className="text-right shrink-0">

                                                            <p className="font-black text-gray-900 text-xs sm:text-sm md:text-base">
                                                                ₹{item.price * item.quantity}
                                                            </p>

                                                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                                                                ₹{item.price} each
                                                            </p>

                                                        </div>

                                                    </div>

                                                ))}

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">

                                                    <div className="flex items-start gap-2 text-xs md:text-sm">

                                                        <MapPin
                                                            size={14}
                                                            className="text-pink-400 mt-0.5 shrink-0 sm:w-4"
                                                        />

                                                        <p className="text-gray-500 line-clamp-2 leading-relaxed">
                                                            {order.customer_address}
                                                        </p>

                                                    </div>

                                                    <div className="flex items-start gap-2 text-xs md:text-sm">

                                                        <CreditCard
                                                            size={14}
                                                            className="text-pink-400 mt-0.5 shrink-0 sm:w-4"
                                                        />

                                                        <p className="text-gray-500 font-medium">
                                                            {order.payment_method}
                                                        </p>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* PRICING & INVOICE SUMMARY CARD */}
                                        <div className="bg-gray-50 p-4 sm:p-5 md:p-6 rounded-[20px] md:rounded-[24px] flex flex-col justify-between border border-gray-100 h-fit">

                                            <div className="space-y-2.5 md:space-y-3">

                                                <div className="flex justify-between text-xs md:text-sm">

                                                    <span className="text-gray-500">
                                                        Subtotal
                                                    </span>

                                                    <span className="font-bold text-gray-700">
                                                        ₹{order.total_price}
                                                    </span>

                                                </div>

                                                <div className="flex justify-between text-xs md:text-sm">

                                                    <span className="text-gray-500">
                                                        Delivery
                                                    </span>

                                                    <span className="font-bold text-green-500">
                                                        FREE
                                                    </span>

                                                </div>

                                                <div className="pt-2.5 md:pt-3 border-t border-gray-200 flex justify-between items-end">

                                                    <span className="text-[10px] font-black uppercase text-pink-600 tracking-wider">
                                                        Paid Total
                                                    </span>

                                                    <span className="text-xl sm:text-2xl md:text-3xl font-black text-gray-900 leading-none">
                                                        ₹{order.total_price}
                                                    </span>

                                                </div>

                                            </div>

                                            <button className="w-full mt-4 md:mt-6 bg-pink-600 text-white py-2.5 sm:py-3.5 rounded-xl font-bold uppercase tracking-wider text-[11px] sm:text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-gray-900 transition-all group shadow-md shadow-pink-100 hover:shadow-none">

                                                View Receipt

                                                <ChevronRight
                                                    size={14}
                                                    className="group-hover:translate-x-1 transition-transform sm:w-4"
                                                />

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