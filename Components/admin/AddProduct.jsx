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
    <div className="min-h-screen bg-gradient-to-br from-[#fff7fa] via-white to-pink-50 flex justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-pink-200/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl rounded-[32px] shadow-[0_20px_50px_rgba(93,18,50,0.08)] border border-pink-100 overflow-hidden">
        
        <div className="bg-[#5D1232] px-8 py-6 relative">
          <div className="absolute right-6 top-6 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
            <Cake className="text-pink-300 animate-pulse" size={24} />
          </div>
          <h1 className="text-2xl font-serif italic font-medium text-white tracking-wide">
            Add New <span className="text-pink-300 font-sans not-italic font-black">Lotus</span> Delight
          </h1>
          <p className="text-pink-200/60 text-xs uppercase font-black tracking-[0.2em] mt-1">
            Inventory Management Panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
          
          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <Cake size={18} />
            </span>
            <input
              onChange={handleChange}
              value={product.name}
              type="text"
              name="name"
              placeholder="Cake Name"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold shadow-inner"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <Layers size={18} />
            </span>
            <select
              onChange={handleChange}
              value={product.category}
              name="category"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold appearance-none cursor-pointer shadow-inner"
            >
              <option value="Cakes">Cakes</option>
              <option value="Drinks">Drinks</option>
              <option value="Chocolate">Chocolate</option>
              <option value="Bakery">Bakery</option>
              <option value="Pastry">Pastry</option>
            </select>
            <span className="absolute right-4 top-5 pointer-events-none w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#5D1232]"></span>
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <IndianRupee size={18} />
            </span>
            <input
              onChange={handleChange}
              value={product.price}
              type="number"
              name="price"
              placeholder="Price"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold shadow-inner"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <Package size={18} />
            </span>
            <input
              onChange={handleChange}
              value={product.stock}
              type="number"
              name="stock"
              placeholder="Stock"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold shadow-inner"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <Calendar size={18} />
            </span>
            <input
              onChange={handleChange}
              value={product.created_at}
              type="datetime-local"
              name="created_at"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold shadow-inner"
            />
          </div>

          <div className="relative">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <Image size={18} />
            </span>
            <input
              onChange={handleChange}
              value={product.image}
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold shadow-inner"
            />
          </div>

          <div className="relative md:col-span-2">
            <span className="absolute left-4 top-3.5 text-pink-400">
              <FileText size={18} />
            </span>
            <textarea
              onChange={handleChange}
              value={product.description}
              name="description"
              rows="3"
              placeholder="Description"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#FFF0F3]/50 border border-pink-200/60 text-[#5D1232] placeholder-pink-400/70 outline-none focus:border-[#5D1232] focus:bg-white transition-all text-sm font-semibold resize-none shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="md:col-span-2 w-full mt-2 bg-[#5D1232] hover:bg-[#4a0e28] text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-black uppercase text-xs tracking-widest shadow-lg shadow-pink-900/10 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
          >
            <PlusCircle size={16} strokeWidth={2.5} />
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;