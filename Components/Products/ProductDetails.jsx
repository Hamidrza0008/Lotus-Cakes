"use client";

import { useEffect, useState } from "react";
import { Star, ShoppingBag, ChevronLeft, ShieldCheck, Clock, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/slice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductDetails = ({ id }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products/")
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        setLoading(false);
      });
  }, []);

  const product = productData.find((p) => p.id === Number(id));
  const isInCart = cartItems.some((item) => item.id === Number(id));

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FCFBFB]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="w-8 h-8 border-4 border-pink-100 border-t-[#831843] rounded-full" 
      />
    </div>
  );

  if (!product) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#FCFBFB] px-4">
      <h1 className="text-center font-serif text-2xl text-gray-700 mb-4">Product not found</h1>
      <button onClick={() => router.back()} className="text-xs font-bold uppercase tracking-widest text-[#831843]">Go Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FCFBFB] md:overflow-hidden flex flex-col justify-center py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-5xl mx-auto w-full">
        
        <motion.button 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          onClick={() => router.back()}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#831843] transition-colors mb-4 md:mb-6 w-fit"
        >
          <ChevronLeft size={14} /> Return
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center bg-white p-5 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(131,24,67,0.03)] border border-pink-50/50"
        >
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="relative w-full"
          >
            <div className="aspect-square md:aspect-[4/4.5] rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-b from-gray-50 to-pink-50/20 max-h-[320px] sm:max-h-[400px] w-full shadow-inner group">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-pink-50"
            >
              <Star size={11} className="fill-[#831843] text-[#831843]" />
              <span className="text-[11px] font-bold text-[#831843]">{product.rating}</span>
            </motion.div>
          </motion.div>

          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="mb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-pink-400 block mb-1">Lotus Signature</span>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#4A0E2E] leading-tight">
                  {product.name}
                </h1>
                <p className="text-[11px] text-gray-400 uppercase tracking-widest mt-1.5">{product.category || "Specialty Cake"}</p>
              </div>
              
              <p className="text-gray-500 text-[13px] leading-relaxed mb-6 md:mb-8">
                {product.description || "A masterfully crafted delight using premium seasonal ingredients and traditional baking techniques."}
              </p>

              <div className="flex items-center gap-6 mb-6 md:mb-8">
                <span className="text-3xl sm:text-4xl font-semibold text-gray-800">₹{product.price}</span>
              </div>
            </div>

            <div>
              <div className="w-full mb-6 md:mb-8">
                <AnimatePresence mode="wait">
                  {!isInCart ? (
                    <motion.button 
                      key="add-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        dispatch(addToCart({ ...product, quantity: 1 }));
                        toast.success("Added to bag");
                      }}
                      className="w-full bg-[#4A0E2E] text-white py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:bg-[#831843] shadow-md hover:shadow-lg transition-all"
                    >
                      <ShoppingBag size={14} /> Add to Bag
                    </motion.button>
                  ) : (
                    <motion.button
                      key="remove-btn"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        dispatch(removeFromCart(product.id));
                        toast.error("Removed from bag");
                      }}
                      className="w-full border-2 border-red-200 bg-red-50/20 text-red-600 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase text-[10px] tracking-widest hover:bg-red-50 hover:border-red-300 transition-all shadow-sm"
                    >
                      <Trash2 size={14} /> Remove from Bag
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 md:pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-pink-50 rounded-lg text-[#831843]">
                    <Clock size={14} />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-pink-50 rounded-lg text-[#831843]">
                    <ShieldCheck size={14} />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">Freshly Baked</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;