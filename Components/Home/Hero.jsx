"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  
  const cakes = [
    { id: 1, name: "Chocolate Drip", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "Lotus Dream", img: "https://images.unsplash.com/photo-1562440499-64c9a111f713?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "Velvet Red", img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=600&auto=format&fit=crop" },
  ];

  return (
    <section className="relative min-h-[90vh] w-full bg-[#FFF5F7] flex items-center justify-center overflow-hidden pt-28 pb-16 md:pt-2 md:pb-8">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-pink-100/50 rounded-full blur-[80px] md:blur-[120px] -z-10 animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left Side: Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 md:space-y-4 text-center md:text-left order-2 md:order-1"
        >
          <div className="space-y-3 md:space-y-4">
            <span className="text-pink-500 font-black tracking-[0.3em] md:tracking-[0.4em] text-[9px] md:text-[10px] uppercase bg-white px-3 py-1 rounded-full shadow-sm inline-block">
              Artisanal Bakery since 2024
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-[#5D1232] leading-tight">
              Where Dreams <br />
              <span className="text-pink-500 italic font-medium">Taste Sweet.</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#5D1232]/70 max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
              Indulge in our hand-crafted masterpieces, where every bite tells a story of organic ingredients and pure love.
            </p>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6">
            <button 
              onClick={() => router.push("/menupage")} 
              className="bg-[#5D1232] text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl font-bold shadow-[0_15px_30px_-10px_rgba(93,18,50,0.4)] text-[11px] sm:text-xs uppercase tracking-widest hover:scale-105 transition-transform"
            >
              Explore Menu
            </button>
            <button className="text-[#5D1232] font-black text-[11px] sm:text-xs uppercase tracking-widest border-b-2 border-[#5D1232]/20 hover:border-[#5D1232] transition-all pb-1">
              Our Story
            </button>
          </div>
        </motion.div>

        {/* Right Side: Visual Stack (Fully Responsive) */}
        <div className="relative flex items-center justify-center order-1 md:order-2 py-6 md:py-0">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-[24px] sm:rounded-[40px] border-2 sm:border-4 border-white shadow-xl md:shadow-2xl overflow-hidden group shrink-0 transition-all
                ${index === 0 ? "w-24 h-36 sm:w-40 sm:h-56 z-10 -rotate-6 mt-6 sm:mt-12" : ""}
                ${index === 1 ? "w-32 h-44 sm:w-48 sm:h-64 z-20 scale-110 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.25)] sm:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]" : ""}
                ${index === 2 ? "w-24 h-36 sm:w-40 sm:h-56 z-10 rotate-6 mt-6 sm:mt-12" : ""}
                ${index !== 1 ? "-mx-3 sm:-mx-4 opacity-80" : ""}
              `}
            >
              <img 
                src={cake.img} 
                alt={cake.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Hero;