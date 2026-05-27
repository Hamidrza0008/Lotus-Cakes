"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slice";

const Checkout = () => {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    const cartItems = useSelector((state) => state.cart.cartItems);

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [note, setNote] = useState("");

    const getCurrentUser = async () => {
        try {
            const res = await fetch("/api/me");
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
                setName(data.user.name || "");
                setPhone(data.user.phone || "");
                setAddress(data.user.address || "");
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrentUser();
    }, []);

    // Total Price
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    // WhatsApp Redirect
    const handlePlaceOrder = async () => {
        if (!name || !phone || !address) {
            alert("Please fill all fields");
            return;
        }

        const orderData = {
            customer_name: name,
            customer_phone: phone,
            customer_address: address,
            total_price: totalPrice,
            payment_method: paymentMethod,
            order_items: cartItems,
        };

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data = await res.json();

            if (data.success) {
                dispatch(clearCart());

                const orderItems = cartItems
                    .map(
                        (item) =>
                            `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
                    )
                    .join("\n");

                const message = `
🧁 *New Cake Order*

👤 Name: ${name}
📞 Phone: ${phone}

🏠 Address:
${address}

💳 Payment Method:
${paymentMethod}

📝 Note:
${note || "No Note"}

━━━━━━━━━━━━━━

📦 Order Items:
${orderItems}

━━━━━━━━━━━━━━

💰 Total Amount: ₹${totalPrice}
`;

                const whatsappUrl = `https://wa.me/919599424493?text=${encodeURIComponent(
                    message
                )}`;

                window.open(whatsappUrl, "_blank");

                setTimeout(() => {
                    router.push("/");
                }, 500);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <section className="min-h-screen bg-[#FFFBFB] pt-20 md:pt-24 pb-12 text-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

                {/* LEFT SIDE - Form Controls */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-pink-50 shadow-sm">
                    
                    <button 
                        onClick={() => router.back()} 
                        className="text-[10px] font-black uppercase text-pink-500 flex items-center gap-1 mb-2 hover:gap-2 transition-all"
                    >
                        <ArrowLeft size={11} /> Back to Cart
                    </button>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#831843] mb-4 md:mb-6">
                        Checkout
                    </h2>

                    {/* Name */}
                    <div className="mb-3.5">
                        <label className="block mb-1 text-xs font-bold text-[#831843] uppercase tracking-wider">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 outline-none bg-pink-50/10 focus:bg-white focus:border-[#831843] transition-colors"
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3.5">
                        <label className="block mb-1 text-xs font-bold text-[#831843] uppercase tracking-wider">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 outline-none bg-pink-50/10 focus:bg-white focus:border-[#831843] transition-colors"
                        />
                    </div>

                    {/* Address */}
                    <div className="mb-3.5">
                        <label className="block mb-1 text-xs font-bold text-[#831843] uppercase tracking-wider">
                            Delivery Address
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Enter your complete address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 outline-none bg-pink-50/10 focus:bg-white focus:border-[#831843] transition-colors resize-none"
                        />
                    </div>

                    {/* Payment Method */}
                    <div className="mb-3.5">
                        <label className="block mb-1 text-xs font-bold text-[#831843] uppercase tracking-wider">
                            Payment Method
                        </label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 outline-none bg-pink-50/10 focus:bg-white focus:border-[#831843] transition-colors appearance-none cursor-pointer"
                        >
                            <option value="Cash on Delivery">Cash on Delivery</option>
                            <option value="UPI">UPI</option>
                            <option value="Card Payment">Card Payment</option>
                        </select>
                    </div>

                    {/* Note */}
                    <div className="mb-2">
                        <label className="block mb-1 text-xs font-bold text-[#831843] uppercase tracking-wider">
                            Order Note
                        </label>
                        <textarea
                            rows={2}
                            placeholder="Any special instruction or custom text?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full text-xs sm:text-sm border border-gray-200 rounded-xl p-2.5 sm:p-3 outline-none bg-pink-50/10 focus:bg-white focus:border-[#831843] transition-colors resize-none"
                        />
                    </div>

                </div>

                {/* RIGHT SIDE - Summary Card */}
                <div className="bg-white p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-pink-50 shadow-sm h-fit">

                    <h2 className="text-lg sm:text-xl font-bold text-[#831843] mb-4 pb-2 border-b border-pink-50">
                        Order Summary
                    </h2>

                    {/* Cart Items Dense Stack */}
                    <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0"
                            >
                                <div className="flex items-center gap-3 min-w-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-xl object-cover bg-pink-50 shrink-0"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-bold text-xs sm:text-sm text-[#831843] truncate">
                                            {item.name}
                                        </h3>
                                        <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                                            Qty: {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <p className="font-bold text-xs sm:text-sm text-gray-800 shrink-0 pl-2">
                                    ₹{item.price * item.quantity}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Final Calculations */}
                    <div className="flex justify-between items-center mt-5 pt-4 border-t border-pink-50">
                        <h3 className="text-sm font-black uppercase text-[#831843] tracking-wide">
                            Total amount
                        </h3>
                        <p className="text-xl sm:text-2xl font-black text-gray-900">
                            ₹{totalPrice}
                        </p>
                    </div>

                    {/* Action Call */}
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-5 w-full bg-[#831843] hover:bg-[#9d174d] transition-all text-white py-3 rounded-xl flex justify-center items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-widest active:scale-[0.98] shadow-md shadow-pink-100"
                    >
                        <ShoppingBag size={16} />
                        Confirm via WhatsApp
                    </button>

                </div>

            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #fbcfe8; border-radius: 6px; }
            `}</style>
        </section>
    );
};

export default Checkout;