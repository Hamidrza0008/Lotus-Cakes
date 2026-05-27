"use client";
import React, { useEffect, useState } from "react";
import { Star, Plus, Check } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slice";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const CakesMenu = () => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false); // Fix for Hydration

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    setMounted(true);
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setProductData(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };
    loadProducts();
  }, []);

  const Skeleton = () => (
    <div className="bg-[#FFF0F3] rounded-[24px] sm:rounded-[32px] p-2 sm:p-3 border border-pink-200/50 shadow-inner overflow-hidden relative">
      <div className="h-36 sm:h-48 md:h-52 bg-pink-100/50 rounded-xl sm:rounded-2xl animate-pulse" />
      <div className="p-3 sm:p-4 space-y-3">
        <div className="h-4 bg-pink-200/40 rounded-md w-3/4 mx-auto animate-pulse" />
        <div className="h-3 bg-pink-200/20 rounded-md w-1/2 mx-auto animate-pulse" />
      </div>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  );

  return (
    <section className="py-12 md:py-24 bg-[#FFF5F7]">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12 md:mb-20 text-center"
        >
          <div className="bg-pink-100 text-pink-500 px-4 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-3 sm:mb-4">
            Our Menu
          </div>
          {/* मोबाइल के लिए हेडिंग का साइज text-2xl कर दिया है */}
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#5D1232] italic font-medium leading-tight">
            Signature <span className="text-pink-500 font-sans not-italic font-black">Lotus</span> Delights
          </h2>
          <div className="flex gap-2 mt-3 sm:mt-4">
            <div className="w-8 h-[2px] bg-pink-200 rounded-full"></div>
            <div className="w-2 h-[2px] bg-pink-400 rounded-full"></div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">
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
            ) : (
              productData.map((item, index) => {
                const isInCart = mounted && cartItems.some((p) => p.id === item.id);

                return (
                  <motion.div
                    key={item.id}
                    layout 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative"
                  >
                    <div className="relative z-10 bg-gradient-to-br from-[#FFF0F3] to-[#FFE4E9] rounded-[24px] sm:rounded-[35px] p-2 sm:p-3 border border-pink-100 hover:border-pink-300 transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(255,145,175,0.25)] h-full flex flex-col justify-between">
                      
                      <div>
                        <div className="relative h-36 sm:h-48 md:h-52 overflow-hidden rounded-[18px] sm:rounded-[28px] shadow-sm bg-pink-50">
                          <Link href={`/product/${item.id}`}>
                            <img
                              src={item.image}
                              alt={item.name}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          </Link>
                          
                          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/80 backdrop-blur-md px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg sm:rounded-xl flex items-center gap-1">
                            <Star size={10} className="fill-pink-500 text-pink-500" />
                            <span className="text-[9px] sm:text-[10px] font-black text-pink-700">{item.rating}</span>
                          </div>

                          <button 
                            onClick={() => {
                              if(isInCart) {
                                dispatch(removeFromCart(item.id));
                                toast.error("Removed from Tray");
                              } else {
                                dispatch(addToCart(item));
                                toast.success("Added to Lotus Tray");
                              }
                            }}
                            className={`absolute bottom-3 left-3 right-3 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all duration-500 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg hidden md:block ${
                              isInCart ? 'bg-[#5D1232] text-white' : 'bg-white text-pink-600'
                            }`}
                          >
                            {isInCart ? 'Remove from Tray' : 'Quick Add'}
                          </button>
                        </div>

                        <div className="px-1 sm:px-2 pt-3 sm:pt-5 pb-2 text-center">
                          <h3 className="text-xs sm:text-[15px] font-bold text-[#5D1232] mb-0.5 sm:mb-1 truncate">{item.name}</h3>
                          <p className="text-[8px] sm:text-[10px] text-pink-400 uppercase font-black tracking-widest mb-3 sm:mb-4">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      
                      <div className="px-1 sm:px-2 pb-1">
                        <div className="flex items-center justify-between bg-white/40 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 pl-2.5 sm:pl-4 border border-white/50 mt-auto">
                          <span className="text-xs sm:text-sm font-black text-[#5D1232]">₹{item.price}</span>
                          <button
                            onClick={() => {
                              if(!isInCart) {
                                dispatch(addToCart(item));
                                toast.success("Added");
                              } else {
                                dispatch(removeFromCart(item.id));
                                toast.error("Removed");
                              }
                            }}
                            className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-500 ${
                              isInCart 
                                ? 'bg-pink-500 text-white shadow-inner' 
                                : 'bg-white text-pink-500 hover:bg-[#5D1232] hover:text-white shadow-sm'
                            }`}
                          >
                            {isInCart ? (
                              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                            ) : (
                              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default CakesMenu;