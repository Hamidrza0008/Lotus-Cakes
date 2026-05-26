"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Camera } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <MessageCircle />, href: "#" },
    { icon: <Camera />, href: "#" },
    { icon: <Mail />, href: "#" }
  ];

  return (
    <footer className="bg-[#FFF5F7] pb-12 px-4 md:px-10">
     
      <div className="max-w-6xl mx-auto bg-[#5D1232] rounded-[36px] p-8 md:p-12 shadow-[0_20px_50px_rgba(93,18,50,0.15)] relative overflow-hidden">
        
        {/* Background Subtle Gradient Glow */}
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-12 items-start pb-12 border-b border-white/10 relative z-10">
          
          {/* Brand Left Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <motion.div 
                whileHover={{ rotate: 10 }}
                className="w-11 h-11 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-xl flex items-center justify-center font-serif text-xl font-black shadow-lg"
              >
                L
              </motion.div>
              <h2 className="text-xl font-serif font-bold tracking-tight text-white">Lotus Cake & Bakers</h2>
            </div>
            
            <p className="text-2xl font-serif italic text-pink-100/90 leading-tight max-w-md">
              "Baking memories that melt in your heart, using only pure love."
            </p>
            
            {/* Social Icons with Smooth Scaling */}
            <div className="flex gap-3">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, backgroundColor: "#ec4899" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-white transition-colors duration-300 bg-white/5 backdrop-blur-sm"
                >
                  {React.cloneElement(social.icon, { size: 18 })}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Info Right Section */}
          <div className="grid grid-cols-2 gap-8 pt-4 md:pt-0">
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400">Location</h4>
              <p className="text-sm text-pink-100/70 font-medium leading-relaxed">
                Siddhivinayak Heights,<br/>Navi Mumbai, 410206
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400">Contact</h4>
              <p className="text-sm text-pink-100/70 font-medium leading-relaxed">
                +91 9987xxx75<br/>
                <span className="border-b border-white/10 hover:border-pink-400 transition-colors cursor-pointer">hello@lotuscakes.com</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-bold">
            © 2026 Lotus Cake & Bakers
          </p>
          <div className="flex gap-6 text-[9px] font-black uppercase tracking-widest text-white/40">
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-pink-400 transition-colors duration-200">Terms</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;