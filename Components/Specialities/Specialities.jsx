"use client";

import React from "react";
import { Cake, Sparkles, PartyPopper, Heart, CalendarDays, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const Specialities = () => {

    const handleContact = () => {
        const phoneNumber = "919599424493";

        const message =
            "Hello 🌸, I want to book your cakes and plants. Please share more details.";

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappUrl, "_blank");
    };

    const services = [
        {
            icon: <PartyPopper className="text-pink-500" size={28} />,
            title: "Birthday Bash Premium",
            description: "Custom theme cake with premium spot balloon decoration, custom banner, and dynamic table setup.",
            price: "4,999",
            badge: "Most Popular"
        },
        {
            icon: <Sparkles className="text-[#5D1232]" size={28} />,
            title: "Corporate & Private Parties",
            description: "Elegant background setup, customized dessert counters, matching cupcakes, and ambient lighting arrangement.",
            price: "8,499",
            badge: "Trending"
        },
        {
            icon: <Heart className="text-pink-600" size={28} />,
            title: "Grand Marriage & Functions",
            description: "Luxurious multi-tier theme cakes, premium floral stage decoration, live slicing show, and dessert lounge.",
            price: "19,999",
            badge: "Royal Choice"
        }
    ];

    return (
        <div className="min-h-screen w-screen bg-gradient-to-br from-[#fff7fa] via-white to-pink-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 relative overflow-hidden select-none py-16 md:py-24">
            <div className="absolute top-[-10%] right-[-10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-pink-200/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[450px] h-[300px] md:h-[450px] bg-pink-100/30 rounded-full blur-[80px] md:blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl w-full flex flex-col justify-between gap-12 md:gap-16">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                >
                    <div className="inline-flex items-center gap-1.5 bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.25em]">
                        <Cake size={12} className="animate-spin" style={{ animationDuration: '3s' }} /> Exclusive Services
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#5D1232] italic font-medium leading-tight">
                        Special Bookings & <span className="text-pink-500 font-sans not-italic font-black">Celebrations</span>
                    </h2>
                    <p className="text-pink-900/60 text-xs sm:text-sm font-semibold max-w-xl mx-auto px-2">
                        Turn your milestones into unforgettable sweet memories with Lotus special decoration setups and tier bakes.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                    {services.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.15 }}
                            whileHover={{ y: -8 }}
                            className="bg-white/80 backdrop-blur-xl border border-pink-100 rounded-[32px] p-6 relative flex flex-col justify-between min-h-[380px] md:h-[45vh] shadow-[0_15px_40px_rgba(93,18,50,0.04)] hover:shadow-[0_25px_50px_rgba(255,145,175,0.18)] hover:border-pink-200/80 transition-all duration-500 group"
                        >
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-[#FFF0F3] rounded-2xl flex items-center justify-center border border-pink-100/50 shadow-inner transition-transform duration-500 group-hover:rotate-6">
                                        {item.icon}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-gradient-to-r from-[#5D1232] to-pink-700 text-white rounded-full shadow-md shadow-pink-900/10">
                                        {item.badge}
                                    </span>
                                </div>

                                <h3 className="text-lg md:text-xl font-bold text-[#5D1232] tracking-tight group-hover:text-pink-600 transition-colors duration-300">
                                    {item.title}
                                </h3>

                                <p className="text-xs font-medium text-pink-900/60 mt-3 leading-relaxed md:line-clamp-3">
                                    {item.description}
                                </p>
                            </div>

                            <div className="pt-4 mt-6 border-t border-pink-100/60 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] text-pink-400 font-black uppercase tracking-wider">Charges Start From</p>
                                    <p className="text-xl md:text-2xl font-black text-[#5D1232]">₹{item.price}<span className="text-xs font-bold text-pink-500/80">/-</span></p>
                                </div>

                                <button 
                                    onClick={handleContact}
                                    className="w-10 h-10 bg-[#FFF0F3] text-[#5D1232] rounded-xl flex items-center justify-center hover:bg-[#5D1232] hover:text-white transition-all duration-300 shadow-sm group-hover:scale-105 active:scale-95"
                                >
                                    <ArrowRight size={16} strokeWidth={2.5} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-center text-xs font-black uppercase tracking-widest text-[#5D1232] px-4"
                >
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-pink-500" />
                        <span>Want a customized plan?</span>
                    </div>
                    <button onClick={handleContact} className="text-pink-500 underline underline-offset-4 hover:text-[#5D1232] transition-colors native-3xl">
                        Contact Coordinator
                    </button>
                </motion.div>

            </div>
        </div>
    );
};

export default Specialities;