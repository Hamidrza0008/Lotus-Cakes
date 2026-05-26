"use client"
import { ShoppingBag, Star, ArrowRight, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/slice';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const FeaturedCakes = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state) => state.cart?.cartItems || state.cart || []);
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        getFeaturedProducts();
    }, []);

    const getFeaturedProducts = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("/api/products");
            const data = await res.json();
            const onlyFeaturedProducts = data.filter((p) => p.category === "featured");
            setFeaturedProducts(onlyFeaturedProducts);
        } catch (error) {
            console.error("Failed to fetch featured products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isInCart = (id) => {
        return cartItems.some((item) => item.id === id);
    };

    const handleCartAction = (cake, inCart) => {
        if (inCart) {
            dispatch(removeFromCart(cake.id));
        } else {
            dispatch(addToCart(cake));
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section className="bg-[#FFF5F7] pb-24 px-6">
            <div className="max-w-6xl mx-auto">
                
                {/* Compact Promo Banner */}
                <div className="bg-[#5D1232] rounded-[40px] p-8 md:p-10 mb-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    
                    <div className="space-y-3 text-center md:text-left z-10">
                        <span className="text-pink-300 uppercase tracking-[0.3em] text-[9px] font-black">Limited Time Offer</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">Baked with Love, <br/> Crafted for Moments.</h2>
                        <p className="text-pink-100/60 text-xs font-bold tracking-widest uppercase">Use Code: <span className="text-white border-b border-white/40">LOTUS20</span></p>
                    </div>
                    
                    <button onClick={()=>(router.push("/menupage"))} className="bg-white text-[#5D1232] font-black uppercase tracking-widest text-[10px] px-10 py-4 rounded-2xl hover:bg-pink-100 transition-all z-10 shadow-xl flex items-center gap-3 group">
                        Order Online <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Section Title */}
                <div className="flex items-end justify-between mb-12">
                  <div className="space-y-2">
                    <span className="text-pink-500 uppercase tracking-[0.3em] text-[10px] font-black">Best Sellers</span>
                    <h3 className="font-serif text-4xl font-bold text-[#5D1232]">Featured Masterpieces</h3>
                  </div>
                  <div className="w-24 h-[1px] bg-pink-200 mb-4 hidden md:block"></div>
                </div>

                {/* Grid Container wrapped in AnimatePresence to switch states natively */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div 
                            key="skeleton-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {[...Array(4)].map((_, index) => (
                                <motion.div key={index} variants={cardVariants} className="bg-white rounded-[32px] p-3 border border-pink-100/30 shadow-sm">
                                    <div className="relative aspect-[4/5] rounded-[24px] bg-pink-100/40 animate-pulse overflow-hidden" />
                                    <div className="p-4 space-y-4">
                                        <div className="space-y-2">
                                            <div className="h-4 bg-pink-100/50 animate-pulse rounded-md w-3/4" />
                                            <div className="h-3 bg-pink-100/30 animate-pulse rounded-md w-1/2" />
                                        </div>
                                        <div className="flex items-center justify-between pt-2">
                                            <div className="h-6 bg-pink-100/50 animate-pulse rounded-md w-1/3" />
                                            <div className="h-10 w-10 bg-pink-100/40 animate-pulse rounded-xl" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="products-grid"
                            variants={containerVariants}
                            initial="hidden"
                            animate="show"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {featuredProducts.map((cake) => {
                                const alreadyInCart = isInCart(cake.id);

                                return (
                                    <motion.div 
                                        key={cake.id} 
                                        variants={cardVariants}
                                        layout
                                        className="group relative"
                                    >
                                        <div className="bg-white rounded-[32px] p-3 shadow-sm hover:shadow-2xl transition-all duration-500 border border-pink-100/50">
                                            <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden">
                                                <img src={cake.image} alt={cake.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-xl flex items-center gap-1 text-[10px] font-black text-[#5D1232]">
                                                    <Star size={10} className="fill-pink-500 text-pink-500" /> {cake.rating}
                                                </div>
                                            </div>
                                            <div className="p-4 space-y-4">
                                                <div>
                                                  <h4 className="font-bold text-[#5D1232] text-sm truncate">{cake.name}</h4>
                                                  <p className="text-[9px] text-pink-400 font-black uppercase tracking-widest">Premium Selection</p>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-black text-lg text-[#5D1232]">₹{cake.price}</span>
                                                    
                                                    <motion.button 
                                                        whileTap={{ scale: 0.85 }}
                                                        whileHover={{ scale: 1.05 }}
                                                        onClick={() => handleCartAction(cake, alreadyInCart)} 
                                                        className={`p-2.5 rounded-xl transition-colors duration-300 relative overflow-hidden ${
                                                            alreadyInCart 
                                                            ? "bg-[#5D1232] text-white" 
                                                            : "bg-pink-50 text-pink-500 hover:bg-[#5D1232] hover:text-white"
                                                        }`}
                                                    >
                                                        <AnimatePresence mode="wait" initial={false}>
                                                            <motion.div
                                                                key={alreadyInCart ? "inCart" : "notInCart"}
                                                                initial={{ y: 15, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                exit={{ y: -15, opacity: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                {alreadyInCart ? (
                                                                    <Check size={18} className="stroke-[3]" />
                                                                ) : (
                                                                    <ShoppingBag size={18} />
                                                                )}
                                                            </motion.div>
                                                        </AnimatePresence>
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default FeaturedCakes;