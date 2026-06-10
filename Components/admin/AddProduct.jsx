"use client";

import React, { useState } from "react";
import { 
  PlusCircle, 
  Cake, 
  Layers, 
  IndianRupee, 
  Package, 
  Calendar, 
  Image, 
  FileText 
} from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AddProduct = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    category: "Cakes",
    description: "",
    image: "",
    price: "",
    quantity: "",
    stock: "",
    created_at: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.stock) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product Added Successfully!");
        setProduct({
          id: "",
          name: "",
          category: "Cakes",
          description: "",
          image: "",
          price: "",
          quantity: "",
          stock: "",
          created_at: "",
        });
        router.push("/admin/inventory");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to connect to server");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fa] via-white to-pink-50 flex justify-center items-center px-4 py-6 sm:py-12 pt-24 sm:pt-28 relative overflow-hidden">
      {/* Decorative Blur Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-200/30 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-pink-100/40 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-2xl sm:rounded-[32px] shadow-[0_20px_50px_rgba(93,18,50,0.08)] border border-pink-100/80 overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#5D1232] px-5 py-5 sm:px-8 sm:py-6 relative flex flex-col justify-center min-h-[90px]">
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6 w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
            <Cake className="text-pink-300 animate-pulse w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div className="pr-12">
            <h1 className="text-xl sm:text-2xl font-serif italic font-medium text-white tracking-wide leading-tight">
              Add New <span className="text-pink-300 font-sans not-italic font-black">Lotus</span> Delight
            </h1>
            <p className="text-pink-200/60 text-[9px] sm:text-xs uppercase font-black tracking-[0.18em] mt-1.5 sm:mt-1">
              Inventory Management Panel
            </p>
          </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          
          {/* Cake Name Input */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <Cake size={16} />
            </span>
            <input
              onChange={handleChange}
              value={product.name}
              type="text"
              name="name"
              placeholder="Cake Name"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold shadow-inner"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <Layers size={16} />
            </span>
            <select
              onChange={handleChange}
              value={product.category}
              name="category"
              className="w-full pl-10 pr-10 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold appearance-none cursor-pointer shadow-inner"
            >
              <option value="Cakes">Cakes</option>
              <option value="Drinks">Drinks</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Bakery">Bakery</option>
              <option value="Pastry">Pastry</option>
            </select>
            <span className="absolute right-4 top-[19px] sm:top-5 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#5D1232]"></span>
          </div>

          {/* Price Input */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <IndianRupee size={16} />
            </span>
            <input
              onChange={handleChange}
              value={product.price}
              type="number"
              name="price"
              placeholder="Price"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold shadow-inner"
            />
          </div>

          {/* Stock Input */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <Package size={16} />
            </span>
            <input
              onChange={handleChange}
              value={product.stock}
              type="number"
              name="stock"
              placeholder="Stock"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold shadow-inner"
            />
          </div>

          {/* Date Picker Input */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <Calendar size={16} />
            </span>
            <input
              onChange={handleChange}
              value={product.created_at}
              type="datetime-local"
              name="created_at"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold shadow-inner min-h-[40px]"
            />
          </div>

          {/* Image URL Input */}
          <div className="relative">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <Image size={16} />
            </span>
            <input
              onChange={handleChange}
              value={product.image}
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold shadow-inner"
            />
          </div>

          {/* Description Textarea */}
          <div className="relative md:col-span-2">
            <span className="absolute left-4 top-[14px] sm:top-3.5 text-pink-400">
              <FileText size={16} />
            </span>
            <textarea
              onChange={handleChange}
              value={product.description}
              name="description"
              rows="3"
              placeholder="Description"
              className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-xs sm:text-sm font-semibold resize-none shadow-inner"
            />
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="md:col-span-2 w-full mt-1 bg-[#5D1232] hover:bg-[#4a0e28] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-lg shadow-pink-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            <PlusCircle size={14} strokeWidth={2.5} />
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;