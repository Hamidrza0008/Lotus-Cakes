"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Star,
    Plus,
    Layers,
    Sparkles,
    Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Inventory = () => {
    const router = useRouter();
    const [productsData, setProductsData] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        fetch("/api/products/")
            .then((res) => res.json())
            .then((data) => {
                setProductsData(data);
                setCurrentProducts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Inventory Fetch Error:", err);
                setLoading(false);
            });
    }, []);

    const categories = {
        all: productsData,
        cake: productsData.filter((p) => p.category === "cake"),
        icecream: productsData.filter((p) => p.category === "icecream"),
        pastry: productsData.filter((p) => p.category === "pastry"),
        bakery: productsData.filter((p) => p.category === "bakery"),
        beverage: productsData.filter((p) => p.category === "beverage"),
    };

    const filterProducts = (cat) => {
        setActiveFilter(cat);
        setCurrentProducts(categories[cat] || []);
    };

    const shimmerVariants = {
        animate: {
            backgroundPosition: ["200% 0", "-200% 0"],
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
            },
        },
    };

    const handleDelete = async (id) => {
        try {
            const res = await fetch("/api/products", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setProductsData(prev => prev.filter(item => item.id !== id));
                setCurrentProducts(prev => prev.filter(item => item.id !== id));
            }
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-6 pt-20 md:pt-28">
                <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-16 rounded-2xl border border-pink-100/50"
                        style={{ background: "linear-gradient(90deg, #fff 25%, #FFF0F6 50%, #fff 75%)", backgroundSize: "200% 100%" }}
                    />
                    <div className="h-14 bg-white rounded-2xl border border-pink-100/40 animate-pulse" />
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-72 md:h-80 rounded-3xl bg-pink-50/30 animate-pulse border border-pink-50" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFFBFD] p-3 sm:p-6 md:p-8 pt-16 md:pt-24 text-[#33081B] overflow-x-hidden">
            <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">

                {/* Top Action Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-pink-100/60 shadow-sm">
                    <div>
                        <span className="text-pink-500 text-[9px] sm:text-[10px] font-black tracking-[0.3em] uppercase block mb-0.5">
                            Lotus Repository
                        </span>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-[#5D1232] tracking-tight">
                            Products Inventory
                        </h1>
                    </div>
                    <button 
                        onClick={() => router.push("/admin/addproduct")} 
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-[#5D1232] hover:bg-[#420B22] text-white rounded-xl sm:rounded-2xl font-bold shadow-md shadow-maroon-900/10 transition-all active:scale-95 text-sm"
                    >
                        <Plus size={16} />
                        <span>Add New Product</span>
                    </button>
                </div>

                {/* Categories Navigation Filter with Integrated Red Count Badges */}
                <div className="bg-white p-3 rounded-2xl border border-pink-100/60 shadow-sm">
                    <div className="flex flex-wrap gap-2 justify-start sm:justify-center">
                        {Object.keys(categories).map((cat) => {
                            const count = categories[cat].length;
                            const isActive = activeFilter === cat;
                            
                            return (
                                <button
                                    key={cat}
                                    onClick={() => filterProducts(cat)}
                                    className={`px-4 py-2.5 rounded-xl font-bold capitalize transition-all text-xs tracking-wide relative z-10 flex items-center justify-center gap-2 flex-1 sm:flex-none text-center min-w-[85px] sm:min-w-0 ${
                                        isActive ? "text-[#5D1232] font-black" : "text-pink-500/80 hover:text-[#5D1232]"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeFilterBg"
                                            className="absolute inset-0 bg-pink-50 rounded-xl -z-10 border border-pink-100/50"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    
                                    <span className="flex items-center gap-1">
                                        {cat === "all" && <Layers size={12} />}
                                        {cat}
                                    </span>

                                    {/* Red/Maroon Count Badge */}
                                    <span className={`inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black rounded-md transition-all ${
                                        isActive 
                                            ? "bg-[#5D1232] text-white" 
                                            : "bg-red-50 text-red-600 border border-red-100"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Live Inventory Feed */}
                <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#5D1232]" />
                        <h2 className="text-xs font-black text-[#5D1232] uppercase tracking-wider">
                            Stock Feed ({currentProducts.length})
                        </h2>
                    </div>

                    {/* Responsive Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                        <AnimatePresence mode="popLayout">
                            {currentProducts.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 35, delay: Math.min(index * 0.01, 0.2) }}
                                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                    className="group bg-white rounded-2xl sm:rounded-[28px] p-3 sm:p-4 border border-pink-100/70 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Image Area with Badge */}
                                        <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4 bg-pink-50/30 border border-pink-50">
                                            <img
                                                src={item.image || "/api/placeholder/260/260"}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />

                                            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl flex items-center gap-0.5 sm:gap-1 shadow-sm border border-pink-50">
                                                <Star size={10} className="fill-pink-500 text-pink-500" />
                                                <span className="text-[10px] sm:text-[11px] font-black text-[#5D1232]">
                                                    {item.rating || "4.5"}
                                                </span>
                                            </div>

                                            {item.price > 500 && (
                                                <div className="absolute bottom-2 left-2 bg-[#5D1232] text-white px-1.5 py-0.5 rounded-md flex items-center gap-1 text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                                                    <Sparkles size={9} className="text-pink-300" />
                                                    Signature
                                                </div>
                                            )}
                                        </div>

                                        {/* Metadata Content */}
                                        <div className="space-y-0.5 sm:space-y-1 px-0.5">
                                            <span className="text-[8px] sm:text-[9px] uppercase font-black tracking-widest text-pink-400 block">
                                                {item.category}
                                            </span>
                                            <h3 className="font-black text-[#5D1232] text-xs sm:text-sm md:text-base leading-tight tracking-tight line-clamp-2 h-8 sm:h-10">
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Pricing and Interactions */}
                                    <div className="mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-pink-50/60 flex items-center justify-between px-0.5">
                                        <div className="flex flex-col">
                                            <span className="text-[8px] sm:text-[9px] font-bold text-pink-400 uppercase tracking-wider leading-none mb-0.5">Price</span>
                                            <span className="text-sm sm:text-base md:text-lg font-black text-[#5D1232] tracking-tight">
                                                ₹{item.price}
                                            </span>
                                        </div>

                                        <button 
                                            onClick={() => handleDelete(item.id)} 
                                            className="p-2 bg-pink-50 hover:bg-[#5D1232] text-[#5D1232] hover:text-white rounded-lg sm:rounded-xl transition-all duration-300 active:scale-90 border border-pink-100/40 hover:border-transparent shadow-sm"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Inventory;