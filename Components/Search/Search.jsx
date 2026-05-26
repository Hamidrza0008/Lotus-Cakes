"use client";
import React, { useEffect, useState } from "react";
import { Star, Plus, Check, Search as SearchIcon, Sparkles } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slice";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Search = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const filteredProducts = productData.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setMounted(true);
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    };
    loadProducts();
  }, []);

  const Skeleton = () => (
    <div className="bg-[#FFF0F3] rounded-[32px] p-3 border border-pink-200/50 shadow-inner overflow-hidden relative animate-pulse">
      <div className="h-48 bg-pink-100/50 rounded-2xl" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-pink-200/40 rounded-md w-3/4 mx-auto" />
        <div className="h-3 bg-pink-200/20 rounded-md w-1/2 mx-auto" />
      </div>
    </div>
  );

  return (
    <section className="py-28 bg-[#FFF5F7] min-h-screen relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-300/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#5D1232]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
              <Sparkles size={12} className="animate-pulse" /> Find Your Craving
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-[#5D1232] italic font-medium">
              Explore Our <span className="text-pink-500 font-sans not-italic font-black">Lotus</span> Heaven
            </h2>
            <p className="text-pink-600/60 font-medium text-xs tracking-widest uppercase">
              Type to filter fresh bakes and signature delights instantly
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="w-full max-w-xl relative group mt-8"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400/30 to-[#5D1232]/20 blur-xl rounded-3xl opacity-40 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <div className="relative flex items-center">
              <SearchIcon 
                className="absolute left-6 text-pink-400 group-focus-within:text-[#5D1232] transition-colors duration-300 pointer-events-none" 
                size={20} 
                strokeWidth={2.5} 
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search cakes, pastries, cupcakes..."
                className="w-full bg-white/70 backdrop-blur-xl border border-pink-200/80 focus:border-[#5D1232] pl-16 pr-6 py-5 rounded-[24px] text-sm font-semibold text-[#5D1232] placeholder-pink-400/60 outline-none transition-all duration-300 shadow-[0_10px_35px_-5px_rgba(255,182,193,0.15)] focus:bg-white focus:shadow-[0_20px_40px_rgba(93,18,50,0.08)]"
              />
              
              {searchTerm && (
                <span className="absolute right-6 text-[10px] font-black bg-pink-100 text-pink-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                  {filteredProducts.length} Found
                </span>
              )}
            </div>
          </motion.div>

          <div className="flex gap-2 mt-6">
            <div className="w-10 h-[2px] bg-pink-200 rounded-full" />
            <div className="w-2 h-[2px] bg-pink-400 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          <AnimatePresence mode="popLayout">
            {loading ? (
              Array(8).fill(0).map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Skeleton />
                </motion.div>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((item, index) => {
                const isInCart = mounted && cartItems.some((p) => p.id === item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.02 }}
                    className="group relative"
                  >
                    <div className="relative z-10 bg-gradient-to-br from-[#FFF0F3] to-[#FFE4E9] rounded-[35px] p-3 border border-pink-100/70 hover:border-pink-300 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(255,145,175,0.25)] h-full flex flex-col justify-between">

                      <div>
                        <div className="relative h-48 md:h-52 overflow-hidden rounded-[28px] shadow-sm bg-pink-50">
                          <Link href={`/product/${item.id}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </Link>

                          <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                            <Star size={10} className="fill-pink-500 text-pink-500" />
                            <span className="text-[10px] font-black text-pink-700">{item.rating}</span>
                          </div>

                          <button
                            onClick={() => {
                              if (isInCart) {
                                dispatch(removeFromCart(item.id));
                                toast.error("Removed from Tray");
                              } else {
                                dispatch(addToCart(item));
                                toast.success("Added to Lotus Tray");
                              }
                            }}
                            className={`absolute bottom-3 left-3 right-3 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg ${
                              isInCart ? 'bg-[#5D1232] text-white' : 'bg-white text-pink-600 hover:bg-pink-50'
                            }`}
                          >
                            {isInCart ? 'Remove from Tray' : 'Quick Add'}
                          </button>
                        </div>

                        <div className="px-2 pt-5 pb-1 text-center">
                          <h3 className="text-[15px] font-bold text-[#5D1232] mb-1 truncate">{item.name}</h3>
                          <p className="text-[10px] text-pink-400 uppercase font-black tracking-widest mb-4">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="px-2 pb-2">
                        <div className="flex items-center justify-between bg-white/50 backdrop-blur-sm rounded-2xl p-2 pl-4 border border-white/60 shadow-sm">
                          <span className="text-sm font-black text-[#5D1232]">₹{item.price}</span>
                          <button
                            onClick={() => {
                              if (!isInCart) {
                                dispatch(addToCart(item));
                                toast.success("Added to Lotus Tray");
                              } else {
                                dispatch(removeFromCart(item.id));
                                toast.error("Removed from Tray");
                              }
                            }}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 ${
                              isInCart
                                ? 'bg-pink-500 text-white shadow-inner'
                                : 'bg-white text-pink-500 hover:bg-[#5D1232] hover:text-white shadow-sm'
                            }`}
                          >
                            {isInCart ? <Check size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="col-span-full py-20 flex flex-col items-center text-center space-y-4"
              >
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-500 text-2xl shadow-inner">
                  🧁
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-bold text-[#5D1232]">No match found for "{searchTerm}"</p>
                  <p className="text-sm text-pink-400/80 max-w-xs mx-auto">
                    Try searching for something else like "Chocolate", "Red Velvet" or browse by categories.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Search;