"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart, removeFromCart, decreaseQuantity } from "@/redux/slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getCurrentUser = async () => {
    try {
      let res = await fetch("/api/me");
      let data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (subtotal > 0 ? 50 : 0);

  const handleCheckout = () => {
    if (!user) {
      return router.push("/login");
    } else {
      router.push("/checkoutpage");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FCF9F9]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-[#831843] rounded-full animate-spin" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#831843]">Loading Basket...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen bg-[#FCF9F9] lg:overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 max-w-6xl pt-20 md:pt-24 pb-6 md:pb-10 flex flex-col h-full">

        {/* Header - Responsive Margin */}
        <div className="mb-4 md:mb-6 flex justify-between items-end border-b border-pink-100 pb-3 md:pb-4">
          <div>
            <button onClick={() => router.back()} className="text-[10px] font-black uppercase text-pink-500 flex items-center gap-1 mb-1 hover:gap-2 transition-all">
              <ArrowLeft size={12} /> Back
            </button>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#831843]">Your Cart</h1>
          </div>
          <span className="text-[9px] md:text-[10px] font-bold bg-[#831843] text-white px-2.5 py-1 rounded-full uppercase">
            {cartItems.length} Items
          </span>
        </div>

        {cartItems.length > 0 ? (
          // Adjusted layout to handle overflow cleanly on mobile stacks
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 overflow-y-auto lg:overflow-hidden flex-grow pb-6 lg:pb-0">

            {/* Items List - Scalable and Dense layout */}
            <div className="lg:col-span-8 lg:overflow-y-auto pr-0 lg:pr-2 space-y-3 custom-scrollbar h-fit lg:h-full order-1">
              <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white border border-pink-50 p-2.5 sm:p-3 rounded-2xl flex items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Responsive Compact Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 bg-pink-50">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.name} />
                    </div>

                    {/* Details Flow Wrapper */}
                    <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#831843] leading-tight mb-0.5">{item.name}</h3>
                        <p className="text-[10px] text-gray-400 font-medium">₹{item.price}</p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 mt-1 sm:mt-0">
                        {/* Compact Responsive Counter */}
                        <div className="flex items-center bg-pink-50/50 rounded-full p-0.5 sm:p-1 border border-pink-100">
                          <button onClick={() => dispatch(decreaseQuantity(item))} className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-[#831843] hover:bg-white rounded-full transition-colors"><Minus size={9} /></button>
                          <span className="px-2 sm:px-3 text-[11px] sm:text-xs font-bold text-[#831843]">{item.quantity}</span>
                          <button onClick={() => dispatch(addToCart(item))} className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-[#831843] text-white rounded-full transition-colors"><Plus size={9} /></button>
                        </div>

                        {/* Price & Remove Container */}
                        <div className="text-right min-w-[65px] sm:min-w-[70px]">
                          <p className="text-xs sm:text-sm font-bold text-[#831843]">₹{item.price * item.quantity}</p>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-[9px] font-black uppercase text-red-400 hover:text-red-600 transition-colors block ml-auto mt-0.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary - Custom mobile border-radius styling */}
            <div className="lg:col-span-4 order-2 lg:order-2 h-fit">
              <div className="bg-[#831843] text-white p-5 sm:p-6 rounded-[1.75rem] sm:rounded-[2rem] shadow-xl shadow-pink-900/20">
                <h2 className="text-lg md:text-xl font-serif font-bold mb-4 md:mb-6">Total Amount</h2>

                <div className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                  <div className="flex justify-between text-xs opacity-70">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs opacity-70">
                    <span>Shipping</span>
                    <span>₹50</span>
                  </div>
                  <div className="pt-3 md:pt-4 border-t border-white/10 flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest">To Pay</span>
                    <span className="text-2xl md:text-3xl font-bold">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-[#831843] py-3.5 sm:py-4 rounded-xl font-black uppercase tracking-widest text-[10px] sm:text-[11px] shadow-lg hover:bg-pink-50 transition-all active:scale-95"
                >
                  Checkout Now
                </button>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="h-[1px] w-4 bg-white/20"></div>
                  <p className="text-[8px] uppercase tracking-tighter opacity-40 italic">Safe & Secure Payment</p>
                  <div className="h-[1px] w-4 bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="text-[#831843] opacity-30" size={28} />
            </div>
            <p className="text-gray-400 font-serif italic text-base sm:text-lg mb-5">Your bag is empty</p>
            <button onClick={() => router.push("/menupage")} className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#831843] text-white rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Start Shopping</button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Cart;