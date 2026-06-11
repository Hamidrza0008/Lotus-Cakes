import AdminNavbar from "@/Components/admin/Navbar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-pink-50">

            {/* Right Side */}
            <div className="flex-1 flex flex-col">

                {/* Navbar */}
                <AdminNavbar />

                {/* Main Content */}
                <main className="flex-1 py-2 overflow-y-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}