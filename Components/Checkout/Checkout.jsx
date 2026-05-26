"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { clearCart } from "@/redux/slice";


const Checkout = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        getCurrentUser();
    }, []);

    const getCurrentUser = async () => {
        try {
            const res = await fetch("/api/me");
            const data = await res.json();
            if (data.success) {
                setUser(data.user);
                console.log(data.user);
                setName(data.user.name);
                setPhone(data.user.phone);
                setAddress(data.user.address);

            }
        } catch (error) {
            console.log(error);
        }
    };

    

    const dispatch = useDispatch();

    const router = useRouter();

    const cartItems = useSelector(
        (state) => state.cart.cartItems
    );

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [note, setNote] = useState("");

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
            payment_method: "Cash on Delivery",
            order_items: cartItems,
        };

        try {
            // DB me save 
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            })

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

        <section className="min-h-screen bg-[#FFFBFB] py-16 text-black">

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* LEFT SIDE */}
                <div className="bg-white p-6 rounded-3xl shadow-md">

                    <h2 className="text-3xl font-bold text-[#831843] mb-6">
                        Checkout
                    </h2>

                    {/* Name */}
                    <div className="mb-4">

                        <label className="block mb-2 font-medium text-[#831843]">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#831843]"
                        />

                    </div>

                    {/* Phone */}
                    <div className="mb-4">

                        <label className="block mb-2 font-medium text-[#831843]">
                            Phone Number
                        </label>

                        <input
                            type="text"
                            placeholder="Enter phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#831843]"
                        />

                    </div>

                    {/* Address */}
                    <div className="mb-4">

                        <label className="block mb-2 font-medium text-[#831843]">
                            Delivery Address
                        </label>

                        <textarea
                            rows={4}
                            placeholder="Enter your address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#831843]"
                        />

                    </div>

                    {/* Payment Method */}
                    <div className="mb-4">

                        <label className="block mb-2 font-medium text-[#831843]">
                            Payment Method
                        </label>

                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#831843]"
                        >

                            <option value="Cash on Delivery">
                                Cash on Delivery
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Card Payment">
                                Card Payment
                            </option>

                        </select>

                    </div>

                    {/* Note */}
                    <div className="mb-4">

                        <label className="block mb-2 font-medium text-[#831843]">
                            Order Note
                        </label>

                        <textarea
                            rows={3}
                            placeholder="Any special instruction?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:border-[#831843]"
                        />

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="bg-white p-6 rounded-3xl shadow-md h-fit">

                    <h2 className="text-2xl font-bold text-[#831843] mb-6">
                        Order Summary
                    </h2>

                    {/* Cart Items */}
                    <div className="space-y-4">

                        {cartItems.map((item) => (

                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b pb-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 rounded-xl object-cover"
                                    />

                                    <div>

                                        <h3 className="font-bold text-[#831843]">
                                            {item.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Qty: {item.quantity}
                                        </p>

                                    </div>

                                </div>

                                <p className="font-bold text-lg">
                                    ₹{item.price * item.quantity}
                                </p>

                            </div>

                        ))}

                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center mt-6">

                        <h3 className="text-xl font-bold text-[#831843]">
                            Total
                        </h3>

                        <p className="text-2xl font-bold">
                            ₹{totalPrice}
                        </p>

                    </div>

                    {/* Button */}
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-8 w-full bg-[#831843] hover:bg-[#9d174d] transition text-white py-4 rounded-2xl flex justify-center items-center gap-3 text-lg font-semibold"
                    >

                        <ShoppingBag size={22} />

                        Redirect To WhatsApp To Place Order

                    </button>

                </div>

            </div>

        </section>

    );
};

export default Checkout;