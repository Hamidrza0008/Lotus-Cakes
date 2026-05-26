"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Star,
    Cake,
    IceCream,
    Coffee,
    Croissant,
    Package,
    Plus,
    Edit3,
    Layers,
    Sparkles,
    Link,
    Delete,
    DeleteIcon
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

    const stats = [
        { name: "Total Items", count: categories.all.length, icon: Package },
        { name: "Cakes & Pies", count: categories.cake.length, icon: Cake },
        { name: "Ice Creams", count: categories.icecream.length, icon: IceCream },
        { name: "Breads & Bakes", count: categories.bakery.length, icon: Croissant },
        { name: "Beverages", count: categories.beverage.length, icon: Coffee },
    ];

    // प्रीमियम शिमर लोडिंग इफेक्ट के लिए मोशन वेरिएंट्स
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

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FFFBFD] p-6 pt-28">
                <div className="max-w-7xl mx-auto space-y-8">
                    {/* Header Skeleton */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-20 rounded-3xl border border-pink-100/50"
                        style={{ background: "linear-gradient(90deg, #fff 25%, #FFF0F6 50%, #fff 75%)", backgroundSize: "200% 100%" }}
                    />
                    {/* Stats Skeleton */}
                    <motion.div
                        variants={shimmerVariants}
                        animate="animate"
                        className="h-24 rounded-3xl border border-pink-100/50"
                        style={{ background: "linear-gradient(90deg, #fff 25%, #FFF0F6 50%, #fff 75%)", backgroundSize: "200% 100%" }}
                    />
                    {/* Cards Skeleton Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <motion.div
                                key={i}
                                variants={shimmerVariants}
                                animate="animate"
                                className="h-80 rounded-[28px] border border-pink-50"
                                style={{ background: "linear-gradient(90deg, #fff 25%, #FFF0F6 50%, #fff 75%)", backgroundSize: "200% 100%" }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    const handleDelete = async (id) => {
        const res = await fetch("/api/products", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id })
        })

        const data = await res.json();
        console.log(data);
        setProductsData(prev => prev.filter(item => item.id !== id));
        setCurrentProducts(prev => prev.filter(item => item.id !== id));
    }


    return (
        <div className="min-h-screen bg-[#FFFBFD] p-4 md:p-8 pt-28 mt-10 text-[#33081B]">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header Section
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-pink-100/60 shadow-sm">
                    <div>
                        <span className="text-pink-500 text-[10px] font-black tracking-[0.3em] uppercase block mb-1">
                            Lotus Repository
                        </span>
                        <h1 className="text-3xl font-black text-[#5D1232] tracking-tight">
                            Products Inventory
                        </h1>
                    </div>


                </div> */}

                {/* Stats Row Widget */}
                <div className="bg-white border border-pink-100/70 rounded-3xl p-2 shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 divide-x-0 divide-y-0 lg:divide-x divide-pink-100/60">
                    {stats.map((item, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-4 py-4 px-5 justify-start sm:justify-center lg:justify-start"
                        >
                            <div className="p-3 bg-pink-50/60 rounded-2xl text-[#5D1232] border border-pink-100/40 shrink-0">
                                <item.icon size={20} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-2xl font-black text-[#5D1232] leading-none tracking-tight mb-1">
                                    {item.count}
                                </p>
                                <p className="text-[10px] uppercase font-black text-pink-400 tracking-wider truncate">
                                    {item.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Categories Navigation Filter */}
                <div className="flex justify-start md:justify-center overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 md:mx-0 md:px-0">
                    <div className="bg-pink-100/40 p-1.5 rounded-2xl flex gap-1.5 shrink-0 border border-pink-100/30 backdrop-blur-sm relative">
                        {Object.keys(categories).map((cat) => {

                            return (
                                <>
                                    <button
                                        key={cat}
                                        onClick={() => filterProducts(cat)}
                                        className={`px-5 py-2 rounded-xl font-bold capitalize transition-all text-xs tracking-wide relative z-10 ${activeFilter === cat ? "text-[#5D1232] font-black" : "text-pink-500/80 hover:text-[#5D1232]"
                                            }`}
                                    >
                                        {/* Framer Motion Sliding Background Effect */}
                                        {activeFilter === cat && (
                                            <motion.div
                                                layoutId="activeFilterBg"
                                                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {cat === "all" ? (
                                            <span className="flex items-center gap-1.5">
                                                <Layers size={13} />
                                                All Products
                                            </span>
                                        ) : (
                                            cat
                                        )}
                                    </button>

                                </>

                            )



                        })}

                        <div>

                            <button onClick={() => router.push("/admin/addproduct")} className=" ml-20 w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-[#5D1232] hover:bg-[#420B22] text-white rounded-2xl font-bold shadow-md shadow-maroon-900/10 transition-all active:scale-95">
                                <Plus size={18} />
                                <span>Add New Product</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Inventory Feed */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#5D1232]" />
                        <h2 className="text-xs font-black text-[#5D1232] uppercase tracking-wider">
                            Stock Feed ({currentProducts.length})
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {currentProducts.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 35, delay: index * 0.01 }}
                                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    className="group bg-white rounded-[28px] p-4 border border-pink-100/70 shadow-sm hover:shadow-xl hover:border-pink-200/80 transition-all duration-300 flex flex-col justify-between"
                                >
                                    <div>
                                        {/* Image Area with Badge */}
                                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-4 bg-pink-50/30 border border-pink-50">
                                            <img
                                                src={item.image || "/api/placeholder/260/260"}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                loading="lazy"
                                            />

                                            <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm border border-pink-50">
                                                <Star size={11} className="fill-pink-500 text-pink-500" />
                                                <span className="text-[11px] font-black text-[#5D1232]">
                                                    {item.rating || "4.5"}
                                                </span>
                                            </div>

                                            {item.price > 500 && (
                                                <div className="absolute bottom-2.5 left-2.5 bg-[#5D1232] text-white px-2 py-0.5 rounded-lg flex items-center gap-1 text-[9px] font-black uppercase tracking-wider">
                                                    <Sparkles size={10} className="text-pink-300" />
                                                    Signature
                                                </div>
                                            )}
                                        </div>

                                        {/* Metadata Content */}
                                        <div className="space-y-1 px-1">
                                            <span className="text-[9px] uppercase font-black tracking-widest text-pink-400 block">
                                                {item.category}
                                            </span>
                                            <h3 className="font-black text-[#5D1232] text-base leading-tight tracking-tight line-clamp-2 h-10">
                                                {item.name}
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Pricing and Interactions */}
                                    <div className="mt-4 pt-3 border-t border-pink-50/60 flex items-center justify-between px-1">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-pink-400 uppercase tracking-wider leading-none mb-0.5">Price</span>
                                            <span className="text-lg font-black text-[#5D1232] tracking-tight">
                                                ₹{item.price}
                                            </span>
                                        </div>

                                        <button onClick={() => handleDelete(item.id)} className="p-2.5 bg-pink-50 group-hover:bg-[#5D1232] text-[#5D1232] group-hover:text-white rounded-xl transition-all duration-300 active:scale-90 border border-pink-100/40 group-hover:border-transparent shadow-sm">
                                            <DeleteIcon size={15} className="transition-transform group-hover:rotate-6" />
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