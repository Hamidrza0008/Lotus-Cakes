"use client"
import React, { useState } from "react";
import { User, Mail, Lock, Phone, MapPin, ArrowRight, Sparkles } from "lucide-react";import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpComponent = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address : ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData)

    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( formData ),
      })

      const data = await res.json();
      console.log(data);

      if (data.success) {

        alert(data.message);
        setFormData(

          {
            name: "",
            email: "",
            phone: "",
            password: "",
            address:"",
          }
        )

        router.push("/login")
      }
      else {
        alert(data.message);
      }


    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }


  }

  return (
    <>
      {/* Page Wrapper Layout */}
      <div className="min-h-screen w-full bg-[#fff5f7] flex items-center justify-center mt-10 px-4 md:px-10 py-10 overflow-hidden relative selection:bg-pink-100 selection:text-[#5d1232]">

        {/* Background Vector Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-20"></div>

        {/* Decorative Blur Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/40 blur-[100px] rounded-full -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-pink-100/30 blur-[130px] rounded-full -z-10"></div>

        {/* Main Glassmorphism Form Container */}
        <div className="relative w-full max-w-2xl bg-white backdrop-blur-xl shadow-[0_20px_80px_rgba(93,18,50,0.05),0_0_20px_rgba(93,18,50,0.02)] rounded-[32px] border border-white p-8 md:p-10 z-10 group">
          <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-pink-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

          {/* Form Branding Header */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#5D1232] via-[#7a1a44] to-pink-500 rounded-2xl flex items-center justify-center text-white font-serif text-3xl font-bold shadow-[0_10px_30px_rgba(93,18,50,0.3)] mb-4 cursor-pointer relative">
              L
              <span className="absolute -top-1.5 -right-1.5 text-pink-300"><Sparkles size={14} /></span>
            </div>

            <h1 className="font-serif text-4xl font-black tracking-tighter text-[#5d1232]">
              Create Account
            </h1>
            <p className="text-[11px] font-black text-pink-600 uppercase tracking-[0.3em] mt-2 bg-pink-100/50 px-4 py-1 rounded-full">
              Join the world of LOTUS
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* Responsive Form Field Layout */}
            <div className="space-y-5">

              {/* 2x2 Grid for Personal/Auth Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Input Wrapper: Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5d1232]/40">
                      <User size={18} strokeWidth={2.2} />
                    </div>
                    <input
                      value={formData.name}
                      onChange={handleChange}
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
                    />
                  </div>
                </div>

                {/* Input Wrapper: Email Address */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5d1232]/40">
                      <Mail size={18} strokeWidth={2.2} />
                    </div>
                    <input
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
                    />
                  </div>
                </div>

                {/* Input Wrapper: Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5d1232]/40">
                      <Phone size={18} strokeWidth={2.2} />
                    </div>
                    <input
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
                    />
                  </div>
                </div>

                {/* Input Wrapper: Password */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5d1232]/40">
                      <Lock size={18} strokeWidth={2.2} />
                    </div>
                    <input
                      value={formData.password}
                      onChange={handleChange}
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
                    />
                  </div>
                </div>

              </div>

              {/* Input Wrapper: Full Address (Full Width Below Grid) */}
              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5d1232]/70 block px-1">
                  Delivery Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#5d1232]/40">
                    <MapPin size={18} strokeWidth={2.2} />
                  </div>
                  <input
                    value={formData.address}
                    onChange={handleChange}
                    type="text"
                    name="address"
                    required
                    placeholder="Flat, House no., Building, Company, Apartment, Street"
                    className="w-full pl-12 pr-4 py-3.5 bg-white/60 focus:bg-white rounded-2xl border border-pink-100/30 focus:border-pink-300 text-sm text-[#5d1232] font-medium placeholder-pink-300/80 outline-none transition-all duration-300 focus:shadow-[0_0_25px_rgba(236,72,153,0.06)]"
                  />
                </div>
              </div>

            </div>

            {/* Form Action Trigger Button */}
            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-2.5 bg-[#5D1232] hover:bg-[#72173e] text-white font-bold text-xs uppercase tracking-[0.25em] py-4 mt-2 rounded-2xl transition-all duration-300 shadow-[0_10px_25px_rgba(93,18,50,0.2)] overflow-hidden"
            >
              <span>Sign Up Now</span>
              <ArrowRight size={17} className="text-pink-300 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </form>

          {/* Form Navigation Footer Links */}
          <div className="mt-6 pt-4 border-t border-pink-100/50 text-center">
            <p className="text-xs text-[#5d1232]/80 font-medium">
              Already have an account?{" "}
              <Link
                href="/login"
                className="relative text-pink-600 font-black uppercase tracking-wider inline-block group ml-1"
              >
                Log In
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default SignUpComponent;