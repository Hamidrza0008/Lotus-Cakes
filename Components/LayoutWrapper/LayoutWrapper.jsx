"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Home/Navbar";

const LayoutWrapper = ({ children }) => {

    const pathname = usePathname();

    const isAdminRoute = pathname.startsWith("/admin");

    return (
        <>
            {!isAdminRoute && <Navbar />}
            {children}
        </>
    );
};

export default LayoutWrapper;